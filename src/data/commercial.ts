export type CapabilityStatus = 'Available' | 'Limited' | 'Beta' | 'Coming soon' | 'Unavailable';

export const capabilityStatusLabel = (status: CapabilityStatus): string => ({
  Available: 'Tersedia',
  Limited: 'Terbatas',
  Beta: 'Beta',
  'Coming soon': 'Segera hadir',
  Unavailable: 'Tidak tersedia',
}[status]);

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
    limits: ['1 pengguna', '1 outlet', '10 pertanyaan AI atau 100.000 token per bulan', 'Web Builder segera hadir; domain custom belum termasuk'],
    features: ['Workspace operasional', 'Katalog, penjualan, inventori, dan dashboard', 'Laporan dasar', 'AI read-only terbatas dengan budget bulanan', 'Web Builder (segera hadir)'],
    cta: 'Mulai gratis', flow: 'trial',
  },
  {
    key: 'starter', name: 'Starter', monthly: 149000, annual: 1490000,
    fit: 'UMKM kecil yang mulai membangun sistem kerja digital.',
    limits: ['3 pengguna', '1 outlet', '75 pertanyaan AI atau 600.000 token per bulan', 'Omnichannel, multi-outlet, API, dan workflow kustom belum termasuk'],
    features: ['Semua fitur Free', 'Knowledge OS dan Web Builder (segera hadir)', 'Pencatatan biaya dan laporan', 'Workspace tim kecil'],
    cta: 'Bahas Starter', flow: 'consultation',
  },
  {
    key: 'growth', name: 'Growth', eyebrow: 'Paling populer', monthly: 349000, annual: 3490000,
    fit: 'UMKM aktif yang membutuhkan satu sistem untuk operasional dan keputusan bisnis.',
    limits: ['10 pengguna', '3 outlet', '400 pertanyaan AI atau 3.000.000 token per bulan', 'API dan workflow kustom belum termasuk', 'Prioritas support'],
    features: ['Semua fitur Starter', 'Dashboard lintas modul', 'AI Copilot read-only terbatas', 'Profit Intelligence terbatas; Omnichannel segera hadir'],
    cta: 'Bahas Growth', flow: 'consultation',
  },
  {
    key: 'pro', name: 'Pro', monthly: 749000, annual: 7490000,
    fit: 'Bisnis berkembang dengan banyak pengguna, proses, atau outlet.',
    limits: ['25 pengguna', '10 outlet', '2.000 pertanyaan AI atau 16.000.000 token per bulan', 'Ekspor tanpa batas'],
    features: ['Semua fitur Growth', 'Role dan permission lanjutan', 'Multi-outlet dan workflow', 'API dan integrasi tambahan'],
    cta: 'Bahas Pro', flow: 'consultation',
  },
  {
    key: 'business', name: 'Business', monthly: null, annual: null,
    fit: 'Perusahaan, jaringan outlet, dan organisasi dengan konfigurasi khusus.',
    limits: ['Kontrak dan invoice perusahaan', 'Onboarding atau migrasi disesuaikan', 'SLA dan training dibahas bersama'],
    features: ['Evaluasi kebutuhan multi-outlet atau multi-brand', 'Onboarding dan migrasi data', 'Integrasi atau workflow khusus', 'Security review dan training tim'],
    cta: 'Hubungi sales', flow: 'consultation',
  },
];

const statusByPlan = (availableFrom: 'free' | 'starter' | 'growth' | 'pro'): Record<string, CapabilityStatus> => {
  const order = ['free', 'starter', 'growth', 'pro', 'business'];
  const start = order.indexOf(availableFrom);
  return Object.fromEntries(order.map((key, index) => [key, index >= start ? 'Available' : 'Unavailable'])) as Record<string, CapabilityStatus>;
};
const packageStatus = statusByPlan('free');
const statusAcrossPlans = (status: CapabilityStatus): Record<string, CapabilityStatus> =>
  Object.fromEntries(['free', 'starter', 'growth', 'pro', 'business'].map((key) => [key, status])) as Record<string, CapabilityStatus>;
