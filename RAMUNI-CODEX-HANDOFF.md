# RAMUNI Codex Handoff for MeetsIn Server Continuation

Snapshot date: 2026-07-26 Asia/Jakarta
Canonical server checkout: `/home/meetsin/internal/ramuni-source`
Canonical branch: `main`

This handoff lets Codex on the MeetsIn server continue the RAMUNI Astro marketing/blog build with the user feedback, design direction, implementation history, and unfinished backlog from the local session. It must contain no plaintext PAT, token, password, secret env, real lead PII, or tenant data.

## Repository state and workflow

- Remote: `https://github.com/Ramuni-Indonesia/ramuni.git`
- Canonical checkout: `/home/meetsin/internal/ramuni-source`
- Canonical branch/upstream: `main` / `origin/main`
- Current published source commit: `dbf4db1487ff36d980c38248ed63f7d60fe18675`
- Current staging release: `20260726T133603Z-dbf4db1487ff`
- Current deployed artifact SHA-256: `0deaf19805d4813e65f562a5385c1075d531c418ed8200acdd6fec90ab3161c3`
- The user explicitly authorized direct commits and pushes to `main`. The previous mandatory continuation-branch, pull-request, and merge workflow is cancelled for this repository.
- Always pull with `git pull --ff-only origin main`, verify a clean worktree, run the release gates, push `main`, then deploy and verify staging when runtime files changed.
- `/home/meetsin/internal/ramuni-saas-source`, `/home/meetsin/internal/ramuni-cms`, and `/home/meetsin/internal/ramuni-handoff` are separate repositories or contexts; do not mix them into the marketing site.
- Old worktrees are audit sources only. Preserve unique valid work in `main`, then remove obsolete worktrees only after they are clean or their dirty state has been fully reviewed.

## Current authoritative release checkpoint

- Published directly to `main`: `dbf4db1487ff36d980c38248ed63f7d60fe18675` (`feat: strengthen ramuni trust support and seo journeys`). This supersedes older sections below that describe commits as pending push or staging activation as blocked.
- Deployed staging release: `20260726T133603Z-dbf4db1487ff` with artifact SHA-256 `0deaf19805d4813e65f562a5385c1075d531c418ed8200acdd6fec90ab3161c3`.
- `/bantuan/`, `/keamanan/`, and `/tentang/` were redesigned. Nine product pages and four role pages now have unique SEO metadata; role pages also have explicit self-canonicals.
- Internal links were normalized to trailing-slash canonical URLs across 44 source files. Header/footer route matching and the solution-icon slug resolver were updated for the same URL convention.
- Added the three previously missing solution icons for `pantau-laba-dan-arus-kas`, `pahami-pelanggan`, and `laporan-bisnis-otomatis`. The optimized WebP files are committed, synchronized to R2, and return HTTP 200 from the CDN.
- Help-center landmark nesting, visible keyboard focus, and the 1194px desktop-layout breakpoint were corrected. Audit routing now understands trailing-slash directory output.
- Validation passed on Node 22: Astro check covered 100 files with zero diagnostics; 87 staging pages built; metadata, schema, accessibility, internal-link, robots/noindex, sitemap, encoding, and asset-budget gates passed; `npm audit` found zero vulnerabilities; all 67 R2 assets were synchronized.
- Staging remains deliberately fail-closed: global HTTP `X-Robots-Tag` contains `noindex`; HTML contains `noindex,follow`; responses use `Cache-Control: no-store`; sitemap endpoints return 404; representative routes return HTTP 200.
- Nginx legacy aliases `/demo`, `/early-access`, and `/harga` now redirect in one hop to `/tour-produk-gratis/`. The active config is `/etc/nginx/sites-available/staging.ramuni.id`; backup is `/etc/nginx/sites-available/staging.ramuni.id.bak-20260726T1338Z`. `nginx -t` passed before reload.
- Browser automation is currently unreliable on this host: Chromium, Firefox, Playwright, and CLI screenshot attempts hang before a trustworthy render. Static responsive checks and route smoke tests passed, but do not claim a fresh screenshot verdict for this release. Perform human visual QA at 390, 1024, 1194, and 1440px before production promotion.
- Safe release worktree used for this release: `/home/meetsin/internal/ramuni-release-20260726`. The canonical checkout `/home/meetsin/internal/ramuni-source` contains separate content-gateway WIP and must not be committed blindly.
- Preserve the content-gateway stashes `ramuni-content-gateway-live-wip-pre-release-20260726` and `ramuni-content-gateway-wip-pre-release-20260726`, plus worktrees `/home/meetsin/internal/ramuni-source-cms-provider` and `/home/meetsin/internal/ramuni-source-marketing-gateway`, until their unique changes have been reviewed. Do not apply or drop those stashes into the canonical checkout without an overlap audit.

