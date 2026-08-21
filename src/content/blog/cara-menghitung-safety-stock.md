---
title: "Cara Menghitung Safety Stock untuk Usaha Kecil"
description: "Cara menghitung safety stock: pilih produk prioritas, catat pemakaian dan lead time, buat buffer dari variasi nyata, lalu tinjau risiko stok kosong."
dek: "Safety stock adalah cadangan untuk ketidakpastian, bukan target untuk menimbun semua barang. Gunakan data pemakaian, waktu tunggu, usia simpan, dan kas agar buffer tetap masuk akal."
cover: "/website-original/blog/generated/cara-menghitung-safety-stock.webp"
coverAlt: "Pemilik usaha menempatkan cadangan kotak produk di stok belakang dengan kartu permintaan abstrak, kalender pengiriman, dan checklist"
coverWidth: 640
coverHeight: 360
publishedAt: 2026-08-09
updatedAt: 2026-08-21
category: "Operasional Usaha"
categorySlug: "operasional-usaha"
tags:
  - "Safety Stock"
  - "Stok Pengaman"
  - "Persediaan Usaha"
authorName: "Bima Ardiansyah"
authorSlug: "bima-ardiansyah"
reviewerName: "Tim Peninjau RAMUNI"
reviewerSlug: "tim-peninjau-ramuni"
reviewedAt: 2026-08-21
reviewStatus: "reviewed"
editorialStatus: "Ditinjau untuk intent panduan safety stock, rumus, sumber, metadata, tautan internal, dan calculator bridge."
readingTime: "14 menit"
takeaways:
  - "Safety stock adalah buffer untuk variasi pemakaian atau waktu tunggu, bukan jumlah tetap yang cocok untuk semua produk."
  - "Mulailah dari produk penting dengan data pemakaian dan lead time yang cukup, lalu pilih buffer yang dapat dijelaskan."
  - "Tinjau kembali buffer saat permintaan, pemasok, harga, kapasitas simpan, atau risiko barang rusak berubah."
  - "Pisahkan buffer dari kebutuhan normal selama lead time dan gunakan titik reorder sebagai pemicu pemeriksaan, bukan pembelian otomatis."
faqs:
  - question: "Apa itu safety stock?"
    answer: "Safety stock adalah persediaan cadangan yang ditahan untuk membantu menghadapi ketidakpastian pemakaian atau keterlambatan pengadaan. Ia berbeda dari stok untuk kebutuhan normal selama waktu tunggu."
  - question: "Apakah semua produk perlu safety stock?"
    answer: "Tidak selalu. Prioritaskan produk yang penting, cepat bergerak, sulit diganti, atau memiliki waktu tunggu tidak pasti. Produk lambat, mahal, mudah rusak, atau mudah didapat mungkin memerlukan pendekatan berbeda."
  - question: "Bagaimana jika data pemakaian belum lengkap?"
    answer: "Mulai dari catatan sederhana beberapa periode, gunakan buffer kecil yang dapat dipantau, dan hindari pembelian besar hanya dari dugaan. Catat stok kosong, sisa, serta waktu pengadaan untuk memperbaiki angka berikutnya."
sources:
  - title: "PSAK 14 Persediaan"
    publisher: "Ikatan Akuntan Indonesia"
    url: "https://web.iaiglobal.or.id/SAK-IAI/Standar%20Akuntansi%20Keuangan/PSAK%2014%20Persediaan#gsc.tab=0"
    accessedAt: 2026-08-09
    note: "Rujukan umum mengenai persediaan. Artikel ini memberi contoh operasional sederhana, bukan metode akuntansi atau prediksi permintaan."
  - title: "SAK EMKM"
    publisher: "Ikatan Akuntan Indonesia"
    url: "https://web.iaiglobal.or.id/SAK-IAI/Tentang%20SAK%20EMKM#gsc.tab=0"
    accessedAt: 2026-08-09
    note: "Rujukan umum untuk pencatatan usaha. Sesuaikan keputusan pembelian dengan kas serta kondisi usaha."
disclaimer: "Artikel ini bersifat edukatif. Safety stock tidak menjamin ketersediaan barang dan tidak menggantikan pemeriksaan pemasok, mutu, usia simpan, kapasitas penyimpanan, serta arus kas."
updateSummary: "Memperkuat panduan safety stock sebagai halaman rumus dan proses, dengan link dua arah ke kamus, perbandingan, kalkulator, dan reorder point."
related:
  - "cara-menghitung-reorder-point"
  - "perbedaan-stok-minimum-dan-safety-stock"
  - "cara-menentukan-stok-minimum-umkm"
  - "apa-itu-lead-time-stok"
  - "cara-mencatat-stok-masuk-dan-keluar"
