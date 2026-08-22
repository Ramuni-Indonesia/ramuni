type ArticleHeading = {
  depth: number;
  slug: string;
  text: string;
};

export type ArticleVisualPlacement = {
  mode: 'heading' | 'table';
  anchor: string;
};

// These are the sections where a visual adds the most explanatory value for
// the articles that carry a particularly clear calculation, example, or
// decision point. The rest are selected from their own headings below.
const placementOverrides: Record<string, string> = {
  'ai-business-companion-umkm': 'jawaban harus bisa ditelusuri',
  'apa-itu-ai-business-companion': 'bedakan ringkasan, rekomendasi, dan tindakan',
  'biaya-tetap-dan-biaya-variabel': 'contoh biaya tetap dan biaya variabel',
  'cara-membaca-omzet-harian': 'contoh membaca omzet',
  'cara-mencatat-penjualan-harian': 'lakukan penutupan harian',
  'cara-menghitung-hpp-produk': 'hitung satu batch',
  'cara-menghitung-reorder-point': 'hitung pemakaian',
  'cara-menghitung-safety-stock': 'cara hitung sederhana',
  'cara-menghitung-repeat-customer-rate': 'hitung pelanggan unik',
  'contoh-laporan-penjualan-harian': 'contoh format pembukuan',
  'penyebab-selisih-stok-dan-cara-mengeceknya': 'rumus selisih stok',
  'perbedaan-stok-minimum-dan-safety-stock': 'contoh sederhana',
  'laporan-laba-rugi-sederhana-umkm': 'susun ringkasan laba rugi',
  'checklist-review-bisnis-mingguan-umkm': 'menit 0-5',
  'cara-menghitung-food-cost-usaha-makanan': 'rumus food cost',
  'cara-menghitung-laba-bersih-usaha': 'contoh menghitung laba bersih',
  'cara-menghitung-laba-kotor': 'mulai dari rumus',
  'cara-menghitung-margin-laba-kotor': 'gunakan rumus margin',
  'cara-menghitung-titik-impas-usaha': 'uji angka dengan beberapa skenario',
  'cara-menghitung-pertumbuhan-penjualan': 'gunakan rumus pertumbuhan',
  'cara-mengukur-dampak-diskon-terhadap-laba': 'mulai dari harga efektif',
  'cara-menghitung-frekuensi-pembelian-pelanggan': 'gunakan rumus',
  'cara-mengukur-perputaran-stok': 'gunakan rumus sederhana',
  'cara-melakukan-stok-opname': 'hitung fisik dan catat selisihnya',
  'cara-mengatasi-omzet-turun': 'pecah omzet menjadi jumlah transaksi',
  'cara-membandingkan-penjualan-mingguan': 'baca selisih nominal',
  'cara-membandingkan-penjualan-online-dan-offline': 'buat rekap per kanal',
  'cara-mengukur-kepuasan-pelanggan-sederhana': 'baca pola',
  'cara-melihat-pelanggan-yang-kembali-belanja': 'hitung pelanggan kembali',
};

const stopWords = new Set([
  'cara', 'membuat', 'membaca', 'menghitung', 'mengukur', 'menentukan',
  'mengelola', 'sederhana', 'untuk', 'dan', 'yang', 'usaha', 'bisnis', 'umkm',
  'dengan', 'dari', 'pada', 'dalam', 'perbedaan', 'contoh', 'apa', 'itu',
  'ini', 'terhadap', 'kita', 'bisa', 'lebih', 'paling', 'tidak', 'belum',
  'harian', 'bulanan', 'produk', 'data',
]);

const broadSignals: Array<[RegExp, number]> = [
  [/contoh|format|simulasi|tabel|perhitungan|rumus|formula/i, 10],
  [/periksa|pemeriksaan|cek|audit|rekonsiliasi|selisih|bukti/i, 8],
  [/bandingkan|perbandingan|baca|interpretasi|pola|dampak|skenario/i, 7],
  [/gunakan|hubungkan|tindakan|keputusan|tindak lanjut|eksperimen|uji/i, 6],
  [/catat|susun|siapkan|kelompokkan|pisahkan|tetapkan|tentukan/i, 4],
];

const topicSignals: Array<[RegExp, RegExp, number]> = [
  [/contoh|laporan|format|catatan|kartu|sop|checklist/i, /contoh|format|kolom|checklist|susun|siapkan/i, 8],
  [/hitung|rumus|margin|hpp|laba|omzet|reorder|safety|frekuensi|pertumbuhan|rata-rata|konversi|modal|food.?cost|diskon/i, /rumus|hitung|formula|contoh|gunakan|periksa|bandingkan|skenario/i, 8],
  [/ai/i, /cek|uji|pemeriksaan|batas|data|jawaban|rekomendasi|sumber/i, 10],
  [/stok|persediaan/i, /catat|periksa|gunakan|hubungkan|contoh|rumus|penerimaan|selisih|reorder/i, 8],
  [/pelanggan|customer|keluhan|komplain/i, /gunakan|hitung|baca|tindak|catat|pola|izin/i, 8],
  [/penjualan|omzet/i, /pecah|bandingkan|contoh|catat|baca|rekap|hitung/i, 8],
];

const normalise = (value: string) => value.toLocaleLowerCase('id-ID');

export function getArticleVisualPlacement(articleId: string, title: string, headings: ArticleHeading[]): ArticleVisualPlacement {
  const h2 = headings.filter((heading) => heading.depth === 2);
  if (!h2.length) return { mode: 'table', anchor: '' };

  const override = placementOverrides[articleId];
  if (override) {
    const target = h2.find((heading) => normalise(heading.text).includes(override));
    if (target) return { mode: 'heading', anchor: target.slug };
  }

  const titleTokens = normalise(title).replace(/[^a-z0-9À-ÿ ]/gi, ' ').split(/\s+/).filter((token) => token.length > 3 && !stopWords.has(token));
  let best = { score: Number.NEGATIVE_INFINITY, heading: h2[0] };
  h2.forEach((heading, index) => {
    const text = normalise(heading.text);
    let score = Math.min(index, 5) * 1.5;
    // Keep the visual out of the opening definition when a later, more useful
    // section exists. A first section may still win when it is the article's
    // only calculation or example anchor.
    if (index === 0 && h2.length > 1) score -= 14;
    titleTokens.forEach((token) => {
      if (text.includes(token)) score += 3;
    });
    broadSignals.forEach(([pattern, weight]) => {
      if (pattern.test(text)) score += weight;
    });
    topicSignals.forEach(([titlePattern, headingPattern, weight]) => {
      if (titlePattern.test(title) && headingPattern.test(text)) score += weight;
    });
    if (score > best.score) best = { score, heading };
  });

  return { mode: 'heading', anchor: best.heading.slug };
}
