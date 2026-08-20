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
  disclosure: string;
  languages: string[];
  profileType: 'organization' | 'person';
  professionalUrls: string[];
};

export const editorialPeople: EditorialPerson[] = [
  {
    slug: 'tim-editorial-ramuni',
    name: 'Tim Editorial RAMUNI',
    role: 'Tim konten dan riset produk',
    organization: 'RAMUNI',
    photo: '/brand/ramuni-mark-color.webp',
    photoAlt: 'Tanda RAMUNI untuk profil Tim Editorial RAMUNI',
    shortBio:
      'Menyusun panduan praktis agar pemilik UMKM dapat membaca penjualan, stok, kas, pelanggan, dan AI dengan konteks yang jelas.',
    fullBio:
      'Tim Editorial RAMUNI mengubah pertanyaan operasional sehari-hari menjadi panduan yang mudah diperiksa. Setiap artikel memakai ilustrasi yang jelas, menjelaskan konteks penggunaan, dan menghindari klaim hasil bisnis yang tidak dapat dibuktikan.',
    expertise: ['Metrik dasar usaha', 'Operasional UMKM', 'Stok dan arus kas', 'Penggunaan AI', 'Bahasa edukasi produk'],
    disclosure:
      'Profil ini mewakili tim internal RAMUNI. Artikel edukasi bukan nasihat pajak, akuntansi, hukum, atau keputusan bisnis yang dipersonalisasi.',
    languages: ['Bahasa Indonesia'],
    profileType: 'organization',
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
    disclosure:
      'Profil ini mewakili fungsi peninjauan internal RAMUNI dan berbeda dari tim penyusun artikel.',
    languages: ['Bahasa Indonesia'],
    profileType: 'organization',
    professionalUrls: [],
  },
  {
    slug: 'desk-keuangan-ramuni',
    name: 'Desk Keuangan RAMUNI',
    role: 'Kontributor editorial keuangan UMKM',
    organization: 'RAMUNI',
    photo: '/brand/ramuni-mark-color.webp',
    photoAlt: 'Tanda RAMUNI untuk profil Desk Keuangan RAMUNI',
    shortBio:
      'Menyusun panduan untuk membedakan omzet, biaya, HPP, laba, dan arus kas dengan contoh yang dapat diperiksa ulang.',
    fullBio:
      'Desk Keuangan RAMUNI menulis materi edukasi untuk membantu pemilik usaha memahami hubungan antara catatan transaksi, biaya produk, kas, dan laporan sederhana. Setiap contoh memakai angka ilustratif dan tidak menggantikan nasihat akuntansi, pajak, atau keputusan keuangan yang dipersonalisasi.',
    expertise: ['HPP dan margin', 'Laba serta arus kas', 'Catatan keuangan UMKM', 'Contoh perhitungan bisnis'],
    disclosure:
      'Desk ini adalah fungsi editorial internal RAMUNI. Materi diterbitkan untuk pendidikan dan perlu disesuaikan dengan catatan serta kewajiban usaha masing-masing.',
    languages: ['Bahasa Indonesia'],
    profileType: 'organization',
    professionalUrls: [],
  },
  {
    slug: 'desk-operasional-ramuni',
    name: 'Desk Operasional RAMUNI',
    role: 'Kontributor editorial operasional UMKM',
    organization: 'RAMUNI',
    photo: '/brand/ramuni-mark-color.webp',
    photoAlt: 'Tanda RAMUNI untuk profil Desk Operasional RAMUNI',
    shortBio:
      'Membuat panduan stok, pemeriksaan harian, pembelian, dan pencatatan operasional yang bisa diterapkan bertahap.',
    fullBio:
      'Desk Operasional RAMUNI membahas pekerjaan yang berulang di toko dan usaha kecil, mulai dari penerimaan barang sampai pemeriksaan stok dan tindak lanjut. Fokusnya adalah membantu pembaca membuat jejak catatan yang jelas, bukan menjanjikan otomasi atau hasil bisnis tertentu.',
    expertise: ['Stok dan inventori', 'Pemeriksaan operasional', 'Pembelian dan penerimaan', 'SOP usaha kecil'],
    disclosure:
      'Desk ini adalah fungsi editorial internal RAMUNI. Contoh proses perlu disesuaikan dengan kondisi barang, tim, keamanan pangan, dan kebijakan usaha Anda.',
    languages: ['Bahasa Indonesia'],
    profileType: 'organization',
    professionalUrls: [],
  },
  {
    slug: 'desk-strategi-industri-ramuni',
    name: 'Desk Strategi Industri RAMUNI',
    role: 'Kontributor editorial konteks industri UMKM',
    organization: 'RAMUNI',
    photo: '/brand/ramuni-mark-color.webp',
    photoAlt: 'Tanda RAMUNI untuk profil Desk Strategi Industri RAMUNI',
    shortBio:
      'Menghubungkan pertanyaan operasional dengan konteks usaha makanan, retail, jasa, dan bentuk usaha kecil lainnya.',
    fullBio:
      'Desk Strategi Industri RAMUNI menyusun panduan berbasis situasi kerja yang umum ditemui UMKM. Materi memecah masalah menjadi data yang perlu diperiksa, batasan keputusan, dan langkah kecil yang dapat diuji tanpa mengklaim hasil yang pasti.',
    expertise: ['Usaha makanan dan minuman', 'Retail kecil', 'Pola penjualan', 'Keputusan berbasis catatan'],
    disclosure:
      'Desk ini adalah fungsi editorial internal RAMUNI. Contoh kasus bersifat edukatif dan tidak mewakili pelanggan atau hasil penggunaan produk RAMUNI.',
    languages: ['Bahasa Indonesia'],
    profileType: 'organization',
    professionalUrls: [],
  },
  {
    slug: 'desk-pelanggan-ramuni',
    name: 'Desk Pelanggan RAMUNI',
    role: 'Kontributor editorial pelanggan dan layanan UMKM',
    organization: 'RAMUNI',
    photo: '/brand/ramuni-mark-color.webp',
    photoAlt: 'Tanda RAMUNI untuk profil Desk Pelanggan RAMUNI',
    shortBio:
      'Membahas catatan pelanggan, layanan, pembelian ulang, dan penggunaan data yang proporsional untuk UMKM.',
    fullBio:
      'Desk Pelanggan RAMUNI membuat materi tentang cara membaca pola layanan dan transaksi tanpa mengumpulkan atau menggunakan data pelanggan secara berlebihan. Panduan selalu menempatkan izin, konteks, dan pemeriksaan manusia sebagai bagian dari keputusan.',
    expertise: ['Pelanggan berulang', 'Catatan layanan', 'Privasi data pelanggan', 'Pola transaksi'],
    disclosure:
      'Desk ini adalah fungsi editorial internal RAMUNI. Materi bukan izin untuk menghubungi pelanggan tanpa dasar, persetujuan, atau kebijakan yang sesuai.',
    languages: ['Bahasa Indonesia'],
    profileType: 'organization',
    professionalUrls: [],
  },
];

export function getEditorialPerson(slug: string) {
  return editorialPeople.find((person) => person.slug === slug) || editorialPeople[0];
}
