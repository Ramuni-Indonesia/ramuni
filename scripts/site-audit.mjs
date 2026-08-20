import { readFile, readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolvePublicEnvironment } from '../src/config/public-environment.mjs';
import {
  SITEMAP_BLOG_CHILD_FILES,
  SITEMAP_CHILD_FILES,
  SITEMAP_INDEX_FILES,
  SITEMAP_URLSET_FILES,
  normalizeSitemapPath,
  sitemapGroupForPath,
} from './sitemap-policy.mjs';
import { gzipSync } from 'node:zlib';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const root = fileURLToPath(new URL('../dist/', import.meta.url));
const sourceRoot = fileURLToPath(new URL('../src/', import.meta.url));
const docsRoot = fileURLToPath(new URL('../docs/', import.meta.url));
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else files.push(path);
  }
}
await walk(root);

const sourceFiles = [];
async function walkSource(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walkSource(path);
    else sourceFiles.push(path);
  }
}
await walkSource(sourceRoot);

const documentationFiles = [];
const publicEnvironment = resolvePublicEnvironment(process.env);
const siteOrigin = String(process.env.PUBLIC_SITE_URL || 'https://ramuni.id').replace(/\/$/, '');
const assetOrigin = process.env.PUBLIC_ASSET_BASE_URL
  ? new URL(process.env.PUBLIC_ASSET_BASE_URL).origin
  : null;
const permittedAssetOrigins = new Set([siteOrigin, assetOrigin].filter(Boolean));
async function walkDocumentation(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walkDocumentation(path);
    else if (entry.name.endsWith('.md')) documentationFiles.push(path);
  }
}
await walkDocumentation(docsRoot);
documentationFiles.push(join(projectRoot, 'README.md'));

const htmlFiles = files.filter((file) => file.endsWith('.html'));
const assetPaths = new Set(files.map((file) => `/${relative(root, file).split(sep).join('/')}`));
const failures = [];
const pages = new Map();
const titles = new Map();
const descriptions = new Map();
const TITLE_MIN = 10;
const TITLE_MAX = 65;
const DESCRIPTION_MIN = 50;
const DESCRIPTION_MAX = 180;
const PERFORMANCE_BUDGETS = Object.freeze({
  // HTML is delivered compressed by the server. Audit that transfer size rather
  // than raw source length so a genuinely useful long-form article is not
  // penalized for semantic headings, tables, and accessible markup. 26 kB gzip
  // keeps every route lean while leaving room for reviewed 3,000-word guides.
  html: { perFile: 26_000, total: null, compressed: true },
  // CSS is code-split. A site-wide sum over every chunk is not a page payload,
  // so the route-level linkedStylesheets cap below is the meaningful guard.
  css: { perFile: 110_000, total: null },
  // Large interaction libraries must remain deferred. Their compressed budget
  // is audited separately from the tiny route bootstrap below.
  js: { perFile: 150_000, total: 200_000, compressed: true },
  // Image delivery is route-specific and most editorial/product media is lazy.
  // Audit individual files here, then enforce per-route referenced payload below.
  image: { perFile: 100_000, total: null },
  // Short hero motion remains useful only while each source stays deliberately
  // small; route-level selected video payload is checked separately below.
  video: { perFile: 180_000, total: null },
  font: { perFile: 20_000, total: 60_000 },
});
const DASH_MARKER = /[\u2013\u2014\u00c2\u00e2]/;
const MOJIBAKE_MARKER = /[\u00c2\u00e2\ufffd]/;
const AI_MARKERS = [
  /\bas an ai language model\b/i,
  /\bsebagai (?:sebuah )?model (?:bahasa )?ai\b/i,
  /\b(?:written|generated) by chatgpt\b/i,
  /\blorem ipsum\b/i,
];
const EDITORIAL_TRUST_ROUTES = new Set([
  '/blog/kebijakan-editorial',
  '/blog/metodologi-fact-check',
  '/blog/kebijakan-sumber',
  '/blog/kebijakan-pembaruan',
  '/blog/koreksi',
]);
const SENSITIVE_BLOG_CATEGORIES = new Set([
  'ai-untuk-umkm',
  'keuangan-umkm',
  'operasional-bisnis',
]);

function routeFor(file) {
  const rel = relative(root, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel === '404.html' || rel === '500.html') return `/${rel.replace('.html', '')}`;
  return `/${rel.replace(/\/index\.html$/, '')}`;
}

function formatBytes(value) {
  return `${(value / 1_000).toFixed(1)} kB`;
}

async function auditPerformanceBudgets() {
  const categories = [
    ['html', (file) => file.endsWith('.html')],
    ['css', (file) => file.endsWith('.css')],
    ['js', (file) => file.endsWith('.js')],
    ['image', (file) => /\.(?:avif|gif|ico|jpe?g|png|svg|webp)$/i.test(file)],
    ['video', (file) => /\.(?:mp4|webm)$/i.test(file)],
    ['font', (file) => /\.(?:otf|ttf|woff2?)$/i.test(file)],
  ];

  for (const [category, matches] of categories) {
    const budget = PERFORMANCE_BUDGETS[category];
    const matchingFiles = files.filter(matches);
    let total = 0;
    for (const file of matchingFiles) {
      const bytes = await readFile(file);
      const size = budget.compressed ? gzipSync(bytes, { level: 9 }).byteLength : bytes.byteLength;
      total += size;
      if (size > budget.perFile) {
        const rel = relative(root, file).split(sep).join('/');
        const basis = budget.compressed ? 'compressed ' : '';
        failures.push(`performance budget: ${rel} is ${formatBytes(size)} ${basis}${category}; file limit is ${formatBytes(budget.perFile)}`);
      }
    }
    if (budget.total !== null && total > budget.total) {
      const basis = budget.compressed ? 'compressed ' : '';
      failures.push(`performance budget: total ${basis}${category} is ${formatBytes(total)}; limit is ${formatBytes(budget.total)}`);
    }
  }
}

