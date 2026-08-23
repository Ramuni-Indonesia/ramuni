export type CapabilityStatus = 'Available' | 'Beta' | 'Concept Preview' | 'Coming Soon' | 'Roadmap';

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

export const pricingRows: PricingRow[] = [
  { group: 'Operasional', label: 'Dashboard bisnis', statuses: { free: 'Concept Preview', starter: 'Concept Preview', growth: 'Concept Preview', pro: 'Concept Preview', business: 'Concept Preview' } },
  { group: 'Operasional', label: 'Pencatatan pemasukan dan pengeluaran', statuses: { free: 'Concept Preview', starter: 'Concept Preview', growth: 'Concept Preview', pro: 'Concept Preview', business: 'Concept Preview' } },
  { group: 'Operasional', label: 'Template SOP dan checklist', statuses: { free: 'Concept Preview', starter: 'Concept Preview', growth: 'Concept Preview', pro: 'Concept Preview', business: 'Concept Preview' } },
  { group: 'AI', label: 'AI Copilot dan ringkasan', statuses: { free: 'Concept Preview', starter: 'Concept Preview', growth: 'Concept Preview', pro: 'Concept Preview', business: 'Concept Preview' } },
  { group: 'AI', label: 'Batas penggunaan AI', statuses: { free: 'Roadmap', starter: 'Roadmap', growth: 'Roadmap', pro: 'Roadmap', business: 'Roadmap' } },
  { group: 'Knowledge OS', label: 'Wiki, dokumen, SOP, dan meeting notes', statuses: { free: 'Concept Preview', starter: 'Concept Preview', growth: 'Coming Soon', pro: 'Coming Soon', business: 'Coming Soon' } },
  { group: 'Website & pelanggan', label: 'Web Builder dan form kontak', statuses: { free: 'Coming Soon', starter: 'Coming Soon', growth: 'Coming Soon', pro: 'Coming Soon', business: 'Coming Soon' } },
  { group: 'Website & pelanggan', label: 'Omnichannel inbox dan riwayat pelanggan', statuses: { free: 'Coming Soon', starter: 'Coming Soon', growth: 'Coming Soon', pro: 'Coming Soon', business: 'Coming Soon' } },
  { group: 'Kolaborasi', label: 'Multi-user, role, dan workspace tim', statuses: { free: 'Roadmap', starter: 'Concept Preview', growth: 'Concept Preview', pro: 'Coming Soon', business: 'Coming Soon' } },
  { group: 'Integrasi', label: 'Export CSV', statuses: { free: 'Coming Soon', starter: 'Coming Soon', growth: 'Coming Soon', pro: 'Coming Soon', business: 'Coming Soon' } },
  { group: 'Integrasi', label: 'API, WhatsApp, marketplace, pembayaran, akuntansi', statuses: { free: 'Roadmap', starter: 'Roadmap', growth: 'Roadmap', pro: 'Roadmap', business: 'Roadmap' } },
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
    slug: 'ai-copilot', name: 'AI Copilot', eyebrow: 'Fitur & insight', status: 'Concept Preview',
    statusNote: 'Konsep ini mengikuti pola Asisten AI RAMUNI; ketersediaan akses dan batas penggunaan menunggu validasi rilis.',
    summary: 'Bantu membaca data, dokumen, SOP, dan catatan bisnis dengan pertanyaan yang bisa diperiksa kembali.',
    highlights: ['Pertanyaan bisnis dalam bahasa sehari-hari', 'Ringkasan yang mengarah ke periode dan sumber', 'Rekomendasi langkah berikutnya dengan kendali manusia'],
    examples: ['Produk mana yang paling menguntungkan?', 'Mengapa penjualan minggu ini berubah?', 'Buatkan draf SOP pembukaan toko.', 'Ringkas meeting terakhir menjadi daftar tugas.'],
    limitations: ['Hasil AI adalah rekomendasi, bukan keputusan otomatis.', 'Jawaban tetap perlu diverifikasi dengan data dan konteks usaha.', 'Ketersediaan fitur dapat berubah menurut tahap rilis.'],
    relatedHref: '/produk/asisten-ai/', relatedLabel: 'Lihat Asisten AI',
  },
  {
    slug: 'profit-intelligence', name: 'Profit Intelligence', eyebrow: 'Fitur & keuangan', status: 'Concept Preview',
    statusNote: 'Saat ini RAMUNI memiliki alur edukatif keuangan dan kalkulator; modul Profit Intelligence khusus belum dinyatakan aktif.',
    summary: 'Kerangka untuk melihat pendapatan, biaya, margin, dan perubahan periode dalam satu pembacaan.',
    highlights: ['Pendapatan dan biaya dalam periode yang sama', 'Perbandingan margin dan produk', 'Insight sederhana untuk menentukan pemeriksaan berikutnya'],
    examples: ['Produk mana yang memberi margin lebih baik?', 'Biaya mana yang berubah bulan ini?', 'Apa yang perlu diperiksa sebelum mengubah harga?'],
    limitations: ['Bukan pengganti akuntan profesional.', 'Angka contoh tidak mewakili data pelanggan atau hasil bisnis tertentu.', 'Modul khusus menunggu bukti rilis publik.'],
    relatedHref: '/produk/keuangan/', relatedLabel: 'Pelajari Keuangan',
  },
  {
    slug: 'omnichannel', name: 'Omnichannel', eyebrow: 'Fitur & pelanggan', status: 'Coming Soon',
    statusNote: 'Integrasi percakapan bertahap; tidak ada logo kanal yang ditampilkan sebagai fitur aktif sebelum tersedia.',
    summary: 'Rancangan inbox terpusat untuk riwayat percakapan, catatan pelanggan, dan follow-up yang lebih mudah dipantau.',
    highlights: ['Inbox dan status follow-up terpusat', 'Catatan serta tag pelanggan', 'Draf balasan dengan bantuan AI'],
    examples: ['Percakapan mana yang belum ditindaklanjuti?', 'Tampilkan catatan pelanggan yang relevan.', 'Siapkan draf balasan yang sopan.'],
    limitations: ['Kanal dan jadwal integrasi dapat berubah.', 'RAMUNI tidak mengirim pesan otomatis tanpa persetujuan dan konfigurasi yang sah.', 'Gunakan jalur WhatsApp resmi untuk konsultasi saat ini.'],
    relatedHref: '/solusi/pahami-pelanggan/', relatedLabel: 'Lihat solusi pelanggan',
  },
  {
    slug: 'web-builder', name: 'Web Builder', eyebrow: 'Fitur & halaman bisnis', status: 'Coming Soon',
    statusNote: 'Rancangan halaman bisnis dan form kontak; belum dipublikasikan sebagai modul aktif.',
    summary: 'Kerangka untuk membuat halaman bisnis sederhana, informasi usaha, produk, layanan, dan CTA kontak.',
    highlights: ['Template halaman bisnis', 'Informasi produk atau layanan', 'Form kontak dan SEO dasar'],
    examples: ['Susun halaman profil usaha.', 'Tampilkan produk utama dengan CTA WhatsApp.', 'Periksa struktur judul dan deskripsi halaman.'],
    limitations: ['Domain custom dan pengelolaan konten bergantung pada paket yang disetujui.', 'Jangan menganggap contoh tampilan sebagai akses produk aktif.', 'Status akan diperbarui setelah rilis terverifikasi.'],
    relatedHref: '/tour-produk-gratis/', relatedLabel: 'Minta akses awal',
  },
  {
    slug: 'knowledge-os', name: 'Knowledge OS', eyebrow: 'Fitur & pengetahuan', status: 'Coming Soon',
    statusNote: 'Dokumen dan template publik RAMUNI saat ini adalah sumber daya; Knowledge OS tim belum dinyatakan aktif.',
    summary: 'Rancangan ruang pengetahuan agar SOP, keputusan, catatan, dan meeting notes tidak tercecer.',
    highlights: ['Wiki dan struktur folder', 'SOP serta dokumentasi tim', 'AI Search dan hak akses per pengguna'],
    examples: ['Temukan SOP pembukaan toko.', 'Ringkas keputusan rapat terakhir.', 'Tunjukkan dokumen yang perlu diperbarui.'],
    limitations: ['Hak akses, pencarian AI, dan kolaborasi tim menunggu rilis terverifikasi.', 'Jangan memasukkan data sensitif ke halaman validasi publik.', 'Template publik tidak sama dengan workspace produk.'],
    relatedHref: '/sumber-daya/', relatedLabel: 'Buka sumber daya',
  },
];

