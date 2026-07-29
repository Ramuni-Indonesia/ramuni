---
title: "Cara Merapikan Data Produk dan SKU untuk UMKM"
description: "Langkah menyusun nama produk, SKU, satuan, kategori, harga, dan status agar transaksi serta stok lebih mudah ditelusuri."
dek: "Data produk yang rapi memakai satu identitas untuk satu barang, aturan nama yang konsisten, dan riwayat perubahan yang dapat diperiksa."
cover: "/website-original/blog/generated/cara-merapikan-data-produk-dan-sku.webp"
coverAlt: "Tim usaha merapikan nama produk, SKU, satuan, dan kategori dalam katalog"
coverWidth: 768
coverHeight: 432
publishedAt: 2026-07-27
updatedAt: 2026-07-27
category: "Stok & Inventori"
categorySlug: "stok-inventori"
tags:
  - "SKU"
  - "Data Produk"
  - "Inventori"
authorName: "Tim Editorial RAMUNI"
authorSlug: "tim-editorial-ramuni"
reviewStatus: "needs-review"
editorialStatus: "Disusun dengan ilustrasi; menunggu tinjauan operasional sebelum indeksasi."
readingTime: "9 menit"
takeaways:
  - "Satu varian produk memerlukan satu identitas internal yang stabil."
  - "Nama, satuan, kategori, dan status perlu aturan yang dipakai bersama."
  - "SKU internal tidak sama dengan barcode atau GTIN global."
  - "Jangan menghapus produk lama jika riwayat transaksi masih membutuhkannya."
sources:
  - title: "Global Trade Item Number (GTIN)"
    publisher: "GS1"
    url: "https://www.gs1.org/standards/id-keys/gtin"
    accessedAt: 2026-07-27
    note: "Rujukan untuk membedakan identitas barang global GTIN dari kode SKU internal yang dibuat usaha."
updateSummary: "Terbit awal dengan aturan nama, SKU internal, satuan, deduplikasi, dan migrasi bertahap."
related:
  - "panduan-membaca-stok-harian"
  - "produk-terlaris-belum-tentu-paling-untung"
  - "checklist-review-bisnis-mingguan-umkm"
ctaType: "product"
featured: false
draft: false
noindex: true
---

Data produk yang rapi membantu transaksi, stok, dan laporan merujuk pada barang yang sama. Tujuannya bukan membuat kode serumit mungkin, tetapi mencegah satu barang tercatat dengan banyak nama atau dua varian berbeda memakai identitas yang sama.

## Tentukan satu baris untuk satu varian

Satu varian adalah kombinasi yang perlu dibedakan saat dijual atau disimpan. Contoh: “Kaos M / Hitam” dan “Kaos L / Hitam” memerlukan identitas berbeda jika stoknya dihitung terpisah.

Satu baris produk minimum dapat berisi:

| Kolom | Fungsi | Contoh isian |
| --- | --- | --- |
| Nama produk | Nama yang dibaca tim | Kopi Bubuk 250 g |
| SKU internal | Identitas stabil | KOP-BBK-250 |
| Kategori | Kelompok laporan | Bahan minuman |
| Satuan dasar | Unit stok | pak |
| Harga jual aktif | Acuan transaksi | Rp45.000 |
| Status | Aktif atau diarsipkan | Aktif |

Tambahkan kolom hanya jika memiliki proses yang jelas. Kolom yang tidak pernah diperbarui akan memberi rasa rapi tanpa memperbaiki kualitas data.

## Buat aturan nama yang mudah dibaca

Pilih urutan nama yang konsisten, misalnya **nama inti + ukuran + varian**. Hindari singkatan yang hanya dipahami satu orang.

Contoh:

- Baik: `Kaos Dasar 100% Katun / L / Hitam`
- Kurang jelas: `KD-L-H-NEW`
- Duplikat berisiko: `Kaos Hitam Besar` dan `Kaos Dasar L Black`

SKU boleh ringkas, tetapi nama produk tetap perlu mudah dibaca. Jangan memasukkan harga atau lokasi rak ke SKU jika informasi tersebut sering berubah.

