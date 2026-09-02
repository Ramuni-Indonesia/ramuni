import { resolvePublicEnvironment } from './public-environment.mjs';

const publicEnvironment = resolvePublicEnvironment(import.meta.env);

export const releaseGates = {
  environment: publicEnvironment.name,
  siteIndexable: publicEnvironment.indexingEnabled,
  claimPagesIndexable: publicEnvironment.indexingEnabled && import.meta.env.PUBLIC_CLAIM_PAGES_APPROVED === 'true',
  securityPageIndexable: publicEnvironment.indexingEnabled && import.meta.env.PUBLIC_SECURITY_REVIEW_APPROVED === 'true',
  calculatorPagesIndexable: publicEnvironment.indexingEnabled && import.meta.env.PUBLIC_CALCULATOR_REVIEW_APPROVED === 'true',
  resourcePagesIndexable: publicEnvironment.indexingEnabled && import.meta.env.PUBLIC_RESOURCE_REVIEW_APPROVED === 'true',
  // Pricing approval is deliberately independent from the site's indexability.
  // A preview/local build may be crawlable in a test harness while prices are
  // still under Finance/Product review. Templates must use pricingPublic for
  // both visible values and Offer schema.
  pricingApproved: import.meta.env.PUBLIC_PRICING_APPROVED === 'true',
  pricingPublic: publicEnvironment.indexingEnabled && import.meta.env.PUBLIC_PRICING_APPROVED === 'true',
  mascotExplorationEnabled:
    import.meta.env.DEV
    || publicEnvironment.name === 'preview'
    || publicEnvironment.name === 'staging'
    || import.meta.env.PUBLIC_MASCOT_EXPLORATION_APPROVED === 'true',
} as const;
