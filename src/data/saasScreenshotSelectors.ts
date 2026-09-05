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
      // Keep the current authenticated capture across breakpoints. The
      // previous master export was from the pre-activation workspace and
      // omitted AI Companion, saved reports, and data-health states.
      desktop: '/website-original/product-screens/saas-e2e/full/desktop/home--desktop.webp',
      tablet: '/website-original/product-screens/saas-e2e/full/tablet/home--tablet.webp',
      mobile: '/website-original/product-screens/saas-e2e/full/mobile/home--mobile.webp',
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
