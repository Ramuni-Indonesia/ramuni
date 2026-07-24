# RAMUNI Final Brand Implementation Brief

**Status:** Final and approved  
**Direction:** Lipat Arah  
**Approval date:** 25 July 2026  
**Working asset source:** [brand/RAMUNI](../brand/RAMUNI/)  
**Brand guidelines:** [RAMUNI-BRAND-GUIDELINES.md](../brand/RAMUNI/RAMUNI-BRAND-GUIDELINES.md)  
**Asset manifest:** [ASSET-MANIFEST.csv](../brand/RAMUNI/exports/ASSET-MANIFEST.csv)

This document converts the approved RAMUNI brand kit into an implementation contract for the marketing website, blog, CMS, help center, product handoff, social media, email, and paid advertising. The extracted `brand/RAMUNI` directory is the repository implementation source. The original delivery ZIP is not stored under Astro's disposable `dist/` build directory.

## 1. Brand idea

RAMUNI means **Meramu Insight untuk Menavigasi Bisnis Indonesia**.

The approved folded-ribbon mark represents raw business signals being composed into one practical direction. Its inner angle gives a subtle second reading of `RA` without becoming a literal monogram.

The identity should feel:

- Intelligent without lecturing.
- Modern without feeling foreign.
- Professional but close to Indonesian MSMEs.
- Clear, directional, practical, and human.

Copy should lead with business meaning and end with a useful action.

## 2. Final color tokens

| Token | Brand name | Hex | Primary use |
|---|---|---|---|
| `--brand-ink-navy` | Ink Navy | `#0B3045` | Wordmark, primary text, navigation, dark surfaces |
| `--brand-ramu-teal` | Ramu Teal | `#168C8C` | Fold/navigation accent, links, selected states, growth cues |
| `--brand-turmeric-yellow` | Turmeric Yellow | `#F2B134` | `NI` accent, warm highlights, controlled emphasis |
| `--brand-warm-rice` | Warm Rice | `#F4F0E7` | Human primary background and warm neutral surface |
| `--brand-white` | White | `#FFFFFF` | Reverse logo, cards, clean contrast surface |

Required CSS foundation:

```css
:root {
  --brand-ink-navy: #0b3045;
  --brand-ramu-teal: #168c8c;
  --brand-turmeric-yellow: #f2b134;
  --brand-warm-rice: #f4f0e7;
  --brand-white: #ffffff;

  --color-text-primary: var(--brand-ink-navy);
  --color-bg-primary: var(--brand-warm-rice);
  --color-bg-inverse: var(--brand-ink-navy);
  --color-accent-primary: var(--brand-ramu-teal);
  --color-accent-warm: var(--brand-turmeric-yellow);
}
```

Rules:

- Do not invent secondary brand colors without design-system approval.
- Turmeric Yellow is an accent, not the default color for long body text.
- Interactive states must pass WCAG contrast checks in their actual foreground/background combination.
- Error, warning, success, and information colors may be semantic UI tokens, but must not alter the logo or replace the core palette.
- Do not use gradients in brand identity applications.

## 3. Final typography

Primary family: **Plus Jakarta Sans**.

| Role | Font file | Weight |
|---|---|---|
| Display/hero | `PlusJakartaSans-ExtraBold.ttf` | 800 |
| Heading | `PlusJakartaSans-Bold.ttf` | 700 |
| Label/button/navigation | `PlusJakartaSans-SemiBold.ttf` | 600 |
| Body/input/help/article | `PlusJakartaSans-Regular.ttf` | 400 |

Fallback stack:

```css
font-family: "Plus Jakarta Sans", Inter, Arial, sans-serif;
```

Self-hosted files:

- `brand/RAMUNI/fonts/PlusJakartaSans-Regular.ttf`
- `brand/RAMUNI/fonts/PlusJakartaSans-SemiBold.ttf`
- `brand/RAMUNI/fonts/PlusJakartaSans-Bold.ttf`
- `brand/RAMUNI/fonts/PlusJakartaSans-ExtraBold.ttf`
- License: `brand/RAMUNI/fonts/OFL-Plus-Jakarta-Sans.txt`

