export type EditorialPerson = {
  slug: string;
  name: string;
  role: string;
  organization: string;
  photo: string;
  photoAlt: string;
  shortBio: string;
  fullBio: string;
  expertise: string[];
  editorialStandards: string[];
  disclosure: string;
  editorialNotice?: string;
  languages: string[];
  profileType: 'organization' | 'person';
  professionalUrls: string[];
};

export const editorialPeople: EditorialPerson[] = [
  {
    slug: 'alya-pramesti',
    name: 'Alya Pramesti',
    role: 'Penulis editorial keuangan UMKM',
    organization: 'RAMUNI',
    photo: '/website-original/editorial/authors/ramuni-author-desk-keuangan-v3.webp',
    photoAlt: 'Foto profil ilustratif untuk Alya Pramesti, nama pena editorial RAMUNI',
    shortBio:
      'Menulis panduan untuk membedakan omzet, biaya, HPP, laba, dan arus kas dengan contoh yang dapat diperiksa ulang.',
    fullBio:
      'Alya Pramesti adalah nama pena editorial RAMUNI untuk topik keuangan usaha sehari-hari. Naskah yang memakai byline ini mengurai angka dari catatan transaksi, biaya produk, dan kas menjadi langkah yang bisa ditelusuri kembali. Fokus penulisannya adalah membedakan istilah yang sering tercampur, menuliskan asumsi perhitungan, lalu menunjukkan batas penggunaan setiap contoh agar pembaca tidak mengambil keputusan hanya dari satu angka.',
    expertise: ['HPP dan margin', 'Laba serta arus kas', 'Catatan keuangan UMKM', 'Contoh perhitungan bisnis'],
    editorialStandards: [
      'Menetapkan istilah, periode, dan satuan sebelum membandingkan angka.',
      'Menuliskan rumus serta asumsi pada setiap contoh perhitungan.',
      'Membedakan omzet, laba, dan kas agar pembaca tidak menyimpulkan terlalu cepat.',
    ],
    disclosure:
      'Alya Pramesti adalah nama pena editorial, bukan profil profesional pribadi. Materi diterbitkan untuk pendidikan dan tidak menggantikan nasihat akuntansi, pajak, hukum, atau keputusan keuangan yang dipersonalisasi.',
    editorialNotice:
      'Profil ini menggunakan nama pena editorial. Keterangan yang ditampilkan menjelaskan fokus penulisan dan proses editorial RAMUNI, bukan riwayat pendidikan atau pekerjaan pribadi.',
    languages: ['Bahasa Indonesia'],
    profileType: 'person',
    professionalUrls: [],
  },
  {
    slug: 'bima-ardiansyah',
    name: 'Bima Ardiansyah',
    role: 'Penulis editorial operasional UMKM',
    organization: 'RAMUNI',
    photo: '/website-original/editorial/authors/ramuni-author-desk-operasional-v3.webp',
    photoAlt: 'Foto profil ilustratif untuk Bima Ardiansyah, nama pena editorial RAMUNI',
    shortBio:
      'Membuat panduan stok, pemeriksaan harian, pembelian, dan pencatatan operasional yang dapat diterapkan bertahap.',
    fullBio:
      'Bima Ardiansyah adalah nama pena editorial RAMUNI untuk panduan kerja yang berulang di toko dan usaha kecil. Artikel yang menggunakan byline ini memecah pekerjaan seperti menerima barang, mencatat mutasi, memeriksa selisih, dan menyusun daftar pembelian menjadi urutan yang jelas. Setiap naskah mengutamakan jejak catatan, titik pemeriksaan, dan penyesuaian terhadap kondisi barang atau tim, bukan janji otomasi atau hasil bisnis tertentu.',
    expertise: ['Stok dan inventori', 'Pemeriksaan operasional', 'Pembelian dan penerimaan', 'SOP usaha kecil'],
    editorialStandards: [
      'Mengikuti alur barang dan catatan dari penerimaan sampai pemeriksaan akhir.',
      'Menyebutkan titik cek, bukti yang perlu disimpan, dan pengecualian yang perlu ditindaklanjuti.',
      'Menghindari langkah tunggal untuk semua usaha karena jenis barang dan ritme tim berbeda.',
    ],
    disclosure:
      'Bima Ardiansyah adalah nama pena editorial, bukan profil profesional pribadi. Contoh proses perlu disesuaikan dengan jenis barang, tim, keamanan pangan, dan kebijakan usaha masing-masing.',
    editorialNotice:
      'Profil ini menggunakan nama pena editorial. Keterangan yang ditampilkan menjelaskan fokus penulisan dan proses editorial RAMUNI, bukan riwayat pendidikan atau pekerjaan pribadi.',
    languages: ['Bahasa Indonesia'],
    profileType: 'person',
    professionalUrls: [],
  },
  {
    slug: 'citra-maheswari',
    name: 'Citra Maheswari',
    role: 'Penulis editorial penjualan dan pelanggan UMKM',
    organization: 'RAMUNI',
    photo: '/website-original/editorial/authors/ramuni-author-desk-pelanggan-v3.webp',
    photoAlt: 'Foto profil ilustratif untuk Citra Maheswari, nama pena editorial RAMUNI',
    shortBio:
      'Membahas penjualan, catatan pelanggan, pembelian ulang, dan penggunaan data yang proporsional untuk UMKM.',
    fullBio:
      'Citra Maheswari adalah nama pena editorial RAMUNI untuk materi tentang penjualan, layanan, dan pola pembelian pelanggan. Tulisan dengan byline ini membantu pembaca membaca transaksi menurut produk, kanal, waktu, dan riwayat layanan tanpa menebak kebutuhan pribadi pelanggan. Pendekatannya menempatkan izin, konteks, dan pemeriksaan manusia sebagai bagian dari keputusan sebelum data dipakai untuk tindak lanjut.',
    expertise: ['Penjualan dan omzet', 'Pelanggan berulang', 'Catatan layanan', 'Privasi data pelanggan'],
    editorialStandards: [
      'Menghubungkan metrik penjualan dengan keputusan yang dapat diperiksa, bukan hanya angka ringkasan.',
      'Membatasi contoh data pelanggan pada informasi yang relevan untuk layanan dan tindak lanjut.',
      'Menempatkan izin, konteks, dan kebijakan privasi sebelum rekomendasi komunikasi pelanggan.',
    ],
    disclosure:
      'Citra Maheswari adalah nama pena editorial, bukan profil profesional pribadi. Materi bukan izin untuk menghubungi pelanggan tanpa dasar, persetujuan, atau kebijakan yang sesuai.',
    editorialNotice:
      'Profil ini menggunakan nama pena editorial. Keterangan yang ditampilkan menjelaskan fokus penulisan dan proses editorial RAMUNI, bukan riwayat pendidikan atau pekerjaan pribadi.',
    languages: ['Bahasa Indonesia'],
    profileType: 'person',
    professionalUrls: [],
  },
  {
    slug: 'dimas-wicaksana',
    name: 'Dimas Wicaksana',
    role: 'Penulis editorial strategi usaha dan AI',
    organization: 'RAMUNI',
    photo: '/website-original/editorial/authors/ramuni-author-desk-strategi-industri-v3.webp',
    photoAlt: 'Foto profil ilustratif untuk Dimas Wicaksana, nama pena editorial RAMUNI',
    shortBio:
      'Menghubungkan pertanyaan strategi usaha dan penggunaan AI dengan data yang perlu diperiksa sebelum mengambil langkah.',
    fullBio:
      'Dimas Wicaksana adalah nama pena editorial RAMUNI untuk topik konteks industri, pengambilan keputusan, dan penggunaan AI dalam usaha kecil. Naskah yang memakai byline ini menerjemahkan masalah seperti perubahan pola jual, kebutuhan evaluasi, atau jawaban AI yang perlu ditinjau menjadi pertanyaan pemeriksaan yang lebih konkret. Pembaca diajak melihat bukti, periode data, batas rekomendasi, dan tindakan kecil yang dapat diuji tanpa menganggap AI sebagai pengganti keputusan manusia.',
    expertise: ['Strategi usaha kecil', 'Konteks industri', 'Pemeriksaan insight AI', 'Metrik untuk pengambilan keputusan'],
    editorialStandards: [
      'Memulai analisis dari sumber data, periode, dan pertanyaan usaha yang jelas.',
      'Memisahkan sinyal, rekomendasi, dan tindakan agar pembaca dapat memeriksa setiap langkah.',
      'Menjelaskan batas jawaban AI dan kapan keputusan perlu kembali diperiksa manusia.',
    ],
    disclosure:
      'Dimas Wicaksana adalah nama pena editorial, bukan profil profesional pribadi. Contoh kasus bersifat edukatif dan tidak mewakili pelanggan atau hasil penggunaan produk RAMUNI.',
    editorialNotice:
      'Profil ini menggunakan nama pena editorial. Keterangan yang ditampilkan menjelaskan fokus penulisan dan proses editorial RAMUNI, bukan riwayat pendidikan atau pekerjaan pribadi.',
    languages: ['Bahasa Indonesia'],
    profileType: 'person',
    professionalUrls: [],
  },
  {
    slug: 'tim-peninjau-ramuni',
    name: 'Tim Peninjau RAMUNI',
    role: 'Peninjauan editorial dan akurasi konten',
    organization: 'RAMUNI',
    photo: '/brand/ramuni-mark-color.webp',
    photoAlt: 'Tanda RAMUNI untuk profil Tim Peninjau RAMUNI',
    shortBio:
      'Meninjau panduan publik RAMUNI agar konteks, batasan, sumber, dan bahasa edukatifnya tetap jelas.',
    fullBio:
      'Tim Peninjau RAMUNI melakukan pemeriksaan editorial sebelum panduan ditandai siap untuk publikasi dan pengindeksan.',
    expertise: ['Peninjauan editorial', 'Akurasi konteks bisnis', 'Kejelasan sumber', 'Konten edukasi UMKM'],
    editorialStandards: [
      'Memeriksa kejelasan konteks dan batas penggunaan panduan.',
      'Memastikan sumber dan catatan pembaruan dapat ditemukan pembaca.',
      'Menandai materi yang masih memerlukan peninjauan sebelum publikasi.',
    ],
    disclosure:
      'Profil ini mewakili fungsi peninjauan internal RAMUNI dan berbeda dari penulis artikel.',
    languages: ['Bahasa Indonesia'],
    profileType: 'organization',
    professionalUrls: [],
  },
];

export const editorialWriters = editorialPeople.filter((person) => person.profileType === 'person');

export const legacyAuthorRedirects: Record<string, string> = {
  'tim-editorial-ramuni': '/blog/penulis/',
  'desk-keuangan-ramuni': '/blog/penulis/alya-pramesti/',
  'desk-operasional-ramuni': '/blog/penulis/bima-ardiansyah/',
  'desk-pelanggan-ramuni': '/blog/penulis/citra-maheswari/',
  'desk-strategi-industri-ramuni': '/blog/penulis/dimas-wicaksana/',
};

export function getEditorialPerson(slug: string) {
  return editorialPeople.find((person) => person.slug === slug) || editorialWriters[0];
}
