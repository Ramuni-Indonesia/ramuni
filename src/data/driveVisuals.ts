/**
 * Approved, optimized exports from the RAMUNI workspace asset library.
 *
 * Keep this registry limited to the WebP files published under
 * `/website-original/marketing/drive/`. The source folder also contains raw
 * screenshots and videos, but those are not page assets and must not leak into
 * marketing templates.
 */

export type DriveVisualKind = 'laptop' | 'card';

export interface DriveVisual {
  readonly kind: DriveVisualKind;
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly note: string;
}

const drivePath = (filename: string) => `/website-original/marketing/drive/${filename}`;

export const driveLaptopVisuals = {
  overview: {
    kind: 'laptop',
    src: drivePath('207shots_so.webp'),
    width: 1600,
    height: 900,
    alt: 'Laptop RAMUNI dengan ringkasan kondisi usaha, metrik utama, dan prioritas berikutnya.',
    eyebrow: 'Ringkasan usaha',
    title: 'Kondisi usaha terlihat sebelum membuka semua detail.',
    note: 'Capture workspace RAMUNI untuk contoh ringkasan; angka pada layar adalah data demo.',
  },
  salesCustomers: {
    kind: 'laptop',
    src: drivePath('35shots_so.webp'),
    width: 1600,
    height: 900,
    alt: 'Laptop RAMUNI dengan alur penjualan dan riwayat pelanggan yang dapat ditelusuri.',
    eyebrow: 'Penjualan & pelanggan',
    title: 'Hubungkan transaksi dengan pelanggan yang kembali.',
    note: 'Capture workspace RAMUNI untuk contoh penjualan dan pelanggan; angka pada layar adalah data demo.',
  },
  inventory: {
    kind: 'laptop',
    src: drivePath('217shots_so.webp'),
    width: 1600,
    height: 900,
    alt: 'Laptop RAMUNI dengan prioritas stok dan pergerakan barang yang perlu diperiksa.',
    eyebrow: 'Inventori',
    title: 'Prioritaskan SKU sebelum stok kosong.',
    note: 'Capture workspace RAMUNI untuk contoh inventori; angka pada layar adalah data demo.',
  },
  posCashier: {
    kind: 'laptop',
    src: drivePath('289shots_so.webp'),
    width: 1600,
    height: 900,
    alt: 'Laptop RAMUNI dengan alur POS dan pekerjaan kasir untuk usaha makanan atau toko.',
    eyebrow: 'POS & kasir',
    title: 'Catat transaksi tanpa kehilangan konteks pekerjaan kasir.',
    note: 'Capture workspace RAMUNI untuk contoh POS; angka pada layar adalah data demo.',
  },
  posPayment: {
    kind: 'laptop',
    src: drivePath('356shots_so.webp'),
    width: 1600,
    height: 900,
    alt: 'Laptop RAMUNI dengan alur pembayaran dan pemeriksaan status transaksi.',
    eyebrow: 'Pembayaran',
    title: 'Status pembayaran dapat diperiksa sebelum ditutup.',
    note: 'Capture workspace RAMUNI untuk contoh pembayaran; angka pada layar adalah data demo.',
  },
  stockTransfer: {
    kind: 'laptop',
    src: drivePath('801shots_so.webp'),
    width: 1600,
    height: 900,
    alt: 'Laptop RAMUNI dengan alur transfer stok dan catatan perpindahan barang.',
    eyebrow: 'Transfer stok',
    title: 'Perpindahan stok meninggalkan jejak yang dapat dibuka kembali.',
    note: 'Capture workspace RAMUNI untuk contoh transfer stok; angka pada layar adalah data demo.',
  },
  promotion: {
    kind: 'laptop',
    src: drivePath('909shots_so.webp'),
    width: 1600,
    height: 900,
    alt: 'Laptop RAMUNI dengan alur pengaturan diskon dan pemeriksaan dampak promosi.',
    eyebrow: 'Promosi & diskon',
    title: 'Periksa aturan diskon sebelum membandingkan hasilnya.',
    note: 'Capture workspace RAMUNI untuk contoh promosi; angka pada layar adalah data demo.',
  },
  finance: {
    kind: 'laptop',
    src: drivePath('990shots_so.webp'),
    width: 1600,
    height: 900,
    alt: 'Laptop RAMUNI dengan ringkasan keuangan, biaya, dan arus kas pada satu periode.',
    eyebrow: 'Keuangan',
    title: 'Baca omzet, biaya, laba, dan kas dengan definisi yang jelas.',
    note: 'Capture workspace RAMUNI untuk contoh keuangan; angka pada layar adalah data demo.',
  },
} as const satisfies Record<string, DriveVisual>;

