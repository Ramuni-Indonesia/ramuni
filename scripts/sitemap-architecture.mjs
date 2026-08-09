import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITEMAP_BLOG_CHILD_FILES,
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

function hasSchemaType(html, expectedType) {
  for (const match of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const queue = [JSON.parse(match[1])];
      while (queue.length) {
        const item = queue.shift();
        if (Array.isArray(item)) {
          queue.push(...item);
          continue;
        }
        if (!item || typeof item !== 'object') continue;
        const type = item['@type'];
        if (type === expectedType || (Array.isArray(type) && type.includes(expectedType))) return true;
        queue.push(...Object.values(item));
      }
    } catch {
      // The complete audit reports malformed structured data with route context.
    }
  }
  return false;
}

function blogAuthorLastmods(html) {
  const dates = new Map();
  for (const match of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const queue = [JSON.parse(match[1])];
      while (queue.length) {
        const item = queue.shift();
        if (Array.isArray(item)) {
          queue.push(...item);
          continue;
        }
        if (!item || typeof item !== 'object') continue;
        const type = item['@type'];
        const isBlogPost = type === 'BlogPosting' || (Array.isArray(type) && type.includes('BlogPosting'));
        if (isBlogPost) {
          const timestamps = ['dateModified', 'datePublished']
            .map((field) => Date.parse(item[field]))
            .filter(Number.isFinite);
          const lastmod = timestamps.length ? new Date(Math.max(...timestamps)).toISOString().slice(0, 10) : undefined;
          const authors = Array.isArray(item.author) ? item.author : [item.author];
          for (const author of authors) {
            if (!author?.url || !lastmod) continue;
            try {
              const route = normalizeSitemapPath(new URL(author.url).pathname);
              const previous = dates.get(route);
              if (!previous || lastmod > previous) dates.set(route, lastmod);
            } catch {
              // The canonical URL checks below provide the deployment error context.
            }
          }
        }
        queue.push(...Object.values(item));
      }
    } catch {
      // The complete audit reports malformed structured data with route context.
    }
  }
  return dates;
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

function latestEntryLastmod(entries) {
  return entries.reduce((latest, entry) => (!latest || (entry.lastmod && entry.lastmod > latest) ? entry.lastmod : latest), undefined);
}

function renderIndex(entries) {
  const body = entries
    .map((entry) => `<sitemap><loc>${escapeXml(entry.loc)}</loc>${entry.lastmod ? `<lastmod>${escapeXml(entry.lastmod)}</lastmod>` : ''}</sitemap>`)
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
        const authorLastmods = new Map();
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

          for (const [authorRoute, lastmod] of blogAuthorLastmods(html)) {
            const previous = authorLastmods.get(authorRoute);
            if (!previous || lastmod > previous) authorLastmods.set(authorRoute, lastmod);
          }

          groups.get(sitemapGroupForPath(route)).push({
            loc: canonicalUrl.href,
            route,
            isBlogPost: hasSchemaType(html, 'BlogPosting'),
            // Articles keep their own content timestamp. Stable public pages
            // use the reviewed site-revision date, never the build clock.
            lastmod: latestSchemaDate(html) || fallbackLastmod,
          });
        }

        const blogEntries = groups.get('blog');
        const isBlogPostRoute = (entry) => entry.isBlogPost && /^\/blog\/[^/]+\/$/.test(entry.route);
        const isBlogAuthorRoute = (entry) => /^\/blog\/penulis\/[^/]+\/$/.test(entry.route);
        const blogPosts = blogEntries.filter(isBlogPostRoute);
        const blogAuthors = blogEntries
          .filter(isBlogAuthorRoute)
          .map((entry) => ({ ...entry, lastmod: authorLastmods.get(entry.route) || entry.lastmod }));
        const unclassifiedBlogEntries = blogEntries.filter((entry) => !isBlogPostRoute(entry) && !isBlogAuthorRoute(entry));
        if (unclassifiedBlogEntries.length) {
          throw new Error(`Blog sitemap contains an unsupported indexable route: ${unclassifiedBlogEntries[0].route}`);
        }

        const blogLastmod = latestEntryLastmod(blogPosts) || latestEntryLastmod(blogAuthors) || fallbackLastmod;
        const blogArchive = groups.get('pages').find((entry) => entry.route === '/blog/');
        if (blogArchive && blogLastmod) blogArchive.lastmod = blogLastmod;

        for (const group of SITEMAP_GROUPS.filter((group) => group !== 'blog')) {
          const entries = groups.get(group).sort((left, right) => left.loc.localeCompare(right.loc));
          await writeFile(join(root, `sitemap-${group}.xml`), renderUrlset(entries), 'utf8');
        }

        const blogSitemaps = [
          { file: SITEMAP_BLOG_CHILD_FILES[0], entries: blogPosts },
          { file: SITEMAP_BLOG_CHILD_FILES[1], entries: blogAuthors },
        ];
        for (const { file, entries } of blogSitemaps) {
          await writeFile(join(root, file), renderUrlset(entries.sort((left, right) => left.loc.localeCompare(right.loc))), 'utf8');
        }
        await writeFile(join(root, 'sitemap-blog.xml'), renderIndex(blogSitemaps.map(({ file, entries }) => ({
          loc: `${siteOrigin}/${file}`,
          lastmod: latestEntryLastmod(entries) || fallbackLastmod,
        }))), 'utf8');

        const rootSitemaps = SITEMAP_CHILD_FILES.map((file) => {
          if (file === 'sitemap-blog.xml') return { loc: `${siteOrigin}/${file}`, lastmod: blogLastmod };
          const group = file.match(/^sitemap-([a-z]+)\.xml$/)?.[1];
          return { loc: `${siteOrigin}/${file}`, lastmod: latestEntryLastmod(groups.get(group)) || fallbackLastmod };
        });
        const index = renderIndex(rootSitemaps);
        await Promise.all(SITEMAP_INDEX_FILES.map((file) => writeFile(join(root, file), index, 'utf8')));
      },
    },
  };
}
