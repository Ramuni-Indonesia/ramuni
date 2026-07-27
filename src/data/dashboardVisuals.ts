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

export const heroContextVisuals = {
  aiImport: {
    src: '/website-original/context/ramuni-context-ai-import.webp',
    width: 1200,
    height: 800,
    alt: 'Ilustrasi kontekstual catatan dan lembar data yang dirapikan menjadi bukti untuk diperiksa manusia.',
  },
  salesCustomer: {
    src: '/website-original/context/ramuni-context-sales-customer.webp',
    width: 1200,
    height: 800,
    alt: 'Ilustrasi kontekstual transaksi toko dan hubungan pelanggan pada usaha kecil Indonesia.',
  },
  stockOperations: {
    src: '/website-original/context/ramuni-context-stock-operations.webp',
    width: 1200,
    height: 800,
    alt: 'Ilustrasi kontekstual rak produk, stok rendah, dan prioritas pengisian ulang.',
  },
  cashReport: {
    src: '/website-original/context/ramuni-context-cash-report.webp',
    width: 1200,
    height: 800,
    alt: 'Ilustrasi kontekstual buku kas, bukti biaya, kalender, dan laporan yang menunggu pemeriksaan.',
  },
} as const;

export type HeroContextVisualKey = keyof typeof heroContextVisuals;

const productDashboardMap: Record<string, DashboardVisualKey> = {
  hub: 'productOverview',
  'asisten-ai': 'productOverview',
  'dashboard-bisnis': 'productOverview',
  'katalog-produk': 'productOperations',
  penjualan: 'productPerformance',
  inventori: 'productOperations',
  keuangan: 'productPerformance',
  pelanggan: 'productOverview',
  'laporan-insight': 'productOverview',
  integrasi: 'productOverview',
};

const productContextMap: Record<string, HeroContextVisualKey> = {
  hub: 'aiImport',
  'asisten-ai': 'aiImport',
  'dashboard-bisnis': 'aiImport',
  'katalog-produk': 'stockOperations',
  penjualan: 'salesCustomer',
  inventori: 'stockOperations',
  keuangan: 'cashReport',
  pelanggan: 'salesCustomer',
  'laporan-insight': 'cashReport',
  integrasi: 'aiImport',
};

const solutionDashboardMap: Record<string, DashboardVisualKey> = {
  'naikkan-omzet': 'productPerformance',
  'kelola-stok': 'productOperations',
  'pantau-laba-dan-arus-kas': 'productPerformance',
  'pahami-pelanggan': 'productOverview',
  'laporan-bisnis-otomatis': 'productOverview',
};

const solutionContextMap: Record<string, HeroContextVisualKey> = {
  'naikkan-omzet': 'salesCustomer',
  'kelola-stok': 'stockOperations',
  'pantau-laba-dan-arus-kas': 'cashReport',
  'pahami-pelanggan': 'salesCustomer',
  'laporan-bisnis-otomatis': 'cashReport',
};

export const getProductDashboardVisual = (slug: string) => dashboardVisuals[productDashboardMap[slug] || 'productOverview'];
export const getSolutionDashboardVisual = (slug: string) => dashboardVisuals[solutionDashboardMap[slug] || 'ai'];
export const getProductContextVisual = (slug: string) => heroContextVisuals[productContextMap[slug] || 'aiImport'];
export const getSolutionContextVisual = (slug: string) => heroContextVisuals[solutionContextMap[slug] || 'aiImport'];
