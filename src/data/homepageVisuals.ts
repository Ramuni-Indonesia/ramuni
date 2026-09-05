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
    desktop: full('desktop', 'home'),
    tablet: full('tablet', 'home'),
    mobile: full('mobile', 'home'),
    width: 846,
    height: 1400,
    alt: 'Capture workspace RAMUNI terbaru dengan aktivasi, metrik keuangan, kesehatan data, aktivitas, dan prioritas operasional.',
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

export interface HomepageIndustryVisual {
  slug: string;
  title: string;
  question: string;
  text: string;
  href: string;
  image: string;
  alt: string;
  credit: string;
}

/**
 * Realistic, context-specific visuals generated for this section. Keeping the
 * visual map in data (rather than a single generic stock image) lets the
 * industry switcher update both the question and the supporting image.
 */
export const homepageIndustryVisuals: readonly HomepageIndustryVisual[] = [
  {
    slug: 'retail',
    title: 'Retail',
    question: 'Produk mana yang hampir habis tetapi tetap laris?',
    text: 'Baca SKU, ritme transaksi, dan saldo stok dalam konteks toko.',
    href: '/industri/retail/',
    image: '/website-original/industries/retail-real.webp',
    alt: 'Pemilik toko kelontong Indonesia memeriksa rak dan stok barang.',
    credit: 'Visual RAMUNI · Codex imagegen',
  },
  {
    slug: 'fnb',
    title: 'F&B',
    question: 'Menu apa yang turun minggu ini?',
    text: 'Hubungkan menu, bahan, jam ramai, dan biaya sebelum mengubah keputusan.',
    href: '/industri/fnb/',
    image: '/website-original/industries/fnb-real.webp',
    alt: 'Barista Indonesia menata minuman dan pastry di meja kedai kopi.',
    credit: 'Visual RAMUNI · Codex imagegen',
  },
  {
    slug: 'distributor',
    title: 'Distributor',
    question: 'Pesanan besar mana yang perlu ditindaklanjuti?',
    text: 'Satukan stok gudang, pesanan, dan piutang sebelum menjadwalkan pengiriman.',
    href: '/industri/distributor/',
    image: '/website-original/industries/distributor-real.webp',
    alt: 'Pemilik distributor Indonesia mengecek stok kardus di gudang.',
    credit: 'Visual RAMUNI · Codex imagegen',
  },
  {
    slug: 'reseller-online',
    title: 'Reseller Online',
    question: 'Kanal mana yang memberi margin paling sehat?',
    text: 'Bandingkan pesanan, biaya kanal, dan stok yang bergerak sebelum menambah iklan.',
    href: '/industri/reseller-online/',
    image: '/website-original/industries/reseller-online-real.webp',
    alt: 'Reseller online Indonesia menyiapkan paket pesanan di ruang kerja rumah.',
    credit: 'Visual RAMUNI · Codex imagegen',
  },
  {
    slug: 'jasa',
    title: 'Jasa',
    question: 'Layanan mana yang paling sering kembali dipesan?',
    text: 'Lihat riwayat layanan, biaya, dan periode kerja dalam satu konteks.',
    href: '/industri/jasa/',
    image: '/website-original/industries/jasa-real.webp',
    alt: 'Pemilik usaha jasa Indonesia menjelaskan pekerjaan kepada pelanggan.',
    credit: 'Visual RAMUNI · Codex imagegen',
  },
  {
    slug: 'manufaktur-kecil',
    title: 'Manufaktur Kecil',
    question: 'Bahan dan barang jadi mana yang menghambat produksi?',
    text: 'Periksa bahan, hasil produksi, dan biaya sebelum mengubah jadwal kerja.',
    href: '/industri/manufaktur-kecil/',
    image: '/website-original/industries/manufaktur-kecil-real.webp',
    alt: 'Tim manufaktur kecil Indonesia memeriksa bahan dan barang jadi.',
    credit: 'Visual RAMUNI · Codex imagegen',
  },
] as const;
