# RAMUNI Marketing Website

Static-first marketing website and dummy blog for RAMUNI, built with Astro. The implementation follows the approved Lipat Arah brand kit, the marketing developer handover, and the page-content brief in `docs/`.

## Local development

```powershell
npm install --force
npm run dev
npm run build
npm run audit
```

`--force` is currently needed on this Windows workstation because the official Astro WASI fallback packages declare a `wasm32` CPU target. The project uses the WASI compiler path because local Application Control blocks Astro native bindings. Normal Linux CI can remove the forced WASI packages and `NAPI_RS_FORCE_WASI` after verification.

Copy `.env.example` to the deployment environment and set only approved values. Do not commit credentials or private endpoints.

## Architecture

- `src/layouts`: global document shell, metadata, JSON-LD, header, and footer.
- `src/components`: reusable page, form, navigation, and content components.
- `src/data`: launch CTA, navigation, product, and industry data.
- `src/data/pageNarratives.ts`: section-specific product and solution narratives that prevent template filler.
- `src/config/release.ts`: evidence-gated indexability policy.
- `src/content/blog`: dummy Markdown articles, ready to migrate to a CMS adapter later.
- `src/pages`: static P0 marketing, product, industry, blog, legal, and system routes.
- `src/styles`: brand tokens, responsive layout, and reduced-motion-safe interactions.
- `public`: approved brand exports, favicons, fonts, and Open Graph fallback.
- `scripts/site-audit.mjs`: built-output SEO and content invariant checks.
- `.github/workflows/quality.yml`: reproducible check, build, static audit, and dependency audit gate.
- `docs/url-map.csv`: implemented route inventory.

## Design direction

Reading this as a B2B website for Indonesian MSME owners with calm, practical intelligence. The implementation uses `DESIGN_VARIANCE: 7`, `MOTION_INTENSITY: 5`, and `VISUAL_DENSITY: 4`.

Motion is CSS-first with a small shared IntersectionObserver reveal. The folded-card composition communicates raw signals becoming one useful direction. The official logo stays static. There is no WebGL, autoplay video, large animation library, or continuous scroll listener.

Reference patterns used as direction, not copied assets: Linear for precise reveals, Stripe for data-to-decision storytelling, Shopify Editions for tactile bento rhythm, Wise for plain-language business UX, and Apple product pages for one-idea-per-viewport pacing.

## Launch gates

- Connect `POST /api/leads` to the approved backend or edge function before accepting real leads.
- Replace legal placeholders only after legal approval.
- Set `PUBLIC_SITE_URL` to the final production origin if it differs from `https://ramuni.id`.
- Review the built-in consent wording, then connect its `ramuni:consent` event to approved GTM/Consent Mode, GA4, and ad pixels only after PII tests pass.
- Keep preview details noindex by default. Set `PUBLIC_CLAIM_PAGES_APPROVED=true`, `PUBLIC_SECURITY_REVIEW_APPROVED=true`, or `PUBLIC_CALCULATOR_REVIEW_APPROVED=true` only after the matching owner signs off.
- CMS is intentionally deferred. Blog content is local dummy content for template validation.
- Run a deployed Lighthouse test on the final CDN because TTF caching, compression, and edge headers depend on the hosting platform.

## Brand sources

Do not replace or modify the approved logo files. Working sources remain under `brand/RAMUNI`; the final archive under `dist/` is immutable.
