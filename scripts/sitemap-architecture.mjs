import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITEMAP_CHILD_FILES,
  SITEMAP_GROUPS,
  SITEMAP_INDEX_FILES,
  normalizeSitemapPath,
  sitemapGroupForPath,
} from './sitemap-policy.mjs';

const SITEMAP_FILE_PATTERN = /^sitemap(?:-[a-z0-9-]+)?\.xml$/i;

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

async function walkHtml(root) {
  const files = [];
  async function walk(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) await walk(path);
      else if (entry.name.endsWith('.html')) files.push(path);
    }
  }
  await walk(root);
  return files;
}

function renderedPath(root, file) {
  const rel = relative(root, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (/^(?:404|500)\.html$/.test(rel)) return `/${rel.replace('.html', '')}/`;
  return normalizeSitemapPath(rel.replace(/index\.html$/, ''));
}

function capture(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || '';
}

function latestSchemaDate(html) {
  const timestamps = [];
  for (const match of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const value = JSON.parse(match[1]);
      const queue = [value];
      while (queue.length) {
        const item = queue.shift();
        if (Array.isArray(item)) {
          queue.push(...item);
          continue;
        }
        if (!item || typeof item !== 'object') continue;
        for (const field of ['dateModified', 'datePublished']) {
          const timestamp = Date.parse(item[field]);
          if (Number.isFinite(timestamp)) timestamps.push(timestamp);
        }
        queue.push(...Object.values(item));
      }
    } catch {
      // The full site audit reports invalid JSON-LD with route context.
    }
  }
  if (!timestamps.length) return undefined;
  return new Date(Math.max(...timestamps)).toISOString().slice(0, 10);
}

function configuredFallbackLastmod() {
  const value = process.env.PUBLIC_SITEMAP_LASTMOD?.trim();
  if (value === undefined || value === '') return undefined;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(`${value}T00:00:00Z`))) {
    throw new Error('PUBLIC_SITEMAP_LASTMOD must use YYYY-MM-DD');
  }
  return value;
}

function renderUrlset(entries) {
  const body = entries.map((entry) => {
    const lastmod = entry.lastmod ? `<lastmod>${escapeXml(entry.lastmod)}</lastmod>` : '';
    return `<url><loc>${escapeXml(entry.loc)}</loc>${lastmod}</url>`;
  }).join('');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>\n`;
}

function renderIndex(siteOrigin, lastmod) {
  const body = SITEMAP_CHILD_FILES
    .map((file) => `<sitemap><loc>${escapeXml(`${siteOrigin}/${file}`)}</loc>${lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : ''}</sitemap>`)
    .join('');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>\n`;
}

async function removeGeneratedSitemaps(root) {
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (entry.isFile() && SITEMAP_FILE_PATTERN.test(entry.name)) {
      await rm(join(root, entry.name), { force: true });
    }
  }
}

export function ramuniSitemapArchitecture({ site, indexingEnabled }) {
  const siteOrigin = new URL(site).origin;
  const fallbackLastmod = configuredFallbackLastmod();

  return {
    name: 'ramuni-sitemap-architecture',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const root = fileURLToPath(dir);
        await removeGeneratedSitemaps(root);

        // Preview and staging must have no sitemap files, so a static server
        // returns 404 instead of accidentally advertising a noindex build.
        if (!indexingEnabled) return;

        const groups = new Map(SITEMAP_GROUPS.map((group) => [group, []]));
        const seen = new Set();

        for (const file of await walkHtml(root)) {
          const html = await readFile(file, 'utf8');
          const robots = capture(html, /<meta name="robots" content="([^"]+)"/i);
          if (!robots.includes('index') || robots.includes('noindex')) continue;

          const canonical = capture(html, /<link rel="canonical" href="([^"]+)"/i);
          let canonicalUrl;
          try {
            canonicalUrl = new URL(canonical);
          } catch {
            throw new Error(`Cannot create sitemap entry for ${renderedPath(root, file)}: invalid canonical URL`);
          }

          const route = renderedPath(root, file);
          if (canonicalUrl.protocol !== 'https:' || canonicalUrl.origin !== siteOrigin) {
            throw new Error(`Cannot create sitemap entry for ${route}: canonical must use the production HTTPS origin`);
          }
          if (normalizeSitemapPath(canonicalUrl.pathname) !== route) {
            throw new Error(`Cannot create sitemap entry for ${route}: canonical is not self-referencing`);
          }
          if (seen.has(canonicalUrl.href)) throw new Error(`Duplicate sitemap canonical: ${canonicalUrl.href}`);
          seen.add(canonicalUrl.href);

          groups.get(sitemapGroupForPath(route)).push({
            loc: canonicalUrl.href,
            // Articles keep their own content timestamp. Stable public pages
            // use the reviewed site-revision date, never the build clock.
            lastmod: latestSchemaDate(html) || fallbackLastmod,
          });
        }

        for (const group of SITEMAP_GROUPS) {
          const entries = groups.get(group).sort((left, right) => left.loc.localeCompare(right.loc));
          await writeFile(join(root, `sitemap-${group}.xml`), renderUrlset(entries), 'utf8');
        }

        const index = renderIndex(siteOrigin, fallbackLastmod);
        await Promise.all(SITEMAP_INDEX_FILES.map((file) => writeFile(join(root, file), index, 'utf8')));
      },
    },
  };
}
