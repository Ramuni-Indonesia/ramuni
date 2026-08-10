export type CalculatorKey =
  | 'laba-usaha'
  | 'hpp'
  | 'reorder-stok'
  | 'margin-laba-kotor'
  | 'titik-impas'
  | 'arus-kas-bersih'
  | 'nilai-transaksi-rata-rata'
  | 'harga-jual'
  | 'perubahan-omzet'
  | 'hpp-per-porsi'
  | 'target-penjualan'
  | 'repeat-customer-rate'
  | 'safety-stock'
  | 'penjualan-per-jam';

export interface CalculatorField {
  name: string;
  label: string;
  unit: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number | 'any';
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
      { label: 'Panduan arus kas', href: '/panduan/memahami-arus-kas/', text: 'Lihat kenapa laba dan kas bisa berbeda.' },
      { label: 'Kamus omzet', href: '/kamus-bisnis/omzet/', text: 'Samakan dulu arti omzet sebelum menghitung laba.' },
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
      { label: 'Kalkulator margin', href: '/kalkulator/margin-laba-kotor/', text: 'Baca HPP bersama nilai penjualan.' },
      { label: 'Kamus HPP', href: '/kamus-bisnis/hpp/', text: 'Pahami arti HPP sebelum membandingkan margin.' },
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
      { label: 'Panduan stok harian', href: '/panduan/membaca-stok-harian/', text: 'Susun urutan membaca stok sebelum pesan ulang.' },
      { label: 'Template stok', href: '/template/stok-harian/', text: 'Catat stok harian dengan format sederhana.' },
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
      { label: 'Kalkulator HPP', href: '/kalkulator/hpp/', text: 'Hitung HPP sebelum membaca margin.' },
      { label: 'Solusi naikkan omzet', href: '/solusi/naikkan-omzet/', text: 'Lihat omzet bersama produk dan pelanggan.' },
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
      { label: 'Kalkulator laba', href: '/kalkulator/laba-usaha/', text: 'Lanjutkan ke laba periode setelah titik impas diketahui.' },
      { label: 'Kamus HPP', href: '/kamus-bisnis/hpp/', text: 'Samakan definisi biaya barang terlebih dahulu.' },
    ],
  },
  'repeat-customer-rate': {
    title: 'Kalkulator Repeat Customer Rate',
    shortTitle: 'Periksa pelanggan yang kembali',
    decision: 'Hitung proporsi pelanggan unik yang kembali tanpa memasukkan nama atau kontak pelanggan.',
    seoTitle: 'Kalkulator Repeat Customer Rate untuk UMKM',
    metaDescription: 'Kalkulator repeat customer rate untuk UMKM. Hitung pelanggan unik yang kembali berbelanja secara lokal di browser.',
    keyword: 'kalkulator repeat customer rate',
    category: 'Penjualan',
    intent: 'Saat usaha ingin membaca pembelian ulang dari catatan pelanggan yang memang dapat digunakan.',
    formula: 'Repeat customer rate = Pelanggan unik yang kembali / Pelanggan unik yang tercakup x 100%',
    formulaNote: 'Masukkan jumlah pelanggan unik, bukan jumlah transaksi. Pembilang tidak boleh lebih besar daripada penyebut.',
    resultLabel: 'Repeat customer rate',
    emptyNote: 'Isi dua jumlah pelanggan unik dari periode dan aturan identitas yang sama.',
    positiveNote: 'Tulis cakupan data dan bandingkan dengan periode setara sebelum menyimpulkan perubahan layanan atau penjualan.',
    cautionNote: 'Periksa lagi: pelanggan kembali tidak boleh melebihi pelanggan unik yang tercakup, dan penyebut harus lebih dari nol.',
    fields: [
      { name: 'identifiedCustomers', label: 'Pelanggan unik yang tercakup', unit: 'pelanggan', placeholder: '200', min: 1, step: 1 },
      { name: 'returningCustomers', label: 'Pelanggan unik yang kembali', unit: 'pelanggan', placeholder: '70', min: 0, step: 1 },
    ],
    example: { identifiedCustomers: 200, returningCustomers: 70 },
    exampleLabel: 'Contoh: 200 pelanggan unik tercakup, 70 di antaranya pernah bertransaksi sebelumnya',
    nextSteps: ['Catat definisi periode dan pengenal yang dipakai.', 'Pisahkan pelanggan anonim dari penyebut metrik ini.', 'Tinjau stok, layanan, dan keluhan sebelum mengubah komunikasi pelanggan.'],
    related: [
      { label: 'Data pelanggan minimum', href: '/blog/data-pelanggan-yang-perlu-dicatat-umkm/', text: 'Tentukan data yang memang diperlukan untuk layanan dan catatan transaksi.' },
      { label: 'Pelanggan kembali belanja', href: '/blog/cara-melihat-pelanggan-yang-kembali-belanja/', text: 'Baca riwayat pembelian tanpa menjadikan metrik sebagai pengawasan.' },
    ],
  },
  'safety-stock': {
    title: 'Kalkulator Safety Stock',
    shortTitle: 'Uji buffer stok pengaman',
    decision: 'Perkirakan buffer dari perbedaan pemakaian dan waktu tunggu yang benar-benar pernah terjadi.',
    seoTitle: 'Kalkulator Safety Stock untuk Usaha Kecil',
    metaDescription: 'Kalkulator safety stock untuk usaha kecil. Uji buffer stok pengaman dari pemakaian dan lead time tanpa menyimpan data.',
    keyword: 'kalkulator safety stock',
    category: 'Stok',
    intent: 'Saat produk penting sering kosong atau cadangannya terasa terlalu besar.',
    formula: 'Safety stock = (Pemakaian tertinggi x Lead time terpanjang) - (Pemakaian rata-rata x Lead time rata-rata)',
    formulaNote: 'Gunakan satuan, produk, dan periode yang sama. Hasil adalah titik uji operasional, bukan jumlah pembelian otomatis.',
    resultLabel: 'Buffer stok pengaman',
    emptyNote: 'Isi pemakaian dan lead time yang berasal dari catatan produk yang sama.',
    positiveNote: 'Bandingkan buffer dengan usia simpan, saldo layak pakai, kas, dan stok dalam perjalanan sebelum membuat pesanan.',
    cautionNote: 'Periksa data: pemakaian serta lead time perlu lebih dari nol, dan hasil nol atau negatif perlu dibaca sebagai sinyal untuk meninjau asumsi.',
    fields: [
      { name: 'maximumDailyUse', label: 'Pemakaian tertinggi', unit: 'unit/hari', placeholder: '12', min: 0, step: 'any' },
      { name: 'maximumLeadTime', label: 'Lead time terpanjang', unit: 'hari', placeholder: '5', min: 0, step: 'any' },
      { name: 'averageDailyUse', label: 'Pemakaian rata-rata', unit: 'unit/hari', placeholder: '10', min: 0, step: 'any' },
      { name: 'averageLeadTime', label: 'Lead time rata-rata', unit: 'hari', placeholder: '3', min: 0, step: 'any' },
    ],
    example: { maximumDailyUse: 12, maximumLeadTime: 5, averageDailyUse: 10, averageLeadTime: 3 },
    exampleLabel: 'Contoh: tertinggi 12 unit/hari selama 5 hari, rata-rata 10 unit/hari selama 3 hari',
    nextSteps: ['Periksa apakah barang mudah rusak atau mahal untuk disimpan.', 'Tambahkan kebutuhan lead time ke buffer hanya saat menghitung titik reorder.', 'Tinjau stok kosong, sisa, dan keterlambatan setelah satu atau dua siklus pesanan.'],
    related: [
      { label: 'Kalkulator reorder stok', href: '/kalkulator/reorder-stok/', text: 'Gabungkan pemakaian rata-rata, lead time, dan buffer saat menentukan titik cek stok.' },
      { label: 'Panduan stok harian', href: '/panduan/membaca-stok-harian/', text: 'Rapikan saldo, koreksi, dan waktu pemeriksaan produk.' },
    ],
  },
  'penjualan-per-jam': {
    title: 'Kalkulator Penjualan per Jam',
    shortTitle: 'Bandingkan ritme penjualan',
    decision: 'Hitung nilai penjualan rata-rata per jam sebagai titik awal untuk membaca beban layanan dan pola waktu.',
    seoTitle: 'Kalkulator Penjualan per Jam untuk Toko',
    metaDescription: 'Kalkulator penjualan per jam untuk toko. Hitung penjualan bersih per jam dari satu periode yang sebanding.',
    keyword: 'kalkulator penjualan per jam',
    category: 'Penjualan',
    intent: 'Saat total harian tidak cukup menjelaskan jam ramai, beban layanan, atau waktu persiapan.',
    formula: 'Rata-rata penjualan per jam = Penjualan bersih / Jam operasional',
    formulaNote: 'Gunakan penjualan bersih dan jam buka dari periode yang sama. Hasil bukan pengganti laporan transaksi per blok jam.',
    resultLabel: 'Rata-rata penjualan per jam',
    emptyNote: 'Isi penjualan bersih dan jumlah jam operasional untuk periode yang sama.',
    positiveNote: 'Bandingkan hasil hanya dengan hari atau shift yang sejenis, lalu buka jumlah transaksi, unit, dan stok per jam.',
    cautionNote: 'Jam operasional harus lebih dari nol. Periksa juga apakah penjualan dan jam yang dipakai berasal dari periode yang setara.',
    fields: [
      { name: 'netSales', label: 'Penjualan bersih', unit: 'Rp', placeholder: '1800000', min: 0 },
      { name: 'operatingHours', label: 'Jam operasional', unit: 'jam', placeholder: '12', min: 0, step: 'any' },
    ],
    example: { netSales: 1800000, operatingHours: 12 },
    exampleLabel: 'Contoh: penjualan bersih Rp1,8 juta selama 12 jam buka',
    nextSteps: ['Pecah transaksi ke blok satu atau dua jam, bukan hanya melihat rata-ratanya.', 'Bandingkan hari kerja dengan hari kerja dan akhir pekan dengan akhir pekan.', 'Catat antrean, stok kosong, promo, dan perubahan shift yang memengaruhi angka.'],
    related: [
      { label: 'Kalkulator rata-rata transaksi', href: '/kalkulator/nilai-transaksi-rata-rata/', text: 'Bedakan perubahan karena jumlah pembeli atau nilai belanja per transaksi.' },
      { label: 'SOP buka dan tutup toko', href: '/blog/sop-buka-tutup-toko-sederhana/', text: 'Bawa pola waktu ke persiapan dan penutupan operasional.' },
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
      { label: 'Panduan arus kas', href: '/panduan/memahami-arus-kas/', text: 'Pelajari cara membaca uang masuk dan keluar.' },
      { label: 'Template arus kas', href: '/template/arus-kas-sederhana/', text: 'Catat arus kas sederhana dengan format siap isi.' },
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
      { label: 'Kamus omzet', href: '/kamus-bisnis/omzet/', text: 'Pahami omzet sebelum menilai rata-rata transaksi.' },
      { label: 'Solusi naikkan omzet', href: '/solusi/naikkan-omzet/', text: 'Hubungkan omzet dengan produk, waktu, dan pelanggan.' },
    ],
  },
  'harga-jual': {
    title: 'Kalkulator Harga Jual dari Target Margin',
    shortTitle: 'Periksa harga jual target',
    decision: 'Perkirakan harga jual dari HPP per unit dan target margin kotor.',
    seoTitle: 'Kalkulator Harga Jual dan Margin Gratis untuk UMKM',
    metaDescription: 'Kalkulator harga jual gratis untuk UMKM. Masukkan HPP per unit dan target margin untuk memperkirakan harga jual dengan rumus terbuka.',
    keyword: 'kalkulator harga jual',
    category: 'Laba',
    intent: 'Saat menentukan harga tetapi belum yakin margin yang tersisa cukup.',
    formula: 'Harga jual = HPP per unit / (1 - Target margin)',
    formulaNote: 'Target margin harus di bawah 100%. Masukkan kemasan, fee, dan biaya variabel lain ke HPP bila ingin ikut diperhitungkan.',
    resultLabel: 'Perkiraan harga jual',
    emptyNote: 'Isi HPP per unit dan target margin untuk melihat perkiraan harga jual.',
    positiveNote: 'Bandingkan harga ini dengan daya beli, harga pasar, volume, diskon, dan biaya lain sebelum menetapkannya.',
    cautionNote: 'Target margin harus berada di antara 0 dan kurang dari 100 persen, serta HPP perlu lebih besar dari nol.',
    fields: [
      { name: 'unitCost', label: 'HPP per unit', unit: 'Rp', placeholder: '25000' },
      { name: 'targetMargin', label: 'Target margin', unit: '%', placeholder: '35', max: 99.99 },
    ],
    example: { unitCost: 25000, targetMargin: 35 },
    exampleLabel: 'Contoh produk: HPP Rp25 ribu dan target margin 35 persen',
    nextSteps: ['Masukkan biaya kemasan dan fee yang memang ditanggung.', 'Uji dampak diskon terhadap margin akhir.', 'Bedakan target margin dari markup harga.'],
    related: [
      { label: 'Kalkulator HPP', href: '/kalkulator/hpp/', text: 'Periksa HPP sebelum menentukan dasar harga.' },
      { label: 'Kalkulator margin kotor', href: '/kalkulator/margin-laba-kotor/', text: 'Uji kembali margin dari harga jual yang dipilih.' },
    ],
  },
  'perubahan-omzet': {
    title: 'Kalkulator Perubahan Omzet',
    shortTitle: 'Bandingkan perubahan omzet',
    decision: 'Hitung perubahan omzet antara dua periode yang sebanding.',
    seoTitle: 'Kalkulator Pertumbuhan Omzet Gratis untuk UMKM',
    metaDescription: 'Kalkulator perubahan dan pertumbuhan omzet gratis untuk UMKM. Bandingkan omzet periode awal dan akhir dengan rumus persentase terbuka.',
    keyword: 'kalkulator pertumbuhan omzet',
    category: 'Penjualan',
    intent: 'Saat ingin tahu seberapa besar omzet naik atau turun dibanding periode sebelumnya.',
    formula: 'Perubahan omzet = (Omzet akhir - Omzet awal) / Omzet awal x 100%',
    formulaNote: 'Gunakan periode dengan durasi, hari operasional, kanal, dan definisi omzet yang sama. Omzet awal tidak boleh nol.',
    resultLabel: 'Perubahan omzet',
    emptyNote: 'Isi omzet awal dan omzet akhir dari dua periode yang sebanding.',
    positiveNote: 'Buka produk, waktu, transaksi, dan pelanggan yang membentuk perubahan sebelum menentukan tindakan.',
    cautionNote: 'Omzet awal harus lebih besar dari nol. Jika hasil turun, periksa nominal dasar dan penyebabnya, bukan persentase saja.',
    fields: [
      { name: 'previousRevenue', label: 'Omzet periode awal', unit: 'Rp', placeholder: '12000000' },
      { name: 'currentRevenue', label: 'Omzet periode akhir', unit: 'Rp', placeholder: '13800000' },
    ],
    example: { previousRevenue: 12000000, currentRevenue: 13800000 },
    exampleLabel: 'Contoh mingguan: omzet naik dari Rp12 juta menjadi Rp13,8 juta',
    nextSteps: ['Pastikan jumlah hari dan jam operasional setara.', 'Pisahkan perubahan jumlah transaksi dan nilai transaksi rata-rata.', 'Periksa diskon, retur, stok kosong, dan kanal penjualan.'],
    related: [
      { label: 'Kamus pertumbuhan penjualan', href: '/kamus-bisnis/pertumbuhan-penjualan/', text: 'Pahami cara membaca perubahan nominal dan persentase.' },
      { label: 'Kalkulator rata-rata transaksi', href: '/kalkulator/nilai-transaksi-rata-rata/', text: 'Lihat apakah perubahan datang dari nilai belanja per transaksi.' },
    ],
  },
  'hpp-per-porsi': {
    title: 'Kalkulator HPP per Porsi',
    shortTitle: 'Periksa HPP per porsi',
    decision: 'Bagi biaya satu batch dengan jumlah porsi yang benar-benar layak dijual.',
    seoTitle: 'Kalkulator HPP per Porsi Gratis untuk Usaha Kuliner',
    metaDescription: 'Kalkulator HPP per porsi gratis untuk usaha kuliner. Hitung bahan, kemasan, biaya variabel langsung, dan jumlah porsi layak jual.',
    keyword: 'kalkulator HPP per porsi',
    category: 'Laba',
    intent: 'Saat biaya bahan terlihat kecil tetapi margin per menu tetap sulit dibaca.',
    formula: 'HPP per porsi = (Bahan + Kemasan + Biaya variabel langsung) / Porsi layak jual',
    formulaNote: 'Gunakan hasil porsi yang benar-benar dapat dijual. Susut dan produk gagal tidak boleh ikut memperbesar pembagi.',
    resultLabel: 'Perkiraan HPP per porsi',
    emptyNote: 'Isi biaya satu batch dan jumlah porsi layak jual.',
    positiveNote: 'Lanjutkan dengan memeriksa harga jual, waste, dan biaya yang belum masuk ke batch.',
    cautionNote: 'Jumlah porsi layak jual harus lebih dari nol. Periksa juga apakah semua biaya memakai batch yang sama.',
    fields: [
      { name: 'ingredientCost', label: 'Total biaya bahan', unit: 'Rp', placeholder: '180000' },
      { name: 'packagingCost', label: 'Total biaya kemasan', unit: 'Rp', placeholder: '40000' },
      { name: 'directCost', label: 'Biaya variabel langsung lain', unit: 'Rp', placeholder: '30000' },
      { name: 'sellablePortions', label: 'Porsi layak jual', unit: 'porsi', placeholder: '50', min: 1, step: 1 },
    ],
    example: { ingredientCost: 180000, packagingCost: 40000, directCost: 30000, sellablePortions: 50 },
    exampleLabel: 'Contoh dapur: total biaya Rp250 ribu menghasilkan 50 porsi layak jual',
    nextSteps: ['Catat waste dan porsi gagal secara terpisah.', 'Masukkan biaya kemasan per batch yang sama.', 'Bandingkan HPP dengan harga jual dan target margin.'],
    related: [
      { label: 'Template HPP produk', href: '/template/hpp-produk/', text: 'Susun komponen biaya sebelum menghitung HPP per porsi.' },
      { label: 'Kalkulator harga jual', href: '/kalkulator/harga-jual/', text: 'Perkirakan harga jual setelah HPP per porsi diketahui.' },
    ],
  },
  'target-penjualan': {
    title: 'Kalkulator Target Penjualan',
    shortTitle: 'Periksa target transaksi',
    decision: 'Ubah target omzet menjadi perkiraan jumlah transaksi yang perlu dicapai.',
    seoTitle: 'Kalkulator Target Penjualan Gratis untuk UMKM',
    metaDescription: 'Kalkulator target penjualan gratis untuk UMKM. Bagi target omzet dengan nilai transaksi rata-rata untuk memperkirakan kebutuhan transaksi.',
    keyword: 'kalkulator target penjualan',
    category: 'Penjualan',
    intent: 'Saat target omzet sudah ada tetapi tim belum tahu berapa transaksi yang perlu dikejar.',
    formula: 'Target transaksi = Target omzet / Nilai transaksi rata-rata',
    formulaNote: 'Hasil dibulatkan ke atas. Angka ini bukan proyeksi permintaan dan tidak menjamin target omzet tercapai.',
    resultLabel: 'Perkiraan transaksi yang dibutuhkan',
    emptyNote: 'Isi target omzet dan nilai transaksi rata-rata.',
    positiveNote: 'Bandingkan kebutuhan transaksi dengan kapasitas, jam operasional, stok, dan pola hari ramai.',
    cautionNote: 'Target omzet dan nilai transaksi rata-rata harus lebih dari nol.',
    fields: [
      { name: 'revenueTarget', label: 'Target omzet', unit: 'Rp', placeholder: '10000000', min: 1 },
      { name: 'averageTransaction', label: 'Nilai transaksi rata-rata', unit: 'Rp', placeholder: '85000', min: 1 },
    ],
    example: { revenueTarget: 10000000, averageTransaction: 85000 },
    exampleLabel: 'Contoh mingguan: target Rp10 juta dengan rata-rata transaksi Rp85 ribu',
    nextSteps: ['Bagi target transaksi ke jumlah hari operasional.', 'Periksa kapasitas layanan dan stok produk utama.', 'Jangan menaikkan target tanpa membaca pola permintaan.'],
    related: [
      { label: 'Kalkulator rata-rata transaksi', href: '/kalkulator/nilai-transaksi-rata-rata/', text: 'Hitung nilai transaksi rata-rata dari data periode sebelumnya.' },
      { label: 'Template penjualan harian', href: '/template/penjualan-harian/', text: 'Catat realisasi transaksi dan omzet per hari.' },
    ],
  },
};

export const calculatorEntries = Object.entries(calculators) as [CalculatorKey, CalculatorDefinition][];
