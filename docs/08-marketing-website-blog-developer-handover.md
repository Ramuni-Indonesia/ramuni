# RAMUNI Marketing Website, Blog, SEO, Analytics, and Ads Developer Handover

Dokumen ini adalah brief teknis untuk developer/agent yang membangun marketing website, blog, CMS, SEO foundation, lead funnel, consent, analytics, dan paid-media readiness RAMUNI.

Referensi utama:

- [02-backlog.md](02-backlog.md)
- [09-full-product-capability-map.md](09-full-product-capability-map.md)
- [10-full-product-backlog-catalog.md](10-full-product-backlog-catalog.md)
- [11-full-product-coverage-audit.md](11-full-product-coverage-audit.md)
- [12-product-development-execution-plan.md](12-product-development-execution-plan.md)
- [05-marketing-blog-plan.md](05-marketing-blog-plan.md)
- [06-product-manual-plan.md](06-product-manual-plan.md)
- [13-final-brand-implementation-brief.md](13-final-brand-implementation-brief.md) — source of truth logo, warna, font, favicon, aset, dan aturan penerapan brand final.
- [10-marketing-pages-blog-content-brief.md](10-marketing-pages-blog-content-brief.md) â€” source of truth detail section, navbar, blog/editorial, resource, help, dan paid landing page.

## Tujuan dan guardrails

Untuk developer/agent website marketing, blog, CMS, SEO, lead funnel, dan analytics RAMUNI. Website menjual RAMUNI sebagai AI Business Companion untuk UMKM Indonesia, bukan ERP rumit.

- Primary CTA mengikuti launch state dari dokumen 10: `Daftar Early Access`, `Minta Undangan`, `Coba Gratis`, `Pilih Paket`, atau `Lihat Preview`; secondary dapat memakai `Lihat Demo` dan `Konsultasi via WhatsApp` bila channel aktif.
- Marketing/CMS terpisah dari tenant app secara runtime, permission, dan deployment.
- Jangan tampilkan klaim customer, hasil, integrasi, harga, atau security sebelum terverifikasi.
- Browser tidak boleh memanggil `xai.hashmicro.co`. Demo AI publik memakai sample statis atau backend sandbox tanpa PII.
- Jangan menjanjikan AI melakukan aksi bisnis otomatis pada MVP. AI read-only; aksi berisiko selalu memerlukan approval.
- Jangan mengirim nama, email, nomor telepon, isi pesan, tenant ID, business ID, atau data bisnis ke analytics, ad pixels, logs pihak ketiga, atau URL query.
- Semua tracking non-essential wajib tunduk pada consent.

## Final brand system — wajib dipakai

Brand RAMUNI sudah final dan bukan lagi placeholder visual. Arah yang disetujui adalah **Lipat Arah**, 25 July 2026.

- Repository implementation source: [brand/RAMUNI](../brand/RAMUNI/). The original delivery ZIP is not stored under Astro's disposable `dist/` build directory.
- Brand authority and developer contract: [13-final-brand-implementation-brief.md](13-final-brand-implementation-brief.md).
- Detailed guideline: [RAMUNI-BRAND-GUIDELINES.md](../brand/RAMUNI/RAMUNI-BRAND-GUIDELINES.md).
- Asset selection authority: [ASSET-MANIFEST.csv](../brand/RAMUNI/exports/ASSET-MANIFEST.csv).

Developer wajib menggunakan approved logo exports, Plus Jakarta Sans, dan lima token warna final berikut: Ink Navy `#0B3045`, Ramu Teal `#168C8C`, Turmeric Yellow `#F2B134`, Warm Rice `#F4F0E7`, dan White `#FFFFFF`. Jangan menggambar ulang logo, mengubah warna `NI`, menambah gradient/shadow, atau menciptakan identitas alternatif untuk blog maupun campaign landing page.

Favicon/application icon mapping wajib berasal dari kit final:

| Public path | Approved source |
|---|---|
| `/favicon.ico` | Dibangun dari `ramuni-favicon-16.png`, `ramuni-favicon-32.png`, dan `ramuni-favicon-48.png` |
| `/favicon-16x16.png` | `brand/RAMUNI/exports/favicons/ramuni-favicon-16.png` |
| `/favicon-32x32.png` | `brand/RAMUNI/exports/favicons/ramuni-favicon-32.png` |
| `/apple-touch-icon.png` | `brand/RAMUNI/exports/favicons/ramuni-favicon-180.png` |
| `/icon-192.png` | `brand/RAMUNI/exports/favicons/ramuni-favicon-192.png` |
| `/icon-512.png` | `brand/RAMUNI/exports/favicons/ramuni-favicon-512.png` |

