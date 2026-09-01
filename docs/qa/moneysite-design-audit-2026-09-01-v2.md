# RAMUNI money site — full section, design, copy, proof, and conversion audit v2

Tanggal: 1 September 2026  
Status: analisis dan brief; belum ada restrukturisasi UI pada audit ini  
Scope: homepage, produk, solusi, industri, peran, fitur, pricing, roadmap, halaman konversi, company/support, dan resource hubs.

## 1. Putusan

**Belum cukup mantap untuk menjadi money site utama.** Versi sekarang jauh lebih rapi daripada baseline 31 Agustus: homepage sudah delapan chapter, utility page lebih pendek, media Drive sudah HD, dan status feature mulai terlihat. Namun penilaian bahwa site masih terasa monoton dan terlalu penuh teks tetap benar.

Masalah utamanya bukan kurangnya section. Justru terlalu banyak section yang menjelaskan hal serupa dengan grammar visual yang sama. Product, solution, industry, dan role detail semuanya memakai variasi dari pola:

`hero dua kolom → input/problem → visual/screenshot → benefits/workflow → context → related → FAQ → CTA`

Akibatnya pengguna melihat banyak halaman, tetapi mendapat pengalaman yang terasa seperti satu template dengan label berbeda.

Keputusan desain:

- Homepage perlu dipertahankan delapan chapter, tetapi hero harus **product-proof first**, bukan lifestyle-video first.
- Product detail perlu turun dari 11 menjadi 5–6 section utama.
- Solution detail harus berbeda total dari product detail: mulai dari gejala/skenario, bukan dashboard hero.
- Industry detail perlu satu scene operasional unik per industri, bukan 14 section yang sama untuk enam slug.
- Role detail perlu fokus permission, exception, dan handoff, bukan product page lain.
- Feature detail adalah keluarga yang paling dekat ke struktur yang benar, tetapi status/copy-nya masih terlalu seragam.
- Pricing memiliki isu kebenaran produk dan status paling penting: “Coming soon” masih memakai tanda centang dan nilai harga tampil hanya karena indexing production aktif.
- Visual system perlu disederhanakan. Source memiliki 213 deklarasi `box-shadow`, 261 `border-radius`, 32 gradient, dan sekitar 30 nilai breakpoint berbeda.

## 2. Skor editorial saat ini

Skor ini adalah rubric desain internal, bukan hasil usability test.

| Area | Nilai | Putusan |
| --- | ---: | --- |
| Positioning utama | 7/10 | H1 homepage jelas dan relevan untuk UMKM |
| Diferensiasi antarkeluarga halaman | 4/10 | Product/solution/industry/role masih terasa satu template |
| Proof produk | 5/10 | Banyak mockup, tetapi proof utama terlambat atau berulang |
| Kualitas copy | 6/10 | Jelas dan hati-hati, tetapi terlalu sering memakai frase yang sama |
| Scannability | 5/10 | Detail page masih 10–15 section utama/nested section |
| Conversion path | 5/10 | CTA tersedia, tetapi istilah demo/tour/konsultasi masih bercabang |
| Product truth/status | 4/10 | Status feature ada, tetapi status product/pricing belum aman |
| Mobile/tablet strategy | 6/10 | Breakpoint tersedia, tetapi density desktop masih ditumpuk ke mobile |
| Visual system consistency | 5/10 | Brand kuat, cascade dan decoration terlalu kompleks |
| Trust/customer evidence | 3/10 | Belum ada customer proof yang dapat diverifikasi |

## 3. Bukti kuantitatif live

Pengukuran dilakukan pada isi `<main>` produksi, sehingga footer, global navigation, popup, dan floating contact tidak ikut dihitung.

