# RAMUNI Codex Handoff for MeetsIn Server Continuation

Snapshot date: 2026-07-29 Asia/Jakarta

Repository: `https://github.com/Ramuni-Indonesia/ramuni.git`

Canonical checkout: `/home/meetsin/internal/ramuni-source`

Canonical branch: `main`

This is the current operational handoff for the RAMUNI Astro marketing and blog site. It must never contain plaintext PATs, API tokens, passwords, secret environment values, real lead PII, or tenant data.

## Current release

### Published staging batch — `62c58295f577`

- Added a contextual product bridge to every article category, with a product route and a separate `Coba gratis` path.
- Added route-specific animated evidence pipelines to product and solution detail content and reduced repeated generic dashboard chapters on routes where semantic flows explain the feature more honestly.
- Expanded the free resource set to 11 browser-only calculators and 6 downloadable CSV templates. New calculator routes cover harga jual, perubahan omzet, HPP per porsi, and target penjualan; new templates cover penjualan harian, HPP produk, and stok opname.
- Calculator formulas now use a small reusable engine with twelve passing local regression and validation tests covering all eleven calculators. Calculator inputs and template downloads dispatch privacy-safe first-party integration events without exposing entered business values.
- Calculator and template hubs now close with contextual animated product bridges instead of ending only with resource links or privacy copy.
- The floating WhatsApp consultation panel now presents one question bubble plus a single composer per step, uses RAMUNI brand surfaces, and removes the duplicated welcome panel that made the form look nested.
- `TourEvidenceCTA` uses intrinsic contain framing and motion without zoom, reducing visual crop on product, solution, tool, and template CTAs.
- Product and solution heroes now render nine context-aware, code-built marketing dashboard states instead of one repeated raster dashboard. The states use RAMUNI SaaS visual language, synthetic example data, explicit claim disclosure, tablet/mobile re-composition, and one shared finite motion controller that settles after approximately 6.4 seconds.
- Repeated screenshot chapters were removed from product details because the contextual dashboard now appears in the hero and the lower page uses a separate evidence flow. Product-hub family visuals use lightweight code-built boards for insight and operations rather than repeated screenshots.
- Astro check passed across 128 files with zero errors, warnings, or hints. All 12 calculator tests, the 127-page production build, the complete static/site/performance audit, and `npm audit --audit-level=high` passed.
- Browser screenshot QA remains unavailable on this host because no Playwright browser binary is installed; do not claim screenshot-based visual sign-off from this session.
- Published runtime commits: `f3d4d1617e4c` (`expand contextual dashboards and free resource journeys`) and `62c58295f577` (`trim contextual dashboard release budget`). Atomic staging release: `20260729T134246Z-62c58295f577`; artifact SHA-256: `4e1c8a61250c6fc9b629b0d30aaa29d911482c6c3f09af12b68852a1c752e689`.
- Live verification passed for homepage, product, solution, calculator, template, and blog routes. Staging sends `Cache-Control: no-store`, fail-closed `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`, HTML `noindex,follow`, and 404 responses for the sitemap index plus page/blog sitemap endpoints.

- Published runtime commit: `056c40d18ab5` (`trim solution cards for release budget`), including visual CTA and editorial media commit `472b618590e6`.
- Active staging release: `20260729T110110Z-056c40d18ab5`.
- Active release path: `/var/www/ramuni-staging/releases/20260729T110110Z-056c40d18ab5`.
- Deployed artifact SHA-256: `97f472ea88e463d3bd34db6eae0b21adf2ef7a8862d437bce4e38c0619b53d58`.
- Eleven distinct 16:9 blog covers were generated through the native HashMicro image gateway, optimized to 768 x 432 WebP, committed under `public/website-original/blog/generated/`, and synchronized to the staging CDN.
- Article pages now use CMS-compatible intrinsic cover dimensions, a compact visual trial path in the desktop rail, and an interactive contextual CTA after the article. Blog category pages use the same decision-flow CTA family. Industry and role hubs now close with contextual visual evidence instead of plain text banners.
- Shared policy and informational pages retain restrained wording but now show a compact `Tulis pertanyaan -> Hindari data sensitif -> Terima arahan` visual flow beside their closing action.
- CMS article payloads may provide positive `coverWidth` and `coverHeight`; legacy records safely fall back to 1200 x 675. The candidate render test verifies dimensions plus both article CTA surfaces.
- Astro check passed across 121 files with zero errors, warnings, or hints. Content gateway tests, CMS page/article candidate tests, the 98-page production build, full site audit, and `npm audit --audit-level=high` passed with zero vulnerabilities.
- Local and public staging health checks passed. Blog, category, article, industry, role, and solution routes return HTTP 200. Staging remains `noindex,follow` in HTML, sends the fail-closed `X-Robots-Tag`, uses `Cache-Control: no-store`, and returns 404 for all sitemap endpoints.

- Published runtime commit: `440a233ce0becd0d4c6b5ad30cc20e7e6c1368ad` (`refine product motion and contextual visual journeys`).
- The contextual hero and free-trial baseline immediately before this visual/CRO batch was commit `e54a5cfeac6523ded6ec35b74871cb64f4f6a7a7`.
- Active staging release: `20260729T091116Z-440a233ce0be`.
- Active release path: `/var/www/ramuni-staging/releases/20260729T091116Z-440a233ce0be`.
- Deployed artifact SHA-256: `d3c9abf102acd1f5f351a1e468170c493ad5dd222d759241ca5aa3a1e6c7bae8`.
- Staging URL: `https://staging.ramuni.id`.
- Staging is intentionally fail-closed: HTTP `X-Robots-Tag` includes `noindex`, HTML uses `noindex,follow`, responses use `Cache-Control: no-store`, and sitemap endpoints return 404.

## Repository workflow

- The user authorized direct commits and pushes to `main`; the old mandatory PR/merge workflow is cancelled for this repository.
- Before implementation, use `git pull --ff-only origin main` from a clean worktree. The canonical checkout is currently clean and synchronized; re-check it before every new batch because preserved gateway work remains in separate stashes/worktrees.
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

