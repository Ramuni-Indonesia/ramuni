/**
 * The small, approved set of Drive videos used by the money site.
 * Keep each clip in one intentional location so the page does not repeat
 * motion or download the same asset more than once.
 */
export const driveVideos = {
  lifestyle: {
    src: '/website-original/marketing/drive/video-09812296-hd.mp4',
    poster: '/website-original/marketing/drive/video-09812296-hd-poster.webp',
    width: 960,
    height: 540,
    label: 'Perempuan pemilik usaha bekerja dengan laptop dalam suasana kerja yang tenang.',
    fallback: 'Momen kerja pemilik usaha dengan laptop. Gambar poster tetap tersedia saat video tidak diputar.',
  },
  productProof: {
    src: '/website-original/marketing/drive/video-5536abeb-hd.mp4',
    poster: '/website-original/marketing/drive/video-5536abeb-hd-poster.webp',
    width: 960,
    height: 540,
    label: 'Beberapa tampilan dashboard RAMUNI bergerak sebagai contoh cara membaca data usaha.',
    fallback: 'Beberapa layar dashboard RAMUNI. Gambar poster menunjukkan visual yang sama saat video tidak diputar.',
  },
  decisionNetwork: {
    src: '/website-original/marketing/drive/video-a9e12e8f-hd.mp4',
    poster: '/website-original/marketing/drive/video-a9e12e8f-hd-poster.webp',
    width: 960,
    height: 540,
    label: 'Visual abstrak RAMUNI yang menghubungkan metrik, sumber data, dan arah keputusan.',
    fallback: 'Visual hubungan metrik dan arah keputusan RAMUNI. Gambar poster tetap tersedia saat video tidak diputar.',
  },
} as const;

export type DriveVideoKey = keyof typeof driveVideos;
