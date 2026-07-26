export const dashboardVisuals = {
  productOverview: {
    type: 'product-screenshot',
    src: '/website-original/product-screens/ramuni-product-dashboard-overview.webp',
    mobileSrc: '/website-original/product-screens/ramuni-product-dashboard-mobile.webp',
    width: 1280,
    height: 618,
    mobileWidth: 1024,
    mobileHeight: 683,
    alt: 'Tampilan produk RAMUNI dengan data demo: ringkasan penjualan, kas, produk aktif, pelanggan, grafik arus kas, dan wawasan usaha.',
    badge: 'Tampilan produk · data demo',
  },
  productPerformance: {
    type: 'product-screenshot',
    src: '/website-original/product-screens/ramuni-product-dashboard-performance.webp',
    mobileSrc: '/website-original/product-screens/ramuni-product-dashboard-mobile.webp',
    width: 1280,
    height: 854,
    mobileWidth: 1024,
    mobileHeight: 683,
    alt: 'Tampilan produk RAMUNI dengan data demo yang menampilkan indikator penjualan, kas, produk aktif, serta grafik arus kas.',
    badge: 'Tampilan produk · data demo',
  },
  productOperations: {
    type: 'product-screenshot',
    src: '/website-original/product-screens/ramuni-product-dashboard-operations.webp',
    mobileSrc: '/website-original/product-screens/ramuni-product-dashboard-mobile.webp',
    width: 1280,
    height: 854,
    mobileWidth: 1024,
    mobileHeight: 683,
    alt: 'Tampilan produk RAMUNI dengan data demo yang memperlihatkan aktivitas pembayaran, perubahan stok, dan pengeluaran operasional.',
    badge: 'Tampilan produk · data demo',
  },
  ai: {
    type: 'conceptual',
    src: '/website-original/dashboards/ramuni-dashboard-ai-evidence.webp',
    width: 1280,
    height: 720,
    alt: 'Dashboard sintetis yang memperlihatkan jawaban AI, jejak bukti, perbandingan, dan titik persetujuan manusia.',
    badge: 'Visual konsep · data sintetis',
  },
  inventory: {
    type: 'conceptual',
    src: '/website-original/dashboards/ramuni-dashboard-inventory-reorder.webp',
    width: 1280,
    height: 720,
    alt: 'Dashboard sintetis untuk membaca saldo stok, pergerakan barang, prioritas pemeriksaan, dan waktu isi ulang.',
    badge: 'Visual konsep · data sintetis',
  },
  cash: {
    type: 'conceptual',
    src: '/website-original/dashboards/ramuni-dashboard-cash-flow.webp',
    width: 1280,
    height: 720,
    alt: 'Dashboard sintetis yang memisahkan uang masuk, uang keluar, biaya operasional, dan antrean pemeriksaan.',
    badge: 'Visual konsep · data sintetis',
  },
  sales: {
    type: 'conceptual',
    src: '/website-original/dashboards/ramuni-dashboard-sales-customer.webp',
    width: 1280,
    height: 720,
    alt: 'Dashboard sintetis untuk membaca pola penjualan, komposisi produk, riwayat pelanggan, dan tindak lanjut manual.',
    badge: 'Visual konsep · data sintetis',
  },
} as const;

export type DashboardVisualKey = keyof typeof dashboardVisuals;

const productDashboardMap: Record<string, DashboardVisualKey> = {
  hub: 'productOverview',
  'asisten-ai': 'ai',
  'dashboard-bisnis': 'productOverview',
  'katalog-produk': 'inventory',
  penjualan: 'productPerformance',
  inventori: 'productOperations',
  keuangan: 'productPerformance',
  pelanggan: 'productPerformance',
  'laporan-insight': 'productOverview',
  integrasi: 'inventory',
};

const solutionDashboardMap: Record<string, DashboardVisualKey> = {
  'naikkan-omzet': 'productPerformance',
  'kelola-stok': 'productOperations',
  'pantau-laba-dan-arus-kas': 'productPerformance',
  'pahami-pelanggan': 'productPerformance',
  'laporan-bisnis-otomatis': 'productOverview',
};

export const getProductDashboardVisual = (slug: string) => dashboardVisuals[productDashboardMap[slug] || 'productOverview'];
export const getSolutionDashboardVisual = (slug: string) => dashboardVisuals[solutionDashboardMap[slug] || 'ai'];