## Responsive stability and companion visual release

- Implemented and pushed directly to `main`: `d88eb1f9a814e943a70b1a964d0cabf8e582ef15` (`fix: stabilize ramuni responsive layout and visual flow`).
- Deployed staging release: `20260726T122545Z-d88eb1f9a814`.
- Deployed artifact SHA-256: `9f2de13c7d29c3d75d290935b48a1b8156869af1c929895ec48fc43f1653b266`.
- The header is now genuinely sticky, retains its shape after scroll, sits above page controls, and hides floating actions while the mobile menu is open. `overflow-x: clip` preserves sticky behavior without reintroducing page-level horizontal movement.
- Desktop navigation and split heroes now start at `1081px`, allowing 11–12 inch landscape tablets such as the 1194px viewport to keep the desktop composition. CSS and `header-nav.js` use the same breakpoint.
- Homepage and shared page heroes retain two-column composition on large tablets, while smaller tablets/mobile use the contained single-column fallback. Logo sizes, H1–H4 scale, line height, weight, and text measures were normalized.
- Reveal motion now uses individual CSS `translate`, runs once, and settles without overwriting transforms owned by component layouts. Homepage mascot pointer/scroll motion only runs on large hover-capable screens and cleans up observers, listeners, and animation frames.
- The old image-heavy/blank homepage 3D presentation was replaced with one restrained visual explanation plus one decorative mascot and a semantic `Catatan → Bukti → Arah` rail. Product-level Three.js remains available with stronger disposal and Astro view-transition cleanup.
- New raster artwork was generated through the HashMicro native image plugin with model `codex/gpt-5.6-sol`, then optimized to `public/website-original/ramuni-decision-landscape.webp` at 1280×720 and 24.5 kB. The default OG PNG was losslessly/palette optimized from 23.0 kB to 2.2 kB so the site-wide image budget remained below the release gate.
- Browser QA passed at 390, 1024, 1194, 1280, and 1440px, with breakpoint spot checks at 1080/1081px. Sticky header stayed at `top: 0` after scrolling, document/body width matched the viewport, generated art loaded, and repeated scroll sampling found no reveal flicker or disappearing cards. Temporary screenshot evidence was reviewed, then moved to trash with the generation source and build artifacts after verification.
- Node 22 validation passed: Astro check reported zero diagnostics, 87 staging pages built, full metadata/schema/accessibility/link/noindex/robots/asset-budget audit passed, and `npm audit --audit-level=high` found zero vulnerabilities.
- Live staging verification passed: HTTP/2 200, `Cache-Control: no-store`, global `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`, HTML `noindex,follow`, sitemap 404, and the generated CDN asset returns HTTP/2 200 with public cache directives.

## Visual, mascot, and tablet-responsive continuation — local commits pending push

