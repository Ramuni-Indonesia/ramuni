export type ProductScreen = {
  src: string;
  tabletSrc?: string;
  mobileSrc?: string;
  width: number;
  height: number;
  mobileWidth?: number;
  mobileHeight?: number;
  tabletWidth?: number;
  tabletHeight?: number;
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
    src: '/website-original/product-screens/saas-e2e/full/desktop/home--desktop.webp',
    width: 846,
    height: 1400,
    tabletSrc: '/website-original/product-screens/saas-e2e/full/tablet/home--tablet.webp',
    tabletWidth: 571,
    tabletHeight: 1800,
    mobileSrc: '/website-original/product-screens/saas-e2e/full/mobile/home--mobile.webp',
    mobileWidth: 560,
    mobileHeight: 3177,
    alt: 'Capture dashboard RAMUNI terbaru dengan aktivasi workspace, metrik keuangan, kesehatan data, aktivitas, dan prioritas operasional.',
    eyebrow: 'Ringkasan usaha',
    title: 'Ringkasan usaha yang benar-benar dipakai.',
    note: 'Capture dashboard penuh dari workspace E2E RAMUNI; angka pada layar adalah data demo terkontrol.',
  },
  sales: {
    src: '/website-original/product-screens/saas-e2e/full/desktop/sales-omnichannel-orders--desktop.webp',
    width: 1440,
    height: 1004,
    tabletSrc: '/website-original/product-screens/saas-e2e/full/tablet/sales-omnichannel-orders--tablet.webp',
    tabletWidth: 900,
    tabletHeight: 877,
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
    tabletSrc: '/website-original/product-screens/saas-e2e/full/tablet/finance-statements--tablet.webp',
    tabletWidth: 900,
    tabletHeight: 675,
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
    tabletSrc: '/website-original/product-screens/saas-e2e/full/tablet/inventory-alerts--tablet.webp',
    tabletWidth: 900,
    tabletHeight: 675,
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
    tabletSrc: '/website-original/product-screens/saas-e2e/full/tablet/ai--tablet.webp',
    tabletWidth: 900,
    tabletHeight: 1505,
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
    tabletSrc: '/website-original/product-screens/saas-e2e/full/tablet/customers--tablet.webp',
    tabletWidth: 900,
    tabletHeight: 675,
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
    tabletSrc: '/website-original/product-screens/saas-e2e/full/tablet/reports--tablet.webp',
    tabletWidth: 900,
    tabletHeight: 675,
    mobileSrc: '/website-original/product-screens/saas-e2e/full/mobile/reports--mobile.webp',
    mobileWidth: 600,
    mobileHeight: 1298,
    alt: 'Tampilan RAMUNI untuk membaca ringkasan laporan berdasarkan periode dan sumber data.',
    eyebrow: 'Laporan & Insight',
    title: 'Ringkasan yang siap dibuka ulang.',
    note: 'Capture route laporan dari workspace E2E RAMUNI; angka pada layar adalah data demo terkontrol.',
  },
} satisfies Record<string, ProductScreen>;
