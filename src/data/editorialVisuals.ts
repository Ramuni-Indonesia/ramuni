/**
 * Editorial / contextual visuals for marketing pages outside the dashboard
 * product-UI category.
 *
 * Scope - what belongs here:
 *   - Non-dashboard editorial illustration (context scenes, conceptual art)
 *   - Credible real-world photography (industry settings, people-at-work)
 *   - Standalone conceptual illustrations with clear semantic fit
 *
 * Excluded - use other registries:
 *   - Dashboard UI captures        → driveVisuals.ts
 *   - Product feature screenshots  → productScreens.ts
 *   - Mascot/brand art             → mascots.ts
 *   - Blog cover art              → articleCtaVisuals.ts / per-article data
 *   - Author portraits             → editorialPeople.ts
 *
 * Constraints for new additions:
 *   - WebP preferred; PNG only when WebP is unavailable
 *   - Max 250 KB per asset (inline pages); 150 KB for above-the-fold
 *   - Alt text must be factual and descriptive; decorative-only assets
 *     require explicit `decorative: true` flag
 *   - No competitor logos, no blurred or upscaled images
 */

const img = (src: string, width: number, height: number): { src: string; width: number; height: number } => ({
  src: src.startsWith('/') ? src : `/${src}`,
  width,
  height,
});

export type EditorialVisualKind = 'photo' | 'illustration';

export interface EditorialVisual {
  /** Absolute public path starting with "/website-original/". */
  readonly src: string;
  readonly width: number;
  readonly height: number;
  /** Factual description of what the image shows. Empty only if `decorative`. */
  readonly alt: string;
  readonly kind: EditorialVisualKind;
  /**
   * How the image should fill its container.
   * - "cover"  : photo and editorial illustration (default)
   * - "contain": conceptual / stand-alone illustration on solid background
   */
  readonly fit?: 'cover' | 'contain';
  /**
   * Marks an image as decorative (background, fill, ambient).
   * A decorative image has `alt=""` and should NOT be used as primary content.
   */
  readonly decorative?: boolean;
  /**
   * Short disclosure note for images that could be read as testimonial or
   * implied endorsement. Example: "Ilustrasi konteks stok, bukan capture
   * akun pengguna tertentu."  Omit when the image is clearly generic art.
   */
  readonly disclosure?: string;
}

// --- Contextual illustration -----------------------------------------------

/**
 * Scenes that set business context without showing the RAMUNI product UI.
 * All are 1200×800 (3:2) WebP, well under 250 KB.
 */
export const editorialContextScenes = {
  stockOperations: {
    ...img('website-original/context/ramuni-context-stock-operations.webp', 1200, 800),
    alt: 'Ilustrasi kontekstual rak produk, tanda stok rendah, dan daftar prioritas pengisian ulang.',
    kind: 'illustration',
  },
  salesCustomer: {
    ...img('website-original/context/ramuni-context-sales-customer.webp', 1200, 800),
    alt: 'Ilustrasi kontekstual transaksi toko dan hubungan pelanggan pada usaha kecil Indonesia.',
    kind: 'illustration',
  },
  cashReport: {
    ...img('website-original/context/ramuni-context-cash-report.webp', 1200, 800),
    alt: 'Ilustrasi kontekstual buku kas, bukti biaya, kalender, dan laporan yang menunggu pemeriksaan.',
    kind: 'illustration',
  },
  aiImport: {
    ...img('website-original/context/ramuni-context-ai-import.webp', 1200, 800),
    alt: 'Ilustrasi kontekstual file data yang diimpor, hasil validasi SKU, dan catatan siap diperiksa.',
    kind: 'illustration',
  },
  umkmSignals: {
    ...img('website-original/context/ramuni-context-umkm-signal-workspace.webp', 1200, 675),
    alt: 'Ilustrasi kontekstual ruang kerja UMKM dengan prioritas, sinyal perubahan, dan arah tindakan.',
    kind: 'illustration',
  },
} as const satisfies Record<string, EditorialVisual>;

export type EditorialContextKey = keyof typeof editorialContextScenes;

// ─── Conceptual illustrations ────────────────────────────────────────────────

/**
 * Stand-alone conceptual art for marketing sections that need visual
 * explanation without referencing the dashboard.
 * All are 1280×698 WebP, 15-23 KB.
 *
 * These are repurposed from the Drive card set where the visual carries
 * a meaning distinct from its original `eyebrow` in driveVisuals.ts.
 * The editorial registry applies its own semantic key and alt text.
 */
