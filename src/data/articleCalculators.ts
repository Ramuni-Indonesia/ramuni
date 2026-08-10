import type { CalculatorKey } from './calculators';

const articleCalculatorRegistry = {
  'arus-kas-umkm-ringan': 'arus-kas-bersih',
  'cara-menghitung-titik-impas-usaha': 'titik-impas',
  'cara-menghitung-repeat-customer-rate': 'repeat-customer-rate',
  'cara-menghitung-hpp-usaha-kuliner': 'hpp-per-porsi',
  'cara-menghitung-safety-stock': 'safety-stock',
  'cara-menghitung-harga-jual-produk': 'harga-jual',
  'cara-membaca-penjualan-per-jam': 'penjualan-per-jam',
  'cara-membuat-target-penjualan-harian': 'target-penjualan',
  'cara-mencatat-utang-usaha-ke-supplier': 'saldo-utang-supplier',
  'cara-menghitung-rata-rata-transaksi': 'nilai-transaksi-rata-rata',
} as const satisfies Partial<Record<string, CalculatorKey>>;

export const getArticleCalculator = (articleId: string): CalculatorKey | undefined =>
  articleCalculatorRegistry[articleId as keyof typeof articleCalculatorRegistry];
