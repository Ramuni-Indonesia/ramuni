## Summary

-

## Verification

- [ ] `npm run check`
- [ ] `PUBLIC_DEPLOY_ENV=production PUBLIC_INDEXING_ENABLED=true PUBLIC_SITE_URL=https://ramuni.id npm run build`
- [ ] `npm run audit`
- [ ] `npm audit --audit-level=high`

## Release review

- [ ] No credentials, tokens, or private endpoints are committed.
- [ ] Brand usage follows the RAMUNI Lipat Arah guidelines.
- [ ] Indexability gates are intentionally set for the target environment.
- [ ] New public routes have title, description, canonical URL, Open Graph, JSON-LD, sitemap/noindex behavior, and accessible content.
- [ ] Any claims, pricing, security, calculator, or resource pages have the required owner approval before being indexed.