- Current implementation commit on local `main`: `cf58377` (`feat: refine ramuni visuals and tablet responsiveness`). Preserve it together with `0650b80` and `8a8f4bd`; the checkout is ahead of `origin/main` because this server still has no usable GitHub HTTPS credential or authorized SSH key.
- Homepage, role, industry, solution, product, blog-search, calculator, and CTA journeys were made more visual with component-built dashboards, context boards, mascot-guided states, distinct calculator visuals, and reduced text-only composition. Simple/trust pages remain intentionally restrained.
- Added a real procedural Three.js Muni model in `src/components/MuniMascot3D.astro` and `src/three/`. It loads near the viewport, adapts its camera to tablet/mobile, pauses outside the viewport, supports pointer drag without blocking vertical scroll, and fully disposes geometry, materials, observers, listeners, and WebGL context. Reduced-motion and save-data use the poster without allocating WebGL.
- Mascot exploration is release-gated. With `PUBLIC_MASCOT_EXPLORATION_APPROVED=false`, production output contains no reference to `/website-original/mascot/ramuni-mascot-3d-*`; approved abstract decision artwork is used instead. Do not remove this gate until final mascot approval is recorded.
- Tablet/narrow-desktop layout rules now switch major hero, product, solution, role, industry, blog, resource, form, and CTA compositions to one column at or below 1200px. Global `min-width:0`/max-width guardrails prevent grid min-content overflow; large visuals are centered instead of clipping or leaving an uneven right gutter.
- Persistent actions were repaired: scroll-to-top now uses a throttled `scrollY` threshold instead of relying only on a sentinel, while the contact control has safe-area offsets, viewport width limits, and a higher stacking layer.
- Header/footer use larger tightly cropped lockups. Heading tokens, text measures, mobile button behavior, reveal motion, breadcrumbs, and hamburger behavior are normalized across templates.
- Solution hub now covers all five solution problems, including Laporan. Calculator cards use H3 headings and distinct patterns. Blog search has visual results and accessible live-status semantics.
- Validation on Node 22: Astro check passed on 100 files with zero diagnostics; staging and production-like builds each generated 87 pages; the full metadata/social/schema/accessibility/internal-link/sitemap/noindex/robots/encoding/asset-budget audit passed; `npm audit --audit-level=high` found zero vulnerabilities; `git diff --check` passed.
- Staging contract remains fail-closed: `noindex,follow`, crawlable robots, and no sitemap files. The final `dist` must be rebuilt in staging mode after any production-like gate test.
- Headless Chromium was downloaded for QA but could not complete even a blank-page capture in this host environment and was terminated. Responsive source/build checks passed, but human visual QA is still required at 1440, 1194, 1024, 834, 768, 390, and 360 widths.
- Push and staging deployment remain blocked only by missing server GitHub authentication. Never reuse plaintext credentials from chat or history. Restore the server credential helper or SSH authorization, push the existing local `main`, then deploy and verify the exact pushed SHA.

### Second responsive, typography, and visual-density batch committed locally

- Implemented on local `main` as `bef1b97` (`fix: normalize ramuni tablet layout and motion`). Push and staging deployment remain blocked by missing server GitHub authentication.
- The tablet hamburger breakpoint is synchronized between CSS and JavaScript at `max-width: 1200px` / `min-width: 1201px`. The mobile panel now measures the real rendered header height with `ResizeObserver`, so a wrapped announcement cannot overlap or leave a false top gap.
- Navbar and footer lockups are larger while preserving the supplied brand asset. Shared H1-H4 tokens, weights, line heights, title measures, section measures, and body wrapping are normalized. Indonesian copy uses `break-word` rather than arbitrary mid-word splitting, and narrow product/solution hub headings have safer measures.
- Major sticky/two-column layouts collapse at the tablet breakpoint. Homepage problem cards and mascot move into normal flow at or below 1200px, preventing the mascot or reveal animation from crossing into another section. PageHero visuals are shorter in tablet portrait.
- Reveal elements settle after their first animation instead of replaying while scrolling. Heavy continuous product-detail CSS animation was removed; product motion remains in the lazy GSAP controller and interactive components. Touch/reduced-motion fallbacks remain static.
- Contact now includes intent cards, safe-contact steps, and a WhatsApp routing visual. Status uses truthful CSS signal visuals. Shared 404/500/maintenance pages use a lightweight route-map visual. Legal/privacy pages remain intentionally restrained.
- Blog-only editorial CSS moved out of the global bundle and `/blog/cari` imports it explicitly. This keeps commercial and product routes below the existing raw/gzip CSS budgets without raising the audit threshold.
- This batch did not require new raster generation. The HashMicro native image route was therefore not invoked.
- Human browser QA is still required at 1440, 1194, 1024, 834, 768, 390, and 360 widths because the local Chromium runner hangs on this host. Keep `overflow-x` safety guards, but inspect those widths for any visually clipped source element before public launch.