Additional mascot source of truth is available in the isolated RAMUNI Creative Studio review worktree at `/home/meetsin/internal/ramuni-worktrees/creative-studio-brand-assets-20260727`. Its `docs/brand/RAMUNI-BRAND-MASCOT-ASSET-HANDOVER.md` and `docs/brand/RAMUNI-MASCOT-PHASE-1-SERVER-BRIEF.md` define Muni si Manyar, Si Ramu, and Kancil Cermat as three alternative Phase 1 exploration routes. They are not three approved expressions or workflow states. Route A/Muni remains only a working recommendation for staging tests. Do not copy the three routes into visitor-facing decision stages or production until originality, trademark/IP, ownership, named-owner review, and written route approval are recorded.

## What is implemented

- Responsive navbar, mega menu, hamburger behavior, larger brand lockups, footer, floating contact, and scroll-to-top behavior.
- The floating contact action now uses the recognizable WhatsApp glyph instead of the RAMUNI mark, retains an accessible WhatsApp dialog label, and points to the approved RAMUNI WhatsApp channel.
- The mega-menu help icon now uses a compact RAMUNI-colored question-and-reply composition instead of the generic headset illustration; it remains readable at the 34–38 px navigation sizes.
- Normalized heading scale, text measures, mobile/tablet card behavior, CTA layout, and reveal-motion guardrails.
- Product, solution, role, industry, resource, template, calculator, blog, help, security, about, contact, and error journeys have visual/component-based treatments rather than relying only on long text blocks.
- Product and solution chapters now create local paint boundaries with `overflow: clip` and `isolation: isolate`; sticky headings and transformed visuals cannot paint into the following section.
- The product problem, solution problem, and solution scenario sticky headings are structurally bounded by dedicated overview wrappers. Touch/coarse-pointer layouts disable these sticky states, and grid children receive `min-width: 0` overflow protection.
- Product, solution, industry, and role pages now use contextual real RAMUNI product screenshots where the seeded dashboard evidence supports the claim; unsupported AI/import-specific flows retain explicitly conceptual visuals.
- Generic `PageHero` routes no longer infer a product dashboard from their layout mode. Industry, role, and help heroes now render contextual bars, ledgers, flows, role maps, or support journeys; real dashboards remain reserved for product and solution proof.
- The calculator hub hero now uses the `catatan -> bukti -> arah` workspace visual rather than a mascot presenting a dashboard, so its visual matches the input/formula/result task.
- Real product screenshots are cropped from local product evidence that uses demo fixtures, not production tenant or customer data. Public labels say `Tampilan produk · data demo`.
- The homepage hero uses a looping real RAMUNI dashboard overview video as the dominant product proof, with static poster fallback, reduced-motion handling, and a small supporting Muni ornament instead of a competing mascot/card column.
- The homepage problem section is now an interactive problem selector using all three Creative Studio Phase 1 mascot assets for staging exploration: Muni si Manyar, Kancil Cermat, and Si Ramu. Treat them as preview alternatives only until written mascot approval is recorded.
- Pricing remains hidden. `/tour-produk-gratis/` is the focused conversion form without the normal navbar/footer.
- `/demo`, `/early-access`, and `/harga` redirect in one hop to `/tour-produk-gratis/`.
- All official WhatsApp contact links use `https://wa.me/message/K35W6X6WT7YMJ1`.
- Visitor-facing internal editorial/release status labels were removed while metadata gates remain.
- Eleven practical browser-only calculator flows and six real downloadable CSV template resources are present. The calculator engine has local formula tests, while public indexing remains release-gated pending subject review.
- Help center has local search/filter behavior and accessible status messaging.
- `/bantuan/`, `/keamanan/`, and `/tentang/` were redesigned in the latest release.
- Product hub, solution hub, product detail, and solution detail heroes now keep their split composition from 961px through 1200px while the navbar independently stays in hamburger mode through 1200px.
- Tool, guide, glossary, template, resource, and blog heroes use the same 961px large-tablet split handoff while their lower-content grids retain safer tablet stacking.
- Decorative reveal, hover, mascot, orbit, and data motion is gated away from touch/tablet and coarse-pointer devices; reveal observers settle once instead of flickering during repeated scroll.
- Reusable hero/dashboard/evidence/CTA visual layers now opt into a lightweight contextual parallax controller. It runs only above 1200px on fine-pointer devices, uses `IntersectionObserver` plus one requestAnimationFrame loop, and resets on reduced-motion, Save-Data, breakpoint changes, hidden tabs, and page swaps. Tablet/mobile keep stable static composition.
- The homepage proof frame now uses a softer brand-tinted border, rounded geometry, and layered shadow instead of the previous rigid black offset frame.
- The homepage proof no longer uses the fixed-coordinate dashboard spotlight that created an artificial highlighted box. The seeded dashboard and Muni work videos now loop in normal-flow compositions, while ornamental movement remains restrained and desktop-only.
- The homepage technology strip is explicitly labelled `Teknologi situs`; it does not imply that listed technologies are customers, sponsors, partners, or endorsements.
- Homepage companion art now uses one web-specific HashMicro-generated `catatan -> bukti -> arah` visual. The redundant overlaid mascot/caption and the obsolete `ramuni-decision-landscape.webp` asset were removed.
- `MascotDecisionCTA` is flatter and smaller, with no orbit decoration or forced 3D tilt. Product/solution visual animations now run only on fine-pointer desktop.
- Product and solution hub/detail closing journeys now use `TourEvidenceCTA`: one contextual visual, one concrete tour promise, and a short three-point reading guide. This replaces the repeated mascot decision widget on those journeys and keeps Muni as a supporting asset rather than a conversion gate.
- Homepage problem tabs now update a direct solution link for the selected sales, stock, or cash context instead of dropping every visitor on the generic solution hub.
- The footer now links `Kontak` to the internal contact route, so `/kontak/` is no longer orphaned. The separate floating contact control remains the approved WhatsApp action.
- Product hub copy explicitly frames the dashboard as a preview, and product detail heroes surface capability-review status beside the primary conversion path.
- Blog articles keep one contextual inline CTA and no longer repeat the interactive decision CTA after related articles. Unmapped future articles render no arbitrary AI context visual instead of silently inheriting an unrelated illustration.
- Mascot exploration remains available for development, preview, and staging review, but a non-development local/unknown production build no longer enables it implicitly. Production still requires the explicit mascot approval flag.
- Tablet/touch headers are opaque without backdrop blur; blur is limited to fine-pointer desktop above 1200px. A hidden-before-clip overflow fallback protects older Safari while modern browsers retain sticky-safe `overflow-x: clip`.
- Product/solution GSAP scroll motion now runs only above 1200px on fine-pointer hover devices and reverts when motion preferences or the device breakpoint changes. Reveal settling is animation-name agnostic, and reveal-linked industry keyframes no longer start from zero opacity.
- Nine product pages and four role pages have unique SEO metadata; role pages have explicit self-canonicals.
- Internal links use trailing-slash canonical routes. Header/footer matching and solution-icon routing follow the same convention.
- All nine product icons and all five solution icons are available. The latest three solution icons are `pantau-laba-dan-arus-kas`, `pahami-pelanggan`, and `laporan-bisnis-otomatis`; their optimized WebP files are committed and synchronized to R2.
- Product detail, solution detail, industry, role, help, and selected blog pages now select dashboard art by context instead of repeating one generic shell.
- Product and solution detail heroes pair truthful RAMUNI seeded/demo dashboard evidence with one of four contextual HashMicro-generated illustrations: AI/import, sales/customer, stock/operations, or cash/report. Conceptual art is not labelled as product UI.
- Product, solution, industry, role, and help heroes now use contextual visuals by route. `/bantuan/` uses a support journey visual rather than a product dashboard, and the solution hub no longer mixes a dashboard with unrelated generated illustration side by side.
- Four web-optimized synthetic dashboards cover AI/evidence, inventory/reorder, cash flow, and sales/customer contexts.
- Blog article layout now uses a wider reading area with a useful TOC/tools rail; AI, cash-flow, and stock articles have distinct contextual dashboards and relevant tool/resource routes.
- Blog archives now use one shared eight-category taxonomy and crawlable six-item pagination at `/blog/page/[page]/`. Pagination pages have self-canonicals, `prev`/`next` links, `CollectionPage`, `BreadcrumbList`, and `ItemList` schema.
- Production blog archives expose only articles that are both `reviewed` and indexable. Staging can preview `needs-review` drafts, while category routes remain buildable so preview links do not break.
- Eight new practical UMKM articles cover daily omzet, profitable products, weekly sales comparison, returning customers, customer data, weekly business review, SKU hygiene, and the difference between omzet, laba, and cash flow. Each includes contextual internal links, authoritative external sources, related content, and a dashboard visual. They remain `needs-review` plus `noindex` until editorial approval.
- The three earlier preview articles now also cite authoritative NIST or Ikatan Akuntan Indonesia references with explicit editorial boundaries. All eleven preview articles therefore have at least one authoritative external source while remaining `needs-review` and `noindex`.
- Production sitemap output is split into `sitemap-pages.xml`, `sitemap-products.xml`, `sitemap-solutions.xml`, `sitemap-industries.xml`, `sitemap-blog.xml`, and `sitemap-resources.xml`, referenced by both `sitemap.xml` and `sitemap-index.xml`. Staging produces no sitemap files and nginx returns 404 for sitemap endpoints.
- The old large WebGL mascot block was removed. `DecisionFlow3D.astro` is now a lighter 2.5D workbench whose small mascot accent changes by step.
- The staging deploy script now repairs ownership of generated `dist/` output before building, preventing stale root-owned artifacts from blocking atomic releases.
- Repository-wide audit still found one verifiable mascot identity only: Muni si Manyar. `Ruda`, the third mascot, approved turnaround masters, and GLB/GLTF/FBX/OBJ/Rive/Lottie/GIF sources were not present in active repos, archives, or Git history. Do not invent identities or call the procedural Three.js primitive an approved 3D model.

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
- `public/website-original/mascot/ramuni-mascot-working-sprite.webp`
- `public/website-original/mascot/ramuni-mascot-work-loop.webm`
- `public/website-original/mascot/ramuni-mascot-work-loop.mp4`
- `public/website-original/mascot/ramuni-mascot-work-loop-poster.webp`
- `public/website-original/mascot/phase-1/muni-manyar-friendly-v2.webp`
- `public/website-original/mascot/phase-1/kancil-cermat-friendly-v2.webp`
- `public/website-original/mascot/phase-1/si-ramu-friendly-v2.webp`
- `public/website-original/product-screens/ramuni-product-dashboard-overview.webp`
- `public/website-original/product-screens/ramuni-product-dashboard-overview-loop.webm`
- `public/website-original/product-screens/ramuni-product-dashboard-overview-loop.mp4`
- `public/website-original/product-screens/ramuni-product-dashboard-performance.webp`
- `public/website-original/product-screens/ramuni-product-dashboard-operations.webp`
- `public/website-original/product-screens/ramuni-product-dashboard-mobile.webp`
- `public/website-original/context/ramuni-context-ai-import.webp`
- `public/website-original/context/ramuni-context-sales-customer.webp`
- `public/website-original/context/ramuni-context-stock-operations.webp`
- `public/website-original/context/ramuni-context-cash-report.webp`

