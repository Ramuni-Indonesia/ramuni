export const SITEMAP_GROUPS = Object.freeze([
  'pages',
  'products',
  'solutions',
  'industries',
  'blog',
  'resources',
]);

export const SITEMAP_INDEX_FILES = Object.freeze([
  'sitemap.xml',
  'sitemap-index.xml',
]);

export const SITEMAP_CHILD_FILES = Object.freeze(
  SITEMAP_GROUPS.map((group) => `sitemap-${group}.xml`),
);

// The blog is deliberately a nested sitemap index. Article URLs and editorial
// profiles have different update cadences, while the blog archive itself is a
// regular site page and belongs in sitemap-pages.xml.
export const SITEMAP_BLOG_CHILD_FILES = Object.freeze([
  'sitemap-blog-posts.xml',
  'sitemap-blog-authors.xml',
]);

export const SITEMAP_URLSET_FILES = Object.freeze([
  ...SITEMAP_GROUPS.filter((group) => group !== 'blog').map((group) => `sitemap-${group}.xml`),
  ...SITEMAP_BLOG_CHILD_FILES,
]);

// Stable pages do not all publish a dateModified JSON-LD field. Keep their
// reviewed visitor-facing revision date here instead of falling back to the
// build clock, so every canonical sitemap URL has a truthful lastmod value.
const STATIC_ROUTE_LASTMODS = new Map([
  ['/', '2026-08-20'],
  ['/blog/', '2026-08-20'],
  ['/blog/kebijakan-editorial/', '2026-07-26'],
  ['/blog/kebijakan-pembaruan/', '2026-07-26'],
  ['/blog/kebijakan-sumber/', '2026-07-26'],
  ['/blog/koreksi/', '2026-07-29'],
  ['/blog/metodologi-fact-check/', '2026-07-30'],
  ['/keamanan/', '2026-08-20'],
  ['/blog/penulis/', '2026-08-20'],
  ['/kontak/', '2026-08-20'],
  ['/tentang/', '2026-08-10'],
  ['/tour-produk-gratis/', '2026-08-20'],
  ['/untuk/', '2026-08-20'],
]);

const STATIC_ROUTE_LASTMOD_PREFIXES = Object.freeze([
  ['/produk/', '2026-08-20'],
  ['/solusi/', '2026-08-20'],
  ['/industri/', '2026-08-20'],
  ['/untuk/', '2026-08-20'],
  ['/sumber-daya/', '2026-08-10'],
  ['/generator/', '2026-08-10'],
  ['/kamus-bisnis/', '2026-08-10'],
  ['/panduan/', '2026-08-10'],
  ['/template/', '2026-08-10'],
  ['/kalkulator/', '2026-08-10'],
]);

const EDITORIAL_TRUST_ROUTES = new Set([
  '/blog/kebijakan-editorial/',
  '/blog/metodologi-fact-check/',
  '/blog/kebijakan-sumber/',
  '/blog/kebijakan-pembaruan/',
  '/blog/koreksi/',
]);

export function normalizeSitemapPath(pathname) {
  const raw = String(pathname || '/').split(/[?#]/, 1)[0] || '/';
  if (raw === '/') return '/';
  return `/${raw.replace(/^\/+|\/+$/g, '')}/`;
}

export function sitemapLastmodForPath(pathname) {
  const path = normalizeSitemapPath(pathname);
  const exact = STATIC_ROUTE_LASTMODS.get(path);
  if (exact) return exact;
  return STATIC_ROUTE_LASTMOD_PREFIXES.find(([prefix]) => path.startsWith(prefix))?.[1];
}

export function sitemapGroupForPath(pathname) {
  const path = normalizeSitemapPath(pathname);

  if (path === '/produk/' || path.startsWith('/produk/')) return 'products';
  if (path === '/solusi/' || path.startsWith('/solusi/')) return 'solutions';
  if (path === '/industri/' || path.startsWith('/industri/')) return 'industries';

  if (EDITORIAL_TRUST_ROUTES.has(path)) return 'pages';
  if (path === '/blog/' || path === '/blog/penulis/') return 'pages';
  if (path.startsWith('/blog/')) return 'blog';

  if (
    path === '/sumber-daya/'
    || path.startsWith('/panduan/')
    || path.startsWith('/template/')
    || path.startsWith('/generator/')
    || path.startsWith('/kalkulator/')
    || path.startsWith('/kamus-bisnis/')
  ) return 'resources';

  return 'pages';
}
