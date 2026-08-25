import type { MarketingDashboardContextKey } from './marketingDashboardContexts';

export type MarketingCardSize = 'lead' | 'wide' | 'standard';
export type MarketingCardFamily = 'feature' | 'product' | 'solution';

export interface MarketingFeatureCard {
  slug: string;
  family: MarketingCardFamily;
  eyebrow: string;
  title: string;
  summary: string;
  href: string;
  context: MarketingDashboardContextKey;
  action: string;
  signal: string;
  signalLabel: string;
  size?: MarketingCardSize;
}

/**
 * Product-led marketing cards use the same visual language as the dashboard
 * previews. Values are deliberately illustrative and are disclosed in the
 * component so they are never mistaken for a visitor's live business data.
 */
export const marketingFeatureCards: readonly MarketingFeatureCard[] = [
  {
    slug: 'ai-copilot', family: 'feature', eyebrow: 'AI & Insight', title: 'AI Copilot',
    summary: 'Tanya kondisi usaha dengan bahasa sehari-hari. Lihat sumber yang dipakai sebelum memilih langkah.',
    href: '/features/ai-copilot/', context: 'ai', action: 'Lihat contoh jawaban', signal: '3 sumber', signalLabel: 'terlihat sebelum jawaban', size: 'lead',
  },
  {
    slug: 'profit-intelligence', family: 'feature', eyebrow: 'AI & Insight', title: 'Profit Intelligence',
    summary: 'Pisahkan omzet, HPP, biaya, margin, dan kas sebelum menilai produk atau periode.',
    href: '/features/profit-intelligence/', context: 'finance', action: 'Periksa margin', signal: '35%', signalLabel: 'margin kotor contoh', size: 'wide',
  },
  {
    slug: 'omnichannel', family: 'feature', eyebrow: 'Pelanggan', title: 'Omnichannel',
    summary: 'Satukan percakapan, catatan, dan status follow-up dari kanal yang memang terhubung.',
    href: '/features/omnichannel/', context: 'customer', action: 'Atur follow-up', signal: '9', signalLabel: 'izin perlu dicek', size: 'standard',
  },
  {
    slug: 'web-builder', family: 'feature', eyebrow: 'Halaman bisnis', title: 'Web Builder',
    summary: 'Susun profil usaha, produk, layanan, dan CTA kontak dalam satu halaman bisnis.',
    href: '/features/web-builder/', context: 'web', action: 'Susun halaman bisnis', signal: '1 ruang', signalLabel: 'untuk profil usaha', size: 'standard',
  },
  {
    slug: 'knowledge-os', family: 'feature', eyebrow: 'Pengetahuan tim', title: 'Knowledge OS',
    summary: 'Simpan SOP, keputusan, catatan, dan meeting notes agar tim menemukan rujukan yang sama.',
    href: '/features/knowledge-os/', context: 'knowledge', action: 'Rapikan pengetahuan', signal: '4 sumber', signalLabel: 'siap ditelusuri', size: 'wide',
  },
];

export const marketingProductCards: readonly MarketingFeatureCard[] = [
  {
    slug: 'asisten-ai', family: 'product', eyebrow: 'AI & Insight', title: 'Asisten AI',
    summary: 'Tanya kondisi usaha dengan bahasa sehari-hari tanpa menjalankan tindakan otomatis.',
    href: '/produk/asisten-ai/', context: 'ai', action: 'Buka Asisten AI', signal: '1', signalLabel: 'pertanyaan aktif', size: 'lead',
  },
  {
    slug: 'dashboard-bisnis', family: 'product', eyebrow: 'AI & Insight', title: 'Dashboard Bisnis',
    summary: 'Lihat prioritas penjualan, stok, kas, dan pelanggan sebelum membuka detail angka.',
    href: '/produk/dashboard-bisnis/', context: 'overview', action: 'Lihat dashboard', signal: '4', signalLabel: 'sinyal aktif', size: 'standard',
  },
  {
    slug: 'laporan-insight', family: 'product', eyebrow: 'AI & Insight', title: 'Laporan & Insight',
    summary: 'Tutup hari dan minggu dengan periode, rumus, dan sumber laporan yang konsisten.',
    href: '/produk/laporan-insight/', context: 'report', action: 'Buka contoh laporan', signal: '4', signalLabel: 'perubahan utama', size: 'standard',
  },
  {
    slug: 'penjualan', family: 'product', eyebrow: 'Operasional', title: 'Penjualan',
    summary: 'Baca transaksi, produk, waktu, kanal, dan status pembayaran dalam satu alur.',
    href: '/produk/penjualan/', context: 'sales', action: 'Telusuri penjualan', signal: '148', signalLabel: 'transaksi contoh', size: 'standard',
  },
  {
    slug: 'inventori', family: 'product', eyebrow: 'Operasional', title: 'Inventori',
    summary: 'Pantau saldo, mutasi, dan batas stok untuk menentukan SKU yang perlu dicek.',
    href: '/produk/inventori/', context: 'stock', action: 'Cek alur stok', signal: '2', signalLabel: 'SKU perlu perhatian', size: 'standard',
  },
  {
    slug: 'keuangan', family: 'product', eyebrow: 'Operasional', title: 'Keuangan',
    summary: 'Pisahkan omzet, biaya, laba, dan kas agar angka tidak dibaca sebagai hal yang sama.',
    href: '/produk/keuangan/', context: 'finance', action: 'Baca alur keuangan', signal: 'Rp9,4 jt', signalLabel: 'kas bersih contoh', size: 'wide',
  },
  {
    slug: 'pelanggan', family: 'product', eyebrow: 'Operasional', title: 'Pelanggan',
    summary: 'Kenali riwayat pembelian dan pola pelanggan berulang sambil menjaga izin tindak lanjut.',
    href: '/produk/pelanggan/', context: 'customer', action: 'Pahami pelanggan', signal: '31', signalLabel: 'pelanggan berulang', size: 'standard',
  },
  {
    slug: 'katalog-produk', family: 'product', eyebrow: 'Pondasi', title: 'Katalog Produk',
    summary: 'Samakan nama, SKU, unit, harga, HPP, dan batas stok sebelum membaca performa.',
    href: '/produk/katalog-produk/', context: 'catalog', action: 'Rapikan katalog', signal: '92%', signalLabel: 'SKU lengkap contoh', size: 'standard',
  },
  {
    slug: 'integrasi', family: 'product', eyebrow: 'Pondasi', title: 'Integrasi Data',
    summary: 'Periksa pemetaan, format, dan baris bermasalah sebelum data masuk ke workspace.',
    href: '/produk/integrasi/', context: 'integration', action: 'Lihat jalur data', signal: '124', signalLabel: 'baris siap contoh', size: 'standard',
  },
];

