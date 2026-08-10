# Rencana Otoritas dan Internal Link RAMUNI

Status: panduan implementasi untuk halaman yang sudah indexable. Dokumen ini bukan bukti bahwa suatu backlink, domain rujukan, atau hasil peringkat sudah ada.

## Prinsip

Tujuan link adalah membantu orang dan mesin pencari memahami hubungan topik, bukan mengejar jumlah domain atau metrik otoritas semata. Setiap tautan eksternal harus relevan, dapat ditelusuri, dan diletakkan pada konteks editorial yang berguna. Hindari jaringan tautan, situs tidak relevan, anchor yang dipaksakan, dan halaman yang dibuat hanya untuk menerima tautan.

Sebelum menjalankan outreach, pastikan halaman target telah memenuhi kontrak indeks: HTTP 200, canonical ke URL final, `index,follow`, satu H1, metadata unik, CTA yang berfungsi, dan tidak memiliki blokir robots.

## Prioritas halaman target

| Prioritas | Tujuan | URL target | Peran dalam funnel | Tautan internal yang harus mengarah ke sini |
| --- | --- | --- | --- | --- |
| P1 | Memahami kondisi usaha secara menyeluruh | `/produk/dashboard-bisnis/` | Money page untuk evaluasi produk | Homepage, artikel lintas topik, halaman solusi, halaman produk lain yang relevan |
| P1 | Membaca penjualan dan perubahan omzet | `/produk/penjualan/` | Money page untuk kebutuhan penjualan | Solusi omzet, artikel penjualan, kalkulator penjualan |
| P1 | Menjaga stok dan pemeriksaan ulang | `/produk/inventori/` | Money page untuk kebutuhan stok | Solusi stok, artikel stok, kalkulator stok |
| P1 | Memisahkan laba dan kas | `/produk/keuangan/` | Money page untuk kebutuhan keuangan | Solusi laba/kas, artikel keuangan, kalkulator laba dan kas |
| P1 | Menguji pertanyaan dan bukti | `/produk/asisten-ai/` | Money page untuk kebutuhan insight | Artikel AI, halaman dashboard, solusi terkait |
| P2 | Mengurai masalah spesifik | `/solusi/naikkan-omzet/`, `/solusi/kelola-stok/`, `/solusi/pantau-laba-dan-arus-kas/`, `/solusi/pahami-pelanggan/`, `/solusi/laporan-bisnis-otomatis/` | Consideration page | Homepage, artikel dengan intent cocok, kalkulator yang sudah memberi hasil |
| P3 | Mengundang trafik berintensi informasional | `/kalkulator/`, `/template/`, `/panduan/`, artikel blog yang memiliki sumber dan metode | Linkable asset | Hub sumber daya, artikel terkait, solusi yang sesuai |
| P4 | Meminta percakapan | `/tour-produk-gratis/` | Lead capture | Hanya dari halaman yang sudah menjelaskan konteks dan nilai yang akan diperoleh |

Jangan memusatkan semua backlink ke homepage atau `/tour-produk-gratis/`. Halaman produk dan solusi menjelaskan nilai dengan lebih jelas dan lebih layak menjadi tujuan editorial.

## Jalur internal yang diterapkan

1. Artikel kategori mengarahkan ke produk yang sesuai melalui `ArticleProductBridge`.
2. Artikel dengan kalkulator menampilkan CTA lanjutan setelah hasil dihitung, menuju halaman solusi sesuai kategori.
3. Halaman solusi menghubungkan masalah dengan produk, sumber daya, dan contoh alur.
4. Homepage kini menampilkan pilihan masalah tepat setelah bagian problem, sebelum rincian proses dan modul.
5. Halaman produk dan solusi harus tetap memberi jalur jelas ke contoh alur gratis tanpa menyembunyikan konteks penggunaannya.

Audit tiap rilis: pilih satu artikel dari masing-masing kategori, jalankan kalkulator, buka halaman solusi, lalu pastikan produk dan CTA tur tersedia tanpa 404 atau redirect berantai.

## Aset yang layak dipromosikan

- Kalkulator HPP, margin, harga jual, laba, arus kas, reorder stok, dan safety stock. Pastikan rumus, asumsi, batas penggunaan, serta tanggal pembaruan terlihat.
- Template operasional yang dapat dipakai, disertai panduan pengisian dan contoh yang jelas diberi label contoh.
- Panduan yang mengutip sumber primer atau otoritatif ketika menyebut definisi, aturan, atau statistik eksternal.
- Ringkasan metodologi RAMUNI tentang cara memeriksa insight: periode, bukti, konteks, dan keputusan manusia.

Jangan menyebut hasil pelanggan, jumlah pengguna, penghematan waktu, atau perubahan omzet tanpa data dan izin publik yang dapat dibuktikan. Case study hanya boleh dipublikasikan setelah ada pemilik usaha, data periode, metode pengukuran, persetujuan tertulis, dan ruang untuk menyatakan keterbatasannya.

## Rencana outreach yang aman

1. Pilih satu target per topik, bukan satu daftar besar tanpa relevansi: komunitas UMKM, publikasi bisnis lokal, institusi pendidikan bisnis, atau media yang memang membahas operasi usaha.
2. Tawarkan aset yang berguna untuk pembaca mereka, misalnya kalkulator atau panduan pemeriksaan stok; jangan membeli placement tanpa konteks editorial.
3. Minta tautan ke halaman paling dekat dengan materi, bukan selalu ke homepage.
4. Gunakan anchor alami: nama RAMUNI, judul sumber daya, atau frasa deskriptif yang muncul di kalimat. Hindari pengulangan anchor kata kunci persis.
5. Catat URL penempatan, halaman tujuan, tanggal, topik, tipe relasi, dan status `nofollow`/`sponsored` bila ada.
6. Setelah publikasi, periksa bahwa halaman rujukan dan target tetap bisa diakses serta tautannya tidak diubah menjadi redirect yang tidak relevan.

## Pengukuran

Ukur per halaman target, bukan hanya total backlink:

- klik organik dan query di Search Console;
- impresi, posisi, serta landing page yang menerima trafik;
- klik dari artikel atau kalkulator ke solusi dan produk;
- penyelesaian kalkulator dan klik CTA sesudah hasil;
- pembukaan contoh alur dan lead yang benar-benar masuk CRM;
- domain rujukan yang relevan serta trafik referalnya.

Bandingkan perubahan pada periode yang setara. Jangan menyimpulkan dampak hanya dari satu hari atau satu tautan baru.