Header, footer, mobile navigation, CMS theme, blog templates, help center, Open Graph image, email, Google/Meta/Instagram creative, dan paid landing pages harus mengonsumsi token serta approved asset IDs yang sama. Detail variant mapping, clear space, minimum size, font loading, performance, accessibility, CMS controls, dan acceptance evidence wajib mengikuti dokumen 13.

## Verdict kelengkapan halaman marketing

Sitemap di [05-marketing-blog-plan.md](05-marketing-blog-plan.md) **sudah cukup kuat sebagai fondasi P0**: home, produk, solusi, industri, role pages, pricing, demo, security, blog, resources, help, dan legal sudah tercakup.

Namun, agar siap SEO, tracking, dan paid acquisition, developer wajib menambahkan atau menyiapkan:

### P0 sebelum public launch

| Area | Kebutuhan | URL / asset |
|---|---|---|
| Lead conversion | Thank-you noindex untuk lead forms; signup product-owned lanjut ke onboarding | `/terima-kasih`, `/terima-kasih/demo`, `/terima-kasih/kontak`; tanpa `/terima-kasih/daftar` |
| Ads landing | Evergreen early access plus optional campaign variant | `/early-access` canonical; `/lp/early-access` temporary dan noindex |
| Error/support | Branded error and maintenance pages | `/404`, `/500`, `/maintenance` |
| Legal/consent | Privacy, terms, cookies, data processing, consent version | `/privasi`, `/syarat-penggunaan`, `/kebijakan-cookie`, `/pemrosesan-data` |
| Crawl assets | Robots, sitemap, favicon, manifest, security contact | `/robots.txt`, `/sitemap.xml`, `/favicon.ico`, `/site.webmanifest`, `/.well-known/security.txt` |
| Measurement | GTM/GA4/ads pixels consent-gated and testable | `dataLayer`, GTM container, GA4 stream, Meta Pixel/CAPI |

### P1 setelah baseline stabil

| Area | Kebutuhan | URL / asset |
|---|---|---|
| Social proof | Customer stories hanya setelah ada izin tertulis | `/cerita-pelanggan/[slug]` |
| Integrations | Detail integrasi hanya untuk yang benar-benar available/soon | `/produk/integrasi/[slug]` |
| Acquisition | Calculator/template lead magnets | `/kalkulator/*`, `/template/[slug]` |
| Education | Help center dari product manual | `/bantuan/[koleksi]/[slug]` |
| Content feed | RSS/Atom bila feasible | `/feed.xml` |
| Agent readability | Konteks dan pricing machine-readable setelah final | `/llms.txt`, `/pricing.md` |

### P2 / jangan dipaksakan di awal

- Comparison/alternative pages hanya setelah positioning, bukti, dan riset kompetitor siap.
- Programmatic SEO hanya jika data unik dan QA unik per halaman tersedia.
- OKF bundle `/okf/` hanya eksperimen agent-readable, bukan requirement Google.
- Customer logos, ratings, awards, dan ROI claims menunggu bukti serta legal approval.

## Header, mega-menu, mobile navigation, dan footer

Bagian ini adalah ringkasan implementasi teknis navigasi. Urutan final, label menu, microcopy, dan section content detail mengikuti [10-marketing-pages-blog-content-brief.md](10-marketing-pages-blog-content-brief.md).

### Header desktop

Urutan final:

```text
[Logo RAMUNI]  Produk v  Solusi v  Harga  Sumber Daya v  Tentang  |  Masuk  [CTA sesuai launch state]
```

- Logo selalu menuju `/`.
- Maksimal lima kelompok navigasi utama sebelum area akun.
- `Masuk` adalah link sekunder; `[Coba Gratis]` adalah CTA primer paling kanan.
- Header sticky diperbolehkan, tetapi tidak boleh menutupi anchor heading atau consent banner.
- Active state, hover, focus, dan open state wajib berbeda secara visual.
- Semua menu dapat dioperasikan dengan keyboard, Escape menutup menu, focus dikembalikan ke trigger, dan `aria-expanded`/`aria-controls` selalu benar.

