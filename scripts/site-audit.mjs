import { readFile, readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const sourceRoot = fileURLToPath(new URL('../src/', import.meta.url));
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
const DASH_MARKER = /[\u2013\u2014]|\u00e2\u20ac[\u201c\u201d]/;
const AI_MARKERS = [
  /\bas an ai language model\b/i,
  /\bsebagai (?:sebuah )?model (?:bahasa )?ai\b/i,
  /\b(?:written|generated) by chatgpt\b/i,
  /\blorem ipsum\b/i,
];

function routeFor(file) {
  const rel = relative(root, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel === '404.html' || rel === '500.html') return `/${rel.replace('.html', '')}`;
  return `/${rel.replace(/\/index\.html$/, '')}`;
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
function registerUnique(map, value, route, label) {
  if (!value) return;
  const previous = map.get(value);
  if (previous) failures.push(`${route}: duplicate ${label} with ${previous}`);
  else map.set(value, route);
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
  const noindex = robots.includes('noindex');
  let canonicalUrl;
  try {
    canonicalUrl = new URL(canonical);
    if (canonicalUrl.protocol !== 'https:') failures.push(`${route}: canonical must use HTTPS`);
    if (canonicalUrl.search || canonicalUrl.hash) failures.push(`${route}: canonical must not include query or hash`);
    if (normalizeRoute(canonicalUrl.pathname) !== normalizeRoute(route)) failures.push(`${route}: canonical is not self-referencing (${canonical})`);
  } catch {
    failures.push(`${route}: canonical is not an absolute URL`);
  }
  const checks = [
    ['lang=id', /<html[^>]+lang="id"/i.test(html)],
    ['title', Boolean(title)],
    ['description', Boolean(description)],
    ['canonical', Boolean(canonical)],
    ['robots meta', Boolean(robots)],
    ['single h1', (html.match(/<h1\b/gi) || []).length === 1],
    ['Open Graph title', /property="og:title" content="[^"]+"/i.test(html)],
    ['Open Graph image', /property="og:image" content="https?:\/\//i.test(html)],
    ['Twitter card', /name="twitter:card" content="summary_large_image"/i.test(html)],
    ['no em dash or mojibake', !DASH_MARKER.test(html)],
    ['no AI-generation marker', !AI_MARKERS.some((pattern) => pattern.test(textContent(html)))],
  ];
  for (const [label, pass] of checks) if (!pass) failures.push(`${route}: ${label}`);
  auditAccessibility(html, route);
  let hasValidJsonLd = false;
  for (const json of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(json[1]);
      if (hasTypedSchema(parsed)) hasValidJsonLd = true;
      else failures.push(`${route}: JSON-LD has no typed schema entity`);
    } catch { failures.push(`${route}: invalid JSON-LD`); }
  }
  if (!noindex) {
    if (!hasValidJsonLd) failures.push(`${route}: indexable page requires valid JSON-LD`);
    if (title.length < TITLE_MIN || title.length > TITLE_MAX) failures.push(`${route}: title length ${title.length} is outside ${TITLE_MIN}-${TITLE_MAX}`);
    if (description.length < DESCRIPTION_MIN || description.length > DESCRIPTION_MAX) failures.push(`${route}: description length ${description.length} is outside ${DESCRIPTION_MIN}-${DESCRIPTION_MAX}`);
    registerUnique(titles, title, route, 'title');
    registerUnique(descriptions, description, route, 'description');
  }
  pages.set(route, { file, html, noindex, canonical, canonicalUrl });
}

const ignoredPrefixes = ['/api/', '/admin/', '/preview/'];
for (const [route, page] of pages) {
  for (const match of page.html.matchAll(/href="([^"]+)"/gi)) {
    const href = match[1];
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const target = href.split(/[?#]/)[0] || '/';
    if (ignoredPrefixes.some((prefix) => target.startsWith(prefix))) continue;
    if (!pages.has(target) && !assetPaths.has(target)) failures.push(`${route}: broken internal link ${href}`);
  }
}

const sitemapFiles = files.filter((file) => /sitemap-\d+\.xml$/.test(file));
const sitemapUrls = new Set();
for (const file of sitemapFiles) {
  const xml = await readFile(file, 'utf8');
  for (const match of xml.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)) {
    sitemapUrls.add(normalizeRoute(match[1] || '/'));
  }
}
for (const route of sitemapUrls) {
  const page = pages.get(route);
  if (!page) failures.push(`sitemap: missing page ${route}`);
  else if (page.noindex) failures.push(`sitemap: noindex page included ${route}`);
}
for (const [route, page] of pages) {
  if (!page.noindex && !sitemapUrls.has(normalizeRoute(route))) failures.push(`${route}: indexable canonical page missing from sitemap`);
}

const robotsPath = join(root, 'robots.txt');
try {
  const robots = await readFile(robotsPath, 'utf8');
  if (!/Sitemap: https:\/\/ramuni\.id\/sitemap-index\.xml/.test(robots)) failures.push('robots.txt: production sitemap missing');
  if (/Disallow: \/(?:masuk|terima-kasih)/.test(robots)) failures.push('robots.txt: noindex route incorrectly blocked');
} catch { failures.push('robots.txt: missing'); }

for (const file of sourceFiles.filter((item) => /\.(astro|css|js|mjs|ts|md|mdx)$/.test(item))) {
  const rel = relative(sourceRoot, file).split(sep).join('/');
  const source = await readFile(file, 'utf8');
  if (DASH_MARKER.test(source)) failures.push(`src/${rel}: em dash, en dash, or mojibake marker found`);
  for (const marker of AI_MARKERS) if (marker.test(source)) failures.push(`src/${rel}: AI-generation marker found`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`Audited ${htmlFiles.length} HTML files: metadata, static accessibility, content markers, JSON-LD, internal links, sitemap/noindex, and robots all passed.`);