Implementation rules:

- Self-host fonts from the production asset/CDN path.
- Preload only the font files required above the fold.
- Use `font-display: swap`.
- Create WOFF2 production derivatives during the asset pipeline when licensing and build policy permit it; retain the supplied TTF files as approved masters.
- Preserve readable line height and do not use ExtraBold for article body copy.
- Do not replace Plus Jakarta Sans with a decorative display font.

## 4. Logo variants and placement

Approved variants:

- Mark only.
- Wordmark only.
- Horizontal lockup.
- Stacked lockup.
- Color, monochrome, and all-white/reverse versions.

Preferred website mapping:

| Placement | Preferred asset |
|---|---|
| Desktop header on Warm Rice/white | `svg/ramuni-lockup-horizontal-color.svg` |
| Mobile header with enough width | `svg/ramuni-lockup-horizontal-color.svg` |
| Compact mobile/app icon | `svg/ramuni-mark-color.svg` |
| Footer on Ink Navy | `svg/ramuni-lockup-horizontal-white.svg` |
| Loading/compact brand state | `svg/ramuni-mark-color.svg` |
| Monochrome print/legal use | Matching `*-mono.svg` |
| Social/avatar square | Mark-only color or approved white reverse asset |
| Open Graph/ad creative | Approved SVG/PNG/WebP variant placed without modification |

Logo rules:

- Clear space is at least half the mark height on every side.
- Preferred minimum digital size is 24 px.
- A 16 px mark is permitted only for browser tabs.
- `RAMU` uses Ink Navy and `NI` uses Turmeric Yellow in the approved color wordmark.
- Reverse versions are all white.
- Use the supplied asset; do not redraw the mark in CSS or substitute text.
- Never stretch, crop, rotate, skew, add shadow, outline, gradient, glow, or recolor the logo.
- Do not add arrows, sparkles, robots, AI nodes, or extra letters inside the mark.
- Do not recolor `NI`.

## 5. Asset-format selection

| Need | Format rule |
|---|---|
| Website header/footer | SVG master first |
| Responsive raster fallback | Transparent WebP, then transparent PNG |
| Social/ad export | PNG or WebP at the required platform dimensions |
| Documents/slides | SVG when supported; otherwise transparent PNG |
| JPEG-required channel | Use approved JPEG with Warm Rice or Ink Navy background |
| Browser icon | Supplied PNG favicon set |

Transparent exports are available at 256, 512, 1024, and 2048 px. Do not upscale a smaller raster when a correct master already exists.

The [asset manifest](../brand/RAMUNI/exports/ASSET-MANIFEST.csv) is authoritative for variant, format, size, background, and transparency.

## 6. Favicon and application-icon mapping

Supplied favicon sizes include 16, 24, 32, 48, 64, 96, 128, 180, 192, 256, and 512 px in the export package.

Minimum web mapping:

| Web asset | Supplied source |
|---|---|
| `/favicon.ico` | Build from approved 16/32/48 PNG marks |
| `/favicon-16x16.png` | `exports/favicons/ramuni-favicon-16.png` |
| `/favicon-32x32.png` | `exports/favicons/ramuni-favicon-32.png` |
| `/apple-touch-icon.png` | `exports/favicons/ramuni-favicon-180.png` |
| `/icon-192.png` | `exports/favicons/ramuni-favicon-192.png` |
| `/icon-512.png` | `exports/favicons/ramuni-favicon-512.png` |

Manifest and HTML metadata must use the approved icons. Do not ship framework placeholder icons.

## 7. Website and blog application

Global implementation:

