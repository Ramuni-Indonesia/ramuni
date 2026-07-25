import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';
import { resolvePublicEnvironment } from './src/config/public-environment.mjs';

const mode = process.env.NODE_ENV || 'production';
const env = loadEnv(mode, process.cwd(), '');
const site = env.PUBLIC_SITE_URL || 'https://ramuni.id';
const publicEnvironment = resolvePublicEnvironment(env);
const claimPagesApproved = env.PUBLIC_CLAIM_PAGES_APPROVED === 'true';
const securityReviewApproved = env.PUBLIC_SECURITY_REVIEW_APPROVED === 'true';
const calculatorReviewApproved = env.PUBLIC_CALCULATOR_REVIEW_APPROVED === 'true';
const resourceReviewApproved = env.PUBLIC_RESOURCE_REVIEW_APPROVED === 'true';

const isGatedPage = (page) => {
  const pathname = new URL(page).pathname;
  if (!claimPagesApproved && /^\/(produk|solusi|industri|untuk)\/[^/]+\/$/.test(pathname)) return true;
  if (!securityReviewApproved && pathname === '/keamanan/') return true;
  if (!calculatorReviewApproved && /^\/kalkulator\/[^/]+\/$/.test(pathname)) return true;
  if (!resourceReviewApproved && /^\/(panduan|kamus-bisnis)\/[^/]+\/$/.test(pathname)) return true;
  if (!resourceReviewApproved && pathname === '/template/') return true;
  return false;
};

export default defineConfig({
  site,
  output: 'static',
  integrations: [sitemap({
    filter: (page) => publicEnvironment.indexingEnabled && ![
      '/demo', '/terima-kasih', '/masuk', '/maintenance', '/404', '/500',
      '/blog/cari', '/blog/tag', '/blog/kategori', '/blog/reviewer', '/privasi', '/syarat-penggunaan',
      '/kebijakan-cookie', '/pemrosesan-data', '/status', '/bantuan',
      '/blog/ai-business-companion-umkm', '/blog/arus-kas-umkm-ringan', '/blog/panduan-membaca-stok-harian',
    ].some((path) => page.includes(path)) && !isGatedPage(page),
  })],
  build: { format: 'directory' },
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: 'viewport' },
});