Mega-menu `Produk`:

| Kolom | Link | Penjelasan singkat |
|---|---|---|
| AI & Insight | Asisten AI, Dashboard Bisnis, Laporan & Insight | Memahami kondisi bisnis dan langkah berikutnya |
| Operasional | Penjualan, Inventori, Keuangan, Pelanggan | Mencatat dan mengendalikan aktivitas inti |
| Ecosystem | Integrasi, Semua Produk | Menghubungkan sumber data dan melihat katalog produk |
| CTA panel | `Coba Gratis`, `Lihat Demo` | Mengarahkan visitor siap mencoba |

Mega-menu `Solusi`:

| Kolom | Link |
|---|---|
| Berdasarkan tujuan | Naikkan Omzet; Kelola Stok; Pantau Laba & Arus Kas; Pahami Pelanggan; Laporan Otomatis |
| Berdasarkan industri | Retail; F&B; Distributor; Reseller Online; Jasa; Manufaktur Kecil |
| Berdasarkan peran | Pemilik Usaha; Admin Toko; Kasir; Supervisor |
| Penutup | `Lihat Semua Solusi` menuju `/solusi` |

Mega-menu `Sumber Daya`:

| Kolom | Link |
|---|---|
| Learn | Blog; Panduan; Kamus Bisnis |
| Use | Template; Kalkulator Laba; Kalkulator HPP; Kalkulator Reorder Stok |
| Product help | Bantuan; Keamanan; Status |
| Featured content | Satu artikel, panduan, atau kalkulator pilihan CMS |

`Tentang` adalah link langsung menuju `/tentang`. Keamanan, Kontak, dan Status tetap tersedia melalui footer dan contextual links sesuai dokumen 10.

### Mobile navigation

- Gunakan hamburger yang membuka panel atau full-screen menu.
- Produk, Solusi, dan Sumber Daya memakai accordion satu tingkat; Tentang boleh menjadi link langsung atau group ringan sesuai final nav di dokumen 10.
- CTA `Coba Gratis` tetap terlihat tanpa membuka menu bila ruang memungkinkan.
- Panel memiliki focus trap, tombol tutup berlabel, target sentuh minimal 44 px, dan scroll lock yang pulih setelah panel ditutup.
- Link `Masuk`, `Coba Gratis`, pengaturan cookie, serta kontak tetap dapat dijangkau.

### Footer

| Kolom | Link |
|---|---|
| Produk | Published product families dari capability registry; maksimal link prioritas plus `Semua Produk` dan Harga |
| Solusi | Naikkan Omzet; Kelola Stok; Pantau Laba; Pahami Pelanggan; Retail; F&B; Distributor; Pemilik Usaha |
| Sumber Daya | Blog; Panduan; Template; Kalkulator; Kamus Bisnis; Bantuan |
| Perusahaan | Tentang; Kontak; Keamanan; Status |
| Akun | Masuk; Daftar; Coba Gratis; Minta Demo |
| Legal | Privasi; Syarat Penggunaan; Kebijakan Cookie; Pemrosesan Data; Kelola Cookie |

Footer bawah memuat copyright dinamis, social profile yang benar-benar aktif, alamat/kontak legal hanya setelah disetujui, status link, dan tombol `Kelola Cookie`. Jangan menjadikan footer sebagai dump puluhan halaman tipis.

Breadcrumb wajib pada product, solution, industry, role, blog, guide, template, calculator, glossary, author/reviewer, dan help pages. Breadcrumb harus mengikuti URL hierarchy, berupa link HTML crawlable, dan sesuai dengan `BreadcrumbList` JSON-LD.

## Page hierarchy

