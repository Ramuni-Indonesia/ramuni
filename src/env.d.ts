/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_DEPLOY_ENV?: 'local' | 'preview' | 'staging' | 'production';
  readonly PUBLIC_INDEXING_ENABLED?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_LEAD_ENDPOINT?: string;
  readonly PUBLIC_CLAIM_PAGES_APPROVED?: string;
  readonly PUBLIC_SECURITY_REVIEW_APPROVED?: string;
  readonly PUBLIC_CALCULATOR_REVIEW_APPROVED?: string;
  readonly PUBLIC_RESOURCE_REVIEW_APPROVED?: string;
  readonly PUBLIC_PRICING_APPROVED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
