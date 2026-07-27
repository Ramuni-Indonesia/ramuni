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

export function sitemapGroupForPath(pathname) {
  const path = normalizeSitemapPath(pathname);

  if (path === '/produk/' || path.startsWith('/produk/')) return 'products';
  if (path === '/solusi/' || path.startsWith('/solusi/')) return 'solutions';
  if (path === '/industri/' || path.startsWith('/industri/')) return 'industries';

  if (EDITORIAL_TRUST_ROUTES.has(path)) return 'pages';
  if (path === '/blog/' || path.startsWith('/blog/')) return 'blog';

  if (
    path === '/sumber-daya/'
    || path.startsWith('/panduan/')
    || path.startsWith('/template/')
    || path.startsWith('/kalkulator/')
    || path.startsWith('/kamus-bisnis/')
  ) return 'resources';

  return 'pages';
}

