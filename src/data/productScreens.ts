export type ProductScreen = {
  src: string;
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

export const productScreens = {
  overview: {
    src: '/website-original/product-screens/ramuni-saas-dashboard-desktop-1440.webp',
    width: 1440,
    height: 1202,
    mobileSrc: '/website-original/product-screens/ramuni-product-dashboard-mobile.webp',
    mobileWidth: 1024,
    mobileHeight: 683,
    alt: 'Tampilan ringkasan dashboard RAMUNI dengan penjualan, kas, produk aktif, pelanggan, arus kas, aktivitas, dan wawasan.',
    eyebrow: 'Ringkasan usaha',
    title: 'Satu layar untuk melihat perubahan penting.',
    note: 'Contoh tampilan produk dengan data demo.',
  },
  performance: {
    src: '/website-original/product-screens/ramuni-product-dashboard-performance.webp',
    width: 1280,
    height: 854,
    mobileSrc: '/website-original/product-screens/ramuni-product-dashboard-mobile.webp',
    mobileWidth: 1024,
    mobileHeight: 683,
    alt: 'Tampilan dashboard RAMUNI dengan indikator penjualan, kas, produk aktif, dan grafik arus kas tujuh hari.',
    eyebrow: 'Performa',
    title: 'Bandingkan arah penjualan dan arus kas.',
    note: 'Metrik ditampilkan untuk menjelaskan cara membaca dashboard.',
  },
  operations: {
    src: '/website-original/product-screens/ramuni-product-dashboard-operations.webp',
    width: 1280,
    height: 854,
    mobileSrc: '/website-original/product-screens/ramuni-product-dashboard-mobile.webp',
    mobileWidth: 1024,
    mobileHeight: 683,
    alt: 'Tampilan aktivitas operasional RAMUNI dengan pembayaran, pembaruan stok, dan pengeluaran usaha.',
    eyebrow: 'Aktivitas operasional',
    title: 'Telusuri transaksi, stok, dan biaya.',
    note: 'Contoh aktivitas untuk menunjukkan jalur pemeriksaan.',
  },
} satisfies Record<string, ProductScreen>;

export const productScreenSets = {
  overview: [productScreens.overview, productScreens.performance, productScreens.operations],
  operations: [productScreens.operations, productScreens.overview, productScreens.performance],
  performance: [productScreens.performance, productScreens.overview, productScreens.operations],
} as const;
