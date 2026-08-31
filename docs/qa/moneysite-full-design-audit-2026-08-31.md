# RAMUNI marketing site — full design, content, responsive, and asset audit

Tanggal audit: 31 Agustus 2026
Scope: seluruh marketing site di `internal/ramuni-source`, dibandingkan dengan batas kapabilitas SaaS di `internal/ramuni-saas-source/docs/qa/production-evidence-2026-08-31.md`.

## 1. Putusan singkat

**Belum oke secara visual dan pengalaman membaca.** Penilaian pengguna bahwa halaman terlalu panjang, terlalu banyak teks, dan hero terasa sama adalah benar. Implementasi sekarang kuat secara teknis (static check dan static SEO audit lulus), tetapi struktur editorialnya belum cukup selektif. Hampir semua halaman berusaha menjelaskan, membuktikan, dan menjual sekaligus. Akibatnya:

- halaman utama dan detail menjadi scroll panjang dengan banyak H2, kartu, rail screenshot, dan CTA yang mengulang argumen;
- pola `eyebrow/breadcrumb → H1 → paragraf → CTA → visual berbingkai` muncul terlalu luas;
- hero dipakai untuk halaman yang sebenarnya merupakan utilitas (FAQ, status, bantuan, legal), sehingga intent pengguna tertunda;
- bukti produk nyata sering dikelilingi terlalu banyak kartu konseptual;
- mobile dan tablet menerima hampir seluruh kepadatan desktop dalam urutan vertikal;
- variasi antarkeluarga halaman (product/solution/industry/role/feature) belum cukup terasa.

Target redesign: **density 5/10 (dari sekitar 8/10), motion 3/10, page-family variance 7/10**. Setiap halaman komersial utama memiliki satu argumen utama, satu treatment bukti utama, dan satu hierarki CTA.

Tidak ada perubahan UI produksi yang dilakukan dalam audit ini.

## 2. Bukti dan batas audit

### Yang diperiksa

- Source Astro/CSS aktual di `src/pages`, `src/components`, dan `src/styles`.
- 281 HTML hasil build untuk metadata, schema, link internal, aksesibilitas statis, sitemap/noindex, dan budget.
- 169 file source dengan reduced-motion handling; tidak ditemukan pola clickable `div/span` yang jelas.
- Route inventory: product (hub + 9 detail), solution (hub + 5 detail), industry (hub + 6 detail), role (hub + 4 detail), feature (hub + 5 detail), resource (3 guide, 6 template, 22 calculator, 26 glossary), blog (112 entry), commercial, utility, dan legal.
- `production-evidence-2026-08-31.md`: 225 route SaaS × 3 viewport; smoke terbaru 18/18 untuk 6 core route; Web Builder dan Knowledge OS recapture 3/3.
- Inventaris Drive-export lokal di `outputs/drive-assets/` dan optimized WebP di `public/website-original/marketing/drive/`.
- Screenshot lama bertanggal 26 Juli 2026 untuk indikasi panjang dan breakpoint. Screenshot runtime baru tidak dapat dibuat karena Chromium/Chrome/Firefox/Playwright tidak tersedia.

### Yang belum dapat diverifikasi

Folder Drive yang diberikan pengguna (`1omrd1YBAfFzb3SOdc7JJAkw5oOE7awLQ`) mengarah ke Google sign-in saat diakses anonim, sehingga isi folder live tidak dapat dienumerasi. Audit asset menggunakan export lokal yang sudah tersedia; provenance folder lama di README perlu direkonsiliasi sebelum publish.

### Temuan produksi non-visual

- `https://www.ramuni.id/sitemap.xml` saat audit live mengembalikan 404.
- `robots.txt` hanya berisi `User-agent: * / Allow: /` dan tidak merujuk sitemap.
- Canonical live masih tampak memakai `https://ramuni.id/`, sedangkan host produksi adalah `https://www.ramuni.id/` (apex redirect).
- `/readyz` SaaS masih 503 karena mail provider; status produk tetap **Partial / belum GA**. Copy marketing harus tidak menyiratkan semua roadmap sudah live.

## 3. Prinsip desain yang harus menjadi kontrak implementasi