### Staging activation for the responsive continuation

- Activated staging release `20260726T113149Z-a8966cc7a92b` from local commit `a8966cc7a92bf4e56860cd257879cb39f6961b3a`.
- Artifact SHA-256: `815d9f4bbc2c13a2ccd7aa4d213bc02d79fbcc91c01b65cee943e154e2d67280`.
- The atomic document-root symlink now resolves to `/var/www/ramuni-staging/releases/20260726T113149Z-a8966cc7a92b`; the release health script passed against the local origin with the exact expected release ID.
- Public staging returns HTTP/2 200, `Cache-Control: no-store`, `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`, Cloudflare `DYNAMIC`, HSTS, CSP, and HTTP/3 advertisement. `/healthz` reports the same release, source SHA, artifact digest, and deployment timestamp.
- Staging sitemap endpoints `/sitemap.xml` and `/sitemap-index.xml` return 404. `/demo/`, `/early-access/`, and `/harga/` return 301 to `/tour-produk-gratis`. Product, solution, blog, and contact routes resolve through their canonical trailing-slash redirects to HTTP 200.
- A representative asset at `assets-staging.ramuni.id` returns HTTP/2 200 with the intended public cache and stale-response directives. R2 synchronization completed before activation with 29 uploaded and 34 unchanged objects.
- GitHub publication is still pending because this host has no usable non-interactive HTTPS credential and no authorized SSH route. The local `main` is ahead of `origin/main`; do not use plaintext credentials from chat or history.

## Resource tools and navigation continuation — local commit pending GitHub authentication

- Implemented on local `main`: `0650b80` (`feat: expand resource tools and navigation`). The commit is ready but could not be pushed because the server has no usable GitHub HTTPS credential and no authorized SSH key. Do not place a PAT in a command or repository file; restore the server credential helper, then push the existing local commits.
- Staging was intentionally not redeployed because the repository rule requires the runtime commit to be pushed first. The last verified staging release remains `20260726T071410Z-087ec6f3f67a` until authentication is restored.
- Header: removed `Masuk`, added desktop hub links, completed all public mega-menu icons with lightweight assets, tightened active-state semantics, constrained short-viewport mega menus, and corrected mobile panel/icon sizing.
- Tools: expanded the calculator library from three to seven practical calculators, added example presets, visible formula notes, result guidance, FAQ/schema, related resources, and a generated/optimized workspace visual.
- Resources: redesigned `/panduan` and `/kamus-bisnis` index/detail pages with Muni-led visual flows, practical scenarios, filters, HowTo/DefinedTerm schema, internal links, and responsive motion. Added schema and related-resource improvements to `/template` and explicit breadcrumb schema to resource hubs.
- SEO/indexation: added fail-closed sitemap gating for calculator, guide, glossary, and template index routes; staging output remains `noindex,follow`, robots remains crawlable, and no sitemap is generated.
- Quality evidence: Astro check passed on 95 files with zero diagnostics; 87 static pages built; metadata, social preview, manifest/icons, accessibility, schema, internal links, sitemap/noindex, robots, encoding, and production asset budgets passed; dependency audit found zero vulnerabilities. Static QA covered 22 resource/tool routes with one H1, self-canonical/hreflang, accessible breadcrumbs, valid schema, no broken local links/assets, and no duplicate IDs.
- Cleanup: removed the 2.3 MB generation source after preserving the optimized 1200x675 WebP public asset, then moved the verified 5.3 MB `dist` and 84 KB `.astro` outputs to trash. The deployment script will rebuild them after GitHub authentication is restored.

