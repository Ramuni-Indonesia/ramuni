import type { CalculatorKey } from './calculators';

const articleCalculatorRegistry = {
  'arus-kas-umkm-ringan': 'arus-kas-bersih',
  'cara-menghitung-titik-impas-usaha': 'titik-impas',
  'cara-menghitung-repeat-customer-rate': 'repeat-customer-rate',
  'cara-menghitung-hpp-usaha-kuliner': 'hpp-per-porsi',
  'cara-menghitung-safety-stock': 'safety-stock',
  'cara-menghitung-harga-jual-produk': 'harga-jual',
  'cara-membaca-penjualan-per-jam': 'penjualan-per-jam',
} as const satisfies Partial<Record<string, CalculatorKey>>;

export const getArticleCalculator = (articleId: string): CalculatorKey | undefined =>
  articleCalculatorRegistry[articleId as keyof typeof articleCalculatorRegistry];