export const marketingSolutionCards: readonly MarketingFeatureCard[] = [
  {
    slug: 'naikkan-omzet', family: 'solution', eyebrow: 'Berdasarkan tujuan', title: 'Naikkan Omzet',
    summary: 'Cari produk, waktu, kanal, dan pelanggan yang memengaruhi perubahan omzet.',
    href: '/solusi/naikkan-omzet/', context: 'sales', action: 'Cari pendorong omzet', signal: '+12%', signalLabel: 'perubahan contoh', size: 'lead',
  },
  {
    slug: 'kelola-stok', family: 'solution', eyebrow: 'Berdasarkan tujuan', title: 'Kelola Stok',
    summary: 'Prioritaskan saldo dan laju keluar sebelum membuat keputusan restock.',
    href: '/solusi/kelola-stok/', context: 'stock', action: 'Prioritaskan stok', signal: '18 unit', signalLabel: 'saldo SKU contoh', size: 'standard',
  },
  {
    slug: 'pantau-laba-dan-arus-kas', family: 'solution', eyebrow: 'Berdasarkan tujuan', title: 'Pantau Laba & Arus Kas',
    summary: 'Baca omzet, biaya, laba, dan kas bersama dengan periode yang sama.',
    href: '/solusi/pantau-laba-dan-arus-kas/', context: 'finance', action: 'Buka alur keuangan', signal: 'Rp2,4 jt', signalLabel: 'pembayaran tertunda', size: 'wide',
  },
  {
    slug: 'pahami-pelanggan', family: 'solution', eyebrow: 'Berdasarkan tujuan', title: 'Pahami Pelanggan',
    summary: 'Kenali pembelian berulang dari riwayat yang tersedia tanpa pesan otomatis.',
    href: '/solusi/pahami-pelanggan/', context: 'customer', action: 'Lihat pola pelanggan', signal: '2,4x', signalLabel: 'frekuensi beli contoh', size: 'standard',
  },
  {
    slug: 'laporan-bisnis-otomatis', family: 'solution', eyebrow: 'Berdasarkan tujuan', title: 'Laporan Bisnis',
    summary: 'Samakan periode, rumus, dan sumber agar laporan harian serta mingguan mudah ditelusuri.',
    href: '/solusi/laporan-bisnis-otomatis/', context: 'report', action: 'Rapikan laporan', signal: '3', signalLabel: 'keputusan perlu dibahas', size: 'standard',
  },
];

export const marketingIndustryLinks = [
  { title: 'Retail', href: '/industri/retail/', text: 'SKU cepat, stok, dan ritme transaksi.' },
  { title: 'F&B', href: '/industri/fnb/', text: 'Menu, bahan, jam ramai, dan bahan terbuang.' },
  { title: 'Distributor', href: '/industri/distributor/', text: 'Pesanan besar, pelanggan kembali, dan piutang.' },
  { title: 'Reseller Online', href: '/industri/reseller-online/', text: 'Kanal jual, margin produk, dan stok.' },
  { title: 'Jasa', href: '/industri/jasa/', text: 'Layanan, biaya, pelanggan, dan periode.' },
  { title: 'Manufaktur Kecil', href: '/industri/manufaktur-kecil/', text: 'Barang jadi, bahan, dan biaya produksi.' },
] as const;

export const marketingRoleLinks = [
  { title: 'Pemilik Usaha', href: '/untuk/pemilik-usaha/', text: 'Kesehatan bisnis, tim, dan keputusan.' },
  { title: 'Admin Toko', href: '/untuk/admin-toko/', text: 'Data produk, transaksi, dan koreksi.' },
  { title: 'Kasir', href: '/untuk/kasir/', text: 'Alur transaksi dan bantuan pemulihan.' },
  { title: 'Supervisor', href: '/untuk/supervisor/', text: 'Pengecualian, laporan, dan tindak lanjut.' },
] as const;
