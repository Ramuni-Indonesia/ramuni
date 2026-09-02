# RAMUNI money site — full audit & implementation brief v3

Tanggal: 1 September 2026
Status: audit selesai; belum ada restrukturisasi UI pada dokumen ini
Scope: homepage, produk, solusi, industri, peran, fitur, harga, roadmap, serta halaman pendukung yang ikut memengaruhi konversi.

## Putusan singkat

RAMUNI belum terasa cukup mantap sebagai money site utama. Fondasi visualnya sudah khas dan lebih editorial daripada SaaS generik, tetapi keluhan “terlalu banyak teks, card, laptop, dan hero yang sama” terbukti benar.

Masalahnya bukan kekurangan section. Masalahnya adalah setiap keluarga halaman memakai grammar yang hampir sama:

`hero dua kolom → problem/context → cards atau screenshot rail → workflow → related/FAQ → CTA`

Akibatnya sembilan halaman produk, lima solusi, enam industri, dan empat peran terlihat seperti satu template dengan label berbeda. Sprint berikutnya harus melakukan editorial subtraction dan page-family differentiation, bukan menambah section baru.

### Skor saat ini (rubric internal)

| Area | Skor | Putusan |
| --- | ---: | --- |
| Positioning homepage | 7/10 | H1 spesifik dan relevan untuk UMKM |
| Diferensiasi antarkeluarga | 4/10 | Product/solution/industry/role masih seragam |
| Proof produk | 5/10 | Asset autentik ada, tetapi sering terlambat/berulang |
| Copy dan scannability | 5/10 | Jelas, namun panjang dan banyak H2 berulang |
| Conversion path | 5/10 | CTA tersebar: demo, tour, konsultasi, early access |
| Product truth/status | 6/10 | Matrix harga sudah diperbaiki; release produk tetap partial |
| Mobile/tablet strategy | 6/10 | Breakpoint tersedia, tetapi density desktop ditumpuk ke mobile |
| Trust/customer evidence | 3/10 | Belum ada proof pelanggan yang dapat diverifikasi |

## Metode dan batasan audit

- Inspeksi source Astro, component, data registry, CSS, dan hasil build `dist`.
- Pengukuran isi `<main>` pada route money site; footer dan global navigation tidak dihitung.
- Pemeriksaan route live, sitemap/robots, dan audit asset.
- Benchmark struktur/copy Mekari, HashMicro, Majoo; SAP dipakai sebagai prior art karena fetch live terkena Akamai 403.
- Tidak ada Chromium/Firefox/Playwright di VM ini. Audit screenshot runtime 360/768/1024/1440 harus dilakukan setelah implementasi.

## Bukti kuantitatif route

| Route | Kata | H2 | Section | Gambar | CTA |
| --- | ---: | ---: | ---: | ---: | ---: |
| Homepage | 644 | 8 | 8 | 9 + 2 video | 10 |
| Product hub | 540 | 6 | 10 | 4 | 4 |
| Product detail (median 9) | 831–890 | 10 | 10 | 4–5 | 6 |
| Solution hub | 517 | 5 | 6 | 12 + 1 video | 3 |
| Solution detail (median 5) | 816–885 | 9 | 9 | 4–5 | 5 |
| Industry hub | 620 | 8 | 9 | 1 | 4 |
| Industry detail (6) | 597–641 | 8 | 12 | 4 | 6 |
| Role hub | 587 | 7 | 8 | 1 | 5 |
| Role detail (4) | 537–566 | 10 | 14 | 4 | 6 |
| Feature hub | 597 | 4 | 5 | 0 | 5 |
| Feature detail (5) | 316–332 | 7 | 8 | 2 | 6–7 |
| Pricing | 713 | 3 | 4 | 1 | 10 |
| Roadmap | 292 | 2 | 6 | 0 | 5 |

### Repetisi yang terdeteksi