1. **Satu halaman, satu janji.** H1, subhead, dan proof harus menjawab satu pekerjaan pengguna.
2. **Proof sebelum penjelasan panjang.** Tampilkan UI/workflow nyata sebelum katalog konsep.
3. **Satu primary CTA per fase.** CTA sekunder menjadi text link; maksimum dua CTA terlihat di hero.
4. **Variasi berdasarkan intent, bukan dekorasi.** Product = kemampuan; solution = perubahan masalah; industry = hari kerja; role = ruang kerja dan handoff; feature = status/availability.
5. **Flat brand.** Pertahankan Warm Rice, Ink Navy, Ramu Teal, Turmeric, Plus Jakarta Sans. Hindari gradient berat, shadow bertumpuk, dan card-in-card.
6. **Progressive disclosure.** Detail teknis, FAQ, glossary, calculator methodology, dan evidence panjang dibuka saat dibutuhkan.
7. **Mobile adalah urutan konten tersendiri.** Bukan desktop yang dipotong menjadi kolom tunggal.

Standar kuantitatif:

- Homepage: 7–8 chapter utama; halaman komersial utama: maksimal 6–8; detail/support: 4–6.
- Hero: 1 H1, 1 subhead 2–3 baris mobile, 1 primary CTA, maksimal 1 secondary link.
- Body copy utama: ideal 35–55 karakter per baris, paragraf 2–4 baris mobile.
- Maksimal 3 bukti visual besar per halaman; satu di atas fold.
- Satu full-width CTA closing; jangan menambah action bar + mid CTA + proof CTA + closing CTA untuk argumen sama.

## 4. Matrix route family dan keputusan hero

| Keluarga | Intent | Treatment opener yang disarankan | Keputusan hero | Bukti utama |
|---|---|---|---|---|
| Homepage | Memahami nilai dan mulai mencoba | Hero penuh, lalu proof langsung | Pertahankan, pendekkan | Satu dashboard/workflow nyata |
| Product hub | Memilih modul | Hero katalog singkat | Pertahankan, tanpa rail ganda | Product chooser interaktif |
| Product detail (9) | Memahami satu modul | Proof-first hero; H1 + UI | Pertahankan tetapi ringkas | Satu workflow autentik |
| Solution hub | Memilih hasil bisnis | Scenario chooser | Pertahankan medium | Symptom → outcome map |
| Solution detail (5) | Memvalidasi masalah | Symptom-led opener | Ganti hero besar dengan scenario opener | Satu before/after flow |
| Industry hub | Menemukan kecocokan konteks | Medium opener + industry switcher | Pertahankan medium | Context board |
| Industry detail (6) | Membayangkan hari operasional | Timeline “sehari di…” | Ganti hero besar | Day-in-the-life timeline |
| Role hub | Memilih peran | Compact role index | Medium, tanpa visual besar | Role priority matrix |
| Role detail (4) | Melihat tugas dan handoff | Workspace/task opener | Ganti hero besar | What I see/do/hand off |
| Features hub | Menelusuri jobs/status | Searchable feature index | Compact masthead | Status + jobs table |
| Feature detail (5) | Mengecek capability dan kesiapan | Utility masthead | Jangan gunakan sales hero | Availability/status + short proof |
| Pricing | Membandingkan paket | Pricing masthead dengan plan scan | Pertahankan compact | Pricing table + FAQ singkat |
| FAQ | Menjawab pertanyaan | Search + accordion di atas fold | Hapus hero besar dan proof rail | Searchable FAQ |
| Compare | Memilih/beralih | Before/after workflow | Hapus generic hero | Comparison flow |
| Roadmap | Mengecek arah dan status | Now/next/later timeline | Hapus hero besar | Timeline berstatus jelas |
| Resources | Mencari alat/bukti | Resource index + search/filter | Pertahankan ringan | Filterable library |
| Guide/template | Mengambil resource | Compact title + metadata | Hapus framed hero | Preview/download action |
| Calculator | Menghitung | Task opener + calculator langsung | Hapus hero besar | Calculator first |
| Glossary | Mencari definisi | Sticky TOC + definition | Hapus hero besar | Definition first |
| Blog | Membaca/menjelajah | Editorial index | Gunakan editorial masthead | Featured story |
| Help | Menyelesaikan task | Search-first support header | Hapus hero besar | Search + category links |
| Status | Mengecek kesehatan layanan | Status bar di atas | Hapus hero | Current incidents/uptime |
| Security | Menilai trust | Compact trust masthead | Hapus framed illustration | Controls/evidence table |
| About | Memahami perusahaan | Editorial intro | Compact masthead | Mission + proof |
| Contact | Menghubungi | Form-first opener | Hapus hero besar | Form + routing expectations |
| Legal | Membaca ketentuan | Plain document header | Hapus hero/dekorasi | TOC + metadata |

