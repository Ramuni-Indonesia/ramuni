# RAMUNI Codex Handoff for MeetsIn Server Continuation

Snapshot date: 2026-07-26 Asia/Jakarta

Repository: `https://github.com/Ramuni-Indonesia/ramuni.git`

Canonical checkout: `/home/meetsin/internal/ramuni-source`

Canonical branch: `main`

This is the current operational handoff for the RAMUNI Astro marketing and blog site. It must never contain plaintext PATs, API tokens, passwords, secret environment values, real lead PII, or tenant data.

## Current release

- Published runtime commit: `6b4651d56924226ada64ababb70517a9db8f322a` (`feat: diversify visual product storytelling`).
- Visual/tablet implementation commit: `8e83afaa30fbf14e49876ae207db633109386670` (`fix: stabilize tablet visuals and motion`).
- CSS release-gate follow-ups: `6081e38` and `608fd57`; both keep `/blog/cari` below the route CSS budget after the visual batch.
- Contextual visual implementation commit: `6b4651d`; it is rebased onto and identical to current `origin/main`.
- Active staging release: `20260726T170644Z-6b4651d56924`.
- Active release path: `/var/www/ramuni-staging/releases/20260726T170644Z-6b4651d56924`.
- Deployed artifact SHA-256: `5ca766dba3a91e7f746e8ce6ae365609fe5562ea0f11cb9e57156df251224adb`.
- Staging URL: `https://staging.ramuni.id`.
- Staging is intentionally fail-closed: HTTP `X-Robots-Tag` includes `noindex`, HTML uses `noindex,follow`, responses use `Cache-Control: no-store`, and sitemap endpoints return 404.

## Repository workflow

- The user authorized direct commits and pushes to `main`; the old mandatory PR/merge workflow is cancelled for this repository.
- Before implementation, use `git pull --ff-only origin main` from a clean worktree. Never commit blindly from the canonical checkout while it contains content-gateway WIP.
- Run the release gates before pushing runtime changes. Push the tested commit first, then deploy exactly that SHA and verify staging.
- Documentation-only commits do not require redeployment.
- Do not mix `/home/meetsin/internal/ramuni-saas-source`, `/home/meetsin/internal/ramuni-cms`, or `/home/meetsin/internal/ramuni-handoff` into this marketing repository.
- Remove temporary worktrees and generated dependencies only after their commit is published and their dirty state has been reviewed.

## Source of truth and brand rules

Read these before copy, information architecture, design, blog, or SEO changes:

- `docs/13-final-brand-implementation-brief.md`
- `docs/08-marketing-website-blog-developer-handover.md`
- `docs/10-marketing-pages-blog-content-brief.md`
- `docs/README.md`
- `brand/RAMUNI/RAMUNI-BRAND-GUIDELINES.md`

Final brand language:

- `AI Business Companion untuk UMKM Indonesia`
- `Meramu insight. Memberi arah.`
- `Pahami bisnis Anda. Tahu langkah berikutnya.`

The official logo stays static: no rotation, gradient, glow, shadow, distortion, or 3D transformation. Decorative 2D/3D visuals may express `catatan -> bukti -> arah` without changing the logo. Never invent customer logos, metrics, testimonials, integrations, certifications, reviewers, sources, or hard claims. Use practical Bahasa Indonesia for UMKM owners.

## What is implemented

