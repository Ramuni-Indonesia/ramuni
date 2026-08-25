import { saasScreenshotGallery, type SaaSScreenshotEntry } from './saasScreenshotGallery';

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
  return matches.slice(0, Math.max(1, limit));
};

export const selectSaasEvidenceByFamily = (family: string, limit = 3): readonly SaaSScreenshotEntry[] => (
  saasScreenshotGallery.filter((entry) => entry.family === family).slice(0, Math.max(1, limit))
);

export const selectSaasEvidenceByRoute = (route: string, limit = 3): readonly SaaSScreenshotEntry[] => {
  const exact = saasScreenshotGallery.find((entry) => entry.route === route);
  const family = exact?.family;
  const related = family ? saasScreenshotGallery.filter((entry) => entry.family === family && entry.route !== route) : [];
  return [exact, ...related].filter((entry): entry is SaaSScreenshotEntry => Boolean(entry)).slice(0, Math.max(1, limit));
};
