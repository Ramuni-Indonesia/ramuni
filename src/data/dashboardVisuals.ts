export const dashboardVisuals = {
  ai: {
    src: '/website-original/dashboards/ramuni-dashboard-ai-evidence.webp',
    alt: 'Dashboard sintetis yang memperlihatkan jawaban AI, jejak bukti, perbandingan, dan titik persetujuan manusia.',
  },
  inventory: {
    src: '/website-original/dashboards/ramuni-dashboard-inventory-reorder.webp',
    alt: 'Dashboard sintetis untuk membaca saldo stok, pergerakan barang, prioritas pemeriksaan, dan waktu isi ulang.',
  },
  cash: {
    src: '/website-original/dashboards/ramuni-dashboard-cash-flow.webp',
    alt: 'Dashboard sintetis yang memisahkan uang masuk, uang keluar, biaya operasional, dan antrean pemeriksaan.',
  },
  sales: {
    src: '/website-original/dashboards/ramuni-dashboard-sales-customer.webp',
    alt: 'Dashboard sintetis untuk membaca pola penjualan, komposisi produk, riwayat pelanggan, dan tindak lanjut manual.',
  },
} as const;

export type DashboardVisualKey = keyof typeof dashboardVisuals;

const productDashboardMap: Record<string, DashboardVisualKey> = {
  'asisten-ai': 'ai',
  'dashboard-bisnis': 'ai',
  'katalog-produk': 'inventory',
  penjualan: 'sales',
  inventori: 'inventory',
  keuangan: 'cash',
  pelanggan: 'sales',
  'laporan-insight': 'cash',
  integrasi: 'inventory',
};

const solutionDashboardMap: Record<string, DashboardVisualKey> = {
  'naikkan-omzet': 'sales',
  'kelola-stok': 'inventory',
  'pantau-laba-dan-arus-kas': 'cash',
  'pahami-pelanggan': 'sales',
  'laporan-bisnis-otomatis': 'ai',
};

export const getProductDashboardVisual = (slug: string) => dashboardVisuals[productDashboardMap[slug] || 'ai'];
export const getSolutionDashboardVisual = (slug: string) => dashboardVisuals[solutionDashboardMap[slug] || 'ai'];
