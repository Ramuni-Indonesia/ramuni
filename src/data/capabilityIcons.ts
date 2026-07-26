type CapabilityFamily = 'product' | 'solution';

const capabilityIconPaths: Record<string, string> = {
  'product-asisten-ai': '/website-original/icons/ramuni-icon-product-asisten-ai.webp',
  'product-dashboard-bisnis': '/website-original/icons/ramuni-icon-product-dashboard-bisnis.webp',
  'product-katalog-produk': '/website-original/icons/ramuni-icon-product-katalog-produk.webp',
  'product-penjualan': '/website-original/icons/ramuni-icon-product-penjualan.webp',
  'product-inventori': '/website-original/icons/ramuni-icon-product-inventori.webp',
  'product-keuangan': '/website-original/icons/ramuni-icon-product-keuangan.webp',
  'product-pelanggan': '/website-original/icons/ramuni-icon-product-pelanggan.webp',
  'product-laporan-insight': '/website-original/icons/ramuni-icon-product-laporan-insight.webp',
  'product-integrasi': '/website-original/icons/ramuni-icon-product-integrasi.webp',
  'solution-naikkan-omzet': '/website-original/icons/ramuni-icon-solution-naikkan-omzet.webp',
  'solution-kelola-stok': '/website-original/icons/ramuni-icon-solution-kelola-stok.webp',
};

export function capabilityIconAttributes(family: CapabilityFamily, slug: string) {
  const key = `${family}-${slug}`;
  return capabilityIconPaths[key] ? { 'data-capability-icon': key } : {};
}