```text
Homepage (/)
â”œâ”€â”€ Produk (/produk)
â”‚   â”œâ”€â”€ Asisten AI (/produk/asisten-ai)
â”‚   â”œâ”€â”€ Dashboard (/produk/dashboard-bisnis)
â”‚   â”œâ”€â”€ Penjualan (/produk/penjualan)
â”‚   â”œâ”€â”€ Inventori (/produk/inventori)
â”‚   â”œâ”€â”€ Keuangan (/produk/keuangan)
â”‚   â”œâ”€â”€ Pelanggan (/produk/pelanggan)
â”‚   â”œâ”€â”€ Laporan (/produk/laporan-insight)
â”‚   â””â”€â”€ Integrasi (/produk/integrasi)
â”œâ”€â”€ Solusi (/solusi/*)
â”œâ”€â”€ Industri (/industri/*)
â”œâ”€â”€ Untuk (/untuk/*)
â”œâ”€â”€ Harga (/harga)
â”œâ”€â”€ Demo (/demo)
â”œâ”€â”€ Early Access canonical (/early-access)
â”œâ”€â”€ Ads LP temporary noindex (/lp/[campaign-slug])
â”œâ”€â”€ Keamanan (/keamanan)
â”œâ”€â”€ Tentang (/tentang)
â”œâ”€â”€ Kontak (/kontak)
â”œâ”€â”€ Blog (/blog, /blog/kategori/[slug], /blog/[slug])
â”œâ”€â”€ Resources (/panduan/[slug], /template/[slug], /kalkulator/[slug], /kamus-bisnis/[slug])
â”œâ”€â”€ Legal/Support (/bantuan, /status, /privasi, /syarat-penggunaan, /kebijakan-cookie, /pemrosesan-data)
â”œâ”€â”€ Thank-you noindex (/terima-kasih/*)
â””â”€â”€ System noindex (/404, /500, /maintenance)
```

### Route tambahan yang wajib masuk URL map

Tree ringkas di atas tetap menjadi ringkasan. Developer wajib memasukkan parent hub dan entity page berikut ke `docs/url-map.csv`:

```text
/solusi
  /solusi/[slug]
/industri
  /industri/[slug]
/untuk
  /untuk/[slug]
/sumber-daya
  /panduan
    /panduan/[slug]
  /template
    /template/[slug]
  /kalkulator
    /kalkulator/[slug]
  /kamus-bisnis
    /kamus-bisnis/[slug]
/blog
  /blog/[slug]
  /blog/kategori/[slug]
  /blog/tag/[slug]
  /blog/penulis/[slug]
  /blog/reviewer/[slug]
  /blog/cari
  /blog/kebijakan-editorial
  /blog/metodologi-fact-check
  /blog/kebijakan-sumber
  /blog/kebijakan-pembaruan
  /blog/koreksi
/bantuan
  /bantuan/[koleksi]
  /bantuan/[koleksi]/[slug]
  /bantuan/cari
/lp/[campaign-slug]
/terima-kasih/[conversion-type]
```

Setiap baris URL map wajib menyimpan: URL, page type, template, parent, launch priority, header/footer visibility, indexability, canonical rule, sitemap membership, schema, primary intent, primary CTA, content owner, dan feature availability dependency.

## URL dan internal-link rules

- Lowercase, hyphenated, tanpa tanggal di URL blog.
- Gunakan route Indonesia tanpa `/id` sampai versi Inggris benar-benar tersedia.
- Pilih satu trailing-slash policy dan enforce dengan 301.
- HTTP ke HTTPS dan host alternatif ke canonical host memakai 301.
- Important pages maksimal 3 klik; tidak boleh orphan.
- Published slug change wajib 301 redirect.
- Search, preview, account, thank-you, dan thin filter pages noindex serta tidak masuk sitemap.
- Artikel link ke pillar/category, related articles, dan CTA product/solution relevan.
- Product pages link ke pricing/demo, industries, dan educational articles.

## Templates

Detail lengkap tujuan, urutan section, content contract, CTA, CMS fields, indexability, internal linking, blog author/reviewer, dan paid landing page berada di [10-marketing-pages-blog-content-brief.md](10-marketing-pages-blog-content-brief.md). Jika ringkasan di bawah berbeda, dokumen 10 menjadi source of truth untuk page-content architecture. Dokumen 08 tetap menjadi source of truth untuk technical SEO, analytics, consent, ads-readiness, form security, environment, QA, dan artifact developer.

