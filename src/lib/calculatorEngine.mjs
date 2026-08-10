/** @typedef {{ value: number, format: 'money' | 'percent' | 'unit' | 'number', suffix?: string }} CalculatorResult */

/** @param {number} value @returns {CalculatorResult} */
const money = (value) => ({ value, format: 'money' });
/** @param {number} value @returns {CalculatorResult} */
const percent = (value) => ({ value, format: 'percent' });
/** @param {number} value @param {string} [suffix] @returns {CalculatorResult} */
const unit = (value, suffix = 'unit') => ({ value, format: 'unit', suffix });

/**
 * Browser-only calculator engine. The function never stores or transmits input
 * values; callers receive only the computed result and display format.
 * @param {string | undefined} kind
 * @param {Record<string, number>} values
 * @returns {CalculatorResult}
 */
export const calculateBusinessMetric = (kind, values) => {
  switch (kind) {
    case 'laba-usaha':
      return money(values.income - values.cost);
    case 'laba-kotor':
      return money(values.netSales >= 0 && values.cogs >= 0 ? values.netSales - values.cogs : Number.NaN);
    case 'hpp':
      return money(values.opening + values.purchase - values.closing);
    case 'reorder-stok':
      return unit(values.daily * values.lead + values.safety);
    case 'margin-laba-kotor':
      return percent(values.sales > 0 ? ((values.sales - values.cogs) / values.sales) * 100 : Number.NaN);
    case 'laba-setelah-diskon':
      return money(values.normalPrice >= 0 && values.discountPercent >= 0 && values.discountPercent <= 100
        && values.unitCost >= 0 && values.promoCostPerUnit >= 0
        ? (values.normalPrice * (1 - (values.discountPercent / 100))) - values.unitCost - values.promoCostPerUnit
        : Number.NaN);
    case 'titik-impas':
      return unit(values.price > values.variable ? Math.ceil(values.fixed / (values.price - values.variable)) : Number.NaN);
    case 'repeat-customer-rate':
      return percent(values.identifiedCustomers > 0 && values.returningCustomers >= 0 && values.returningCustomers <= values.identifiedCustomers
        ? (values.returningCustomers / values.identifiedCustomers) * 100
        : Number.NaN);
    case 'safety-stock':
      return unit(values.maximumDailyUse > 0 && values.maximumLeadTime > 0 && values.averageDailyUse > 0 && values.averageLeadTime > 0
        ? Math.ceil((values.maximumDailyUse * values.maximumLeadTime) - (values.averageDailyUse * values.averageLeadTime))
        : Number.NaN);
    case 'penjualan-per-jam':
      return money(values.operatingHours > 0 ? values.netSales / values.operatingHours : Number.NaN);
    case 'konversi-penjualan':
      return percent(values.eligibleProspects > 0 && values.completedOutcomes >= 0 && values.completedOutcomes <= values.eligibleProspects
        ? (values.completedOutcomes / values.eligibleProspects) * 100
        : Number.NaN);
    case 'penjualan-bersih-harian':
      return money(values.grossSales >= 0 && values.merchantDiscounts >= 0 && values.approvedReturns >= 0
        ? values.grossSales - values.merchantDiscounts - values.approvedReturns
        : Number.NaN);
    case 'saldo-utang-supplier':
      return money(values.invoiceAmount >= 0 && values.allocatedPayment >= 0 ? values.invoiceAmount - values.allocatedPayment : Number.NaN);
    case 'arus-kas-bersih':
      return money(values.cashIn - values.cashOut);
    case 'nilai-transaksi-rata-rata':
      return money(values.transactions > 0 ? values.revenue / values.transactions : Number.NaN);
    case 'harga-jual':
      return money(values.unitCost > 0 && values.targetMargin >= 0 && values.targetMargin < 100
        ? values.unitCost / (1 - (values.targetMargin / 100))
        : Number.NaN);
    case 'perubahan-omzet':
      return percent(values.previousRevenue > 0
        ? ((values.currentRevenue - values.previousRevenue) / values.previousRevenue) * 100
        : Number.NaN);
    case 'hpp-per-porsi': {
      const totalCost = values.ingredientCost + values.packagingCost + values.directCost;
      return money(values.sellablePortions > 0 ? totalCost / values.sellablePortions : Number.NaN);
    }
    case 'target-penjualan':
      return unit(values.revenueTarget > 0 && values.averageTransaction > 0
        ? Math.ceil(values.revenueTarget / values.averageTransaction)
        : Number.NaN, 'transaksi');
    default:
      return { value: Number.NaN, format: 'number' };
  }
};

/** @param {string | undefined} kind @param {number} value */
export const shouldUseCautionNote = (kind, value) => !Number.isFinite(value)
  || value < 0
  || (kind === 'laba-setelah-diskon' && value <= 0)
  || ((kind === 'reorder-stok' || kind === 'safety-stock') && value <= 0)
  || (kind === 'konversi-penjualan' && value < 0)
  || (kind === 'saldo-utang-supplier' && value < 0);