The current real screenshots show the implemented RAMUNI seeded/demo dashboard, not a real customer account. The pinned Docker Playwright runner now works for marketing-site visual QA, but route-specific SaaS fixture captures for Sales, Inventory, Finance, Customers, Reports, and Import have not been produced or verified. Use the existing evidence until that separate authenticated fixture-capture pipeline is run; never substitute fabricated customer screens.

## Latest validation evidence

Latest staging runtime on 2026-07-29:

- Runtime commit `597784deede7279601d9728ab2a803fc37193330` is published on `main`.
- Atomic staging release `20260729T100947Z-597784deede7` is active with artifact SHA-256 `038c9cc5429eb40fb4bfa218f1703eaf3508d7370e2329afa5992c886e1408dd`.
- Homepage dashboard proof now uses the real RAMUNI loop video with subtle scan motion and no new card overlays covering the product evidence. Shared dashboard motion pauses while offscreen.
- Muni work-loop playback and dashboard observers now clean up on Astro navigation. The homepage problem chapter rotates through the three Phase 1 mascot explorations with reduced-motion and visibility safeguards.
- Homepage insight and workflow chapters were shortened into three evidence layers and a four-step `Catat -> Satukan -> Baca -> Putuskan` journey with a moving route and Muni guide.
- The floating WhatsApp contact is now a compact, lazy-styled conversation with sequential prompts for name, WhatsApp, email, need, and consent before CRM acceptance and official WhatsApp handoff.
- The solution hub removed a duplicated text-only principle rail and unused legacy CSS, keeping the staging CDN-rewritten HTML below the enforced route budget.
- Astro check passed across 121 files with zero errors, warnings, or hints. Content-gateway tests, CMS page/article candidate render tests, the full 98-page site audit, and `npm audit --audit-level=high` all passed; npm reported zero vulnerabilities.
- Local-origin and public-DNS health checks passed. Homepage, product, solution, help, blog, and try-free routes return HTTP 200 with `Cache-Control: no-store` and `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`; HTML remains `noindex,follow`; sitemap endpoints return 404.
- The lazy chat stylesheet and updated scripts return HTTP 200 from staging/CDN. No raster image was generated or edited in this batch.
- The three non-video mascot portraits remain Creative Studio Phase 1 staging explorations, not approved final production mascot masters.