| Keluarga | Route | Median kata | H2 | Section | Button | Image |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage | 1 | 661 | 8 | 8 | 4 | 9 + 3 video |
| Product hub | 1 | 718 | 9 | 13 | 4 | 4 |
| Product detail | 9 | 878 | 11 | 11 | 5 | 4–5 |
| Solution hub | 1 | 577 | 6 | 7 | 3 | 12 + 1 video |
| Solution detail | 5 | 857 | 10 | 10 | 4 | 4–5 |
| Industry hub | 1 | 620 | 8 | 9 | 4 | 1 |
| Industry detail | 6 | 700 | 10 | 14 | 6 | 4 |
| Role hub | 1 | 587 | 7 | 8 | 5 | 1 |
| Role detail | 4 | 568 | 11 | 15 | 6 | 4 |
| Feature hub | 1 | 600 | 4 | 5 | 3 | 0 |
| Feature detail | 5 | 323 | 7 | 8 | 4–5 | 2 |
| Pricing | 1 | 793 | 3 | 4 | 9 | 0 |
| Roadmap | 1 | 284 | 2 | 6 | 4 | 0 |

Temuan penting:

- Product detail sudah lebih pendek daripada versi audit lama, tetapi 830–910 kata dengan 11 chapter tetap terlalu padat untuk menjual satu modul.
- Solution detail hampir sama padatnya dengan product detail. Ini bukti bahwa solusi masih berperilaku sebagai product page kedua.
- Industry dan role detail memiliki kata lebih sedikit, tetapi section paling banyak. Pengalaman scroll tetap fragmentaris karena terlalu sering berhenti pada heading/board baru.
- Homepage sekarang berada pada batas yang masuk akal. Masalahnya adalah urutan proof dan jenis visual, bukan menambah section baru.

## 4. Benchmark kompetitor

Raw scans dan quick profiles berada di `competitor-profiles/`.

### Mekari

Yang perlu dipelajari:

- Hub produk dan solusi jauh lebih ringkas daripada landing page detail.
- Trust metric dan customer evidence muncul lebih awal.
- Jalur product/solution/industry dibedakan secara jelas.

Yang tidak perlu ditiru:

- Katalog yang terlalu luas.
- Copy “growth/digital transformation” yang generik.
- SEO landing page yang sangat panjang.

### HashMicro

Yang perlu dipelajari:

- AI differentiation terlihat di atas fold.
- Product demo dan use case industri terasa nyata.
- CTA demo konsisten dan decisive.

Yang tidak perlu ditiru:

- Puluhan video dan media surface pada satu page.
- Page length dan intensitas klaim enterprise.
- Banyak section yang mengulang trust dan fungsi.

### Majoo

Yang perlu dipelajari:

- Bahasa sangat konkret: transaksi, jam ramai, menu, stok, outlet, piutang.
- Kecocokan jenis usaha mudah dikenali.
- Pricing dan trial terlihat jelas.

Yang tidak perlu ditiru:

- Halaman pricing/F&B yang sangat panjang.
- Catalog/add-on berulang.
- Beberapa blok “cara kerja” dan close yang duplikatif.

### SAP

Direct fetch ke homepage, ERP, Business One, dan customer stories ditolak Akamai dengan HTTP 403. Karena itu audit ini tidak memakai klaim live SAP 2026. “SAP-style” hanya dipakai sebagai prior art umum: definisi kategori singkat, outcome grouping, fit chooser, dan customer proof.

### Kesimpulan benchmark

RAMUNI tidak perlu menjadi lebih ramai. Arah terbaik adalah:

- kekonkretan Majoo;
- trust placement Mekari;
- energi demonstrasi HashMicro;
- information architecture enterprise yang ringkas;
- ditambah diferensiasi RAMUNI: **jawaban dan keputusan dapat ditelusuri ke bukti**.

## 5. Homepage

### Yang sudah benar

- H1 “Lihat penjualan, stok, dan kas sebelum masalah membesar” jelas, spesifik, dan tidak overclaim.
- Delapan chapter sudah jauh lebih disiplin.
- Primary CTA “Coba gratis” dan secondary link “Lihat cara kerja” memiliki hierarki yang cukup jelas.
- Problem chooser, module chooser, dan industry context menjawab tiga intent berbeda.

### Yang belum mantap