- “Modul yang biasanya dipakai bersama.”: 9 product detail.
- “Data yang perlu disiapkan”, “Yang dilakukan RAMUNI”, “Yang dapat Anda periksa”: masing-masing 9 product detail.
- Beberapa H2 solution muncul 5 kali; H2 feature yang sama muncul di seluruh 5 detail feature.
- Asset `207shots_so-hd.webp` dan `35shots_so-hd.webp` masing-masing dipakai 9 core page; `990shots_so-hd.webp` 7 kali.
- Keluarga kata “ritme”, “bukti”, “catatan”, dan “arah” terlalu dominan pada industry/solution/role.

## Arah visual yang benar untuk RAMUNI

Contoh prompt Bitcoin DeFi hanya dipakai sebagai contoh kedalaman design system. Jangan menyalin dark void, Space Grotesk, orange glow, atau crypto ornament.

Pertahankan:

- Warm Rice `#F4F0E7`, Ink Navy `#0B3045`, Ramu Teal `#168C8C`, Turmeric `#F2B134`, putih.
- Plus Jakarta Sans, radius brand 18/10, dan editorial whitespace.
- Evidence, source, boundary, dan explainability sebagai pembeda utama RAMUNI.

Kontrak visual baru:

- Satu focal visual per section; maksimal satu focal motion surface per page.
- Product = UI capability/proof.
- Solution = symptom, before/after, dan keputusan.
- Industry = scene operasional/day-in-the-life.
- Role = permission, handoff, dan exception queue.
- Feature = utility/status/capability.
- Pricing = fit dan package comparison, bukan hero produk lain.
- Gunakan kombinasi split editorial, timeline, annotated crop, comparison, dan before/after; jangan semua menjadi card grid.

## Benchmark kompetitor

| Brand | Pola yang layak dipelajari | Batas yang tidak perlu ditiru |
| --- | --- | --- |
| Mekari | Trust metric awal, modular vs enterprise jelas, “why choose” dan layanan | Klaim transformasi generik dan katalog terlalu luas |
| HashMicro | AI terlihat di atas fold, demo/use case sangat demonstratif | Puluhan video, page terlalu panjang, klaim enterprise berlebihan |
| Majoo | Bahasa operasional UMKM dan imagery industri nyata; pricing mudah dipahami | Add-on catalog dan landing page yang sangat panjang |
| SAP | Definisi kategori singkat, outcome grouping, fit chooser, customer proof | Gaya enterprise yang terlalu abstrak untuk UMKM |

Target RAMUNI: kekonkretan Majoo + trust placement Mekari + energi demo HashMicro + struktur ringkas SAP, lalu diferensiasi RAMUNI berupa jawaban yang dapat dilacak ke bukti.

## Brief per keluarga halaman

### Homepage `/`

**Putusan:** delapan chapter boleh dipertahankan, tetapi urutan proof dan variasi ritme perlu diperbaiki. Hero lifestyle video tidak cukup untuk membuktikan software.

Urutan target:

1. Hero product-proof: H1, satu CTA utama, dashboard clip/still RAMUNI dengan caption data demo.
2. Trust/status strip: workspace demo, batas AI, keputusan tetap di pengguna.
3. Symptom chooser: empat masalah → satu output per masalah.
4. One product story: pertanyaan → sumber → jawaban → tindak lanjut.
5. Module chooser tiga jalur, bukan enam card setara.
6. Industry day-in-the-life switcher.
7. Trust + FAQ pendek.
8. Final CTA.

Target CTA: 5–6 (saat ini 10). Caption hero yang disarankan: “Contoh workspace dengan data demo. Buka periode dan sumber sebelum menentukan tindakan.”

### Product hub `/produk/`

Hero canvas, DecisionFlow3D, screenshot rail, family board, dan role path bersaing sebagai focal point. Pilih satu chooser dan satu proof.