ctaType: "product"
featured: false
draft: false
noindex: false
---

Safety stock atau stok pengaman adalah cadangan yang disimpan untuk menghadapi ketidakpastian. Ketidakpastian bisa datang dari pemakaian yang lebih tinggi dari biasanya, pengiriman pemasok yang terlambat, atau selisih kecil pada catatan stok. Ia bukan alasan untuk menumpuk semua barang sebanyak mungkin. Cadangan yang terlalu besar mengikat kas, memenuhi ruang, dan meningkatkan risiko barang usang atau rusak.

Untuk definisi singkat, buka [kamus stok pengaman](/kamus-bisnis/stok-pengaman/). Gunakan artikel ini untuk rumus dan proses, lalu bandingkan hasilnya dengan [stok minimum versus safety stock](/blog/perbedaan-stok-minimum-dan-safety-stock/) serta [kalkulator safety stock](/kalkulator/safety-stock/) sebelum memasukkannya ke keputusan reorder.

Untuk usaha kecil, cara terbaik memulai adalah memakai data sederhana yang sudah tersedia: pemakaian atau penjualan per periode, waktu tunggu pemasok, stok kosong yang pernah terjadi, serta kapasitas penyimpanan. Pilih beberapa produk yang paling penting, buat buffer yang dapat dijelaskan, lalu tinjau hasilnya. Angka akan membaik seiring catatan menjadi lebih konsisten.

## Pilih produk yang memang layak diberi buffer

Tidak semua barang memerlukan safety stock yang sama. Produk inti yang cepat bergerak dan sulit diganti saat kosong biasanya lebih prioritas dibanding barang lambat yang mudah dibeli kembali. Periksa juga usia simpan dan biaya. Barang segar atau mahal bisa berisiko bila cadangannya terlalu besar, meski permintaannya cukup stabil.

| Faktor | Pertanyaan untuk memilih prioritas |
| --- | --- |
| Dampak stok kosong | Apakah penjualan atau layanan berhenti jika produk tidak ada? |
| Pemakaian | Apakah produk bergerak cukup sering dan dapat dicatat? |
| Lead time | Apakah pemasok membutuhkan waktu lama atau sering berubah? |
| Pengganti | Apakah ada alternatif yang benar-benar sesuai? |
| Usia simpan | Apakah tambahan stok berisiko rusak atau turun mutu? |
| Nilai dan kas | Berapa modal yang tertahan bila buffer ditambah? |

Mulailah dengan dua atau tiga produk, bukan semua SKU. Fokus ini membuat usaha mampu memeriksa data dan akibat dari buffer. Produk yang tidak layak diberi cadangan besar tetap perlu dicatat, tetapi mungkin lebih cocok dipesan lebih sering atau dikelola dengan batas stok berbeda.

## Catat pemakaian dan waktu tunggu yang nyata

Pemakaian dapat dihitung dari unit terjual, bahan yang dipakai menurut resep, atau barang keluar dari stok. Gunakan satuan yang sama dengan pembelian dan pemakaian. Jika barang datang per dus tetapi dipakai per unit, tulis konversinya. Catat pula kapan pesanan dibuat dan kapan barang benar-benar siap dipakai, bukan hanya kapan pemasok mengirim pesan konfirmasi.

| Data | Contoh | Mengapa penting |
| --- | --- | --- |
| Pemakaian harian | 8 sampai 12 unit | Menunjukkan variasi kebutuhan |
| Pemakaian rata-rata | 10 unit | Dasar kebutuhan normal |
| Pemakaian tertinggi | 12 unit | Bahan untuk buffer sederhana |
| Lead time biasa | 3 hari | Menentukan stok untuk masa tunggu |
| Lead time terpanjang yang tercatat | 5 hari | Menunjukkan risiko keterlambatan |
| Saldo layak pakai | 40 unit | Menghindari keputusan dari angka stok yang tidak siap jual |

Artikel [apa itu lead time stok](/blog/apa-itu-lead-time-stok/) menjelaskan mengapa waktu dari pesan hingga barang benar-benar siap dipakai perlu dicatat. Jika catatan belum lengkap, jangan berpura-pura memiliki angka presisi. Gunakan rentang sederhana, lalu tambahkan pengamatan setiap kali terjadi keterlambatan atau lonjakan pemakaian.