## Server continuation integration checkpoint

- Integrated and pushed directly to `main`: `971afaf7f5d753af73317fda55185ee580f5a0d7` (`feat: integrate marketing continuation into main`).
- Deployed staging release: `20260726T063517Z-971afaf7f5d7`.
- Deployed artifact SHA-256: `c62b1fb48c77b255922874f85168a2abc89329738f0db7be4fbf3591c875639c`.
- Quality evidence: Astro check passed on 92 files with zero diagnostics; 83 static pages built; the full metadata, social preview, manifest, accessibility, schema, internal-link, sitemap/noindex, robots, encoding, and asset-budget audit passed; dependency audit found zero vulnerabilities.
- Staging evidence: public homepage returns HTTP/2 200 with `Cache-Control: no-store`, global `X-Robots-Tag: noindex`, Cloudflare `DYNAMIC`, and HTTP/3 advertisement; `/sitemap.xml` returns 404; `/demo` returns 301 to `/tour-produk-gratis`; the new template routes return 200; newly uploaded R2 assets return a cache HIT after warm-up.
- R2 synchronization added three downloadable template CSV files and updated the changed public scripts without deleting remote objects.
- Removed obsolete server worktrees after review: `codex-ramuni-marketing-site`, `staging-performance-20260725`, and `website-seo-ci`. This reclaimed about 1.09 GB. Their committed branch history remains in Git; reviewed uncommitted work was either integrated into `main` or intentionally discarded because newer `main` infrastructure superseded it. The incomplete old `nginx-restart.conf` override was not promoted.

## Product, solution, and blog visual continuation

- Implemented and pushed directly to `main`: `6344d910fca6` (`feat: enrich product and solution visual journeys`) and accessibility follow-up `087ec6f3f67aa777529aa502bee3f872c151b2f5` (`fix: strengthen visual control accessibility`).
- Deployed staging release: `20260726T071410Z-087ec6f3f67a`.
- Deployed artifact SHA-256: `27ac0c55de9e0d056cb9febb8c300e88dfbdf03322202df93886dfdcf4fb2316`.
- Product detail heroes now pair concise outcome copy with the interactive Ringkasan/Bukti/Batas dashboard. The product-specific synthetic dashboard remains available in the example section rather than being discarded.
- Product hub and all product details now close with a mascot-guided, keyboard-operable Catatan/Bukti/Arah decision workspace instead of a text-and-button block.
- The solution hub now has an interactive Muni problem map. Solution detail heroes use a split layout and expose Pola/Bukti/Langkah views from existing synthetic data, with explicit manual-decision boundaries.
- Solution hub/detail closing sections now use the same richer mascot decision workspace. Blog archive/article closing sections use a lighter editorial version with proper tablist/tabpanel keyboard behavior.
- Visitor-facing internal `editorialStatus` text was removed from article sidebars while metadata and release gates remain intact.
- Accessibility follow-up added target relationships between visual controls and panels. Decorative mascot images retain empty alt text; informative visual regions keep accessible labels.
- Quality evidence: Astro check passed on 95 files with zero diagnostics; 83 static pages built; metadata, social preview, manifest, accessibility, schema, internal-link, sitemap/noindex, robots, encoding, and production asset-budget audit passed; dependency audit found zero vulnerabilities.
- Staging evidence: health reports SHA `087ec6f3f67a`; representative product, solution, and blog routes return HTTP/2 200 with `Cache-Control: no-store` and global `X-Robots-Tag: noindex`; `/sitemap.xml` returns 404; `/demo` redirects to `/tour-produk-gratis`; mascot asset is served from R2/CDN with `cf-cache-status: HIT`.
- Known limitation: a Chromium executable is not installed in this workspace, so browser screenshot comparison was not available. Static responsive rules, rendered HTML contracts, route markers, and production deployment checks passed; perform a human visual pass on desktop/tablet/mobile before declaring the broader site live-ready.

