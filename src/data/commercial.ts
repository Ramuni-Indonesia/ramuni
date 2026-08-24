export type CapabilityStatus = 'Available' | 'Unavailable' | 'Beta';

export interface PricingRow {
  label: string;
  group: string;
  statuses: Record<string, CapabilityStatus>;
}

export interface PricingPlan {
  key: string;
  name: string;
  eyebrow?: string;
  monthly: number | null;
  annual: number | null;
  fit: string;
  limits: string[];
  features: string[];
  cta: string;
  flow: 'trial' | 'consultation';
}

// Commercial values stay in one place so Finance/Product can replace them
// without editing page templates. releaseGates.pricingPublic decides whether
// values are allowed to render publicly.
export const pricingPlans: PricingPlan[] = [
  {
    key: 'free', name: 'Free', monthly: 0, annual: 0,
    fit: 'Bisnis yang ingin mencoba cara kerja RAMUNI.',
    limits: ['Satu workspace', 'Maksimal satu pengguna', 'Batas penggunaan AI dan storage mengikuti validasi paket'],
    features: ['Knowledge base dasar', 'Template SOP dan checklist', 'Catatan bisnis', 'Dashboard dasar', 'AI terbatas'],
    cta: 'Mulai gratis', flow: 'trial',
  },
  {
    key: 'starter', name: 'Starter', monthly: 149000, annual: 1490000,
    fit: 'UMKM kecil yang mulai membangun sistem kerja digital.',
    limits: ['Maksimal tiga pengguna', 'Storage lebih besar dari Free', 'Dukungan email atau chat'],
    features: ['Semua fitur Free', 'Website bisnis sederhana', 'Knowledge base bisnis', 'Catatan pemasukan dan pengeluaran', 'Laporan dasar', 'AI Copilot terbatas'],
    cta: 'Pilih Starter', flow: 'trial',
  },
  {
    key: 'growth', name: 'Growth', eyebrow: 'Paling populer', monthly: 349000, annual: 3490000,
    fit: 'UMKM aktif yang membutuhkan satu sistem untuk operasional dan keputusan bisnis.',
    limits: ['Maksimal sepuluh pengguna', 'Integrasi dasar mengikuti ketersediaan', 'Prioritas support'],
    features: ['Semua fitur Starter', 'AI Copilot untuk analisis bisnis', 'Profit Intelligence', 'Analisis pendapatan, biaya, dan margin', 'Omnichannel inbox', 'Knowledge OS lengkap', 'Meeting notes dan task follow-up', 'Dashboard performa bisnis'],
    cta: 'Mulai Growth', flow: 'trial',
  },
  {
    key: 'pro', name: 'Pro', monthly: 749000, annual: 7490000,
    fit: 'Bisnis berkembang dengan banyak pengguna, proses, atau outlet.',
    limits: ['Multi-user dan role mengikuti konfigurasi', 'Multi-outlet dan API perlu verifikasi rilis', 'AI usage lebih besar mengikuti batas paket'],
    features: ['Semua fitur Growth', 'Multi-user dengan role dan permission', 'Multi-outlet', 'Automasi workflow', 'Dashboard lanjutan', 'Knowledge workspace per tim', 'API dan integrasi tambahan', 'Export data'],
    cta: 'Pilih Pro', flow: 'trial',
  },
  {
    key: 'business', name: 'Business', monthly: null, annual: null,
    fit: 'Perusahaan, jaringan outlet, dan organisasi dengan konfigurasi khusus.',
    limits: ['Kontrak dan invoice perusahaan', 'Onboarding atau migrasi disesuaikan', 'SLA dan training dibahas bersama'],
    features: ['Semua fitur Pro', 'Multi-tenant atau multi-brand', 'Multi-outlet sesuai kontrak', 'API khusus', 'Custom workflow', 'Security review', 'Training tim'],
    cta: 'Hubungi sales', flow: 'consultation',
  },
];

const packageStatus = (available: string[]): Record<string, CapabilityStatus> => Object.fromEntries(
  ['free', 'starter', 'growth', 'pro', 'business'].map((key) => [key, available.includes(key) ? 'Available' : 'Unavailable']),
) as Record<string, CapabilityStatus>;