Target 5 section: chooser singkat → tiga product family (Operasional/Insight/Jalur data) → satu workspace proof → cross-module workflow → status/FAQ/CTA. Role path dan search intent menjadi contextual links, bukan chapter.

### Product detail `/produk/[slug]/`

Kesembilan route memakai skeleton yang sama dan sekitar 10 section. Turunkan menjadi 5–6:

1. Proof-first opener: satu pekerjaan unik + satu screen.
2. Input → output atau before → after.
3. Maksimal tiga capability pembeda.
4. Workflow + status + boundary.
5. Satu scenario role/industry.
6. Related module + CTA/FAQ pendek.

Focal scene per route:

| Route | Focal scene/copy |
| --- | --- |
| Asisten AI | Prompt → sumber → jawaban → batas; “Buka sumber sebelum mengikuti jawabannya.” |
| Dashboard Bisnis | Review tiga pengecualian pada pagi hari |
| Katalog Produk | Identitas SKU, harga, dan riwayat perubahan |
| Penjualan | Telusuri perubahan omzet ke produk, waktu, pembayaran |
| Inventori | Risiko stok/reorder setelah saldo dan pergerakan diperiksa |
| Keuangan | Rekonsiliasi omzet, laba, dan kas |
| Pelanggan | Riwayat pembelian berulang + izin follow-up |
| Laporan & Insight | Tutup periode, rumus, dan owner tindak lanjut |
| Integrasi | Import → baris gagal → validasi → data siap pakai |

Hapus H2 generik dan jangan menampilkan hero screenshot serta screenshot rail dari screen yang sama.

### Solution hub `/solusi/`

Solution hub harus dimulai dari gejala, bukan katalog produk. Target 5 section: symptom chooser → lima outcome routes → satu symptom-to-decision example → industry links → FAQ/CTA. Kurangi 12 image + video menjadi satu proof yang relevan dan beberapa context card.

### Solution detail `/solusi/[slug]/`

Jangan memakai hero dashboard sebelum pengguna memahami masalah. Target 6 section:

1. Symptom/scenario opener tanpa framed product hero.
2. Manual gap atau before/after.
3. Satu product proof yang langsung menjawab scenario.
4. Modul dan outcome realistis.
5. Status/boundary + langkah mulai.
6. FAQ + CTA.

Pembeda wajib: omzet berubah (bukan janji menaikkan omzet), rak kosong vs stok menumpuk, omzet ramai vs kas ketat, riwayat pelanggan tersebar, serta laporan berdasarkan periode/rumus/source/owner. Jangan menduplikasi product detail terkait.

### Industry hub `/industri/`

Sembilan section terlalu banyak untuk fungsi chooser. Target 4–5: chooser → comparison matrix → satu visual/use case konkret → CTA. Setiap pilihan wajib menyebut masalah operasional dan modul, bukan hanya “ritme usaha”.

### Industry detail `/industri/[slug]/`

Enam route memiliki sekitar 12 rendered section dengan struktur identik. Target maksimal 6: outcome hero → first proof → one day-in-the-life workflow → modules/exceptions → setup/privacy boundary → CTA + FAQ.

Scene unik:

- Retail: buka toko → stok kritis → transaksi → tutup shift.
- F&B: bahan → jam ramai → menu habis → food cost.
- Distributor: pesanan → alokasi → pengiriman → piutang.
- Reseller online: kanal → order → fee → margin → stok.
- Jasa: booking → pengerjaan → biaya → pembayaran → repeat.
- Manufaktur kecil: bahan → produksi → barang jadi → biaya → reorder.

Gunakan istilah konkret seperti stok minus, shift, menu habis, invoice tertunda, fee kanal, dan bahan rusak.

### Role hub `/untuk/`

Jadikan role chooser sebagai inti. Target: pilih peran → permission/action matrix → satu handoff flow → screen proof → CTA role-specific. CTA: pemilik “Lihat kontrol usaha”, admin “Lihat alur input dan koreksi”, kasir “Lihat mode kerja kasir”, supervisor “Lihat laporan dan approval”.