- Runtime commit `e54a5cfeac6523ded6ec35b74871cb64f4f6a7a7` passed Astro check across 120 files with 0 errors, 0 warnings, and 0 hints.
- Its staging build produced 98 pages; the full metadata, social, schema, static accessibility, internal-link, noindex/robots, encoding, and asset-budget audit passed.
- R2 reported 0 uploads and 92 unchanged objects because this batch reused existing approved assets.
- Live `/bantuan/`, `/industri/`, `/industri/retail/`, `/untuk/admin-toko/`, `/kalkulator/`, and `/produk/asisten-ai/` returned HTTP 200 with `noindex,follow`.
- Live help, industry, and role heroes contain `hero-context__screen` and no `hero-context__image` dashboard frame. The AI product hero also remains non-dashboard.
- Live staging still returns `Cache-Control: no-store`, `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`, and 404 for `/sitemap.xml`, `/sitemap-index.xml`, and `/sitemap-blog.xml`.
- The prepared 40-combination Playwright browser audit was not completed in this batch because the shared production-host build gate was occupied by unrelated repository test work. Static build/audit and live route verification completed successfully; rerun browser screenshots when the gate is idle.

- Astro check with Node `22.23.1` exited successfully with no diagnostics.
- Production build: 97 pages; staging build: 98 pages because staging includes crawlable preview pagination for the unapproved article set. The obsolete `/kebijakan-cookie/` route and its public navigation links remain removed; the consent preference dialog and footer `Kelola Cookie` control remain available.
- Full metadata, social, schema, accessibility, content-marker, internal-link, sitemap/noindex, robots, encoding, and asset-budget audit passed.
- `npm audit`: zero vulnerabilities.
- `/solusi/` remains below the enforced 64 KiB route HTML budget after externalizing the shared parallax runtime; linked CSS and total compressed JavaScript budgets also pass.
- Fresh staging route sizes are 63,514 bytes for `/solusi/`, 63,133 bytes for `/produk/`, and 62,290 bytes for `/blog/arus-kas-umkm-ringan/`; all remain below the enforced 64,000-byte route HTML budget.
- R2 sync uploaded/replaced five objects and left 80 existing objects unchanged. The sync now compares both hash and remote `Content-Type`, so unchanged video bytes are re-uploaded when metadata is wrong.
- Live staging returned HTTP 200 for homepage, product hub/details, solution hub/details, industry, role, and article routes.
- The two mascot video sources and two dashboard video sources return HTTP 200 with `video/webm` or `video/mp4` from `assets-staging.ramuni.id`; stale Cloudflare entries were purged after the R2 metadata correction.
- The redesigned help icon uses an explicit support-headset glyph in the mega menu and returns HTTP 200 with `image/svg+xml`.
- Live HTML contains the real product overview, three product-family previews, the solution product preview, and the animated Muni component.
- The four earlier synthetic dashboards remain available for flows without a truthful real screenshot; they are still labelled conceptual/synthetic.
- A stale negative Cloudflare cache entry initially kept `ramuni-mascot-working-dashboard.webp` at 404 after upload. The exact URL was purged successfully and now returns HTTP 200 with `image/webp`.
- The minified live stylesheet preserves `overflow-x: hidden` for older engines and upgrades `html`, `body`, and `main` to `overflow-x: clip` inside `@supports`.
- Live staging checks returned HTTP 200 for `/healthz`, the homepage, product hub/detail, solution hub, blog, calculator hub, and contact page.
- Live staging remains fail-closed: HTTP `X-Robots-Tag` is noindex, HTML is `noindex,follow`, responses are `no-store`, and sitemap endpoints return 404.
- `/demo/`, `/early-access/`, and `/harga/` return a single 301 hop to `/tour-produk-gratis`.
- Representative staging routes return HTTP 200.
- The three latest solution icons return HTTP 200 from the CDN with the expected optimized WebP sizes.
- Nginx config test passed before reload. Active config: `/etc/nginx/sites-available/staging.ramuni.id`; backup: `/etc/nginx/sites-available/staging.ramuni.id.bak-20260726T1338Z`.
- Deployment health check passed for release `20260727T054211Z-10cd1218e99e` and artifact `32406c904b5f07e7902779ce3107f36cfd8ba09c3b074f99a8972e4f3dc28d82`.
- Live homepage HTML contains the lazy Muni 3D host and `/scripts/parallax-motion.js`; the active release reports commit `10cd1218e99edb00b4927d4b03986801e4594831`.
- The redesigned help SVG returns HTTP 200 with `image/svg+xml` from `assets-staging.ramuni.id` and was the only R2 object changed in this release.
- Cloudflare had retained the preceding 645-byte help SVG after the new object was published. The exact URL was purged successfully; the live 623-byte object now matches the repository SHA-256 `76bf74a23b2fd77df35b96a86370f8d632950d3d096272b3f97a38d668950651`.
- The current staging health check reports release `20260727T081841Z-d780245f9e92` healthy. Live HTML responses remain `Cache-Control: no-store` with `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`, and `/sitemap.xml`, `/sitemap-index.xml`, and `/sitemap-blog.xml` return 404.
- Live homepage contains the new companion asset, live header JavaScript uses the 1201px fine-pointer desktop threshold, and the new CDN asset returns HTTP 200 at 24,450 bytes.
- After release verification, the temporary interactive-motion worktree/branch, 31 MiB of build backups, and canonical `node_modules`, `dist`, and `.astro` output were removed. The cleanup reclaimed roughly 760 MiB by apparent size while preserving all published commits in `main`.

