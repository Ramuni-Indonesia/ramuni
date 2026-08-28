export interface HomepageScreenshotVisual {
  slug: string;
  label: string;
  title: string;
  text: string;
  href: string;
  desktop: string;
  tablet: string;
  mobile: string;
  width: number;
  height: number;
  alt: string;
}

const full = (viewport: 'desktop' | 'tablet' | 'mobile', slug: string) => (
  `/website-original/product-screens/saas-e2e/full/${viewport}/${slug}--${viewport}.webp`
);

export const homepageScreenshotVisuals: readonly HomepageScreenshotVisual[] = [
  {
    slug: 'home',
    label: 'Ringkasan workspace',
    title: 'Satu layar untuk memulai hari.',
    text: 'Lihat penjualan, kas, produk, pelanggan, dan wawasan dalam workspace yang sama.',
    href: '/produk/dashboard-bisnis/',
    desktop: '/website-original/product-screens/ramuni-saas-dashboard-desktop-1440.webp',
    tablet: '/website-original/product-screens/ramuni-saas-dashboard-desktop-1440.webp',
    mobile: '/website-original/product-screens/ramuni-saas-dashboard-real-mobile-pixel7.webp',
    width: 1440,
    height: 1202,
    alt: 'Screenshot workspace RAMUNI dengan ringkasan usaha dan sidebar produk yang terlihat penuh.',
  },
  {
    slug: 'ai',
    label: 'Asisten AI',
    title: 'Jawaban membawa sumbernya.',
    text: 'Tanyakan kondisi usaha, lalu buka periode dan data yang membentuk jawabannya.',
    href: '/produk/asisten-ai/',
    desktop: full('desktop', 'ai'),
    tablet: full('tablet', 'ai'),
    mobile: full('mobile', 'ai'),
    width: 1440,
    height: 1146,
    alt: 'Screenshot Asisten AI RAMUNI dengan percakapan dan konteks data yang dapat diperiksa.',
  },
  {
    slug: 'inventory-alerts',
    label: 'Inventori',
    title: 'Stok yang perlu dilihat lebih dulu.',
    text: 'Pantau pergerakan, batas minimum, dan pengecualian tanpa menebak dari ingatan.',
    href: '/produk/inventori/',
    desktop: full('desktop', 'inventory-alerts'),
    tablet: full('tablet', 'inventory-alerts'),
    mobile: full('mobile', 'inventory-alerts'),
    width: 1440,
    height: 900,
    alt: 'Screenshot halaman alert inventori RAMUNI dengan daftar stok yang perlu diperiksa.',
  },
  {
    slug: 'finance-statements',
    label: 'Keuangan',
    title: 'Omzet, biaya, laba, dan kas dibaca sesuai artinya.',
    text: 'Samakan periode dan definisi sebelum menilai arah keuangan usaha.',
    href: '/produk/keuangan/',
    desktop: full('desktop', 'finance-statements'),
    tablet: full('tablet', 'finance-statements'),
    mobile: full('mobile', 'finance-statements'),
    width: 1440,
    height: 900,
    alt: 'Screenshot laporan keuangan RAMUNI dengan periode, kategori biaya, dan ringkasan arus kas.',
  },
  {
    slug: 'customers',
    label: 'Pelanggan',
    title: 'Riwayat pembelian yang bisa ditindaklanjuti.',
    text: 'Kenali pelanggan dan pola kembali dari data yang memang tersedia dan diizinkan.',
    href: '/produk/pelanggan/',
    desktop: full('desktop', 'customers'),
    tablet: full('tablet', 'customers'),
    mobile: full('mobile', 'customers'),
    width: 1440,
    height: 900,
    alt: 'Screenshot halaman pelanggan RAMUNI dengan riwayat, segmentasi, dan status tindak lanjut.',
  },
  {
    slug: 'reports',
    label: 'Laporan & Insight',
    title: 'Tutup hari dengan ringkasan yang sama.',
    text: 'Bagikan laporan harian dan mingguan tanpa memulai rekap dari nol.',
    href: '/produk/laporan-insight/',
    desktop: full('desktop', 'reports'),
    tablet: full('tablet', 'reports'),
    mobile: full('mobile', 'reports'),
    width: 1440,
    height: 900,
    alt: 'Screenshot halaman laporan dan insight RAMUNI dengan ringkasan periode serta tindak lanjut.',
  },
  {
    slug: 'sales-omnichannel-orders',
    label: 'Penjualan',
    title: 'Pesanan dan pembayaran dalam satu alur.',
    text: 'Telusuri status pesanan dari kanal yang tersedia sebelum follow-up.',
    href: '/produk/penjualan/',
    desktop: full('desktop', 'sales-omnichannel-orders'),
    tablet: full('tablet', 'sales-omnichannel-orders'),
    mobile: full('mobile', 'sales-omnichannel-orders'),
    width: 1440,
    height: 1004,
    alt: 'Screenshot halaman pesanan penjualan RAMUNI dengan status dan detail pembayaran.',
  },
];

export const homepageIndustryVisuals = [
  {
    slug: 'fnb',
    title: 'F&B',
    question: 'Menu apa yang turun minggu ini?',
    text: 'Hubungkan menu, bahan, jam ramai, dan biaya sebelum mengubah keputusan.',
    href: '/industri/fnb/',
    image: '/website-original/industries/fnb-counter.webp',
    alt: 'Foto nyata meja kasir dan area layanan kedai kopi di Indonesia.',
    credit: 'Foto Unsplash · Syahril Fadillah',
  },
  {
    slug: 'retail',
    title: 'Retail',
    question: 'Produk mana yang hampir habis tetapi tetap laris?',
    text: 'Baca SKU, ritme transaksi, dan saldo stok dalam konteks toko.',
    href: '/industri/retail/',
    image: '/website-original/industries/retail-shelves.webp',
    alt: 'Foto nyata rak barang di toko kecil dengan stok yang siap diperiksa.',
    credit: 'Foto Unsplash · Bernd Dittrich',
  },
  {
    slug: 'community',
    title: 'Usaha lokal',
    question: 'Pelanggan mana yang biasanya kembali?',
    text: 'Lihat riwayat pembelian tanpa menebak kebutuhan pribadi pelanggan.',
    href: '/solusi/pahami-pelanggan/',
    image: '/website-original/industries/community-shop.webp',
    alt: 'Foto nyata pemilik dan pelanggan berbincang di depan toko kecil.',
    credit: 'Foto Unsplash · David Kristianto',
  },
] as const;
