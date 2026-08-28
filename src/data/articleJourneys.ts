export interface ArticleJourney {
  label: string;
  nextTitle: string;
  nextHref: string;
  productTitle: string;
  productHref: string;
  tourHref: string;
  title: string;
  text: string;
  stages: [string, string, string, string];
  metric: string;
}

const defaultJourney: ArticleJourney = {
  label: 'Dashboard Bisnis',
  nextTitle: 'Solusi Laporan Bisnis',
  nextHref: '/solusi/laporan-bisnis-otomatis/',
  productTitle: 'Dashboard Bisnis RAMUNI',
  productHref: '/produk/dashboard-bisnis/',
  tourHref: '/tour-produk-gratis/?flow=consultation&intent=overview',
  title: 'Lihat bagaimana catatan berubah menjadi arah yang bisa diperiksa.',
  text: 'Buka contoh alur produk untuk melihat hubungan antara perubahan, angka pendukung, dan langkah berikutnya.',
  stages: ['Catatan', 'Bandingkan', 'Telusuri', 'Tentukan'],
  metric: 'Perubahan utama',
};

export const articleJourneys: Record<string, ArticleJourney> = {
  'ai-untuk-umkm': {
    label: 'Asisten AI',
    nextTitle: 'Asisten AI RAMUNI',
    nextHref: '/produk/asisten-ai/',
    productTitle: 'Asisten AI RAMUNI',
    productHref: '/produk/asisten-ai/',
    tourHref: '/tour-produk-gratis/?flow=consultation&intent=overview',
    title: 'Dari pertanyaan bisnis ke jawaban yang dasar angkanya tetap terlihat.',
    text: 'Lihat contoh alur bertanya, memilih periode, membuka bukti, dan memeriksa jawaban sebelum bertindak.',
    stages: ['Pertanyaan', 'Pilih data', 'Baca jawaban', 'Cek bukti'],
    metric: 'Jawaban dapat ditelusuri',
  },
  'keuangan-umkm': {
    label: 'Keuangan',
    nextTitle: 'Solusi Laba & Arus Kas',
    nextHref: '/solusi/pantau-laba-dan-arus-kas/',
    productTitle: 'Keuangan RAMUNI',
    productHref: '/produk/keuangan/',
    tourHref: '/tour-produk-gratis/?flow=consultation&intent=finance',
    title: 'Pisahkan omzet, laba, dan kas sebelum membaca arah usaha.',
    text: 'Lihat bagaimana transaksi dan waktu pembayaran dirangkum tanpa mencampur definisi angkanya.',
    stages: ['Transaksi', 'Kelompokkan', 'Bandingkan', 'Periksa kas'],
    metric: 'Laba dan arus kas',
  },
  'stok-inventori': {
    label: 'Inventori',
    nextTitle: 'Solusi Kelola Stok',
    nextHref: '/solusi/kelola-stok/',
    productTitle: 'Inventori RAMUNI',
    productHref: '/produk/inventori/',
    tourHref: '/tour-produk-gratis/?flow=consultation&intent=stock',
    title: 'Baca saldo stok bersama laju keluar dan waktu isi ulang.',
    text: 'Lihat contoh alur dari mutasi barang menuju daftar stok yang perlu diperiksa lebih dulu.',
    stages: ['Saldo', 'Mutasi', 'Laju keluar', 'Cek ulang'],
    metric: 'Stok perlu perhatian',
  },
  'penjualan-omzet': {
    label: 'Penjualan',
    nextTitle: 'Solusi Memahami Perubahan Omzet',
    nextHref: '/solusi/naikkan-omzet/',
    productTitle: 'Penjualan RAMUNI',
    productHref: '/produk/penjualan/',
    tourHref: '/tour-produk-gratis/?flow=consultation&intent=sales',
    title: 'Pecah perubahan omzet sampai produk dan waktunya terlihat.',
    text: 'Lihat bagaimana transaksi dikelompokkan agar penyebab perubahan tidak berhenti pada satu angka total.',
    stages: ['Transaksi', 'Kelompokkan', 'Bandingkan', 'Baca pendorong'],
    metric: 'Pendorong omzet',
  },
  'pelanggan-crm': {
    label: 'Pelanggan',
    nextTitle: 'Solusi Pahami Pelanggan',
    nextHref: '/solusi/pahami-pelanggan/',
    productTitle: 'Pelanggan RAMUNI',
    productHref: '/produk/pelanggan/',
    tourHref: '/tour-produk-gratis/?flow=consultation&intent=customer',
    title: 'Kenali pola pembelian sambil menjaga privasi pelanggan.',
    text: 'Lihat contoh alur dari transaksi menuju pelanggan berulang, segmentasi sederhana, dan pemeriksaan izin.',
    stages: ['Transaksi', 'Riwayat', 'Pola kembali', 'Cek izin'],
    metric: 'Pelanggan berulang',
  },
  'operasional-bisnis': {
    label: 'Laporan & Insight',
    nextTitle: 'Solusi Laporan Bisnis',
    nextHref: '/solusi/laporan-bisnis-otomatis/',
    productTitle: 'Laporan Bisnis RAMUNI',
    productHref: '/produk/laporan-insight/',
    tourHref: '/tour-produk-gratis/?flow=consultation&intent=report',
    title: 'Ubah catatan harian menjadi bahan evaluasi yang lebih terarah.',
    text: 'Lihat contoh alur menyatukan periode, menandai perubahan, membuka penyebab, dan mencatat tindak lanjut.',
    stages: ['Kumpulkan', 'Ringkas', 'Jelaskan', 'Tindak lanjut'],
    metric: 'Ringkasan periode',
  },
  'operasional-usaha': {
    label: 'Laporan & Insight',
    nextTitle: 'Solusi Laporan Bisnis',
    nextHref: '/solusi/laporan-bisnis-otomatis/',
    productTitle: 'Laporan Bisnis RAMUNI',
    productHref: '/produk/laporan-insight/',
    tourHref: '/tour-produk-gratis/?flow=consultation&intent=report',
    title: 'Buat pekerjaan rutin lebih mudah ditinjau bersama tim.',
    text: 'Lihat contoh alur menyatukan catatan, pemeriksaan, dan tindak lanjut tanpa mengubah SOP usaha secara mendadak.',
    stages: ['Catat', 'Samakan', 'Periksa', 'Tindak lanjut'],
    metric: 'Pemeriksaan rutin',
  },
  'penjualan-pemasaran': {
    label: 'Penjualan',
    nextTitle: 'Solusi Memahami Perubahan Omzet',
    nextHref: '/solusi/naikkan-omzet/',
    productTitle: 'Penjualan RAMUNI',
    productHref: '/produk/penjualan/',
    tourHref: '/tour-produk-gratis/?flow=consultation&intent=sales',
    title: 'Evaluasi perubahan penjualan sebelum memilih promosi berikutnya.',
    text: 'Lihat contoh alur membandingkan produk, waktu, dan periode sebelum menjadikan satu angka sebagai keputusan.',
    stages: ['Transaksi', 'Bandingkan', 'Baca pola', 'Tentukan'],
    metric: 'Perubahan penjualan',
  },
  'strategi-per-industri': {
    label: 'Konteks Industri',
    nextTitle: 'Konteks Industri RAMUNI',
    nextHref: '/industri/',
    productTitle: 'Dashboard Bisnis RAMUNI',
    productHref: '/produk/dashboard-bisnis/',
    tourHref: '/tour-produk-gratis/?flow=consultation&intent=overview',
    title: 'Mulai dari ritme usaha sebelum membandingkan angkanya.',
    text: 'Lihat contoh pertanyaan untuk jenis usaha Anda, lalu buka dashboard yang membantu menelusuri perubahan dengan periode yang setara.',
    stages: ['Konteks usaha', 'Pilih metrik', 'Bandingkan', 'Periksa'],
    metric: 'Pertanyaan sesuai industri',
  },
};

const articleJourneyOverrides: Record<string, keyof typeof articleJourneys> = {
  'cara-menghitung-hpp-usaha-kuliner': 'keuangan-umkm',
  'cara-menghitung-safety-stock': 'stok-inventori',
  'cara-mengatur-stok-usaha-fnb': 'stok-inventori',
  'cara-mengatur-stok-toko-sembako': 'stok-inventori',
  'cara-mengatur-stok-bahan-baku-bakery': 'stok-inventori',
  'cara-menghitung-food-cost-usaha-makanan': 'keuangan-umkm',
  'cara-mengelola-stok-toko-fashion': 'stok-inventori',
  'cara-mengelola-stok-produk-varian': 'stok-inventori',
  'cara-mencatat-penjualan-toko-retail': 'penjualan-omzet',
  'cara-mencatat-penjualan-usaha-laundry': 'penjualan-omzet',
  'cara-membuat-laporan-penjualan-barbershop': 'penjualan-omzet',
};

export const getArticleJourney = (categorySlug: string, articleId?: string): ArticleJourney => {
  const override = articleId ? articleJourneyOverrides[articleId] : undefined;
  return articleJourneys[override || categorySlug] || defaultJourney;
};
