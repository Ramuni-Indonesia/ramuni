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
    introduction: 'Baca penjualan bersama produk, waktu, pembayaran, dan periode pembanding. Kumpulan ini membantu menelusuri perubahan omzet tanpa terpaku pada satu angka.',
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
    slug: 'operasional-usaha',
    name: 'Operasional Usaha',
    description: 'Susun SOP, catatan kerja, dan pemeriksaan harian agar pekerjaan rutin lebih mudah ditelusuri.',
    introduction: 'Operasional usaha berjalan lebih rapi ketika tim menyepakati langkah, sumber catatan, dan pemeriksaan rutin. Kumpulan ini membahas pekerjaan sehari-hari tanpa mengasumsikan semua usaha memakai proses yang sama.',
    question: 'Pekerjaan rutin mana yang perlu dibuat lebih mudah diperiksa?',
    topics: ['SOP toko', 'Catatan harian', 'Pemeriksaan tim'],
    start: 'Pilih satu pekerjaan yang berulang, tulis urutan sederhananya, lalu periksa apakah catatan dan penanggung jawabnya sudah jelas.',
    steps: ['Pilih pekerjaan berulang', 'Samakan catatan dan langkah', 'Tinjau bersama tim'],
    cta: { title: 'Lihat bagaimana catatan harian dapat diringkas untuk ditindaklanjuti.', label: 'Pelajari Laporan & Insight', href: '/produk/laporan-insight/' },
  },
  {
    slug: 'penjualan-pemasaran',
    name: 'Penjualan & Pemasaran',
    description: 'Evaluasi promosi, produk, dan pola transaksi sebelum menentukan langkah penjualan berikutnya.',
    introduction: 'Penjualan dan pemasaran perlu dibaca dari transaksi, produk, waktu, serta biaya yang relevan. Kumpulan ini membantu usaha mengevaluasi perubahan tanpa menjanjikan hasil atau mendorong promosi yang belum tentu tepat.',
    question: 'Perubahan penjualan mana yang layak diperiksa sebelum promosi berikutnya?',
    topics: ['Evaluasi promo', 'Produk pelengkap', 'Pola transaksi'],
    start: 'Bandingkan periode yang setara, buka produk dan waktu yang berubah, lalu pilih satu pemeriksaan sebelum mengubah promosi.',
    steps: ['Bandingkan periode setara', 'Buka produk dan waktu', 'Uji satu langkah berikutnya'],
    cta: { title: 'Baca perubahan omzet dari transaksi yang membentuknya.', label: 'Pelajari Penjualan', href: '/produk/penjualan/' },
  },
  {
    slug: 'ai-untuk-umkm',
    name: 'AI untuk UMKM',
    description: 'Pakai AI sebagai pendamping baca konteks, bukan pengganti keputusan.',
    introduction: 'Pakai AI untuk membantu membaca catatan bisnis, bukan menggantikan keputusan. Pelajari kualitas input, bukti, ketidakpastian, izin akses, dan pemeriksaan manusia.',
    question: 'Kapan hasil AI perlu diperiksa manusia?',
    topics: ['Peran AI', 'Kualitas data', 'Pemeriksaan manusia'],
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
    description: 'Pelajari konsep RAMUNI melalui skenario dan cara kerja produk.',
    introduction: 'Panduan RAMUNI menjelaskan cara menyiapkan pertanyaan, membaca contoh, dan memahami langkah pada setiap alur.',
    question: 'Bagaimana RAMUNI membantu membaca data dan menentukan langkah?',
    topics: ['Memulai', 'Membaca dashboard', 'Cara kerja fitur'],
    start: 'Mulai dari tujuan usaha, pilih skenario yang relevan, lalu ikuti cara kerja setiap alur.',
    steps: ['Pilih tujuan', 'Pilih skenario', 'Ikuti cara kerja'],
    cta: { title: 'Mulai dari alur produk yang paling dekat dengan kebutuhan Anda.', label: 'Coba gratis', href: '/tour-produk-gratis/' },
  },
];

const blogCategoryMap = new Map(blogCategories.map((category) => [category.slug, category]));

export const getBlogCategory = (slug: string): BlogCategoryMeta | undefined => blogCategoryMap.get(slug);
