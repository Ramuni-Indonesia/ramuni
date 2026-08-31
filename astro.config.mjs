import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import { resolvePublicEnvironment } from './src/config/public-environment.mjs';
import { ramuniSitemapArchitecture } from './scripts/sitemap-architecture.mjs';

const mode = process.env.NODE_ENV || 'production';
const env = loadEnv(mode, process.cwd(), '');
// www is the canonical production host (the apex redirects there at the edge).
// Keeping the build default aligned prevents canonical/sitemap drift when the
// deployment environment does not inject PUBLIC_SITE_URL.
const site = env.PUBLIC_SITE_URL || 'https://www.ramuni.id';
const publicEnvironment = resolvePublicEnvironment(env);

export default defineConfig({
  site,
  output: 'static',
  integrations: [ramuniSitemapArchitecture({ site, indexingEnabled: publicEnvironment.indexingEnabled })],
  build: { format: 'directory', inlineStylesheets: 'never' },
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: 'viewport' },
});
