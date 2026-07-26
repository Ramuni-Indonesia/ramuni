# RAMUNI Codex Handoff for MeetsIn Server Continuation

Snapshot date: 2026-07-26 Asia/Jakarta
Canonical server checkout: `/home/meetsin/internal/ramuni-source`
Canonical branch: `main`

This handoff lets Codex on the MeetsIn server continue the RAMUNI Astro marketing/blog build with the user feedback, design direction, implementation history, and unfinished backlog from the local session. It must contain no plaintext PAT, token, password, secret env, real lead PII, or tenant data.

## Repository state and workflow

- Remote: `https://github.com/Ramuni-Indonesia/ramuni.git`
- Canonical checkout: `/home/meetsin/internal/ramuni-source`
- Canonical branch/upstream: `main` / `origin/main`
- Server-continuation source commit: `482f246ca87c341dccce61b83902482cb3e4af6c`
- Staging/CDN baseline before this continuation: `ebdea81f3b97546345ff29b9cdc5692a78c9fd83`
- The user explicitly authorized direct commits and pushes to `main`. The previous mandatory continuation-branch, pull-request, and merge workflow is cancelled for this repository.
- Always pull with `git pull --ff-only origin main`, verify a clean worktree, run the release gates, push `main`, then deploy and verify staging when runtime files changed.
- `/home/meetsin/internal/ramuni-saas-source`, `/home/meetsin/internal/ramuni-cms`, and `/home/meetsin/internal/ramuni-handoff` are separate repositories or contexts; do not mix them into the marketing site.
- Old worktrees are audit sources only. Preserve unique valid work in `main`, then remove obsolete worktrees only after they are clean or their dirty state has been fully reviewed.

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
- Home section 2 now uses Muni si Manyar with contain/sticky/parallax/active-card behavior. It is not yet a real 3D mascot model.

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

Last known local evidence:

- `npm run check`: passed on 92 files with zero errors/warnings/hints.
- `git diff --check`: passed earlier.
- Dashboard Bisnis desktop: centered hero, full-width dashboard, no overflow, no blocking overlay icon.
- Dashboard Bisnis mobile: heading around 42.9px, both CTAs around 343px/full-width, `scrollWidth === clientWidth`.
- Mascot mobile: centered, full body visible, sticky above problem cards.

Rerun after transfer because later CSS/home changes were not covered by a final production verification:

- `npm run check`
- `npm run build`
- `npm run audit`
- rendered desktop/tablet/mobile QA on core routes.

Earlier audit was slightly over budget: home and `/produk` about 0.7 kB over HTML budget; blog/product around 1 to 1.8 kB over route CSS budget.

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