- Header uses the approved horizontal lockup and links to `/`.
- Footer uses the white horizontal lockup on Ink Navy.
- Warm Rice is the preferred human background; white may be used for reading surfaces and cards.
- Ink Navy is the default primary text and dark-surface color.
- Ramu Teal carries active navigation, links, progress, and selected states.
- Turmeric Yellow provides controlled warmth and brand emphasis.
- Plus Jakarta Sans is used across marketing pages, blog, help center, forms, and navigation.

Editorial implementation:

- Article reading experience prioritizes legibility over decorative branding.
- Featured images and diagrams may use the brand palette but must not place the logo as a watermark on every image.
- Author, reviewer, source, date, and correction UI use the same typography and semantic design tokens.
- Data visualizations require accessible categorical colors beyond the brand palette when necessary; those colors are data-visualization tokens, not additional logo colors.

Campaign implementation:

- Google, Meta, Instagram, email, and lead-magnet creative must use the same final logo and palette.
- Paid landing pages may reduce navigation but may not use an alternate brand identity.
- Ad creative must maintain logo clear space and avoid tiny unreadable lockups.
- The brand must not be used to make an unverified feature, certification, integration, or result appear official.

## 8. CMS and design-system contract

CMS/settings must store:

- Brand-kit version: `Lipat Arah — 2026-07-25`.
- Approved logo asset IDs and variants.
- Color-token references, not free-form per-page logo colors.
- Typography family and supported weights.
- Default social image template.
- Favicon/app-icon asset references.
- Brand guideline and asset-manifest links.

Editors may select an approved variant appropriate to background and placement. Editors may not upload a replacement logo, recolor the mark, or override logo proportions without brand-owner approval and revision history.

Design-system implementation must expose semantic tokens so later palette adjustments do not require editing each page component.

## 9. Performance, accessibility, and security

- Keep visible logo dimensions reserved to prevent CLS.
- Prefer external versioned assets over embedding large base64 files in page HTML.
- Sanitize uploaded campaign/social assets through the approved media pipeline.
- Supply meaningful alt text when the logo conveys brand identity, such as `RAMUNI`; use empty alt only when an adjacent visible brand name makes it decorative.
- Do not use color alone to communicate state.
- Respect reduced-motion preferences in any logo-adjacent animation; the logo itself remains static.
- Cache immutable brand assets with content hashes and long-lived headers.
- Keep font and SVG licenses/source records in the repository.

## 10. Developer acceptance checklist

- [ ] Working assets come from `brand/RAMUNI`.
- [ ] Header, footer, mobile, favicon, manifest, OG, email, and ad placements use approved variants.
- [ ] Color tokens exactly match the five approved hex values.
- [ ] Plus Jakarta Sans weights 400, 600, 700, and 800 are mapped correctly.
- [ ] Font loading uses `font-display: swap` and an approved fallback stack.
- [ ] Logo clear space and minimum size pass responsive QA.
- [ ] No gradients, shadows, stretching, rotation, recoloring, robots, sparkles, AI nodes, or literal arrows are applied to the identity.
- [ ] Favicons and application icons are generated from the supplied mark.
- [ ] No framework placeholder logo, font, or favicon remains.
- [ ] Contrast, keyboard, zoom, and mobile QA pass.
- [ ] Asset references are versioned and deployable without absolute local Windows paths.
- [ ] CMS editors can only choose approved variants.
- [ ] Social and paid-media templates use the same approved identity.

## 11. Delivery evidence

Developer handoff must include:

- Final public asset paths and hashes.
- Logo mapping by component/template.
- Font loading evidence and network waterfall.
- Favicon/manifest verification.
- Responsive screenshots of header/footer on mobile and desktop.
- Light/dark/background contrast checks.
- Lighthouse/CWV evidence showing brand assets do not create avoidable LCP or CLS regressions.
- Confirmation that no placeholder or unofficial logo remains.

The approved contact sheet is available at [ramuni-final-contact-sheet.png](../brand/RAMUNI/previews/ramuni-final-contact-sheet.png).
