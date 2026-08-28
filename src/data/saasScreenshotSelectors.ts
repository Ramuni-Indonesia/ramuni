import { saasScreenshotGallery, type SaaSScreenshotEntry } from './saasScreenshotGallery';

// Only these routes have a verified full-resolution capture in the public
// bundle. Keeping the allow-list explicit prevents us from inventing a file
// path for the remaining thumbnail-only evidence.
const fullCaptureSlugs = new Set([
  'home',
  'ai',
  'customers',
  'finance-statements',
  'inventory-alerts',
  'reports',
  'sales-omnichannel-orders',
]);

const useFullCapture = (entry: SaaSScreenshotEntry): SaaSScreenshotEntry => {
  if (entry.slug === 'home') {
    return {
      ...entry,
      // The authenticated home capture is a tall mobile-style export. The
      // verified dashboard master is the correct wide representation for a
      // marketing card and prevents the hero from rendering a narrow strip.
      desktop: '/website-original/product-screens/ramuni-saas-dashboard-desktop-1440.webp',
      tablet: '/website-original/product-screens/ramuni-saas-dashboard-desktop-1440.webp',
      mobile: '/website-original/product-screens/ramuni-saas-dashboard-real-mobile-pixel7.webp',
    };
  }
  if (!fullCaptureSlugs.has(entry.slug)) return entry;
  const toFull = (src: string) => src.replace('/saas-e2e/thumbs/', '/saas-e2e/full/');
  return { ...entry, desktop: toFull(entry.desktop), tablet: toFull(entry.tablet), mobile: toFull(entry.mobile) };
};

const familyByContext = {
  ai: 'ai',
  overview: 'workspace',
  report: 'reports',
  sales: 'sales',
  stock: 'inventory',
  finance: 'finance',
  customer: 'customers',
  catalog: 'products',
  integration: 'settings',
  knowledge: 'workspace',
  web: 'workspace',
} as const;

export type ScreenshotContext = keyof typeof familyByContext;

export const selectSaasEvidence = (context: ScreenshotContext, limit = 3): readonly SaaSScreenshotEntry[] => {
  const family = familyByContext[context];
  const matches = saasScreenshotGallery.filter((entry) => entry.family === family);
  return matches.slice(0, Math.max(1, limit)).map(useFullCapture);
};

export const selectSaasEvidenceByFamily = (family: string, limit = 3): readonly SaaSScreenshotEntry[] => (
  saasScreenshotGallery.filter((entry) => entry.family === family).slice(0, Math.max(1, limit)).map(useFullCapture)
);

export const selectSaasEvidenceByRoute = (route: string, limit = 3): readonly SaaSScreenshotEntry[] => {
  const exact = saasScreenshotGallery.find((entry) => entry.route === route);
  const family = exact?.family;
  const related = family ? saasScreenshotGallery.filter((entry) => entry.family === family && entry.route !== route) : [];
  return [exact, ...related].filter((entry): entry is SaaSScreenshotEntry => Boolean(entry)).slice(0, Math.max(1, limit)).map(useFullCapture);
};
