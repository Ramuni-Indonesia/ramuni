export type CalculatorKey = 'laba-usaha' | 'hpp' | 'reorder-stok';

export interface CalculatorField {
  name: string;
  label: string;
  unit: string;
}

export interface CalculatorDefinition {
  title: string;
  shortTitle: string;
  decision: string;
  formula: string;
  fields: CalculatorField[];
}

export const calculators: Record<CalculatorKey, CalculatorDefinition> = {
  'laba-usaha': {
    title: 'Kalkulator Laba Usaha',
    shortTitle: 'Periksa laba sederhana',
    decision: 'Hitung selisih pendapatan dan biaya dalam satu periode.',
    formula: 'Laba = Pendapatan - Biaya',
    fields: [
      { name: 'income', label: 'Pendapatan', unit: 'Rp' },
      { name: 'cost', label: 'Total biaya', unit: 'Rp' },
    ],
  },
  hpp: {
    title: 'Kalkulator HPP Sederhana',
    shortTitle: 'Periksa HPP sederhana',
    decision: 'Perkirakan biaya barang yang terjual dalam satu periode.',
    formula: 'HPP = Stok awal + Pembelian - Stok akhir',
    fields: [
      { name: 'opening', label: 'Stok awal', unit: 'Rp' },
      { name: 'purchase', label: 'Pembelian', unit: 'Rp' },
      { name: 'closing', label: 'Stok akhir', unit: 'Rp' },
    ],
  },
  'reorder-stok': {
    title: 'Kalkulator Titik Reorder',
    shortTitle: 'Periksa titik pesan ulang',
    decision: 'Perkirakan batas stok untuk mulai memeriksa pemesanan.',
    formula: 'Titik reorder = Pemakaian harian x Lead time + Stok pengaman',
    fields: [
      { name: 'daily', label: 'Pemakaian rata-rata', unit: 'unit/hari' },
      { name: 'lead', label: 'Lead time', unit: 'hari' },
      { name: 'safety', label: 'Stok pengaman', unit: 'unit' },
    ],
  },
};

export const calculatorEntries = Object.entries(calculators) as [CalculatorKey, CalculatorDefinition][];