export type DriveLaptopKey = keyof typeof driveLaptopVisuals;

export const driveCardVisuals = {
  inventoryAlert: {
    kind: 'card',
    src: drivePath('card-1787972978518.webp'),
    width: 1280,
    height: 714,
    alt: 'Card RAMUNI untuk manajemen stok dan inventori dengan SKU yang perlu diperhatikan.',
    eyebrow: 'Inventori',
    title: 'Prioritas stok terlihat sebelum rak kosong.',
    note: 'Card workspace RAMUNI; contoh angka tidak mewakili hasil usaha tertentu.',
  },
  aiAssistant: {
    kind: 'card',
    src: drivePath('card-1787991556793.webp'),
    width: 1280,
    height: 698,
    alt: 'Card Asisten AI RAMUNI dengan pertanyaan bisnis dan sumber jawaban.',
    eyebrow: 'Asisten AI',
    title: 'Tanya kondisi usaha dengan sumber yang jelas.',
    note: 'Card workspace RAMUNI; jawaban tetap perlu diperiksa manusia.',
  },
  profitIntelligence: {
    kind: 'card',
    src: drivePath('card-1787991594833.webp'),
    width: 1280,
    height: 698,
    alt: 'Card Profit Intelligence RAMUNI dengan pendapatan, margin, dan biaya.',
    eyebrow: 'Profit Intelligence',
    title: 'Pisahkan omzet, biaya, margin, dan laba.',
    note: 'Card workspace RAMUNI; angka merupakan data contoh terkontrol.',
  },
  stockPriority: {
    kind: 'card',
    src: drivePath('card-1787991626445.webp'),
    width: 1280,
    height: 698,
    alt: 'Card RAMUNI dengan daftar produk dan prioritas penyesuaian stok.',
    eyebrow: 'Katalog & stok',
    title: 'Samakan identitas produk sebelum membaca performanya.',
    note: 'Card workspace RAMUNI; contoh angka tidak mewakili hasil usaha tertentu.',
  },
  salesSummary: {
    kind: 'card',
    src: drivePath('card-1787991741271.webp'),
    width: 1280,
    height: 698,
    alt: 'Card ringkasan penjualan RAMUNI dengan transaksi dan status pembayaran.',
    eyebrow: 'Penjualan',
    title: 'Perubahan transaksi dapat ditelusuri.',
    note: 'Card workspace RAMUNI; angka merupakan data demo terkontrol.',
  },
  weeklyReport: {
    kind: 'card',
    src: drivePath('card-1787991838265.webp'),
    width: 1280,
    height: 698,
    alt: 'Card laporan mingguan RAMUNI dengan ringkasan dan tindak lanjut.',
    eyebrow: 'Laporan',
    title: 'Ringkasan mingguan siap dibahas bersama tim.',
    note: 'Card workspace RAMUNI; contoh angka tidak mewakili hasil usaha tertentu.',
  },
  dataImport: {
    kind: 'card',
    src: drivePath('card-1787991862762.webp'),
    width: 1280,
    height: 698,
    alt: 'Card integrasi data RAMUNI dengan status validasi file dan SKU.',
    eyebrow: 'Integrasi',
    title: 'Jalur data dan hasil validasi tetap terlihat.',
    note: 'Card workspace RAMUNI; contoh baris digunakan untuk menjelaskan alur.',
  },
  knowledgeOs: {
    kind: 'card',
    src: drivePath('card-1787991972418.webp'),
    width: 1280,
    height: 698,
    alt: 'Card Knowledge OS RAMUNI dengan dokumen dan SOP.',
    eyebrow: 'Knowledge OS',
    title: 'SOP dan keputusan tidak tercecer.',
    note: 'Card workspace RAMUNI; kemampuan mengikuti status rilis yang tercantum.',
  },
  customerInbox: {
    kind: 'card',
    src: drivePath('card-1787991977808.webp'),
    width: 1280,
    height: 698,
    alt: 'Card Inbox dan Pelanggan RAMUNI dengan riwayat dan follow-up.',
    eyebrow: 'Pelanggan',
    title: 'Follow-up berangkat dari riwayat yang tersedia.',
    note: 'Card workspace RAMUNI; tindak lanjut tetap membutuhkan persetujuan manusia.',
  },
  businessPage: {
    kind: 'card',
    src: drivePath('card-1787991984146.webp'),
    width: 1280,
    height: 698,
    alt: 'Card halaman bisnis RAMUNI dengan profil usaha dan jalur kontak.',
    eyebrow: 'Web Builder',
    title: 'Profil usaha tersusun dalam satu halaman.',
    note: 'Card workspace RAMUNI; kemampuan mengikuti status rilis yang tercantum.',
  },
  stockContext: {
    kind: 'card',
    src: drivePath('card-1787992292419.webp'),
    width: 1280,
    height: 698,
    alt: 'Ilustrasi card RAMUNI tentang rak stok dan pergerakan barang.',
    eyebrow: 'Konteks stok',
    title: 'Lihat hubungan antara rak, mutasi, dan kebutuhan restock.',
    note: 'Ilustrasi konteks RAMUNI untuk membantu menjelaskan alur inventori.',
  },
  cashContext: {
    kind: 'card',
    src: drivePath('card-1787992320620.webp'),
    width: 1280,
    height: 698,
    alt: 'Ilustrasi card RAMUNI tentang arus kas, biaya, dan ringkasan keuangan.',
    eyebrow: 'Konteks keuangan',
    title: 'Pisahkan arus uang sebelum membaca hasil usaha.',
    note: 'Ilustrasi konteks RAMUNI; bukan laporan keuangan usaha tertentu.',
  },
  operationsContext: {
    kind: 'card',
    src: drivePath('card-1787992350805.webp'),
    width: 1280,
    height: 698,
    alt: 'Ilustrasi card RAMUNI tentang perangkat kerja operasional usaha.',
    eyebrow: 'Operasional',
    title: 'Pekerjaan harian tetap terhubung dengan catatannya.',
    note: 'Ilustrasi konteks RAMUNI untuk menjelaskan ruang kerja operasional.',
  },
  posContext: {
    kind: 'card',
    src: drivePath('card-1787992404704.webp'),
    width: 1280,
    height: 698,
    alt: 'Ilustrasi card RAMUNI tentang perangkat POS dan pembayaran.',
    eyebrow: 'POS & pembayaran',
    title: 'Transaksi, pembayaran, dan catatan kasir bertemu.',
    note: 'Ilustrasi konteks RAMUNI untuk menjelaskan alur transaksi.',
  },
  teamHandoff: {
    kind: 'card',
    src: drivePath('card-1787992433522.webp'),
    width: 1280,
    height: 698,
    alt: 'Ilustrasi card RAMUNI tentang pembagian peran dan handoff tim.',
    eyebrow: 'Peran tim',
    title: 'Setiap orang melihat pekerjaan sesuai tanggung jawabnya.',
    note: 'Ilustrasi konteks RAMUNI untuk menjelaskan handoff antarperan.',
  },
  insightContext: {
    kind: 'card',
    src: drivePath('card-1787992464612.webp'),
    width: 1280,
    height: 698,
    alt: 'Ilustrasi card RAMUNI tentang insight dan pemeriksaan data.',
    eyebrow: 'Insight',
    title: 'Insight mengarah kembali ke data yang perlu diperiksa.',
    note: 'Ilustrasi konteks RAMUNI; bukan hasil usaha tertentu.',
  },
  workspaceProof: {
    kind: 'card',
    src: drivePath('card-1787992497376.webp'),
    width: 1280,
    height: 698,
    alt: 'Tampilan card workspace RAMUNI dengan ringkasan kondisi bisnis.',
    eyebrow: 'Workspace',
    title: 'Satu ruang kerja untuk catatan, bukti, dan arah.',
    note: 'Capture workspace RAMUNI dengan data demo terkontrol.',
  },
  multiOutlet: {
    kind: 'card',
    src: drivePath('card-1787993211609.webp'),
    width: 1280,
    height: 698,
    alt: 'Tampilan card RAMUNI untuk analisis multi-outlet dan tren penjualan.',
    eyebrow: 'Multi-outlet',
    title: 'Bandingkan outlet dengan periode yang sama.',
    note: 'Capture workspace RAMUNI; status akses mengikuti konfigurasi paket.',
  },
  auditInventory: {
    kind: 'card',
    src: drivePath('card-1787993287729.webp'),
    width: 1280,
    height: 698,
    alt: 'Tampilan card RAMUNI untuk kontrol operasional kasir dan audit persediaan.',
    eyebrow: 'Kontrol operasional',
    title: 'Pemeriksaan kasir dan persediaan meninggalkan jejak.',
    note: 'Capture workspace RAMUNI dengan data demo terkontrol.',
  },
  workspaceOverview: {
    kind: 'card',
    src: drivePath('card-1787993342612.webp'),
    width: 1280,
    height: 698,
    alt: 'Tampilan card workspace RAMUNI dengan ringkasan aktivitas usaha.',
    eyebrow: 'Dashboard bisnis',
    title: 'Mulai dari prioritas, lalu buka angka pendukungnya.',
    note: 'Capture workspace RAMUNI dengan data demo terkontrol.',
  },
  decisionWorkspace: {
    kind: 'card',
    src: drivePath('card-1787993464198.webp'),
    width: 1280,
    height: 800,
    alt: 'Tampilan card RAMUNI dengan ruang kerja untuk meninjau kondisi bisnis.',
    eyebrow: 'Pemeriksaan bisnis',
    title: 'Buka konteks sebelum menentukan langkah berikutnya.',
    note: 'Capture workspace RAMUNI dengan data demo terkontrol.',
  },
  pointOfSale: {
    kind: 'card',
    src: drivePath('card-1787993522566.webp'),
    width: 1280,
    height: 714,
    alt: 'Tampilan card RAMUNI untuk alur POS dan kasir.',
    eyebrow: 'Penjualan',
    title: 'Alur penjualan tersusun dari input hingga pembayaran.',
    note: 'Capture workspace RAMUNI dengan data demo terkontrol.',
  },
  paymentReview: {
    kind: 'card',
    src: drivePath('card-1787993546813.webp'),
    width: 1280,
    height: 714,
    alt: 'Tampilan card RAMUNI dengan pemeriksaan pembayaran dan ringkasan transaksi.',
    eyebrow: 'Pemeriksaan pembayaran',
    title: 'Buka detail pembayaran saat statusnya belum jelas.',
    note: 'Capture workspace RAMUNI dengan data demo terkontrol.',
  },
} as const satisfies Record<string, DriveVisual>;

