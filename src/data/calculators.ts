export type CalculatorKey =
  | 'laba-usaha'
  | 'hpp'
  | 'reorder-stok'
  | 'margin-laba-kotor'
  | 'titik-impas'
  | 'arus-kas-bersih'
  | 'nilai-transaksi-rata-rata';

export interface CalculatorField {
  name: string;
  label: string;
  unit: string;
  placeholder?: string;
}

export interface CalculatorDefinition {
  title: string;
  shortTitle: string;
  decision: string;
  seoTitle: string;
  metaDescription: string;
  keyword: string;
  category: 'Laba' | 'Stok' | 'Kas' | 'Penjualan';
  intent: string;
  formula: string;
  formulaNote: string;
  resultLabel: string;
  emptyNote: string;
  positiveNote: string;
  cautionNote: string;
  fields: CalculatorField[];
  example: Record<string, number>;
  exampleLabel: string;
  nextSteps: string[];
  related: { label: string; href: string; text: string }[];
}

export const calculators: Record<CalculatorKey, CalculatorDefinition> = {
  'laba-usaha': {
    title: 'Kalkulator Laba Usaha',
    shortTitle: 'Periksa laba sederhana',
    decision: 'Hitung selisih pendapatan dan biaya dalam satu periode.',
    seoTitle: 'Kalkulator Laba Usaha Gratis untuk UMKM',
    metaDescription: 'Kalkulator laba usaha gratis untuk UMKM. Hitung pendapatan dikurangi biaya, lihat rumus, contoh angka, dan cara membaca hasilnya.',
    keyword: 'kalkulator laba usaha',
    category: 'Laba',
    intent: 'Saat omzet terlihat naik tetapi keuntungan belum terasa.',
    formula: 'Laba = Pendapatan - Biaya',
    formulaNote: 'Gunakan pendapatan dan biaya dari periode yang sama agar hasil tidak bias.',
    resultLabel: 'Perkiraan laba',
    emptyNote: 'Isi pendapatan dan total biaya untuk melihat selisihnya.',
    positiveNote: 'Bandingkan hasil dengan periode sebelumnya dan cek biaya yang berubah paling besar.',
    cautionNote: 'Hasil negatif. Periksa kembali biaya besar, retur, dan periode pencatatan.',
    fields: [
      { name: 'income', label: 'Pendapatan', unit: 'Rp', placeholder: '12500000' },
      { name: 'cost', label: 'Total biaya', unit: 'Rp', placeholder: '8750000' },
    ],
    example: { income: 12500000, cost: 8750000 },
    exampleLabel: 'Contoh warung: pendapatan Rp12,5 juta dan biaya Rp8,75 juta',
    nextSteps: ['Pisahkan biaya tetap dan biaya variabel.', 'Bandingkan margin, bukan hanya nominal laba.', 'Catat biaya yang perlu ditinjau minggu depan.'],
    related: [
      { label: 'Panduan arus kas', href: '/panduan/memahami-arus-kas', text: 'Lihat kenapa laba dan kas bisa berbeda.' },
      { label: 'Kamus omzet', href: '/kamus-bisnis/omzet', text: 'Samakan dulu arti omzet sebelum menghitung laba.' },
    ],
  },
  hpp: {
    title: 'Kalkulator HPP Sederhana',
    shortTitle: 'Periksa HPP sederhana',
    decision: 'Perkirakan biaya barang yang terjual dalam satu periode.',
    seoTitle: 'Kalkulator HPP Sederhana untuk UMKM',
    metaDescription: 'Kalkulator HPP sederhana untuk UMKM. Hitung stok awal, pembelian, dan stok akhir dengan rumus yang terbuka.',
    keyword: 'kalkulator HPP',
    category: 'Laba',
    intent: 'Saat margin berubah dan biaya barang perlu dibaca ulang.',
    formula: 'HPP = Stok awal + Pembelian - Stok akhir',
    formulaNote: 'Nilai stok harus memakai dasar yang sama, misalnya harga beli atau metode internal yang konsisten.',
    resultLabel: 'Perkiraan HPP',
    emptyNote: 'Isi stok awal, pembelian, dan stok akhir untuk melihat HPP sederhana.',
    positiveNote: 'Gunakan hasil ini untuk memeriksa margin kotor dan perubahan harga beli.',
    cautionNote: 'Hasil negatif biasanya menandakan periode atau nilai stok perlu diperiksa ulang.',
    fields: [
      { name: 'opening', label: 'Stok awal', unit: 'Rp', placeholder: '4000000' },
      { name: 'purchase', label: 'Pembelian', unit: 'Rp', placeholder: '6500000' },
      { name: 'closing', label: 'Stok akhir', unit: 'Rp', placeholder: '3200000' },
    ],
    example: { opening: 4000000, purchase: 6500000, closing: 3200000 },
    exampleLabel: 'Contoh toko: stok awal Rp4 juta, pembelian Rp6,5 juta, stok akhir Rp3,2 juta',
    nextSteps: ['Cek stok rusak, retur, dan koreksi manual.', 'Samakan periode HPP dengan periode penjualan.', 'Lanjutkan ke kalkulator margin bila data penjualan sudah ada.'],
    related: [
      { label: 'Kalkulator margin', href: '/kalkulator/margin-laba-kotor', text: 'Baca HPP bersama nilai penjualan.' },
      { label: 'Kamus HPP', href: '/kamus-bisnis/hpp', text: 'Pahami arti HPP sebelum membandingkan margin.' },
    ],
  },
  'reorder-stok': {
    title: 'Kalkulator Titik Reorder',
    shortTitle: 'Periksa titik pesan ulang',
    decision: 'Perkirakan batas stok untuk mulai memeriksa pemesanan.',
    seoTitle: 'Kalkulator Reorder Stok untuk UMKM',
    metaDescription: 'Kalkulator reorder stok untuk memperkirakan kapan stok perlu dicek berdasarkan pemakaian harian, lead time, dan stok pengaman.',
    keyword: 'kalkulator reorder stok',
    category: 'Stok',
    intent: 'Saat produk cepat habis dan waktu pesan ulang sering terlambat.',
    formula: 'Titik reorder = Pemakaian harian x Lead time + Stok pengaman',
    formulaNote: 'Angka ini adalah titik pemeriksaan, bukan perintah otomatis untuk membeli.',
    resultLabel: 'Titik cek stok',
    emptyNote: 'Isi pemakaian rata-rata, lead time, dan stok pengaman.',
    positiveNote: 'Mulai periksa pemesanan saat stok mendekati angka ini.',
    cautionNote: 'Jika hasil nol atau negatif, cek kembali pemakaian harian dan stok pengaman.',
    fields: [
      { name: 'daily', label: 'Pemakaian rata-rata', unit: 'unit/hari', placeholder: '18' },
      { name: 'lead', label: 'Lead time', unit: 'hari', placeholder: '4' },
      { name: 'safety', label: 'Stok pengaman', unit: 'unit', placeholder: '25' },
    ],
    example: { daily: 18, lead: 4, safety: 25 },
    exampleLabel: 'Contoh barang laris: 18 unit per hari, lead time 4 hari, cadangan 25 unit',
    nextSteps: ['Pisahkan produk cepat dan lambat bergerak.', 'Cek lead time pemasok yang sering berubah.', 'Gunakan template stok agar pemeriksaan berikutnya punya jejak.'],
    related: [
      { label: 'Panduan stok harian', href: '/panduan/membaca-stok-harian', text: 'Susun urutan membaca stok sebelum pesan ulang.' },
      { label: 'Template stok', href: '/template/stok-harian', text: 'Catat stok harian dengan format sederhana.' },
    ],
  },
  'margin-laba-kotor': {
    title: 'Kalkulator Margin Laba Kotor',
    shortTitle: 'Periksa margin kotor',
    decision: 'Hitung persentase laba kotor dari penjualan dan HPP.',
    seoTitle: 'Kalkulator Margin Laba Kotor UMKM',
    metaDescription: 'Kalkulator margin laba kotor untuk membaca persentase keuntungan dari penjualan setelah HPP. Gratis dan berjalan di browser.',
    keyword: 'kalkulator margin laba kotor',
    category: 'Laba',
    intent: 'Saat harga jual, diskon, atau biaya barang berubah.',
    formula: 'Margin kotor = (Penjualan - HPP) / Penjualan x 100%',
    formulaNote: 'Masukkan penjualan bersih dan HPP dari periode yang sama.',
    resultLabel: 'Margin kotor',
    emptyNote: 'Isi penjualan dan HPP untuk melihat persentase margin.',
    positiveNote: 'Bandingkan margin antar produk atau periode sebelum mengubah harga.',
    cautionNote: 'Margin negatif. Periksa harga jual, diskon, HPP, dan retur.',
    fields: [
      { name: 'sales', label: 'Penjualan bersih', unit: 'Rp', placeholder: '15000000' },
      { name: 'cogs', label: 'HPP', unit: 'Rp', placeholder: '9750000' },
    ],
    example: { sales: 15000000, cogs: 9750000 },
    exampleLabel: 'Contoh produk: penjualan Rp15 juta dan HPP Rp9,75 juta',
    nextSteps: ['Cari produk dengan margin turun.', 'Bandingkan perubahan HPP dan diskon.', 'Jangan membaca margin tanpa volume penjualan.'],
    related: [
      { label: 'Kalkulator HPP', href: '/kalkulator/hpp', text: 'Hitung HPP sebelum membaca margin.' },
      { label: 'Solusi naikkan omzet', href: '/solusi/naikkan-omzet', text: 'Lihat omzet bersama produk dan pelanggan.' },
    ],
  },
  'titik-impas': {
    title: 'Kalkulator Titik Impas',
    shortTitle: 'Periksa break even',
    decision: 'Perkirakan jumlah unit yang perlu terjual agar biaya tetap tertutup.',
    seoTitle: 'Kalkulator Titik Impas Break Even untuk UMKM',
    metaDescription: 'Kalkulator titik impas atau break even untuk UMKM. Hitung biaya tetap, harga jual, dan biaya variabel per unit.',
    keyword: 'kalkulator titik impas',
    category: 'Laba',
    intent: 'Saat ingin membaca batas minimal penjualan sebelum promosi atau produksi.',
    formula: 'Titik impas unit = Biaya tetap / (Harga jual per unit - Biaya variabel per unit)',
    formulaNote: 'Jika harga jual tidak lebih besar dari biaya variabel, model harga perlu ditinjau dulu.',
    resultLabel: 'Unit titik impas',
    emptyNote: 'Isi biaya tetap, harga jual, dan biaya variabel per unit.',
    positiveNote: 'Bandingkan angka ini dengan penjualan rata-rata sebelum membuat target.',
    cautionNote: 'Harga jual belum menutup biaya variabel. Periksa harga, diskon, atau biaya per unit.',
    fields: [
      { name: 'fixed', label: 'Biaya tetap', unit: 'Rp', placeholder: '3000000' },
      { name: 'price', label: 'Harga jual per unit', unit: 'Rp', placeholder: '35000' },
      { name: 'variable', label: 'Biaya variabel per unit', unit: 'Rp', placeholder: '22000' },
    ],
    example: { fixed: 3000000, price: 35000, variable: 22000 },
    exampleLabel: 'Contoh produksi kecil: biaya tetap Rp3 juta, harga Rp35 ribu, biaya variabel Rp22 ribu',
    nextSteps: ['Cek apakah target unit realistis.', 'Uji skenario harga dan biaya bahan.', 'Pisahkan biaya tetap dari biaya variabel.'],
    related: [
      { label: 'Kalkulator laba', href: '/kalkulator/laba-usaha', text: 'Lanjutkan ke laba periode setelah titik impas diketahui.' },
      { label: 'Kamus HPP', href: '/kamus-bisnis/hpp', text: 'Samakan definisi biaya barang terlebih dahulu.' },
    ],
  },
  'arus-kas-bersih': {
    title: 'Kalkulator Arus Kas Bersih',
    shortTitle: 'Periksa arus kas bersih',
    decision: 'Hitung selisih uang masuk dan uang keluar dalam satu periode.',
    seoTitle: 'Kalkulator Arus Kas Bersih UMKM',
    metaDescription: 'Kalkulator arus kas bersih untuk UMKM. Hitung uang masuk dikurangi uang keluar dan baca artinya secara sederhana.',
    keyword: 'kalkulator arus kas',
    category: 'Kas',
    intent: 'Saat omzet terlihat baik tetapi saldo kas terasa sempit.',
    formula: 'Arus kas bersih = Uang masuk - Uang keluar',
    formulaNote: 'Hitung uang yang benar-benar bergerak, bukan invoice yang belum dibayar.',
    resultLabel: 'Arus kas bersih',
    emptyNote: 'Isi uang masuk dan uang keluar dalam periode yang sama.',
    positiveNote: 'Arus kas positif. Tetap cek pembayaran tertunda dan biaya yang akan jatuh tempo.',
    cautionNote: 'Arus kas negatif. Periksa pengeluaran besar, piutang, dan waktu pembayaran.',
    fields: [
      { name: 'cashIn', label: 'Uang masuk', unit: 'Rp', placeholder: '9500000' },
      { name: 'cashOut', label: 'Uang keluar', unit: 'Rp', placeholder: '11200000' },
    ],
    example: { cashIn: 9500000, cashOut: 11200000 },
    exampleLabel: 'Contoh usaha jasa: uang masuk Rp9,5 juta dan uang keluar Rp11,2 juta',
    nextSteps: ['Pisahkan kas dari laba.', 'Cek piutang yang belum masuk.', 'Gunakan template arus kas agar tanggal pembayaran terlihat.'],
    related: [
      { label: 'Panduan arus kas', href: '/panduan/memahami-arus-kas', text: 'Pelajari cara membaca uang masuk dan keluar.' },
      { label: 'Template arus kas', href: '/template/arus-kas-sederhana', text: 'Catat arus kas sederhana dengan format siap isi.' },
    ],
  },
  'nilai-transaksi-rata-rata': {
    title: 'Kalkulator Nilai Transaksi Rata-rata',
    shortTitle: 'Periksa rata-rata transaksi',
    decision: 'Hitung omzet rata-rata per transaksi dari total penjualan dan jumlah transaksi.',
    seoTitle: 'Kalkulator Nilai Transaksi Rata-rata UMKM',
    metaDescription: 'Kalkulator nilai transaksi rata-rata untuk UMKM. Hitung omzet dibagi jumlah transaksi agar pola penjualan lebih mudah dibaca.',
    keyword: 'kalkulator rata rata transaksi',
    category: 'Penjualan',
    intent: 'Saat ingin tahu apakah omzet naik karena transaksi lebih banyak atau nilai belanja naik.',
    formula: 'Nilai transaksi rata-rata = Omzet / Jumlah transaksi',
    formulaNote: 'Gunakan omzet dan jumlah transaksi dari kanal atau periode yang sama.',
    resultLabel: 'Rata-rata transaksi',
    emptyNote: 'Isi omzet dan jumlah transaksi untuk melihat rata-ratanya.',
    positiveNote: 'Bandingkan rata-rata ini dengan jumlah transaksi agar penyebab perubahan lebih jelas.',
    cautionNote: 'Jumlah transaksi perlu lebih dari nol. Periksa kembali input Anda.',
    fields: [
      { name: 'revenue', label: 'Omzet', unit: 'Rp', placeholder: '18000000' },
      { name: 'transactions', label: 'Jumlah transaksi', unit: 'transaksi', placeholder: '420' },
    ],
    example: { revenue: 18000000, transactions: 420 },
    exampleLabel: 'Contoh retail: omzet Rp18 juta dari 420 transaksi',
    nextSteps: ['Bandingkan dengan jumlah transaksi harian.', 'Cek produk yang sering dibeli bersama.', 'Baca kembali omzet bersama margin dan stok.'],
    related: [
      { label: 'Kamus omzet', href: '/kamus-bisnis/omzet', text: 'Pahami omzet sebelum menilai rata-rata transaksi.' },
      { label: 'Solusi naikkan omzet', href: '/solusi/naikkan-omzet', text: 'Hubungkan omzet dengan produk, waktu, dan pelanggan.' },
    ],
  },
};

export const calculatorEntries = Object.entries(calculators) as [CalculatorKey, CalculatorDefinition][];