export const pricingRows: PricingRow[] = [
  { group: 'Operasional', label: 'Dashboard bisnis', statuses: packageStatus(['free', 'starter', 'growth', 'pro', 'business']) },
  { group: 'Operasional', label: 'Pencatatan pemasukan dan pengeluaran', statuses: packageStatus(['free', 'starter', 'growth', 'pro', 'business']) },
  { group: 'Operasional', label: 'Template SOP dan checklist', statuses: packageStatus(['free', 'starter', 'growth', 'pro', 'business']) },
  { group: 'AI', label: 'AI Copilot dan ringkasan', statuses: packageStatus(['free', 'starter', 'growth', 'pro', 'business']) },
  { group: 'AI', label: 'Batas penggunaan AI', statuses: packageStatus(['free', 'starter', 'growth', 'pro', 'business']) },
  { group: 'Knowledge OS', label: 'Wiki, dokumen, SOP, dan meeting notes', statuses: packageStatus(['free', 'starter', 'growth', 'pro', 'business']) },
  { group: 'Website & pelanggan', label: 'Web Builder dan form kontak', statuses: packageStatus(['starter', 'growth', 'pro', 'business']) },
  { group: 'Website & pelanggan', label: 'Omnichannel inbox dan riwayat pelanggan', statuses: packageStatus(['growth', 'pro', 'business']) },
  { group: 'Kolaborasi', label: 'Multi-user, role, dan workspace tim', statuses: packageStatus(['starter', 'growth', 'pro', 'business']) },
  { group: 'Integrasi', label: 'Export CSV', statuses: packageStatus(['pro', 'business']) },
  { group: 'Integrasi', label: 'API, WhatsApp, marketplace, pembayaran, akuntansi', statuses: packageStatus(['growth', 'pro', 'business']) },
];

export interface FeatureDetail {
  slug: string;
  name: string;
  eyebrow: string;
  status: CapabilityStatus;
  statusNote: string;
  summary: string;
  highlights: string[];
  examples: string[];
  limitations: string[];
  relatedHref: string;
  relatedLabel: string;
}

export const featureDetails: FeatureDetail[] = [
  {
    slug: 'ai-copilot', name: 'AI Copilot', eyebrow: 'Fitur & insight', status: 'Available',
    statusNote: 'Tersedia di workspace RAMUNI; akses dan batas penggunaan mengikuti paket serta role pengguna.',
    summary: 'Bantu membaca data, dokumen, SOP, dan catatan bisnis dengan pertanyaan yang bisa diperiksa kembali.',
    highlights: ['Pertanyaan bisnis dalam bahasa sehari-hari', 'Ringkasan yang mengarah ke periode dan sumber', 'Rekomendasi langkah berikutnya dengan kendali manusia'],
    examples: ['Produk mana yang paling menguntungkan?', 'Mengapa penjualan minggu ini berubah?', 'Buatkan draf SOP pembukaan toko.', 'Ringkas meeting terakhir menjadi daftar tugas.'],
    limitations: ['Hasil AI adalah rekomendasi, bukan keputusan otomatis.', 'Jawaban tetap perlu diverifikasi dengan data dan konteks usaha.', 'Batas pemakaian mengikuti paket dan hak akses workspace.'],
    relatedHref: '/produk/asisten-ai/', relatedLabel: 'Lihat Asisten AI',
  },
  {
    slug: 'profit-intelligence', name: 'Profit Intelligence', eyebrow: 'Fitur & keuangan', status: 'Available',
    statusNote: 'Tersedia untuk membaca pendapatan, biaya, dan margin berdasarkan data yang Anda masukkan ke workspace.',
    summary: 'Kerangka untuk melihat pendapatan, biaya, margin, dan perubahan periode dalam satu pembacaan.',
    highlights: ['Pendapatan dan biaya dalam periode yang sama', 'Perbandingan margin dan produk', 'Insight sederhana untuk menentukan pemeriksaan berikutnya'],
    examples: ['Produk mana yang memberi margin lebih baik?', 'Biaya mana yang berubah bulan ini?', 'Apa yang perlu diperiksa sebelum mengubah harga?'],
    limitations: ['Bukan pengganti akuntan profesional.', 'Hasil bergantung pada kelengkapan dan definisi data usaha.', 'Akses analisis mengikuti paket dan hak akses workspace.'],
    relatedHref: '/produk/keuangan/', relatedLabel: 'Pelajari Keuangan',
  },
  {
    slug: 'omnichannel', name: 'Omnichannel', eyebrow: 'Fitur & pelanggan', status: 'Available',
    statusNote: 'Tersedia untuk mengelola percakapan, catatan pelanggan, dan tindak lanjut dari kanal yang terhubung.',
    summary: 'Inbox terpusat untuk riwayat percakapan, catatan pelanggan, dan follow-up yang lebih mudah dipantau.',
    highlights: ['Inbox dan status follow-up terpusat', 'Catatan serta tag pelanggan', 'Draf balasan dengan bantuan AI'],
    examples: ['Percakapan mana yang belum ditindaklanjuti?', 'Tampilkan catatan pelanggan yang relevan.', 'Siapkan draf balasan yang sopan.'],
    limitations: ['Kanal yang tampil mengikuti koneksi yang diaktifkan di workspace.', 'RAMUNI tidak mengirim pesan otomatis tanpa persetujuan dan konfigurasi yang sah.', 'Hak akses riwayat dan tindak lanjut mengikuti role pengguna.'],
    relatedHref: '/solusi/pahami-pelanggan/', relatedLabel: 'Lihat solusi pelanggan',
  },
  {
    slug: 'web-builder', name: 'Web Builder', eyebrow: 'Fitur & halaman bisnis', status: 'Available',
    statusNote: 'Tersedia untuk menyusun halaman bisnis, informasi produk atau layanan, dan jalur kontak.',
    summary: 'Kerangka untuk membuat halaman bisnis sederhana, informasi usaha, produk, layanan, dan CTA kontak.',
    highlights: ['Template halaman bisnis', 'Informasi produk atau layanan', 'Form kontak dan SEO dasar'],
    examples: ['Susun halaman profil usaha.', 'Tampilkan produk utama dengan CTA WhatsApp.', 'Periksa struktur judul dan deskripsi halaman.'],
    limitations: ['Domain custom dan pengelolaan konten mengikuti paket.', 'Form dan CTA perlu dihubungkan ke kanal yang Anda pilih.', 'Hak publikasi mengikuti role pengguna.'],
    relatedHref: '/tour-produk-gratis/?flow=trial', relatedLabel: 'Coba Web Builder',
  },
  {
    slug: 'knowledge-os', name: 'Knowledge OS', eyebrow: 'Fitur & pengetahuan', status: 'Available',
    statusNote: 'Tersedia untuk menyimpan SOP, dokumentasi, catatan, dan keputusan tim dalam satu workspace.',
    summary: 'Ruang pengetahuan agar SOP, keputusan, catatan, dan meeting notes tidak tercecer.',
    highlights: ['Wiki dan struktur folder', 'SOP serta dokumentasi tim', 'AI Search dan hak akses per pengguna'],
    examples: ['Temukan SOP pembukaan toko.', 'Ringkas keputusan rapat terakhir.', 'Tunjukkan dokumen yang perlu diperbarui.'],
    limitations: ['Hak akses dan kolaborasi tim mengikuti role serta paket.', 'Gunakan workspace resmi untuk data bisnis dan batasi akses sesuai kebutuhan.', 'Pencarian AI tetap perlu diperiksa terhadap dokumen sumber.'],
    relatedHref: '/sumber-daya/', relatedLabel: 'Buka sumber daya',
  },
];

