export type BlogCategoryMeta = {
  slug: string;
  name: string;
  description: string;
  introduction: string;
  question: string;
  topics: string[];
  start: string;
  steps: [string, string, string];
  cta: {
    title: string;
    label: string;
    href: string;
  };
};

export const blogCategories: BlogCategoryMeta[] = [
  {
    slug: 'penjualan-omzet',
    name: 'Penjualan & Omzet',
    description: 'Baca pola transaksi, produk terlaris, dan waktu ramai tanpa laporan yang rumit.',
    introduction: 'Penjualan perlu dibaca bersama produk, waktu transaksi, pembayaran, dan periode pembandingnya. Kumpulan ini membantu pemilik usaha menelusuri perubahan omzet tanpa menganggap satu angka sebagai jawaban akhir.',
    question: 'Produk dan waktu mana yang mendorong omzet minggu ini?',
    topics: ['Omzet', 'Produk terlaris', 'Perbandingan periode'],
    start: 'Pilih periode yang setara, periksa transaksi pembentuk omzet, lalu cari produk atau waktu yang benar-benar berubah.',
    steps: ['Pilih periode setara', 'Buka transaksi pembentuknya', 'Catat perubahan utama'],
    cta: { title: 'Ingin melihat alur penjualan dari dekat?', label: 'Pelajari Penjualan', href: '/produk/penjualan/' },
  },
  {
    slug: 'stok-inventori',
    name: 'Stok & Inventori',
    description: 'Pahami stok bergerak dan risiko kosong sebelum terlambat.',
    introduction: 'Stok bukan hanya angka sisa. Pelajari saldo, laju keluar, koreksi, dan waktu pembaruan secara bersamaan agar barang yang perlu dicek terlihat lebih awal.',
    question: 'Barang mana yang perlu diperiksa hari ini?',
    topics: ['Stok minimum', 'Pergerakan barang', 'Stock opname'],
    start: 'Mulai dari saldo terakhir dan tanggal pemeriksaan fisik. Lalu bandingkan dengan penjualan pada periode yang sama.',
    steps: ['Cek saldo terakhir', 'Bandingkan laju keluar', 'Tentukan barang yang diperiksa'],
    cta: { title: 'Ingin melihat alur pemeriksaan stok?', label: 'Lihat Inventori', href: '/produk/inventori/' },
  },
  {
    slug: 'keuangan-umkm',
    name: 'Keuangan UMKM',
    description: 'Baca arus kas, biaya, dan margin dengan bahasa yang lebih ringan.',
    introduction: 'Pisahkan omzet, biaya, laba, dan kas sebelum menarik kesimpulan. Setiap contoh memakai periode yang jelas dan tidak menggantikan saran akuntansi atau pajak.',
    question: 'Mengapa kas berubah dan apa yang perlu diperiksa?',
    topics: ['Arus kas', 'Biaya usaha', 'Laba dan margin'],
    start: 'Catat uang yang benar-benar masuk dan keluar. Jangan campur dengan penjualan yang belum dibayar.',
    steps: ['Pisahkan kas dan omzet', 'Kelompokkan pengeluaran', 'Periksa perubahan terbesar'],
    cta: { title: 'Baca perjalanan uang dalam satu alur.', label: 'Pelajari Keuangan', href: '/produk/keuangan/' },
  },
  {
    slug: 'pelanggan-crm',
    name: 'Pelanggan & CRM',
    description: 'Kenali pelanggan yang kembali belanja dan yang mulai pasif.',
    introduction: 'Riwayat pembelian dapat membantu usaha memahami pola kunjungan, jeda belanja, dan layanan yang pernah dipakai. Gunakan hanya data yang memang tersedia dan boleh dipakai, tanpa menebak kebutuhan pribadi pelanggan.',
    question: 'Pelanggan mana yang belum kembali belanja?',
    topics: ['Repeat customer', 'Riwayat pembelian', 'Izin data'],
    start: 'Pastikan identitas dan izin datanya jelas, lalu bandingkan jeda pembelian pada periode yang setara.',
    steps: ['Periksa izin data', 'Bandingkan riwayat', 'Tentukan tindak lanjut manusia'],
    cta: { title: 'Pelajari pola pelanggan tanpa tindak lanjut otomatis.', label: 'Pelajari Pelanggan', href: '/produk/pelanggan/' },
  },
  {
    slug: 'operasional-bisnis',
    name: 'Operasional Bisnis',
    description: 'Rapikan cara melihat aktivitas harian, laporan, dan keputusan tim.',
    introduction: 'Catatan produk, transaksi, stok, dan tanggung jawab tim perlu memakai istilah serta periode yang konsisten. Kumpulan ini membantu menyusun pekerjaan berulang agar masalah lebih mudah ditelusuri bersama.',
    question: 'Pekerjaan mana yang sering berulang atau sulit ditelusuri?',
    topics: ['Review mingguan', 'Kualitas catatan', 'Tanggung jawab tim'],
    start: 'Pilih satu proses yang sering bermasalah, catat sumber datanya, lalu tetapkan siapa yang memeriksa dan kapan.',
    steps: ['Pilih satu proses', 'Samakan catatan', 'Tetapkan pemeriksaan'],
    cta: { title: 'Lihat ringkasan operasional dengan urutan yang jelas.', label: 'Pelajari Dashboard', href: '/produk/dashboard-bisnis/' },
  },
  {
    slug: 'ai-untuk-umkm',
    name: 'AI untuk UMKM',
    description: 'Pakai AI sebagai pendamping baca konteks, bukan pengganti keputusan.',
    introduction: 'Pakai AI untuk membantu membaca catatan bisnis, bukan menggantikan keputusan. Pelajari kualitas input, bukti, ketidakpastian, izin akses, dan pemeriksaan manusia.',
    question: 'Kapan hasil AI perlu diperiksa manusia?',
    topics: ['Batas AI', 'Kualitas data', 'Pemeriksaan manusia'],
    start: 'Mulai dari pertanyaan yang sempit, sebutkan periode, lalu buka angka yang dipakai untuk menyusun jawaban.',
    steps: ['Tulis pertanyaan sempit', 'Buka data pendukung', 'Periksa sebelum bertindak'],
    cta: { title: 'Lihat cara AI menjelaskan, bukan bertindak.', label: 'Pelajari Asisten AI', href: '/produk/asisten-ai/' },
  },
  {
    slug: 'strategi-per-industri',
    name: 'Strategi per Industri',
    description: 'Temukan pertanyaan yang relevan untuk ritme usaha yang berbeda.',
    introduction: 'Retail, F&B, distributor, reseller, jasa, dan manufaktur kecil memiliki ritme catatan yang berbeda. Artikel di sini membantu memilih pertanyaan dan pembanding yang sesuai tanpa menjanjikan hasil yang sama untuk setiap usaha.',
    question: 'Sinyal apa yang penting untuk jenis usaha saya?',
    topics: ['Retail dan F&B', 'Distributor dan reseller', 'Jasa dan produksi'],
    start: 'Kenali ritme transaksi dan stok usaha, lalu pilih metrik yang benar-benar tersedia untuk diperiksa.',
    steps: ['Kenali ritme usaha', 'Pilih data tersedia', 'Bandingkan secara setara'],
    cta: { title: 'Temukan contoh yang dekat dengan jenis usaha Anda.', label: 'Lihat Industri', href: '/industri/' },
  },
  {
    slug: 'panduan-ramuni',
    name: 'Panduan RAMUNI',
    description: 'Pelajari konsep RAMUNI dengan status fitur yang jelas.',
    introduction: 'Panduan RAMUNI menjelaskan cara menyiapkan pertanyaan, membaca contoh, dan memahami batas tiap alur. Penyebutan produk harus mengikuti status yang telah diverifikasi dan tidak otomatis berarti fitur sudah tersedia.',
    question: 'Apa yang dapat dipelajari dan apa yang masih perlu diverifikasi?',
    topics: ['Memulai', 'Membaca dashboard', 'Batas fitur'],
    start: 'Mulai dari tujuan usaha, pilih skenario yang relevan, lalu periksa status setiap alur sebelum menggunakannya.',
    steps: ['Pilih tujuan', 'Pilih skenario', 'Periksa status fitur'],
    cta: { title: 'Mulai dari alur produk yang paling dekat dengan kebutuhan Anda.', label: 'Coba RAMUNI gratis', href: '/tour-produk-gratis/' },
  },
];

const blogCategoryMap = new Map(blogCategories.map((category) => [category.slug, category]));

export const getBlogCategory = (slug: string): BlogCategoryMeta | undefined => blogCategoryMap.get(slug);