- Homepage: hero, AI demo, pain, data-to-insight, dashboard, feature overview, use cases, industries, reports, security, pricing, FAQ, CTA.
- Product: outcome hero, problem, screenshot/demo, benefits, workflow, features, related modules, industry examples, security note, FAQ, CTA.
- Solution: masalah, tanda-tanda, dampak bisnis, workflow RAMUNI, fitur terkait, contoh insight, FAQ, CTA. Jangan tulis hasil terukur sebelum ada bukti.
- Industry: tantangan khas, workflow, modules, AI questions, sample report, template import bila tersedia, FAQ, CTA. Customer story hanya jika ada customer nyata dan izin tertulis.
- Article: headline, dek, author/reviewer, dates, category/tags, TOC, body, examples/formulas, FAQ, contextual CTA, related content, sources, schema.

Article requirements:

- Satu H1; H2/H3 mengikuti pertanyaan pengguna dan search intent.
- Jawaban langsung pada awal section penting; jangan mengubur kesimpulan.
- Tanggal publish dan update terlihat.
- Author/reviewer wajib untuk topik finance, AI, security, privacy, dan legal-sensitive.
- Sumber klaim dan statistik tercantum; tidak ada keyword stuffing.

## Page-content architecture detail

Detail lengkap untuk navbar, footer, homepage, semua halaman marketing, blog, author/reviewer, resource pages, help center, CMS model, indexability, internal link, dan paid landing page ada di [10-marketing-pages-blog-content-brief.md](10-marketing-pages-blog-content-brief.md).

Dokumen 08 tetap menjadi handover teknis untuk SEO, analytics, deployment, QA, dan launch readiness. Jika ada konflik tentang urutan section atau content contract per halaman, dokumen 10 menjadi source of truth.

## Technical SEO and schema

### Rendering dan indexability

- Public marketing pages memakai SSR/SSG atau HTML setara yang dapat dirender crawler.
- Critical content, headings, links, CTA, metadata, dan JSON-LD tersedia pada initial HTML.
- Setiap indexable page: HTTP 200, internally linked, absolute self-canonical, satu H1, unique title/meta description.
- Preview, staging, internal search, account, thank-you, and thin filter pages noindex and excluded from sitemap.

### Robots.txt

Production `/robots.txt` wajib tersedia dan menunjuk ke sitemap.

```txt
User-agent: *
Allow: /
Disallow: /preview/
Disallow: /api/
Disallow: /admin/

Sitemap: https://www.ramuni.id/sitemap.xml
```

Rules:

- Jangan memakai robots.txt sebagai security control. Preview/admin/staging tetap dilindungi auth/network restriction dan noindex.
- Gunakan meta/X-Robots `noindex` untuk `/masuk`, `/daftar`, dan `/terima-kasih/*`; jangan mengandalkan robots block karena crawler harus dapat membaca directive noindex.
- AI crawler policy harus keputusan eksplisit product/legal. Jika RAMUNI ingin ditemukan dan dikutip AI search, jangan memblokir search/citation crawlers seperti OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Bingbot, atau Google crawler secara tidak sengaja. Training-only crawler seperti GPTBot dapat diputuskan terpisah.

### XML sitemap

`/sitemap.xml` menjadi sitemap index ketika content bertambah. Minimum children:

- `/sitemap-pages.xml`
- `/sitemap-products.xml`
- `/sitemap-solutions.xml`
- `/sitemap-industries.xml`
- `/sitemap-blog.xml`
- `/sitemap-resources.xml`

Hanya masukkan absolute HTTPS URL yang canonical, indexable, dan return 200. Exclude drafts, previews, noindex, redirects, account, internal search, and thank-you pages. Generate `lastmod` dari published/updated timestamp dan refresh otomatis saat publish/update/archive.

### Metadata, favicon, manifest, dan social cards

Every indexable page requires unique title, unique meta description, canonical, `lang="id"`, locale `id_ID`, OG metadata, Twitter/X card, theme color, and image alt text.

Required assets:

- `/favicon.ico`
- `/favicon.svg` jika didukung
- `/apple-touch-icon.png`
- `/icon-192.png`
- `/icon-512.png`
- `/site.webmanifest`
- maskable icon bila installable experience direncanakan

Gunakan approved RAMUNI mark dan exact favicon mapping dari [13-final-brand-implementation-brief.md](13-final-brand-implementation-brief.md); jangan memakai placeholder favicon. Homepage, product, solution, and article templates memerlukan `og:title`, `og:description`, `og:url`, `og:type`, `og:image`, `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image`.

### Structured-data map

Use JSON-LD. Schema harus sama dengan visible content; jangan markup hidden FAQ, fake ratings, unavailable pricing, atau customer claims yang belum ada.

