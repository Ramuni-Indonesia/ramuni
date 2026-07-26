import type { CalculatorKey } from './calculators';

const articleCalculatorRegistry = {
  'arus-kas-umkm-ringan': 'laba-usaha',
  'panduan-membaca-stok-harian': 'reorder-stok',
} as const satisfies Partial<Record<string, CalculatorKey>>;

export const getArticleCalculator = (articleId: string): CalculatorKey | undefined =>
  articleCalculatorRegistry[articleId as keyof typeof articleCalculatorRegistry];