- Responsive navbar, mega menu, hamburger behavior, larger brand lockups, footer, floating contact, and scroll-to-top behavior.
- Normalized heading scale, text measures, mobile/tablet card behavior, CTA layout, and reveal-motion guardrails.
- Product, solution, role, industry, resource, template, calculator, blog, help, security, about, contact, and error journeys have visual/component-based treatments rather than relying only on long text blocks.
- Product and solution pages use contextual synthetic dashboard raster visuals and decision flows. They must not be presented as real customer data.
- Home and product flows include brand-safe mascot/decision visuals. Heavy motion is gated for reduced-motion, save-data, touch, and viewport lifecycle conditions.
- Pricing remains hidden. `/tour-produk-gratis/` is the focused conversion form without the normal navbar/footer.
- `/demo`, `/early-access`, and `/harga` redirect in one hop to `/tour-produk-gratis/`.
- All official WhatsApp contact links use `https://wa.me/message/K35W6X6WT7YMJ1`.
- Visitor-facing internal editorial/release status labels were removed while metadata gates remain.
- Seven practical calculator flows and real downloadable CSV template resources are present.
- Help center has local search/filter behavior and accessible status messaging.
- `/bantuan/`, `/keamanan/`, and `/tentang/` were redesigned in the latest release.
- Product hub, solution hub, product detail, and solution detail heroes now keep their split composition from 961px through 1200px while the navbar independently stays in hamburger mode through 1200px.
- Tool, guide, glossary, template, resource, and blog heroes use the same 961px large-tablet split handoff while their lower-content grids retain safer tablet stacking.
- Decorative reveal, hover, mascot, orbit, and data motion is gated away from touch/tablet and coarse-pointer devices; reveal observers settle once instead of flickering during repeated scroll.
- Homepage companion art now uses one web-specific HashMicro-generated `catatan -> bukti -> arah` visual. The redundant overlaid mascot/caption and the obsolete `ramuni-decision-landscape.webp` asset were removed.
- `MascotDecisionCTA` is flatter and smaller, with no orbit decoration or forced 3D tilt. Product/solution visual animations now run only on fine-pointer desktop.
- Tablet/touch headers are opaque without backdrop blur; blur is limited to fine-pointer desktop above 1200px. A hidden-before-clip overflow fallback protects older Safari while modern browsers retain sticky-safe `overflow-x: clip`.
- Product/solution GSAP scroll motion now runs only above 1200px on fine-pointer hover devices and reverts when motion preferences or the device breakpoint changes. Reveal settling is animation-name agnostic, and reveal-linked industry keyframes no longer start from zero opacity.
- Nine product pages and four role pages have unique SEO metadata; role pages have explicit self-canonicals.
- Internal links use trailing-slash canonical routes. Header/footer matching and solution-icon routing follow the same convention.
- All nine product icons and all five solution icons are available. The latest three solution icons are `pantau-laba-dan-arus-kas`, `pahami-pelanggan`, and `laporan-bisnis-otomatis`; their optimized WebP files are committed and synchronized to R2.
- Product detail, solution detail, industry, role, help, and selected blog pages now select dashboard art by context instead of repeating one generic shell.
- Four web-optimized synthetic dashboards cover AI/evidence, inventory/reorder, cash flow, and sales/customer contexts.
- Blog article layout now uses a wider reading area with a useful TOC/tools rail; AI, cash-flow, and stock articles have distinct contextual dashboards and relevant tool/resource routes.
- The old large WebGL mascot block was removed. `DecisionFlow3D.astro` is now a lighter 2.5D workbench whose small mascot accent changes by step.
- Repository audit found one verified mascot character only: Muni si Manyar. The available files are pose/style variants of Muni, not three different approved characters; do not invent additional mascot identities without approved source art.

Useful visual components and assets:

- `src/components/product/ProductHeroCanvas.astro`
- `src/components/product/ProductDomainVisual.astro`
- `src/components/product/SolutionDataVisual.astro`
- `public/website-original/ai-decision-companion.svg`
- `public/website-original/stock-ops-board.svg`
- `public/website-original/cash-signal-ledger.svg`
- `public/website-original/ramuni-mascot-muni-manyar.webp`
- `public/website-original/ramuni-mascot-problem-section.webp`
- `public/website-original/dashboards/ramuni-dashboard-ai-evidence.webp`
- `public/website-original/dashboards/ramuni-dashboard-inventory-reorder.webp`
- `public/website-original/dashboards/ramuni-dashboard-cash-flow.webp`
- `public/website-original/dashboards/ramuni-dashboard-sales-customer.webp`
- `public/website-original/mascot/ramuni-mascot-working-dashboard.webp`

No verified real customer dashboard screenshots were found in the supplied product references. The current contextual dashboards are synthetic brand visuals; keep truthful synthetic labels and replace them only when approved product screenshots exist.

## Latest validation evidence

- Astro check: 109 files, zero diagnostics.
- Staging build: 87 pages.
- Full metadata, social, schema, accessibility, content-marker, internal-link, sitemap/noindex, robots, encoding, and asset-budget audit passed.
- `npm audit`: zero vulnerabilities.
- R2 sync covered 71 assets; the four dashboards and working-dashboard mascot were uploaded in this release.
- A stale negative Cloudflare cache entry initially kept `ramuni-mascot-working-dashboard.webp` at 404 after upload. The exact URL was purged successfully and now returns HTTP 200 with `image/webp`.
- The minified live stylesheet preserves `overflow-x: hidden` for older engines and upgrades `html`, `body`, and `main` to `overflow-x: clip` inside `@supports`.
- Live staging checks returned HTTP 200 for `/healthz`, the homepage, product hub/detail, solution hub, blog, calculator hub, and contact page.
- Live staging remains fail-closed: HTTP `X-Robots-Tag` is noindex, HTML is `noindex,follow`, responses are `no-store`, and sitemap endpoints return 404.
- `/demo/`, `/early-access/`, and `/harga/` return a single 301 hop to `/tour-produk-gratis`.
- Representative staging routes return HTTP 200.
- The three latest solution icons return HTTP 200 from the CDN with the expected optimized WebP sizes.
- Nginx config test passed before reload. Active config: `/etc/nginx/sites-available/staging.ramuni.id`; backup: `/etc/nginx/sites-available/staging.ramuni.id.bak-20260726T1338Z`.
- Deployment health check passed for release `20260726T170644Z-6b4651d56924` and artifact `5ca766dba3a91e7f746e8ce6ae365609fe5562ea0f11cb9e57156df251224adb`.
- Live homepage contains the new companion asset, live header JavaScript uses the 1201px fine-pointer desktop threshold, and the new CDN asset returns HTTP 200 at 24,450 bytes.

