# RAMUNI money-site audit

Generated: 2026-08-25 (Europe/Berlin)

## Crawl snapshot

The current RAMUNI sitemap family contains 41 unique money/resource URLs across six child sitemaps: 21 pages, 10 products, 6 solutions, 1 industry hub, 2 blog entries, and 1 resource entry. The live pages below were fetched with a browser user-agent and checked for title, H1, headings, images, and JSON-LD.

| Route | H1 | H2 | Images | JSON-LD blocks | Assessment |
| --- | ---: | ---: | ---: | ---: | --- |
| `/` | 1 | 24 | 15 | 1 | Strong breadth and clear problem-led routes; hero proof should carry more commercial weight. |
| `/pricing/` | 1 | 11 | 4 | 2 | Pricing and matrix exist; a product proof block now sits before the plans. |
| `/features/` | 1 | 11 | 6 | 2 | Feature catalogue is clear; hero now has a full-screen product proof. |
| `/produk/dashboard-bisnis/` | 1 | 21 | 11 | 1 | Strong input/output and workflow detail; device presentation was the main visual risk. |
| `/solusi/naikkan-omzet/` | 1 | 19 | 11 | 1 | Good problem-led narrative; maintain one distinct proof visual per solution family. |
| `/compare/` | 1 | 10 | 4 | 2 | Comparison is intentionally modest; proof screen now prevents a text-only sales page. |
| `/faq/` | 1 | 10 | 4 | 2 | Commercial answers are present; product proof now gives the FAQ a concrete anchor. |

## Gap map and action

| Gap | Evidence | Action taken |
| --- | --- | --- |
| Device mockup showed a baked-in third-party dashboard and gutters at some aspect ratios. | `LaptopMockup.astro` used a raster shell with another vendor UI and fixed screen offsets. | Replaced it with a CSS-only MacBook/iPhone shell. The screen fills its frame, has clipped rounded corners, and adds a MacBook notch; mobile switches to a portrait phone shell. |
| Pricing/features/compare/FAQ were primarily copy and cards before the first product screen. | Live page structure and image counts above. | Added `CommercialProofShowcase.astro`, using the captured RAMUNI dashboard and an input → change → next-check explanation. |
| Feature and product cards can feel repetitive when every section uses the same abstraction. | Repeated “alur / konteks / langkah” pattern in page extracts. | Keep page-specific copy, but put one concrete product proof between the promise and the catalogue. Avoid adding another generic four-step section. |
| Motion was present in product screens but not consistently in commercial hubs. | `.commercial-page .reveal` disabled the generic reveal path; card motion was local only. | New proof block uses existing `DashboardMotion` IntersectionObserver choreography and respects reduced-motion; the mockup hover uses transform only. |
| Mobile/tablet must preserve the comparison table. | Pricing matrix already scrolls horizontally with a sticky first column. | Retained the scroll region and sticky first column; proof notes collapse to one column under 620px. |

## Copy direction for the next pass

- Lead with a concrete job: “lihat perubahan penjualan”, “cek stok yang perlu diperiksa”, or “pisahkan omzet, biaya, laba, dan kas”.
- Keep one trust boundary per page, not the same disclaimer in every section.
- Put pricing, demo, and trial links near the first visual proof as well as at the close.
- Use “Tampilan produk RAMUNI · data demo terkontrol” for synthetic marketing previews; do not imply customer outcomes or live visitor data.

## Verification checklist

- [x] Run `ramuni-resource-guard --status` before `npm run check` or `npm run build`.
- [x] Run the check/build through `ramuni-safe-build local -- ...`.
- [x] Validate a desktop, tablet, and mobile render of `/`, `/pricing/`, `/features/`, `/produk/dashboard-bisnis/`, and `/solusi/naikkan-omzet/` (plus compare, FAQ, and Tentang).
- [x] Check canonical, title, description, H1, JSON-LD, image alt text, and sitemap inclusion after the content change.
