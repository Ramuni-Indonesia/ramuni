# RAMUNI Marketing Website, Blog, and Growth Plan

## 1. Positioning

RAMUNI dijual sebagai **AI Business Companion untuk UMKM Indonesia**, bukan ERP rumit. Pesan utama: **Pahami bisnis Anda. Tahu langkah berikutnya.**

Value propositions: AI menjelaskan kondisi bisnis dari data penjualan, stok, keuangan, dan pelanggan; dashboard menampilkan kesimpulan dulu; rekomendasi praktis; mudah bagi owner, admin, dan kasir.

CTA utama: `Coba Gratis`, `Lihat Demo`, `Konsultasi via WhatsApp`. Jangan menampilkan klaim customer, logo, atau angka hasil sebelum ada bukti dan izin.

## 2. Audiences

Pemilik usaha, admin/supervisor, kasir, staf stok, staf keuangan. Segmen awal: retail, F&B, distributor kecil, reseller online, jasa, dan manufaktur kecil. Pain clusters: omzet turun, stok habis/menumpuk, laba tidak jelas, pelanggan tidak kembali, laporan manual, dan data tersebar.

## 3. Sitemap

```text
/
/produk
/produk/asisten-ai
/produk/dashboard-bisnis
/produk/penjualan
/produk/inventori
/produk/keuangan
/produk/pelanggan
/produk/laporan-insight
/produk/integrasi
/solusi/naikkan-omzet
/solusi/kelola-stok
/solusi/pantau-laba-dan-arus-kas
/solusi/pahami-pelanggan
/solusi/laporan-bisnis-otomatis
/industri/retail
/industri/fnb
/industri/distributor
/industri/reseller-online
/industri/jasa
/industri/manufaktur-kecil
/untuk/pemilik-usaha
/untuk/admin-toko
/untuk/kasir
/untuk/supervisor
/harga
/demo
/keamanan
/tentang
/kontak
/blog
/blog/[slug]
/blog/kategori/[slug]
/panduan/[slug]
/template/[slug]
/kalkulator/laba-usaha
/kalkulator/hpp
/kalkulator/reorder-stok
/kamus-bisnis/[slug]
/bantuan
/status
/privasi
/syarat-penggunaan
/kebijakan-cookie
/pemrosesan-data
/masuk
/daftar
```

Gunakan route Indonesia tanpa `/id` sampai versi Inggris benar-benar tersedia.

## 4. Homepage

1. Announcement bar early access.
2. Hero: “Pahami bisnis Anda. Tahu langkah berikutnya.”
3. AI answer demo: “Kenapa omzet saya turun minggu ini?”
4. Problem section.
5. Data → Intelligence → Insight → Recommendation → Action.
6. Interactive question demo.
7. Insight-first dashboard preview.
8. AI, Sales, Inventory, Finance, CRM, Reports overview.
9. How it works dan use cases.
10. Industry selector.
11. Daily insight/weekly report preview.
12. Security/trust.
13. Pricing preview, FAQ, final CTA.

## 5. Page templates

Product page: outcome hero → masalah nyata → screenshot/demo → benefit → cara kerja → fitur → modul terkait → contoh industri → security note → FAQ → CTA.

Solution page: masalah → tanda → dampak → workflow RAMUNI → fitur → contoh insight → hasil terukur → FAQ → CTA.

Industry page: tantangan khas → workflow → modul → pertanyaan AI → dashboard → template import → customer story nyata bila ada → FAQ → CTA.

Product pages wajib: Asisten AI, Dashboard, Penjualan, Inventori, Keuangan, Pelanggan, Laporan & Insight, Integrasi. Jangan tampilkan integrasi yang belum aktif sebagai tersedia.

## 6. Pricing hypothesis

- `Mulai`: usaha mikro, satu outlet/user terbatas, core records, quota AI kecil.
- `Tumbuh`: beberapa user, insight/report, CRM/inventory lengkap.
- `Pro`: multi-outlet, advanced roles, integrations, priority support.
- `Enterprise/Partner`: koperasi, franchise, distributor, institusi.

Validasi lewat interview dan willingness-to-pay. Halaman wajib menjelaskan user/outlet/transaksi/storage/AI limits, pajak, pembayaran, upgrade/downgrade/cancel/refund, quota habis, serta available vs soon.

