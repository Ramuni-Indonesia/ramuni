import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const origin = String(process.env.SEO_AUDIT_ORIGIN || process.env.PUBLIC_SITE_URL || 'https://www.ramuni.id')
  .replace(/\/+$/, '');
const maxPages = Number(process.env.SEO_AUDIT_MAX_PAGES || 500);
const concurrency = Math.max(1, Math.min(12, Number(process.env.SEO_AUDIT_CONCURRENCY || 8)));
const timeoutMs = Math.max(3_000, Number(process.env.SEO_AUDIT_TIMEOUT_MS || 15_000));
const assetLimit = Math.max(0, Number(process.env.SEO_AUDIT_ASSET_LIMIT || 300));
const assetOrigin = process.env.PUBLIC_ASSET_BASE_URL ? new URL(process.env.PUBLIC_ASSET_BASE_URL).origin : null;
const allowedAssetOrigins = new Set([new URL(origin).origin, assetOrigin].filter(Boolean));
const failures = [];
const warnings = [];
const pages = [];
const assets = new Map();
const sitemapEntries = new Map();
const visitedSitemaps = new Set();

const reportDir = join(new URL('../outputs/seo/', import.meta.url).pathname);

function addFailure(message, context = {}) {
  failures.push({ message, ...context });
}

function addWarning(message, context = {}) {
  warnings.push({ message, ...context });
}