const aiLimitedStatus = statusAcrossPlans('Limited');
const comingSoonStatus = statusAcrossPlans('Coming soon');

export const pricingRows: PricingRow[] = [
  { group: 'Operasional', label: 'Dashboard bisnis', statuses: packageStatus },
  { group: 'Operasional', label: 'Penjualan, katalog, dan stok dasar', statuses: packageStatus },
  { group: 'Operasional', label: 'Pencatatan biaya dan laporan dasar', statuses: packageStatus },
  { group: 'AI', label: 'AI Copilot read-only dan ringkasan (cakupan terbatas)', statuses: aiLimitedStatus },
  { group: 'AI', label: 'Kuota penggunaan AI sesuai paket (cakupan terbatas)', statuses: aiLimitedStatus },
  { group: 'Keuangan', label: 'Profit Intelligence (cakupan terbatas)', statuses: aiLimitedStatus },
  { group: 'Knowledge OS', label: 'Wiki, dokumen, SOP, dan meeting notes (segera hadir)', statuses: comingSoonStatus },
  { group: 'Website & pelanggan', label: 'Web Builder dan form kontak (segera hadir)', statuses: comingSoonStatus },
  { group: 'Website & pelanggan', label: 'Omnichannel inbox dan automasi pelanggan (segera hadir)', statuses: comingSoonStatus },
  { group: 'Kolaborasi', label: 'Multi-user, role, dan workspace tim', statuses: statusByPlan('starter') },
  { group: 'Integrasi', label: 'Export CSV', statuses: packageStatus },
  { group: 'Integrasi', label: 'API dan integrasi tambahan', statuses: statusByPlan('pro') },
  { group: 'Integrasi', label: 'WhatsApp, marketplace, pembayaran, dan akuntansi (segera hadir)', statuses: comingSoonStatus },
  { group: 'Automasi', label: 'Workflow kustom', statuses: statusByPlan('pro') },
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
    slug: 'ai-copilot', name: 'AI Copilot', eyebrow: 'Fitur & insight', status: 'Limited',
    statusNote: 'Terbatas pada pembacaan read-only; cakupan sumber dan kuota mengikuti workspace serta paket.',
    summary: 'Bantu membaca data, dokumen, SOP, dan catatan bisnis dengan pertanyaan yang bisa diperiksa kembali.',
    highlights: ['Pertanyaan bisnis dalam bahasa sehari-hari', 'Ringkasan yang mengarah ke periode dan sumber', 'Rekomendasi langkah berikutnya dengan kendali manusia'],
    examples: ['Produk mana yang paling menguntungkan?', 'Mengapa penjualan minggu ini berubah?', 'Buatkan draf SOP pembukaan toko.', 'Ringkas meeting terakhir menjadi daftar tugas.'],
    limitations: ['Hasil AI adalah rekomendasi, bukan keputusan otomatis.', 'Jawaban tetap perlu diverifikasi dengan data dan konteks usaha.', 'Batas pemakaian mengikuti paket dan hak akses workspace.'],
    relatedHref: '/produk/asisten-ai/', relatedLabel: 'Lihat Asisten AI',
  },
  {
    slug: 'profit-intelligence', name: 'Profit Intelligence', eyebrow: 'Fitur & keuangan', status: 'Limited',
    statusNote: 'Terbatas pada cakupan metrik yang dirilis untuk pendapatan, biaya, dan margin; ini bukan accounting lengkap.',
    summary: 'Kerangka untuk melihat pendapatan, biaya, margin, dan perubahan periode dalam satu pembacaan.',
    highlights: ['Pendapatan dan biaya dalam periode yang sama', 'Perbandingan margin dan produk', 'Insight sederhana untuk menentukan pemeriksaan berikutnya'],
    examples: ['Produk mana yang memberi margin lebih baik?', 'Biaya mana yang berubah bulan ini?', 'Apa yang perlu diperiksa sebelum mengubah harga?'],
    limitations: ['Bukan pengganti akuntan profesional.', 'Hasil bergantung pada kelengkapan dan definisi data usaha.', 'Akses analisis mengikuti paket dan hak akses workspace.'],
    relatedHref: '/produk/keuangan/', relatedLabel: 'Pelajari Keuangan',
  },
  {
    slug: 'omnichannel', name: 'Omnichannel', eyebrow: 'Fitur & pelanggan', status: 'Coming soon',
    statusNote: 'Belum tersedia sebagai kemampuan aktif; kesiapan kanal dan hak akses akan dibahas saat konsultasi.',
    summary: 'Inbox terpusat untuk riwayat percakapan, catatan pelanggan, dan follow-up yang lebih mudah dipantau.',
    highlights: ['Inbox dan status follow-up terpusat', 'Catatan serta tag pelanggan', 'Draf balasan dengan bantuan AI'],
    examples: ['Percakapan mana yang belum ditindaklanjuti?', 'Tampilkan catatan pelanggan yang relevan.', 'Siapkan draf balasan yang sopan.'],
    limitations: ['Kanal yang tampil mengikuti koneksi yang diaktifkan di workspace.', 'RAMUNI tidak mengirim pesan otomatis tanpa persetujuan dan konfigurasi yang sah.', 'Hak akses riwayat dan tindak lanjut mengikuti role pengguna.'],
    relatedHref: '/solusi/pahami-pelanggan/', relatedLabel: 'Lihat solusi pelanggan',
  },
  {
    slug: 'web-builder', name: 'Web Builder', eyebrow: 'Fitur & halaman bisnis', status: 'Coming soon',
    statusNote: 'Belum tersedia sebagai kemampuan aktif; domain, publikasi, dan form akan mengikuti konfigurasi workspace saat dibuka.',
    summary: 'Kerangka untuk membuat halaman bisnis sederhana, informasi usaha, produk, layanan, dan CTA kontak.',
    highlights: ['Template halaman bisnis', 'Informasi produk atau layanan', 'Form kontak dan SEO dasar'],
    examples: ['Susun halaman profil usaha.', 'Tampilkan produk utama dengan CTA WhatsApp.', 'Periksa struktur judul dan deskripsi halaman.'],
    limitations: ['Free memakai subdomain RAMUNI; domain custom dan pengelolaan lanjutan mengikuti paket.', 'Form dan CTA perlu dihubungkan ke kanal yang Anda pilih.', 'Hak publikasi mengikuti role pengguna.'],
    relatedHref: '/tour-produk-gratis/?flow=consultation', relatedLabel: 'Bahas Web Builder',
  },
  {
    slug: 'knowledge-os', name: 'Knowledge OS', eyebrow: 'Fitur & pengetahuan', status: 'Coming soon',
    statusNote: 'Belum tersedia sebagai kemampuan aktif; wiki, SOP, dokumen, catatan, dan pencarian akan dibuka setelah rilis disetujui.',
    summary: 'Ruang pengetahuan agar SOP, keputusan, catatan, dan meeting notes tidak tercecer.',
    highlights: ['Wiki dan struktur folder', 'SOP serta dokumentasi tim', 'AI Search dan hak akses per pengguna'],
    examples: ['Temukan SOP pembukaan toko.', 'Ringkas keputusan rapat terakhir.', 'Tunjukkan dokumen yang perlu diperbarui.'],
    limitations: ['Hak akses dan kolaborasi tim mengikuti role serta paket.', 'Gunakan workspace resmi untuk data bisnis dan batasi akses sesuai kebutuhan.', 'Pencarian AI tetap perlu diperiksa terhadap dokumen sumber.'],
    relatedHref: '/tour-produk-gratis/?flow=consultation', relatedLabel: 'Bahas kebutuhan tim',
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
