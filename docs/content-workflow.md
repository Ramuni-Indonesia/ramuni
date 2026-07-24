# Content Workflow Handoff

Status: local-file workflow is active; CMS workflow and named operational owners are not yet connected.

## Current workflow

1. Draft in the relevant Astro, data, or `src/content/blog/` file.
2. Check the copy against the brand and content briefs. Use simple Indonesian and remove unverified customer, price, integration, security, ROI, or autonomous-action claims.
3. Set `draft`, `noindex`, `reviewStatus`, and availability wording to the real evidence state.
4. Run `npm run check`, `npm run build`, and `npm run audit`.
5. Review the generated route, metadata, links, responsive layout, keyboard behavior, and reduced-motion behavior.
6. Obtain the required product, editorial, security, legal, or commercial approval.
7. Open only the matching page-level release gate. Production indexing still requires the separate environment gate.
8. Record the release SHA, verification evidence, and unresolved limitations.

## Editorial states

| State | Public behavior |
|---|---|
| Draft/template | Render only when needed for QA; noindex; excluded from sitemap |
| Needs review | Noindex; claims and sources cannot be treated as approved |
| Reviewed | Eligible for release review, not automatically indexable |
| Approved for production | Indexable only in an explicit index-enabled production build |
| Archived | Remove from navigation and sitemap; add a redirect only when a valid replacement exists |

## Approval routing

- Product claims and availability: Product owner.
- Pricing and packaging: Commercial or finance owner plus legal review.
- Security and privacy statements: Security and legal owners.
- Finance, AI, security, privacy, and legal-sensitive articles: qualified reviewer.
- Brand presentation: Brand or marketing owner.
- Indexability and canonical changes: SEO owner plus release owner.

Named people and service-level targets are not yet supplied. Treat them as external blockers rather than assuming approval.

## Publishing guardrails

- Never publish a customer name, logo, testimonial, benchmark, integration, certification, or measured result without evidence and permission.
- Never place PII, tenant data, transaction data, or secrets in content, previews, URLs, analytics, or build logs.
- Slug changes require an approved redirect map before publication.
- Preview and staging stay protected and noindex, even when a page-level approval flag is true.
- CMS migration must preserve dates, author and reviewer attribution, sources, canonicals, related links, and indexability state.
