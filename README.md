# RAMUNI Website

[![Quality](https://github.com/Ramuni-Indonesia/ramuni/actions/workflows/quality.yml/badge.svg)](https://github.com/Ramuni-Indonesia/ramuni/actions/workflows/quality.yml)

The official static-first marketing website and editorial blog for RAMUNI. It is built with Astro for fast delivery, accessible interaction, strong technical SEO, and a clean path from local Markdown content to a future CMS.

> Publication status: production candidate. The codebase is deployable, but public launch still requires the production lead endpoint, legal and analytics approval, hosting configuration, final responsive QA, and public-domain PageSpeed verification.

## What is included

- Marketing, product, solution, role, and industry pages.
- Conversion routes for early access, demo, pricing, and contact.
- Editorial blog with local Astro content collections and structured author, category, and article templates.
- Resource hubs for guides, calculators, templates, and business terms.
- Technical SEO foundations: canonical URLs, robots policy, sitemap, Open Graph, JSON-LD, and evidence-gated indexability.
- Accessible responsive navigation, forms, consent controls, focus states, and reduced-motion behavior.
- Self-hosted Plus Jakarta Sans and optimized RAMUNI brand assets.
- Static output audit covering metadata, schema contracts, links, accessibility basics, placeholder governance, and asset budgets.

CMS integration is intentionally deferred. Current blog entries are controlled sample content for template and design validation.

## Technology

- [Astro](https://astro.build/) 7 with static output
- TypeScript
- Native CSS and a small IntersectionObserver enhancement
- Local Markdown content collections
- GitHub Actions for repeatable quality gates

The site intentionally avoids a client-side framework, WebGL, autoplay video, and large animation libraries. Motion is CSS-first, restrained, and disabled when the user requests reduced motion.

## Requirements

- Node.js 22.12 or newer in the Node 22 release line
- npm 10 or newer

The supported Node line is recorded in `.node-version`, `.nvmrc`, and `package.json`. CI reads the same version policy, so local and hosted checks do not silently drift apart.

## Local development

```powershell
git clone https://github.com/Ramuni-Indonesia/ramuni.git
cd ramuni
npm ci --force
Copy-Item .env.example .env
npm run dev
```

On macOS or Linux, copy the environment template with `cp .env.example .env`. If you use `nvm`, run `nvm use` before installing dependencies.

Open the URL printed by Astro. Never commit `.env`, credentials, private endpoints, analytics secrets, or access tokens.

`--force` is currently required because the locked Astro WASI fallback packages declare a `wasm32` CPU target. The project uses that fallback because local Windows Application Control blocks Astro native bindings. Revisit this exception after the native compiler path is validated on every supported environment.

## Quality checks

Run the same production-candidate checks used in CI:

```powershell
npm run check
npm run build
npm run audit
npm audit --audit-level=high
```

`npm run audit` inspects the generated `dist/` output. It validates route-level SEO metadata, JSON-LD/schema contracts, sitemap and noindex alignment, internal links, robots policy, static accessibility invariants, content markers, documentation encoding, and production asset budgets.

The GitHub Actions workflow runs these checks on every pull request and every branch push. It first rejects common committed credential patterns, then installs the lockfile, checks Astro and TypeScript, builds with production indexability policy, runs the custom SEO/accessibility audit, and rejects high-severity dependency vulnerabilities. Every successful run retains the generated static site as a seven-day workflow artifact for review.

Dependabot checks npm and GitHub Actions weekly. The pull request template makes brand, credentials, indexability, metadata, schema, and evidence gates explicit during review. A green workflow is necessary but does not replace browser QA, final-domain checks, or public PageSpeed Insights.

## Environment and indexing safety

Copy `.env.example` and provide only reviewed values. Indexing fails closed. An unknown or missing `PUBLIC_DEPLOY_ENV` is treated as local, while local, preview, and staging builds emit `noindex,follow` and exclude routes from the sitemap.

Production indexing requires both values explicitly:

```dotenv
PUBLIC_DEPLOY_ENV=production
PUBLIC_INDEXING_ENABLED=true
```

Page-level claim, security, calculator, and resource approval gates still apply. Do not enable them without the matching owner approval and supporting evidence.

Lead forms also fail closed. Keep `PUBLIC_LEAD_ENDPOINT` empty until an approved endpoint passes validation, origin, CSRF, rate-limit, idempotency, consent, storage, and PII-safe logging reviews.

## Repository map

| Path | Purpose |
| --- | --- |
| `src/pages` | Static routes and data-driven route families |
| `src/layouts` | Global document shell, metadata, schema, header, and footer |
| `src/components` | Reusable navigation, content, consent, and form components |
| `src/content/blog` | Temporary local editorial content |
| `src/data` | Navigation, product data, and page-specific narratives |
| `src/config` | Public environment and release/indexability policy |
| `src/styles` | Brand tokens, responsive layout, and motion rules |
| `public` | Deployable fonts, favicons, Open Graph, brand, and editorial assets |
| `brand/RAMUNI` | Approved brand source and reference exports |
| `scripts/site-audit.mjs` | Built-output SEO, accessibility, content, and performance audit |
| `.github` | Branch/PR quality workflow, Dependabot policy, and review checklist |
| `docs` | Product, content, SEO, analytics, security, and deployment handover |

Start with [`docs/README.md`](docs/README.md) for the document order and [`docs/14-marketing-website-implementation-handoff.md`](docs/14-marketing-website-implementation-handoff.md) for current implementation evidence and launch blockers.

## Design direction

RAMUNI uses the approved Lipat Arah system: calm B2B editorial composition, practical Indonesian copy, structured data storytelling, and motion that explains hierarchy instead of decorating the interface. The official logo remains static. Unverified claims, fabricated customer proof, autonomous AI promises, robots, and generic SaaS visual filler are excluded.

## Release policy

Before a public release:

1. Build from a reviewed commit with a clean lockfile install.
2. Pass the GitHub quality workflow and local production audit.
3. Complete responsive, keyboard, focus, and reduced-motion browser QA.
4. Validate the production endpoint, consent behavior, and PII-safe analytics.
5. Confirm legal, product, security, pricing, and claim approvals.
6. Verify redirects, HTTPS, compression, cache and security headers, canonical URLs, robots, sitemap, and representative routes on the final domain.
7. Run mobile and desktop PageSpeed Insights and Rich Results validation.

The detailed promotion and rollback checklist is in [`docs/deployment-rollback.md`](docs/deployment-rollback.md).

## Security

Do not report vulnerabilities in a public issue. Follow [`SECURITY.md`](SECURITY.md) and the contact instructions in [`public/.well-known/security.txt`](public/.well-known/security.txt). Never commit personal access tokens, API keys, passwords, customer records, or production exports.

## License

No open-source license has been granted. Unless RAMUNI publishes an explicit license, the source code, content, and brand assets remain proprietary and all rights are reserved.