## 7. Blog and SEO

Kategori: Penjualan & Omzet; Stok & Inventori; Keuangan UMKM; Pelanggan & CRM; Operasional Bisnis; AI untuk UMKM; Strategi per Industri; Panduan RAMUNI.

Tags lintas kategori: Retail, F&B, Distributor, Reseller, Jasa, Manufaktur, Pemilik Usaha, Pemula, Template, Studi Kasus, Checklist. Satu artikel memakai satu kategori utama dan maksimal 3-5 tags.

Rencana 12 minggu: minggu 1-4 fundamental+template; 5-8 solution/industry+AI; 9-12 refresh berbasis Search Console dan decision content. Target 24-30 artikel berkualitas.

Pilar awal: cara menghitung/meningkatkan omzet; stok minimum/reorder/stock opname; laba/HPP/arus kas; repeat customer/segmentasi; AI bisnis dan batasannya.

## 8. CMS

Content types: pages/sections, products/features, solutions, industries, pricing, integrations, articles/categories/tags/authors/reviewers, stories, FAQs, guides, templates, glossary, updates, media, forms/leads, CTA variants, navigation, redirects, settings, legal.

Workflow: Draft → Content Review → SEO Review → Product/Legal Review → Approved → Scheduled/Published → Updated → Archived.

Wajib: tokenized preview, revisions/rollback, scheduling, RBAC/audit, alt text, link checker, redirects, draft noindex, unique slug, sanitization, and media validation.

## 9. Technical SEO and analytics

- SSR/SSG, sitemap index, absolute canonical, breadcrumbs, OG, robots, relevant schema.
- Noindex preview/internal search/account/thin filters.
- CWV: LCP <2.5 s, INP <200 ms, CLS <0.1 p75.
- Funnel events: page/CTA/pricing/demo/lead/WhatsApp/signup/business/product import/first sale/first AI question/first insight/subscription.
- Store first/last-touch UTM and consent; never send PII to analytics.

Funnels: article → template/calculator → lead → nurture → demo/trial → first insight → paid; high-intent page → demo → signup → business data → AI question → recommendation → upgrade.

## 10. Launch backlog

P0: positioning, IA, design system, home, product/solution/3 industry pages, pricing, demo, security/legal, blog, 8-12 initial articles, CMS, analytics/consent, SEO/accessibility/form E2E, monitoring/rollback.

P1: remaining industries, calculators, templates, nurturing, verified customer story, integration directory, product updates, internal search, A/B test.

P2: factual comparisons, partners/referrals, academy/webinars, English, interactive tour, public API docs, programmatic SEO only with unique useful data.

## 11. Full-product marketing additions

Marketing tetap product-led dan hanya memasarkan capability dengan status `GA`. CMS wajib mempunyai feature availability registry: `GA`, `Beta`, `Early Access`, `Coming Soon`, `Retired`, lengkap dengan plan, region, prerequisites dan effective version.

Additional product pages setelah fiturnya nyata:

- `/produk/pos-kasir`, `/produk/pembelian`, `/produk/multi-outlet`, `/produk/akuntansi`, `/produk/loyalitas-pelanggan`, `/produk/promosi-dan-otomasi`, `/produk/mobile-dan-offline`, `/produk/manajemen-tim`, `/produk/api-dan-integrasi`, `/produk/ai-agent`.
- Commercial/trust: `/enterprise`, `/migrasi-data`, `/mitra`, `/integrasi/[slug]`, `/developer`, `/docs/api`, `/changelog`, `/keamanan/trust-center`, `/keamanan/subprosesor`, `/dukungan`.
- Blog clusters: POS/kasir, procurement/supplier, accounting/reconciliation, multi-outlet/franchise, loyalty/retention, integrations, offline operations, security/privacy, AI-agent governance, migration/import, and role-based guides.

Full commercial funnel events add: `trial_started`, `workspace_created`, `first_sale`, `member_invited`, `integration_connected`, `plan_selected`, `checkout_started`, `subscription_started`, `payment_failed`, `payment_recovered`, `plan_upgraded`, `plan_downgraded`, `subscription_cancelled`.

Every product page links to pricing/demo, relevant industry, related guide/template, support docs and implemented security proof. Do not compress all modules onto homepage; retain hub-and-spoke and maximum-three-click structure.
