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
];

export function getEditorialPerson(slug: string) {
  return editorialPeople.find((person) => person.slug === slug) || editorialPeople[0];
}