Final runtime verification for `e6783e85ac667115b5e8d773f73b5b1191b98439`:

- Atomic staging deploy completed as release `20260727T103720Z-e6783e85ac66` with artifact SHA-256 `5437cf4af9a2d75f58c0c6822c05184513174396585fb06554b0cd61476b9e9b`.
- Node 22 Astro check completed with 0 errors, warnings, or hints; the staging build produced 98 pages and the full site audit passed.
- Production-mode build produced 97 pages and the full site audit passed with production indexing enabled, production canonical domain, production sitemap generation, schema contracts, and asset budgets.
- `npm audit` reported zero vulnerabilities, `node --check public/scripts/header-nav.js` passed, and `git diff --check` passed.
- Live health and representative homepage, product, solution, resource, blog archive/pagination/article, and contact routes returned HTTP 200.
- Live staging remains fail-closed: HTML carries `noindex,follow`, HTTP carries `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`, responses carry `Cache-Control: no-store`, and all checked sitemap endpoints return 404.
- Docker Playwright rendered homepage, product, solution, resource, and blog routes at 375x812, 768x1024, and 1440x1200. All 15 route/viewport combinations had document width equal to viewport width, no page-level horizontal overflow, a visible WhatsApp control, and an in-bounds header.
- The live mobile/tablet interaction audit opened the menu after scrolling to 900 px, kept the sticky header and menu panel aligned, then restored the first closed sample directly to `scrollY = 900` with no smooth 0-to-900 travel. Reveal content remained at opacity 1 after enter/leave/return sampling.
- The responsive screenshots were manually reviewed for homepage, product, solution, resource, blog, and open-menu states. The tested compositions were centered, unclipped, and visually coherent at all three widths.
- After verification, canonical `node_modules`, `dist`, `.astro`, Docker Playwright screenshots/results, and the listed temporary PNG files were removed; no local server remained on port 4322.

Browser automation is now available through the pinned Docker Playwright runner. Fresh screenshots and interaction evidence exist for 375, 768, and 1440 px. Production promotion should still include human QA at 390, 1024, and 1194 px plus a real-user or lab Core Web Vitals run, because the current evidence is a staging render audit rather than production PSI/RUM. Continue checking:

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

The canonical checkout is clean at published `main`, but the following gateway stashes/worktree remain intentionally preserved and must be reviewed independently:

- `/home/meetsin/internal/ramuni-source`
- stash `ramuni-content-gateway-live-wip-pre-release-20260726`
- stash `ramuni-content-gateway-wip-pre-release-20260726`
- stash `ramuni-canonical-staged-wip-before-sync-20260726T1740Z`
- `/home/meetsin/internal/ramuni-source-cms-provider`

Do not apply, pop, drop, overwrite, or commit these changes before reviewing their unique files and overlap with published `main`. Preserve the stashes until the dedicated gateway worktrees have been reconciled and tested.

Latest read-only gateway audit:

- The canonical checkout is clean and synchronized at the current published `main`.
- Three named stashes remain. Keep all three until their behavior is compared with the provider branch, especially the older `artifact-publisher.mjs` path.
- Continue gateway development only from `/home/meetsin/internal/ramuni-source-cms-provider`. It has local commit `2538ffd` plus dirty provider/build-runner/config/server/store/package refinements that still need rebase and testing.
- The obsolete clean marketing-gateway, docs, and visual-motion worktrees have been removed. The dirty CMS provider worktree remains untouched.

## Remaining visual-content backlog after this release

The current batch materially increases real product evidence and motion, but several requested items require source assets or a healthy capture runner:

- Capture route-specific seeded screens for Sales, Inventory, Finance, Customers, Reports, and Import on a runner where Chromium launches successfully; map them only after verifying the route/version.
- Creative Studio now contains Muni si Manyar, Si Ramu, and Kancil Cermat as three documented Phase 1 alternatives. Obtain written route approval plus originality, trademark/IP, ownership, and named-owner review before treating any route as a final master or combining them into one character system.
- A precise animated 3D mascot requires approved front/side/back turnaround art and preferably a rigged `.glb`. The current procedural Three.js primitive is not an identity model and should not be presented as one.
- Continue differentiating tool cards and article imagery only where the topic benefits from it, while preserving the passing route CSS/image budgets.
- The eight new article drafts require named editorial review before changing `reviewStatus` to `reviewed` or allowing production indexation; they intentionally remain absent from the production archive and sitemap.
- Run human visual QA at the listed responsive widths before production promotion because browser automation remains unreliable on this host.
- Keep new raster generation on the native HashMicro plugin and keep disposable source outputs outside the published tree.

