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
    mobileSrc: '/website-original/product-screens/ramuni-saas-dashboard-real-mobile-pixel7.webp',
    mobileWidth: 720,
    mobileHeight: 4299,
    alt: 'Tampilan ringkasan dashboard RAMUNI dengan penjualan, kas, produk aktif, pelanggan, arus kas, aktivitas, dan wawasan.',
    eyebrow: 'Ringkasan usaha',
    title: 'Ringkasan usaha yang benar-benar dipakai.',
    note: 'Screenshot produk SaaS RAMUNI dari evidence dashboard.',
  },
  performance: {
    src: '/website-original/product-screens/ramuni-saas-dashboard-desktop-1440.webp',
    width: 1440,
    height: 1202,
    mobileSrc: '/website-original/product-screens/ramuni-saas-dashboard-real-mobile-pixel7.webp',
    mobileWidth: 720,
    mobileHeight: 4299,
    alt: 'Tampilan dashboard RAMUNI dengan indikator penjualan, kas, produk aktif, dan grafik arus kas tujuh hari.',
    eyebrow: 'Performa',
    title: 'Bandingkan arah penjualan dan arus kas.',
    note: 'Potongan screenshot produk SaaS RAMUNI untuk membaca performa.',
  },
  operations: {
    src: '/website-original/product-screens/ramuni-saas-dashboard-desktop-1440.webp',
    width: 1440,
    height: 1202,
    mobileSrc: '/website-original/product-screens/ramuni-saas-dashboard-real-mobile-pixel7.webp',
    mobileWidth: 720,
    mobileHeight: 4299,
    alt: 'Tampilan aktivitas operasional RAMUNI dengan pembayaran, pembaruan stok, dan pengeluaran usaha.',
    eyebrow: 'Aktivitas operasional',
    title: 'Telusuri transaksi, stok, dan biaya.',
    note: 'Potongan screenshot produk SaaS RAMUNI untuk membaca aktivitas.',
  },
} satisfies Record<string, ProductScreen>;

export const productScreenSets = {
  overview: [productScreens.overview],
  operations: [productScreens.overview],
  performance: [productScreens.overview],
} as const;