1. **Hero memakai lifestyle video.** Visual pemilik usaha dengan laptop tidak membuktikan produk. Di above-the-fold, pengguna perlu melihat RAMUNI, bukan suasana kerja.
2. **Video kedua baru menjadi product proof.** Artinya proof produk autentik ditunda satu sampai tiga scroll.
3. **Problem chooser dan solution chooser masih berada di chapter yang sama tetapi terasa sebagai dua chooser berturut-turut.**
4. **Module grid enam kartu kembali ke grammar “katalog”.** Setelah problem chooser dan proof, grid ini terasa seperti directory kedua.
5. **Trust masih berbentuk prinsip internal.** Tidak ada logo customer, pilot outcome, quote, atau angka penggunaan yang dapat diverifikasi.
6. Hero CSS memiliki banyak lapisan override untuk 620/680/740/960/961/1200/1201 px. Hasil akhirnya sulit diprediksi dan mahal dirawat.

### Struktur yang disarankan

1. Hero product proof: H1 + satu CTA + interactive/silent RAMUNI dashboard clip.
2. Trust/status strip: “Contoh workspace tersedia”, “AI read-only terbatas”, “Keputusan tetap di pengguna”.
3. Symptom chooser: empat masalah, masing-masing satu output.
4. One-product story: pertanyaan → sumber → jawaban → tindak lanjut.
5. Module chooser: tiga jalur utama, bukan enam kartu setara.
6. Industry day-in-the-life switcher.
7. Trust + FAQ singkat.
8. Final CTA.

### Copy hero yang disarankan

H1 utama tetap bisa dipakai. Subhead dipadatkan menjadi:

> Satukan transaksi, stok, biaya, dan pelanggan. RAMUNI menunjukkan apa yang berubah, angka asalnya, dan apa yang perlu diperiksa berikutnya.

Caption proof:

> Contoh workspace dengan data demo. Buka periode dan sumber sebelum menentukan tindakan.

## 6. Product hub `/produk/`

### Putusan

Perlu dipangkas. Hub memiliki 13 section/nested section dan beberapa sistem pemilihan: hero canvas, decision flow, screenshot rail, outcome index, family board, role path, dan closing.

### Struktur target

1. Compact chooser opener.
2. Tiga family: Operasional, Insight, Jalur data.
3. Satu workspace proof.
4. Cross-module workflow.
5. Status/trust + CTA.

Hapus atau merge:

- jangan tampilkan `DecisionFlow3D` dan screenshot rail sebagai dua focal proof;
- role path menjadi contextual links, bukan chapter penuh;
- FAQ maksimal tiga pertanyaan;
- related/search intent menjadi footer navigation ringan.

Headline:

> Pilih pekerjaan yang ingin dibereskan. RAMUNI menunjukkan modul dan data yang dibutuhkan.

## 7. Product detail — sembilan route

### Masalah template

Semua halaman memakai 11 chapter: hero canvas, input/output, problem + evidence flow, screenshot rail, example/domain visual, benefits, workflow, readiness, audience explorer, search intent, related/FAQ/CTA. Tiga proof system sering menyampaikan hal yang sama.

Selain itu seluruh `productDetails.ts` capability masih `publicApproved: false`. `ProductReadinessBoard` kemudian menyembunyikan capability, sementara `ProductInputOutput` selalu menampilkan “Status halaman — Tersedia”. Ini dapat dibaca sebagai fitur tersedia penuh, padahal evidence produk menyatakan release **Partial / belum GA**.

### Skeleton target

1. Proof-first opener: satu job + satu screen.
2. Input → output atau before → after.
3. Maksimal tiga capability pembeda.
4. Workflow + status + boundary dalam satu chapter.
5. Satu scenario role/industry.
6. Related module + CTA.

### Arah unik per route

| Route | Focal scene | Hero/copy direction |
| --- | --- | --- |
| Asisten AI | Prompt, jawaban, sumber, confidence | “Tanyakan kondisi usaha. Buka sumber sebelum mengikuti jawabannya.” |
| Dashboard Bisnis | Morning review / three exceptions | “Lihat tiga perubahan yang perlu dibuka pagi ini.” |
| Katalog Produk | SKU identity and price history | “Satu produk, satu SKU, satu dasar harga untuk seluruh catatan.” |
| Penjualan | Revenue change investigation | “Telusuri perubahan omzet sampai ke produk, waktu, dan pembayaran.” |
| Inventori | Stock exception / reorder risk | “Dahulukan stok berisiko setelah saldo dan geraknya diperiksa.” |
| Keuangan | Omzet vs laba vs kas reconciliation | “Pisahkan omzet, laba, dan kas sebelum menilai kondisi usaha.” |
| Pelanggan | Repeat history + consent | “Kenali siapa yang kembali tanpa melupakan izin tindak lanjut.” |
| Laporan & Insight | Period close + action owner | “Tutup minggu dengan satu periode, satu rumus, dan pemilik tindak lanjut.” |
| Integrasi | Import validation / failed rows | “Impor data, perbaiki baris gagal, lalu gunakan yang sudah lolos pemeriksaan.” |

