export const dashboardVisuals = {
  productOverview: {
    type: 'product-screenshot',
    // This is the latest authenticated workspace capture. The previous
    // 1440px export is intentionally not used here: it predates activation,
    // AI Companion, saved reports, and the current data-health surfaces.
    src: '/website-original/product-screens/saas-e2e/full/desktop/home--desktop.webp',
    tabletSrc: '/website-original/product-screens/saas-e2e/full/tablet/home--tablet.webp',
    mobileSrc: '/website-original/product-screens/saas-e2e/full/mobile/home--mobile.webp',
    width: 846,
    height: 1400,
    tabletWidth: 571,
    tabletHeight: 1800,
    mobileWidth: 560,
    mobileHeight: 3177,
    alt: 'Capture dashboard RAMUNI terbaru dengan aktivasi workspace, metrik keuangan, kesehatan data, aktivitas, dan prioritas operasional.',
    badge: 'Capture dashboard terbaru',
  },
  productPerformance: {
    type: 'product-screenshot',
    src: '/website-original/product-screens/saas-e2e/full/desktop/reports--desktop.webp',
    tabletSrc: '/website-original/product-screens/saas-e2e/full/tablet/reports--tablet.webp',
    mobileSrc: '/website-original/product-screens/saas-e2e/full/mobile/reports--mobile.webp',
    width: 1440,
    height: 900,
    tabletWidth: 900,
    tabletHeight: 675,
    mobileWidth: 600,
    mobileHeight: 1298,
    alt: 'Capture laporan RAMUNI dengan ringkasan periode dan tindak lanjut yang terlihat.',
    badge: 'Capture laporan',
  },
  productOperations: {
    type: 'product-screenshot',
    src: '/website-original/product-screens/saas-e2e/full/desktop/inventory-alerts--desktop.webp',
    tabletSrc: '/website-original/product-screens/saas-e2e/full/tablet/inventory-alerts--tablet.webp',
    mobileSrc: '/website-original/product-screens/saas-e2e/full/mobile/inventory-alerts--mobile.webp',
    width: 1100,
    height: 688,
    tabletWidth: 900,
    tabletHeight: 675,
    mobileWidth: 600,
    mobileHeight: 1298,
    alt: 'Capture alert inventori RAMUNI dengan SKU dan stok yang perlu diperiksa.',
    badge: 'Capture inventori',
  },
  // Route-specific evidence keeps product and solution pages from showing
  // one generic dashboard for every job. These files are the verified full
  // captures from the isolated SaaS workspace.
  productAI: {
    type: 'product-screenshot',
    src: '/website-original/product-screens/saas-e2e/full/desktop/ai--desktop.webp',
    tabletSrc: '/website-original/product-screens/saas-e2e/full/tablet/ai--tablet.webp',
    mobileSrc: '/website-original/product-screens/saas-e2e/full/mobile/ai--mobile.webp',
    width: 1100,
    height: 875,
    tabletWidth: 900,
    tabletHeight: 1505,
    mobileWidth: 600,
    mobileHeight: 3146,
    alt: 'Capture Asisten AI RAMUNI dengan pertanyaan, jawaban, dan sumber yang dapat diperiksa.',
    badge: 'Capture Asisten AI',
  },
  productSales: {
    type: 'product-screenshot',
    src: '/website-original/product-screens/saas-e2e/full/desktop/sales-omnichannel-orders--desktop.webp',
    tabletSrc: '/website-original/product-screens/saas-e2e/full/tablet/sales-omnichannel-orders--tablet.webp',
    mobileSrc: '/website-original/product-screens/saas-e2e/full/mobile/sales-omnichannel-orders--mobile.webp',
    width: 1440,
    height: 1004,
    tabletWidth: 900,
    tabletHeight: 877,
    mobileWidth: 600,
    mobileHeight: 2382,
    alt: 'Capture area penjualan RAMUNI dengan pesanan dan status pembayaran yang dapat ditelusuri.',
    badge: 'Capture Penjualan',
  },
  productInventory: {
    type: 'product-screenshot',
    src: '/website-original/product-screens/saas-e2e/full/desktop/inventory-alerts--desktop.webp',
    tabletSrc: '/website-original/product-screens/saas-e2e/full/tablet/inventory-alerts--tablet.webp',
    mobileSrc: '/website-original/product-screens/saas-e2e/full/mobile/inventory-alerts--mobile.webp',
    width: 1100,
    height: 688,
    tabletWidth: 900,
    tabletHeight: 675,
    mobileWidth: 600,
    mobileHeight: 1298,
    alt: 'Capture alert inventori RAMUNI dengan SKU dan stok yang perlu diperiksa.',
    badge: 'Capture Inventori',
  },
  productFinance: {
    type: 'product-screenshot',
    src: '/website-original/product-screens/saas-e2e/full/desktop/finance-statements--desktop.webp',
    tabletSrc: '/website-original/product-screens/saas-e2e/full/tablet/finance-statements--tablet.webp',
    mobileSrc: '/website-original/product-screens/saas-e2e/full/mobile/finance-statements--mobile.webp',
    width: 1100,
    height: 688,
    tabletWidth: 900,
    tabletHeight: 675,
    mobileWidth: 600,
    mobileHeight: 1551,
    alt: 'Capture laporan keuangan RAMUNI dengan periode dan ringkasan yang dapat diperiksa.',
    badge: 'Capture Keuangan',
  },
  productCustomers: {
    type: 'product-screenshot',
    src: '/website-original/product-screens/saas-e2e/full/desktop/customers--desktop.webp',
    tabletSrc: '/website-original/product-screens/saas-e2e/full/tablet/customers--tablet.webp',
    mobileSrc: '/website-original/product-screens/saas-e2e/full/mobile/customers--mobile.webp',
    width: 1100,
    height: 688,
    tabletWidth: 900,
    tabletHeight: 675,
    mobileWidth: 600,
    mobileHeight: 1298,
    alt: 'Capture area pelanggan RAMUNI dengan riwayat dan segmen yang tersedia.',
    badge: 'Capture Pelanggan',
  },
  productReports: {
    type: 'product-screenshot',
    src: '/website-original/product-screens/saas-e2e/full/desktop/reports--desktop.webp',
    tabletSrc: '/website-original/product-screens/saas-e2e/full/tablet/reports--tablet.webp',
    mobileSrc: '/website-original/product-screens/saas-e2e/full/mobile/reports--mobile.webp',
    width: 1440,
    height: 900,
    tabletWidth: 900,
    tabletHeight: 675,
    mobileWidth: 600,
    mobileHeight: 1298,
    alt: 'Capture laporan RAMUNI dengan ringkasan periode dan tindak lanjut yang terlihat.',
    badge: 'Capture Laporan',
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
  'asisten-ai': 'productAI',
  'dashboard-bisnis': 'productOverview',
  'katalog-produk': 'productInventory',
  penjualan: 'productSales',
  inventori: 'productInventory',
  keuangan: 'productFinance',
  pelanggan: 'productCustomers',
  'laporan-insight': 'productReports',
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
  'naikkan-omzet': 'productSales',
  'kelola-stok': 'productInventory',
  'pantau-laba-dan-arus-kas': 'productFinance',
  'pahami-pelanggan': 'productCustomers',
  'laporan-bisnis-otomatis': 'productReports',
};

const solutionContextMap: Record<string, HeroContextVisualKey> = {
  'naikkan-omzet': 'salesCustomer',
  'kelola-stok': 'stockOperations',
  'pantau-laba-dan-arus-kas': 'cashReport',
  'pahami-pelanggan': 'salesCustomer',
  'laporan-bisnis-otomatis': 'cashReport',
};

export const getProductDashboardVisual = (slug: string) => dashboardVisuals[productDashboardMap[slug] || 'productOverview'];
export const getSolutionDashboardVisual = (slug: string) => dashboardVisuals[solutionDashboardMap[slug] || 'productOverview'];
export const getProductContextVisual = (slug: string) => heroContextVisuals[productContextMap[slug] || 'aiImport'];
export const getSolutionContextVisual = (slug: string) => heroContextVisuals[solutionContextMap[slug] || 'aiImport'];