## Gunakan cara hitung sederhana sebagai titik awal

Salah satu pendekatan mudah untuk produk yang memiliki data cukup adalah membandingkan kebutuhan kondisi tinggi dengan kebutuhan kondisi biasa. Rumus contoh berikut bukan satu-satunya metode dan perlu diuji pada kondisi usaha:

`safety stock = (pemakaian tertinggi x lead time terpanjang) - (pemakaian rata-rata x lead time rata-rata)`

Misalnya, produk A memiliki pemakaian tertinggi 12 unit per hari, lead time terpanjang 5 hari, pemakaian rata-rata 10 unit per hari, dan lead time rata-rata 3 hari. Buffer contoh adalah 12 x 5 dikurangi 10 x 3, yaitu 30 unit. Angka tersebut menjelaskan cadangan untuk selisih keadaan tinggi dengan keadaan normal, bukan kebutuhan total selama masa tunggu.

| Komponen | Nilai contoh |
| --- | ---: |
| Pemakaian tertinggi | 12 unit per hari |
| Lead time terpanjang | 5 hari |
| Kebutuhan kondisi tinggi | 60 unit |
| Pemakaian rata-rata | 10 unit per hari |
| Lead time rata-rata | 3 hari |
| Kebutuhan normal | 30 unit |
| Safety stock contoh | 30 unit |

Jangan menggunakan rumus tanpa pemeriksaan. Bila produk mudah rusak, buffer 30 unit mungkin terlalu berisiko. Bila catatan tertinggi berasal dari satu promo yang tidak akan diulang, angka juga dapat terlalu besar. Gunakan hasil sebagai hipotesis, lalu lihat stok kosong, sisa, dan kas pada beberapa siklus pesanan.

## Hubungkan buffer dengan reorder point

Safety stock berbeda dari reorder point. Reorder point adalah titik saat usaha perlu mengecek atau membuat pesanan agar stok yang tersedia dapat menutup kebutuhan selama lead time ditambah buffer. Dalam bentuk sederhana:

`reorder point = kebutuhan rata-rata selama lead time + safety stock`

Pada contoh sebelumnya, kebutuhan normal selama tiga hari adalah 30 unit. Jika buffer 30 unit digunakan, reorder point contoh menjadi 60 unit. Artinya, saat stok layak pakai mendekati 60 unit, usaha perlu melihat pesanan dalam perjalanan, permintaan terbaru, dan kapasitas kas sebelum memutuskan pembelian. Artikel [cara menghitung reorder point](/blog/cara-menghitung-reorder-point/) membahas urutan pemeriksaan tersebut.

Jangan otomatis membeli sampai jumlah maksimum hanya karena stok mencapai reorder point. Periksa stok yang masih dalam perjalanan, produk pengganti, promo, perubahan menu, dan saldo nyata. Reorder point adalah pemicu keputusan, bukan tombol pembelian otomatis.

## Uji dan tinjau buffer secara berkala

Catat setiap kejadian yang menunjukkan buffer terlalu kecil atau terlalu besar. Jika stok masih kosong sebelum pesanan datang, lihat apakah pemakaian naik, lead time berubah, atau catatan stok salah. Jika cadangan sering tersisa dan mendekati usia simpan, lihat apakah buffer, frekuensi pesan, atau asumsi permintaan perlu dikurangi.

| Temuan | Kemungkinan tindak lanjut |
| --- | --- |
| Stok kosong berulang meski ada buffer | Periksa lead time, stok dalam perjalanan, dan pencatatan pemakaian |
| Cadangan selalu tersisa | Kurangi buffer bertahap atau pesan lebih sering |
| Barang rusak dalam buffer | Ubah batas, rotasi, atau cara simpan |
| Pemasok makin tidak pasti | Tambah pemeriksaan atau cari alternatif sesuai kebutuhan |
| Kas tertekan | Prioritaskan produk paling penting dan batas belanja |

Artikel [cara mencatat stok masuk dan keluar](/blog/cara-mencatat-stok-masuk-dan-keluar/) memberi dasar agar saldo dan alasan penyesuaian dapat ditelusuri. Tanpa catatan penerimaan, pemakaian, rusak, dan koreksi, safety stock hanya akan menjadi angka di atas perkiraan yang tidak pernah diuji.

Saat stok mencapai titik cek, buat keputusan dengan catatan singkat: saldo saat ini, pesanan yang masih datang, pemakaian beberapa hari terakhir, kondisi pemasok, serta alasan jumlah yang dipilih. Jika ternyata pembelian dikurangi karena kas terbatas atau barang mendekati usia simpan, tulis alasan tersebut. Catatan keputusan membantu usaha mengevaluasi apakah masalah berikutnya berasal dari buffer, keterlambatan pemasok, atau batas pembelian yang memang dipilih dengan sadar.