## Product-first visual and CRO release, 2026-07-27

- Published commits: `7a90b8a` (product-first homepage/product/solution hubs), `da82b1e` (cleaner dashboard motion, outcome-led product heroes, honest CTA copy, and claim safeguards), `73f4700` (contextual dashboard chapters on all nine product detail routes), and `2f3851f` (homepage HTML-budget correction).
- Homepage hero now keeps the verified seeded/demo dashboard as the dominant visual, removes the mascot that sat below the frame, removes zoom motion, preserves the complete dashboard on mobile, and synchronizes a restrained three-stage progress rail with the dashboard frames. Muni remains available later as a supporting ornament instead of competing with the product proof.
- Homepage problem proof uses `public/website-original/context/ramuni-context-umkm-signal-workspace.webp`, generated through the native HashMicro image plugin and paired with verified RAMUNI demo dashboard evidence.
- Product and solution detail heroes are outcome-led and label screenshots as preview/data demo. Solution detail visual animation no longer overwrites the new soft shadow with the obsolete hard black offset shadow.
- Every product detail route now includes a contextual dashboard chapter with route-specific explanatory copy, a verified seeded/demo screenshot, a three-step reading guide, and an explicit availability disclaimer.
- The duplicate solution problem selector was removed. The solution hero remains the primary selector, followed by one dashboard-led directory instead of immediately asking visitors to make the same choice again.
- Conversion copy now matches the actual destination: `Minta tour produk gratis` replaces `Coba Simulasi Gratis` across shared CTAs and representative marketing routes. Homepage secondary CTA scrolls to the dashboard example instead of opening the same request form.
- Unverified access, audit-trail, import/export, and AI-boundary statements on homepage/product hub were softened into preview/rancangan language. No customer logos, result claims, partnerships, or technology endorsements were invented.
- Node 22 Astro check passed with 0 errors, warnings, or hints. Staging build produced 98 pages; production-mode build produced 97 pages. Both full site audits passed. `npm audit` reported zero vulnerabilities and `git diff --check` passed.
- Atomic staging release: `20260727T130240Z-2f3851f138a2`; commit `2f3851f138a2`; artifact SHA-256 `0060787cbdc0032957d7ec4a657153268ee1981318cd1e5b0c0bc61405f5da62`.
- Live verification returned HTTP 200 for `/healthz`, `/`, `/produk/`, `/produk/inventori/`, `/solusi/`, `/blog/`, and `/tour-produk-gratis/`. All carry `Cache-Control: no-store` and HTTP `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`; homepage HTML contains `noindex,follow`; `/sitemap.xml`, `/sitemap-index.xml`, and `/sitemap-blog.xml` return 404.
- The current audit used live headers plus source/CSS review. No new browser screenshots were claimed in this batch; fresh 390/768/1024/1194/1440 visual QA remains appropriate before production promotion.
- Two unrelated tracking/GTM work-in-progress groups discovered during the release were preserved instead of mixed into this visual/CRO release: `preserve-unrelated-tracking-wip-20260727` and `preserve-unrelated-tracking-docs-wip-20260727`. Review them together before applying either stash.

## Contextual conversion release, 2026-07-28

- Published and deployed commit: `5e398584a4ef9baad4ff6e33b36b3dd90b84ad41` (`refine contextual conversion journeys`).
- Atomic staging release: `20260728T124139Z-5e398584a4ef`; artifact SHA-256 `8b04be120b778d90c791e0dc91dd45fba49b6ee0f554bdf9e8ac2a71a665ed65`.
- Product and solution hub/detail closing sections use contextual visual evidence instead of repeating the same mascot state widget. Primary CTAs keep route-specific tour intent and secondary paths return to the relevant comparison hub.
- Product preview language and capability status are visible near conversion points. Blog articles retain the contextual inline CTA, remove the redundant final interactive CTA, and fail closed when an article has no approved context-visual mapping.
- The mascot release gate no longer treats an unknown non-development environment as approval. The three Creative Studio Phase 1 routes remain alternatives and were not copied into visitor-facing decision stages.
- Node 22 Astro check covered 119 files with 0 errors, warnings, or hints. Staging build produced 98 pages. Full metadata, social preview, schema, accessibility, content marker, internal-link, sitemap/noindex, robots, encoding, and asset-budget audit passed. `npm audit` reported 0 vulnerabilities.
- Focused Docker Playwright checks covered product hub/detail and solution hub/detail at 375, 768, 1024, and 1440 px. All 16 route/viewport combinations had no horizontal overflow, loaded the contextual image, exposed the primary CTA, and contained `noindex,follow`. Manual screenshot review found one low-contrast mobile secondary CTA; it was fixed and the staging build/audit were repeated.
- R2 synchronization uploaded one changed script and left 87 existing objects unchanged. Representative contextual images, product screenshots, and the updated script return HTTP 200 with the expected content types.
- Live `/healthz`, homepage, product hub/detail, solution hub/detail, blog archive/article, tour, and contact returned HTTP 200. `/demo/`, `/early-access/`, and `/harga/` redirect once to `/tour-produk-gratis/`. Staging HTML remains `noindex,follow`; HTTP remains `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet` with `Cache-Control: no-store`; all checked sitemap endpoints return 404.
- After deployment verification, canonical `node_modules`, `dist`, `.astro`, and the temporary Docker Playwright scripts/screenshots under `outputs/ramuni-visual-audit` were removed. Published releases, R2 objects, preserved stashes, unrelated repositories, and the dirty Creative Studio review worktree were not altered.

## Final completion audit and contextual routing release, 2026-07-28

