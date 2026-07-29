export type MarketingDashboardContextKey =
  | 'overview'
  | 'sales'
  | 'stock'
  | 'finance'
  | 'customer'
  | 'report'
  | 'ai'
  | 'catalog'
  | 'integration';

export interface MarketingDashboardMetric {
  label: string;
  value: string;
  note: string;
  tone?: 'good' | 'watch' | 'neutral';
}

export interface MarketingDashboardRow {
  label: string;
  value: string;
  note: string;
  tone?: 'good' | 'watch' | 'neutral';
}

export interface MarketingDashboardContext {
  layout: 'standard' | 'ai' | 'operations';
  eyebrow: string;
  title: string;
  subtitle: string;
  status: string;
  primaryMetric: string;
  question?: string;
  response?: string;
  metrics: MarketingDashboardMetric[];
  bars: number[];
  segments: string[];
  insight: string;
  rows: MarketingDashboardRow[];
  nextAction: string;
}

export const marketingDashboardContexts: Record<MarketingDashboardContextKey, MarketingDashboardContext> = {
  overview: {
    layout: 'standard',
    eyebrow: 'Ringkasan usaha',
    title: 'Hari ini perlu cek apa dulu?',
    subtitle: 'Penjualan, kas, stok, dan pelanggan dibaca dalam satu ruang kerja.',
    status: '4 sinyal aktif',
    primaryMetric: 'Prioritas pagi',
    metrics: [
      { label: 'Penjualan hari ini', value: 'Rp4,8 jt', note: '+8,4% vs kemarin', tone: 'good' },
      { label: 'Kas tersedia', value: 'Rp18,6 jt', note: '2 biaya jatuh tempo', tone: 'watch' },
      { label: 'Produk aktif', value: '126', note: '2 stok menipis', tone: 'watch' },
      { label: 'Pelanggan bulan ini', value: '84', note: '19 pelanggan baru', tone: 'good' },
    ],
    bars: [42, 56, 39, 63, 58, 72, 86],
    segments: ['Sab', 'Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum'],
    insight: 'Penjualan sore cenderung naik. Pastikan stok produk cepat bergerak tersedia sebelum jam ramai.',
    rows: [
      { label: 'Pesanan INV-1048 dibayar', value: '+Rp1,27 jt', note: 'Kedai Nusa · 12 menit lalu', tone: 'good' },
      { label: 'Stok Kopi Arabika diperbarui', value: '36 unit', note: 'Gudang utama · 48 menit lalu', tone: 'neutral' },
      { label: 'Pengeluaran operasional dicatat', value: '-Rp185 rb', note: 'Transportasi · 2 jam lalu', tone: 'watch' },
    ],
    nextAction: 'Buka dasar analisis sebelum menentukan tindakan.',
  },
  sales: {
    layout: 'standard',
    eyebrow: 'Penjualan',
    title: 'Omzet naik karena jam dan produk apa?',
    subtitle: 'Transaksi dikelompokkan supaya penyebab perubahan tidak berhenti di total omzet.',
    status: '3 pendorong terbaca',
    primaryMetric: 'Pendorong omzet',
    metrics: [
      { label: 'Omzet hari ini', value: 'Rp7,2 jt', note: '+12% vs hari setara', tone: 'good' },
      { label: 'Transaksi', value: '148', note: '+18 transaksi', tone: 'good' },
      { label: 'Rata-rata belanja', value: 'Rp48 rb', note: 'Stabil', tone: 'neutral' },
      { label: 'Retur', value: '2', note: 'Perlu dicek', tone: 'watch' },
    ],
    bars: [36, 44, 58, 91, 84, 55, 48],
    segments: ['08', '10', '12', '14', '16', '18', '20'],
    insight: 'Lonjakan pukul 12.00-16.00 didorong paket bundel dan pembelian ulang pelanggan lama.',
    rows: [
      { label: 'Bundel Hemat A', value: '+31%', note: 'Produk pendorong utama', tone: 'good' },
      { label: 'Kanal marketplace', value: '42 trx', note: 'Diskon ikut memengaruhi margin', tone: 'watch' },
      { label: 'Kasir toko', value: '86 trx', note: 'Perlu stok cepat di jam ramai', tone: 'neutral' },
    ],
    nextAction: 'Bandingkan omzet dengan margin dan stok produk pendorong.',
  },
  stock: {
    layout: 'operations',
    eyebrow: 'Inventori',
    title: 'Stok mana yang perlu dicek sebelum kosong?',
    subtitle: 'Saldo, mutasi, dan laju keluar dilihat bersama agar restock tidak menebak.',
    status: '2 SKU perlu perhatian',
    primaryMetric: 'Titik cek stok',
    metrics: [
      { label: 'SKU aktif', value: '126', note: '8 cepat bergerak', tone: 'neutral' },
      { label: 'Stok menipis', value: '2', note: 'Di bawah batas cek', tone: 'watch' },
      { label: 'Mutasi keluar', value: '34 unit', note: '7 hari terakhir', tone: 'good' },
      { label: 'Penerimaan', value: '12 unit', note: 'Perlu verifikasi', tone: 'neutral' },
    ],
    bars: [72, 64, 58, 48, 39, 28, 18],
    segments: ['H-6', 'H-5', 'H-4', 'H-3', 'H-2', 'H-1', 'Hari ini'],
    insight: 'Kopi Arabika mendekati batas perhatian. Cek fisik sebelum menerima pesanan berikutnya.',
    rows: [
      { label: 'Kopi Arabika 250 g', value: '18 unit', note: 'Batas cek 20 unit', tone: 'watch' },
      { label: 'Teh Melati 100 g', value: '42 unit', note: 'Stabil', tone: 'good' },
      { label: 'Gula Aren 500 ml', value: '+12 unit', note: 'Barang masuk belum diperiksa', tone: 'neutral' },
    ],
    nextAction: 'Cek fisik SKU prioritas lalu putuskan restock.',
  },
  finance: {
    layout: 'standard',
    eyebrow: 'Keuangan',
    title: 'Omzet, laba, dan kas tidak dibaca sebagai angka yang sama.',
    subtitle: 'Uang masuk, biaya, dan pembayaran tertunda dipisahkan sebelum menyimpulkan kondisi usaha.',
    status: 'Kas perlu dibaca ulang',
    primaryMetric: 'Laba dan arus kas',
    metrics: [
      { label: 'Omzet minggu ini', value: 'Rp32,4 jt', note: '+6,2%', tone: 'good' },
      { label: 'Laba kotor', value: '35%', note: 'HPP stabil', tone: 'neutral' },
      { label: 'Kas bersih', value: 'Rp9,4 jt', note: 'Belum termasuk piutang', tone: 'watch' },
      { label: 'Biaya terbesar', value: 'Rp3,1 jt', note: 'Operasional', tone: 'watch' },
    ],
    bars: [54, 46, 62, 42, 68, 74, 59],
    segments: ['Masuk', 'Biaya', 'Piutang', 'Kas', 'HPP', 'Retur', 'Net'],
    insight: 'Kas terlihat lebih sempit karena dua pembayaran belum masuk dan biaya operasional naik di akhir minggu.',
    rows: [
      { label: 'Pembayaran tertunda', value: 'Rp2,4 jt', note: '3 transaksi perlu ditagih', tone: 'watch' },
      { label: 'HPP produk utama', value: '65%', note: 'Masih dalam rentang biasa', tone: 'neutral' },
      { label: 'Biaya transportasi', value: '+Rp185 rb', note: 'Naik dari minggu lalu', tone: 'watch' },
    ],
    nextAction: 'Pisahkan piutang sebelum membaca kas tersedia.',
  },
  customer: {
    layout: 'standard',
    eyebrow: 'Pelanggan',
    title: 'Siapa yang kembali, dan kanal mana yang boleh dihubungi?',
    subtitle: 'Riwayat transaksi dibaca bersama izin tindak lanjut agar follow-up tetap aman.',
    status: '19 pelanggan baru',
    primaryMetric: 'Pola pelanggan',
    metrics: [
      { label: 'Pelanggan bulan ini', value: '84', note: '+12,1%', tone: 'good' },
      { label: 'Pelanggan berulang', value: '31', note: 'Naik 8 orang', tone: 'good' },
      { label: 'Belum lengkap izin', value: '9', note: 'Perlu dicek', tone: 'watch' },
      { label: 'Frekuensi beli', value: '2,4x', note: '30 hari', tone: 'neutral' },
    ],
    bars: [22, 28, 36, 47, 51, 64, 73],
    segments: ['Baru', 'Kembali', 'VIP', 'Dormant', 'Izin', 'WA', 'Toko'],
    insight: 'Pelanggan yang kembali banyak membeli bundel sore. Cek izin kanal sebelum mengirim tindak lanjut.',
    rows: [
      { label: 'Pelanggan kembali', value: '31', note: 'Pembelian kedua atau lebih', tone: 'good' },
      { label: 'Butuh cek izin', value: '9', note: 'Jangan kirim pesan otomatis', tone: 'watch' },
      { label: 'Produk favorit', value: 'Bundel A', note: 'Sering dibeli bersama', tone: 'neutral' },
    ],
    nextAction: 'Gunakan riwayat untuk membaca pola, bukan mengirim pesan tanpa izin.',
  },
  report: {
    layout: 'standard',
    eyebrow: 'Laporan',
    title: 'Apa perubahan penting minggu ini?',
    subtitle: 'Catatan harian diringkas menjadi bahan evaluasi yang bisa ditelusuri ulang.',
    status: 'Ringkasan siap dibaca',
    primaryMetric: 'Evaluasi mingguan',
    metrics: [
      { label: 'Perubahan utama', value: '4', note: 'Ada bukti pendukung', tone: 'neutral' },
      { label: 'Perlu keputusan', value: '3', note: 'Stok, kas, pelanggan', tone: 'watch' },
      { label: 'Sudah stabil', value: '5', note: 'Tidak perlu tindakan', tone: 'good' },
      { label: 'Catatan kurang', value: '2', note: 'Perlu dilengkapi', tone: 'watch' },
    ],
    bars: [44, 68, 52, 79, 66, 58, 84],
    segments: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    insight: 'Minggu ini perubahan terbesar berasal dari stok cepat bergerak dan biaya operasional.',
    rows: [
      { label: 'Bahas stok cepat bergerak', value: 'Prioritas 1', note: 'Ada bukti mutasi keluar', tone: 'watch' },
      { label: 'Cek biaya operasional', value: 'Prioritas 2', note: 'Naik dari baseline', tone: 'watch' },
      { label: 'Pertahankan bundel sore', value: 'Berjalan', note: 'Pendorong omzet masih sehat', tone: 'good' },
    ],
    nextAction: 'Pilih satu pemilik tindak lanjut untuk setiap perubahan.',
  },
  ai: {
    layout: 'ai',
    eyebrow: 'Asisten AI',
    title: 'Jawaban AI tetap menunjukkan dasar bacaannya.',
    subtitle: 'Pertanyaan, sumber data, dan batas jawaban ditampilkan sebelum pengguna mengambil keputusan.',
    status: '3 sumber terbaca',
    primaryMetric: 'Jawaban berbasis bukti',
    question: 'Stok mana yang perlu dicek sebelum jam ramai?',
    response: 'Produk terlaris mendekati batas perhatian. Periksa stok fisik sebelum menerima pesanan berikutnya.',
    metrics: [
      { label: 'Pertanyaan aktif', value: '1', note: 'Stok sebelum jam ramai', tone: 'neutral' },
      { label: 'Sumber dipakai', value: '3', note: 'Penjualan, stok, kas', tone: 'good' },
      { label: 'Butuh cek manual', value: '1', note: 'Stok fisik', tone: 'watch' },
      { label: 'Batas jawaban', value: 'Terlihat', note: 'Tidak otomatis bertindak', tone: 'neutral' },
    ],
    bars: [32, 52, 78, 64, 46, 58, 72],
    segments: ['Tanya', 'Cari', 'Cocokkan', 'Jawab', 'Batas', 'Bukti', 'Arah'],
    insight: 'Produk terlaris perlu dicek fisik sebelum menerima pesanan berikutnya. Jawaban tidak mengubah stok otomatis.',
    rows: [
      { label: 'Penjualan 7 hari', value: 'Sumber utama', note: 'Periode terlihat', tone: 'good' },
      { label: 'Saldo terakhir', value: '18 unit', note: 'Diperbarui 08.15', tone: 'watch' },
      { label: 'Stok fisik', value: 'Belum dicek', note: 'Perlu manusia', tone: 'watch' },
    ],
    nextAction: 'Baca sumber jawaban sebelum mengikuti rekomendasi.',
  },
  catalog: {
    layout: 'operations',
    eyebrow: 'Katalog produk',
    title: 'Nama, SKU, unit, dan HPP dibuat konsisten dulu.',
    subtitle: 'Produk yang sama tidak dibaca sebagai barang berbeda saat masuk ke transaksi.',
    status: '5 data perlu dirapikan',
    primaryMetric: 'Kebersihan katalog',
    metrics: [
      { label: 'Produk aktif', value: '126', note: '3 duplikat nama', tone: 'watch' },
      { label: 'SKU lengkap', value: '92%', note: '10 perlu dilengkapi', tone: 'watch' },
      { label: 'HPP tersedia', value: '84%', note: 'Perlu review harga', tone: 'neutral' },
      { label: 'Unit konsisten', value: '97%', note: '2 beda satuan', tone: 'good' },
    ],
    bars: [46, 50, 56, 66, 78, 84, 92],
    segments: ['Nama', 'SKU', 'Unit', 'Harga', 'HPP', 'Status', 'Siap'],
    insight: 'Tiga variasi nama mengarah ke produk yang sama. Rapikan sebelum membaca margin dan stok.',
    rows: [
      { label: 'Kopi Susu 250 ml', value: '3 variasi', note: 'Gabungkan identitas produk', tone: 'watch' },
      { label: 'SKU KS-250', value: 'Siap', note: 'Unit botol konsisten', tone: 'good' },
      { label: 'HPP terakhir', value: 'Rp25 rb', note: 'Perlu cek harga pemasok', tone: 'neutral' },
    ],
    nextAction: 'Rapikan identitas sebelum membandingkan performa produk.',
  },
  integration: {
    layout: 'operations',
    eyebrow: 'Import data',
    title: 'File masuk diperiksa sebelum menjadi catatan usaha.',
    subtitle: 'Kolom, format, dan baris bermasalah ditandai agar pengguna tahu apa yang perlu dibenahi.',
    status: '124 baris siap',
    primaryMetric: 'Validasi import',
    metrics: [
      { label: 'Baris diterima', value: '128', note: 'Dari CSV contoh', tone: 'neutral' },
      { label: 'Siap masuk', value: '124', note: 'Format sesuai', tone: 'good' },
      { label: 'Perlu revisi', value: '4', note: 'Kolom tanggal/harga', tone: 'watch' },
      { label: 'Duplikasi', value: '1', note: 'Perlu pilihan user', tone: 'watch' },
    ],
    bars: [18, 44, 76, 88, 64, 48, 96],
    segments: ['Upload', 'Map', 'Tanggal', 'Harga', 'SKU', 'Duplikat', 'Siap'],
    insight: 'Empat baris perlu diperbaiki sebelum import dilanjutkan. Data tidak otomatis ditimpa tanpa keputusan pengguna.',
    rows: [
      { label: 'Kolom tanggal', value: '2 error', note: 'Format tidak terbaca', tone: 'watch' },
      { label: 'Harga kosong', value: '1 baris', note: 'Perlu diisi', tone: 'watch' },
      { label: 'SKU cocok', value: '124 baris', note: 'Siap masuk', tone: 'good' },
    ],
    nextAction: 'Perbaiki baris bermasalah sebelum menjalankan import.',
  },
};

const productMarketingDashboardMap: Record<string, MarketingDashboardContextKey> = {
  hub: 'overview',
  'asisten-ai': 'ai',
  'dashboard-bisnis': 'overview',
  'katalog-produk': 'catalog',
  penjualan: 'sales',
  inventori: 'stock',
  keuangan: 'finance',
  pelanggan: 'customer',
  'laporan-insight': 'report',
  integrasi: 'integration',
};

const solutionMarketingDashboardMap: Record<string, MarketingDashboardContextKey> = {
  'naikkan-omzet': 'sales',
  'kelola-stok': 'stock',
  'pantau-laba-dan-arus-kas': 'finance',
  'pahami-pelanggan': 'customer',
  'laporan-bisnis-otomatis': 'report',
};

export const getProductMarketingDashboardContext = (slug: string): MarketingDashboardContextKey =>
  productMarketingDashboardMap[slug] || 'overview';

export const getSolutionMarketingDashboardContext = (slug: string): MarketingDashboardContextKey =>
  solutionMarketingDashboardMap[slug] || 'overview';