| Page type | Required | Conditional |
|---|---|---|
| Homepage | `Organization`, `WebSite`, `SoftwareApplication` | `FAQPage` jika FAQ terlihat |
| Product | `SoftwareApplication`, `BreadcrumbList` | `FAQPage`; `Product`/`Offer` hanya setelah pricing final dan visible |
| Pricing | `SoftwareApplication`, `BreadcrumbList` | `Offer` hanya untuk plan final |
| Blog/article | `BlogPosting` atau `Article`, `BreadcrumbList` | `FAQPage`, `HowTo` jika content memenuhi |
| Author/reviewer profile | `ProfilePage`, `Person`, `BreadcrumbList` | Credential properties hanya jika verified |
| Blog/category/resource archive | `CollectionPage`, `BreadcrumbList` | `ItemList` bila daftar visible dan konsisten |
| Guide/template | `Article` atau `HowTo`, `BreadcrumbList` | `FAQPage` |
| Public help article | `TechArticle` atau `Article`, `BreadcrumbList` | `HowTo` hanya jika langkah visible dan memenuhi |
| Customer story | `Article`, `BreadcrumbList` | Organization/person references hanya dengan izin |
| Integration detail | `SoftwareApplication`, `BreadcrumbList` | Jangan markup integration as available tanpa release evidence |
| Calculator | `WebApplication` atau `SoftwareApplication`, `BreadcrumbList` | `FAQPage` |
| Glossary | `DefinedTerm`, `BreadcrumbList` | `FAQPage` |
| Contact | `Organization`, `ContactPoint` | none |

Validate rendered markup with Google Rich Results Test and Schema.org Validator. Monitor Search Console enhancement reports after launch.

### AI search readiness

Traditional SEO tetap foundation. Jangan membuat AI-only pages. P0 cukup dengan semantic HTML, clear definition blocks, real FAQs, author/reviewer/date/source, visible pricing/specification ketika final, and AI crawler policy yang disengaja.

P1 may add `/llms.txt` and `/pricing.md` after product/pricing is public and validated. `/okf/` remains optional P2 experiment, not Google requirement.

### Google Search Console and Bing

Before launch:

- Create Google Search Console Domain Property using DNS verification.
- Submit `/sitemap.xml`, verify canonical host/HTTPS/robots, and inspect key pages.
- Set owners using least privilege and link GSC to GA4.
- Create Bing Webmaster Tools property and submit/import sitemap.

After launch, review indexing, CWV, queries, pages, CTR, average position, 404s, and redirects weekly. Use GSC evidence after 4-8 weeks to refresh titles, metadata, internal links, and contentâ€”not assumptions.

Developer evidence: verified property, sitemap fetched successfully, robots accessible, key URLs indexable, PageSpeed/CWV baseline, and schema validation results.

## Analytics, GTM, consent, and attribution

Minimum tools:

- Google Tag Manager web container.
- GA4 property and web stream.
- Google Search Console linked to GA4.
- Consent management implementation.

Paid readiness adds Google Ads linked to GA4, Meta Business Manager, Meta Pixel, Meta domain verification, and Meta Conversions API plan.

### Consent Mode v2

Consent categories: essential, analytics, ads/marketing, and personalization.

Required Google signals:

- `analytics_storage`
- `ad_storage`
- `ad_user_data`
- `ad_personalization`

Non-essential tags must wait for consent unless an approved privacy-safe consent-mode implementation applies. Consent status and version must be stored and changeable later. Staging/test traffic must use test streams/pixels or be filtered.

### DataLayer contract

```js
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "cta_clicked",
  cta_text: "Coba Gratis",
  cta_location: "homepage_hero",
  page_type: "homepage",
  page_path: "/"
});
```

Never push PII or business data into dataLayer. Forbidden: name, email, phone/WhatsApp, message body, tenant/business/customer ID, free-text form input, or real tenant financial data.

### Canonical event dictionary

