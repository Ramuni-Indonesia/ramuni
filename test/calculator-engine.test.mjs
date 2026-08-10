import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateBusinessMetric, shouldUseCautionNote } from '../src/lib/calculatorEngine.mjs';

const regressionCases = [
  ['laba-usaha', { income: 12500000, cost: 8750000 }, 3750000, 'money'],
  ['laba-kotor', { netSales: 6000000, cogs: 3600000 }, 2400000, 'money'],
  ['hpp', { opening: 4000000, purchase: 6500000, closing: 3200000 }, 7300000, 'money'],
  ['reorder-stok', { daily: 18, lead: 4, safety: 25 }, 97, 'unit'],
  ['margin-laba-kotor', { sales: 15000000, cogs: 9750000 }, 35, 'percent'],
  ['laba-setelah-diskon', { normalPrice: 100000, discountPercent: 20, unitCost: 60000, promoCostPerUnit: 2000 }, 18000, 'money'],
  ['titik-impas', { fixed: 3000000, price: 35000, variable: 22000 }, 231, 'unit'],
  ['repeat-customer-rate', { identifiedCustomers: 200, returningCustomers: 70 }, 35, 'percent'],
  ['safety-stock', { maximumDailyUse: 12, maximumLeadTime: 5, averageDailyUse: 10, averageLeadTime: 3 }, 30, 'unit'],
  ['penjualan-per-jam', { netSales: 1800000, operatingHours: 12 }, 150000, 'money'],
  ['konversi-penjualan', { eligibleProspects: 80, completedOutcomes: 20 }, 25, 'percent'],
  ['penjualan-bersih-harian', { grossSales: 2500000, merchantDiscounts: 125000, approvedReturns: 50000 }, 2325000, 'money'],
  ['saldo-utang-supplier', { invoiceAmount: 1500000, allocatedPayment: 500000 }, 1000000, 'money'],
  ['arus-kas-bersih', { cashIn: 9500000, cashOut: 11200000 }, -1700000, 'money'],
  ['nilai-transaksi-rata-rata', { revenue: 18000000, transactions: 420 }, 42857.142857142855, 'money'],
];

for (const [kind, values, expected, format] of regressionCases) {
  test(`keeps the ${kind} formula stable`, () => {
    const result = calculateBusinessMetric(kind, values);
    assert.equal(result.format, format);
    assert.ok(Math.abs(result.value - expected) < 0.001);
  });
}

test('calculates a target selling price from cost and margin', () => {
  const result = calculateBusinessMetric('harga-jual', { unitCost: 25000, targetMargin: 35 });
  assert.equal(result.format, 'money');
  assert.ok(Math.abs(result.value - 38461.53846153846) < 0.001);
});

test('rejects an impossible target margin', () => {
  const result = calculateBusinessMetric('harga-jual', { unitCost: 25000, targetMargin: 100 });
  assert.equal(Number.isFinite(result.value), false);
  assert.equal(shouldUseCautionNote('harga-jual', result.value), true);
});

test('flags a negative gross-profit result for review', () => {
  const result = calculateBusinessMetric('laba-kotor', { netSales: 60000, cogs: 75000 });
  assert.equal(result.value, -15000);
  assert.equal(shouldUseCautionNote('laba-kotor', result.value), true);
});

test('flags a discount scenario with no positive unit contribution', () => {
  const result = calculateBusinessMetric('laba-setelah-diskon', {
    normalPrice: 100000,
    discountPercent: 40,
    unitCost: 60000,
    promoCostPerUnit: 0,
  });
  assert.equal(result.value, 0);
  assert.equal(shouldUseCautionNote('laba-setelah-diskon', result.value), true);
});

test('rejects repeat customer totals that exceed the covered customer count', () => {
  const result = calculateBusinessMetric('repeat-customer-rate', { identifiedCustomers: 20, returningCustomers: 21 });
  assert.equal(Number.isFinite(result.value), false);
  assert.equal(shouldUseCautionNote('repeat-customer-rate', result.value), true);
});

test('rejects conversion outcomes that exceed eligible prospects', () => {
  const result = calculateBusinessMetric('konversi-penjualan', { eligibleProspects: 20, completedOutcomes: 21 });
  assert.equal(Number.isFinite(result.value), false);
  assert.equal(shouldUseCautionNote('konversi-penjualan', result.value), true);
});

test('flags a safety stock result that does not leave a positive buffer', () => {
  const result = calculateBusinessMetric('safety-stock', { maximumDailyUse: 10, maximumLeadTime: 3, averageDailyUse: 10, averageLeadTime: 3 });
  assert.equal(result.value, 0);
  assert.equal(shouldUseCautionNote('safety-stock', result.value), true);
});

test('flags a daily sales result that is negative after deductions', () => {
  const result = calculateBusinessMetric('penjualan-bersih-harian', {
    grossSales: 100000,
    merchantDiscounts: 60000,
    approvedReturns: 50000,
  });
  assert.equal(result.value, -10000);
  assert.equal(shouldUseCautionNote('penjualan-bersih-harian', result.value), true);
});

test('flags an invoice payment that exceeds its invoice value', () => {
  const result = calculateBusinessMetric('saldo-utang-supplier', { invoiceAmount: 100000, allocatedPayment: 120000 });
  assert.equal(result.value, -20000);
  assert.equal(shouldUseCautionNote('saldo-utang-supplier', result.value), true);
});

test('calculates revenue change as a percentage', () => {
  const result = calculateBusinessMetric('perubahan-omzet', { previousRevenue: 12000000, currentRevenue: 13800000 });
  assert.equal(result.format, 'percent');
  assert.equal(result.value, 15);
});

test('calculates simple cost per sellable portion', () => {
  const result = calculateBusinessMetric('hpp-per-porsi', {
    ingredientCost: 180000,
    packagingCost: 40000,
    directCost: 30000,
    sellablePortions: 50,
  });
  assert.deepEqual(result, { value: 5000, format: 'money' });
});

test('rounds sales targets up to a whole transaction', () => {
  const result = calculateBusinessMetric('target-penjualan', { revenueTarget: 10000000, averageTransaction: 85000 });
  assert.deepEqual(result, { value: 118, format: 'unit', suffix: 'transaksi' });
});