### Role detail `/untuk/[slug]/`

Empat route terlalu fragmentaris walau copy pendek. Target 5 section: job hero → screen proof → permission/actions → exception workflow → CTA/FAQ. Tone harus berbeda: owner = keputusan/risiko, admin = akurasi/koreksi, kasir = cepat/minim salah, supervisor = monitoring/approval.

### Features `/features/` dan `/features/[slug]/`

Hub adalah pola terbaik saat ini: searchable/job-first index + status. Pertahankan, tambahkan satu visual proof ringkas, dan hapus teks internal “Ini mengganti rail visual panjang”. Jangan taruh capability “Segera hadir” sebagai salah satu dari tiga pintu masuk utama.

Detail feature tetap pendek, tetapi H2 wajib unik:

- AI Copilot: pertanyaan, sumber, jawaban, batas.
- Profit Intelligence: definisi metrik sebelum tafsir laba.
- Omnichannel: inbox, owner tindak lanjut, izin, status.
- Web Builder: susun, preview, batas publish, status.
- Knowledge OS: tangkap SOP, izin, cari ulang, status.

### Pricing `/pricing/`

Matrix status sudah mengikuti permintaan terbaru: hanya ✓ hijau untuk termasuk paket dan × merah untuk tidak tersedia/naik paket; label “sesuai kuota” dihilangkan. Struktur tetap terlalu padat di tablet/mobile karena lima plan card + matrix + CTA.

Perbaikan berikutnya:

- Hero harga tetap utility, bukan hero laptop.
- Tambahkan strip “paket ini cocok untuk siapa”.
- Mobile: selector paket + satu comparison recommended; progressive disclosure untuk matrix.
- Growth menjadi pilihan utama secara visual; Free direct start; plan berbayar mengarah ke konsultasi/upgrade.
- Pisahkan approval pricing dari `siteIndexable` sebelum harga dipakai sebagai Offer schema.

### Roadmap `/roadmap/`

Strukturnya sudah tepat dan tidak memerlukan gambar besar. Tambahkan legend Live/In progress/Planned/Exploring, last updated, prinsip prioritas, dan CTA “Lihat fitur yang sudah live”.

### Halaman pendukung

- `/demo/` dan `/early-access/`: canonical-kan satu istilah conversion (`/tour-produk-gratis/`), jangan campur ekspektasi demo dengan early access.
- `/tentang/`: tambah proof yang dapat diverifikasi (legal entity, tim/founder, status release, pilot bila ada).
- `/sumber-daya/`: search/category-first; satu featured article; editorial standard menjadi trust strip.
- Bantuan/status/keamanan/kontak: task-first, bukan sales hero.

## Asset dan media brief

Asset Drive lokal sudah tersedia dan umumnya berupa WebP HD. Masalah utama adalah penempatan, bukan kurangnya file.

| Keluarga | Asset utama | Aturan |
| --- | --- | --- |
| Homepage | `207shots_so-hd.webp` atau satu video produk | pilih satu; jangan ulang di hero + rail |
| AI | `aiAssistant` + source annotation | satu proof, bukan laptop dekoratif |
| Dashboard | overview/weeklyReport | crop exception pagi |
| Katalog | stockPriority | fokus SKU/harga |
| Penjualan | salesSummary/salesCustomers | fokus perubahan omzet |
| Inventori | inventory/stockTransfer | jangan ulang utuh di solution/retail |
| Keuangan | profitIntelligence/cashContext | definisi angka + rekonsiliasi |
| Pelanggan | customerInbox | history + consent |
| Laporan | weeklyReport/insightContext | periode + owner |
| Integrasi | dataImport | accepted/failed rows |
| Industri | foto `public/website-original/industries/*` + UI insert kecil | day-in-the-life, bukan laptop hero |
| Role | teamHandoff/posContext + crop permission | handoff/exception, bukan mockup penuh |
| Pricing | mascot/offer illustration | hindari laptop |

