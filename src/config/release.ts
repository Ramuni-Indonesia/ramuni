import { resolvePublicEnvironment } from './public-environment.mjs';

const publicEnvironment = resolvePublicEnvironment(import.meta.env);

export const releaseGates = {
  environment: publicEnvironment.name,
  siteIndexable: publicEnvironment.indexingEnabled,
  claimPagesIndexable: publicEnvironment.indexingEnabled && import.meta.env.PUBLIC_CLAIM_PAGES_APPROVED === 'true',
  securityPageIndexable: publicEnvironment.indexingEnabled && import.meta.env.PUBLIC_SECURITY_REVIEW_APPROVED === 'true',
  calculatorPagesIndexable: publicEnvironment.indexingEnabled && import.meta.env.PUBLIC_CALCULATOR_REVIEW_APPROVED === 'true',
  resourcePagesIndexable: publicEnvironment.indexingEnabled && import.meta.env.PUBLIC_RESOURCE_REVIEW_APPROVED === 'true',
  // Pricing is a public product surface. Keep values in the pricing data file
  // so Finance/Product can update them without changing page templates. A
  // production build shows the approved catalog by default; setting the
  // explicit flag to false keeps a release fail-closed during a price review.
  pricingPublic: publicEnvironment.indexingEnabled && import.meta.env.PUBLIC_PRICING_APPROVED !== 'false',
  mascotExplorationEnabled:
    import.meta.env.DEV
    || publicEnvironment.name === 'preview'
    || publicEnvironment.name === 'staging'
    || import.meta.env.PUBLIC_MASCOT_EXPLORATION_APPROVED === 'true',
} as const;