export const editorialConceptualArt = {
  /**
   * Rack-and-barcode illustration - suitable for inventory context.
   * Original Drive eyebrow: "Konteks stok"
   */
  inventoryConcept: {
    ...img('website-original/marketing/drive/card-1787992292419-hd.webp', 1280, 698),
    alt: 'Ilustrasi rak barang, barcode, dan pergerakan stok untuk menunjukkan konteks inventori.',
    kind: 'illustration',
    fit: 'contain',
    disclosure: 'Ilustrasi konteks inventori, bukan capture akun pengguna tertentu.',
  },
  /**
   * Cash/chart/calculator/wallet illustration - suitable for financial context.
   * Original Drive eyebrow: "Konteks keuangan"
   */
  financeConcept: {
    ...img('website-original/marketing/drive/card-1787992320620-hd.webp', 1280, 698),
    alt: 'Ilustrasi uang, kalkulator, grafik, dan dompet untuk menunjukkan konteks keuangan usaha.',
    kind: 'illustration',
    fit: 'contain',
    disclosure: 'Ilustrasi konteks keuangan, bukan laporan keuangan usaha tertentu.',
  },
} as const satisfies Record<string, EditorialVisual>;

export type EditorialConceptualKey = keyof typeof editorialConceptualArt;

// ─── Industry photography ────────────────────────────────────────────────

/**
 * Real-world photography of Indonesian small businesses.
 * Dimensions vary; check each entry.
 * All are under 50 KB and have been verified sharp at listed dimensions.
 */
export const editorialIndustryPhotos = {
  retail: {
    ...img('website-original/industries/retail-real.webp', 720, 480),
    alt: 'Potret toko retail di Indonesia dengan rak dagangan dan pelanggan.',
    kind: 'photo',
  },
  fnb: {
    ...img('website-original/industries/fnb-real.webp', 1000, 667),
    alt: 'Potret usaha makanan dan minuman di Indonesia dengan area layanan dan produk.',
    kind: 'photo',
  },
  distributor: {
    ...img('website-original/industries/distributor-real.webp', 1000, 667),
    alt: 'Potret gudang distribusi di Indonesia dengan tumpukan barang dan pekerja.',
    kind: 'photo',
  },
  resellerOnline: {
    ...img('website-original/industries/reseller-online-real.webp', 1000, 667),
    alt: 'Potret ruang kerja reseller online di Indonesia dengan perangkat dan paket pengiriman.',
    kind: 'photo',
  },
  jasa: {
    ...img('website-original/industries/jasa-real.webp', 1000, 667),
    alt: 'Potret usaha jasa di Indonesia dengan ruang kerja dan peralatan.',
    kind: 'photo',
  },
  manufakturKecil: {
    ...img('website-original/industries/manufaktur-kecil-real.webp', 1000, 667),
    alt: 'Potret workshop manufaktur kecil di Indonesia dengan proses produksi dan pekerja.',
    kind: 'photo',
  },
} as const satisfies Record<string, EditorialVisual>;

export type EditorialIndustryKey = keyof typeof editorialIndustryPhotos;

// ─── Lead-section photography ─────────────────────────────────────────────

/**
 * Hero photography for above-the-fold lead sections.
 * Both are 1024×1024 WebP, verified sharp at listed dimensions, ~70 KB.
 */
export const editorialLeadPhotos = {
  customerSupport: {
    ...img('website-original/context/ramuni-lead-customer-support.webp', 1024, 1024),
    alt: 'Pemilik usaha Indonesia berbicara dengan tim dukungan pelanggan RAMUNI melalui layar perangkat.',
    kind: 'photo',
  },
  freeDemo: {
    ...img('website-original/context/ramuni-lead-free-demo.webp', 1024, 1024),
    alt: 'Tampilan layar perangkat dengan workspace RAMUNI terbuka di samping catatan usaha.',
    kind: 'photo',
  },
} as const satisfies Record<string, EditorialVisual>;

export type EditorialLeadKey = keyof typeof editorialLeadPhotos;

// ─── Convenience exports ─────────────────────────────────────────────────────

export const editorialVisuals = {
  context: editorialContextScenes,
  conceptual: editorialConceptualArt,
  industries: editorialIndustryPhotos,
  leads: editorialLeadPhotos,
} as const;

export type EditorialVisualFamily = keyof typeof editorialVisuals;

/**
 * Retrieve a visual by family and key.
 * Returns undefined for unknown combinations so callers can provide a fallback.
 */
export const getEditorialVisual = (
  family: EditorialVisualFamily,
  key: string,
): EditorialVisual | undefined => {
  const group = editorialVisuals[family] as Record<string, EditorialVisual>;
  return group[key] ?? undefined;
};
