/**
 * Visual direction for the money-site refresh.
 *
 * Real product captures remain the source of truth for proof sections. These
 * boards are intentionally labelled as concept visuals: they are Codex-made
 * editorial compositions based on the same RAMUNI workflows, not screenshots
 * of a customer's workspace. Keeping the registry separate makes it harder to
 * accidentally use a concept board where a factual product capture is needed.
 */
export type VisualRefreshAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
  label: string;
  note: string;
};

export const visualRefresh = {
  aiEvidenceBoard: {
    src: '/website-original/dashboards/ramuni-dashboard-ai-evidence.webp',
    width: 1280,
    height: 720,
    alt: 'Visual konsep RAMUNI yang memperlihatkan pertanyaan usaha, sumber data, dan langkah pemeriksaan AI.',
    label: 'Visual konsep · Asisten AI',
    note: 'Komposisi editorial berbasis alur RAMUNI; bukan capture workspace live.',
  },
  stockOperationsBoard: {
    src: '/website-original/dashboards/ramuni-dashboard-inventory-reorder.webp',
    width: 1280,
    height: 720,
    alt: 'Visual konsep RAMUNI yang memperlihatkan SKU, saldo stok, dan prioritas isi ulang.',
    label: 'Visual konsep · Operasional stok',
    note: 'Komposisi editorial berbasis alur inventori; bukan capture workspace live.',
  },
  cashFlowBoard: {
    src: '/website-original/dashboards/ramuni-dashboard-cash-flow.webp',
    width: 1280,
    height: 720,
    alt: 'Visual konsep RAMUNI yang memperlihatkan arus kas, biaya, dan perubahan periode.',
    label: 'Visual konsep · Arus kas',
    note: 'Komposisi editorial berbasis alur keuangan; bukan capture workspace live.',
  },
  salesCustomerBoard: {
    src: '/website-original/dashboards/ramuni-dashboard-sales-customer.webp',
    width: 1280,
    height: 720,
    alt: 'Visual konsep RAMUNI yang memperlihatkan penjualan, pelanggan, dan status tindak lanjut.',
    label: 'Visual konsep · Penjualan & pelanggan',
    note: 'Komposisi editorial berbasis alur penjualan; bukan capture workspace live.',
  },
} as const satisfies Record<string, VisualRefreshAsset>;

export type VisualRefreshKey = keyof typeof visualRefresh;