| Event | Trigger | Properties | Conversion? |
|---|---|---|---|
| `page_view` | GA4 automatic page view | page_location, page_title | No |
| `cta_clicked` | Major CTA click | cta_text, cta_location, destination_url, page_type | No |
| `navigation_clicked` | Header/footer/menu | nav_label, nav_location, destination_url | No |
| `form_started` | First form interaction | form_type, form_location | No |
| `generate_lead` | Lead successfully stored | form_type, lead_type, page_type | Yes |
| `demo_requested` | Demo request success | form_location, page_type | Yes |
| `whatsapp_clicked` | WhatsApp CTA | cta_location, page_type | Micro |
| `sign_up_started` | Enters signup flow | source_cta, page_type | No |
| `sign_up` | Signup completed | method, plan_context if non-PII | Yes |
| `pricing_viewed` | Pricing page view | pricing_version | No |
| `article_viewed` | Article view | article_slug, category, author_slug | No |
| `article_read` | Meaningful threshold | article_slug, scroll_depth, engaged_time | No |
| `calculator_used` | Result generated | calculator_type | Micro |
| `template_downloaded` | Download success | template_slug, gated | Micro |
| `consent_updated` | Consent saved/changed | four consent signals, consent_version | No |

### Cross-surface product lifecycle attribution

Marketing owns acquisition events through successful signup handoff. The authenticated product owns lifecycle events and sends only consent-safe, non-PII status to the approved analytics/server attribution pipeline. Event ownership must not be duplicated across marketing and product runtimes.

Product-owned lifecycle events available to funnel reporting after their feature exists: `trial_started`, `workspace_created`, `business_created`, `product_imported`, `first_sale`, `first_ai_question`, `first_insight`, `member_invited`, `integration_connected`, `plan_selected`, `checkout_started`, `subscription_started`, `payment_failed`, `payment_recovered`, `plan_upgraded`, `plan_downgraded`, and `subscription_cancelled`.

Contract requirements:

- Marketing click IDs and first/last-touch attribution are transferred server-side at signup or lead handoff.
- Product lifecycle events use product-owned IDs or pseudonymous correlation; raw tenant, business, customer, email, phone, financial, or free-text data never enters marketing analytics.
- Event names, deduplication keys, ownership, trigger, properties, retention, consent basis, and reporting destination are versioned in one shared analytics contract.
- Billing/subscription events are not activated before the corresponding commercial workflow exists and is verified.
- Product analytics is the operational truth for activation/subscription; GA4 and ad platforms remain attribution/reporting surfaces, not financial system of record.

### UTM and attribution