## Bedakan SKU, barcode, dan GTIN

SKU adalah kode internal yang dibuat usaha untuk mengenali barang. Barcode adalah cara menampilkan data agar dapat dipindai. GTIN adalah jenis identitas global yang dikelola dalam standar GS1.

Satu istilah tidak otomatis menggantikan yang lain. Jika Anda menjual produk milik pemasok, kode barcode pada kemasan mungkin sudah ada. Jika Anda membuat produk sendiri dan membutuhkan identitas global untuk rantai pasok tertentu, rujuk penjelasan resmi [GS1 tentang GTIN](https://www.gs1.org/standards/id-keys/gtin) dan proses yang berlaku.

[Modul katalog produk RAMUNI](/produk/katalog-produk/) menggambarkan cara identitas produk dipakai lintas transaksi. Penyebutan pada situs mengikuti ruang lingkup fitur yang telah diverifikasi.

## Samakan satuan sebelum menghitung stok

Masalah sering muncul ketika pembelian dicatat per dus, stok per pak, dan penjualan per satuan. Tentukan satuan dasar serta konversinya.

Contoh sederhana:

- 1 dus = 12 pak.
- 1 pak = 6 botol.
- Satuan dasar stok = botol.

Jangan mengubah konversi pada transaksi lama tanpa rencana migrasi. Jika isi kemasan pemasok berubah, buat periode berlaku atau varian baru agar riwayat lama tetap dapat dijelaskan.

## Cari dan gabungkan duplikat dengan hati-hati

Jangan langsung menghapus salah satu produk duplikat. Periksa:

1. Apakah keduanya benar-benar barang yang sama?
2. Apakah satuan dan variannya sama?
3. Produk mana yang dipakai transaksi terbaru?
4. Apakah riwayat dapat dialihkan tanpa merusak laporan?
5. Apakah integrasi atau ekspor masih memakai kode lama?

Jika sistem mendukung, arsipkan kode lama dan simpan pemetaan ke identitas utama. Riwayat transaksi harus tetap menunjukkan barang yang dijual pada saat itu.

## Pisahkan perubahan harga dari identitas produk

Harga dapat berubah tanpa membuat barang baru. Simpan riwayat atau tanggal berlaku jika proses membutuhkannya. Jangan menamai produk `Kopi 25rb`, lalu membuat `Kopi 27rb` ketika harga berubah. Kebiasaan tersebut memecah riwayat penjualan menjadi dua produk palsu.

Hal serupa berlaku untuk lokasi rak, pemasok, dan status promosi. Simpan sebagai atribut yang dapat berubah, bukan bagian permanen dari identitas.

## Rapikan data secara bertahap

Mulai dari produk aktif dan paling sering bergerak. Migrasi seluruh katalog sekaligus dapat membuat tim berhenti mencatat.

Urutan yang praktis:

1. Ekspor atau cadangkan data sebelum perubahan.
2. Pilih 20 produk paling aktif.
3. Samakan nama, SKU, kategori, dan satuan.
4. Periksa saldo fisik untuk produk berisiko tinggi.
5. Uji transaksi baru dan laporan.
6. Dokumentasikan pemetaan kode lama ke kode baru.
7. Lanjutkan kelompok berikutnya.

Setelah data dasar rapi, gunakan [panduan membaca stok harian](/blog/panduan-membaca-stok-harian/) untuk menghubungkan saldo dengan laju penjualan dan waktu isi ulang.

## Checklist data produk

- [ ] Satu varian memiliki satu identitas internal.
- [ ] Nama mengikuti urutan yang dipahami tim.
- [ ] SKU tidak bergantung pada harga atau lokasi yang sering berubah.
- [ ] Satuan dasar dan konversi terdokumentasi.
- [ ] Produk duplikat dipetakan sebelum diarsipkan.
- [ ] Riwayat transaksi tetap dapat dibuka.
- [ ] Perubahan diuji pada transaksi, stok, dan laporan.

Data produk yang rapi tidak harus sempurna dalam satu hari. Yang penting, setiap perbaikan membuat satu barang lebih mudah dikenali dari pembelian sampai penjualan dan stok fisik.