## Source of truth

Read before copy, IA, brand, blog, or SEO changes:

- `docs/13-final-brand-implementation-brief.md`
- `docs/08-marketing-website-blog-developer-handover.md`
- `docs/10-marketing-pages-blog-content-brief.md`
- `docs/README.md`
- `brand/RAMUNI/RAMUNI-BRAND-GUIDELINES.md`
- `dist/RAMUNI_Final_Lipat_Arah_Brand_Kit.zip`
- Product reference only: `RAMUNI-Product-Developer-Handover-v2.0-2026-07-25.zip`

Final brand:

- `AI Business Companion untuk UMKM Indonesia`
- `Meramu insight. Memberi arah.`
- `Pahami bisnis Anda. Tahu langkah berikutnya.`

Logo is static: no rotation, gradient, glow, shadow, distortion, or official-mark 3D. Decorative 3D may express `catatan -> bukti -> arah` without changing the logo. Do not invent customer logos, metrics, testimonials, integrations, certifications, or hard claims. Use practical Bahasa Indonesia for UMKM owners.

## User feedback that drives the next pass

The user repeatedly said the site is not live-ready because:

1. Too many sections repeat large text on one side and cards/lists on the other.
2. Pages still feel like text/card dumps and AI-slop.
3. Product/solution heroes need stronger images or dashboard visuals.
4. Navbar/mega-menu icons must be real assets, not text placeholders such as `PJ` or `KP`.
5. Blog pages have excessive blank space, oversized text, awkward composition, and visible internal editorial-status copy.
6. Resource/tool/template pages need clearer functions and stronger UI; remove or consolidate pages with no value.
7. Home section 2 mascot was clipped/off-center and still not convincingly animated/3D.
8. Muni should move with scroll and guide/point toward the problem cards.
9. Generated images/icons must use `hashmicro-imagegen-native`, one at a time, medium quality.
10. Product/solution pages need richer dashboard/product UI visuals inspired by strong SaaS pages, but specific to RAMUNI.
11. CTA buttons should share one row when space allows; stacked mobile CTAs should be full-width.
12. Pricing stays hidden.
13. `/tour-produk-gratis` is a focused form without navbar/footer. `/demo` and `/early-access` should not remain separate main pages.
14. Scroll-to-top and floating contact/chat must work; all WhatsApp links use `https://wa.me/message/K35W6X6WT7YMJ1`.
15. Remove public text like `Status profil: noindex sampai struktur penulis...`; keep release gates in metadata, not visitor UI.
16. Instagram art is not a website-hero source unless explicitly approved; generate web-specific assets.

References named by the user: `https://sintra.ai/`, `https://komchat.id/ai/`, `https://www.awwwards.com/awwwards/collections/inspiring-blog-design/`, and HashMicro V11 AI-agent/Hashy OS/product pages for richer hero/dashboard composition.

## Work completed in the current snapshot

- Header/mega menu refined; empty icon boxes removed.
- Icons render only when a real asset exists.
- Pricing and Status hidden from navigation/footer.
- Contact links standardized to the official WhatsApp shortlink.
- Floating contact popup and IntersectionObserver scroll-to-top added.
- `/demo`, `/early-access`, and `/harga` redirect 301 to `/tour-produk-gratis`.
- `/tour-produk-gratis` uses a focused form without navbar/footer.
- Help center has local search/filter behavior; Status link replaced with Keamanan.
- Real template resources exist at `/template/stok-harian`, `/template/arus-kas-sederhana`, and `/template/evaluasi-mingguan` with previews, instructions, limits, and CSV downloads.
- Profit and reorder calculators can be embedded in articles.
- Public draft reviewer block removed; author release gate adjusted.
- Brand-violating 3D logo removed.
- Brand-safe Three.js sculpture `catatan -> bukti -> arah` exists in the product flow.
- Product detail hero was centered, heading reduced, interactive dashboard made full-width, negative margins/tilt removed, and blocking overlay icon removed.
- Solution detail hero received a similar CSS override but still needs desktop/mobile QA.
- Home now includes a release-gated procedural Three.js Muni companion plus 2D/3D mascot story cards. The mobile problem journey keeps the mascot contained and avoids the old sticky overlap/glitch behavior.

