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
  'cara-menghitung-hpp-usaha-kuliner': 'keuangan-umkm',
  'cara-menghitung-food-cost-usaha-makanan': 'keuangan-umkm',
  'cara-menghitung-safety-stock': 'stok-inventori',
  'cara-mengatur-stok-usaha-fnb': 'stok-inventori',
  'cara-mengatur-stok-toko-sembako': 'stok-inventori',
  'cara-mengatur-stok-bahan-baku-bakery': 'stok-inventori',
  'cara-mengelola-stok-toko-fashion': 'stok-inventori',
  'cara-mengelola-stok-produk-varian': 'stok-inventori',
  'cara-mencatat-penjualan-toko-retail': 'penjualan-omzet',
  'cara-mencatat-penjualan-usaha-laundry': 'penjualan-omzet',
  'cara-membuat-laporan-penjualan-barbershop': 'penjualan-omzet',
};

const fallbackVisual = categoryVisuals['operasional-bisnis'];

export function getArticleCtaVisual(categorySlug: string, articleId?: string): ArticleCtaVisual {
  const visualKey = articleId ? visualOverrides[articleId] || categorySlug : categorySlug;
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
  const topic = topicFromTitle(articleTitle);
  const label = journey.label.toLocaleLowerCase('id-ID');

  return {
    title: `Lanjutkan ${topic.toLocaleLowerCase('id-ID')} melalui alur ${label}.`,
    text: `Setelah membahas ${topic.toLocaleLowerCase('id-ID')}, lanjutkan dari catatan usaha ke langkah ${label} yang dapat diperiksa.`,
  };
}
