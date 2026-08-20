---
title: "Cara Menentukan Stok Minimum untuk UMKM"
description: "Panduan menentukan stok minimum UMKM dari laju penjualan, waktu tunggu pemasok, variasi permintaan, dan kondisi stok fisik."
dek: "Stok minimum bukan angka yang dipasang sekali. Nilainya perlu mengikuti kecepatan barang keluar, waktu pemasok, dan risiko kehabisan."
cover: "/website-original/dashboards/ramuni-dashboard-inventory-reorder.webp"
coverAlt: "Dashboard RAMUNI yang membantu membaca saldo stok, kebutuhan isi ulang, dan prioritas pemeriksaan"
coverWidth: 1280
coverHeight: 720
publishedAt: 2026-07-30
updatedAt: 2026-07-30
category: "Stok & Inventori"
categorySlug: "stok-inventori"
tags:
  - "Stok Minimum"
  - "Reorder Point"
  - "Inventori UMKM"
authorName: "Bima Ardiansyah"
authorSlug: "bima-ardiansyah"
reviewerName: "Tim Peninjau RAMUNI"
reviewerSlug: "tim-peninjau-ramuni"
reviewedAt: 2026-08-09
reviewStatus: "reviewed"
editorialStatus: "Disusun untuk peninjauan editorial sebelum indeksasi."
readingTime: "8 menit"
takeaways:
  - "Stok minimum perlu membaca pemakaian atau penjualan harian bersama waktu tunggu pemasok."
  - "Tambahkan ruang pengaman hanya untuk risiko yang benar-benar dapat dijelaskan."
  - "Pisahkan saldo sistem, jumlah fisik, pesanan masuk, dan barang yang tidak dapat dijual."
  - "Tinjau ulang angka ketika pola penjualan, pemasok, atau jam operasional berubah."
faqs:
  - question: "Apa itu stok minimum?"
    answer: "Stok minimum adalah batas pemeriksaan yang membantu usaha mengetahui kapan persediaan mulai perlu diperhatikan sebelum habis. Batas ini bukan perintah pembelian otomatis."
  - question: "Bagaimana rumus sederhana stok minimum?"
    answer: "Mulai dari rata-rata barang keluar per hari dikalikan waktu tunggu pemasok, lalu tambahkan stok pengaman yang masuk akal untuk variasi permintaan atau keterlambatan."
  - question: "Seberapa sering stok minimum perlu diperbarui?"
    answer: "Periksa setidaknya setiap bulan dan setiap kali ada perubahan besar pada penjualan, pemasok, musim, promosi, jam buka, atau kapasitas penyimpanan."
sources:
  - title: "Standar Akuntansi Keuangan Indonesia untuk Entitas Mikro, Kecil dan Menengah"
    publisher: "Ikatan Akuntan Indonesia"
    url: "https://web.iaiglobal.or.id/SAK-IAI/Tentang%20SAK%20EMKM#gsc.tab=0"
    accessedAt: 2026-07-30
    note: "Rujukan umum mengenai pencatatan dan penyajian keuangan entitas mikro, kecil, dan menengah. Kebijakan persediaan resmi perlu mengikuti standar dan kebutuhan usaha yang berlaku."
disclaimer: "Contoh perhitungan bersifat edukasi. Sesuaikan angka dengan pola usaha, kondisi barang, pemasok, dan kebijakan pencatatan Anda."
updateSummary: "Menambahkan metode sederhana menentukan stok minimum, stok pengaman, dan jadwal peninjauan."
related:
  - "panduan-membaca-stok-harian"
  - "cara-merapikan-data-produk-dan-sku"
  - "produk-terlaris-belum-tentu-paling-untung"
  - "checklist-review-bisnis-mingguan-umkm"
ctaType: "product"
featured: false
draft: false
noindex: false
---

Stok minimum membantu pemilik usaha mengetahui **kapan sebuah barang mulai perlu diperiksa sebelum habis**. Angka ini bukan target pembelian dan bukan perintah otomatis untuk memesan. Fungsinya adalah memberi waktu untuk membuka data, memeriksa kondisi fisik, dan memilih tindakan yang sesuai.

Jika batas dibuat terlalu rendah, barang dapat habis sebelum pemasok mengirim. Jika terlalu tinggi, uang dan ruang penyimpanan tertahan pada barang yang belum tentu cepat terjual. Karena itu, stok minimum perlu dihitung dari pola yang benar-benar terjadi di usaha Anda.

## Mulai dari tiga angka yang dapat diperiksa

Siapkan tiga angka untuk satu produk atau bahan:

1. Rata-rata barang keluar per hari.
2. Waktu tunggu pemasok dari pesan sampai barang diterima.
3. Ruang pengaman untuk perubahan permintaan atau keterlambatan.

Contoh kedai fiktif menggunakan 12 bungkus bahan utama per hari. Pemasok biasanya mengirim dua hari setelah pemesanan. Tanpa ruang pengaman, kebutuhan selama menunggu adalah:

`12 bungkus x 2 hari = 24 bungkus`

