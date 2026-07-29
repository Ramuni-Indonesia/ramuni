export const launchCta = {
  label: 'Mulai coba gratis',
  href: '/tour-produk-gratis/',
};

export interface NavigationLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavigationColumn {
  label: string;
  links: NavigationLink[];
}

export interface MegaNavigationGroup {
  label: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  columns: NavigationColumn[];
  actions?: NavigationLink[];
  featured?: {
    eyebrow: string;
    title: string;
    text: string;
    href: string;
    cta: string;
  };
}

export interface DirectNavigationLink {
  label: string;
  href: string;
}

export interface FooterNavigationGroup {
  label: string;
  links: NavigationLink[];
}

export const headerNavigation: Array<MegaNavigationGroup | DirectNavigationLink> = [
  {
    label: 'Produk',
    href: '/produk/',
    eyebrow: 'Produk',
    title: 'Modul untuk angka yang mulai sulit dibaca.',
    description: 'Mulai dari catatan, laporan, atau pertanyaan yang paling sering muncul di tim.',
    columns: [
      {
        label: 'AI & Insight',
        links: [
          { label: 'Asisten AI', href: '/produk/asisten-ai/', description: 'Tanya kondisi usaha. Preview awal memperlihatkan AI membaca data tanpa tindakan otomatis.' },
          { label: 'Dashboard Bisnis', href: '/produk/dashboard-bisnis/', description: 'Lihat prioritas sebelum membuka detail angka.' },
          { label: 'Laporan & Insight', href: '/produk/laporan-insight/', description: 'Ringkas harian dan mingguan dengan periode jelas.' },
        ],
      },
      {
        label: 'Operasional',
        links: [
          { label: 'Penjualan', href: '/produk/penjualan/', description: 'Baca perubahan transaksi, produk, dan pembayaran.' },
          { label: 'Inventori', href: '/produk/inventori/', description: 'Pantau saldo, pergerakan, dan batas stok.' },
          { label: 'Keuangan', href: '/produk/keuangan/', description: 'Pisahkan omzet, biaya, laba, dan kas.' },
          { label: 'Pelanggan', href: '/produk/pelanggan/', description: 'Kenali riwayat dan pola pembelian yang tersedia.' },
        ],
      },
      {
        label: 'Pondasi',
        links: [
          { label: 'Integrasi', href: '/produk/integrasi/', description: 'Lihat jalur data dan status tiap metode.' },
          { label: 'Semua Produk', href: '/produk/', description: 'Buka katalog produk RAMUNI.' },
        ],
      },
    ],
    featured: {
      eyebrow: 'Mulai di sini',
      title: 'Belum tahu modul yang dibutuhkan?',
      text: 'Mulai dari masalah bisnis, lalu pilih modul yang relevan.',
      href: '/produk/',
      cta: 'Lihat semua produk',
    },
  },
  {
    label: 'Solusi',
    href: '/solusi/',
    eyebrow: 'Solusi',
    title: 'Cari dari masalah yang terasa hari ini.',
    description: 'Omzet, stok, kas, pelanggan, dan laporan dibaca dari konteks usaha Anda.',
    columns: [
      {
        label: 'Berdasarkan tujuan',
        links: [
          { label: 'Naikkan Omzet', href: '/solusi/naikkan-omzet/', description: 'Telusuri perubahan penjualan tanpa janji hasil.' },
          { label: 'Kelola Stok', href: '/solusi/kelola-stok/', description: 'Prioritaskan stok yang perlu diperiksa.' },
          { label: 'Pantau Laba & Arus Kas', href: '/solusi/pantau-laba-dan-arus-kas/', description: 'Baca omzet, biaya, laba, dan kas bersama.' },
          { label: 'Pahami Pelanggan', href: '/solusi/pahami-pelanggan/', description: 'Lihat pola pembelian tanpa tindak lanjut otomatis.' },
          { label: 'Laporan Bisnis', href: '/solusi/laporan-bisnis-otomatis/', description: 'Rapikan rekap dengan periode dan rumus yang sama.' },
        ],
      },
      {
        label: 'Berdasarkan industri',
        links: [
          { label: 'Retail', href: '/industri/retail/', description: 'SKU cepat, stok, dan ritme transaksi.' },
          { label: 'F&B', href: '/industri/fnb/', description: 'Menu, bahan, jam ramai, dan bahan terbuang.' },
          { label: 'Distributor', href: '/industri/distributor/', description: 'Pesanan besar, pelanggan yang kembali, dan piutang.' },
          { label: 'Reseller Online', href: '/industri/reseller-online/', description: 'Kanal jual, margin produk, dan stok.' },
          { label: 'Jasa', href: '/industri/jasa/', description: 'Layanan, biaya, pelanggan, dan periode.' },
          { label: 'Manufaktur Kecil', href: '/industri/manufaktur-kecil/', description: 'Barang jadi, bahan, dan biaya produksi.' },
        ],
      },
      {
        label: 'Berdasarkan peran',
        links: [
          { label: 'Pemilik Usaha', href: '/untuk/pemilik-usaha/', description: 'Kesehatan bisnis, tim, dan keputusan.' },
          { label: 'Admin Toko', href: '/untuk/admin-toko/', description: 'Data produk, transaksi, dan koreksi.' },
          { label: 'Kasir', href: '/untuk/kasir/', description: 'Alur transaksi dan bantuan pemulihan.' },
          { label: 'Supervisor', href: '/untuk/supervisor/', description: 'Pengecualian, laporan, dan tindak lanjut.' },
        ],
      },
    ],
    featured: {
      eyebrow: 'Lihat semua',
      title: 'Semua solusi bisnis',
      text: 'Bandingkan masalah, modul terkait, dan langkah awal yang aman.',
      href: '/solusi/',
      cta: 'Buka solusi',
    },
  },
  {
    label: 'Sumber Daya',
    href: '/sumber-daya/',
    eyebrow: 'Belajar praktis',
    title: 'Baca, hitung, dan pahami istilah.',
    description: 'Panduan praktis untuk membantu Anda membaca angka usaha.',
    columns: [
      {
        label: 'Baca',
        links: [
          { label: 'Blog', href: '/blog/', description: 'Artikel praktis untuk membaca bisnis.' },
          { label: 'Panduan', href: '/panduan/', description: 'Langkah kerja ringan untuk UMKM.' },
          { label: 'Kamus Bisnis', href: '/kamus-bisnis/', description: 'Istilah bisnis dalam bahasa sederhana.' },
        ],
      },
      {
        label: 'Pakai',
        links: [
          { label: 'Template', href: '/template/', description: 'Template sederhana untuk pekerjaan rutin usaha.' },
          { label: 'Kalkulator Laba', href: '/kalkulator/laba-usaha/', description: 'Hitung laba edukatif di browser.' },
          { label: 'Kalkulator HPP', href: '/kalkulator/hpp/', description: 'Periksa biaya barang terjual.' },
          { label: 'Kalkulator Reorder Stok', href: '/kalkulator/reorder-stok/', description: 'Tentukan titik cek stok berikutnya.' },
        ],
      },
      {
        label: 'Bantuan',
        links: [
          { label: 'Bantuan', href: '/bantuan/', description: 'Cari jawaban penggunaan RAMUNI.' },
          { label: 'Keamanan', href: '/keamanan/', description: 'Pelajari cara RAMUNI menjaga data dan akses.' },
          { label: 'Status', href: '/status/', description: 'Lihat kondisi layanan RAMUNI.' },
        ],
      },
    ],
    featured: {
      eyebrow: 'Pilihan editor',
      title: 'AI Business Companion untuk UMKM',
      text: 'Pahami cara RAMUNI membaca data tanpa mengambil alih keputusan.',
      href: '/blog/ai-business-companion-umkm/',
      cta: 'Baca artikel',
    },
  },
  { label: 'Tentang', href: '/tentang/' },
];

