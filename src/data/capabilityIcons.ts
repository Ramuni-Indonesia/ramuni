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

const navigationIconKeys: Record<string, string> = {
  '/produk': 'product-katalog-produk',
  '/solusi/pantau-laba-dan-arus-kas': 'nav-solution-cash',
  '/solusi/pahami-pelanggan': 'nav-solution-customer',
  '/solusi/laporan-bisnis-otomatis': 'nav-solution-report',
  '/industri/retail': 'nav-industry-retail',
  '/industri/fnb': 'nav-industry-food',
  '/industri/distributor': 'nav-industry-distributor',
  '/industri/reseller-online': 'nav-industry-online',
  '/industri/jasa': 'nav-industry-service',
  '/industri/manufaktur-kecil': 'nav-industry-production',
  '/untuk/pemilik-usaha': 'nav-role-owner',
  '/untuk/admin-toko': 'nav-role-admin',
  '/untuk/kasir': 'nav-role-cashier',
  '/untuk/supervisor': 'nav-role-supervisor',
  '/blog': 'nav-resource-article',
  '/panduan': 'nav-resource-guide',
  '/kamus-bisnis': 'nav-resource-glossary',
  '/template': 'nav-resource-template',
  '/kalkulator/laba-usaha': 'nav-tool-profit',
  '/kalkulator/hpp': 'nav-tool-cost',
  '/kalkulator/reorder-stok': 'nav-tool-reorder',
  '/bantuan': 'nav-resource-help',
  '/keamanan': 'nav-resource-security',
};

export function capabilityIconAttributes(family: CapabilityFamily, slug: string) {
  const key = `${family}-${slug}`;
  return capabilityIconPaths[key] ? { 'data-capability-icon': key } : {};
}

export function navigationIconAttributes(href: string) {
  const normalizedHref = href.split(/[?#]/, 1)[0].replace(/\/$/, '') || '/';
  const directKey = navigationIconKeys[normalizedHref];
  if (directKey) return { 'data-capability-icon': directKey };

  const capabilityMatch = normalizedHref.match(/^\/(produk|solusi)\/([^/]+)$/);
  if (!capabilityMatch) return {};
  return capabilityIconAttributes(capabilityMatch[1] === 'produk' ? 'product' : 'solution', capabilityMatch[2]);
}