Capture and persist `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `gbraid`, `wbraid`, `fbclid`, referrer, landing page, first-touch timestamp, and last-touch timestamp. Save attribution server-side with the lead record. Do not put PII into UTM values.

Validation: GTM loads once; GA4 DebugView receives single-fire events; consent blocks/re-enables tags correctly; Google Tag Assistant passes; Meta Pixel Helper/Test Events pass; conversions fire only after successful server result; no PII appears in URLs, dataLayer, GA4, pixels, or error monitoring.

## Paid-media readiness: Google Ads, Instagram Ads, and Facebook Ads

Do not spend before tracking, consent, landing-page QA, and conversion validation pass.

Google Ads setup:

- Create/confirm account, link GA4, configure conversions, enable auto-tagging.
- Use final URLs with UTMs and prepare negative keywords.
- Separate brand/non-brand; competitor campaigns only after legal and strategy approval.

Meta setup:

- Create/confirm Meta Business Manager and verify domain.
- Install Meta Pixel through GTM or approved direct integration.
- Configure Conversions API with `event_id` deduplication when server-side tracking is available.
- Configure Aggregated Event Measurement priorities and use Test Events before launch.
- Update privacy/cookie disclosure before production pixel activation.

Ads should use message-matched landing pages, not always homepage:

| Intent | Landing page | Notes |
|---|---|---|
| Early access/waitlist | `/early-access` or `/lp/early-access` | Best for pre-launch |
| Demo | `/demo` | Only when demo process is ready |
| High-intent search | `/produk/asisten-ai`, `/harga`, `/demo` | Match query promise |
| Content retargeting | relevant article/template/calculator | Move to trial/demo |
| WhatsApp consultation | `/kontak` or tracked WhatsApp CTA | No PII in event |

Landing-page acceptance: mobile load under 3 seconds, one primary CTA, ad headline message match, success state or noindex thank-you page, UTM saved in lead record, consent-compliant tracking, and no unverified claim.

Suggested test campaign naming:

- `GOOG_Search_Brand_EarlyAccess_Ongoing`
- `GOOG_Search_AI-UMKM_Demo_Test`
- `GOOG_Search_Business-Insight_Demo_Test`
- `META_Traffic_UMKM-Education_EarlyAccess_Test`
- `META_Lead_UMKM-Owners_EarlyAccess_Test`
- `META_Retargeting_SiteVisitors_Demo_Test`

Primary conversions: `generate_lead`, `demo_requested`, `sign_up`. Micro conversions: `cta_clicked`, `whatsapp_clicked`, `template_downloaded`, `calculator_used`, `article_read`.

Ad-platform attribution is not the sole source of truth. Compare platform reports with GA4 and successfully stored server lead records.

## Forms and security

Lead fields: name, business, email/WhatsApp, industry, business size, intent, consent, and consent version. Wajib client/server validation, bot/rate limit, idempotency, CSRF where applicable, first/last UTM plus click IDs, success/error/loading states, queue/outbox delivery, DLQ/alert, and audited delivery attempts.

Conversion event only fires after successful server acceptance. Raw lead PII must not enter GTM, GA4, Meta Pixel, Google Ads, URL query, or error monitoring.

Security: HTTPS, CSP/HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, CSRF where applicable, rich-text sanitization, upload validation, CMS RBAC/MFA/audit, signed preview, SAST/SCA/secret scan, no secrets in client bundle, and PII-scrubbed logs/error monitoring. Add `/.well-known/security.txt` when an approved security contact exists.

## Environment and deployment behavior

| Environment | Indexing | Tracking | Ads pixels | Rule |
|---|---|---|---|---|
| local | inaccessible/noindex | disabled or mock | disabled | Never send to production properties |
| preview | auth/tokenized + noindex | disabled/test only | disabled | Excluded from sitemap |
| staging | protected + noindex | test stream | test pixel | No production conversions |
| production | indexable public pages only | production with consent | production with consent | Source of truth |

Deployment gates: sitemap valid, robots accessible, key routes 200, no broken links/orphans, schema valid, unique metadata, CWV baseline, GTM/GA4 consent tested, forms E2E pass, no placeholder asset/copy, and no unverified claims.

## QA acceptance

- Semua P0 route HTTP 200; tidak ada broken link, orphan, placeholder, duplicate slug, redirect chain, atau klaim belum terverifikasi.
- Mobile/tablet/desktop, keyboard, WCAG AA contrast, form E2E, schema validation, analytics single-fire, and Lighthouse/CWV gates pass.
- Draft/preview tidak masuk sitemap dan noindex.
- Consent benar-benar mengendalikan non-essential tags.
- `/robots.txt` references the correct production sitemap; sitemap contains only canonical indexable 200 URLs.
- Canonical, OG/Twitter cards, favicon, manifest, and schema are present where required.
- GTM loads once; GA4, Google Ads, and Meta test events do not duplicate.
- Google Consent Mode v2 has correct default and update states.
- UTM/click IDs reach the server lead record; PII does not reach analytics or pixels.
- GSC property verified, sitemap fetched, and key URLs inspected before closing launch QA.

## Artifacts developer wajib menyerahkan

- README local/build/test/deploy dan `.env.example` tanpa secrets.
- `docs/url-map.csv`, `cms-content-model.md`, `content-workflow.md`, `seo-schema-map.md`, `analytics-event-dictionary.md`, `ads-tracking-readiness.md`, `form-lead-delivery.md`, `security.md`, `deployment-rollback.md`.
- Redirect map, seed content, tests, staging URL, commit SHA, schema/CWV results, GSC/sitemap evidence, GTM/GA4/Meta/Google Ads test evidence, and known limitations.

## Launch sequencing

1. Lock canonical URL structure and P0 page priority.
2. Build core pages, templates, CMS models, and approved copy.
3. Implement metadata, sitemap, robots, favicon, manifest, and schema.
4. Implement forms, lead delivery, consent, GTM, and GA4.
5. Configure Google Ads/Meta readiness in test mode only.
6. Run SEO, accessibility, performance, form, and tracking E2E.
7. Verify GSC/Bing, submit sitemap, and inspect key URLs.
8. Publish production and collect baseline.
9. Launch limited paid tests only after conversions reconcile with server-side lead records.
10. Use GSC, GA4, lead quality, and ad data to refine pages before scaling.
