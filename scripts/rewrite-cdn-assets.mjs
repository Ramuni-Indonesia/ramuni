#!/usr/bin/env node

import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ASSET_EXTENSIONS = new Set([
  '.avif', '.gif', '.ico', '.jpeg', '.jpg', '.png', '.svg', '.webp', '.woff', '.woff2',
]);
const TEXT_EXTENSIONS = new Set([
  '.css', '.html', '.js', '.json', '.mjs', '.svg', '.txt', '.webmanifest', '.xml',
]);

const args = parseArgs(process.argv.slice(2));
const baseUrl = normalizeHttpsUrl(args.baseUrl ?? process.env.PUBLIC_ASSET_BASE_URL, 'asset base URL');
const siteUrl = normalizeOptionalUrl(args.siteUrl ?? process.env.PUBLIC_SITE_URL);
const publicDirectory = path.resolve(args.publicDirectory ?? 'public');
const distDirectory = path.resolve(args.distDirectory ?? 'dist');

const assetPaths = (await walk(publicDirectory))
  .filter((file) => ASSET_EXTENSIONS.has(path.extname(file).toLowerCase()))
  .map((file) => `/${path.relative(publicDirectory, file).split(path.sep).join('/')}`)
  .sort((left, right) => right.length - left.length);
const outputFiles = (await walk(distDirectory))
  .filter((file) => TEXT_EXTENSIONS.has(path.extname(file).toLowerCase()));

let changedFiles = 0;
let replacements = 0;

for (const file of outputFiles) {
  const original = await readFile(file, 'utf8');
  let rewritten = original;

  for (const assetPath of assetPaths) {
    if (siteUrl) {
      const absoluteSource = `${siteUrl}${assetPath}`;
      const absoluteMatches = countOccurrences(rewritten, absoluteSource);
      if (absoluteMatches > 0) {
        rewritten = rewritten.replaceAll(absoluteSource, `${baseUrl}${assetPath}`);
        replacements += absoluteMatches;
      }
    }

    const pattern = new RegExp(`(^|[\\s"'\\(=,:])${escapeRegExp(assetPath)}(?=[$\\s"'\\),?#])`, 'gm');
    rewritten = rewritten.replace(pattern, (_match, boundary) => {
      replacements += 1;
      return `${boundary}${baseUrl}${assetPath}`;
    });
  }

  if (rewritten !== original) {
    await writeFile(file, rewritten);
    changedFiles += 1;
  }
}

console.log(`CDN rewrite complete: ${replacements} references in ${changedFiles} files -> ${baseUrl}`);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries
    .filter((entry) => !entry.isSymbolicLink())
    .map(async (entry) => {
      const absolutePath = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(absolutePath) : [absolutePath];
    }));
  return nested.flat().sort();
}

function parseArgs(values) {
  const parsed = {};
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (value === '--base-url') parsed.baseUrl = values[++index];
    else if (value === '--site-url') parsed.siteUrl = values[++index];
    else if (value === '--public-dir') parsed.publicDirectory = values[++index];
    else if (value === '--dist-dir') parsed.distDirectory = values[++index];
    else throw new Error(`Unknown argument: ${value}`);
  }
  return parsed;
}

function normalizeHttpsUrl(value, label) {
  if (!value) throw new Error(`${label} is required`);
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
    throw new Error(`${label} must be a credential-free HTTPS origin`);
  }
  return url.origin;
}

function normalizeOptionalUrl(value) {
  if (!value) return null;
  return normalizeHttpsUrl(value, 'site URL');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function countOccurrences(source, value) {
  return source.split(value).length - 1;
}
