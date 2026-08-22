import type { ArticleJourney } from './articleJourneys';

interface ArticleCtaVisual {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const categoryVisuals: Record<string, ArticleCtaVisual> = {
  'ai-untuk-umkm': {
    src: '/website-original/blog/generated/pertanyaan-ai-untuk-analisis-penjualan.webp',
    width: 640,
    height: 360,
    alt: 'Catatan pertanyaan AI, data penjualan, dan checklist pemeriksaan sebelum mengambil keputusan.',
  },
  'keuangan-umkm': {
    src: '/website-original/blog/generated/arus-kas-umkm-ringan.webp',
    width: 768,
    height: 432,
    alt: 'Catatan uang masuk dan keluar usaha yang sedang diperiksa bersama ringkasan keuangan.',
  },
  'stok-inventori': {
    src: '/website-original/blog/generated/cara-menghitung-reorder-point.webp',
    width: 640,
    height: 360,
    alt: 'Catatan stok, laju keluar barang, dan titik pemesanan ulang yang sedang ditinjau.',
  },
  'penjualan-omzet': {
    src: '/website-original/blog/generated/cara-membaca-penjualan-per-produk.webp',
    width: 640,
    height: 360,
    alt: 'Ringkasan penjualan per produk yang membantu membaca perubahan omzet usaha.',
  },
  'pelanggan-crm': {
    src: '/website-original/blog/generated/data-pelanggan-yang-perlu-dicatat-umkm.webp',
    width: 768,
    height: 432,
    alt: 'Catatan pelanggan yang relevan, izin penggunaan data, dan pola transaksi yang sedang diperiksa.',
  },
  'operasional-bisnis': {
    src: '/website-original/blog/generated/cara-membuat-dashboard-bisnis-sederhana.webp',
    width: 640,
    height: 360,
    alt: 'Ringkasan dashboard bisnis yang menyatukan catatan, perubahan, dan tindak lanjut usaha.',
  },
  'operasional-usaha': {
    src: '/website-original/blog/generated/cara-memilih-metrik-bisnis-untuk-umkm.webp',
    width: 640,
    height: 360,
    alt: 'Pemilik usaha memilih metrik yang tepat untuk pemeriksaan rutin bersama tim.',
  },
  'penjualan-pemasaran': {
    src: '/website-original/blog/generated/cara-menghitung-pertumbuhan-penjualan.webp',
    width: 640,
    height: 360,
    alt: 'Perbandingan pertumbuhan penjualan antarperiode untuk menemukan pendorong perubahan.',
  },
  'strategi-per-industri': {
    src: '/website-original/blog/generated/cara-mengatur-stok-usaha-fnb.webp',
    width: 640,
    height: 360,
    alt: 'Ritme operasional usaha makanan dan catatan bahan baku yang sedang ditinjau.',
  },
};

const visualOverrides: Record<string, string> = {
  'cara-membuat-laporan-penjualan-bulanan': 'contoh-laporan-penjualan-harian',
  'cara-menentukan-stok-minimum-umkm': 'cara-menghitung-reorder-point',
  'cara-mengatur-stok-bahan-baku-bakery': 'cara-mengatur-stok-usaha-fnb',
  'cara-menghitung-food-cost-usaha-makanan': 'cara-menghitung-hpp-usaha-kuliner',
  'cara-menghitung-frekuensi-pembelian-pelanggan': 'cara-menghitung-repeat-customer-rate',
  'cara-menghitung-laba-bersih-usaha': 'arus-kas-umkm-ringan',
  'contoh-laporan-kas-harian-kedai-makanan': 'arus-kas-umkm-ringan',
  'contoh-laporan-stok-barang-untuk-toko': 'kartu-stok-sederhana-untuk-umkm',
  'laporan-laba-rugi-sederhana-umkm': 'perbedaan-laba-kotor-dan-laba-bersih',
};

const largeVisualIds = new Set([
  'ai-business-companion-umkm',
  'arus-kas-umkm-ringan',
  'cara-membaca-omzet-harian',
  'cara-membandingkan-penjualan-mingguan',
  'cara-melihat-pelanggan-yang-kembali-belanja',
  'cara-merapikan-data-produk-dan-sku',
  'checklist-review-bisnis-mingguan-umkm',
  'data-pelanggan-yang-perlu-dicatat-umkm',
  'perbedaan-omzet-laba-dan-arus-kas',
  'produk-terlaris-belum-tentu-paling-untung',
  'panduan-membaca-stok-harian',
]);

const fallbackVisual = categoryVisuals['operasional-bisnis'];

export function getArticleCtaVisual(categorySlug: string, articleId?: string, articleTitle?: string): ArticleCtaVisual {
  if (articleId) {
    const visualKey = visualOverrides[articleId];
    if (visualKey) {
      const width = largeVisualIds.has(visualKey) ? 768 : 640;
      return {
        src: `/website-original/blog/generated/${visualKey}.webp`,
        width,
        height: width * 9 / 16,
        alt: articleTitle ? `Visual pendukung untuk ${articleTitle.toLocaleLowerCase('id-ID')}.` : 'Visual pendukung alur usaha RAMUNI.',
      };
    }

    const width = largeVisualIds.has(articleId) ? 768 : 640;
    return {
      src: `/website-original/blog/generated/${articleId}.webp`,
      width,
      height: width * 9 / 16,
      alt: articleTitle ? `Visual pendukung untuk ${articleTitle.toLocaleLowerCase('id-ID')}.` : 'Visual pendukung alur usaha RAMUNI.',
    };
  }

  const visualKey = categorySlug;
  return categoryVisuals[visualKey] || fallbackVisual;
}

function topicFromTitle(title: string): string {
  return title
    .replace(/^(Cara|Contoh|Panduan|Perbedaan)\s+/i, '')
    .replace(/\s+(untuk|bagi)\s+UMKM\b.*$/i, '')
    .replace(/[.!?]+$/, '')
    .trim();
}

export function getArticleCtaCopy(articleTitle: string, journey: ArticleJourney): Pick<ArticleJourney, 'title' | 'text'> {
  const topic = topicFromTitle(articleTitle).toLocaleLowerCase('id-ID');
  const compactTopic = topic.length > 42 ? `${topic.slice(0, 42).replace(/\s+\S*$/, '')}…` : topic;
  const readableTopic = compactTopic.charAt(0).toLocaleUpperCase('id-ID') + compactTopic.slice(1);
  const label = journey.label;

  return {
    title: `${readableTopic} · ${label}`,
    text: `Lihat alur ${label.toLocaleLowerCase('id-ID')} yang relevan untuk catatan usaha ini.`,
  };
}