- Published runtime commit: `9020d76ce089a4bdb5c63fb5ccdd5ed4efc40980`; atomic staging release: `20260728T135133Z-9020d76ce089`; artifact SHA-256: `f20789971bd7a350804beceb1476a2cfcf6b11718485567158813cc7aca3c4b7`.
- The final multi-agent audit passed the product-first homepage, supporting-mascot role, contextual Product/Solution visual mapping, honest demo-data labelling, CRO hierarchy, responsive implementation, noindex staging, schema, canonical, and internal-link requirements.
- The audit found two small conversion/SEO gaps and both were closed: homepage problem tabs now carry their selected solution destination, and the internal `/kontak/` route is linked from the footer while WhatsApp remains available through the approved floating contact action.
- The release gate intentionally rejected an intermediate artifact that exceeded the 64 kB HTML budget after CDN rewriting. The markup was simplified without removing the contextual route, then the exact deploy sequence was repeated. Final Node 22 Astro check passed 119 files with 0 errors, warnings, or hints; staging built 98 pages; the full post-CDN site audit passed; `npm audit` reported 0 vulnerabilities; R2 reported 88 unchanged objects and no unnecessary upload.
- Live health verification succeeded after the atomic switch. Staging remains `Cache-Control: no-store`, HTTP `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`, HTML `noindex,follow`, and sitemap endpoints return 404.

## Authentic dashboard and post-CDN budget release, 2026-07-29

- Published runtime commits: `9827b2d` (natural visitor copy plus authentic dashboard capture), `8b70104` (authentic product proof and CRM-first lead flow), `c51a766` (non-interactive atomic-deploy fallback), and `309bf585eaaec66724a8a801ac278c184c2b806d` (route-specific contact CSS plus external reveal runtime).
- Active product evidence now includes `public/website-original/product-screens/ramuni-saas-dashboard-desktop-1440.webp`, copied from the RAMUNI SaaS evidence repository at 1440×1202. Active dashboard maps use verified RAMUNI SaaS captures; generated contextual artwork remains separately identified and is not presented as a dashboard.
- Visitor-facing technical storage/CRM language and the phrases `data demo`, `data contoh`, and `data sintetis` were removed or rewritten naturally. The contact and floating consultation journeys still submit through the configured lead endpoint before the optional WhatsApp handoff.
- The final staging build checked 119 Astro files with 0 errors, warnings, or hints; built 98 pages; passed the full post-CDN metadata, social, accessibility, content, schema, internal-link, robots/noindex, encoding, and asset-budget audit; and reported 0 dependency vulnerabilities.
- The post-CDN budget correction moved contact-only styles out of the shared stylesheet and externalized the reveal observer to `public/scripts/reveal.js`. R2 uploaded that one new runtime object and left 91 existing objects unchanged.
- Atomic staging release: `20260729T051627Z-309bf585eaae`; artifact SHA-256: `f1e9f9e68fa96e0a065f19cfd11917e06892dcefb9747614d6ed0d6c29a15bc8`. The deployment script used the local Docker/chroot privilege fallback because interactive sudo is unavailable, while preserving rollback-safe release creation and symlink activation.
- Live verification passed for health, homepage, product hub/detail, solution hub/detail, blog archive/article, contact, and tour routes. `/demo/`, `/early-access/`, and `/harga/` redirect to `/tour-produk-gratis/` in one 301 hop.
- Staging remains fail-closed: every checked HTML route returns `Cache-Control: no-store`, HTTP `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`, and HTML `noindex,follow`. `/robots.txt` returns 200 while the checked sitemap endpoints return 404.
- The authentic full-dashboard WebP, three supporting real dashboard captures, `reveal.js`, lead/contact runtimes, and the WhatsApp mark return HTTP 200 from the staging CDN with the expected content types.
- Fresh live Chromium layout QA covered nine representative routes at 375, 768, 1024, 1440, and 1920 px: 45 combinations, 0 failures, no horizontal overflow, no broken completed images, noindex present, header in bounds, and floating contact visible.

## Product motion and contextual visual journeys release, 2026-07-29

- Published runtime commit: `440a233ce0becd0d4c6b5ad30cc20e7e6c1368ad`; atomic staging release: `20260729T091116Z-440a233ce0be`; artifact SHA-256: `d3c9abf102acd1f5f351a1e468170c493ad5dd222d759241ca5aa3a1e6c7bae8`.
- Homepage hero now uses the authentic RAMUNI dashboard video loop and avoids overlaid fake highlight cards. The dashboard scanline motion is bounded to the real frame height and pauses when the proof is not in view.
- Homepage section two is a simpler problem selector with the three Creative Studio Phase 1 mascot preview assets. These remain staging exploration assets, not approved production mascot masters.
- `HeroContextVisual` and supporting hero components route visuals by page context instead of forcing dashboard screenshots everywhere. Help uses a support flow; product and solution pages use verified dashboard evidence only where it supports the claim.
- Floating WhatsApp consultation is compact: name, WhatsApp, email, need, and consent. Visitor-facing CTA copy is normalized to `Coba gratis`; role-permission copy is softened so it does not overclaim export, billing, approval, or unavailable account controls.
- CMS article candidate propagation was fixed with `snapshotId: page.id`, and `test:cms-article-candidate-render` was added to keep article preview rendering covered.
- Verification before commit: `git diff --check` passed; diff audit found no real secrets or fabricated customer/trusted claims; `npm audit --audit-level=high` reported zero vulnerabilities; Node 22 `npm run check`, `test:content-gateway`, `test:cms-candidate-render`, `test:cms-article-candidate-render`, and `npm run audit` all passed.
- Deploy verification: the deploy script rebuilt with staging/noindex variables, synchronized the three Phase 1 mascot WebP assets to R2, rewrote CDN references, passed the full site audit across 98 HTML files, reported zero dependency vulnerabilities, compressed the release, switched the current symlink atomically, and passed local health verification.
- Live verification: both loopback and public DNS health checks passed for `20260729T091116Z-440a233ce0be`. Representative live routes `/`, `/bantuan/`, `/produk/`, `/solusi/`, `/blog/`, and `/tour-produk-gratis/` returned HTTP 200 with `Cache-Control: no-store` and `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`; homepage HTML contains `noindex,follow`; `/sitemap.xml` and `/sitemap-index.xml` return 404.
- Cleanup after verification removed canonical `node_modules`, `dist`, and `.astro` build artifacts, reclaiming roughly 362 MiB while preserving the immutable staging release and published Git commits.
- No new raster image generation was run in this batch. If future generated visuals are needed, use the native HashMicro imagegen plugin only and save disposable outputs outside the published tree until reviewed.