## 5. Homepage — audit per section

Source: `src/pages/index.astro`. Urutan sekarang memiliki 15 section utama sebelum footer lead content dan menghasilkan sekitar 2.244 kata, 26 H2, 27 H3, 13 button-class CTA, 3 form. Screenshot lama menunjukkan sekitar 21.340 px pada 375 px dan 16.175 px pada 768 px.

| Bagian saat ini | Keputusan | Brief implementasi |
|---|---|---|
| Hero + loop/dashboard | **Pertahankan, redesign** | H1 satu kalimat; subhead 2 baris; satu CTA “Lihat cara kerja”; satu text link “Jelajahi modul”. Ganti loop dekoratif dengan satu state UI autentik dan caption singkat. |
| Commercial action bar tepat di bawah hero | **Hapus/merge** | Pindahkan proof/CTA penting ke hero atau trust band. Jangan menambah bar keputusan sebelum pengguna memahami produk. |
| Input/output chapter | **Merge** | Satukan menjadi satu diagram “input → keputusan” maksimal 3 langkah. Hilangkan copy pengantar berulang. |
| Problem chapter | **Pertahankan, pendekkan** | Tiga symptom chips, bukan tiga paragraf kartu. Satu kalimat dampak dan link ke solution hub. |
| Solution routes | **Pertahankan sebagai chooser** | Maksimal empat route; gunakan filter/segmented control, bukan grid panjang. |
| AI answer example | **Merge ke proof** | Satu contoh jawaban dengan highlight sumber dan confidence; jangan diikuti anatomy card terpisah. |
| Workflow explorer | **Pertahankan satu** | Jadikan interactive stepper 3–4 langkah. Jangan membuat rail visual kedua. |
| Dashboard proof | **Jadikan proof utama** | Naikkan setelah problem/solution chooser. Satu screenshot besar + tiga callout singkat. |
| Screenshot rail | **Hapus atau batasi** | Jika dashboard proof dipakai, rail ini duplikatif. Gunakan maksimal 2 thumbnail sebagai gallery. |
| Drive card catalog | **Hapus dari homepage** | Asset katalog dipakai kontekstual di product/industry detail, bukan sebagai katalog kedua. |
| Module atlas | **Merge ke product chooser** | Satu indeks modul dengan status; hindari card-in-card. |
| Industry switcher | **Pertahankan, pendekkan** | 4 industri prioritas + “lihat semua”; gunakan context snippets. |
| Start steps | **Pertahankan** | Tiga langkah, masing-masing satu kalimat; gabungkan CTA ke satu action. |
| Report chapter | **Merge ke dashboard proof** | Jangan menjelaskan reporting dua kali. |
| Trust | **Pertahankan** | Trust strip ringkas: security, data boundary, support expectation. Tidak perlu rail baru. |
| Pricing teaser | **Pilih salah satu** | Untuk conversion: pertahankan teaser 3 angka + link pricing. Jika FAQ dipertahankan penuh, hapus pricing teaser. |
| FAQ | **Ringkas** | 4 pertanyaan paling penting + link `/faq/`; jangan full accordion di homepage. |
| Closing CTA + footer lead | **Satu saja** | Pilih closing CTA; pastikan lead form footer tidak mengulang headline/CTA yang sama. |

Target hasil: 8 chapter, ≤1.100 kata, ≤10 H2, ≤4 CTA button (1 primary, 3 contextual), satu proof visual utama.

## 6. Product

### Hub `/produk/`

Saat ini sekitar 1.804 kata, 21 H2, 10 CTA; stack `DecisionFlow3D → screenshot rail → catalog → evidence rail` terlalu banyak. Susunan baru: (1) compact chooser opener, (2) modul unggulan dengan proof nyata, (3) filter katalog status/jobs, (4) satu workflow lintas modul, (5) related paths, (6) CTA. DecisionFlow3D dan screenshot rail tidak boleh sama-sama menjadi focal point.