Browser automation is currently unreliable on this host. Chromium, Firefox, Playwright, and CLI screenshot attempts hang before a trustworthy render. Static responsive and route checks passed, but do not claim fresh screenshot or PSI evidence for this release. Human visual QA is still required at 390, 1024, 1194, and 1440px before production promotion, especially for:

- horizontal overflow and right-side tablet gutters;
- sticky navbar shape after scroll;
- hero composition at 11–12 inch tablet widths;
- mascot scale and visual hierarchy;
- reveal/card flicker during repeated scrolling;
- floating contact and scroll-to-top visibility.

## Image generation protocol

- Route all raster generation and editing through the enabled `hashmicro-imagegen-native@hashmicro-xai-local` plugin.
- Use its native generation/edit/result tools; do not use built-in ImageGen or the legacy CLI while the plugin is available.
- Pass `codex/gpt-5.6-sol` when the active model is 5.6-sol.
- Use one job at a time, medium quality unless the brief requires otherwise, and store generation sources below the active workspace `outputs/` directory.
- Generate web-specific art in RAMUNI brand colors. Do not reuse Instagram artwork as a website hero unless explicitly approved.
- Do not blindly resubmit an identical timed-out job. If the native plugin is unavailable, report the loading/configuration error and ask for a Codex restart instead of silently changing providers.

## Preserved content-gateway WIP

The canonical checkout is not a safe release source until this work is reconciled:

- `/home/meetsin/internal/ramuni-source`
- stash `ramuni-content-gateway-live-wip-pre-release-20260726`
- stash `ramuni-content-gateway-wip-pre-release-20260726`
- `/home/meetsin/internal/ramuni-source-cms-provider`
- `/home/meetsin/internal/ramuni-source-marketing-gateway`

Do not apply, pop, drop, overwrite, or commit these changes before reviewing their unique files and overlap with published `main`. Preserve the stashes until the dedicated gateway worktrees have been reconciled and tested.

Latest read-only gateway audit:

- The canonical checkout contains almost the full older release staged plus gateway wiring in `src/pages/produk/[slug].astro` and `src/pages/solusi/[slug].astro`; it is not safe for pull, reset, or commit.
- `stash@{0}` combines the older release snapshot with live gateway WIP. `stash@{1}` is an earlier gateway implementation. Keep both until their behavior is compared with the provider branch, especially the older `artifact-publisher.mjs` path.
- Continue gateway development only from `/home/meetsin/internal/ramuni-source-cms-provider`. It has local commit `2538ffd` plus dirty provider/build-runner/config/server/store/package refinements that still need rebase and testing.
- The obsolete clean worktree `/home/meetsin/internal/ramuni-source-marketing-gateway` had no unique commits and was removed after audit. Its local branch may be deleted separately after confirming it is not referenced.

## Remaining visual-content backlog after this release

The requested contextual visual batch is complete. Remaining work should be treated as targeted refinement, not a repeat of the completed redesign:

- Replace synthetic dashboards only when approved real product screenshots become available; never imply synthetic values are customer data.
- If the brand truly has three different mascot characters, obtain and document the missing approved master assets and names first. The repository currently proves only Muni si Manyar with multiple poses/styles.
- Continue differentiating tool cards and article imagery only where the topic benefits from it, while preserving the passing route CSS/image budgets.
- Run human visual QA at the listed responsive widths before production promotion because browser automation remains unreliable on this host.
- Keep new raster generation on the native HashMicro plugin and keep disposable source outputs outside the published tree.

## Next continuation workflow

1. Start from a new clean worktree based on `origin/main`; do not use the dirty canonical checkout as a release worktree.
2. Review the brand and content briefs before changing copy or visual direction.
3. Implement one coherent batch. Keep simple pages such as legal/privacy restrained; richer product, solution, blog, and resource pages may use more visual interaction.
4. Run Node 22 Astro check, staging build, `scripts/site-audit.mjs`, dependency audit, syntax checks, and `git diff --check`.
5. Confirm the final build is staging mode with no sitemap and fail-closed noindex behavior.
6. Push the exact tested commit to `main`, deploy that SHA atomically, synchronize R2 without deleting unrelated objects, and verify `/healthz`, representative routes, redirects, headers, and CDN assets.
7. Update this handoff with the pushed commit, release ID, artifact digest, test evidence, remaining limitations, and cleanup performed.

## Excluded from handoff

- plaintext PATs, API tokens, passwords, or `.env` secrets;
- `node_modules`, `dist`, `.astro`, screenshots, and temporary generation sources;
- unrelated HashMicro/MeetsIn production secrets;
- raw Codex memory or unrelated repositories.

Use the server's authenticated Git/SSH configuration for pushes. Never paste credentials into commands, repository files, or this handoff.