## Compact dashboard and continuous consultation release, 2026-07-29

- Published runtime commit: `7798c276b48a19157a7fb66a7b59618987497974` (`refine dashboard heroes and consultation chat`); atomic staging release: `20260729T144732Z-7798c276b48a`; artifact SHA-256: `d8a179a7d6138869de1ecc447b59c944b4757bcc9096a9d325e36f1f8d0346c6`.
- Product and solution hero dashboards are shorter, flatter, and contextual. Duplicate visual headers, captions, and nested reading cards were removed. Asisten AI now explains a question-to-answer journey with visible sources and a manual-check boundary; stock, catalog, and import routes use an operational view instead of a generic KPI canvas.
- Homepage hero uses a lightweight code-built dashboard with restrained state motion. Mascot motion is visibility-gated and honors reduced-motion and Save-Data. The known baked rice-colored background in the available mascot artwork is mitigated by removing rectangular shadow treatment and using lightweight blend/motion; replacing the source master remains the cleanest future improvement.
- Floating WhatsApp consultation now retains RAMUNI prompts and visitor replies as one continuous transcript. Visible phone and email replies are masked, bubble spacing is more comfortable, the composer and final handoff are simplified, auto-scroll follows the latest exchange, and accessibility/reduced-motion behavior is preserved.
- Verification passed: `git diff --check`; JavaScript syntax checks; Astro check with 128 files and 0 errors, warnings, or hints; staging build with 127 pages; 12/12 calculator tests; full static/site/SEO/performance audit; and `npm audit --audit-level=high` with 0 vulnerabilities.
- Focused Docker Chromium QA covered the homepage, Asisten AI, stock solution, and consultation chat at 375, 768, and 1440 px. The consultation transcript preserved the preceding RAMUNI question, the visitor name, the next RAMUNI question, and a masked phone reply.
- Live verification returned HTTP 200 for `/`, `/produk/asisten-ai/`, and `/solusi/kelola-stok/`. Each carries `Cache-Control: no-store` and `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`; homepage HTML contains `noindex,follow`; `/sitemap.xml` and `/sitemap-index.xml` return 404. Live HTML contains the new Asisten AI, homepage dashboard, and consultation transcript markers.
- No raster image generation was required for this release. Future raster generation/editing must use the native HashMicro image plugin. Disposable browser QA screenshots and canonical build dependencies were removed after recording this evidence; the immutable staging release and published commit were preserved.

## Product story cleanup and resource generator release, 2026-07-29

- Published runtime commits: `eaa557db0197` (`refine product stories and resource tools`) and `c9ef0b49506c` (`trim product release budgets`). `c9ef0b49506c` is the deployed staging SHA.
- Product detail routes no longer show separate long `Status kemampuan`, `Bukti, izin, dan batas`, role, and industry card grids. They now use a compact readiness board plus one interactive audience/context selector, with natural availability wording instead of repeated `Dalam pengembangan` labels.
- Product related paths now use existing RAMUNI icon assets for product/resource rows. The old large related text cards and obsolete product-detail CSS for removed sections were cleaned up to keep post-CDN budgets passing.
- Solution detail routes combine capability/context evidence into a tighter decision surface, and the solution hub was trimmed slightly after post-CDN HTML budget checking.
- `/generator/lembar-stok-harian/` is live as a free browser-only stock worksheet generator. It supports dynamic rows, preview totals, CSV export, Excel-compatible `.xls` export, print/save-to-PDF, empty-row validation, and an ungated soft `Coba gratis` prompt with `Tetap unduh`.
- Generator links were added to the resource hub, mega menu, footer, URL map, and sitemap policy resource group. Resource/calculator cards now receive the existing navigation icon mappings.
- Verification before release: `git diff --check`; Node 22 Astro check/build with 128 generated pages and 0 errors/warnings/hints; calculator tests 12/12; content gateway tests 14/14; full static/site/SEO/accessibility/schema/internal-link/noindex/robots/asset-budget audit; post-CDN asset rewrite audit; and `npm audit --audit-level=high` with 0 vulnerabilities.
- First deploy attempt correctly failed on post-CDN product CSS/solution HTML budgets. The release was not switched. The budget-only fix was committed as `c9ef0b49506c`, then the deploy was repeated from the tested SHA.
- Atomic staging release: `20260729T160254Z-c9ef0b49506c`; artifact SHA-256 `68eaf77c5b1606257a37194bbfb0b79fbd200a0fcaa811c71fe64b6baec2ca73`; current release path `/var/www/ramuni-staging/releases/20260729T160254Z-c9ef0b49506c`.
- Live verification passed for `/healthz`, `/`, `/produk/inventori/`, `/produk/asisten-ai/`, `/solusi/kelola-stok/`, `/sumber-daya/`, `/kalkulator/`, and `/generator/lembar-stok-harian/`. Each returned HTTP 200 with `Cache-Control: no-store` and `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`; live HTML contains `noindex,follow`; `/sitemap.xml`, `/sitemap-index.xml`, and `/sitemap-blog.xml` return 404.
- Live marker checks confirmed the generator has `Unduh Excel`, `CSV, Excel, atau PDF`, and the accessible export dialog label; Inventori contains the new readiness/audience wording.
- No raster image generation was run in this batch. Future raster work must continue through the native HashMicro imagegen plugin only.

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
