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
  if (path === '/blog/') return 'pages';
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