Kesalahan umum adalah memakai satu buffer untuk semua barang, memakai angka tertinggi tanpa konteks, menambah cadangan tanpa memeriksa usia simpan, serta menganggap safety stock menghapus risiko stok kosong. Buffer yang baik justru membantu usaha melihat risiko dengan lebih jelas. Mulai dari produk penting, data sederhana, dan perubahan kecil yang bisa ditinjau setelah setiap siklus pembelian.

## Audit lead time dari pesanan sampai barang siap dipakai

Lead time bukan hanya waktu kurir. Untuk sebagian usaha, waktunya dimulai ketika pesanan disetujui dan berakhir saat barang diterima, diperiksa, serta benar-benar dapat dipakai atau dijual. Jika barang harus melalui pemeriksaan mutu, pengemasan ulang, atau proses produksi, masukkan tahap itu ke catatan. Mengabaikannya membuat safety stock terlalu kecil walau pemasok tampak tepat waktu.

Simpan setidaknya tanggal pesanan dibuat, disetujui, dikirim, diterima, dan siap pakai. Bila data belum lengkap, mulai dari dua tanggal yang paling mungkin dicatat: pesanan dibuat dan barang siap pakai. Periksa beberapa siklus pesanan, bukan hanya satu pengiriman yang kebetulan cepat atau lambat.

| Tahap | Tanggal contoh | Pertanyaan |
| --- | --- | --- |
| Pesanan dibuat | 1 Agustus | Apakah jumlah dan SKU sudah benar? |
| Pemasok mengonfirmasi | 1 Agustus | Adakah perubahan ketersediaan atau harga? |
| Barang tiba | 4 Agustus | Apakah jumlah dan kondisi sesuai? |
| Barang siap pakai | 5 Agustus | Adakah pemeriksaan atau pengemasan yang menunda penggunaan? |
| Lead time kerja | 4 hari | Dasar untuk melihat kebutuhan selama menunggu |

Catat pula penyebab keterlambatan bila diketahui: pemasok kehabisan stok, pembayaran tertunda, alamat keliru, pemeriksaan mutu, atau hari libur. Jangan langsung menaikkan buffer untuk masalah proses internal yang sebenarnya dapat diperbaiki. Safety stock sebaiknya melindungi variasi yang masih masuk akal, bukan menjadi penutup bagi kesalahan berulang yang tidak ditangani.

## Gunakan kalkulator sebagai titik uji, lalu cek batas fisik dan kas

Kalkulator safety stock di artikel ini menggunakan perbandingan kebutuhan kondisi tinggi dengan kebutuhan kondisi rata-rata. Masukkan pemakaian tertinggi, lead time terpanjang, pemakaian rata-rata, dan lead time rata-rata dari produk serta periode yang sama. Hitungan dibulatkan ke atas ke unit penuh dan tidak menyimpan input Anda.

Misalnya pemakaian tertinggi 12 unit per hari selama lead time terpanjang lima hari, sedangkan rata-rata 10 unit per hari selama tiga hari. Kebutuhan kondisi tinggi adalah 60 unit dan kebutuhan normal 30 unit, sehingga buffer awal 30 unit. Angka itu hanyalah hipotesis operasional. Sebelum dipakai, cek empat batas: umur simpan, ruang, kas, dan risiko salah catat.

| Batas pemeriksaan | Pertanyaan yang perlu dijawab |
| --- | --- |
| Umur simpan | Apakah 30 unit tambahan masih dapat dipakai atau dijual sebelum turun mutu? |
| Ruang simpan | Apakah lokasi penyimpanan tetap aman, mudah dihitung, dan tidak mengganggu rotasi? |
| Kas | Apakah modal yang tertahan menghambat pembelian SKU yang lebih penting? |
| Akurasi saldo | Apakah stok sistem sudah cocok dengan saldo fisik serta pesanan dalam perjalanan? |

Jika satu batas tidak terpenuhi, jangan sekadar mengabaikan hasil. Pilih tindakan yang menjawab masalahnya. Untuk barang cepat rusak, mungkin buffer lebih kecil dan frekuensi pesan lebih tinggi lebih aman. Untuk kas terbatas, prioritaskan SKU yang paling kritis. Untuk saldo yang sering selisih, perbaiki catatan penerimaan dan pengeluaran sebelum memperbesar pembelian.