export const accountNavigation: NavigationLink[] = [
  { label: 'Masuk', href: '/masuk/' },
];

export const footerNavigation: FooterNavigationGroup[] = [
  {
    label: 'Produk',
    links: [
      { label: 'Asisten AI', href: '/produk/asisten-ai/' },
      { label: 'Dashboard Bisnis', href: '/produk/dashboard-bisnis/' },
      { label: 'Penjualan', href: '/produk/penjualan/' },
      { label: 'Inventori', href: '/produk/inventori/' },
      { label: 'Keuangan', href: '/produk/keuangan/' },
      { label: 'Semua Produk', href: '/produk/' },
    ],
  },
  {
    label: 'Solusi',
    links: [
      { label: 'Naikkan Omzet', href: '/solusi/naikkan-omzet/' },
      { label: 'Kelola Stok', href: '/solusi/kelola-stok/' },
      { label: 'Pantau Laba', href: '/solusi/pantau-laba-dan-arus-kas/' },
      { label: 'Pahami Pelanggan', href: '/solusi/pahami-pelanggan/' },
      { label: 'Retail', href: '/industri/retail/' },
      { label: 'F&B', href: '/industri/fnb/' },
      { label: 'Distributor', href: '/industri/distributor/' },
      { label: 'Pemilik Usaha', href: '/untuk/pemilik-usaha/' },
    ],
  },
  {
    label: 'Sumber Daya',
    links: [
      { label: 'Blog', href: '/blog/' },
      { label: 'Panduan', href: '/panduan/' },
      { label: 'Template', href: '/template/' },
      { label: 'Kalkulator', href: '/kalkulator/' },
      { label: 'Kamus Bisnis', href: '/kamus-bisnis/' },
      { label: 'Bantuan', href: '/bantuan/' },
    ],
  },
  {
    label: 'Perusahaan',
    links: [
      { label: 'Tentang', href: '/tentang/' },
      { label: 'Kontak', href: '/kontak/' },
      { label: 'Keamanan', href: '/keamanan/' },
      { label: 'Status', href: '/status/' },
    ],
  },
  {
    label: 'Akun',
    links: [
      { label: 'Masuk', href: '/masuk/' },
      { label: 'Coba gratis', href: '/tour-produk-gratis/' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { label: 'Privasi', href: '/privasi/' },
      { label: 'Syarat Penggunaan', href: '/syarat-penggunaan/' },
      { label: 'Pemrosesan Data', href: '/pemrosesan-data/' },
    ],
  },
];

export interface Product {
  slug: string;
  title: string;
  summary: string;
  outcome: string;
  question: string;
  situations: string[];
  features: { title: string; text: string }[];
  safety: string;
  roles: string[];
  industries: string[];
}

export const products: Product[] = [
  {
    slug: 'asisten-ai',
    title: 'Asisten AI',
    summary: 'Tanyakan kondisi usaha dengan bahasa sehari-hari dan baca jawaban berdasarkan data yang tersedia.',
    outcome: 'Lebih cepat memahami apa yang perlu diperhatikan hari ini.',
    question: 'Apa yang bisa saya tanyakan tentang bisnis?',
    situations: ['Angka tersebar di beberapa catatan', 'Penyebab perubahan belum terlihat', 'Pemilik perlu jawaban singkat sebelum menelusuri detail'],
    features: [
      { title: 'Jawaban berbasis konteks', text: 'Jawaban mengacu pada periode dan data yang sedang dibuka.' },
      { title: 'Bukti pendukung', text: 'Lihat angka di balik jawaban tanpa mencari laporan lain.' },
      { title: 'Tanda saat data belum cukup', text: 'RAMUNI memberi tahu ketika dasar jawaban belum memadai.' },
      { title: 'AI hanya membaca', text: 'Pada versi awal, RAMUNI tidak menjalankan transaksi.' },
    ],
    safety: 'Asisten tidak menjawab sebagai mesin pencari umum dan tidak menjalankan aksi bisnis secara otomatis.',
    roles: ['Pemilik usaha', 'Supervisor', 'Admin toko'],
    industries: ['Retail', 'F&B', 'Distributor'],
  },
  {
    slug: 'dashboard-bisnis',
    title: 'Dashboard Bisnis',
    summary: 'Satukan ringkasan penjualan, stok, arus kas, dan pelanggan dalam tampilan yang mudah dibaca.',
    outcome: 'Mulai dari kesimpulan, lalu telusuri angka pendukungnya.',
    question: 'Apa yang perlu saya perhatikan hari ini?',
    situations: ['Ringkasan harian masih manual', 'Angka penting tidak punya pembanding', 'Tim melihat versi informasi yang berbeda'],
    features: [
      { title: 'Hal penting lebih dulu', text: 'Perubahan yang perlu perhatian tampil sebelum rincian lain.' },
      { title: 'Perbandingan periode', text: 'Bandingkan angka dengan periode yang dipilih secara konsisten.' },
      { title: 'Waktu pembaruan data', text: 'Ketahui kapan setiap ringkasan terakhir diperbarui.' },
      { title: 'Telusuri angka pendukung', text: 'Buka metrik yang menjadi dasar setiap ringkasan.' },
    ],
    safety: 'Setiap ringkasan menampilkan periode dan dasar angkanya.',
    roles: ['Pemilik usaha', 'Supervisor'],
    industries: ['Retail', 'F&B', 'Jasa'],
  },
  {
    slug: 'katalog-produk',
    title: 'Katalog Produk',
    summary: 'Simpan kategori, unit, SKU, harga, HPP, dan batas stok dalam satu daftar yang rapi.',
    outcome: 'Data produk konsisten sebelum dipakai untuk transaksi dan ringkasan.',
    question: 'Bagaimana data produk dan harga disiapkan?',
    situations: ['Nama produk tidak konsisten', 'Harga dan HPP sulit ditelusuri', 'Produk lama masih bercampur dengan produk aktif'],
    features: [
      { title: 'Kategori dan unit', text: 'Gunakan nama dan satuan yang sama di seluruh catatan.' },
      { title: 'Produk dan SKU', text: 'Bedakan produk aktif dengan kode yang mudah ditelusuri.' },
      { title: 'Harga dan HPP', text: 'Simpan harga jual dan biaya dasar pada tempat yang sama.' },
      { title: 'Stok minimum dan arsip', text: 'Tandai batas perhatian dan pisahkan produk yang tidak aktif.' },
    ],
    safety: 'Barcode, varian, bundel, lot, serial, dan daftar harga belum termasuk dalam preview ini.',
    roles: ['Pemilik usaha', 'Admin toko'],
    industries: ['Retail', 'Distributor', 'Reseller Online'],
  },
  {
    slug: 'penjualan',
    title: 'Penjualan',
    summary: 'Catat transaksi dan lihat pola omzet tanpa menyusun laporan manual dari banyak tempat.',
    outcome: 'Ketahui produk, waktu, dan pelanggan yang mendorong penjualan.',
    question: 'Apa yang mendorong perubahan omzet?',
    situations: ['Transaksi dicatat terlambat', 'Produk laris belum mudah terlihat', 'Status pembayaran perlu diperiksa ulang'],
    features: [
      { title: 'Pencatatan transaksi', text: 'Catat penjualan dengan waktu, produk, dan nilai yang jelas.' },
      { title: 'Tren produk dan kategori', text: 'Lihat produk dan kelompok yang paling banyak berubah.' },
      { title: 'Perbandingan periode', text: 'Bandingkan omzet dengan rentang waktu yang setara.' },
      { title: 'Status pembayaran', text: 'Bedakan transaksi yang sudah dibayar dan perlu diperiksa.' },
    ],
    safety: 'Cakupan pencatatan penjualan mengikuti fitur yang sudah tersedia.',
    roles: ['Kasir', 'Admin toko', 'Pemilik usaha'],
    industries: ['Retail', 'F&B', 'Reseller Online'],
  },
  {
    slug: 'inventori',
    title: 'Inventori',
    summary: 'Pantau pergerakan stok dan titik perhatian agar keputusan pembelian lebih terarah.',
    outcome: 'Kurangi keputusan stok yang hanya mengandalkan ingatan.',
    question: 'Stok mana yang perlu ditindaklanjuti?',
    situations: ['Stok habis baru diketahui saat diminta', 'Selisih stok sulit dijelaskan', 'Pembelian tidak mempertimbangkan kecepatan penjualan'],
    features: [
      { title: 'Riwayat stok masuk dan keluar', text: 'Telusuri perubahan stok berdasarkan waktu dan sumbernya.' },
      { title: 'Saldo stok saat ini', text: 'Lihat jumlah terakhir beserta waktu pembaruannya.' },
      { title: 'Batas stok minimum', text: 'Tandai barang yang perlu diperiksa sebelum habis.' },
      { title: 'Riwayat penyesuaian', text: 'Simpan alasan koreksi agar selisih bisa ditelusuri.' },
    ],
    safety: 'Saldo tidak dapat diubah tanpa jejak dan RAMUNI tidak menjanjikan otomasi pengadaan.',
    roles: ['Admin toko', 'Supervisor', 'Pemilik usaha'],
    industries: ['Retail', 'F&B', 'Distributor'],
  },
  {
    slug: 'keuangan',
    title: 'Keuangan',
    summary: 'Lihat pemasukan, pengeluaran, laba, dan kondisi kas dalam konteks aktivitas bisnis.',
    outcome: 'Pahami arah uang sebelum mengambil keputusan berikutnya.',
    question: 'Apakah usaha menghasilkan laba dan kas yang sehat?',
    situations: ['Omzet naik tetapi kas tidak terasa', 'Biaya utama belum dikelompokkan', 'Definisi laba berbeda antar catatan'],
    features: [
      { title: 'Pemasukan dan pengeluaran', text: 'Kelompokkan uang masuk dan keluar dengan kategori yang konsisten.' },
      { title: 'Definisi laba yang jelas', text: 'Tampilkan rumus yang dipakai agar angka tidak ditafsirkan berbeda.' },
      { title: 'Ringkasan kas', text: 'Lihat perubahan kas bersama aktivitas yang memengaruhinya.' },
      { title: 'Perbandingan periode', text: 'Bandingkan biaya, laba, dan kas pada rentang waktu yang sama.' },
    ],
    safety: 'Informasi bersifat operasional dan bukan nasihat pajak atau akuntansi profesional.',
    roles: ['Pemilik usaha', 'Supervisor', 'Admin toko'],
    industries: ['Jasa', 'Distributor', 'Manufaktur Kecil'],
  },
  {
    slug: 'pelanggan',
    title: 'Pelanggan',
    summary: 'Kenali perilaku pelanggan dan peluang tindak lanjut dari riwayat yang tersimpan.',
    outcome: 'Bangun hubungan pelanggan berdasarkan konteks yang nyata.',
    question: 'Siapa yang membeli dan kembali?',
    situations: ['Riwayat pelanggan tersebar', 'Pelanggan berulang belum dikenali', 'Segmentasi masih berdasarkan perkiraan'],
    features: [
      { title: 'Riwayat pembelian', text: 'Lihat kapan pelanggan terakhir membeli dan produk yang dipilih.' },
      { title: 'Pembelian berulang', text: 'Kenali pola pelanggan yang kembali tanpa menebak.' },
      { title: 'Kelompok pelanggan dasar', text: 'Susun kelompok sederhana berdasarkan riwayat yang tersedia.' },
      { title: 'Batas privasi', text: 'Tampilkan data hanya sesuai izin dan kebutuhan peran.' },
    ],
    safety: 'Tidak ada pesan otomatis kepada pelanggan tanpa dasar persetujuan dan kontrol manusia.',
    roles: ['Pemilik usaha', 'Admin toko'],
    industries: ['Retail', 'Jasa', 'Reseller Online'],
  },
  {
    slug: 'laporan-insight',
    title: 'Laporan & Insight',
    summary: 'Tutup hari dan minggu dengan ringkasan yang memakai periode dan rumus yang sama.',
    outcome: 'Tim memakai definisi angka yang sama saat mengevaluasi bisnis.',
    question: 'Bagaimana saya menutup hari dan minggu?',
    situations: ['Rekap mingguan memakan waktu', 'Angka berubah karena rumus berbeda', 'Tindak lanjut rapat tidak tercatat'],
    features: [
      { title: 'Insight harian', text: 'Bawa perubahan utama ke perhatian tim setiap hari.' },
      { title: 'Laporan mingguan', text: 'Ringkas pola, bukti, dan hal yang perlu dibahas bersama.' },
      { title: 'Periode dan rumus metrik', text: 'Gunakan rentang waktu dan definisi angka yang sama.' },
      { title: 'Ekspor laporan', text: 'Opsi unduh muncul setelah format laporannya lolos uji.' },
    ],
    safety: 'Kanal notifikasi dan pengiriman belum termasuk dalam preview ini.',
    roles: ['Pemilik usaha', 'Supervisor'],
    industries: ['Retail', 'F&B', 'Distributor'],
  },
  {
    slug: 'integrasi',
    title: 'Integrasi Data',
    summary: 'Mulai dari impor CSV, lalu lihat status data sebelum dipakai.',
    outcome: 'Mulai dari metode input yang benar-benar tersedia untuk usaha Anda.',
    question: 'Dari mana data dapat masuk?',
    situations: ['Data berada di aplikasi berbeda', 'Format impor belum konsisten', 'Ketersediaan konektor sering disalahartikan'],
    features: [
      { title: 'CSV sebagai jalur awal', text: 'Mulai dari format yang mudah dibaca sebelum memakai koneksi lain.' },
      { title: 'Status setiap koneksi', text: 'Bedakan koneksi aktif, terbatas, direncanakan, dan belum tersedia.' },
      { title: 'Metode sinkronisasi terpisah', text: 'Lihat apakah data masuk manual, terjadwal, atau langsung.' },
      { title: 'Status gagal dan pembaruan', text: 'Ketahui saat impor gagal dan kapan data terakhir diterima.' },
    ],
    safety: 'Daftar koneksi hanya menampilkan layanan yang sudah diuji dan mendapat persetujuan.',
    roles: ['Pemilik usaha', 'Admin toko'],
    industries: ['Retail', 'Distributor', 'Reseller Online'],
  },
];

export interface Solution {
  slug: string;
  title: string;
  summary: string;
  symptoms: string[];
  modules: string[];
  outcome: string;
  nextAction: string;
  comparison: string;
  moduleNotes: string[];
}

export const solutions: Solution[] = [
  { slug: 'naikkan-omzet', title: 'Memahami Perubahan Omzet', summary: 'Telusuri pola penjualan sebelum menentukan langkah pertumbuhan.', symptoms: ['Omzet berubah tanpa penyebab jelas', 'Produk atau hari lemah sulit ditemukan', 'Peluang penjualan hilang tidak tercatat'], modules: ['Penjualan', 'Dashboard Bisnis', 'Asisten AI', 'Pelanggan'], outcome: 'Temukan produk, waktu, atau pelanggan yang paling memengaruhi perubahan omzet.', nextAction: 'Periksa produk, waktu, dan segmen yang berubah sebelum mengubah promosi.', comparison: 'Bandingkan produk, hari, dan pelanggan yang berubah.', moduleNotes: ['Menunjukkan transaksi dan produk yang berubah.', 'Membawa perubahan utama ke satu ringkasan.', 'Membantu menelusuri pertanyaan berikutnya.', 'Menunjukkan pola pembelian yang tersedia.'] },
  { slug: 'kelola-stok', title: 'Kelola Stok Lebih Terarah', summary: 'Hubungkan saldo stok, pergerakan, dan pola penjualan untuk menentukan prioritas.', symptoms: ['Produk laris habis mendadak', 'Barang lambat bergerak menumpuk', 'Selisih stok tidak memiliki jejak'], modules: ['Inventori', 'Penjualan', 'Laporan & Insight'], outcome: 'Tahu barang mana yang perlu dicek dan diisi ulang lebih dulu.', nextAction: 'Tinjau riwayat stok dan kecepatan penjualan sebelum membuat pesanan.', comparison: 'Bandingkan barang cepat laku dengan sisa stok.', moduleNotes: ['Menunjukkan saldo dan riwayat perubahan stok.', 'Memberi konteks kecepatan produk terjual.', 'Merangkum barang yang perlu diperiksa.'] },
  { slug: 'pantau-laba-dan-arus-kas', title: 'Pantau Laba dan Arus Kas', summary: 'Baca omzet, biaya, laba, dan kas sebagai rangkaian yang saling berkaitan.', symptoms: ['Omzet tinggi tetapi kas menipis', 'Biaya utama tidak terkelompok', 'Definisi laba belum konsisten'], modules: ['Keuangan', 'Penjualan', 'Dashboard Bisnis'], outcome: 'Memahami definisi, biaya, dan pergerakan periode secara lebih jelas.', nextAction: 'Validasi transaksi dan kelompok biaya sebelum mengambil keputusan keuangan.', comparison: 'Pisahkan omzet, biaya, laba, dan kas sebelum menyimpulkan.', moduleNotes: ['Mengelompokkan uang masuk, biaya, laba, dan kas.', 'Menunjukkan transaksi yang membentuk omzet.', 'Membandingkan perubahan pada periode yang sama.'] },
  { slug: 'pahami-pelanggan', title: 'Pahami Pelanggan', summary: 'Satukan riwayat pembelian untuk melihat siapa yang kembali dan produk apa yang mereka pilih.', symptoms: ['Riwayat pelanggan tersebar', 'Pembeli berulang tidak dikenali', 'Tindak lanjut belum berbasis persetujuan'], modules: ['Pelanggan', 'Penjualan', 'Asisten AI'], outcome: 'Lihat pembelian terakhir dan pola pembelian ulang sebelum tim menindaklanjuti.', nextAction: 'Periksa persetujuan dan konteks pelanggan sebelum menindaklanjuti.', comparison: 'Lihat pola pembelian ulang tanpa mengirim pesan otomatis.', moduleNotes: ['Menyusun riwayat dan pola pembelian yang tersedia.', 'Menghubungkan pelanggan dengan transaksi.', 'Membantu membaca konteks tanpa menjalankan tindakan.'] },
  { slug: 'laporan-bisnis-otomatis', title: 'Rapikan Laporan Bisnis', summary: 'Gunakan satu definisi metrik untuk ringkasan harian dan mingguan yang konsisten.', symptoms: ['Rekap mingguan disusun ulang', 'Angka berbeda antar tim', 'Laporan datang setelah keputusan dibuat'], modules: ['Laporan & Insight', 'Dashboard Bisnis'], outcome: 'Membuat ringkasan periode yang konsisten dari sumber yang sama.', nextAction: 'Sepakati periode dan definisi metrik sebelum membandingkan hasil.', comparison: 'Gunakan periode dan rumus yang sama di setiap rekap.', moduleNotes: ['Menyusun ringkasan harian dan mingguan.', 'Menampilkan perubahan utama sebelum detail.'] },
];

export interface RolePage {
  slug: string;
  title: string;
  summary: string;
  responsibilities: string[];
  friction: string[];
  priorities: string[];
  permissions: string;
  ctaLabel: string;
  ctaHref: string;
}

export const roles: RolePage[] = [
  { slug: 'pemilik-usaha', title: 'Pemilik Usaha', summary: 'Lihat kesehatan bisnis lintas modul tanpa kehilangan kendali atas tim dan keputusan.', responsibilities: ['Menentukan prioritas usaha', 'Memantau kesehatan penjualan dan kas', 'Menjaga akses serta langganan'], friction: ['Ringkasan datang terlambat', 'Data berbeda antar tim', 'Penyebab perubahan sulit ditelusuri'], priorities: ['Insight lintas modul', 'Perbandingan periode', 'Peringatan yang perlu tindakan'], permissions: 'Dapat melihat, mengatur, menyetujui, mengekspor, dan mengelola tagihan sesuai kebijakan akun.', ctaLabel: 'Coba RAMUNI gratis', ctaHref: '/tour-produk-gratis/' },
  { slug: 'admin-toko', title: 'Admin Toko', summary: 'Jaga data produk, pelanggan, transaksi, dan pengeluaran tetap akurat untuk tim.', responsibilities: ['Memelihara data utama', 'Mencatat transaksi dan biaya', 'Membantu koreksi dengan jejak yang jelas'], friction: ['Entri ganda', 'Data produk tidak konsisten', 'Koreksi sulit dilacak'], priorities: ['Tugas data yang belum lengkap', 'Kesalahan data', 'Status sinkronisasi dan impor'], permissions: 'Dapat melihat, membuat, dan mengedit data operasional sesuai cakupan. Persetujuan, ekspor, dan tagihan mengikuti akses pemilik.', ctaLabel: 'Coba RAMUNI gratis', ctaHref: '/tour-produk-gratis/' },
  { slug: 'kasir', title: 'Kasir', summary: 'Selesaikan alur penjualan yang diizinkan dengan cepat dan panduan pemulihan yang jelas.', responsibilities: ['Mencatat transaksi', 'Memeriksa pembayaran', 'Meminta bantuan saat alur gagal'], friction: ['Langkah transaksi terlalu panjang', 'Status pembayaran membingungkan', 'Panduan pemulihan sulit ditemukan'], priorities: ['Transaksi aktif', 'Status pembayaran', 'Bantuan sesuai situasi'], permissions: 'Fokus pada melihat dan membuat transaksi yang diizinkan. Persetujuan, ekspor, dan tagihan tidak tersedia.', ctaLabel: 'Buka Panduan Kasir', ctaHref: '/bantuan/' },
  { slug: 'supervisor', title: 'Supervisor', summary: 'Pantau masalah operasional dan laporan tanpa membuka akses tagihan.', responsibilities: ['Memantau tim dan masalah yang perlu ditindaklanjuti', 'Meninjau laporan periode', 'Meneruskan masalah untuk persetujuan'], friction: ['Masalah terlihat terlambat', 'Masalah bercampur dengan aktivitas normal', 'Laporan tidak memakai definisi yang sama'], priorities: ['Daftar masalah', 'Insight per periode', 'Status tindak lanjut tim'], permissions: 'Dapat melihat kegiatan operasional, meninjau, dan mengekspor sesuai kebijakan. Tagihan tetap dikelola pemilik usaha.', ctaLabel: 'Coba RAMUNI gratis', ctaHref: '/tour-produk-gratis/' },
];

export const industries = [
  { slug: 'retail', title: 'Retail', question: 'Produk mana yang hampir habis tetapi tetap laris?' },
  { slug: 'fnb', title: 'F&B', question: 'Menu apa yang turun minggu ini?' },
  { slug: 'distributor', title: 'Distributor', question: 'Pelanggan mana yang biasanya memesan ulang?' },
  { slug: 'reseller-online', title: 'Reseller Online', question: 'Produk mana yang menghasilkan margin terbaik?' },
  { slug: 'jasa', title: 'Jasa', question: 'Layanan mana yang paling konsisten menghasilkan pendapatan?' },
  { slug: 'manufaktur-kecil', title: 'Manufaktur Kecil', question: 'Produk mana yang membutuhkan perhatian stok?' },
];

export const blogCategories = [
  { slug: 'penjualan-omzet', name: 'Penjualan & Omzet', description: 'Panduan membaca perubahan penjualan, produk, waktu, dan sumber omzet.' },
  { slug: 'stok-inventori', name: 'Stok & Inventori', description: 'Cara memahami saldo, pergerakan, stock opname, dan keputusan restock.' },
  { slug: 'keuangan-umkm', name: 'Keuangan UMKM', description: 'Penjelasan praktis tentang biaya, laba, HPP, dan arus kas untuk pemilik usaha.' },
  { slug: 'pelanggan-crm', name: 'Pelanggan & CRM', description: 'Cara membaca perilaku pelanggan dan membangun tindak lanjut yang menghormati privasi.' },
  { slug: 'operasional-bisnis', name: 'Operasional Bisnis', description: 'SOP ringan untuk merapikan aktivitas harian dan koordinasi tim.' },
  { slug: 'ai-untuk-umkm', name: 'AI untuk UMKM', description: 'Penggunaan AI yang aman, dapat diperiksa, dan tetap berada dalam kendali manusia.' },
  { slug: 'strategi-per-industri', name: 'Strategi per Industri', description: 'Konteks masalah dan cara kerja yang berbeda pada setiap jenis usaha.' },
  { slug: 'panduan-ramuni', name: 'Panduan RAMUNI', description: 'Materi setup dan penggunaan produk yang akan diterbitkan setelah fitur terverifikasi.' },
];

export const resources = [
  { href: '/panduan/', title: 'Panduan', text: 'Pelajari langkah praktis untuk memahami masalah bisnis.' },
  { href: '/template/', title: 'Template', text: 'Siapkan catatan bisnis dengan struktur yang lebih konsisten.' },
  { href: '/kalkulator/', title: 'Kalkulator', text: 'Hitung indikator dasar langsung di browser.' },
  { href: '/kamus-bisnis/', title: 'Kamus Bisnis', text: 'Pahami istilah bisnis dalam bahasa yang lebih sederhana.' },
];