function decodeEntities(value) {
  return String(value || '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function stripTags(value) {
  return decodeEntities(String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
}

function attrs(tag) {
  const result = {};
  for (const match of String(tag || '').matchAll(/([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
    result[match[1].toLowerCase()] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? '');
  }
  return result;
}

function tags(html, name) {
  return [...String(html || '').matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((match) => match[0]);
}

function textTag(html, name) {
  return String(html || '').match(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)</${name}>`, 'i'))?.[1] || '';
}

function normalizePath(value) {
  const url = new URL(value, origin);
  const pathname = url.pathname === '/' ? '/' : `/${url.pathname.replace(/^\/+|\/+$/g, '')}/`;
  return `${url.origin}${pathname}`;
}

function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { redirect: 'follow', ...options, signal: controller.signal })
    .finally(() => clearTimeout(timer));
}

function parseSitemapXml(xml, sourceUrl) {
  const locs = [...String(xml).matchAll(/<loc>\s*([\s\S]*?)\s*<\/loc>/gi)].map((match) => decodeEntities(match[1].trim()));
  const isIndex = /<sitemapindex\b/i.test(xml);
  if (isIndex) return { isIndex, children: locs, urls: [] };
  const urls = [...String(xml).matchAll(/<url\b([\s\S]*?)<\/url>/gi)].map((match) => {
    const block = match[1];
    const loc = decodeEntities(block.match(/<loc>\s*([\s\S]*?)\s*<\/loc>/i)?.[1]?.trim() || '');
    const lastmod = decodeEntities(block.match(/<lastmod>\s*([\s\S]*?)\s*<\/lastmod>/i)?.[1]?.trim() || '');
    return { loc, lastmod, source: sourceUrl };
  }).filter((entry) => entry.loc);
  return { isIndex, children: [], urls };
}

async function fetchSitemap(url) {
  const response = await fetchWithTimeout(url, { headers: { accept: 'application/xml,text/xml,text/plain;q=0.8,*/*;q=0.1' } });
  const body = await response.text();
  if (!response.ok) {
    addFailure(`Sitemap returned HTTP ${response.status}`, { url });
    return;
  }
  const parsed = parseSitemapXml(body, url);
  if (parsed.isIndex) {
    for (const child of parsed.children) {
      const absolute = new URL(child, url).href;
      if (!visitedSitemaps.has(absolute)) await crawlSitemap(absolute);
    }
    return;
  }
  for (const entry of parsed.urls) {
    const normalized = normalizePath(entry.loc);
    if (sitemapEntries.has(normalized)) addFailure('Duplicate URL in sitemap files', { url: normalized });
    sitemapEntries.set(normalized, entry);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.lastmod) || Number.isNaN(Date.parse(entry.lastmod))) {
      addFailure('Sitemap URL is missing a valid YYYY-MM-DD lastmod', { url: normalized, lastmod: entry.lastmod });
    }
  }
}

async function crawlSitemap(url) {
  if (visitedSitemaps.has(url)) return;
  visitedSitemaps.add(url);
  try {
    await fetchSitemap(url);
  } catch (error) {
    addFailure('Sitemap fetch failed', { url, error: error instanceof Error ? error.message : String(error) });
  }
}

function absoluteAssetUrl(value, pageUrl) {
  if (!value || /^(?:data:|blob:|javascript:|#)/i.test(value)) return null;
  try {
    return new URL(value, pageUrl).href;
  } catch {
    return null;
  }
}

async function auditPage(url, entry) {
  let response;
  let html;
  try {
    response = await fetchWithTimeout(url, { headers: { accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.1' } });
    html = await response.text();
  } catch (error) {
    addFailure('Page fetch failed', { url, error: error instanceof Error ? error.message : String(error) });
    return;
  }
  const result = { url, status: response.status, finalUrl: response.url, lastmod: entry.lastmod, title: '', description: '', h1: 0, images: 0, jsonLd: 0 };
  pages.push(result);
  if (response.status !== 200) addFailure(`Sitemap URL returned HTTP ${response.status}`, { url });
  if (!String(response.headers.get('content-type') || '').toLowerCase().includes('text/html')) addFailure('Sitemap URL did not return HTML', { url, contentType: response.headers.get('content-type') || '' });
  if (normalizePath(response.url) !== normalizePath(url)) addFailure('Sitemap URL redirected to a different canonical path', { url, finalUrl: response.url });

  const headerRobots = String(response.headers.get('x-robots-tag') || '').toLowerCase();
  if (/\bnoindex\b/.test(headerRobots)) addFailure('Indexable sitemap URL sends X-Robots-Tag noindex', { url, value: headerRobots });
  const robots = attrs(tags(html, 'meta').find((tag) => attrs(tag).name === 'robots') || '').content.toLowerCase();
  if (/\bnoindex\b/.test(robots)) addFailure('Indexable sitemap URL has meta robots noindex', { url, value: robots });

  result.title = stripTags(textTag(html, 'title'));
  if (result.title.length < 10 || result.title.length > 65) addFailure('Title is outside the 10-65 character range', { url, length: result.title.length, title: result.title });
  const descriptionTag = tags(html, 'meta').find((tag) => attrs(tag).name === 'description');
  result.description = attrs(descriptionTag || '').content.trim();
  if (result.description.length < 50 || result.description.length > 180) addFailure('Meta description is outside the 50-180 character range', { url, length: result.description.length });

  result.h1 = [...String(html).matchAll(/<h1\b[^>]*>/gi)].length;
  if (result.h1 !== 1) addFailure('Page must have exactly one H1', { url, count: result.h1 });
  const canonicalTag = tags(html, 'link').find((tag) => attrs(tag).rel.toLowerCase().split(/\s+/).includes('canonical'));
  const canonical = attrs(canonicalTag || '').href;
  if (!canonical) addFailure('Canonical link is missing', { url });
  else if (normalizePath(canonical) !== normalizePath(url)) addFailure('Canonical is not self-referencing', { url, canonical });
  else if (new URL(canonical, url).origin !== new URL(origin).origin) addFailure('Canonical points outside the production origin', { url, canonical });

  for (const imageTag of tags(html, 'img')) {
    result.images += 1;
    const image = attrs(imageTag);
    if (!Object.hasOwn(image, 'alt')) addFailure('Image is missing an alt attribute', { url, src: image.src || '' });
    const imageUrl = absoluteAssetUrl(image.src, url);
    if (!imageUrl) continue;
    const imageOrigin = new URL(imageUrl).origin;
    if (!allowedAssetOrigins.has(imageOrigin)) addWarning('Image is hosted outside the approved RAMUNI origins', { url, image: imageUrl });
    else if (!assets.has(imageUrl) && assets.size < assetLimit) assets.set(imageUrl, { source: url });
  }

  const jsonLdBlocks = [...String(html).matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match) => match[1].trim()).filter(Boolean);
  result.jsonLd = jsonLdBlocks.length;
  if (!jsonLdBlocks.length) addFailure('JSON-LD script is missing', { url });
  for (const raw of jsonLdBlocks) {
    try {
      const data = JSON.parse(raw.replace(/<!--|-->/g, '').trim());
      const nodes = Array.isArray(data) ? data : (Array.isArray(data['@graph']) ? data['@graph'] : [data]);
      if (!nodes.some((node) => node && (node['@context'] || node['@type']))) addFailure('JSON-LD has no schema node', { url });
    } catch (error) {
      addFailure('JSON-LD is not valid JSON', { url, error: error instanceof Error ? error.message : String(error) });
    }
  }
}

async function runPool(items, worker) {
  let index = 0;
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (index < items.length) {
      const current = items[index++];
      await worker(current);
    }
  });
  await Promise.all(workers);
}

async function auditAssets() {
  await runPool([...assets.entries()], async ([url, context]) => {
    try {
      let response = await fetchWithTimeout(url, { method: 'HEAD', headers: { accept: 'image/avif,image/webp,image/*;q=0.8,*/*;q=0.1' } });
      if (response.status === 405 || response.status === 501) {
        response = await fetchWithTimeout(url, { headers: { range: 'bytes=0-0', accept: 'image/avif,image/webp,image/*;q=0.8,*/*;q=0.1' } });
      }
      if (!response.ok) addFailure(`Referenced image returned HTTP ${response.status}`, { image: url, source: context.source });
      const type = String(response.headers.get('content-type') || '').toLowerCase();
      if (type && !type.startsWith('image/')) addFailure('Referenced image has a non-image content type', { image: url, source: context.source, contentType: type });
    } catch (error) {
      addFailure('Referenced image request failed', { image: url, source: context.source, error: error instanceof Error ? error.message : String(error) });
    }
  });
}

async function auditRobots() {
  const url = `${origin}/robots.txt`;
  try {
    const response = await fetchWithTimeout(url, { headers: { accept: 'text/plain,*/*;q=0.1' } });
    const body = await response.text();
    if (response.status !== 200) addFailure(`robots.txt returned HTTP ${response.status}`, { url });
    if (!new RegExp(`^\\s*Sitemap:\\s*${origin.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}/sitemap\\.xml\\s*$`, 'im').test(body)) addFailure('robots.txt does not reference the production sitemap', { url });
    if (/Disallow:\s*\/$/im.test(body)) addFailure('robots.txt disallows the whole site', { url });
  } catch (error) {
    addFailure('robots.txt fetch failed', { url, error: error instanceof Error ? error.message : String(error) });
  }
}

function reportMarkdown() {
  const lines = [
    '# RAMUNI live SEO audit',
    '',
    `- Origin: ${origin}`,
    `- Audited at: ${new Date().toISOString()}`,
    `- Sitemap URLs: ${sitemapEntries.size}`,
    `- Pages fetched: ${pages.length}`,
    `- Unique images checked: ${assets.size}`,
    `- Failures: ${failures.length}`,
    `- Warnings: ${warnings.length}`,
    '',
    '## Result',
    '',
    failures.length ? 'FAIL: production SEO issues require attention.' : 'PASS: no live SEO failures were detected by this audit.',
    '',
  ];
  if (failures.length) {
    lines.push('## Failures', '');
    for (const failure of failures) lines.push(`- ${failure.message} ${JSON.stringify(failure)}`);
    lines.push('');
  }
  if (warnings.length) {
    lines.push('## Warnings', '');
    for (const warning of warnings) lines.push(`- ${warning.message} ${JSON.stringify(warning)}`);
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

await crawlSitemap(`${origin}/sitemap.xml`);
if (sitemapEntries.size > maxPages) {
  addFailure(`Sitemap contains more than SEO_AUDIT_MAX_PAGES (${maxPages}) URLs`, { count: sitemapEntries.size });
}
const entries = [...sitemapEntries.entries()].slice(0, maxPages);
await auditRobots();
await runPool(entries, async ([url, entry]) => auditPage(url, entry));
await auditAssets();

await mkdir(reportDir, { recursive: true });
const report = {
  origin,
  auditedAt: new Date().toISOString(),
  sitemapFiles: [...visitedSitemaps],
  sitemapUrls: sitemapEntries.size,
  pagesFetched: pages.length,
  imagesChecked: assets.size,
  failures,
  warnings,
  pages,
};
await writeFile(join(reportDir, 'live-seo-audit.json'), `${JSON.stringify(report, null, 2)}\n`);
await writeFile(join(reportDir, 'live-seo-audit.md'), reportMarkdown());
console.log(reportMarkdown().trim());
if (failures.length) process.exitCode = 1;
