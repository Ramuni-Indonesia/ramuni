import type { ArticleJourney } from './articleJourneys';

interface ArticleCtaVisual {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const categoryVisuals: Record<string, ArticleCtaVisual[]> = {
  'ai-untuk-umkm': [{
    src: '/website-original/blog/generated/pertanyaan-ai-untuk-analisis-penjualan.webp',
    width: 640,
    height: 360,
    alt: 'Catatan pertanyaan AI, data penjualan, dan checklist pemeriksaan sebelum mengambil keputusan.',
  }, {
    src: '/website-original/blog/generated/cara-memeriksa-data-sebelum-menggunakan-ai.webp',
    width: 640,
    height: 360,
    alt: 'Pemilik usaha memeriksa sumber data sebelum menggunakan jawaban AI.',
  }],
  'keuangan-umkm': [{
    src: '/website-original/blog/generated/arus-kas-umkm-ringan.webp',
    width: 768,
    height: 432,
    alt: 'Catatan uang masuk dan keluar usaha yang sedang diperiksa bersama ringkasan keuangan.',
  }, {
    src: '/website-original/blog/generated/cara-menghitung-hpp-produk.webp',
    width: 640,
    height: 360,
    alt: 'Pemilik usaha menyusun komponen biaya dan harga pokok produk.',
  }],
  'stok-inventori': [{
    src: '/website-original/blog/generated/cara-menghitung-reorder-point.webp',
    width: 640,
    height: 360,
    alt: 'Catatan stok, laju keluar barang, dan titik pemesanan ulang yang sedang ditinjau.',
  }, {
    src: '/website-original/blog/generated/cara-melakukan-stok-opname.webp',
    width: 640,
    height: 360,
    alt: 'Tim usaha mencocokkan catatan persediaan dengan hasil stok opname.',
  }],
  'penjualan-omzet': [{
    src: '/website-original/blog/generated/cara-membaca-penjualan-per-produk.webp',
    width: 640,
    height: 360,
    alt: 'Ringkasan penjualan per produk yang membantu membaca perubahan omzet usaha.',
  }, {
    src: '/website-original/blog/generated/cara-melihat-pelanggan-yang-kembali-belanja.webp',
    width: 768,
    height: 432,
    alt: 'Pemilik toko meninjau pola pelanggan yang kembali berbelanja.',
  }],
  'pelanggan-crm': [{
    src: '/website-original/blog/generated/data-pelanggan-yang-perlu-dicatat-umkm.webp',
    width: 768,
    height: 432,
    alt: 'Catatan pelanggan yang relevan, izin penggunaan data, dan pola transaksi yang sedang diperiksa.',
  }, {
    src: '/website-original/blog/generated/cara-mengelompokkan-pelanggan-sederhana.webp',
    width: 640,
    height: 360,
    alt: 'Pemilik usaha mengelompokkan pola transaksi pelanggan secara sederhana.',
  }],
  'operasional-bisnis': [{
    src: '/website-original/blog/generated/cara-membuat-dashboard-bisnis-sederhana.webp',
    width: 640,
    height: 360,
    alt: 'Ringkasan dashboard bisnis yang menyatukan catatan, perubahan, dan tindak lanjut usaha.',
  }, {
    src: '/website-original/blog/generated/checklist-review-bisnis-mingguan-umkm.webp',
    width: 640,
    height: 360,
    alt: 'Pemilik usaha menyusun checklist review bisnis mingguan.',
  }],
  'operasional-usaha': [{
    src: '/website-original/blog/generated/cara-memilih-metrik-bisnis-untuk-umkm.webp',
    width: 640,
    height: 360,
    alt: 'Pemilik usaha memilih metrik yang tepat untuk pemeriksaan rutin bersama tim.',
  }, {
    src: '/website-original/blog/generated/cara-mengevaluasi-promo-penjualan.webp',
    width: 640,
    height: 360,
    alt: 'Tim usaha mengevaluasi hasil promosi berdasarkan catatan penjualan.',
  }],
  'penjualan-pemasaran': [{
    src: '/website-original/blog/generated/cara-menghitung-pertumbuhan-penjualan.webp',
    width: 640,
    height: 360,
    alt: 'Perbandingan pertumbuhan penjualan antarperiode untuk menemukan pendorong perubahan.',
  }, {
    src: '/website-original/blog/generated/cara-membandingkan-penjualan-online-dan-offline.webp',
    width: 640,
    height: 360,
    alt: 'Pemilik usaha membandingkan penjualan dari kanal online dan offline.',
  }],
  'strategi-per-industri': [{
    src: '/website-original/blog/generated/cara-mengatur-stok-usaha-fnb.webp',
    width: 640,
    height: 360,
    alt: 'Ritme operasional usaha makanan dan catatan bahan baku yang sedang ditinjau.',
  }, {
    src: '/website-original/blog/generated/cara-mengatur-stok-toko-sembako.webp',
    width: 640,
    height: 360,
    alt: 'Pemilik toko menyusun pemeriksaan stok sesuai ritme usaha sehari-hari.',
  }],
};
const fallbackVisuals = categoryVisuals['operasional-bisnis'];

function featuredFileName(featuredSrc?: string): string {
  return featuredSrc?.split('/').pop() || '';
}

export function getArticleCtaVisual(categorySlug: string, articleTitle?: string, featuredSrc?: string): ArticleCtaVisual {
  const candidates = categoryVisuals[categorySlug] || fallbackVisuals;
  const featuredFile = featuredFileName(featuredSrc);
  const selected = candidates.find((candidate) => featuredFile === '' || featuredFileName(candidate.src) !== featuredFile) || candidates[0];
  return articleTitle
    ? { ...selected, alt: `Visual alur ${articleTitle.toLocaleLowerCase('id-ID')} untuk langkah berikutnya.` }
    : selected;
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
  const readableTopic = topic.charAt(0).toLocaleUpperCase('id-ID') + topic.slice(1);

  return {
    title: readableTopic || 'Lihat langkah berikutnya untuk usaha Anda',
    text: `Bawa topik ini ke alur ${journey.label.toLocaleLowerCase('id-ID')} yang relevan untuk usaha Anda.`,
  };
}