### Detail `/produk/[slug]/` (9 halaman)

Skeleton sekarang sangat mirip antarslug (~1.866 kata, 21 H2, 11 CTA). Ubah menjadi:

1. Proof-first opener: H1 + job + screenshot/workflow autentik.
2. “Sebelum / sesudah” tiga langkah.
3. Dua atau tiga capability cards tanpa nested cards.
4. Boundary/status: live, partial, atau roadmap, mengikuti evidence SaaS.
5. Related module link dan satu CTA.

Jangan menambah hero illustration generik bila screenshot sudah cukup. Setiap slug harus memiliki satu “job to be done” yang berbeda; judul section tidak boleh saling copy-paste.

## 7. Solution, industry, dan role

### Solution `/solusi/` dan `/solusi/[slug]/`

Hub sekitar 1.628 kata/18 H2; detail sekitar 1.881 kata/20 H2. Detail harus dimulai dari symptom dan skenario, bukan framed hero. Alur: symptom → operational scenario → one capability proof → expected outcome → boundary/status → CTA. Komponen `DriveCardCatalog limit={0}` di `src/pages/solusi.astro` menghasilkan section “Bukti alur” kosong; **hapus komponen dan judulnya**.

### Industry `/industri/` dan `/industri/[slug]/`

Hub cukup memakai medium opener dan switcher. Detail (~1.709 kata/20 H2/12 CTA) diganti menjadi timeline “sehari di bisnis ini”, context board, tiga modul relevan, dan satu CTA. Hindari menampilkan hero + dashboard + card catalog secara berurutan.

### Role `/untuk/` dan `/untuk/[slug]/`

Hub (~1.554 kata/16 H2) menjadi role index ringkas. Detail (~1.540 kata/20 H2) fokus pada “yang saya lihat / bisa lakukan / serahkan ke siapa”, lalu permission/handoff matrix. Hilangkan hero ilustrasi besar jika tidak menambah pemahaman tugas.

## 8. Features, commercial, resources, support, legal

### Features

Features hub adalah halaman terpadat (sekitar 3.110 kata, 14 H2, 24 H3). Prioritaskan searchable job/status index, capability grouping, dan release boundary. Kurangi screenshot rail, evidence rail, dan kartu konseptual menjadi satu proof treatment. Feature detail memakai utility masthead, availability badge, short proof, limitations, dan related docs—bukan sales landing page kedua.

### Pricing, FAQ, compare, roadmap

- **Pricing:** compact hero; plan table harus terlihat cepat. Turunkan CTA dari 14 menjadi satu primary per plan + satu global contact/demo. Nyatakan batas akses dan status produk yang belum GA.
- **FAQ:** hapus `CommercialProofShowcase`; search/accordion adalah konten utama. Kelompokkan 5–7 kategori, buka satu jawaban default hanya bila membantu.
- **Compare:** gunakan before/after workflow atau capability matrix yang dapat dipindai. Jangan mengulang proof rail halaman pricing.
- **Roadmap:** ganti generic hero/cards dengan timeline Now / Next / Later, label confidence/status, dan tanggal review. Bedakan committed, exploring, dan unavailable.

### Resources, blog, help, status, security, about, contact, legal

- Resource hub memakai search/filter; guide/template memakai title + metadata + preview/download. Calculator langsung membuka input; glossary langsung membuka definisi dengan sticky TOC. Jangan gunakan hero besar pada 22 calculator, 26 glossary, dan 6 template.
- Blog gunakan editorial hierarchy dan satu featured story; jangan membawa skeleton sales page ke artikel.
- Help dan status adalah task surfaces: search/status bar di atas, tanpa proof showcase.
- Security memakai controls/evidence table dan link dokumen. About memakai mission, proof, people/operating principles secara ringkas. Contact menempatkan form dan ekspektasi balasan di atas.
- Legal memakai plain document header, metadata, sticky TOC, dan typography baca; tanpa dekorasi marketing.

## 9. Responsif: desktop, tablet, mobile

### Breakpoint contract

Saat ini `PageHero.astro:55–60` dan beberapa CSS memiliki aturan `max-width:1080/1200px` yang kemudian mengembalikan dua kolom pada 961–1200px. Ini berisiko membuat copy terjepit pada tablet besar. Tetapkan satu kontrak:

- `<768px`: satu kolom, visual setelah copy, horizontal scroller hanya untuk collections.
- `768–959px`: tablet portrait, dua kolom hanya bila copy minimum 46ch dan visual minimum 320px.
- `960–1199px`: tablet landscape/compact desktop, jangan toggle layout berlawanan; gunakan grid 5/7 atau stacked proof sesuai page family.
- `≥1200px`: desktop penuh.

### Aturan lintas perangkat

- Mobile: H1 maksimal 2–3 baris, paragraph 2–4 baris, target sentuh ≥44px, CTA tidak menumpuk lebih dari dua.
- Tablet: uji 768, 834, 1024, 1194 px; pastikan header tidak berganti mode secara tak terduga.
- Desktop: batasi line length 55–65ch dan jaga proof tetap dekat dengan claim.
- Floating WhatsApp/lead controls harus menghormati safe area, tidak menutup form/accordion, dan disembunyikan saat modal/consent aktif.
- Offset mascot absolut (`home-refinement.css:491–514`) diganti normal flow pada ≤620px untuk mencegah clipping.
- Audit gradient/shadow di `HeroContextVisual.astro`, `home-refinement.css`, floating contact, dan lead popup; gunakan surface/border flat kecuali elevation fungsional.
- Semua video loop harus memiliki pause/stop yang dapat diakses atau fallback poster; hormati `prefers-reduced-motion`.

## 10. Asset dan video plan

Export lokal berisi 54 asset (64 MiB): 39 PNG, 12 JPG, dan 3 MP4. Isinya 8 generated laptop cutouts, 23 card/component PNG, 10 Android screenshots, 3 Gemini MP4, dan 2 contact sheet. Optimized WebP berada di `public/website-original/marketing/drive/` (31 file, sekitar 342 KiB; sekitar 99,1% lebih kecil dari 31 source PNG). Pemetaan laptop:

| Asset | Penempatan yang disarankan |
|---|---|
| `207shots_so` overview | Homepage proof utama atau product hub |
| `35shots_so` sales/customers | Product sales/customer detail |
| `217shots_so` inventory | Product inventory / industry retail |
| `289shots_so` POS/cashier | Product POS / industry F&B |
| `356shots_so` POS/payment | Payment workflow, bukan hero umum |
| `801shots_so` stock transfer | Inventory workflow detail |
| `909shots_so` promotion/discount | Promotion capability detail |
| `990shots_so` finance/alternate summary | Finance/product proof alternatif |

Drift yang harus dibereskan sebelum implementasi: saat ini hanya `DriveCardCatalog` yang mereferensikan set Drive; homepage memakai `limit=3`, product `limit=2`, solution `limit=0`, dan features tidak memakai catalog. Akibatnya hanya 3 card Drive unik yang terlihat; 5 entry catalog dan seluruh 8 laptop WebP serta 15 card lain tidak terpakai. README placement lama tidak lagi merefleksikan source. Ada duplikasi byte-identical (`raw/207shots_so.png` dan `raw/990shots_so.png`) serta empat salinan dashboard di public. Jangan menghapus asset blog/product tanpa verifikasi route, tetapi tandai 164 dari 572 public asset yang belum direferensikan untuk triage.

Aturan penggunaan: satu asset hero/proof per halaman, caption menjelaskan job, alt text deskriptif, jangan menampilkan asset yang sama di hero + rail + catalog. Tiga MP4 `outputs/drive-assets/raw/gemini_generated_video_*.mp4` kompatibel (H.264/AAC, 1280×720, 10–20 detik) tetapi belum publish-ready: masih memiliki audio, belum ada WebM/poster/caption/creative approval, dan terlalu berat untuk homepage. Existing dashboard/mascot loops di public sudah ringan dan memiliki MP4/WebM; tetap sediakan pause/stop. Raw Gemini video lebih tepat untuk explainer sekunder setelah diedit dan disetujui, bukan sebagai bukti capability utama. README menunjuk folder Drive berbeda (`19wg...`), sehingga provenance dengan folder pengguna (`1omrd...`) harus disamakan.

## 11. Copy dan CTA standards