export const faqItems = [
  { question: 'Apakah RAMUNI cocok untuk bisnis baru?', answer: 'Ya. Jalur coba gratis dan halaman sumber daya membantu bisnis baru membangun kebiasaan membaca data secara bertahap.' },
  { question: 'Apakah RAMUNI hanya untuk toko atau restoran?', answer: 'Tidak. Konteks yang tersedia mencakup retail, F&B, jasa, distributor, reseller online, dan manufaktur kecil.' },
  { question: 'Apakah saya harus memahami akuntansi?', answer: 'Tidak untuk mulai memahami konsepnya. RAMUNI menyederhanakan bahasa, tetapi informasi bisnis tetap bukan pengganti jasa akuntan profesional.' },
  { question: 'Apakah AI RAMUNI bisa mengambil keputusan sendiri?', answer: 'Tidak. AI memberi analisis atau rekomendasi; keputusan dan verifikasi tetap berada pada pemilik atau pengelola bisnis.' },
  { question: 'Apakah data bisnis saya aman?', answer: 'Gunakan hanya data yang diperlukan pada jalur resmi. RAMUNI sedang membangun standar keamanan, kontrol akses, dan perlindungan data secara bertahap; jangan kirim data sensitif melalui form publik.' },
  { question: 'Apakah bisa digunakan oleh banyak karyawan?', answer: 'Multi-user dan hak akses bergantung pada paket serta tahap rilis. Hubungi tim untuk membahas kebutuhan tanpa mengirim data sensitif.' },
  { question: 'Apakah tersedia trial?', answer: 'Mulai dari sesi coba gratis untuk melihat alur yang relevan. Ketersediaan trial paket komersial akan diumumkan setelah sistem dan syaratnya siap.' },
  { question: 'Apakah bisa membatalkan langganan?', answer: 'Aturan pembatalan akan ditampilkan transparan sebelum paket berbayar diaktifkan. Untuk saat ini, minta penjelasan paket melalui tim RAMUNI.' },
  { question: 'Apakah ada biaya setup?', answer: 'Jalur coba gratis tidak memerlukan biaya setup. Onboarding atau migrasi khusus untuk Business akan dibahas sesuai kebutuhan dan kontrak.' },
];
