# RAMUNI marketing asset kit

Folder ini adalah handoff untuk tim marketing yang ingin memakai visual produk RAMUNI di homepage, pricing, halaman produk, halaman solusi, atau campaign.

## Status pengumpulan

- Build manifest SaaS berisi **80 route statis** dan 3 route dinamis.
- Runner memilih **70 route aman** dan berhasil menangkap **210 screenshot** (70 route × desktop, tablet, mobile).
- Semua capture memakai browser Chromium terisolasi di container Playwright, akun E2E sintetis, dan workspace `Toko Katalog Real`; ketiga viewport terautentikasi dan seluruh hasil berstatus `captured`.
- Hasil lengkap, status route, viewport, dan provenance ada di [`screenshots/saas-e2e/manifest.json`](./screenshots/saas-e2e/manifest.json) dan salinan ringkas di [`screenshots/manifest.json`](./screenshots/manifest.json). Tidak ada production account atau data pribadi yang dipakai.
- Evidence nyata yang sudah tersimpan: 210 screenshot SaaS E2E baru, 2 screenshot SaaS E2E lama (`dashboard-desktop-1440.png` dan `dashboard-mobile-pixel7.png`), serta 12 asset dashboard/product yang sudah ada di repository.
- Preview kartu marketing menggunakan 11 konteks dashboard yang sama dengan komponen RAMUNI (termasuk konteks khusus Web Builder dan Knowledge OS). Angka di preview adalah data simulasi terkontrol dan selalu diberi disclosure, bukan data live pengunjung.

## Isi folder

| Folder | Isi | Kegunaan |
| --- | --- | --- |
| `screenshots/saas-e2e/{desktop,tablet,mobile}/` | 210 PNG full-page evidence dari akun E2E terisolasi | Bukti UI produk per route dan viewport |
| `screenshots/saas-e2e/manifest.json` | Manifest 70 route × 3 viewport | Audit route, auth, ukuran viewport, dan error |
| `screenshots/source-evidence/saas-e2e/` | PNG evidence lama yang tetap dipertahankan | Referensi dashboard legacy |
| `screenshots/source-evidence/marketing-product/` | WebP/PNG dashboard dan product screen | Hero, product rail, feature proof |
| `screenshots/manifest.json` | Manifest hasil runner terbaru | Audit route, viewport, dan error |
| `components/` | Panduan pemakaian library kartu | Handoff ke marketing/frontend |

## Komponen siap pakai

Canonical source ada di:

- `src/components/MarketingFeatureCardGrid.astro`
- `src/components/MarketingDashboardCanvas.astro`
- `src/data/marketingFeatureCards.ts`

Library mencakup 5 feature detail, 9 produk, dan 5 solusi. Setiap kartu memiliki link, konteks dashboard, status, signal utama, dan CTA. Layout bento berubah menjadi satu kolom di mobile; entry motion memakai IntersectionObserver dan otomatis berhenti ketika `prefers-reduced-motion` aktif.

Contoh penggunaan:

```astro
---
import MarketingFeatureCardGrid from '../components/MarketingFeatureCardGrid.astro';
import { marketingProductCards } from '../data/marketingFeatureCards';
---

<MarketingFeatureCardGrid
  id="product-library"
  eyebrow="Semua produk"
  heading="Dari pertanyaan harian sampai pondasi data."
  body="Pilih modul yang paling dekat dengan pekerjaan tim."
  cards={marketingProductCards}
/>
```

## Disclosure dan aturan pemakaian

Jangan menyebut angka preview sebagai hasil pelanggan, benchmark, atau data live. Gunakan label **Contoh tampilan · data simulasi untuk demo marketing** kecuali screenshot diberi sumber evidence yang jelas. Jangan menambahkan logo integrasi atau menjanjikan fitur yang belum tercantum sebagai `Available` di `src/data/commercial.ts`.

Runner screenshot ada di `internal/ramuni-saas-source/scripts/capture-screenshots.mjs`. Untuk mengulang capture di VM gunakan wrapper terisolasi `internal/ramuni-saas-source/scripts/capture-screenshots-container.sh`; wrapper memeriksa resource guard, membatasi container, dan memilih browser Playwright yang tidak terpengaruh loader host. Jalankan dengan akun E2E sintetis dan `SCREENSHOT_OUTPUT_DIR` terpisah. Jangan memasukkan kredensial production ke repo.