- Hapus pembuka abstrak yang mengulang “mulai dari satu…”, “periksa…”, “bukti…”, dan “keputusan tetap di tangan Anda” di banyak halaman; pertahankan satu tempat sebagai brand phrase.
- Setiap H2 harus menjawab pertanyaan pengguna atau menunjukkan perubahan yang dapat diamati. Jika tidak, ubah menjadi label kecil atau hapus.
- Satu paragraf explanatory maksimal 45–70 kata; gunakan bullets untuk batasan, inputs, outputs, dan status.
- CTA utama harus berupa hasil (“Lihat alur”, “Coba workspace”, “Bandingkan paket”), bukan label generik yang sama di seluruh halaman.
- CTA sekunder berupa text link menuju evidence/docs. Jangan menempatkan primary button di setiap section.
- Nyatakan “live / partial / planned” berdasarkan production evidence; jangan menjual roadmap sebagai fitur tersedia.

## 12. Motion dan aksesibilitas

Motion 3/10: gunakan enter/fade pendek, transform-only, dan satu focal animation. Hindari looping tiga video sekaligus di homepage, parallax yang tidak memberi informasi, dan hover-only affordance. Sediakan pause/stop untuk video/loop, `prefers-reduced-motion`, focus-visible, dan keyboard order yang sama dengan visual order. Uji fixed controls dengan safe area dan screen zoom 200%.

## 13. Backlog implementasi

### P0 — sebelum redesign dianggap selesai

1. Pangkas homepage menjadi 7–8 chapter dan satu proof utama.
2. Hapus empty “Bukti alur” di solution hub.
3. Ganti hero besar FAQ, roadmap, compare, help, status, security, about, contact, legal, calculator, glossary, template menjadi task/utility masthead.
4. Tetapkan CTA hierarchy dan copy limits; hapus CTA/proof duplication.
5. Perbaiki sitemap 404, robots sitemap reference, dan canonical host `www`.
6. Pastikan capability/status copy mengikuti evidence SaaS (Partial, `/readyz` 503).

### P1 — struktur keluarga dan responsive

1. Implementasikan page-family templates berbeda (product/solution/industry/role/feature).
2. Konsolidasikan breakpoint 768/960/1200 dan uji 768/834/1024/1194/1440.
3. Redesign features hub, pricing scan, FAQ search, compare workflow, roadmap timeline.
4. Pindahkan asset ke konteks job; hapus screenshot/catalog rails duplikatif.
5. Normal-flow mascot mobile, safe-area floating controls, flat-surface pass.

### P2 — polish dan scale

1. Progressive disclosure calculator/glossary/template dan sticky TOC.
2. Editorial pass 112 blog entry dan internal linking.
3. Video poster/controls/codec optimization setelah folder Drive resmi dapat diakses.
4. Visual regression snapshots per page family dan content-length fixtures.

## 14. Acceptance criteria dan screenshot matrix

Redesign hanya siap sign-off bila:

- Homepage ≤8 chapter, ≤1.100 kata, satu proof utama, tidak ada CTA stack.
- Detail/support ≤6 section dan tidak memakai generic hero tanpa alasan intent.
- Tidak ada section kosong, card-in-card berulang, atau rail yang mengulang asset sama.
- Semua route memiliki H1 unik, status capability akurat, dan CTA utama terukur.
- Layout lulus pada 375×812, 390×844, 768×1024, 834×1112, 1024×768, 1194×834, 1440×900.
- Keyboard, reduced motion, zoom 200%, safe area, dan video pause lulus.
- Static checks tetap 0 error/warning/hint; live sitemap/robots kembali 200/valid.

Screenshot matrix minimum: homepage (7 viewport), satu product detail, satu solution detail, satu industry detail, satu role detail, pricing, FAQ, roadmap, calculator, help, status, dan legal pada mobile/tablet/desktop. Screenshot lama Juli hanya baseline; jangan dianggap sign-off baru.

## 15. Urutan pengerjaan yang direkomendasikan

1. Bereskan P0 content/IA dan SEO production blocker.
2. Bangun ulang homepage dan utility mastheads; validasi mobile/tablet.
3. Terapkan empat template detail berbeda, mulai dari satu representative route per family.
4. Migrasikan asset dengan mapping job dan tambahkan video hanya setelah provenance/controls jelas.
5. Roll out ke seluruh slug/resource/blog, lalu jalankan static + responsive + accessibility regression.

Audit ini adalah brief implementasi. Perubahan kode dan deploy harus dilakukan pada pass berikutnya setelah brief disetujui.