export type DriveCardKey = keyof typeof driveCardVisuals;

export const driveVisuals = {
  laptops: driveLaptopVisuals,
  cards: driveCardVisuals,
} as const;

export interface DrivePageVisualSet {
  readonly primary: DriveVisual;
  readonly supporting: readonly DriveVisual[];
}

const set = (primary: DriveVisual, ...supporting: DriveVisual[]): DrivePageVisualSet => ({ primary, supporting });

export const productDriveVisuals = {
  hub: set(driveLaptopVisuals.overview, driveLaptopVisuals.salesCustomers, driveLaptopVisuals.inventory),
  'asisten-ai': set(driveCardVisuals.aiAssistant, driveLaptopVisuals.overview),
  'dashboard-bisnis': set(driveLaptopVisuals.overview, driveCardVisuals.workspaceOverview),
  'katalog-produk': set(driveCardVisuals.stockPriority, driveCardVisuals.inventoryAlert),
  penjualan: set(driveLaptopVisuals.salesCustomers, driveCardVisuals.salesSummary),
  inventori: set(driveLaptopVisuals.inventory, driveCardVisuals.inventoryAlert, driveLaptopVisuals.stockTransfer),
  keuangan: set(driveLaptopVisuals.finance, driveCardVisuals.profitIntelligence),
  pelanggan: set(driveLaptopVisuals.salesCustomers, driveCardVisuals.customerInbox),
  'laporan-insight': set(driveLaptopVisuals.finance, driveCardVisuals.weeklyReport),
  integrasi: set(driveCardVisuals.dataImport, driveLaptopVisuals.overview),
} as const satisfies Record<string, DrivePageVisualSet>;

