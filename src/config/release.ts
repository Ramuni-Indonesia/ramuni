export const releaseGates = {
  claimPagesIndexable: import.meta.env.PUBLIC_CLAIM_PAGES_APPROVED === 'true',
  securityPageIndexable: import.meta.env.PUBLIC_SECURITY_REVIEW_APPROVED === 'true',
  calculatorPagesIndexable: import.meta.env.PUBLIC_CALCULATOR_REVIEW_APPROVED === 'true',
  resourcePagesIndexable: import.meta.env.PUBLIC_RESOURCE_REVIEW_APPROVED === 'true',
} as const;
