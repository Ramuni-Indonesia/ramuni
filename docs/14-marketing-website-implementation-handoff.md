# RAMUNI Marketing Website Implementation Handoff

Date: 25 July 2026  
Stack: Astro 7 static output  
Brand direction: Lipat Arah

## Current delivery

- Latest published staging release: `20260729T134246Z-62c58295f577` from commit `62c58295f577b960cf1cb85b4c54bd6e20becfd2`; artifact SHA-256 `4e1c8a61250c6fc9b629b0d30aaa29d911482c6c3f09af12b68852a1c752e689`.

- Static output page count is release-specific and must be refreshed after each production build. The current source includes the homepage, marketing route families, dynamic product/solution/resource/blog details, plus `404.html` and `500.html`.
- Global layout includes final RAMUNI brand assets, self-hosted Plus Jakarta Sans WOFF2, metadata, canonical URLs, Open Graph, JSON-LD, sitemap, robots, web manifest, favicons, reduced-motion handling, and responsive navigation.
- Navigation now exposes Produk, Solusi, Untuk Tim, Industri, Harga, and Sumber Daya from shared route data.
- Product delivery includes one hub and nine data-driven product details.
- Solution delivery includes one hub and five data-driven solution details.
- Role delivery includes one hub and four role details.
- Industry delivery includes one hub and six industry details.
- Blog delivery includes the editorial homepage, eleven preview articles, crawlable archive pagination, category routes from the shared taxonomy, one noindex author profile, noindex search, and editorial trust pages. Preview articles render for review but remain `noindex,follow` until editorial approval.
- Resource delivery includes `/sumber-daya`, guide hub with three preview guides, six downloadable CSV templates, eleven browser-only calculators with a unit-tested formula engine, and a shared-data glossary hub with 26 substantive educational terms pending editorial and subject review.
- Conversion delivery includes early access, demo, contact, generic thank-you, and four typed thank-you pages.
- Legal, status, help, login, 500, and maintenance routes are structural shells pending their owners or deployment environment.
- `docs/url-map.csv` now uses all 25 required governance columns and records every current static route family and generated instance set.
- Product detail pages now use feature-specific benefit copy instead of index-based filler. Solution pages use problem-specific comparisons and module notes. Role and industry pages use simpler Indonesian labels and fewer repeated section kickers.
- Blog covers use original 1200 x 720 website illustrations created specifically for RAMUNI's editorial pages. No Instagram launch artwork is used as a deployable website asset. The featured-story placeholder graphic, duplicate end-of-article CTA, and disabled feedback fixture were removed.
- Footer tablet layout, logo intrinsic ratios, homepage 1024 px type sizing, article imagery, and reduced-motion-safe family motion received a code-level visual pass.
- Product pages now load per-product section narratives from `src/data/pageNarratives.ts`; workflows, examples, headings, and closing copy are no longer one shared filler block across nine routes.
- Solution, role, and industry pages now use problem-, role-, and vertical-specific headings and examples. Role industry recommendations are mapped rather than sliced from the first three entries.
- Blog home now uses an asymmetric question navigator and image-led editorial cards. The flagship stock article exercises long-form copy, tables, callouts, checklists, and editorial metadata.
- A first-party consent adapter now provides essential, analytics, and marketing choices, persists only the choice locally, and keeps non-essential categories off by default. No analytics or advertising script is loaded yet.
- Evidence-gated product, solution, industry, security, and calculator details default to `noindex,follow` and stay out of the sitemap until their explicit release environment gates are enabled.
- Homepage hero and report sections use a website-specific RAMUNI composition: teal offset fields, restrained data modules, no tilt-driven hero card, and motivated stagger motion only. The Instagram package is not a source asset for these sections.
- The final static audit now also checks static accessibility basics: accessible names for links and buttons, image alt and dimensions, form labels, dialog labels, duplicate IDs, heading skips, and content-marker hygiene.
- Product detail pages now include real industry slug links, related modules, one educational resource path, and a semantic synthetic evidence figure.
- Product and solution heroes now use a code-built, context-specific marketing dashboard for overview, sales, stock, finance, customer, report, AI, catalog, and import journeys. These are clearly labelled synthetic moneysite visuals, not verified customer results or guaranteed product screens.
- Dashboard motion uses a shared intersection controller, runs one finite explanatory sequence, stops offscreen/when hidden, settles to a useful static state, and respects reduced motion plus Save-Data. Tablet and mobile recompose the dashboard instead of shrinking a desktop screenshot.
- Solution detail pages now link related modules to product routes and include industry examples plus implementation expectations for each solution.
- Role and industry pages now use role-specific support paths, Kasir avoids the demo funnel, industry-role mapping is not hard-coded, and industry pages include related solutions/resources plus synthetic example metrics.
- Dummy guide details, glossary details, and the unavailable template hub are gated by `PUBLIC_RESOURCE_REVIEW_APPROVED`; they render as `noindex,follow` and stay out of the sitemap until substantive review is approved.
- RAMUNI editorial covers are shipped as lightweight SVG files under `public/website-original/`. They were drawn specifically for the website and are independent from the supplied Instagram launch archive.

## Form endpoint contract

Lead forms are fail-closed.