export type ProductDriveVisualKey = keyof typeof productDriveVisuals;

export const solutionDriveVisuals = {
  'naikkan-omzet': set(driveLaptopVisuals.salesCustomers, driveCardVisuals.salesSummary, driveLaptopVisuals.promotion),
  'kelola-stok': set(driveLaptopVisuals.inventory, driveCardVisuals.inventoryAlert, driveLaptopVisuals.stockTransfer),
  'pantau-laba-dan-arus-kas': set(driveLaptopVisuals.finance, driveCardVisuals.profitIntelligence, driveCardVisuals.cashContext),
  // Keep the customer route visually distinct from the omzet route in the
  // solution chooser; the inbox card makes the job readable at a glance.
  'pahami-pelanggan': set(driveCardVisuals.customerInbox, driveLaptopVisuals.salesCustomers),
  'laporan-bisnis-otomatis': set(driveLaptopVisuals.overview, driveCardVisuals.weeklyReport, driveCardVisuals.insightContext),
} as const satisfies Record<string, DrivePageVisualSet>;

export type SolutionDriveVisualKey = keyof typeof solutionDriveVisuals;

export const industryDriveVisuals = {
  retail: set(driveLaptopVisuals.inventory, driveCardVisuals.inventoryAlert, driveCardVisuals.salesSummary),
  fnb: set(driveLaptopVisuals.posCashier, driveCardVisuals.posContext, driveLaptopVisuals.promotion),
  // Distribution work depends on moving stock between locations, then
  // reconciling orders and outlet comparisons.
  distributor: set(driveLaptopVisuals.stockTransfer, driveLaptopVisuals.salesCustomers, driveCardVisuals.multiOutlet),
  'reseller-online': set(driveLaptopVisuals.salesCustomers, driveCardVisuals.customerInbox, driveLaptopVisuals.promotion),
  jasa: set(driveLaptopVisuals.finance, driveCardVisuals.workspaceOverview, driveCardVisuals.customerInbox),
  'manufaktur-kecil': set(driveLaptopVisuals.stockTransfer, driveCardVisuals.stockContext, driveLaptopVisuals.finance),
} as const satisfies Record<string, DrivePageVisualSet>;