## 8. Solution hub dan detail

### Hub `/solusi/`

Saat ini hub cukup ringkas, tetapi memakai 12 image + satu video. Problem map, directory, module combinations, synthetic example, dan video membentuk terlalu banyak proof/chooser.

Target:

1. Symptom chooser.
2. Lima outcome routes.
3. Satu symptom-to-decision example.
4. Industry links.
5. FAQ + CTA.

Headline:

> Mulai dari gejala yang paling mengganggu minggu ini.

### Detail `/solusi/[slug]/`

Masalah terbesar: screenshot rail muncul tepat setelah hero, sebelum gejala. Ini membuat solution page terasa seperti product page.

Skeleton target:

1. Symptom/scenario opener tanpa framed dashboard hero.
2. Manual gap / before-after.
3. Satu product proof relevan.
4. Modul + expected outcome realistis.
5. Status/boundary + langkah mulai.
6. FAQ + CTA.

| Route | Pembeda wajib |
| --- | --- |
| Naikkan omzet | Ubah framing menjadi “memahami perubahan omzet”; jangan menjanjikan pertumbuhan |
| Kelola stok | Rak kosong vs stok menumpuk; jangan menduplikasi product inventori |
| Laba dan arus kas | Ketegangan omzet ramai tetapi kas ketat |
| Pahami pelanggan | Riwayat tersebar + izin follow-up |
| Laporan bisnis otomatis | Period, formula, source, dan owner; jelaskan batas automation |

## 9. Industry hub dan detail

### Hub `/industri/`

Sembilan section masih memutar ide “ritme usaha”, “angka berbeda”, “fondasi sama”, “masalah bersama”, dan “modul bersama”. Gunakan empat blok:

1. Hero + industry chooser.
2. Comparison matrix kebutuhan.
3. Satu visual/use case konkret.
4. CTA.

Kartu harus menyebut masalah utama dan modul, bukan hanya karakter/ritme industri.

### Detail `/industri/[slug]/`

Enam route memiliki tepat 14 section dengan struktur identik. Ini sumber monotoni terbesar.

Target maksimal enam section:

1. Outcome hero.
2. First proof.
3. One day-in-the-life workflow.
4. Modules and exceptions.
5. Setup/privacy boundary.
6. CTA + short FAQ.

Scene unik:

| Industri | Scene utama |
| --- | --- |
| Retail | Buka toko → stok kritis → transaksi → tutup shift |
| F&B | Persiapan bahan → jam ramai → menu habis → food cost |
| Distributor | Pesanan → alokasi stok → pengiriman → piutang |
| Reseller online | Kanal → order → fee → margin → stok |
| Jasa | Booking → pengerjaan → biaya → pembayaran → repeat |
| Manufaktur kecil | Bahan → produksi → barang jadi → biaya → reorder |

Copy harus menyebut istilah operasional: stok minus, shift, menu habis, invoice tertunda, fee kanal, bahan rusak. Kurangi penggunaan kata “ritme”, “bukti”, “catatan”, dan “arah” di semua slug.

## 10. Role hub dan detail

### Hub `/untuk/`

Role chooser harus menjadi inti, bukan salah satu dari banyak chapter. Struktur target:

1. Pilih peran.
2. Permission/action matrix.
3. One handoff flow.
4. Screenshot proof.
5. CTA.

CTA role-specific:

- Pemilik: “Lihat kontrol usaha”.
- Admin: “Lihat alur input dan koreksi”.
- Kasir: “Lihat mode kerja kasir”.
- Supervisor: “Lihat laporan dan approval”.

### Detail `/untuk/[slug]/`

Empat route memiliki 15 section dan H1 generik “RAMUNI untuk X”. Ganti dengan pekerjaan, bukan jabatan.

