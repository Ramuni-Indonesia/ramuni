export interface ProductNarrative {
  problemHeading: string;
  exampleLabel: string;
  exampleHeading: string;
  exampleRows: [string, string][];
  featureHeading: string;
  workflowHeading: string;
  workflow: [string, string][];
  roleHeading: string;
  industryHeading: string;
  closing: string;
}

export const productNarratives: Record<string, ProductNarrative> = {
  'asisten-ai': {
    problemHeading: 'Pertanyaan sederhana sering berakhir di lima catatan berbeda.',
    exampleLabel: 'Contoh jawaban',
    exampleHeading: 'Mulai dari jawaban, lalu buka angka asalnya.',
    exampleRows: [['Periode', 'Hari ini dibanding tujuh hari terakhir'], ['Dasar jawaban', 'Penjualan dan saldo stok yang sudah masuk'], ['Tindakan hari ini', 'Cek stok fisik sebelum jam ramai']],
    featureHeading: 'Tanya dengan bahasa sehari-hari. Tetap tahu dasar jawabannya.',
    workflowHeading: 'Pertanyaan masuk. Angka asal tetap terlihat.',
    workflow: [['Tanya', 'Tuliskan hal yang ingin Anda pahami.'], ['Pilih data', 'RAMUNI memakai periode dan catatan yang sedang dibuka.'], ['Baca jawaban', 'Temuan utama muncul tanpa tabel panjang.'], ['Buka dasar', 'Telusuri transaksi atau angka yang membentuk jawaban.']],
    roleHeading: 'Jawaban mengikuti pekerjaan orang yang bertanya.',
    industryHeading: 'Istilah dan pertanyaan mengikuti cara usaha berjalan.',
    closing: 'Mulai dengan satu pertanyaan yang sering menghabiskan waktu Anda.',
  },
  'dashboard-bisnis': {
    problemHeading: 'Dashboard ramai belum tentu membantu memilih prioritas.',
    exampleLabel: 'Contoh ringkasan pagi',
    exampleHeading: 'Tiga perubahan penting tampil sebelum grafik lengkap.',
    exampleRows: [['Waktu data', 'Diperbarui pukul 08.15'], ['Sorotan', 'Stok produk laris dan biaya operasional'], ['Tindakan hari ini', 'Buka dua perubahan terbesar']],
    featureHeading: 'Ringkasan pagi yang langsung menunjukkan apa yang berubah.',
    workflowHeading: 'Dari ringkasan ke angka, tanpa kehilangan jejak.',
    workflow: [['Buka', 'Lihat perubahan utama saat hari dimulai.'], ['Bandingkan', 'Pilih rentang waktu yang setara.'], ['Telusuri', 'Buka metrik dan transaksi pendukung.'], ['Tandai', 'Pilih hal yang perlu dibahas bersama tim.']],
    roleHeading: 'Setiap peran melihat ringkasan yang memang dibutuhkan.',
    industryHeading: 'Sinyal utama berbeda untuk tiap ritme usaha.',
    closing: 'Lihat contoh ringkasan yang tidak memaksa Anda membaca semua angka.',
  },
  'katalog-produk': {
    problemHeading: 'Nama, satuan, dan harga yang tidak seragam merusak laporan berikutnya.',
    exampleLabel: 'Contoh daftar produk',
    exampleHeading: 'Satu produk, satu identitas yang dipakai seluruh tim.',
    exampleRows: [['Produk', 'Nama, SKU, kategori, dan unit'], ['Nilai dasar', 'Harga jual dan HPP yang diketahui'], ['Tindakan hari ini', 'Arsipkan duplikat dan samakan satuan']],
    featureHeading: 'Rapikan data produk sebelum dipakai di transaksi.',
    workflowHeading: 'Bersihkan daftar sekali, pakai dengan cara yang sama.',
    workflow: [['Kumpulkan', 'Satukan nama produk yang masih tersebar.'], ['Samakan', 'Tentukan SKU, kategori, dan unit.'], ['Lengkapi', 'Isi harga, HPP, dan batas stok.'], ['Rawat', 'Arsipkan produk lama tanpa menghapus riwayat.']],
    roleHeading: 'Pemilik menetapkan aturan. Admin menjaga daftarnya tetap rapi.',
    industryHeading: 'Struktur katalog mengikuti barang yang benar-benar dijual.',
    closing: 'Lihat bagaimana daftar produk yang rapi memudahkan pekerjaan berikutnya.',
  },
  penjualan: {
    problemHeading: 'Omzet berubah, tetapi produk dan waktu penyebabnya belum terlihat.',
    exampleLabel: 'Contoh ringkasan penjualan',
    exampleHeading: 'Lihat apa yang terjual, kapan, dan lewat transaksi mana.',
    exampleRows: [['Perbandingan', 'Hari kerja minggu ini dan minggu lalu'], ['Pendorong', 'Produk serta jam dengan perubahan terbesar'], ['Tindakan hari ini', 'Cek produk lemah sebelum mengubah promosi']],
    featureHeading: 'Catatan transaksi yang langsung berguna untuk membaca pola.',
    workflowHeading: 'Dari transaksi kasir ke ringkasan yang bisa dibahas.',
    workflow: [['Catat', 'Simpan waktu, produk, nilai, dan pembayaran.'], ['Kelompokkan', 'Lihat pola per produk dan kategori.'], ['Bandingkan', 'Gunakan periode dengan jumlah hari yang setara.'], ['Bahas', 'Bawa perubahan utama ke pemilik atau supervisor.']],
    roleHeading: 'Kasir mencatat. Admin merapikan. Pemilik membaca arahnya.',
    industryHeading: 'Jam ramai dan pola produk berbeda di tiap usaha.',
    closing: 'Temukan transaksi yang membentuk perubahan omzet Anda.',
  },
  inventori: {
    problemHeading: 'Stok habis bukan selalu karena penjualan tinggi.',
    exampleLabel: 'Contoh perhatian stok',
    exampleHeading: 'Baca sisa barang bersama laju keluar dan koreksinya.',
    exampleRows: [['Saldo tercatat', '18 unit pada pembaruan terakhir'], ['Laju keluar', 'Rata-rata 34 unit dalam tujuh hari'], ['Tindakan hari ini', 'Cek fisik, selisih, lalu kebutuhan isi ulang']],
    featureHeading: 'Tahu barang yang perlu dicek sebelum rak kosong.',
    workflowHeading: 'Saldo bergerak. Alasannya tidak ikut hilang.',
    workflow: [['Catat', 'Simpan barang masuk, keluar, dan koreksi.'], ['Hitung', 'Lihat saldo terakhir dan waktu pembaruan.'], ['Bandingkan', 'Baca saldo bersama kecepatan penjualan.'], ['Tentukan', 'Cek fisik atau siapkan isi ulang.']],
    roleHeading: 'Admin menjaga catatan. Supervisor menangani selisih.',
    industryHeading: 'Barang cepat habis, bahan utama, dan stok gudang dibaca dengan cara berbeda.',
    closing: 'Lihat stok yang layak dicek hari ini, bukan setelah habis.',
  },
  keuangan: {
    problemHeading: 'Omzet naik, tetapi uang tunai belum tentu ikut naik.',
    exampleLabel: 'Contoh arus uang',
    exampleHeading: 'Pisahkan penjualan, biaya, laba, dan kas sebelum menyimpulkan.',
    exampleRows: [['Uang masuk', 'Pembayaran yang benar-benar diterima'], ['Uang keluar', 'Biaya yang sudah dikelompokkan'], ['Tindakan hari ini', 'Cek transaksi tertunda dan biaya terbesar']],
    featureHeading: 'Angka keuangan dengan rumus yang bisa dibaca tim.',
    workflowHeading: 'Uang masuk dan keluar dibaca sebagai satu cerita.',
    workflow: [['Catat', 'Kelompokkan pemasukan dan pengeluaran.'], ['Pisahkan', 'Bedakan omzet, laba, dan saldo kas.'], ['Bandingkan', 'Pakai periode dan rumus yang sama.'], ['Tinjau', 'Cari transaksi yang paling memengaruhi perubahan.']],
    roleHeading: 'Pemilik melihat arah. Admin menjaga kategori tetap konsisten.',
    industryHeading: 'Sumber biaya mengikuti cara usaha menghasilkan pendapatan.',
    closing: 'Baca arah uang tanpa mencampur omzet, laba, dan kas.',
  },
  pelanggan: {
    problemHeading: 'Nama pelanggan ada, tetapi pola belanjanya belum terbaca.',
    exampleLabel: 'Contoh pola pelanggan',
    exampleHeading: 'Lihat pembelian terakhir, frekuensi, dan izin tindak lanjut.',
    exampleRows: [['Riwayat', 'Transaksi yang terkait dengan pelanggan'], ['Pola', 'Waktu dan produk yang sering dibeli'], ['Tindakan hari ini', 'Pastikan izin sebelum menghubungi']],
    featureHeading: 'Kenali pelanggan tanpa mengabaikan privasi.',
    workflowHeading: 'Riwayat dibaca. Pesan tidak dikirim otomatis.',
    workflow: [['Satukan', 'Hubungkan riwayat yang memang boleh dipakai.'], ['Kenali', 'Lihat pembelian terakhir dan pola berulang.'], ['Kelompokkan', 'Buat segmen sederhana dari perilaku nyata.'], ['Tindak lanjut', 'Hubungi hanya dengan dasar izin yang sesuai.']],
    roleHeading: 'Akses pelanggan mengikuti kebutuhan pekerjaan.',
    industryHeading: 'Pola kunjungan dan pemesanan berbeda di tiap usaha.',
    closing: 'Lihat pola pelanggan tanpa mengubah RAMUNI menjadi mesin pesan otomatis.',
  },
  'laporan-insight': {
    problemHeading: 'Rapat terlambat ketika angka baru disatukan di akhir minggu.',
    exampleLabel: 'Contoh laporan mingguan',
    exampleHeading: 'Satu periode, satu rumus, tiga hal untuk dibahas.',
    exampleRows: [['Periode', 'Tujuh hari dengan batas waktu yang jelas'], ['Isi utama', 'Perubahan, penyebab, dan catatan tindak lanjut'], ['Tindakan hari ini', 'Tetapkan pemilik untuk setiap temuan']],
    featureHeading: 'Tutup hari dan minggu tanpa merakit laporan dari awal.',
    workflowHeading: 'Catatan harian tumbuh menjadi bahan rapat.',
    workflow: [['Kumpulkan', 'Ambil angka dari periode yang sama.'], ['Ringkas', 'Dahulukan tiga perubahan terpenting.'], ['Jelaskan', 'Sertakan rumus dan transaksi pendukung.'], ['Tindak lanjut', 'Catat keputusan serta penanggung jawab.']],
    roleHeading: 'Supervisor menyiapkan. Pemilik memutuskan.',
    industryHeading: 'Ritual tutup hari mengikuti cara usaha beroperasi.',
    closing: 'Bawa laporan yang siap dibahas, bukan angka yang masih diperdebatkan.',
  },
  integrasi: {
    problemHeading: 'Data dari aplikasi berbeda jarang tiba dalam bentuk yang sama.',
    exampleLabel: 'Contoh jalur data',
    exampleHeading: 'Mulai dari metode input yang memang sudah aktif.',
    exampleRows: [['Jalur awal', 'CSV atau input yang disepakati'], ['Pemeriksaan', 'Format, waktu masuk, dan catatan gagal'], ['Tindakan hari ini', 'Perbaiki baris bermasalah sebelum impor ulang']],
    featureHeading: 'Setiap jalur data menunjukkan cara kerja dan hasil pemeriksaannya.',
    workflowHeading: 'Masuk, dicek, lalu dipakai. Tidak ada koneksi pura-pura.',
    workflow: [['Siapkan', 'Samakan kolom dan format yang dibutuhkan.'], ['Masukkan', 'Gunakan jalur yang aktif untuk akun Anda.'], ['Periksa', 'Lihat baris gagal dan waktu pembaruan.'], ['Gunakan', 'Pakai data setelah hasil impor masuk akal.']],
    roleHeading: 'Admin menangani impor. Pemilik menentukan sumber yang boleh dipakai.',
    industryHeading: 'Sumber data mengikuti alat yang dipakai usaha hari ini.',
    closing: 'Mulai dari satu sumber data yang paling siap.',
  },
};