Angka 24 berarti stok mulai perlu diperiksa ketika mendekati kebutuhan selama waktu tunggu. Pemilik usaha kemudian dapat menambahkan stok pengaman berdasarkan variasi yang memang pernah terjadi.

Gunakan [kalkulator reorder stok](/kalkulator/reorder-stok/) untuk mencoba angka tanpa mengubah saldo inventori. Kalkulator membantu menyusun perkiraan, sedangkan keputusan pembelian tetap memerlukan pemeriksaan manusia.

## Hitung laju keluar dari periode yang setara

Jangan memakai satu hari paling ramai sebagai rata-rata seluruh bulan. Pilih periode yang cukup mewakili kegiatan normal, lalu pisahkan hari yang memiliki kondisi khusus.

| Periode | Barang keluar | Catatan |
| --- | ---: | --- |
| Senin-Kamis | 44 unit | Operasional normal |
| Jumat | 18 unit | Jam ramai lebih panjang |
| Sabtu-Minggu | 34 unit | Ada promosi akhir pekan |

Rata-rata dapat dihitung dari total barang keluar dibagi jumlah hari, tetapi catatan per hari tetap perlu disimpan. Jika Jumat selalu lebih ramai, batas pemeriksaannya dapat berbeda dari awal minggu.

Untuk produk yang jarang terjual, gunakan periode lebih panjang. Untuk bahan yang cepat rusak, jangan hanya mengejar ketersediaan; umur simpan dan kapasitas penyimpanan perlu masuk pertimbangan.

## Ukur waktu tunggu pemasok secara nyata

Waktu tunggu bukan hanya jadwal yang dijanjikan. Catat tanggal pesan, tanggal barang diterima, jumlah yang datang, dan apakah pengiriman lengkap.

Misalnya, pemasok menyatakan pengiriman dua hari. Dalam enam pesanan terakhir, dua pengiriman tiba pada hari ketiga. Informasi ini menunjukkan bahwa batas stok perlu memberi ruang untuk keterlambatan yang memang pernah terjadi.

Periksa juga:

- hari libur dan jadwal tutup pemasok;
- jumlah minimum pemesanan;
- pengiriman parsial;
- kualitas barang saat diterima;
- alternatif pemasok yang sudah disetujui.

Jangan menambahkan stok pengaman besar hanya karena merasa khawatir. Tulis risiko yang ingin ditutup dan bukti yang mendukungnya.

## Pisahkan saldo sistem dari stok yang dapat dijual

Saldo aplikasi belum tentu sama dengan jumlah yang siap digunakan. Sebelum memakai angka untuk keputusan, pisahkan:

- stok fisik yang sudah dihitung;
- barang rusak, kedaluwarsa, atau dikarantina;
- pesanan pelanggan yang sudah dialokasikan;
- barang dalam perjalanan dari pemasok;
- koreksi yang belum disetujui.

Jika saldo sistem 40 unit tetapi lima unit rusak dan delapan sudah dialokasikan, jumlah yang dapat digunakan bukan lagi 40. Selisih seperti ini perlu ditelusuri sebelum batas stok minimum dipakai.

Baca [panduan stok harian](/blog/panduan-membaca-stok-harian/) untuk membuat urutan pemeriksaan saldo, aktivitas, dan kondisi fisik yang konsisten.

## Gunakan stok pengaman secara proporsional

Stok pengaman berguna ketika permintaan atau waktu pasok tidak selalu sama. Besarnya tidak harus rumit pada tahap awal. Gunakan catatan selisih yang pernah terjadi.

Contoh:

- kebutuhan selama waktu tunggu: 24 unit;
- tambahan permintaan pada hari ramai: 6 unit;
- keterlambatan yang masih masuk akal: 1 hari x 12 unit;
- ruang penyimpanan dan umur barang membatasi tambahan stok.

Pemilik usaha tidak harus menjumlahkan semua risiko sekaligus. Pilih risiko yang paling relevan, lalu uji apakah batas tersebut membantu tanpa membuat stok berlebih.

## Tinjau ulang setelah pola berubah

Stok minimum perlu diperbarui ketika:

- produk baru mulai mendapat permintaan;
- promosi mengubah laju penjualan;
- pemasok mengganti jadwal;
- jam buka bertambah;
- musim atau hari besar memengaruhi permintaan;
- produk mendekati akhir masa jual;
- kapasitas penyimpanan berubah.

Catat tanggal peninjauan dan alasan perubahan. Dengan begitu, tim dapat memahami mengapa batas suatu produk berbeda dari bulan sebelumnya.

Checklist sederhana:

- [ ] Laju keluar dihitung dari periode yang setara.
- [ ] Waktu tunggu memakai catatan penerimaan nyata.
- [ ] Stok fisik dan barang tidak layak jual sudah dipisahkan.
- [ ] Ruang pengaman memiliki alasan yang dapat dijelaskan.
- [ ] Batas ditinjau ketika pola usaha berubah.

Stok minimum yang baik tidak mencoba menebak masa depan dengan sempurna. Ia memberi waktu bagi manusia untuk memeriksa bukti sebelum rak kosong atau uang terlalu lama tertahan dalam persediaan.
