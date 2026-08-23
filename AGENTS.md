# RAMUNI Codex Continuation Rules

These instructions apply to this RAMUNI marketing/blog workspace.

## Read first

Before implementation or broad status claims, read:

1. `RAMUNI-CODEX-HANDOFF.md`
2. `docs/README.md`
3. `docs/13-final-brand-implementation-brief.md`
4. `docs/08-marketing-website-blog-developer-handover.md`
5. `docs/10-marketing-pages-blog-content-brief.md`
6. `brand/RAMUNI/RAMUNI-BRAND-GUIDELINES.md`

## Project boundaries

- RAMUNI is an independent project. Do not apply HashMicro staging/live rules unless explicitly requested.
- The MeetsIn server is a continuation workspace only. Do not deploy RAMUNI into MeetsIn production containers, nginx, databases, or domains unless the user explicitly names that target.
- Marketing website, CMS, CRM, and authenticated product are separate bounded contexts.
- The public website stays Astro, light, SEO-friendly, responsive, and PSI-aware.
- Blog CMS is deferred; current content can remain local fixtures until CMS integration is requested.

## Brand and marketing guardrails

- Positioning: `AI Business Companion untuk UMKM Indonesia`.
- Promise: `Meramu insight. Memberi arah.`
- Main message: `Pahami bisnis Anda. Tahu langkah berikutnya.`
- Use simple Bahasa Indonesia for UMKM owners. Avoid corporate jargon and AI-sounding filler.
- Do not fabricate customers, logos, numbers, awards, certifications, integrations, prices, or availability.
- Do not promise autonomous AI publishing, outreach, financial, or operational actions without human approval.
- Official logo must remain static and unmodified: no rotation, gradient, glow, shadow, distortion, or 3D treatment. Decorative 3D objects may use RAMUNI themes without mutating the logo.

## Image generation and visual assets

- For this RAMUNI workspace, use the built-in Codex image generator for all new raster images and image edits.
- Do not use the HashMicro image-generation plugin for RAMUNI assets, even if it is available in the environment.
- Run one built-in image job at a time and save project-bound assets under `outputs/` before integrating the optimized copy into `public/`.
- Inspect every generated image before integration; preserve the RAMUNI palette and avoid text, logos, watermarks, and fabricated claims.
- Mascot references are under `output/mascot-exploration/phase-1/`; Route A/Muni si Manyar is a working recommendation, not final approval.
- Instagram launch art is style/reference only unless the user explicitly asks to reuse it. Website heroes need web-specific assets.

## Implementation quality bar

- Treat every section as a designed component, not a text/card dump.
- Avoid repetitive text-left/list-right layouts.
- Use interactive charts, flows, dashboard previews, motion cards, mascot guidance, or lightweight Three.js where they explain the content.
- Motion must be restrained and polished: scroll reveal, parallax, card hover, and background ornaments are allowed; avoid flashy effects.
- Mobile buttons are full-width when stacked; tablet/desktop CTAs stay in one row when space allows.
- Audit oversized headings, awkward line breaks, blank zones, broken center lines, clipped mascot, and floating cards that damage layout.

## Engineering discipline

- Preserve route, canonical, noindex, sitemap, consent, schema, and release-gate behavior.
- Hide pricing until approved.
- Redirect/remove `/demo`, `/early-access`, and `/harga` in favor of `/tour-produk-gratis`.
- All WhatsApp/contact paths must point to `https://wa.me/message/K35W6X6WT7YMJ1`.
- Never commit plaintext PATs, SSH/database/application passwords, secret env, lead PII, or tenant data.
- Use Git credential helper/server credentials; do not put tokens in commands, docs, commits, or chat.
- Verify the rendered page/build/audit before claiming completion.

## Git, deployment, and cleanup workflow

- The user has explicitly authorized RAMUNI marketing-site updates to be committed and pushed directly to `main`; the former mandatory feature-branch and pull-request workflow is obsolete for this repository.
- Start by running `git pull --ff-only origin main` from the canonical checkout, then verify the worktree is clean before changing files.
- Do not merge or copy code from `ramuni-saas-source`, `ramuni-cms`, or other repositories into this marketing site unless the user explicitly expands scope.
- Before pushing `main`, run the relevant check, build, audit, dependency, and rendered-page verification. Deploy staging only after the pushed commit is known-good.
- Staging must remain fail-closed for indexing: HTML and HTTP headers carry noindex, sitemap endpoints return 404, and robots remains crawlable so crawlers can observe noindex.
- Record the pushed commit, deployed release, verification evidence, known limitations, and next action in the handover after each material implementation.
- Review every dirty worktree before removal. Remove a worktree only after all valid unique changes are preserved in `main`; never delete an unreviewed or dirty worktree.
- Clean generated build output, temporary patches, obsolete worktrees, and other disposable artifacts after verification when they are no longer needed. Do not remove credential files or unrelated user data.

## Server workspace

Continue from the canonical checkout at `/home/meetsin/internal/ramuni-source` on branch `main`.
Do not use `/home/meetsin/internal/ramuni-saas-source`; it is a separate repository.