export interface SolutionNarrative {
  symptomHeading: string;
  comparisonHeading: string;
  impact: [string, string][];
  beforeTitle: string;
  beforeText: string;
  afterTitle: string;
  afterText: string;
  moduleHeading: string;
  evidenceHeading: string;
  receiptTitle: string;
  receiptText: string;
  industryHeading: string;
  industryExamples: { slug: string; title: string; example: string }[];
  onboardingHeading: string;
  onboarding: [string, string][];
  closing: string;
}

export const solutionNarratives: Record<string, SolutionNarrative> = {
  'naikkan-omzet': {
    symptomHeading: 'Omzet turun adalah gejala, bukan jawabannya.',
    comparisonHeading: 'Cari perubahan pada produk, hari, dan pelanggan.',
    impact: [['Produk', 'Pisahkan produk yang tumbuh dan melemah.'], ['Waktu', 'Bandingkan hari kerja dengan periode setara.'], ['Pelanggan', 'Lihat pola pembelian yang ikut berubah.']],
    beforeTitle: 'Satu angka omzet menyembunyikan banyak cerita.',
    beforeText: 'Total penjualan tidak menunjukkan produk atau waktu yang berubah.',
    afterTitle: 'Pecah totalnya sampai penyebab paling mungkin terlihat.',
    afterText: 'Baca produk, waktu, dan pelanggan sebelum mengubah promosi.',
    moduleHeading: 'Empat sudut pandang untuk membaca perubahan omzet.',
    evidenceHeading: 'Lihat penyebabnya sebelum memilih cara bertumbuh.',
    receiptTitle: 'Promosi bukan jawaban pertama untuk setiap penurunan.',
    receiptText: 'Cek produk, waktu, dan pelanggan yang berubah. Setelah itu, pilih tindakan yang paling masuk akal.',
    industryHeading: 'Penyebab omzet berubah mengikuti ritme usaha.',
    industryExamples: [
      { slug: 'retail', title: 'Retail', example: 'Bandingkan SKU laris, jam transaksi, dan stok yang sempat kosong.' },
      { slug: 'fnb', title: 'F&B', example: 'Lihat menu yang melemah pada hari dan jam yang setara.' },
      { slug: 'reseller-online', title: 'Reseller Online', example: 'Pisahkan produk ramai dari produk yang tetap memberi margin.' },
    ],
    onboardingHeading: 'Mulai dari transaksi yang sudah bisa dipercaya.',
    onboarding: [
      ['Rapikan produk', 'Samakan nama, SKU, dan kategori yang dipakai dalam transaksi.'],
      ['Pilih pembanding', 'Gunakan dua periode dengan jumlah hari dan jam operasi yang setara.'],
      ['Periksa kelengkapan', 'Tandai transaksi, kanal, atau pelanggan yang belum tercatat sebelum membaca pola.'],
    ],
    closing: 'Baca perubahan omzet sebelum menambah promosi.',
  },
  'kelola-stok': {
    symptomHeading: 'Rak kosong dan gudang penuh bisa terjadi bersamaan.',
    comparisonHeading: 'Baca sisa stok bersama laju keluarnya.',
    impact: [['Sisa', 'Lihat saldo terakhir dan waktu pembaruan.'], ['Gerak', 'Bandingkan dengan penjualan beberapa hari terakhir.'], ['Waktu', 'Perhitungkan jam ramai dan waktu isi ulang.']],
    beforeTitle: 'Saldo stok saja tidak memberi prioritas.',
    beforeText: 'Dua barang dengan sisa sama dapat memiliki risiko habis yang berbeda.',
    afterTitle: 'Laju keluar menunjukkan barang mana yang harus didahulukan.',
    afterText: 'Cek fisik dan riwayat koreksi sebelum membuat pesanan.',
    moduleHeading: 'Inventori dan penjualan harus dibaca bersama.',
    evidenceHeading: 'Bedakan stok menipis, stok lambat, dan selisih catatan.',
    receiptTitle: 'Isi ulang dimulai dari kebutuhan, bukan rasa khawatir.',
    receiptText: 'Gunakan saldo, laju keluar, dan waktu tunggu untuk menentukan urutan pemeriksaan.',
    industryHeading: 'Satuan dan pola stok berbeda di setiap usaha.',
    industryExamples: [
      { slug: 'retail', title: 'Retail', example: 'Dahulukan SKU laris yang mendekati batas stok minimum.' },
      { slug: 'fnb', title: 'F&B', example: 'Hubungkan item utama dengan penjualan sebelum jam ramai.' },
      { slug: 'manufaktur-kecil', title: 'Manufaktur Kecil', example: 'Pisahkan bahan utama dari barang jadi saat memeriksa kebutuhan.' },
    ],
    onboardingHeading: 'Saldo awal perlu tanggal dan dasar pemeriksaan.',
    onboarding: [
      ['Samakan satuan', 'Tentukan unit yang dipakai untuk setiap barang agar pergerakan dapat dijumlahkan.'],
      ['Catat saldo awal', 'Masukkan hasil pemeriksaan fisik beserta tanggalnya, bukan perkiraan tanpa jejak.'],
      ['Jaga riwayat', 'Catat barang masuk, keluar, dan koreksi sebelum menetapkan prioritas isi ulang.'],
    ],
    closing: 'Tentukan stok yang perlu dicek hari ini.',
  },
  'pantau-laba-dan-arus-kas': {
    symptomHeading: 'Ramai belum tentu membuat uang tunai longgar.',
    comparisonHeading: 'Pisahkan omzet, biaya, laba, dan kas.',
    impact: [['Omzet', 'Jumlahkan nilai penjualan pada periode yang sama.'], ['Biaya', 'Kelompokkan pengeluaran yang membentuk laba.'], ['Kas', 'Lihat pembayaran yang benar-benar sudah masuk.']],
    beforeTitle: 'Empat angka sering dicampur menjadi satu kesimpulan.',
    beforeText: 'Omzet dapat naik saat pembayaran belum masuk atau biaya ikut membesar.',
    afterTitle: 'Urutan yang benar membuat perubahan uang lebih mudah dijelaskan.',
    afterText: 'Baca transaksi, biaya, lalu saldo kas sebelum memilih tindakan.',
    moduleHeading: 'Tiga modul untuk mengikuti perjalanan uang.',
    evidenceHeading: 'Tahu angka mana yang berubah dan transaksi apa yang membentuknya.',
    receiptTitle: 'Keputusan keuangan butuh definisi yang sama.',
    receiptText: 'Sepakati rumus dan periode sebelum membandingkan hasil antar laporan.',
    industryHeading: 'Sumber biaya dan waktu pembayaran perlu konteks usaha.',
    industryExamples: [
      { slug: 'fnb', title: 'F&B', example: 'Baca penjualan menu bersama biaya bahan dan pembayaran yang sudah masuk.' },
      { slug: 'jasa', title: 'Jasa', example: 'Bandingkan pendapatan layanan dengan biaya pengerjaan pada periode yang sama.' },
      { slug: 'distributor', title: 'Distributor', example: 'Pisahkan nilai pesanan dari pembayaran yang benar-benar telah diterima.' },
    ],
    onboardingHeading: 'Definisi angka disepakati sebelum dashboard dibaca.',
    onboarding: [
      ['Kelompokkan uang', 'Pisahkan pemasukan, pengeluaran, dan status pembayaran dengan kategori sederhana.'],
      ['Tentukan periode', 'Gunakan batas tanggal yang sama untuk transaksi, biaya, dan saldo kas.'],
      ['Cek sumber', 'Tinjau transaksi yang belum lengkap sebelum memakai ringkasan sebagai bahan keputusan.'],
    ],
    closing: 'Lihat arah uang tanpa mencampur omzet dan kas.',
  },
  'pahami-pelanggan': {
    symptomHeading: 'Pembeli berulang mudah terlewat saat riwayat tersebar.',
    comparisonHeading: 'Lihat waktu, frekuensi, produk, dan izin.',
    impact: [['Terakhir beli', 'Temukan kapan interaksi terakhir terjadi.'], ['Frekuensi', 'Lihat pola pembelian yang benar-benar tercatat.'], ['Izin', 'Pastikan dasar tindak lanjut sebelum menghubungi.']],
    beforeTitle: 'Daftar nama belum menjelaskan hubungan pelanggan.',
    beforeText: 'Tanpa riwayat, tim menebak siapa yang aktif dan siapa yang mulai pasif.',
    afterTitle: 'Riwayat memberi alasan untuk memilih tindak lanjut.',
    afterText: 'Gunakan pola pembelian tanpa mengirim pesan otomatis.',
    moduleHeading: 'Riwayat, transaksi, dan jawaban dibaca sesuai izin.',
    evidenceHeading: 'Kenali pola tanpa mengambil alih pilihan pelanggan.',
    receiptTitle: 'Relevan tidak berarti boleh langsung menghubungi.',
    receiptText: 'Setiap tindak lanjut tetap mengikuti persetujuan, kanal, dan akses yang berlaku.',
    industryHeading: 'Perilaku berulang terlihat berbeda di tiap model usaha.',
    industryExamples: [
      { slug: 'distributor', title: 'Distributor', example: 'Lihat jeda pemesanan pelanggan rutin tanpa menebak kebutuhan berikutnya.' },
      { slug: 'reseller-online', title: 'Reseller Online', example: 'Hubungkan pembelian yang tersedia tanpa menyatukan identitas secara sembarang.' },
      { slug: 'jasa', title: 'Jasa', example: 'Tinjau layanan yang pernah dipakai sebelum menawarkan tindak lanjut.' },
    ],
    onboardingHeading: 'Riwayat pelanggan dimulai dari identitas dan izin yang rapi.',
    onboarding: [
      ['Samakan identitas', 'Gunakan pengenal yang konsisten agar satu pelanggan tidak terbaca sebagai beberapa orang.'],
      ['Hubungkan transaksi', 'Sertakan hanya riwayat yang memang boleh dipakai untuk kebutuhan operasional.'],
      ['Catat izin', 'Simpan dasar dan kanal persetujuan sebelum tim melakukan tindak lanjut.'],
    ],
    closing: 'Pahami pola pelanggan dengan aturan privasi yang jelas.',
  },
  'laporan-bisnis-otomatis': {
    symptomHeading: 'Laporan terlambat saat tim masih menyamakan angka.',
    comparisonHeading: 'Gunakan periode, rumus, dan sumber yang sama.',
    impact: [['Periode', 'Tentukan awal dan akhir laporan.'], ['Rumus', 'Pakai definisi metrik yang disepakati.'], ['Pemilik', 'Catat siapa yang menindaklanjuti temuan.']],
    beforeTitle: 'Rekap manual mengulang pekerjaan dan perdebatan.',
    beforeText: 'Angka yang sama terlihat berbeda ketika periode atau rumus berubah.',
    afterTitle: 'Satu aturan laporan membuat rapat fokus pada tindakan.',
    afterText: 'Dahulukan perubahan utama, lalu buka detail saat dibutuhkan.',
    moduleHeading: 'Ringkasan dan dashboard membagi pekerjaan yang jelas.',
    evidenceHeading: 'Bawa tiga perubahan utama ke rapat tepat waktu.',
    receiptTitle: 'Laporan selesai saat tindak lanjut memiliki pemilik.',
    receiptText: 'Ringkasan yang baik menyebut perubahan, alasan, dan orang yang melanjutkan.',
    industryHeading: 'Isi laporan mengikuti keputusan yang berulang.',
    industryExamples: [
      { slug: 'retail', title: 'Retail', example: 'Ringkas penjualan, stok kritis, dan koreksi yang perlu diperiksa pemilik.' },
      { slug: 'distributor', title: 'Distributor', example: 'Satukan pergerakan produk, pelanggan berulang, dan status pembayaran.' },
      { slug: 'manufaktur-kecil', title: 'Manufaktur Kecil', example: 'Bawa perubahan stok, penjualan, dan biaya ke rapat periode.' },
    ],
    onboardingHeading: 'Otomatisasi dimulai dari aturan laporan yang jelas.',
    onboarding: [
      ['Sepakati metrik', 'Tentukan nama, rumus, sumber, dan penanggung jawab untuk setiap angka utama.'],
      ['Tetapkan jadwal', 'Pilih batas tutup harian atau mingguan yang dapat dijalankan tim secara konsisten.'],
      ['Uji satu periode', 'Bandingkan ringkasan dengan sumber asal sebelum menjadikannya kebiasaan rapat.'],
    ],
    closing: 'Rapikan laporan sebelum rapat berikutnya.',
  },
};