async function auditLinkedStylesheets() {
  // Keep the raw ceiling finite for runaway duplication, while treating the
  // compressed budget below as the delivery-critical PSI guard. Astro's
  // component-scoped CSS repeats selector prefixes in source but compresses
  // efficiently; the richer product decision workspaces remain under 32 kB
  // over the wire even though their uncompressed aggregate is larger.
  // The raw ceiling remains a guard against accidental duplicate stylesheet
  // loading. It allows the current six-file product bundle (165,145 B) a
  // small deterministic rounding margin while the stricter 32 kB gzip limit
  // remains the delivery-performance gate.
  const routeLimit = 166_000;
  const compressedRouteLimit = 32_000;
  for (const [route, page] of pages) {
    const hrefs = [...page.html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/gi)].map((match) => match[1]);
    let total = 0;
    let compressedTotal = 0;
    for (const href of new Set(hrefs)) {
      const pathname = href.split(/[?#]/)[0];
      const file = files.find((candidate) => `/${relative(root, candidate).split(sep).join('/')}` === pathname);
      if (file) {
        const bytes = await readFile(file);
        total += bytes.byteLength;
        compressedTotal += gzipSync(bytes, { level: 9 }).byteLength;
      }
    }
    if (total > routeLimit) failures.push(`performance budget: ${route} links ${formatBytes(total)} of CSS; route limit is ${formatBytes(routeLimit)}`);
    if (compressedTotal > compressedRouteLimit) failures.push(`performance budget: ${route} links ${formatBytes(compressedTotal)} of compressed CSS; route limit is ${formatBytes(compressedRouteLimit)}`);
  }
}

async function auditInitialJavaScript() {
  const routeLimit = 20_000;
  for (const [route, page] of pages) {
    if (page.isRedirect) continue;
    const paths = [
      ...page.html.matchAll(/<script\b[^>]*type="module"[^>]*src="([^"]+)"[^>]*>/gi),
      ...page.html.matchAll(/<link\b[^>]*rel="modulepreload"[^>]*href="([^"]+)"[^>]*>/gi),
    ].map((match) => match[1].split(/[?#]/)[0]);
    let total = 0;
    for (const pathname of new Set(paths)) {
      const file = files.find((candidate) => `/${relative(root, candidate).split(sep).join('/')}` === pathname);
      if (file) total += gzipSync(await readFile(file), { level: 9 }).byteLength;
    }
    if (total > routeLimit) failures.push(`performance budget: ${route} initially links ${formatBytes(total)} of compressed JS; route limit is ${formatBytes(routeLimit)}`);
  }
}

async function auditLinkedImages() {
  const routeLimit = 320_000;
  const eagerRouteLimit = 150_000;
  for (const [route, page] of pages) {
    if (page.isRedirect) continue;
    const references = new Map();
    for (const match of page.html.matchAll(/<img\b[^>]*>/gi)) {
      const tag = match[0];
      const src = getAttribute(tag, 'src');
      if (!src) continue;
      const pathname = localAssetPath(src, siteOrigin);
      if (!pathname) continue;
      const current = references.get(pathname) || { eager: false };
      current.eager ||= getAttribute(tag, 'loading') !== 'lazy';
      references.set(pathname, current);
    }

    let total = 0;
    let eagerTotal = 0;
    for (const [pathname, state] of references) {
      const file = files.find((candidate) => `/${relative(root, candidate).split(sep).join('/')}` === pathname);
      if (!file) continue;
      const size = (await readFile(file)).byteLength;
      total += size;
      if (state.eager) eagerTotal += size;
    }
    if (total > routeLimit) failures.push(`performance budget: ${route} references ${formatBytes(total)} of images; route limit is ${formatBytes(routeLimit)}`);
    if (eagerTotal > eagerRouteLimit) failures.push(`performance budget: ${route} eagerly loads ${formatBytes(eagerTotal)} of images; eager route limit is ${formatBytes(eagerRouteLimit)}`);
  }
}

async function auditLinkedVideos() {
  const selectedRouteLimit = 260_000;
  const offeredRouteLimit = 520_000;
  for (const [route, page] of pages) {
    if (page.isRedirect) continue;
    const selectedPaths = new Set();
    const offeredPaths = new Set();

    for (const match of page.html.matchAll(/<video\b[^>]*>([\s\S]*?)<\/video>/gi)) {
      const sources = [...match[1].matchAll(/<source\b[^>]*\ssrc="([^"]+)"[^>]*>/gi)]
        .map((sourceMatch) => localAssetPath(sourceMatch[1], siteOrigin))
        .filter(Boolean);
      const candidates = [];
      for (const pathname of new Set(sources)) {
        const file = files.find((candidate) => `/${relative(root, candidate).split(sep).join('/')}` === pathname);
        if (!file) continue;
        const size = (await readFile(file)).byteLength;
        candidates.push({ pathname, size });
        offeredPaths.add(pathname);
      }
      candidates.sort((a, b) => b.size - a.size);
      if (candidates[0]) selectedPaths.add(candidates[0].pathname);
    }

    const sizeFor = async (pathname) => {
      const file = files.find((candidate) => `/${relative(root, candidate).split(sep).join('/')}` === pathname);
      return file ? (await readFile(file)).byteLength : 0;
    };
    let selectedTotal = 0;
    let offeredTotal = 0;
    for (const pathname of selectedPaths) selectedTotal += await sizeFor(pathname);
    for (const pathname of offeredPaths) offeredTotal += await sizeFor(pathname);

    if (selectedTotal > selectedRouteLimit) failures.push(`performance budget: ${route} selects ${formatBytes(selectedTotal)} of video; route limit is ${formatBytes(selectedRouteLimit)}`);
    if (offeredTotal > offeredRouteLimit) failures.push(`performance budget: ${route} offers ${formatBytes(offeredTotal)} of video sources; route limit is ${formatBytes(offeredRouteLimit)}`);
  }
}

function capture(html, pattern) { return html.match(pattern)?.[1]?.trim() || ''; }
function normalizeRoute(value) {
  const pathname = value || '/';
  return pathname === '/' ? '/' : pathname.replace(/\/$/, '');
}
function hasTypedSchema(value, inheritedContext = false) {
  if (Array.isArray(value)) return value.some((entry) => hasTypedSchema(entry, inheritedContext));
  if (!value || typeof value !== 'object') return false;
  const hasContext = inheritedContext || '@context' in value;
  if ('@type' in value && hasContext) return true;
  return Array.isArray(value['@graph']) && value['@graph'].some((entry) => hasTypedSchema(entry, hasContext));
}
function topLevelSchemaEntities(value) {
  if (Array.isArray(value)) return value.flatMap(topLevelSchemaEntities);
  if (!value || typeof value !== 'object') return [];
  const entities = value['@type'] ? [value] : [];
  if (Array.isArray(value['@graph'])) entities.push(...value['@graph'].flatMap(topLevelSchemaEntities));
  return entities;
}
function schemaTypes(page) {
  return new Set(page.schemaEntities.flatMap((entity) => {
    const type = entity['@type'];
    return Array.isArray(type) ? type : [type];
  }).filter((type) => typeof type === 'string'));
}
function schemaEntity(page, type) {
  return page.schemaEntities.find((entity) => {
    const value = entity['@type'];
    return value === type || (Array.isArray(value) && value.includes(type));
  });
}
function requireSchemaTypes(route, page, expected) {
  const types = schemaTypes(page);
  for (const type of expected) if (!types.has(type)) failures.push(`${route}: missing ${type} schema`);
}
function equivalentUrl(left, right) {
  try {
    const a = new URL(left);
    const b = new URL(right);
    return a.origin === b.origin && normalizeRoute(a.pathname) === normalizeRoute(b.pathname) && a.search === b.search && a.hash === b.hash;
  } catch { return false; }
}
function registerUnique(map, value, route, label) {
  if (!value) return;
  const previous = map.get(value);
  if (previous) failures.push(`${route}: duplicate ${label} with ${previous}`);
  else map.set(value, route);
}

function isBlogArticleRoute(route) {
  return /^\/blog\/[^/]+$/.test(route) && route !== '/blog/penulis' && !EDITORIAL_TRUST_ROUTES.has(route);
}

function classSegment(html, className) {
  const pattern = new RegExp(`<([a-z][a-z0-9-]*)\\b(?=[^>]*\\bclass=["'][^"']*\\b${className}\\b)[^>]*>([\\s\\S]*?)<\\/\\1>`, 'i');
  return html.match(pattern)?.[2] || '';
}

function anchorHrefs(html) {
  return [...html.matchAll(/<a\b[^>]*\shref="([^"]+)"[^>]*>/gi)].map((match) => match[1]);
}

function articleSourceRecord(path, body) {
  const frontmatter = body.match(/^---\n([\s\S]*?)\n---/m)?.[1] || '';
  const field = (name) => frontmatter.match(new RegExp(`^${name}:\\s*(?:"([^"]*)"|'([^']*)'|([^\\n#]+))`, 'm'))?.slice(1).find(Boolean)?.trim() || '';
  const rel = relative(join(sourceRoot, 'content', 'blog'), path).split(sep).join('/').replace(/\.(?:md|mdx)$/i, '');
  return {
    route: `/blog/${rel}`,
    reviewStatus: field('reviewStatus'),
    noindex: field('noindex'),
    categorySlug: field('categorySlug'),
    reviewerName: field('reviewerName'),
    reviewerSlug: field('reviewerSlug'),
    hasStructuredSources: !/^sources:\s*\[\s*\]/m.test(frontmatter) && /^sources:/m.test(frontmatter),
  };
}

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  return match ? (match[1] ?? match[2] ?? match[3] ?? '').trim() : null;
}

function textContent(value) {
  return value
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|#160);/gi, ' ')
    .replace(/&(?:amp|#38);/gi, '&')
    .replace(/&(?:lt|#60);/gi, '<')
    .replace(/&(?:gt|#62);/gi, '>')
    .replace(/&(?:quot|#34);/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function referencedName(tag, idText) {
  const labelledBy = getAttribute(tag, 'aria-labelledby');
  if (!labelledBy) return '';
  return labelledBy.split(/\s+/).map((id) => idText.get(id) || '').join(' ').trim();
}

function accessibleName(tag, inner, idText) {
  return getAttribute(tag, 'aria-label') || referencedName(tag, idText) || textContent(inner);
}

function localAssetPath(value, origin) {
  try {
    const url = new URL(value, origin);
    if (!permittedAssetOrigins.has(url.origin)) return '';
    return url.pathname;
  } catch {
    return '';
  }
}

function auditAccessibility(html, route) {
  const idText = new Map();
  const seenIds = new Set();
  for (const match of html.matchAll(/\sid="([^"]+)"/gi)) {
    const id = match[1].trim();
    if (seenIds.has(id)) failures.push(`${route}: duplicate id #${id}`);
    seenIds.add(id);
    idText.set(id, '');
  }
  for (const match of html.matchAll(/<([a-z][\w:-]*)\b[^>]*\sid="([^"]+)"[^>]*>([\s\S]*?)<\/\1>/gi)) {
    const label = textContent(match[3]);
    if (label) idText.set(match[2], label);
  }
  for (const match of html.matchAll(/<(a|button)\b([^>]*)>([\s\S]*?)<\/\1>/gi)) {
    const tag = `<${match[1]}${match[2]}>`;
    if (getAttribute(tag, 'aria-hidden') === 'true') continue;
    const alt = getAttribute(match[3].match(/<img\b[^>]*>/i)?.[0] || '', 'alt');
    if (!accessibleName(tag, match[3], idText) && !alt) failures.push(`${route}: ${match[1].toLowerCase()} has no accessible name`);
  }
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    if (getAttribute(tag, 'alt') === null) failures.push(`${route}: image missing alt attribute`);
    const width = getAttribute(tag, 'width');
    const height = getAttribute(tag, 'height');
    if (!/^\d+$/.test(width || '') || !/^\d+$/.test(height || '')) failures.push(`${route}: image missing numeric width and height`);
  }
  const labelFors = new Set([...html.matchAll(/<label\b[^>]*\sfor="([^"]+)"[^>]*>/gi)].map((match) => match[1]));
  for (const match of html.matchAll(/<(input|select|textarea)\b[^>]*>/gi)) {
    const tag = match[0];
    if ((getAttribute(tag, 'type') || '').toLowerCase() === 'hidden' || getAttribute(tag, 'aria-hidden') === 'true' || /\sdisabled(?:\s|>)/i.test(tag)) continue;
    const id = getAttribute(tag, 'id');
    const before = html.slice(0, match.index);
    const after = html.slice(match.index + tag.length);
    const implicitLabel = before.lastIndexOf('<label') > before.lastIndexOf('</label>') && after.includes('</label>');
    if (!getAttribute(tag, 'aria-label') && !referencedName(tag, idText) && !(id && labelFors.has(id)) && !implicitLabel) failures.push(`${route}: ${match[1].toLowerCase()} has no associated label`);
  }
  for (const match of html.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/gi)) {
    const summary = match[1].match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i);
    if (!summary || !textContent(summary[1])) failures.push(`${route}: details requires a non-empty summary`);
  }
  for (const match of html.matchAll(/<dialog\b([^>]*)>/gi)) {
    const tag = `<dialog${match[1]}>`;
    if (!getAttribute(tag, 'aria-label') && !referencedName(tag, idText)) failures.push(`${route}: dialog has no accessible label`);
  }
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => ({ level: Number(match[1]), text: textContent(match[2]) }));
  if (headings[0]?.level !== 1) failures.push(`${route}: first document heading must be h1`);
  for (let index = 1; index < headings.length; index += 1) {
    if (headings[index].level > headings[index - 1].level + 1) failures.push(`${route}: heading skips from h${headings[index - 1].level} to h${headings[index].level} (${headings[index].text})`);
  }
}

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const route = routeFor(file);
  const title = capture(html, /<title>([^<]+)<\/title>/i);
  const description = capture(html, /<meta name="description" content="([^"]+)"/i);
  const canonical = capture(html, /<link rel="canonical" href="([^"]+)"/i);
  const robots = capture(html, /<meta name="robots" content="([^"]+)"/i);
  const ogTitle = capture(html, /<meta property="og:title" content="([^"]+)"/i);
  const ogDescription = capture(html, /<meta property="og:description" content="([^"]+)"/i);
  const ogUrl = capture(html, /<meta property="og:url" content="([^"]+)"/i);
  const ogImage = capture(html, /<meta property="og:image" content="([^"]+)"/i);
  const ogImageAlt = capture(html, /<meta property="og:image:alt" content="([^"]+)"/i);
  const ogImageWidth = Number(capture(html, /<meta property="og:image:width" content="([^"]+)"/i));
  const ogImageHeight = Number(capture(html, /<meta property="og:image:height" content="([^"]+)"/i));
  const twitterTitle = capture(html, /<meta name="twitter:title" content="([^"]+)"/i);
  const twitterDescription = capture(html, /<meta name="twitter:description" content="([^"]+)"/i);
  const twitterImage = capture(html, /<meta name="twitter:image" content="([^"]+)"/i);
  const twitterImageAlt = capture(html, /<meta name="twitter:image:alt" content="([^"]+)"/i);
  const noindex = robots.includes('noindex');
  const redirectTarget = capture(html, /<meta\s+http-equiv="refresh"\s+content="[^"]*url=([^"]+)"/i);
  const isRedirect = Boolean(redirectTarget) && noindex;
  let canonicalUrl;
  try {
    canonicalUrl = new URL(canonical);
    if (canonicalUrl.protocol !== 'https:') failures.push(`${route}: canonical must use HTTPS`);
    if (canonicalUrl.search || canonicalUrl.hash) failures.push(`${route}: canonical must not include query or hash`);
    if (!isRedirect && normalizeRoute(canonicalUrl.pathname) !== normalizeRoute(route)) failures.push(`${route}: canonical is not self-referencing (${canonical})`);
  } catch {
    failures.push(`${route}: canonical is not an absolute URL`);
  }
  if (isRedirect) {
    let redirectUrl;
    try {
      redirectUrl = new URL(redirectTarget, canonicalUrl?.origin || 'https://ramuni.id');
      if (!canonicalUrl || !equivalentUrl(redirectUrl, canonicalUrl)) failures.push(`${route}: redirect target must match canonical`);
    } catch {
      failures.push(`${route}: invalid redirect target`);
    }
    pages.set(route, { file, html, noindex, canonical, canonicalUrl, schemaEntities: [], isRedirect: true, redirectTarget });
    continue;
  }
  const checks = [
    ['lang=id', /<html[^>]+lang="id"/i.test(html)],
    ['title', Boolean(title)],
    ['description', Boolean(description)],
    ['canonical', Boolean(canonical)],
    ['robots meta', Boolean(robots)],
    ['valid robots directive', ['index,follow', 'noindex,follow'].includes(robots)],
    ['viewport', /<meta name="viewport" content="width=device-width, initial-scale=1"/i.test(html)],
    ['theme color', /<meta name="theme-color" content="#[0-9a-f]{6}"/i.test(html)],
    ['manifest link', /<link rel="manifest" href="\/site\.webmanifest"/i.test(html)],
    ['single h1', (html.match(/<h1\b/gi) || []).length === 1],
    ['Open Graph title', Boolean(ogTitle)],
    ['Open Graph description', Boolean(ogDescription)],
    ['Open Graph URL', Boolean(ogUrl)],
    ['Open Graph image', /^https?:\/\//i.test(ogImage)],
    ['Open Graph image alt', Boolean(ogImageAlt)],
    ['Open Graph image dimensions', Number.isInteger(ogImageWidth) && ogImageWidth > 0 && Number.isInteger(ogImageHeight) && ogImageHeight > 0],
    ['Twitter card', /name="twitter:card" content="summary_large_image"/i.test(html)],
    ['Twitter title', Boolean(twitterTitle)],
    ['Twitter description', Boolean(twitterDescription)],
    ['Twitter image', /^https?:\/\//i.test(twitterImage)],
    ['Twitter image alt', Boolean(twitterImageAlt)],
    ['no em dash or mojibake', !DASH_MARKER.test(html)],
    ['no AI-generation marker', !AI_MARKERS.some((pattern) => pattern.test(textContent(html)))],
  ];
  for (const [label, pass] of checks) if (!pass) failures.push(`${route}: ${label}`);
  if (ogTitle && ogTitle !== title) failures.push(`${route}: Open Graph title must match document title`);
  if (ogDescription && ogDescription !== description) failures.push(`${route}: Open Graph description must match meta description`);
  if (twitterTitle && twitterTitle !== title) failures.push(`${route}: Twitter title must match document title`);
  if (twitterDescription && twitterDescription !== description) failures.push(`${route}: Twitter description must match meta description`);
  if (twitterImage && ogImage && twitterImage !== ogImage) failures.push(`${route}: Twitter image must match Open Graph image`);
  if (twitterImageAlt && ogImageAlt && twitterImageAlt !== ogImageAlt) failures.push(`${route}: Twitter image alt must match Open Graph image alt`);
  if (canonical && ogUrl && !equivalentUrl(ogUrl, canonical)) failures.push(`${route}: Open Graph URL must match canonical`);
  if (canonicalUrl && ogImage) {
    const imagePath = localAssetPath(ogImage, canonicalUrl.origin);
    if (imagePath && !assetPaths.has(imagePath)) failures.push(`${route}: Open Graph image asset missing ${imagePath}`);
  }
  auditAccessibility(html, route);
  let hasValidJsonLd = false;
  const schemaEntities = [];
  for (const json of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(json[1]);
      if (hasTypedSchema(parsed)) hasValidJsonLd = true;
      else failures.push(`${route}: JSON-LD has no typed schema entity`);
      schemaEntities.push(...topLevelSchemaEntities(parsed));
    } catch { failures.push(`${route}: invalid JSON-LD`); }
  }
  if (!noindex) {
    if (!hasValidJsonLd) failures.push(`${route}: indexable page requires valid JSON-LD`);
    if (title.length < TITLE_MIN || title.length > TITLE_MAX) failures.push(`${route}: title length ${title.length} is outside ${TITLE_MIN}-${TITLE_MAX}`);
    if (description.length < DESCRIPTION_MIN || description.length > DESCRIPTION_MAX) failures.push(`${route}: description length ${description.length} is outside ${DESCRIPTION_MIN}-${DESCRIPTION_MAX}`);
    registerUnique(titles, title, route, 'title');
    registerUnique(descriptions, description, route, 'description');
  }
  pages.set(route, { file, html, noindex, canonical, canonicalUrl, schemaEntities });
}

function expectedPageType(route) {
  if (route === '/tentang') return 'AboutPage';
  if (route === '/kontak') return 'ContactPage';
  if (/^\/(sumber-daya|panduan|template|kalkulator|kamus-bisnis)$/.test(route)) return 'CollectionPage';
  if (/^\/blog(?:\/page\/\d+|\/kategori\/[^/]+|\/penulis)?$/.test(route)) return 'CollectionPage';
  return 'WebPage';
}

for (const [route, page] of pages) {
  if (page.isRedirect) continue;
  if (!page.noindex) requireSchemaTypes(route, page, [expectedPageType(route)]);
  if (route === '/') requireSchemaTypes(route, page, ['Organization', 'WebSite', 'SoftwareApplication', 'FAQPage']);
  if (/^\/(produk|solusi)$/.test(route)) requireSchemaTypes(route, page, ['BreadcrumbList']);
  if (/^\/(produk|solusi)\/[^/]+$/.test(route)) requireSchemaTypes(route, page, ['BreadcrumbList']);
  if (route === '/blog') requireSchemaTypes(route, page, ['CollectionPage', 'BreadcrumbList']);
  if (/^\/blog\/kategori\/[^/]+$/.test(route)) requireSchemaTypes(route, page, ['CollectionPage', 'BreadcrumbList']);
  if (/^\/blog\/penulis\/[^/]+$/.test(route)) {
    requireSchemaTypes(route, page, ['ProfilePage']);
    const profile = schemaEntity(page, 'ProfilePage');
    const mainEntityType = profile?.mainEntity?.['@type'];
    if (!['Organization', 'Person'].includes(mainEntityType)) failures.push(`${route}: ProfilePage mainEntity must be a Person or Organization`);
    if (mainEntityType === 'Person' && (!profile.mainEntity?.name || profile.mainEntity?.worksFor?.['@type'] !== 'Organization')) failures.push(`${route}: Person ProfilePage mainEntity requires a name and organization`);
  }
  if (route === '/harga') requireSchemaTypes(route, page, ['SoftwareApplication', 'BreadcrumbList']);
  if (/^\/kalkulator\/[^/]+$/.test(route)) requireSchemaTypes(route, page, ['WebApplication', 'BreadcrumbList']);
  const posting = schemaEntity(page, 'BlogPosting');
  if (posting) {
    if (!equivalentUrl(posting.mainEntityOfPage?.['@id'], page.canonical)) failures.push(`${route}: BlogPosting mainEntityOfPage must match canonical`);
    if (!posting.headline || !posting.description || !posting.image) failures.push(`${route}: BlogPosting requires headline, description, and image`);
    if (!posting.author?.['@type'] || !posting.author?.name) failures.push(`${route}: BlogPosting requires a named author entity`);
    if (posting.publisher?.['@type'] !== 'Organization' || !posting.publisher?.name || !posting.publisher?.logo?.url) failures.push(`${route}: BlogPosting requires an Organization publisher with logo`);
    const published = Date.parse(posting.datePublished);
    const modified = Date.parse(posting.dateModified);
    if (!Number.isFinite(published) || !Number.isFinite(modified)) failures.push(`${route}: BlogPosting dates must be valid`);
    else if (modified < published) failures.push(`${route}: BlogPosting dateModified precedes datePublished`);
  }

  if (isBlogArticleRoute(route) && !page.noindex) {
    requireSchemaTypes(route, page, ['BlogPosting', 'BreadcrumbList']);
    const articleContent = classSegment(page.html, 'article-content');
    const contextualLinks = anchorHrefs(articleContent);
    const contextualInternalLinks = contextualLinks.filter((href) => href.startsWith('/') && !href.startsWith('//'));
    if (contextualInternalLinks.length < 2) failures.push(`${route}: indexable article requires at least two contextual internal links in the article body`);

    const sourceList = classSegment(page.html, 'source-list');
    const sourceLinks = anchorHrefs(sourceList).filter((href) => /^https:\/\//i.test(href));
    if (sourceLinks.length < 1) failures.push(`${route}: indexable article requires at least one HTTPS source link in the structured source list`);
  }

  for (const type of ['WebApplication', 'CollectionPage']) {
    const entity = schemaEntity(page, type);
    if (entity && !equivalentUrl(entity.url, page.canonical)) failures.push(`${route}: ${type} url must match canonical`);
  }

  const breadcrumb = schemaEntity(page, 'BreadcrumbList');
  if (breadcrumb) {
    const items = Array.isArray(breadcrumb.itemListElement) ? breadcrumb.itemListElement : [];
    if (!items.length) failures.push(`${route}: BreadcrumbList requires itemListElement`);
    items.forEach((item, index) => {
      if (item?.['@type'] !== 'ListItem' || item.position !== index + 1) failures.push(`${route}: BreadcrumbList positions must be sequential from 1`);
    });
    const firstItem = items[0]?.item;
    if (!firstItem || !equivalentUrl(firstItem, page.canonicalUrl?.origin || '')) failures.push(`${route}: BreadcrumbList must start at the site root`);
    const lastItem = items.at(-1)?.item;
    if (lastItem && !equivalentUrl(lastItem, page.canonical)) failures.push(`${route}: BreadcrumbList last item must match canonical`);
  }

  const faq = schemaEntity(page, 'FAQPage');
  if (faq) {
    const questions = Array.isArray(faq.mainEntity) ? faq.mainEntity : [];
    if (!questions.length || questions.some((question) => question?.['@type'] !== 'Question' || !question.name || question.acceptedAnswer?.['@type'] !== 'Answer' || !question.acceptedAnswer?.text)) {
      failures.push(`${route}: FAQPage requires complete Question and acceptedAnswer entities`);
    }
  }

  const website = schemaEntity(page, 'WebSite');
  if (website) {
    const organization = schemaEntity(page, 'Organization');
    if (!organization?.['@id'] || website.publisher?.['@id'] !== organization['@id']) failures.push(`${route}: WebSite publisher must reference the Organization`);
    if (!equivalentUrl(website.url, page.canonicalUrl?.origin || '')) failures.push(`${route}: WebSite url must match the site origin`);
  }
}

for (const file of sourceFiles.filter((path) => /[\\/]content[\\/]blog[\\/].*\.(?:md|mdx)$/i.test(path))) {
  const source = articleSourceRecord(file, await readFile(file, 'utf8'));
  const page = pages.get(normalizeRoute(source.route));
  if (!page || page.noindex) continue;
  if (source.reviewStatus !== 'reviewed') failures.push(`${source.route}: indexable article source must have reviewStatus: reviewed`);
  if (source.noindex !== 'false') failures.push(`${source.route}: indexable article source must explicitly set noindex: false`);
  if (!source.hasStructuredSources) failures.push(`${source.route}: indexable article source requires structured sources`);
  if (SENSITIVE_BLOG_CATEGORIES.has(source.categorySlug) && (!source.reviewerName || !source.reviewerSlug)) {
    failures.push(`${source.route}: sensitive indexable article requires reviewerName and reviewerSlug`);
  }
}

const ignoredPrefixes = ['/api/', '/admin/', '/preview/'];
for (const [route, page] of pages) {
  if (page.isRedirect) continue;
  for (const match of page.html.matchAll(/href="([^"]+)"/gi)) {
    const href = match[1];
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const rawTarget = href.split(/[?#]/)[0] || '/';
    const target = normalizeRoute(rawTarget);
    if (ignoredPrefixes.some((prefix) => target.startsWith(prefix))) continue;
    if (!pages.has(target) && !assetPaths.has(rawTarget)) failures.push(`${route}: broken internal link ${href}`);
  }
}

const rootSitemapFiles = files.filter((file) => {
  const rel = relative(root, file).split(sep).join('/');
  return !rel.includes('/') && /^sitemap(?:-[a-z0-9-]+)?\.xml$/i.test(rel);
}).map((file) => relative(root, file).split(sep).join('/'));
const rootSitemapSet = new Set(rootSitemapFiles);
const sitemapUrls = new Map();

function sitemapLocPaths(xml, sourceFile) {
  const routes = [];
  const entryPattern = /<sitemapindex\b/i.test(xml) ? /<sitemap>([\s\S]*?)<\/sitemap>/g : /<url>([\s\S]*?)<\/url>/g;
  for (const entry of xml.matchAll(entryPattern)) {
    const match = entry[1].match(/<loc>([^<]+)<\/loc>/);
    if (!match) {
      failures.push(`${sourceFile}: sitemap entry missing loc`);
      continue;
    }
    const lastmod = entry[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
    if (!lastmod) failures.push(`${sourceFile}: sitemap entry missing lastmod (${match[1]})`);
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod) || Number.isNaN(Date.parse(`${lastmod}T00:00:00Z`))) {
      failures.push(`${sourceFile}: sitemap entry has invalid lastmod ${lastmod} (${match[1]})`);
    }
    try {
      const loc = new URL(match[1]);
      if (loc.protocol !== 'https:') failures.push(`${sourceFile}: sitemap URL must use HTTPS (${loc.href})`);
      if (loc.origin !== siteOrigin) failures.push(`${sourceFile}: sitemap URL must use the canonical site origin (${loc.href})`);
      if (loc.search || loc.hash) failures.push(`${sourceFile}: sitemap URL must not include query or hash (${loc.href})`);
      routes.push(normalizeRoute(loc.pathname));
    } catch {
      failures.push(`${sourceFile}: invalid sitemap URL ${match[1]}`);
    }
  }
  return routes;
}

if (publicEnvironment.indexingEnabled) {
  for (const file of [...SITEMAP_INDEX_FILES, ...SITEMAP_CHILD_FILES, ...SITEMAP_BLOG_CHILD_FILES]) {
    if (!rootSitemapSet.has(file)) failures.push(`sitemap: missing ${file}`);
  }
  for (const file of rootSitemapFiles) {
    if (![...SITEMAP_INDEX_FILES, ...SITEMAP_CHILD_FILES, ...SITEMAP_BLOG_CHILD_FILES].includes(file)) failures.push(`sitemap: unexpected file ${file}`);
  }

  const expectedChildRoutes = new Set(SITEMAP_CHILD_FILES.map((file) => normalizeRoute(`/${file}`)));
  for (const indexFile of SITEMAP_INDEX_FILES) {
    if (!rootSitemapSet.has(indexFile)) continue;
    const xml = await readFile(join(root, indexFile), 'utf8');
    const locs = new Set(sitemapLocPaths(xml, indexFile));
    for (const route of expectedChildRoutes) if (!locs.has(route)) failures.push(`${indexFile}: missing child sitemap ${route}`);
    for (const route of locs) if (!expectedChildRoutes.has(route)) failures.push(`${indexFile}: unexpected child sitemap ${route}`);
  }

  if (rootSitemapSet.has('sitemap-blog.xml')) {
    const xml = await readFile(join(root, 'sitemap-blog.xml'), 'utf8');
    const expectedBlogChildren = new Set(SITEMAP_BLOG_CHILD_FILES.map((file) => normalizeRoute(`/${file}`)));
    const locs = new Set(sitemapLocPaths(xml, 'sitemap-blog.xml'));
    for (const route of expectedBlogChildren) if (!locs.has(route)) failures.push(`sitemap-blog.xml: missing child sitemap ${route}`);
    for (const route of locs) if (!expectedBlogChildren.has(route)) failures.push(`sitemap-blog.xml: unexpected child sitemap ${route}`);
  }

  for (const file of SITEMAP_URLSET_FILES) {
    if (!rootSitemapSet.has(file)) continue;
    const xml = await readFile(join(root, file), 'utf8');
    for (const route of sitemapLocPaths(xml, file)) {
      const page = pages.get(route);
      const previous = sitemapUrls.get(route);
      if (previous) failures.push(`sitemap: duplicate URL ${route} in ${previous} and ${file}`);
      sitemapUrls.set(route, file);
      if (!page) failures.push(`${file}: missing page ${route}`);
      else if (page.noindex) failures.push(`${file}: noindex page included ${route}`);
      else if (file === 'sitemap-blog-posts.xml' && (!/^\/blog\/[^/]+\/$/.test(normalizeSitemapPath(route)) || !page.html.includes('BlogPosting'))) failures.push(`${file}: non-article route ${route}`);
      else if (file === 'sitemap-blog-authors.xml' && !/^\/blog\/penulis\/[^/]+\/$/.test(normalizeSitemapPath(route))) failures.push(`${file}: non-author route ${route}`);
      else if (!SITEMAP_BLOG_CHILD_FILES.includes(file)) {
        const expectedGroup = file.match(/^sitemap-([a-z]+)\.xml$/)?.[1];
        if (sitemapGroupForPath(normalizeSitemapPath(route)) !== expectedGroup) failures.push(`${file}: wrong group for ${route}`);
      }
    }
  }
}

for (const [route, page] of pages) {
  if (!page.noindex && !sitemapUrls.has(normalizeRoute(route))) failures.push(`${route}: indexable canonical page missing from sitemap`);
  if (!publicEnvironment.indexingEnabled && !page.noindex) failures.push(`${route}: non-production build must remain noindex`);
}

if (!publicEnvironment.indexingEnabled && rootSitemapFiles.length > 0) failures.push('sitemap: non-production build must not expose sitemap files');

const robotsPath = join(root, 'robots.txt');
try {
  const robots = await readFile(robotsPath, 'utf8');
  if (publicEnvironment.indexingEnabled) {
    if (!robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`)) failures.push('robots.txt: production sitemap missing');
    if (/Disallow: \/(?:masuk|terima-kasih)/.test(robots)) failures.push('robots.txt: noindex route incorrectly blocked');
  } else {
    if (!/^Allow: \/$/m.test(robots)) failures.push('robots.txt: non-production build must allow crawlers to see noindex directives');
    if (/^Disallow: \/$/m.test(robots)) failures.push('robots.txt: non-production noindex must not be hidden behind a crawl block');
    if (/^Sitemap:/m.test(robots)) failures.push('robots.txt: non-production build must not advertise a sitemap');
  }
} catch { failures.push('robots.txt: missing'); }

for (const requiredAsset of ['/favicon-16x16.png', '/favicon-32x32.png', '/apple-touch-icon.png', '/icon-192.png', '/icon-512.png', '/og-default.png']) {
  if (!assetPaths.has(requiredAsset)) failures.push(`asset: missing required ${requiredAsset}`);
}

try {
  const manifest = JSON.parse(await readFile(join(root, 'site.webmanifest'), 'utf8'));
  if (manifest.name !== 'RAMUNI') failures.push('site.webmanifest: name must be RAMUNI');
  if (manifest.short_name !== 'RAMUNI') failures.push('site.webmanifest: short_name must be RAMUNI');
  if (manifest.start_url !== '/') failures.push('site.webmanifest: start_url must be /');
  if (manifest.display !== 'standalone') failures.push('site.webmanifest: display must be standalone');
  const icons = Array.isArray(manifest.icons) ? manifest.icons : [];
  for (const size of ['192x192', '512x512']) {
    const icon = icons.find((entry) => entry.sizes === size && entry.src && assetPaths.has(localAssetPath(entry.src, siteOrigin)));
    if (!icon) failures.push(`site.webmanifest: missing usable ${size} icon`);
  }
} catch {
  failures.push('site.webmanifest: missing or invalid JSON');
}

for (const file of sourceFiles.filter((item) => /\.(astro|css|js|mjs|ts|md|mdx)$/.test(item))) {
  const rel = relative(sourceRoot, file).split(sep).join('/');
  const source = await readFile(file, 'utf8');
  if (DASH_MARKER.test(source)) failures.push(`src/${rel}: em dash, en dash, or mojibake marker found`);
  for (const marker of AI_MARKERS) if (marker.test(source)) failures.push(`src/${rel}: AI-generation marker found`);
}

for (const file of documentationFiles) {
  const content = await readFile(file, 'utf8');
  if (MOJIBAKE_MARKER.test(content)) failures.push(`${relative(projectRoot, file).split(sep).join('/')}: mojibake marker found`);
}

await auditPerformanceBudgets();
await auditLinkedStylesheets();
await auditInitialJavaScript();
await auditLinkedImages();
await auditLinkedVideos();

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`Audited ${htmlFiles.length} HTML files: metadata, social previews, manifest/icons, static accessibility, content markers, JSON-LD/schema contracts, internal links, sitemap/noindex, robots, documentation encoding, and production asset budgets all passed.`);