## Image generation state

Mandatory protocol:

- only `hashmicro-imagegen-native`;
- one job at a time;
- `quality: medium`;
- no generic ImageGen;
- no blind resubmission of timed-out jobs;
- web-specific prompts, brand colors, no fake claims/logos/customers.

Known failures:

- Solution icon generation using explicit `codex/gpt-5.6-sol` did not return `data[0].b64_json`.
- Mascot edit with or without explicit model selected provider `codex` and failed HTTP 400 because image edit was unsupported.
- Dashboard 16:9 medium generation timed out; do not retry the identical job automatically.

Mascot references:

- `output/mascot-exploration/phase-1/ramuni-mascot-imagegen-route-a-friendly-cute-v2-with-logo.png`
- `output/mascot-exploration/phase-1/ramuni-mascot-imagegen-route-b-friendly-cute-v2-with-logo.png`
- `output/mascot-exploration/phase-1/ramuni-mascot-imagegen-route-c-friendly-cute-v2-with-logo.png`
- `output/RAMUNI-Mascot-Friendly-ImageGen-Phase-1-v2.0.zip`

Route A/Muni is the working recommendation, not final approval.

Product icons are available 9/9. Solution icons available: `naikkan-omzet`, `kelola-stok`. Missing: `pantau-laba-dan-arus-kas`, `pahami-pelanggan`, `laporan-bisnis-otomatis`.

## Asset audit

No real product dashboard screenshots were found in the product ZIP/app folders. Useful web assets:

- `public/website-original/ai-decision-companion.svg`
- `public/website-original/stock-ops-board.svg`
- `public/website-original/cash-signal-ledger.svg`
- `public/website-original/ramuni-mascot-muni-manyar.webp`
- `public/website-original/ramuni-mascot-problem-section.webp`
- `outputs/hashmicro/*.png` as legacy/reference icon source
- `output/mascot-exploration/phase-1/`

The best dashboard visuals are component-built:

- `src/components/product/ProductHeroCanvas.astro`
- `src/components/product/ProductDomainVisual.astro`
- `src/components/product/SolutionDataVisual.astro`

## Verification checkpoint

Latest local evidence:

- `NAPI_RS_FORCE_WASI=1 npx -y node@22 node_modules/.bin/astro check`: 100 files, zero errors/warnings/hints.
- Staging build: 87 pages, `noindex,follow`, no sitemap files, robots `Allow: /`.
- Production-like build with mascot approval false: 87 pages, sitemap generated, no gated 3D mascot raster references in rendered HTML.
- `npx -y node@22 scripts/site-audit.mjs`: all metadata, social preview, manifest/icon, static accessibility, content marker, JSON-LD/schema, internal-link, sitemap/noindex, robots, encoding, and asset-budget checks passed in both staging and production-like modes.
- `npm audit --audit-level=high`: zero vulnerabilities.
- `git diff --check`, `node --check public/scripts/header-nav.js`, and `node --check public/scripts/floating-contact.js`: passed.
- The final generated `dist` was rebuilt in staging mode after the production-like gate test; staging remains fail-closed and has no sitemap output.
- Browser-rendered visual QA remains outstanding because headless Chromium hangs on this host; do not claim screenshot/PSI evidence until a functioning browser runner or external PSI is available.

## Important changed files in the snapshot

Tracked modified/deleted files include:

- `.gitignore`
- `astro.config.mjs`
- `public/scripts/floating-contact.js`
- `public/scripts/home-interactions.js`
- `src/components/FloatingContact.astro`
- `src/components/Footer.astro`
- `src/components/Header.astro`
- `src/components/product/ProductScrollMotion.astro`
- deleted `src/components/product/RamuniMark3D.astro`
- `src/pages/bantuan.astro`
- `src/pages/blog/[...slug].astro`
- `src/pages/blog/penulis/[slug].astro`
- `src/pages/index.astro`
- `src/pages/produk/index.astro`
- `src/pages/template/index.astro`
- `src/styles/blog.css`
- `src/styles/global.css`
- `src/styles/home-refinement.css`
- `src/styles/product-detail.css`
- `src/styles/solution-detail.css`
- deleted `src/three/createRamuniMarkModel.ts`
- deleted `src/three/initRamuniMark3D.ts`

Untracked but important:

- `public/downloads/template/`
- `public/scripts/header-nav.js`
- `src/components/product/DecisionFlow3D.astro`
- `src/components/template/TemplatePreview.astro`
- `src/data/articleCalculators.ts`
- `src/data/templates.ts`
- `src/pages/template/[slug].astro`
- `src/styles/template-library.css`
- `src/three/createDecisionFlowSculpture.ts`
- `src/three/initDecisionFlow3D.ts`
- `cms-platform/` exists but contains `node_modules/`; do not transfer dependencies blindly.

Old 3D-logo files must stay deleted unless a brand-safe alternative is intentionally built.

## Open backlog for server Codex

### P0 visual and UX

1. QA and remove blank/awkward zones on home, product hub/details, solution hub/details, blog home/articles, sumber daya, template library/details, calculators, panduan, kamus bisnis, tentang, bantuan, and keamanan.
2. Replace repetitive text/list sections with varied compositions: centered hero + dashboard strip, visual-first alternation, flow diagram, mini chart, feature explainer, mascot-guided story, and interactive cards.
3. Fix oversized headings and awkward line breaks across breakpoints.
4. Verify CTA layout: full-width when stacked on mobile; one row when space allows.
5. Improve blog home/article UI using modern editorial references: tighter whitespace, stronger hero, readable rhythm, author blocks, credible sources/review gates, no internal status copy.
6. Make resource pages explain their function; consolidate/remove pages with no useful output.
7. Verify scroll-to-top and floating chat across layouts.
8. Verify every contact route uses the official WhatsApp URL.

### P0 assets and motion

1. Generate the three missing solution icons through `hashmicro-imagegen-native`.
2. Generate web-specific hero/section assets rather than reusing Instagram artwork.
3. Add richer visuals/interactive dashboards to product and solution pages.
4. When real screenshots are unavailable, build lightweight product UI previews without presenting them as real customer data.
5. Polish mascot section: centered, unclipped, scroll-following, pointing/guiding cards, ideally 3D or convincing pseudo-3D.
6. Place brand-safe 3D in product/home section 2 or 3 as part of the story, not as an orphan far below.
7. Do not show a casual pause button; if motion control is required for accessibility, integrate it cleanly.

### P0 technical

1. Run check, build, audit, and rendered responsive QA.
2. Fix HTML/CSS budget regressions.
3. Commit and push directly to `main` only after QA, then deploy and verify staging when runtime files changed.

### Editorial gates

- Articles may remain `noindex` and `needs-review` until real sources/review exist.
- Never invent reviewers, authors, credentials, or sources to remove noindex.
- Hide release-gate labels from visitor UI while preserving metadata gates.

## Suggested continuation workflow

```bash
cd /home/meetsin/internal/ramuni-source
git pull --ff-only origin main
git status --short --branch
npm ci --force
npm run check
npm run dev -- --host 0.0.0.0
```

Inspect the rendered site page by page. Do not call it live-ready until visual QA plus build/audit are clean.

After material changes, update this handover with the pushed commit, staging release ID, verification results, unresolved limitations, and any worktree cleanup performed.

## Intentionally excluded from transfer

- plaintext PAT/token/password from chat or env;
- `.env` secrets;
- `node_modules`;
- `dist` and build output;
- unrelated HashMicro/MeetsIn production secrets;
- raw global Codex memory/history unrelated to RAMUNI.

Use the existing Git credential helper or server-authenticated Git config for pushes. Never paste tokens into commands or files.
