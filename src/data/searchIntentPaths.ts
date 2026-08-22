export type SearchIntentPath = {
  eyebrow: string;
  title: string;
  intro: string;
  questions: { title: string; text: string }[];
  links: { label: string; href: string; description: string }[];
};

// This is deliberately a reader-facing intent map, not a list of keywords.
// Each item directs readers to a page that supports the stated need.
export const searchIntentPaths: Record<string, SearchIntentPath> = {
  'product:asisten-ai': {
    eyebrow: 'Mulai dari pertanyaan yang bisa diuji',
    title: 'AI untuk bisnis perlu jawaban yang dapat diperiksa.',
    intro: 'Pertanyaan yang jelas, periode yang tepat, dan angka asal jawaban membuat AI berguna sebagai pendamping membaca data, bukan pengganti keputusan pemilik usaha.',
    questions: [
      { title: 'Apa yang bisa ditanyakan?', text: 'Mulai dari perubahan omzet, produk yang bergerak, stok yang perlu diperiksa, atau biaya yang berubah pada periode tertentu.' },
      { title: 'Bagaimana memeriksa jawabannya?', text: 'Buka periode, transaksi, atau catatan yang menjadi dasar jawaban sebelum menjadikannya tindakan.' },
    ],
    links: [
      { label: 'Menulis pertanyaan bisnis untuk AI', href: '/blog/cara-menulis-pertanyaan-bisnis-untuk-ai/', description: 'Susun pertanyaan yang sempit dan memiliki konteks.' },
      { label: 'Memeriksa data sebelum memakai AI', href: '/blog/cara-memeriksa-data-sebelum-menggunakan-ai/', description: 'Pastikan data yang dibaca cukup dan tepat.' },
      { label: 'Panduan menilai insight AI', href: '/panduan/menilai-insight-ai/', description: 'Gunakan daftar cek sebelum mengambil keputusan.' },
    ],
  },
  'product:dashboard-bisnis': {
    eyebrow: 'Dashboard yang membantu memilih prioritas',
    title: 'Baca perubahan bisnis sebelum tenggelam di grafik.',
    intro: 'Dashboard bisnis yang berguna tidak berhenti pada angka total. Ia membantu memilih perubahan yang perlu diperiksa, lalu membuka periode dan data pendukungnya.',
    questions: [
      { title: 'Metrik apa yang dipantau?', text: 'Pilih metrik yang sesuai dengan keputusan: penjualan, stok, biaya, kas, atau pola pelanggan.' },
      { title: 'Bagaimana membandingkannya?', text: 'Gunakan periode dengan hari dan jam operasi yang setara agar perubahan tidak dibaca di luar konteks.' },
    ],
    links: [
      { label: 'Membuat dashboard bisnis sederhana', href: '/blog/cara-membuat-dashboard-bisnis-sederhana/', description: 'Tentukan metrik dan urutan pemeriksaannya.' },
      { label: 'Memilih metrik bisnis UMKM', href: '/blog/cara-memilih-metrik-bisnis-untuk-umkm/', description: 'Hubungkan angka dengan keputusan yang nyata.' },
      { label: 'Solusi laporan bisnis', href: '/solusi/laporan-bisnis-otomatis/', description: 'Lihat alur ringkasan harian dan mingguan.' },
    ],
  },
  'product:katalog-produk': {
    eyebrow: 'Data produk sebagai fondasi catatan',
    title: 'SKU, satuan, harga, dan HPP perlu memakai bahasa yang sama.',
    intro: 'Katalog yang rapi membantu transaksi, stok, dan laporan membaca produk yang sama. Mulai dari informasi dasar yang benar-benar dipakai tim, lalu rawat perubahan tanpa menghapus riwayat.',
    questions: [
      { title: 'Data dasar apa yang diperlukan?', text: 'Nama produk, SKU, kategori, satuan, harga, HPP, dan status aktif membantu catatan tetap konsisten.' },
      { title: 'Bagaimana menangani produk serupa?', text: 'Samakan penamaan dan satuan lebih dulu; buat identitas yang berbeda hanya ketika tim memang perlu membedakannya.' },
    ],
    links: [
      { label: 'Merapikan data produk dan SKU', href: '/blog/cara-merapikan-data-produk-dan-sku/', description: 'Langkah awal menyatukan daftar produk.' },
      { label: 'Mengelola stok produk varian', href: '/blog/cara-mengelola-stok-produk-varian/', description: 'Menjaga perbedaan ukuran atau warna tetap terbaca.' },
      { label: 'Pelajari inventori', href: '/produk/inventori/', description: 'Lanjutkan dari data produk ke pergerakan stok.' },
    ],
  },
  'product:penjualan': {
    eyebrow: 'Membaca transaksi, bukan hanya total omzet',
    title: 'Cari produk, waktu, dan pembayaran yang membentuk perubahan.',
    intro: 'Pencatatan penjualan membantu usaha melihat transaksi yang perlu diperiksa sebelum mengubah promo, harga, atau jadwal kerja.',
    questions: [
      { title: 'Mengapa omzet berubah?', text: 'Pecah total penjualan menurut produk, waktu, dan periode pembanding sebelum menyimpulkan penyebabnya.' },
      { title: 'Apa bedanya transaksi dan kas masuk?', text: 'Nilai penjualan dan status pembayaran perlu dipisahkan agar pesanan tidak dibaca sebagai uang yang sudah diterima.' },
    ],
    links: [
      { label: 'Mencatat penjualan harian', href: '/blog/cara-mencatat-penjualan-harian/', description: 'Buat catatan transaksi yang siap dibaca kembali.' },
      { label: 'Contoh laporan penjualan harian', href: '/blog/contoh-laporan-penjualan-harian/', description: 'Pilih format omzet, pembayaran, kas, dan stok untuk toko atau UMKM.' },
      { label: 'Menghitung pertumbuhan penjualan', href: '/blog/cara-menghitung-pertumbuhan-penjualan/', description: 'Bandingkan periode dengan rumus dan konteks yang terlihat.' },
      { label: 'Membaca penjualan per jam', href: '/blog/cara-membaca-penjualan-per-jam/', description: 'Cari pola waktu tanpa mengabaikan konteks operasional.' },
      { label: 'Kalkulator target penjualan', href: '/kalkulator/target-penjualan/', description: 'Uji kebutuhan transaksi dari target omzet.' },
      { label: 'Penjualan bersih harian', href: '/kalkulator/penjualan-bersih-harian/', description: 'Pisahkan penjualan bruto dari diskon dan retur.' },
      { label: 'Penjualan per jam', href: '/kalkulator/penjualan-per-jam/', description: 'Bandingkan hasil per jam pada periode yang setara.' },
      { label: 'Konversi penjualan', href: '/kalkulator/konversi-penjualan/', description: 'Uji perubahan calon menjadi transaksi.' },
      { label: 'Capaian target omzet', href: '/kalkulator/capaian-target-omzet/', description: 'Bandingkan realisasi dengan target periode.' },
      { label: 'Arti konversi penjualan', href: '/kamus-bisnis/konversi-penjualan/', description: 'Samakan definisi tahap sebelum menghitung rasio.' },
      { label: 'Arti diskon penjualan', href: '/kamus-bisnis/diskon-penjualan/', description: 'Baca dampak potongan harga dengan konteks yang tepat.' },
    ],
  },
  'product:inventori': {
    eyebrow: 'Prioritas stok berasal dari catatan',
    title: 'Saldo, laju keluar, dan koreksi perlu dibaca bersama.',
    intro: 'Inventori yang berguna menunjukkan barang mana yang layak diperiksa lebih dulu. Keputusan pembelian tetap mempertimbangkan stok fisik, waktu pemasok, usia simpan, dan kas.',
    questions: [
      { title: 'Kapan stok perlu dicek?', text: 'Gunakan saldo terbaru, laju barang keluar, waktu isi ulang, dan catatan koreksi sebagai dasar pemeriksaan.' },
      { title: 'Bagaimana menangani selisih?', text: 'Catat penyebab dan tanggal koreksi; jangan mengganti saldo tanpa jejak yang dapat ditelusuri.' },
    ],
    links: [
      { label: 'Menghitung reorder point', href: '/blog/cara-menghitung-reorder-point/', description: 'Gunakan titik cek sebagai pemicu pemeriksaan, bukan tombol beli otomatis.' },
      { label: 'Menghitung safety stock', href: '/blog/cara-menghitung-safety-stock/', description: 'Pisahkan buffer ketidakpastian dari batas stok minimum.' },
      { label: 'Menyelidiki selisih stok', href: '/blog/penyebab-selisih-stok-dan-cara-mengeceknya/', description: 'Cocokkan stok fisik, saldo buku, dan bukti pergerakan.' },
      { label: 'Cara stok opname', href: '/blog/cara-melakukan-stok-opname/', description: 'Cocokkan catatan dengan kondisi fisik.' },
      { label: 'Kalkulator safety stock', href: '/kalkulator/safety-stock/', description: 'Uji buffer stok dengan asumsi yang terlihat.' },
      { label: 'Mengukur perputaran stok', href: '/blog/cara-mengukur-perputaran-stok/', description: 'Baca laju barang bergerak dari periode yang sama.' },
      { label: 'Arti perputaran stok', href: '/kamus-bisnis/perputaran-stok/', description: 'Samakan definisi laju stok sebelum membandingkan.' },
      { label: 'Arti stok mati', href: '/kamus-bisnis/stok-mati/', description: 'Pisahkan barang lambat bergerak dari selisih catatan.' },
      { label: 'Arti lead time', href: '/kamus-bisnis/lead-time/', description: 'Pahami waktu tunggu pemasok untuk pemeriksaan stok.' },
      { label: 'Kalkulator rasio stok mati', href: '/kalkulator/rasio-stok-mati/', description: 'Uji proporsi stok yang tidak bergerak.' },
      { label: 'Arti SKU', href: '/kamus-bisnis/sku/', description: 'Jaga identitas produk tetap konsisten.' },
      { label: 'Kalkulator saldo stok', href: '/kalkulator/saldo-stok/', description: 'Hitung saldo dari stok awal, masuk, dan keluar.' },
    ],
  },
  'product:keuangan': {
    eyebrow: 'Definisi angka harus konsisten',
    title: 'Omzet, biaya, laba, dan kas menjawab pertanyaan yang berbeda.',
    intro: 'Catatan keuangan yang mudah dibaca dimulai dari pemisahan definisi dan periode. Ringkasan ini bersifat edukatif dan tidak menggantikan nasihat akuntansi atau pajak.',
    questions: [
      { title: 'Mengapa omzet bukan laba?', text: 'Laba perlu mempertimbangkan biaya dan HPP, sedangkan omzet hanya menunjukkan nilai penjualan pada periode tertentu.' },
      { title: 'Mengapa laba bukan kas?', text: 'Pembayaran yang belum diterima dan waktu uang keluar dapat membuat kondisi kas berbeda dari laba yang tercatat.' },
    ],
    links: [
      { label: 'Omzet, laba, dan arus kas', href: '/blog/perbedaan-omzet-laba-dan-arus-kas/', description: 'Bedakan tiga angka sebelum menyimpulkan kondisi usaha.' },
      { label: 'Biaya tetap dan variabel', href: '/blog/biaya-tetap-dan-biaya-variabel/', description: 'Kelompokkan biaya toko, kuliner, dan jasa sebelum membaca HPP.' },
      { label: 'Kalkulator HPP', href: '/kalkulator/hpp/', description: 'Uji HPP dengan periode dan dasar pencatatan yang konsisten.' },
      { label: 'Laporan laba rugi sederhana', href: '/blog/laporan-laba-rugi-sederhana-umkm/', description: 'Susun komponen pendapatan, HPP, dan biaya.' },
      { label: 'Pantau laba dan arus kas', href: '/solusi/pantau-laba-dan-arus-kas/', description: 'Lihat langkah pemeriksaan yang berurutan.' },
      { label: 'Arti margin kontribusi', href: '/kamus-bisnis/margin-kontribusi/', description: 'Bedakan kontribusi per unit dari laba bersih.' },
      { label: 'Kalkulator laba kotor', href: '/kalkulator/laba-kotor/', description: 'Hitung penjualan bersih dikurangi HPP.' },
      { label: 'Arti modal kerja', href: '/kamus-bisnis/modal-kerja/', description: 'Pahami dana yang menopang kegiatan usaha.' },
      { label: 'Saldo utang supplier', href: '/kalkulator/saldo-utang-supplier/', description: 'Periksa sisa tagihan setelah pembayaran.' },
      { label: 'Menghitung modal usaha awal', href: '/blog/cara-menghitung-modal-usaha-awal/', description: 'Susun kebutuhan awal berdasarkan asumsi yang terlihat.' },
    ],
  },
  'product:pelanggan': {
    eyebrow: 'Riwayat pelanggan dengan batas privasi jelas',
    title: 'Pola pembelian membantu memahami konteks, bukan mengirim pesan otomatis.',
    intro: 'Data pelanggan dapat menunjukkan pembelian terakhir, frekuensi, dan produk yang pernah dipilih. Setiap tindak lanjut tetap memerlukan izin, kanal, dan pertimbangan manusia.',
    questions: [
      { title: 'Bagaimana mengenali pelanggan aktif?', text: 'Gunakan riwayat transaksi yang tersedia dan periode yang konsisten; jangan menyimpulkan dari satu pembelian saja.' },
      { title: 'Kapan pelanggan boleh dihubungi?', text: 'Periksa persetujuan, tujuan penggunaan data, dan kanal komunikasi sebelum tindak lanjut dilakukan.' },
    ],
    links: [
      { label: 'Menentukan pelanggan aktif dan tidak aktif', href: '/blog/cara-menentukan-pelanggan-aktif-dan-tidak-aktif/', description: 'Baca jeda pembelian secara hati-hati.' },
      { label: 'Menghitung repeat customer rate', href: '/blog/cara-menghitung-repeat-customer-rate/', description: 'Pisahkan pembelian ulang dari frekuensi transaksi.' },
      { label: 'Menghitung frekuensi pembelian', href: '/blog/cara-menghitung-frekuensi-pembelian-pelanggan/', description: 'Hitung transaksi per pelanggan unik dengan cakupan yang jelas.' },
      { label: 'Frekuensi pembelian pelanggan', href: '/kamus-bisnis/frekuensi-pembelian/', description: 'Samakan definisi transaksi, pelanggan unik, dan periode.' },
      { label: 'Meminta izin kontak pelanggan', href: '/blog/cara-meminta-izin-kontak-pelanggan/', description: 'Gunakan dasar persetujuan yang jelas.' },
      { label: 'Mencatat keluhan pelanggan', href: '/blog/cara-mencatat-keluhan-pelanggan/', description: 'Pisahkan pencatatan masalah dari proses penanganannya.' },
      { label: 'Arti segmentasi pelanggan', href: '/kamus-bisnis/segmentasi-pelanggan/', description: 'Buat kelompok sederhana dari riwayat yang tersedia.' },
    ],
  },
  'product:laporan-insight': {
    eyebrow: 'Rapat dimulai dari perubahan yang jelas',
    title: 'Laporan yang baik menyatukan periode, rumus, dan tindak lanjut.',
    intro: 'Ringkasan harian atau mingguan membantu tim membahas perubahan utama tanpa merakit angka dari awal. Sumber dan definisi metrik tetap harus dapat dibuka.',
    questions: [
      { title: 'Apa yang masuk laporan bisnis?', text: 'Pilih angka yang membantu keputusan berulang, lalu jelaskan periode, rumus, dan pemilik tindak lanjutnya.' },
      { title: 'Bagaimana menghindari perdebatan angka?', text: 'Gunakan sumber dan batas waktu yang sama sebelum membandingkan hasil antarperiode.' },
    ],
    links: [
      { label: 'Membuat laporan bisnis bulanan', href: '/blog/cara-membuat-laporan-bisnis-bulanan/', description: 'Susun ringkasan yang dapat dipakai untuk evaluasi.' },
      { label: 'Checklist review bisnis mingguan', href: '/blog/checklist-review-bisnis-mingguan-umkm/', description: 'Buat urutan pemeriksaan yang berulang.' },
      { label: 'Solusi laporan bisnis', href: '/solusi/laporan-bisnis-otomatis/', description: 'Lihat alur ringkasan lintas modul.' },
    ],
  },
  'product:integrasi': {
    eyebrow: 'Data masuk melalui jalur yang jelas',
    title: 'Mulai dari sumber data yang siap dipetakan dan diperiksa.',
    intro: 'Integrasi data usaha perlu menjelaskan metode masuk, pemetaan kolom, waktu pembaruan, dan catatan gagal. Jangan menganggap data sudah siap dipakai sebelum hasilnya diperiksa.',
    questions: [
      { title: 'Bagaimana menyiapkan impor data?', text: 'Samakan kolom, format tanggal, satuan, dan identitas produk sebelum menjalankan impor.' },
      { title: 'Apa yang dilakukan jika data gagal?', text: 'Baca baris dan alasan gagal, perbaiki sumbernya, lalu impor ulang dengan catatan waktu pembaruan yang jelas.' },
    ],
    links: [
      { label: 'Merapikan data produk dan SKU', href: '/blog/cara-merapikan-data-produk-dan-sku/', description: 'Kurangi duplikasi sebelum memindahkan data.' },
      { label: 'Kelola dokumen usaha', href: '/blog/cara-mengelola-dokumen-usaha/', description: 'Jaga sumber catatan mudah ditemukan kembali.' },
      { label: 'Catatan manual dan aplikasi', href: '/blog/perbandingan-catatan-manual-dan-aplikasi-usaha/', description: 'Bandingkan alur kerja sebelum memilih cara pencatatan.' },
      { label: 'Semua produk RAMUNI', href: '/produk/', description: 'Pilih alur yang akan memakai data tersebut.' },
    ],
  },
  'solution:naikkan-omzet': {
    eyebrow: 'Saat omzet berubah',
    title: 'Telusuri penyebab sebelum memilih promosi.',
    intro: 'Perubahan omzet dapat berasal dari produk, waktu, stok, atau pola pelanggan. Membuka salah satu penyebab lebih dulu membantu tim memilih pemeriksaan yang masuk akal.',
    questions: [
      { title: 'Apa yang perlu dibandingkan?', text: 'Gunakan periode dengan hari dan jam operasi yang setara, lalu pecah hasilnya per produk atau waktu.' },
      { title: 'Kapan stok perlu ikut dibaca?', text: 'Periksa waktu stok kosong ketika produk yang dicari tidak tersedia, karena penjualan yang hilang tidak selalu muncul sebagai transaksi.' },
    ],
    links: [
      { label: 'Mengatasi omzet turun', href: '/blog/cara-mengatasi-omzet-turun/', description: 'Mulai dari pemeriksaan yang dapat dibuktikan.' },
      { label: 'Membaca penjualan per produk', href: '/blog/cara-membaca-penjualan-per-produk/', description: 'Cari pendorong perubahan di balik angka total.' },
      { label: 'Pelajari Penjualan', href: '/produk/penjualan/', description: 'Buka alur transaksi dan perbandingan periode.' },
    ],
  },
  'solution:kelola-stok': {
    eyebrow: 'Saat stok menjadi prioritas',
    title: 'Bedakan barang yang menipis, lambat bergerak, dan berbeda catatan.',
    intro: 'Saldo yang sama tidak selalu memiliki risiko yang sama. Baca kebutuhan bersama laju keluar, waktu pemasok, kondisi fisik, dan alasan koreksi sebelum memesan.',
    questions: [
      { title: 'Apa bedanya stok minimum dan safety stock?', text: 'Keduanya adalah batas untuk membantu pemeriksaan, tetapi perlu disusun dari konteks pemakaian, waktu tunggu, dan risiko produk.' },
      { title: 'Bagaimana mengurangi stok mati?', text: 'Bedakan barang lambat dengan barang yang salah tercatat, lalu uji langkah kecil berdasarkan usia, permintaan, dan kas.' },
    ],
    links: [
      { label: 'Safety stock untuk usaha kecil', href: '/blog/cara-menghitung-safety-stock/', description: 'Tentukan buffer dari ketidakpastian yang dapat diamati.' },
      { label: 'Mengurangi stok mati', href: '/blog/cara-mengurangi-stok-mati/', description: 'Baca stok lama sebelum menambah pembelian.' },
      { label: 'Pelajari Inventori', href: '/produk/inventori/', description: 'Buka alur saldo, mutasi, dan koreksi.' },
    ],
  },
  'solution:pantau-laba-dan-arus-kas': {
    eyebrow: 'Saat uang terasa tidak sejalan dengan omzet',
    title: 'Tentukan angka mana yang berubah sebelum mengambil keputusan keuangan.',
    intro: 'Usaha perlu melihat penjualan, biaya, laba, piutang, dan kas dengan definisi serta periode yang konsisten. Contoh ini bersifat edukatif dan bukan nasihat keuangan pribadi.',
    questions: [
      { title: 'Apa yang diperiksa ketika kas menipis?', text: 'Pisahkan transaksi yang sudah dibayar, biaya yang jatuh tempo, dan pengeluaran besar pada periode yang sama.' },
      { title: 'Bagaimana membaca margin?', text: 'Gunakan HPP dan harga jual yang sama-sama terbarui, lalu lihat perubahan per produk atau kategori.' },
    ],
    links: [
      { label: 'Membaca arus kas UMKM', href: '/blog/arus-kas-umkm-ringan/', description: 'Mulai dari uang yang benar-benar masuk dan keluar.' },
      { label: 'Menghitung margin laba kotor', href: '/blog/cara-menghitung-margin-laba-kotor/', description: 'Baca margin dengan rumus dan asumsi yang jelas.' },
      { label: 'Pelajari Keuangan', href: '/produk/keuangan/', description: 'Buka alur pencatatan dan pemeriksaan angka.' },
    ],
  },
  'solution:pahami-pelanggan': {
    eyebrow: 'Saat riwayat pelanggan tersebar',
    title: 'Kenali pola pembelian tanpa mengabaikan izin dan konteks.',
    intro: 'Riwayat pelanggan membantu menyiapkan percakapan atau layanan yang lebih relevan. Ia bukan izin untuk menghubungi semua orang atau menebak kebutuhan mereka.',
    questions: [
      { title: 'Bagaimana mengelompokkan pelanggan?', text: 'Gunakan pola yang sederhana dan dapat dijelaskan, seperti pembelian terakhir, frekuensi, atau produk yang pernah dipilih.' },
      { title: 'Bagaimana menangani komplain?', text: 'Catat konteks, tindak lanjut, dan pola masalah tanpa menyebarkan data pelanggan lebih dari yang diperlukan.' },
    ],
    links: [
      { label: 'Mengelompokkan pelanggan sederhana', href: '/blog/cara-mengelompokkan-pelanggan-sederhana/', description: 'Mulai dari riwayat yang memang tersedia.' },
      { label: 'Menangani pelanggan komplain', href: '/blog/cara-menangani-pelanggan-komplain/', description: 'Jadikan keluhan sebagai catatan perbaikan layanan.' },
      { label: 'Pelajari Pelanggan', href: '/produk/pelanggan/', description: 'Baca batas data dan alur kerja pelanggan.' },
    ],
  },
  'solution:laporan-bisnis-otomatis': {
    eyebrow: 'Saat laporan masih dirakit manual',
    title: 'Jadikan ringkasan sebagai awal diskusi, bukan akhir pekerjaan.',
    intro: 'Laporan rutin membantu tim melihat perubahan, sumber angka, dan tindak lanjut dalam satu alur. Otomatisasi yang baik tetap membutuhkan definisi metrik yang disepakati.',
    questions: [
      { title: 'Bagaimana memilih laporan mingguan?', text: 'Fokus pada beberapa perubahan yang bisa ditindaklanjuti, bukan semua angka yang tersedia.' },
      { title: 'Siapa yang menindaklanjuti?', text: 'Setiap temuan perlu memiliki pemilik, batas waktu pemeriksaan, dan sumber angka yang dapat dibuka kembali.' },
    ],
    links: [
      { label: 'Checklist review bisnis mingguan', href: '/blog/checklist-review-bisnis-mingguan-umkm/', description: 'Buat urutan evaluasi yang dapat diulang.' },
      { label: 'Contoh laporan penjualan harian', href: '/blog/contoh-laporan-penjualan-harian/', description: 'Lihat isi ringkasan sebelum menentukan formatnya.' },
      { label: 'Laporan bisnis bulanan', href: '/blog/cara-membuat-laporan-bisnis-bulanan/', description: 'Hubungkan ringkasan harian dengan evaluasi periode.' },
      { label: 'Pelajari Laporan & Insight', href: '/produk/laporan-insight/', description: 'Buka cara ringkasan dibentuk dari catatan.' },
    ],
  },
};