| Peran | Hero direction | Focal proof |
| --- | --- | --- |
| Pemilik | “Tahu mana yang membutuhkan keputusan hari ini.” | Overview + exception ownership |
| Admin | “Rapikan input, koreksi, dan handoff tanpa kehilangan jejak.” | Validation + correction history |
| Kasir | “Selesaikan transaksi dan pulihkan error tanpa input ulang.” | POS + payment/retry state |
| Supervisor | “Lihat pengecualian, approval, dan tindak lanjut per shift.” | Exception queue + handoff |

Skeleton: job hero → screen proof → permission/actions → exception workflow → CTA/FAQ.

## 11. Features

### Hub `/features/`

Ini keluarga yang paling tepat secara arsitektur: searchable/job-first index, status, category path, lalu CTA. Pertahankan sebagai reference pattern untuk hub lain.

Adjust:

- tambahkan satu visual proof ringkas setelah filter;
- ubah “Tiga pintu masuk” menjadi use case dengan output jelas;
- jangan tambahkan rail atau katalog besar.

### Detail `/features/[slug]/`

Lima halaman memiliki H2 yang sama:

- “Lihat apa yang masuk dan apa yang keluar.”
- “Baca cara kerjanya, lalu pilih langkah.”
- “Pertanyaan yang bisa membantu tim mulai memeriksa.”
- “Transparansi lebih penting daripada daftar panjang.”
- “Pastikan alurnya cocok untuk tim Anda.”

Hasilnya bersih tetapi generated. Bedakan grammar:

- AI Copilot: prompt → source → answer → limitation.
- Profit Intelligence: metric definition → comparison → interpretation.
- Omnichannel: inbox → ownership → consent → status coming soon.
- Web Builder: compose → preview → publish boundary → status coming soon.
- Knowledge OS: capture → permission → search → status coming soon.

## 12. Pricing

### Yang sudah baik

- Plan cards dan feature matrix langsung menjawab intent pembelian.
- Harga, user, outlet, AI quota, dan status coming soon ditampilkan.
- Tidak perlu hero visual besar.

### Critical adjustments

1. `releaseGates.pricingPublic` mengikuti `siteIndexable`; tidak ada approval gate khusus pricing.
2. Production evidence belum membuktikan nilai harga publik Rp149k/Rp349k/Rp749k sebagai keputusan owner/finance.
3. Status `Coming soon` dirender dengan simbol ✓ karena semua status selain `Unavailable` memakai centang. Ini misleading.
4. Lima plan sekaligus cukup berat pada tablet/mobile.
5. CTA Growth/Starter “Bahas” masuk akal, tetapi final CTA kembali menawarkan “Coba gratis” dan “Konsultasi”, sehingga hierarchy bercabang.

Rekomendasi:

- tambahkan `PUBLIC_PRICING_APPROVED=true` yang terpisah dari indexing;
- simbol status: ✓ Available, ◐ Limited/Beta, ○ Coming soon, — Unavailable;
- mobile menggunakan plan selector + satu recommended comparison, bukan lima kartu panjang berturut-turut;
- “Free” sebagai direct start, plan berbayar sebagai consult/upgrade; jelaskan alur aktivasi;
- hilangkan klaim diskon tahunan jika finance belum menyetujui perhitungan.

## 13. Roadmap, demo, early access, about, support, resources

### Roadmap

- Now/Next/Later sudah tepat dan tidak perlu gambar besar.
- Tambahkan legend Live / In progress / Planned / Exploring.
- Tambahkan last updated dan prinsip prioritas.
- Primary CTA: “Lihat fitur yang sudah live”.

### Demo dan early access

- `/demo/` dan `/early-access/` saat ini menjadi redirect/surface kosong menuju `/tour-produk-gratis/`.
- Pilih satu canonical conversion term.
- “Demo” dan “early access” memiliki expectation berbeda; jangan dicampur.
- Jika release tetap Partial/belum GA, gunakan “Lihat workspace demo” dan jelaskan batas. Jangan menyebut early access jika tidak ada program khusus.

### Tentang

- Filosofi kuat, proof perusahaan lemah.
- Tambahkan legal entity/founder/team/status release/pilot jika dapat diverifikasi.
- Jangan membuat customer count atau testimonial sebelum sumber tersedia.

