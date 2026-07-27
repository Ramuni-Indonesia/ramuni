#!/usr/bin/env node

import { createHash, createHmac } from 'node:crypto';
import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const MIME_TYPES = new Map([
  ['.avif', 'image/avif'],
  ['.css', 'text/css; charset=utf-8'],
  ['.gif', 'image/gif'],
  ['.ico', 'image/x-icon'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.mp4', 'video/mp4'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.webm', 'video/webm'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
]);

const parsedArgs = parseArgs(process.argv.slice(2));
await loadEnvFile(parsedArgs.envFile ?? process.env.R2_ENV_FILE);

const config = {
  accessKeyId: requiredEnv('R2_ACCESS_KEY_ID'),
  secretAccessKey: requiredEnv('R2_SECRET_ACCESS_KEY'),
  endpoint: requiredEnv('R2_ENDPOINT_URL').replace(/\/$/, ''),
  bucket: requiredEnv('R2_BUCKET'),
};

const source = path.resolve(parsedArgs.source ?? 'public');
await access(source);

const files = await walk(source);
const jobs = files.map((absolutePath) => ({
  absolutePath,
  key: joinKey(parsedArgs.prefix, path.relative(source, absolutePath)),
}));

if (parsedArgs.dryRun) {
  for (const job of jobs) console.log(`would upload ${job.key}`);
  console.log(`R2 dry run: ${jobs.length} files from ${source}`);
  process.exit(0);
}

let uploaded = 0;
let skipped = 0;

await runPool(jobs, parsedArgs.concurrency, async ({ absolutePath, key }) => {
  const body = await readFile(absolutePath);
  const localEtag = createHash('md5').update(body).digest('hex');
  const localSha256 = createHash('sha256').update(body).digest('hex');
  const contentType = contentTypeForKey(key);
  const remote = await headObject(key);

  const contentMatches = normalizeContentType(remote?.contentType) === normalizeContentType(contentType);
  const contentHashMatches = remote?.sha256 === localSha256 || remote?.etag === localEtag;
  if (contentHashMatches && contentMatches) {
    skipped += 1;
    console.log(`skip ${key}`);
    return;
  }

  await putObject(key, body, localSha256, contentType);
  uploaded += 1;
  console.log(`upload ${key}`);
});

console.log(`R2 sync complete: ${uploaded} uploaded, ${skipped} unchanged, ${jobs.length} total`);

async function headObject(key) {
  const response = await signedFetch('HEAD', key, Buffer.alloc(0));
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`HEAD ${key} failed with HTTP ${response.status}`);
  return {
    etag: response.headers.get('etag')?.replaceAll('"', '') ?? null,
    sha256: response.headers.get('x-amz-meta-sha256'),
    contentType: response.headers.get('content-type'),
  };
}

async function putObject(key, body, sha256, contentType = contentTypeForKey(key)) {
  const extension = path.extname(key).toLowerCase();
  const cacheControl = extension === '.txt'
    ? 'public, max-age=3600'
    : 'public, max-age=604800, stale-while-revalidate=2592000, stale-if-error=86400';
  const response = await signedFetch('PUT', key, body, {
    'content-type': contentType,
    'cache-control': cacheControl,
    'x-amz-meta-sha256': sha256,
  });
  if (!response.ok) throw new Error(`PUT ${key} failed with HTTP ${response.status}: ${await response.text()}`);
}

function contentTypeForKey(key) {
  return MIME_TYPES.get(path.extname(key).toLowerCase()) ?? 'application/octet-stream';
}

function normalizeContentType(value) {
  return value?.trim().toLowerCase() ?? null;
}

async function signedFetch(method, key, body, extraHeaders = {}) {
  const endpoint = new URL(config.endpoint);
  const canonicalUri = `/${encodeSegment(config.bucket)}/${key.split('/').map(encodeSegment).join('/')}`;
  const requestUrl = new URL(canonicalUri, endpoint);
  const timestamp = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
  const date = timestamp.slice(0, 8);
  const payloadHash = createHash('sha256').update(body).digest('hex');
  const signedHeaderValues = {
    host: endpoint.host,
    ...Object.fromEntries(Object.entries(extraHeaders).filter(([name]) => name.startsWith('x-amz-'))),
    'x-amz-content-sha256': payloadHash,
    'x-amz-date': timestamp,
  };
  const signedHeaderNames = Object.keys(signedHeaderValues).sort();
  const canonicalHeaders = signedHeaderNames.map((name) => `${name}:${signedHeaderValues[name]}\n`).join('');
  const signedHeaders = signedHeaderNames.join(';');
  const canonicalRequest = [method, canonicalUri, '', canonicalHeaders, signedHeaders, payloadHash].join('\n');
  const scope = `${date}/auto/s3/aws4_request`;
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    timestamp,
    scope,
    createHash('sha256').update(canonicalRequest).digest('hex'),
  ].join('\n');
  const dateKey = hmac(`AWS4${config.secretAccessKey}`, date);
  const regionKey = hmac(dateKey, 'auto');
  const serviceKey = hmac(regionKey, 's3');
  const signingKey = hmac(serviceKey, 'aws4_request');
  const signature = createHmac('sha256', signingKey).update(stringToSign).digest('hex');
  const authorization = `AWS4-HMAC-SHA256 Credential=${config.accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  return fetch(requestUrl, {
    method,
    body: method === 'PUT' ? body : undefined,
    headers: {
      ...extraHeaders,
      ...signedHeaderValues,
      authorization,
    },
  });
}

function hmac(key, value) {
  return createHmac('sha256', key).update(value).digest();
}

function encodeSegment(value) {
  return encodeURIComponent(value).replace(/[!'()*]/g, (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`);
}

function joinKey(prefix, relativePath) {
  return [prefix, relativePath.split(path.sep).join('/')]
    .filter(Boolean)
    .join('/')
    .replace(/^\/+/, '');
}

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

async function runPool(items, concurrency, worker) {
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (cursor < items.length) {
      const item = items[cursor];
      cursor += 1;
      await worker(item);
    }
  }));
}

async function loadEnvFile(envFile) {
  if (!envFile) return;
  const contents = await readFile(envFile, 'utf8');
  for (const line of contents.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match && process.env[match[1]] === undefined) process.env[match[1]] = match[2];
  }
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required; load it from a mode-0600 env file outside the repository`);
  return value;
}

function parseArgs(args) {
  const values = { concurrency: 6, dryRun: false };
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === '--dry-run') values.dryRun = true;
    else if (argument === '--source') values.source = args[++index];
    else if (argument === '--prefix') values.prefix = args[++index];
    else if (argument === '--env-file') values.envFile = args[++index];
    else if (argument === '--concurrency') values.concurrency = Number(args[++index]);
    else throw new Error(`Unknown argument: ${argument}`);
  }
  if (!Number.isInteger(values.concurrency) || values.concurrency < 1 || values.concurrency > 20) {
    throw new Error('--concurrency must be an integer between 1 and 20');
  }
  return values;
}
