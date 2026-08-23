import { resolvePublicEnvironment } from './public-environment.mjs';

const publicEnvironment = resolvePublicEnvironment(import.meta.env);

export const releaseGates = {
  environment: publicEnvironment.name,
  siteIndexable: publicEnvironment.indexingEnabled,
  claimPagesIndexable: publicEnvironment.indexingEnabled && import.meta.env.PUBLIC_CLAIM_PAGES_APPROVED === 'true',
  securityPageIndexable: publicEnvironment.indexingEnabled && import.meta.env.PUBLIC_SECURITY_REVIEW_APPROVED === 'true',
  calculatorPagesIndexable: publicEnvironment.indexingEnabled && import.meta.env.PUBLIC_CALCULATOR_REVIEW_APPROVED === 'true',
  resourcePagesIndexable: publicEnvironment.indexingEnabled && import.meta.env.PUBLIC_RESOURCE_REVIEW_APPROVED === 'true',
  // Commercial pricing is fail-closed. Keep the page useful for validation
  // while withholding unapproved price values and Offer markup in production.
  pricingPublic: publicEnvironment.indexingEnabled && import.meta.env.PUBLIC_PRICING_APPROVED === 'true',
  mascotExplorationEnabled:
    import.meta.env.DEV
    || publicEnvironment.name === 'preview'
    || publicEnvironment.name === 'staging'
    || import.meta.env.PUBLIC_MASCOT_EXPLORATION_APPROVED === 'true',
} as const;