### Sumber daya

- Jadikan search/category first.
- Satu featured article cukup.
- Editorial standard menjadi trust strip kecil, bukan chapter visual besar.

### Bantuan, status, keamanan, kontak

- Bantuan: search-first.
- Status: current system state harus menjadi H1 context, bukan “jalur bantuan”.
- Keamanan: controls/evidence table; hindari manifesto tanpa sertifikasi.
- Kontak: form dan response expectation di atas fold.

## 14. Repetisi visual

Media sudah HD, tetapi distribusinya masih repetitif:

| Asset | Dipakai pada core page |
| --- | ---: |
| `207shots_so-hd.webp` | 9 |
| `35shots_so-hd.webp` | 9 |
| `990shots_so-hd.webp` | 7 |
| `217shots_so-hd.webp` | 6 |
| `801shots_so-hd.webp` | 5 |
| `card-1787991977808-hd.webp` | 5 |

Contoh overlap yang harus dihentikan:

- Product Inventori, Solution Kelola Stok, Industry Retail, dan beberapa role memakai family visual stok yang sama.
- Product Penjualan, Solution Naikkan Omzet, Product Pelanggan, dan Solution Pahami Pelanggan berbagi visual 35shots.
- Homepage, product hub, solution hub, dashboard, integrasi, report solution, owner role, dan AI feature memakai 207shots.

Aturan baru:

- Satu hero/proof asset maksimal untuk satu money page utama dan satu contextual reuse.
- Product memakai UI capability.
- Solution memakai before-after scenario.
- Industry memakai day-in-the-life composite.
- Role memakai screen crop/annotation yang menunjukkan permission atau handoff.
- Mockup Drive dipakai sebagai proof; lifestyle asset hanya sebagai supporting story.
- Jangan menampilkan hero screenshot dan supporting rail yang berasal dari screen sama.

## 15. Repetisi copy

Temuan live:

- “Bahas kebutuhan yang paling dekat.” muncul pada 36 core pages.
- “Modul yang biasanya dipakai bersama.” muncul pada sembilan product detail.
- Empat H2 industry yang sama muncul pada seluruh enam slug.
- Lima H2 feature yang sama muncul pada seluruh lima slug.
- “Pertanyaan sebelum memilih jalur.” muncul pada hub dan seluruh solution detail.

Copy contract:

- Satu recurring brand phrase maksimal satu kali per page family, bukan per route.
- H2 wajib menyebut object atau decision spesifik.
- Paragraph explanation maksimal 45–65 kata.
- Detail page maksimal 650–750 kata; feature detail 300–450 kata.
- CTA exploratory, advisory, dan conversion tidak boleh memakai label yang sama.

CTA taxonomy:

| Intent | Label |
| --- | --- |
| Mulai workspace | Coba gratis |
| Lihat product proof | Lihat workspace demo |
| Konsultasi | Bahas kebutuhan |
| Explore | Lihat cara kerja / Lihat fitur |
| Pricing | Bandingkan paket |

## 16. Visual system dan responsive

### Design-system debt

- 531 KB source CSS tersebar dalam 28 file.
- Base compiled CSS sekitar 96 KB uncompressed; beberapa page menambah 37–73 KB.
- GSAP + ScrollTrigger menghasilkan sekitar 113 KB JS uncompressed dan dimuat dinamis pada mayoritas halaman dengan `.reveal`.
- 213 shadow, 261 radius, dan 32 gradient membuat “clean modern” tidak konsisten.
- Breakpoint inventory memiliki sekitar 30 nilai; 740, 1200, 960, 620, 1201, 900, 961, dan 680 paling sering dipakai.
- `home-refinement.css` mengubah hero yang sama berkali-kali pada source order berbeda.

### Contract baru

- Breakpoint tokens: 0–639, 640–767, 768–959, 960–1199, ≥1200.
- Radius: 0, 12, 20, pill; jangan membuat nilai baru per component.
- Elevation: none, border, one functional shadow. Hapus hard offset shadow dari sebagian besar media/cards.
- Motion: CSS/IntersectionObserver untuk reveal sederhana; GSAP hanya untuk satu story yang benar-benar membutuhkan choreography.
- One focal motion surface per page.

### Mobile

