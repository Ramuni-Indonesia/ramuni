export type ProductScreen = {
  src: string;
  /** Optional Drive-provided laptop composite. When present, it is shown as-is. */
  driveSrc?: string;
  driveWidth?: number;
  driveHeight?: number;
  mobileSrc?: string;
  width: number;
  height: number;
  mobileWidth?: number;
  mobileHeight?: number;
  alt: string;
  eyebrow: string;
  title: string;
  note: string;
};

/**
 * Product evidence used by the money-site. The full dashboard is reserved for
 * overview contexts; the supporting screens keep each route visually tied to
 * the job it describes instead of repeating one generic preview everywhere.
 */
export const productScreens = {
  overview: {
    src: '/website-original/product-screens/ramuni-saas-dashboard-desktop-1440.webp',
    width: 1440,
    height: 1202,
    mobileSrc: '/website-original/product-screens/ramuni-saas-dashboard-real-mobile-pixel7.webp',
    mobileWidth: 720,
    mobileHeight: 4299,
    alt: 'Tampilan ringkasan dashboard RAMUNI dengan penjualan, kas, produk aktif, pelanggan, arus kas, aktivitas, dan wawasan.',
    eyebrow: 'Ringkasan usaha',
    title: 'Ringkasan usaha yang benar-benar dipakai.',
    note: 'Capture dashboard penuh dari workspace E2E RAMUNI; angka pada layar adalah data demo terkontrol.',
  },
  sales: {
    src: '/website-original/product-screens/saas-e2e/full/desktop/sales-omnichannel-orders--desktop.webp',
    width: 1440,
    height: 1004,
    mobileSrc: '/website-original/product-screens/saas-e2e/full/mobile/sales-omnichannel-orders--mobile.webp',
    mobileWidth: 600,
    mobileHeight: 2382,
    alt: 'Tampilan RAMUNI untuk membaca perubahan penjualan dan pola pelanggan dari transaksi yang masuk.',
    eyebrow: 'Penjualan dan pelanggan',
    title: 'Hubungkan transaksi dengan pelanggan yang kembali.',
    note: 'Capture route penjualan dari workspace E2E RAMUNI; angka pada layar adalah data demo terkontrol.',
  },
  finance: {
    src: '/website-original/product-screens/saas-e2e/full/desktop/finance-statements--desktop.webp',
    width: 1100,
    height: 688,
    mobileSrc: '/website-original/product-screens/saas-e2e/full/mobile/finance-statements--mobile.webp',
    mobileWidth: 600,
    mobileHeight: 1551,
    alt: 'Tampilan RAMUNI yang merangkum arus kas, biaya, dan perubahan keuangan dalam satu periode.',
    eyebrow: 'Keuangan',
    title: 'Baca kas, biaya, dan margin pada periode yang sama.',
    note: 'Capture route laporan keuangan dari workspace E2E RAMUNI; angka pada layar adalah data demo terkontrol.',
  },
  inventory: {
    src: '/website-original/product-screens/saas-e2e/full/desktop/inventory-alerts--desktop.webp',
    width: 1100,
    height: 688,
    mobileSrc: '/website-original/product-screens/saas-e2e/full/mobile/inventory-alerts--mobile.webp',
    mobileWidth: 600,
    mobileHeight: 1298,
    alt: 'Tampilan RAMUNI untuk memeriksa saldo stok dan prioritas reorder sebelum barang habis.',
    eyebrow: 'Inventori',
    title: 'Prioritaskan SKU sebelum stok kosong.',
    note: 'Capture route alert inventori dari workspace E2E RAMUNI; angka pada layar adalah data demo terkontrol.',
  },
  ai: {
    src: '/website-original/product-screens/saas-e2e/full/desktop/ai--desktop.webp',
    width: 1100,
    height: 875,
    mobileSrc: '/website-original/product-screens/saas-e2e/full/mobile/ai--mobile.webp',
    mobileWidth: 600,
    mobileHeight: 3146,
    alt: 'Tampilan RAMUNI yang menunjukkan pertanyaan AI, sumber jawaban, dan pemeriksaan manual berikutnya.',
    eyebrow: 'Asisten AI',
    title: 'Lihat sumber jawaban sebelum mengikuti saran.',
    note: 'Capture route Asisten AI dari workspace E2E RAMUNI; jawaban tetap perlu diverifikasi.',
  },
  customers: {
    src: '/website-original/product-screens/saas-e2e/full/desktop/customers--desktop.webp',
    width: 1100,
    height: 688,
    mobileSrc: '/website-original/product-screens/saas-e2e/full/mobile/customers--mobile.webp',
    mobileWidth: 600,
    mobileHeight: 1298,
    alt: 'Tampilan RAMUNI untuk membaca riwayat pelanggan dan pola pembelian yang tersedia.',
    eyebrow: 'Pelanggan',
    title: 'Riwayat pelanggan yang dapat ditelusuri.',
    note: 'Capture route pelanggan dari workspace E2E RAMUNI; angka pada layar adalah data demo terkontrol.',
  },
  reports: {
    src: '/website-original/product-screens/saas-e2e/full/desktop/reports--desktop.webp',
    width: 1440,
    height: 900,
    mobileSrc: '/website-original/product-screens/saas-e2e/full/mobile/reports--mobile.webp',
    mobileWidth: 600,
    mobileHeight: 1298,
    alt: 'Tampilan RAMUNI untuk membaca ringkasan laporan berdasarkan periode dan sumber data.',
    eyebrow: 'Laporan & Insight',
    title: 'Ringkasan yang siap dibuka ulang.',
    note: 'Capture route laporan dari workspace E2E RAMUNI; angka pada layar adalah data demo terkontrol.',
  },
  operations: {
    src: '/website-original/product-screens/ramuni-product-dashboard-operations.webp',
    width: 1280,
    height: 854,
    alt: 'Tampilan RAMUNI yang merangkum aktivitas transaksi, pembaruan stok, dan pengeluaran usaha.',
    eyebrow: 'Aktivitas operasional',
    title: 'Telusuri transaksi, stok, dan biaya dari satu alur.',
    note: 'Visual evidence produk RAMUNI untuk konteks operasional.',
  },
  performance: {
    src: '/website-original/product-screens/ramuni-product-dashboard-performance.webp',
    width: 1280,
    height: 854,
    alt: 'Tampilan dashboard RAMUNI dengan indikator penjualan, kas, produk aktif, dan grafik arus kas tujuh hari.',
    eyebrow: 'Performa',
    title: 'Bandingkan arah penjualan dan arus kas.',
    note: 'Visual evidence produk RAMUNI untuk membaca performa.',
  },
} satisfies Record<string, ProductScreen>;

export const productScreenSets = {
  overview: [productScreens.overview, productScreens.sales],
  operations: [productScreens.operations, productScreens.inventory, productScreens.sales],
  performance: [productScreens.performance, productScreens.finance, productScreens.ai],
} as const;