export type IndustryDriveVisualKey = keyof typeof industryDriveVisuals;

export const roleDriveVisuals = {
  // Owners commonly span a broad dashboard and the financial context used by
  // service businesses; the handoff card keeps the role boundary visible.
  'pemilik-usaha': set(driveLaptopVisuals.overview, driveLaptopVisuals.finance, driveCardVisuals.teamHandoff),
  'admin-toko': set(driveLaptopVisuals.inventory, driveCardVisuals.dataImport, driveCardVisuals.auditInventory),
  kasir: set(driveLaptopVisuals.posCashier, driveCardVisuals.posContext, driveCardVisuals.paymentReview),
  // Supervisors need the stock-transfer and audit trail used by retail,
  // distribution, and small manufacturing teams before the weekly report.
  supervisor: set(driveLaptopVisuals.stockTransfer, driveCardVisuals.auditInventory, driveCardVisuals.weeklyReport),
} as const satisfies Record<string, DrivePageVisualSet>;

export type RoleDriveVisualKey = keyof typeof roleDriveVisuals;

export const featureDriveVisuals = {
  'ai-copilot': set(driveCardVisuals.aiAssistant, driveLaptopVisuals.overview),
  'profit-intelligence': set(driveCardVisuals.profitIntelligence, driveLaptopVisuals.finance),
  omnichannel: set(driveCardVisuals.customerInbox, driveLaptopVisuals.salesCustomers),
  'web-builder': set(driveCardVisuals.businessPage, driveCardVisuals.workspaceOverview),
  'knowledge-os': set(driveCardVisuals.knowledgeOs, driveCardVisuals.insightContext),
} as const satisfies Record<string, DrivePageVisualSet>;

export type FeatureDriveVisualKey = keyof typeof featureDriveVisuals;

const fallbackSet = productDriveVisuals.hub;

export const getProductDriveVisuals = (slug: string): DrivePageVisualSet => productDriveVisuals[slug as ProductDriveVisualKey] || fallbackSet;
export const getSolutionDriveVisuals = (slug: string): DrivePageVisualSet => solutionDriveVisuals[slug as SolutionDriveVisualKey] || set(driveLaptopVisuals.overview);
export const getIndustryDriveVisuals = (slug: string): DrivePageVisualSet => industryDriveVisuals[slug as IndustryDriveVisualKey] || set(driveLaptopVisuals.overview);
export const getRoleDriveVisuals = (slug: string): DrivePageVisualSet => roleDriveVisuals[slug as RoleDriveVisualKey] || set(driveLaptopVisuals.overview);
export const getFeatureDriveVisuals = (slug: string): DrivePageVisualSet => featureDriveVisuals[slug as FeatureDriveVisualKey] || set(driveCardVisuals.workspaceOverview);

/** Adapt a Drive visual to the existing screenshot rail contract. */
export const toProductScreen = (visual: DriveVisual) => ({
  src: visual.src,
  driveSrc: visual.src,
  driveWidth: visual.width,
  driveHeight: visual.height,
  width: visual.width,
  height: visual.height,
  alt: visual.alt,
  eyebrow: visual.eyebrow,
  title: visual.title,
  note: visual.note,
});

export type DriveProductScreen = ReturnType<typeof toProductScreen>;

// Backwards-friendly aliases for page-level consumers that prefer a mapping
// noun rather than the visual-family noun.
export const productDriveMappings = productDriveVisuals;
export const solutionDriveMappings = solutionDriveVisuals;
export const industryDriveMappings = industryDriveVisuals;
export const roleDriveMappings = roleDriveVisuals;
export const featureDriveMappings = featureDriveVisuals;