## Perlakukan usia stok dan rotasi sebagai bagian dari keputusan

Buffer yang aman untuk produk tahan lama belum tentu aman untuk bahan segar atau produk dengan tanggal kedaluwarsa. Safety stock harus dibaca bersama usia simpan, kondisi gudang, dan cara rotasi. Catatan stok tanpa tanggal penerimaan membuat usaha sulit melihat apakah cadangan benar-benar bisa dipakai.

Gunakan penanda sederhana: tanggal diterima, tanggal kedaluwarsa jika ada, lokasi, dan jumlah layak pakai. Terapkan rotasi sesuai sifat barang, misalnya barang yang lebih dahulu diterima atau lebih cepat kedaluwarsa dipakai lebih dahulu bila proses usaha memang memungkinkannya. Jangan menyimpan buffer di tempat tersembunyi sampai tim lupa bahwa ia ada.

| Sinyal | Risiko | Tindakan awal |
| --- | --- | --- |
| Buffer sering mendekati kedaluwarsa | Modal berubah menjadi waste | Kurangi buffer atau pecah pesanan menjadi lebih sering |
| Barang baru dipakai lebih dulu | Stok lama tertinggal | Perjelas lokasi, label, dan urutan pengambilan |
| Stok fisik tidak sesuai sistem | Buffer semu | Lakukan hitung fisik pada SKU prioritas |
| Stok kosong padahal catatan cukup | Barang rusak, tertahan, atau salah lokasi | Periksa status layak pakai dan barang dalam proses |

Artikel [cara mencatat stok rusak](/blog/cara-mencatat-stok-rusak/) dapat membantu membedakan saldo yang ada secara angka dengan stok yang benar-benar layak dipakai. Buffer bukan hanya jumlah; ia harus dapat ditemukan, dihitung, dan digunakan pada saat dibutuhkan.

## Buat keputusan pesanan dengan aturan pemeriksaan yang singkat

Saat saldo mendekati titik reorder, jangan otomatis menekan tombol beli. Jadikan titik itu pemicu pemeriksaan cepat. Periksa saldo layak pakai, pesanan yang sudah berjalan, pemakaian terbaru, kondisi pemasok, umur stok, dan kas. Aturan ini mengurangi pembelian ganda ketika pesanan sudah dalam perjalanan atau pembelian berlebih ketika permintaan turun.

Contoh catatan keputusan satu baris: “SKU A, saldo layak pakai 58 unit, titik reorder 60, pesanan 40 unit tiba dua hari lagi, pemakaian tiga hari terakhir 9-11 unit, tidak pesan tambahan; cek lagi besok.” Catatan ini jauh lebih berguna daripada status “stok aman” karena alasan keputusan dapat ditinjau bila terjadi masalah.

Jika memilih memesan, catat jumlah, alasan, tanggal perkiraan tiba, dan siapa yang menindaklanjuti. Jika memilih menunda, catat juga alasannya. Keterbukaan ini membantu usaha melihat apakah stok kosong terjadi karena rumus buffer, keterlambatan pemasok, keputusan kas, atau kesalahan eksekusi.

## Checklist safety stock sebelum disahkan

- [ ] SKU dipilih karena dampak stok kosong, bukan hanya karena mudah dihitung.
- [ ] Pemakaian dan lead time menggunakan produk, satuan, serta periode yang sama.
- [ ] Kebutuhan normal selama lead time dipisahkan dari buffer risiko.
- [ ] Lead time diukur sampai barang benar-benar siap dipakai.
- [ ] Buffer diuji terhadap usia simpan, ruang, kas, dan akurasi stok fisik.
- [ ] Pesanan dalam perjalanan diperiksa sebelum pembelian baru dibuat.
- [ ] Alasan setiap perubahan buffer atau jumlah pesan dicatat.
- [ ] Hasil ditinjau setelah beberapa siklus, termasuk stok kosong, sisa, serta waste.

Safety stock yang baik bukan cadangan sebesar-besarnya. Ia adalah buffer yang cukup jelas alasannya, masih dapat digunakan, dan ditinjau saat kondisi usaha berubah. Gunakan [kalkulator reorder stok](/kalkulator/reorder-stok/) bersama [panduan stok harian](/panduan/membaca-stok-harian/) untuk memeriksa angka dan saldo yang dipakai. Setelah beberapa siklus, perbarui satu asumsi saja berdasarkan stok kosong, sisa, lead time, atau waste yang benar-benar tercatat.