export const faqItems = [
  { question: 'Apakah RAMUNI cocok untuk bisnis baru?', answer: 'Ya. Jalur coba gratis dan halaman sumber daya membantu bisnis baru membangun kebiasaan membaca data secara bertahap.' },
  { question: 'Apakah RAMUNI hanya untuk toko atau restoran?', answer: 'Tidak. Konteks yang tersedia mencakup retail, F&B, jasa, distributor, reseller online, dan manufaktur kecil.' },
  { question: 'Apakah saya harus memahami akuntansi?', answer: 'Tidak untuk mulai memahami konsepnya. RAMUNI menyederhanakan bahasa, tetapi informasi bisnis tetap bukan pengganti jasa akuntan profesional.' },
  { question: 'Apakah AI RAMUNI bisa mengambil keputusan sendiri?', answer: 'Tidak. AI memberi analisis atau rekomendasi; keputusan dan verifikasi tetap berada pada pemilik atau pengelola bisnis.' },
  { question: 'Apakah data bisnis saya aman?', answer: 'Gunakan hanya data yang diperlukan pada jalur resmi. RAMUNI sedang membangun standar keamanan, kontrol akses, dan perlindungan data secara bertahap; jangan kirim data sensitif melalui form publik.' },
  { question: 'Apakah bisa digunakan oleh banyak karyawan?', answer: 'Bisa. Jumlah pengguna, role, dan hak akses mengikuti paket yang dipilih. Hubungi tim untuk memetakan kebutuhan tanpa mengirim data sensitif.' },
  { question: 'Apakah tersedia trial?', answer: 'Ya. Mulai dari sesi coba gratis untuk melihat alur yang relevan, lalu pilih paket yang sesuai dari halaman pricing.' },
  { question: 'Apakah bisa membatalkan langganan?', answer: 'Bisa sesuai ketentuan paket. Aturan pembatalan dan periode tagihan ditampilkan transparan sebelum paket berbayar diaktifkan.' },
  { question: 'Apakah ada biaya setup?', answer: 'Jalur coba gratis tidak memerlukan biaya setup. Onboarding atau migrasi khusus untuk Business akan dibahas sesuai kebutuhan dan kontrak.' },
];