- Copy → proof → action; jangan menyalin semua chapter desktop ke satu kolom.
- H1 maksimal 3–4 baris pada 360 px.
- Plan/feature matrices memerlukan selector atau progressive disclosure.
- Rail perlu snap + label “Geser”, atau menjadi satu featured item.
- CTA tidak boleh lebih dari dua action di satu viewport.

### Tablet

- 768–959 stacked secara default.
- 960–1199 boleh split hanya jika copy ≥42ch dan visual ≥420 px.
- Hindari aturan 960/961/980/1080/1200 yang saling membalik layout.

### Desktop

- Hero split untuk homepage/product only.
- Solution/industry/role dapat memakai editorial or scenario opener tanpa visual card kanan.
- Proof harus terlihat maksimal pada scroll kedua.

Runtime visual QA baru tetap diperlukan setelah implementasi; environment audit ini tidak memiliki browser Chromium/Firefox lokal.

## 17. Product truth dan sellability

Production evidence 31 Agustus–1 September menyatakan release **Partial / belum GA**. `/readyz` masih 503 karena provider mail, dan beberapa authenticated journeys belum memiliki bukti terbaru.

Kontrak marketing:

- Jangan menyamakan “contoh alur tersedia” dengan “fitur tersedia penuh”.
- Product page harus membaca status dari satu registry yang sama dengan evidence/capability source.
- Feature status: Available / Limited / Beta / Coming soon / Unavailable.
- Product status: Demo available / Limited release / GA hanya jika gate benar-benar lulus.
- Pricing dan claims membutuhkan approval gate terpisah.
- Customer proof hanya boleh menggunakan logo, quote, dan angka yang memiliki consent/provenance.

## 18. Prioritas implementasi

### P0 — wajib sebelum polish visual

1. Perbaiki truth model: product status, pricing approval, dan icon Coming soon.
2. Ganti homepage hero lifestyle video dengan product proof.
3. Pangkas product/solution detail menjadi skeleton 5–6 section.
4. Bedakan solution opener dari product hero.
5. Putuskan canonical CTA: workspace demo vs consultation vs early access.

### P1 — redesign money pages

1. Product hub: satu chooser + satu proof.
2. Solution hub: symptom chooser + one example.
3. Industry detail: six unique day-in-the-life scenes.
4. Role detail: permission + exception workflow.
5. Feature detail: grammar unik per capability.
6. Pricing mobile selector dan status legend.

### P2 — trust dan system cleanup

1. About/company proof.
2. Pilot/customer proof setelah consent.
3. Reduce shadow/radius/gradient inventory.
4. Consolidate breakpoint and hero CSS.
5. Reduce global motion dependency.
6. Browser QA 360/390/768/834/1024/1440.

## 19. Acceptance criteria untuk implementasi berikutnya

- Homepage tetap maksimum delapan chapter.
- Product/solution/industry/role detail maksimum enam chapter utama.
- Product detail 650–750 kata; solution 550–700; industry/role 450–650.
- Satu proof besar di first two scrolls.
- Satu asset tidak menjadi hero pada lebih dari dua core pages.
- Tidak ada repeated H2 lintas seluruh slug kecuali FAQ/related label yang benar-benar utility.
- Coming soon tidak pernah memakai checkmark tersedia.
- Harga publik hanya tampil ketika approval pricing aktif.
- Mobile 360 px tidak overflow dan primary CTA tetap terlihat.
- Tablet 768/834/1024 memakai urutan yang stabil.
- `prefers-reduced-motion`, focus-visible, pause video, alt/caption, dan keyboard order lulus.
- Site audit, accessibility static checks, performance budget, dan live smoke lulus sebelum deploy.

## 20. Final recommendation

Jangan menambah section baru pada sprint berikutnya. Lakukan **editorial subtraction + page-family differentiation**:

- lebih sedikit chapter;
- proof produk lebih awal;
- visual berbeda menurut job halaman;
- copy lebih konkret;
- status produk lebih jujur;
- CTA lebih konsisten;
- CSS dan breakpoint lebih kecil serta dapat diprediksi.

Itu yang akan membuat RAMUNI terasa clean, modern, dan meyakinkan—bukan sekadar mengganti kartu, warna, atau hero sekali lagi.