- The form endpoint comes only from `PUBLIC_LEAD_ENDPOINT`.
- When the variable is absent, controls are disabled, no form action is emitted, and the page explains that submissions are unavailable.
- When configured, the browser sends `POST` with `FormData` and requests JSON.
- Non-2xx responses stay on the form and show an inline error. They do not redirect to a success page.
- Successful responses redirect to the matching typed thank-you route.
- The payload includes lead type, consent version, and privacy-safe first-touch/last-touch attribution for whitelisted UTM parameters and common click IDs. The attribution fields do not copy names, email, business notes, or raw query strings.
- After server acceptance, the client dispatches `ramuni:lead:accepted` with lead type, attribution presence, and acceptance time only. Measurement integrations must not fire lead conversions on CTA click, form submit, validation failure, or network failure.
- Free text warns users not to enter customer, transaction, or sensitive data.
- The production endpoint must still enforce validation, origin and CSRF controls, rate limiting, idempotency, encrypted storage, consent recording, PII-safe logs, and server-confirmed conversion deduplication.

## Current verification evidence

Repository hardening added on 25 July 2026:

- Node 22 is now declared consistently in `.node-version`, `.nvmrc`, `package.json`, and the GitHub Actions setup.
- Quality checks run for every branch push and pull request, reject common committed credential patterns, publish a seven-day static artifact, and write a route/build summary to the workflow run.
- Dependabot reviews npm and GitHub Actions updates weekly, while the pull request template makes brand, SEO, indexability, evidence, and credential review explicit.
- The static audit now validates complete Open Graph and Twitter metadata parity, social image availability and dimensions, robots directives, viewport/theme/manifest links, required favicon and icon assets, and the generated web manifest contract.
- `SECURITY.md` provides a repository-level private reporting and data-handling policy.

- The current `dist` inventory contains 79 HTML pages.
- Earlier baseline Lighthouse evidence remains under `output/qa/`: Performance 97, Accessibility 100, Best Practices 96, and SEO 100 on the local mobile production preview.
- `npm run check` on 25 July 2026 05:34 WIB: 63 files, 0 errors, 0 warnings, 0 hints.
- Explicit production build on 25 July 2026 05:58 WIB: 79 pages generated successfully and `sitemap-index.xml` created.
- `npm run audit` on 25 July 2026 05:58 WIB: all 79 HTML files pass metadata, static accessibility, content markers, JSON-LD/schema contracts, internal links, sitemap/noindex, and robots checks.
- `npm audit --audit-level=high` on 25 July 2026: 0 known vulnerabilities.
- Built asset snapshot: shared layout CSS is 95,851 bytes uncompressed, product detail scoped CSS is 5,114 bytes, and the page JavaScript bundle is 2,488 bytes uncompressed.
- Earlier Best Practices image-ratio feedback was addressed, logo intrinsic dimensions now match the 4:1 assets, and font delivery uses WOFF2.
- The existing Lighthouse and screenshot artifacts predate the latest visual and copy pass. Fresh responsive browser QA, Lighthouse, and public PSI remain required.

Evidence files:

- `output/qa/lighthouse-mobile-local.report.html`
- `output/qa/lighthouse-mobile-local.report.json`
- `output/qa/homepage-desktop-1440.png`
- `output/qa/homepage-mobile-390.png`

## Intentional deferrals

- CMS remains deferred. Astro content and local data are temporary sources.
- Blog tag and reviewer profile routes are not yet built.
- Template detail and downloadable asset delivery are not yet built.
- Public help collections and verified task articles remain deferred until product manuals and release evidence exist.
- Product, integration, industry-fit, security, pricing, and commercial claims remain gated by evidence and owner approval.

## Local visual QA gate

- Full visual QA still needs fresh screenshots at 320, 390, 768, 1024, and 1440 px for homepage, blog home/article, representative product/solution/industry/role pages, forms, mega-menu, mobile menu, and footer.
- Keyboard focus, menu escape behavior, and reduced-motion rendering must be inspected in the browser.
- The current Codex browser policy records a rejected request for `http://127.0.0.1:4321`. Do not retry or bypass that decision through another browser surface without explicit user approval.

## External blockers before public launch

1. Provide and operate the approved `PUBLIC_LEAD_ENDPOINT` with the server controls listed above.
2. Approve final privacy, terms, cookie, and data-processing copy.
3. Approve the consent wording and map the first-party consent events to the chosen Consent Mode implementation before loading any non-essential tag.
4. Provide approved GTM, GA4, Meta, and other measurement IDs only after consent and PII tests pass.
5. Confirm the production origin and set `PUBLIC_SITE_URL` if it is not `https://ramuni.id`.
6. Configure hosting redirects, HTTPS, cache headers, compression, CSP/security headers, custom 404/500 behavior, and maintenance switching.
7. Supply verified status data or a status provider before indexing `/status`.
8. Approve the product auth origin for `/masuk`.
9. Complete product, commercial, security, and legal evidence for claims that are currently labelled preview or unavailable.
10. Run mobile and desktop PSI against the final public domain and resolve any CDN-specific regressions.
11. Submit and validate the sitemap in Google Search Console and Bing Webmaster Tools after the production domain is live.
12. Run production Rich Results validation for indexable route families after final schema approval.