Aturan teknis: satu asset maksimal menjadi hero pada satu money page dan contextual reuse satu kali; beri width/height intrinsik, `object-fit` yang tepat, WebP optimized, lazy-load below fold, serta poster untuk video. Jangan merentangkan screenshot sehingga pecah.

## Responsive dan accessibility contract

- Breakpoint konsisten: 0–639, 640–767, 768–959, 960–1199, ≥1200.
- Mobile 360/390: copy → proof → action; H1 maksimal 3–4 baris; rail menjadi satu featured item atau snap carousel dengan label “Geser”.
- Tablet 768/834: stacked default; split hanya jika copy ≥42ch dan visual ≥420px.
- Desktop: split hero hanya untuk homepage/product; solution/industry/role boleh editorial opener tanpa card kanan.
- CTA primer maksimal satu per fase viewport; tidak lebih dari dua action terlihat bersamaan di mobile.
- Pertahankan `prefers-reduced-motion`, focus-visible, alt kontekstual, keyboard order, dan pause video.

## Product truth dan hygiene teknis

Evidence produksi menyatakan release masih Partial/belum GA dan `/readyz` SMTP masih 503. Marketing harus membedakan “contoh workspace/demo” dari “fitur GA”. Semua product/feature/pricing status sebaiknya berasal dari registry yang sama.

Audit live juga menemukan 8 referensi gambar blog yang 404 dan sekitar 1.601 warning origin CDN yang tidak masuk allowlist audit. Ini bukan blocker redesign, tetapi harus dibereskan sebelum sign-off release.

## Urutan implementasi

### P0

1. Satukan truth model status produk dan approval harga.
2. Ganti hero homepage menjadi product proof.
3. Refactor skeleton product/solution detail menjadi 5–6 section.
4. Pisahkan solution opener dari product hero.
5. Tetapkan canonical CTA dan event taxonomy.

### P1

1. Pangkas industry/role detail dan buat scene unik per route.
2. Product/solution hub masing-masing hanya punya satu chooser + satu proof.
3. Variasikan H2 feature dan hapus copy internal.
4. Pricing mobile selector + “cocok untuk siapa”.
5. Terapkan asset placement map.

### P2

1. Trust/company proof yang dapat diverifikasi.
2. Konsolidasi token radius, shadow, breakpoint, dan hero CSS.
3. Kurangi ketergantungan GSAP pada reveal sederhana.
4. Browser QA dan performance budget.

## Acceptance criteria sebelum live

- Homepage maksimum 8 chapter; detail product/solution/industry/role maksimum 6 chapter utama.
- Product 650–750 kata; solution 550–700; industry/role 450–650; feature 300–450.
- Proof produk terlihat dalam dua scroll pertama.
- Tidak ada repeated H2 lintas seluruh slug kecuali label utility yang memang sama.
- Satu asset tidak menjadi hero di lebih dari dua core page.
- Pricing hanya ✓ hijau/× merah sesuai status; harga/schema hanya aktif setelah approval.
- Mobile 360px tidak overflow; tablet 768/834/1024 layout stabil.
- Alt, focus, keyboard, reduced motion, video poster/pause, dan scroll hint lulus.
- Missing image 404 dan origin warning dibereskan.
- Static audit, accessibility check, performance check, dan live smoke test lulus.

## Kesimpulan

Jangan menambah card, laptop, atau hero baru secara massal. RAMUNI akan terasa clean dan modern jika setiap keluarga halaman memiliki pekerjaan yang berbeda, proof muncul lebih cepat, copy menyebut operasi nyata, dan halaman dipangkas dengan sengaja. Dokumen ini menjadi brief implementasi; perubahan kode dilakukan pada fase berikutnya setelah prioritas P0 disetujui.
