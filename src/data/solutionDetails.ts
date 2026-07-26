export type SolutionVisualKind = 'revenue' | 'stock' | 'cash' | 'customer' | 'report';
export type SolutionLayout = 'split' | 'ledger' | 'bridge' | 'timeline' | 'editorial';

export interface SolutionDetail {
  slug: string;
  title: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroText: string;
  heroOutcome: string;
  ctaLabel: string;
  layout: SolutionLayout;
  visual: {
    kind: SolutionVisualKind;
    label: string;
    title: string;
    period: string;
    metrics: { label: string; value: string; note: string; tone?: 'accent' | 'warning' }[];
  };
  symptoms: string[];
  impact: { title: string; text: string }[];
  manualGap: {
    title: string;
    text: string;
    note: string;
    checks: { label: string; manual: string; ramuni: string }[];
  };
  workflow: { verb: string; title: string; text: string }[];
  scenario: {
    eyebrow: string;
    title: string;
    context: string;
    rows: { label: string; value: string; note: string }[];
    finding: string;
    evidence: string[];
    decision: string;
    boundary: string;
  };
  capabilities: {
    title: string;
    href?: string;
    status: string;
    text: string;
  }[];
  industries: { title: string; href: string; example: string }[];
  onboarding: { title: string; text: string }[];
  resource: { type: string; title: string; text: string; href: string; cta: string };
  faq: { question: string; answer: string }[];
  closingTitle: string;
  closingText: string;
}

export const solutionDetails: SolutionDetail[] = [
  {
    slug: 'naikkan-omzet',
    title: 'Memahami Perubahan Omzet',
    metaDescription: 'Temukan produk, waktu, dan pola pelanggan yang membentuk perubahan omzet sebelum menentukan langkah berikutnya.',
    eyebrow: 'Solusi penjualan',
    heroTitle: 'Temukan apa yang mengubah omzet sebelum menentukan langkah.',
    heroText: 'RAMUNI memecah total penjualan menjadi pola produk, waktu, stok, dan pelanggan yang dapat ditelusuri.',
    heroOutcome: 'Hasilnya bukan janji omzet naik, melainkan alasan yang lebih kuat untuk memilih tindakan.',
    ctaLabel: 'Lihat Demo Analisis Omzet',
    layout: 'split',
    visual: {
      kind: 'revenue',
      label: 'Contoh pembacaan omzet',
      title: 'Penurunan tidak terjadi di semua produk',
      period: 'Data sintetis · 1-14 Juli dibanding 17-30 Juni',
      metrics: [
        { label: 'Produk A', value: '+12%', note: 'Stabil di hari kerja', tone: 'accent' },
        { label: 'Produk B', value: '-18%', note: 'Turun pada 15.00-18.00', tone: 'warning' },
        { label: 'Produk C', value: '-4%', note: 'Stok kosong selama 2 jam' },
      ],
    },
    symptoms: ['Omzet berubah, tetapi penyebabnya belum terlihat.', 'Produk atau jam yang melemah sulit dipisahkan.', 'Peluang penjualan hilang saat stok kosong tidak ikut terbaca.'],
    impact: [
      { title: 'Promosi salah sasaran', text: 'Diskon diberikan ke semua produk ketika masalah hanya terjadi pada satu waktu atau SKU.' },
      { title: 'Stok menutup peluang', text: 'Produk diminati, tetapi waktu stok kosong tidak dibaca bersama transaksi.' },
      { title: 'Tim membahas total', text: 'Rapat berhenti pada angka omzet tanpa membuka transaksi yang membentuk perubahan.' },
    ],
    manualGap: {
      title: 'Total omzet menunjukkan perubahan, bukan penyebabnya.',
      text: 'Rekap harian mudah dibuat. Masalah muncul ketika produk, waktu, stok, dan pelanggan tidak dibaca pada periode yang sama.',
      note: 'Angka total perlu dipecah sebelum dipakai untuk memilih promosi.',
      checks: [
        { label: 'Produk yang berubah', manual: 'Produk lemah tertutup oleh total penjualan.', ramuni: 'Bandingkan kontribusi per produk pada periode setara.' },
        { label: 'Waktu penurunan', manual: 'Jam ramai dan sepi tercampur dalam satu angka.', ramuni: 'Buka hari dan jam yang membentuk perubahan.' },
        { label: 'Stok saat permintaan', manual: 'Penjualan hilang tidak tercatat sebagai transaksi.', ramuni: 'Baca riwayat stok bersama waktu penjualan.' },
      ],
    },
    workflow: [
      { verb: 'Masukkan', title: 'Transaksi yang sebanding', text: 'Pilih dua periode dengan jumlah hari dan jam operasi yang setara.' },
      { verb: 'Periksa', title: 'Kelengkapan catatan', text: 'Tandai produk, kanal, stok, atau pelanggan yang belum tercatat.' },
      { verb: 'Hubungkan', title: 'Produk, waktu, dan pelanggan', text: 'Pisahkan perubahan agar satu total tidak menutupi pola penting.' },
      { verb: 'Putuskan', title: 'Langkah yang bisa diuji', text: 'Pengguna memilih apakah perlu cek stok, jadwal, produk, atau promosi.' },
    ],
    scenario: {
      eyebrow: 'Contoh insight sintetis',
      title: 'Omzet turun 7%, tetapi satu produk tetap tumbuh.',
      context: 'Toko retail membandingkan dua periode 14 hari dengan jam operasi yang sama.',
      rows: [
        { label: 'Total omzet', value: '-7%', note: 'Rp42,8 jt menjadi Rp39,8 jt' },
        { label: 'Pendorong terbesar', value: 'Produk B', note: 'Turun Rp2,4 jt pada sore hari' },
        { label: 'Konteks stok', value: '2 jam kosong', note: 'Produk C saat permintaan tertinggi' },
      ],
      finding: 'Penurunan terkonsentrasi pada Produk B di sore hari. Produk A tidak memerlukan promosi tambahan.',
      evidence: ['84 transaksi Produk B', 'Perbandingan hari kerja setara', 'Riwayat stok Produk C'],
      decision: 'Periksa penyebab Produk B melemah dan jadwal isi ulang Produk C sebelum mengubah promosi.',
      boundary: 'RAMUNI menunjukkan pola dan sumber. Keputusan harga, stok, dan promosi tetap dibuat pengguna.',
    },
    capabilities: [
      { title: 'Penjualan', href: '/produk/penjualan', status: 'Demo dengan data sintetis', text: 'Transaksi dan produk yang membentuk perubahan.' },
      { title: 'Dashboard Bisnis', href: '/produk/dashboard-bisnis', status: 'Demo dengan data sintetis', text: 'Perubahan utama sebelum grafik lengkap.' },
      { title: 'Asisten AI', href: '/produk/asisten-ai', status: 'Jawaban dapat ditelusuri', text: 'Membantu menyusun pertanyaan lanjutan tanpa menjalankan tindakan.' },
      { title: 'Pelanggan', href: '/produk/pelanggan', status: 'Bergantung pada izin data', text: 'Pola pembelian hanya tampil ketika datanya tersedia dan boleh dipakai.' },
    ],
    industries: [
      { title: 'Retail', href: '/industri/retail', example: 'Pisahkan perubahan per SKU, jam transaksi, dan waktu stok kosong.' },
      { title: 'F&B', href: '/industri/fnb', example: 'Bandingkan menu pada hari dan jam operasi yang setara.' },
      { title: 'Reseller Online', href: '/industri/reseller-online', example: 'Baca produk ramai bersama margin yang sudah dicatat.' },
    ],
    onboarding: [
      { title: 'Samakan nama produk', text: 'Rapikan SKU, kategori, dan satuan yang dipakai dalam transaksi.' },
      { title: 'Pilih dua periode', text: 'Gunakan rentang dengan hari dan jam operasi yang sebanding.' },
      { title: 'Uji satu perubahan', text: 'Mulai dari satu penurunan omzet yang memang perlu dijelaskan.' },
    ],
    resource: { type: 'Panduan', title: 'Menilai Insight AI', text: 'Gunakan empat pemeriksaan sebelum membawa insight ke keputusan bisnis.', href: '/panduan/menilai-insight-ai', cta: 'Buka panduan' },
    faq: [
      { question: 'Apakah RAMUNI menjamin omzet naik?', answer: 'Tidak. RAMUNI membantu menemukan perubahan yang perlu diperiksa. Hasil bisnis tetap dipengaruhi keputusan dan kondisi usaha.' },
      { question: 'Data apa yang perlu dibandingkan?', answer: 'Mulai dari transaksi, produk, waktu penjualan, dan dua periode yang setara. Tambahkan stok atau pelanggan hanya jika datanya tersedia dan boleh dipakai.' },
      { question: 'Apakah promosi selalu menjadi langkah berikutnya?', answer: 'Tidak. Periksa perubahan produk, waktu, stok, dan data yang hilang sebelum memilih promosi.' },
    ],
    closingTitle: 'Bawa satu perubahan omzet yang ingin Anda jelaskan.',
    closingText: 'Demo memakai data sintetis. Anda dapat melihat alur analisis tanpa mengirim data usaha sensitif.',
  },
  {
    slug: 'kelola-stok',
    title: 'Kelola Stok Lebih Terarah',
    metaDescription: 'Tentukan stok yang perlu diperiksa lebih dulu dengan membaca saldo, laju keluar, waktu isi ulang, dan riwayat koreksi.',
    eyebrow: 'Solusi stok',
    heroTitle: 'Tahu stok mana yang perlu dicek lebih dulu.',
    heroText: 'Baca saldo bersama laju keluar, waktu isi ulang, dan riwayat koreksi agar prioritas tidak berasal dari perkiraan.',
    heroOutcome: 'RAMUNI tidak memesan barang otomatis. Tim tetap memeriksa fisik dan menentukan jumlah isi ulang.',
    ctaLabel: 'Petakan 10 SKU Pertama',
    layout: 'ledger',
    visual: {
      kind: 'stock',
      label: 'Contoh perhatian stok',
      title: 'Sisa yang sama, tingkat risiko berbeda',
      period: 'Data sintetis · pembaruan 08.15 WIB',
      metrics: [
        { label: 'Kopi 250 g', value: '18 unit', note: 'Keluar 34 unit / 7 hari', tone: 'warning' },
        { label: 'Teh 250 g', value: '18 unit', note: 'Keluar 8 unit / 7 hari' },
        { label: 'Gula 1 kg', value: '42 unit', note: 'Koreksi belum dijelaskan', tone: 'accent' },
      ],
    },
    symptoms: ['Produk laris habis sebelum jadwal isi ulang.', 'Barang lambat bergerak memenuhi ruang simpan.', 'Selisih stok ditutup dengan mengganti saldo tanpa alasan.'],
    impact: [
      { title: 'Penjualan terlewat', text: 'Barang laris tidak tersedia ketika permintaan masih berjalan.' },
      { title: 'Modal tertahan', text: 'Stok lambat dibeli kembali karena semua barang dianggap sama mendesaknya.' },
      { title: 'Selisih berulang', text: 'Koreksi tanpa alasan membuat masalah pencatatan sulit ditemukan.' },
    ],
    manualGap: {
      title: 'Saldo yang sama belum tentu punya risiko yang sama.',
      text: 'Daftar stok hanya menunjukkan jumlah terakhir. Prioritas baru terlihat setelah laju keluar, waktu tunggu, dan koreksi ikut diperiksa.',
      note: 'Saldo adalah titik awal, bukan perintah untuk langsung memesan.',
      checks: [
        { label: 'Laju barang keluar', manual: 'Semua SKU dengan saldo rendah terlihat sama mendesak.', ramuni: 'Bandingkan sisa stok dengan penjualan periode terbaru.' },
        { label: 'Waktu isi ulang', manual: 'Jadwal pemasok tersimpan di catatan terpisah.', ramuni: 'Tempatkan waktu tunggu di samping perkiraan sisa hari.' },
        { label: 'Jejak koreksi', manual: 'Saldo diganti tanpa menjelaskan penyebab selisih.', ramuni: 'Buka perubahan bertanggal dan alasan koreksinya.' },
      ],
    },
    workflow: [
      { verb: 'Masukkan', title: 'Saldo awal bertanggal', text: 'Gunakan hasil pemeriksaan fisik, satuan, dan tanggal yang jelas.' },
      { verb: 'Periksa', title: 'Gerak dan koreksi', text: 'Baca barang masuk, keluar, dan alasan perubahan saldo.' },
      { verb: 'Hubungkan', title: 'Laju keluar dan waktu tunggu', text: 'Bandingkan kebutuhan dengan berapa lama barang baru tiba.' },
      { verb: 'Putuskan', title: 'Cek, tahan, atau siapkan isi ulang', text: 'Tim memilih tindakan setelah memeriksa kondisi fisik.' },
    ],
    scenario: {
      eyebrow: 'Contoh insight sintetis',
      title: 'Dua SKU sama-sama tersisa 18 unit. Hanya satu yang mendesak.',
      context: 'Toko retail meninjau 10 SKU dengan unit yang sudah disamakan.',
      rows: [
        { label: 'Kopi 250 g', value: '3,7 hari', note: 'Perkiraan sisa berdasarkan laju keluar' },
        { label: 'Waktu isi ulang', value: '4 hari', note: 'Perlu pemeriksaan hari ini' },
        { label: 'Teh 250 g', value: '15,8 hari', note: 'Belum perlu dipesan ulang' },
      ],
      finding: 'Kopi mendekati waktu isi ulang, sedangkan Teh masih memiliki ruang. Saldo yang sama tidak berarti prioritas yang sama.',
      evidence: ['Saldo fisik bertanggal', 'Penjualan tujuh hari', 'Riwayat barang masuk', 'Alasan koreksi terakhir'],
      decision: 'Cek fisik Kopi dan konfirmasi waktu pemasok. Tahan pemesanan Teh sampai laju keluarnya berubah.',
      boundary: 'Perkiraan tidak menggantikan stock opname. Jumlah pesanan tetap ditentukan pengguna.',
    },
    capabilities: [
      { title: 'Inventori', href: '/produk/inventori', status: 'Demo dengan data sintetis', text: 'Saldo, barang masuk, keluar, dan koreksi bertanggal.' },
      { title: 'Penjualan', href: '/produk/penjualan', status: 'Demo dengan data sintetis', text: 'Laju produk terjual pada periode yang dipilih.' },
      { title: 'Laporan & Insight', href: '/produk/laporan-insight', status: 'Ringkasan masih disiapkan', text: 'Daftar barang yang perlu diperiksa beserta sumbernya.' },
    ],
    industries: [
      { title: 'Retail', href: '/industri/retail', example: 'Dahulukan SKU laris yang mendekati batas stok.' },
      { title: 'F&B', href: '/industri/fnb', example: 'Tinjau item utama sebelum jam ramai tanpa mengklaim costing resep.' },
      { title: 'Manufaktur Kecil', href: '/industri/manufaktur-kecil', example: 'Pisahkan bahan utama dari barang jadi saat membaca kebutuhan.' },
    ],
    onboarding: [
      { title: 'Samakan satuan', text: 'Tentukan unit yang dipakai untuk setiap barang.' },
      { title: 'Catat saldo awal', text: 'Masukkan hasil pemeriksaan fisik beserta tanggalnya.' },
      { title: 'Jaga alasan perubahan', text: 'Simpan alasan barang masuk, keluar, dan koreksi.' },
    ],
    resource: { type: 'Kalkulator', title: 'Batas Stok Minimum', text: 'Perkirakan kapan stok perlu diperiksa dari pemakaian harian, waktu tunggu barang, dan stok pengaman.', href: '/kalkulator/reorder-stok', cta: 'Buka kalkulator' },
    faq: [
      { question: 'Apakah stok minimum berarti harus langsung restock?', answer: 'Tidak. Batas minimum menandai barang untuk diperiksa bersama saldo fisik, laju keluar, dan waktu isi ulang.' },
      { question: 'Bagaimana jika catatan berbeda dari stok fisik?', answer: 'Catat selisih dan alasannya. Jangan menutup perbedaan hanya dengan mengganti saldo.' },
      { question: 'Apakah RAMUNI membuat pesanan ke pemasok?', answer: 'Tidak pada alur ini. Tim memeriksa rekomendasi dan menentukan jumlah serta waktu pemesanan.' },
    ],
    closingTitle: 'Mulai dari barang yang paling sering keluar.',
    closingText: 'Bawa lima sampai sepuluh SKU ke demo sintetis untuk melihat bagaimana prioritas dibentuk.',
  },
  {
    slug: 'pantau-laba-dan-arus-kas',
    title: 'Pantau Laba dan Arus Kas',
    metaDescription: 'Pisahkan omzet, biaya, laba, dan pembayaran yang benar-benar diterima agar arah uang lebih mudah dijelaskan.',
    eyebrow: 'Solusi keuangan',
    heroTitle: 'Omzet ramai belum tentu membuat kas longgar.',
    heroText: 'Pisahkan nilai penjualan, biaya, laba, dan pembayaran masuk pada periode yang sama sebelum menarik kesimpulan.',
    heroOutcome: 'Ringkasan ini membantu membaca catatan operasional, bukan menggantikan akuntan atau nasihat pajak.',
    ctaLabel: 'Lihat Contoh Arus Uang',
    layout: 'bridge',
    visual: {
      kind: 'cash',
      label: 'Contoh arus uang',
      title: 'Laba positif, kas belum ikut naik',
      period: 'Data sintetis · minggu 8-14 Juli',
      metrics: [
        { label: 'Omzet', value: 'Rp28 jt', note: 'Nilai penjualan tercatat', tone: 'accent' },
        { label: 'Laba', value: 'Rp6,4 jt', note: 'Setelah biaya yang diketahui' },
        { label: 'Kas masuk', value: 'Rp21 jt', note: 'Rp7 jt belum diterima', tone: 'warning' },
      ],
    },
    symptoms: ['Omzet meningkat tetapi uang tersedia menipis.', 'Biaya utama belum dikelompokkan dengan konsisten.', 'Penjualan dicampur dengan pembayaran yang sudah diterima.'],
    impact: [
      { title: 'Belanja terlalu cepat', text: 'Keputusan memakai omzet sebagai kas yang siap digunakan.' },
      { title: 'Biaya tidak terlihat', text: 'Kenaikan penjualan menutupi biaya yang ikut membesar.' },
      { title: 'Perbandingan keliru', text: 'Transaksi dan pembayaran dari periode berbeda dibaca sebagai satu angka.' },
    ],
    manualGap: {
      title: 'Omzet, laba, dan kas menjawab pertanyaan yang berbeda.',
      text: 'Rekap tunggal dapat terlihat sehat ketika pembayaran belum masuk atau biaya belum dikelompokkan dengan benar.',
      note: 'Nilai penjualan tidak selalu sama dengan uang yang tersedia.',
      checks: [
        { label: 'Penjualan tercatat', manual: 'Nilai transaksi dibaca sebagai uang yang sudah diterima.', ramuni: 'Pisahkan transaksi dari status pembayarannya.' },
        { label: 'Biaya periode', manual: 'Biaya muncul di file atau tanggal yang berbeda.', ramuni: 'Gunakan kelompok biaya dan batas periode yang sama.' },
        { label: 'Kas yang tersedia', manual: 'Saldo kas tidak ditelusuri ke transaksi sumber.', ramuni: 'Hubungkan uang masuk dan keluar dengan catatan operasional.' },
      ],
    },
    workflow: [
      { verb: 'Masukkan', title: 'Transaksi dan biaya', text: 'Catat pemasukan, pengeluaran, serta status pembayaran.' },
      { verb: 'Periksa', title: 'Definisi dan periode', text: 'Gunakan rumus dan batas tanggal yang disepakati.' },
      { verb: 'Hubungkan', title: 'Penjualan dengan pembayaran', text: 'Pisahkan nilai tercatat dari uang yang benar-benar sudah masuk.' },
      { verb: 'Putuskan', title: 'Tindakan keuangan', text: 'Pengguna menentukan transaksi atau biaya yang perlu ditinjau.' },
    ],
    scenario: {
      eyebrow: 'Contoh insight sintetis',
      title: 'Laba tercatat Rp6,4 juta, tetapi Rp7 juta belum diterima.',
      context: 'Usaha jasa menutup minggu dengan transaksi dan biaya pada rentang tanggal yang sama.',
      rows: [
        { label: 'Nilai penjualan', value: 'Rp28 jt', note: 'Termasuk tagihan yang belum dibayar' },
        { label: 'Biaya tercatat', value: 'Rp21,6 jt', note: 'Operasional dan pengerjaan' },
        { label: 'Pembayaran diterima', value: 'Rp21 jt', note: 'Tiga tagihan masih tertunda' },
      ],
      finding: 'Usaha mencatat laba, tetapi sebagian penjualan belum menjadi kas. Belanja baru perlu membaca status pembayaran.',
      evidence: ['Daftar transaksi', 'Kelompok biaya', 'Status pembayaran', 'Periode laporan'],
      decision: 'Tinjau tiga pembayaran tertunda dan dua kelompok biaya terbesar sebelum menambah pengeluaran.',
      boundary: 'Rumus harus disepakati tim. Gunakan akuntan untuk kebutuhan akuntansi dan pajak profesional.',
    },
    capabilities: [
      { title: 'Keuangan', href: '/produk/keuangan', status: 'Demo dengan data sintetis', text: 'Pemasukan, pengeluaran, laba, dan status pembayaran.' },
      { title: 'Penjualan', href: '/produk/penjualan', status: 'Demo dengan data sintetis', text: 'Transaksi yang membentuk nilai omzet.' },
      { title: 'Dashboard Bisnis', href: '/produk/dashboard-bisnis', status: 'Ringkasan masih disiapkan', text: 'Perbandingan angka pada periode yang sama.' },
    ],
    industries: [
      { title: 'F&B', href: '/industri/fnb', example: 'Baca penjualan menu bersama biaya yang sudah dicatat.' },
      { title: 'Jasa', href: '/industri/jasa', example: 'Pisahkan nilai layanan dari pembayaran yang telah diterima.' },
      { title: 'Distributor', href: '/industri/distributor', example: 'Bedakan nilai pesanan, tagihan, dan kas yang masuk.' },
    ],
    onboarding: [
      { title: 'Kelompokkan uang', text: 'Pisahkan pemasukan, pengeluaran, dan status pembayaran.' },
      { title: 'Tentukan periode', text: 'Gunakan batas tanggal yang sama untuk semua angka.' },
      { title: 'Periksa satu laporan', text: 'Cocokkan ringkasan dengan transaksi sumber sebelum dipakai rutin.' },
    ],
    resource: { type: 'Kalkulator', title: 'Laba Usaha', text: 'Hitung selisih pendapatan dan biaya sebagai pemeriksaan awal, bukan nasihat akuntansi.', href: '/kalkulator/laba-usaha', cta: 'Buka kalkulator' },
    faq: [
      { question: 'Apa beda omzet, laba, dan kas?', answer: 'Omzet adalah nilai penjualan, laba mengikuti rumus biaya, sedangkan kas menunjukkan uang yang tersedia pada waktu tertentu.' },
      { question: 'Mengapa periode laporan harus sama?', answer: 'Transaksi, biaya, dan pembayaran dari rentang berbeda dapat membuat perubahan terlihat tidak sesuai keadaan.' },
      { question: 'Apakah ringkasan ini menggantikan akuntan?', answer: 'Tidak. RAMUNI membantu membaca catatan operasional dan bukan pengganti nasihat pajak atau akuntansi profesional.' },
    ],
    closingTitle: 'Lihat angka mana yang benar-benar mengubah kas.',
    closingText: 'Demo memperlihatkan perbedaan omzet, laba, dan pembayaran masuk dengan data sintetis.',
  },
  {
    slug: 'pahami-pelanggan',
    title: 'Pahami Pelanggan',
    metaDescription: 'Baca pembelian terakhir, frekuensi, produk, dan izin agar pola pelanggan terlihat tanpa tindak lanjut otomatis.',
    eyebrow: 'Solusi pelanggan',
    heroTitle: 'Kenali pola pelanggan, tanpa mengambil alih pilihan mereka.',
    heroText: 'Satukan riwayat yang memang boleh dipakai untuk melihat pembelian berulang, jeda, dan kategori yang diminati.',
    heroOutcome: 'RAMUNI tidak mengirim pesan otomatis. Tim tetap memeriksa izin, konteks, dan kanal tindak lanjut.',
    ctaLabel: 'Lihat Contoh Pola Pelanggan',
    layout: 'timeline',
    visual: {
      kind: 'customer',
      label: 'Contoh riwayat pelanggan',
      title: 'Pola berulang terlihat dari jaraknya',
      period: 'Data sintetis · 90 hari terakhir',
      metrics: [
        { label: 'Pelanggan A', value: '3 kali', note: 'Jeda rata-rata 24 hari', tone: 'accent' },
        { label: 'Pelanggan B', value: '1 kali', note: 'Belum cukup untuk menyimpulkan' },
        { label: 'Izin kontak', value: 'Tercatat', note: 'Kanal WhatsApp', tone: 'warning' },
      ],
    },
    symptoms: ['Riwayat pembelian tersebar di beberapa catatan.', 'Pelanggan berulang tidak dikenali saat kembali.', 'Tindak lanjut dilakukan tanpa konteks atau izin yang jelas.'],
    impact: [
      { title: 'Layanan terasa acak', text: 'Tim tidak melihat apa yang pernah dibeli ketika pelanggan kembali.' },
      { title: 'Segmen dibentuk dari dugaan', text: 'Pelanggan dikelompokkan tanpa frekuensi atau jeda yang dapat diperiksa.' },
      { title: 'Privasi terabaikan', text: 'Riwayat dan izin tidak dibaca sebagai dua hal yang berbeda.' },
    ],
    manualGap: {
      title: 'Daftar pelanggan belum menunjukkan pola pembelian.',
      text: 'Nama dan nomor kontak tidak cukup. Riwayat, jeda pembelian, identitas, dan izin perlu dibaca sebagai konteks yang terpisah.',
      note: 'Pola membantu layanan, tetapi tidak memberi izin untuk menghubungi pelanggan.',
      checks: [
        { label: 'Identitas yang konsisten', manual: 'Nama serupa mudah dianggap sebagai orang yang sama.', ramuni: 'Tinjau pengenal dan duplikat sebelum menggabungkan riwayat.' },
        { label: 'Jeda pembelian', manual: 'Pembelian terakhir dibaca tanpa pola waktunya.', ramuni: 'Bandingkan frekuensi dan jeda pada riwayat yang tersedia.' },
        { label: 'Izin tindak lanjut', manual: 'Riwayat transaksi dianggap sebagai persetujuan kontak.', ramuni: 'Pisahkan pola pembelian dari status izin dan kanal.' },
      ],
    },
    workflow: [
      { verb: 'Masukkan', title: 'Identitas dan riwayat yang diizinkan', text: 'Gunakan pengenal konsisten dan hanya data yang dibutuhkan.' },
      { verb: 'Periksa', title: 'Duplikat dan izin', text: 'Jangan menggabungkan identitas tanpa dasar yang dapat diperiksa.' },
      { verb: 'Hubungkan', title: 'Waktu, frekuensi, dan produk', text: 'Lihat pola yang benar-benar muncul dari transaksi.' },
      { verb: 'Putuskan', title: 'Tindak lanjut manusia', text: 'Tim memilih apakah perlu menanggapi, lewat kanal yang disetujui.' },
    ],
    scenario: {
      eyebrow: 'Contoh insight sintetis',
      title: 'Sebagian pelanggan kembali setiap 21-28 hari.',
      context: 'Usaha jasa meninjau 60 riwayat pelanggan yang memiliki identitas konsisten.',
      rows: [
        { label: 'Pembeli berulang', value: '18 orang', note: 'Minimal dua transaksi dalam 90 hari' },
        { label: 'Jeda umum', value: '21-28 hari', note: 'Tidak berlaku untuk semua pelanggan' },
        { label: 'Izin kontak', value: '12 dari 18', note: 'Enam pelanggan tidak boleh dihubungi' },
      ],
      finding: 'Ada pola pembelian berulang, tetapi hanya dua pertiga kelompok memiliki izin kontak yang tercatat.',
      evidence: ['Riwayat transaksi', 'Pengenal pelanggan', 'Tanggal pembelian', 'Status izin dan kanal'],
      decision: 'Gunakan pola untuk menyiapkan layanan. Hubungi hanya pelanggan dengan izin yang sesuai.',
      boundary: 'Pola bukan prediksi kebutuhan individu. Tidak ada pesan yang dikirim tanpa keputusan pengguna.',
    },
    capabilities: [
      { title: 'Pelanggan', href: '/produk/pelanggan', status: 'Bergantung pada izin data', text: 'Riwayat dan pola pembelian yang boleh dipakai.' },
      { title: 'Penjualan', href: '/produk/penjualan', status: 'Demo dengan data sintetis', text: 'Transaksi yang terhubung dengan pelanggan.' },
      { title: 'Asisten AI', href: '/produk/asisten-ai', status: 'Tidak mengirim pesan otomatis', text: 'Membantu membaca konteks tanpa mengirim pesan.' },
    ],
    industries: [
      { title: 'Distributor', href: '/industri/distributor', example: 'Lihat jeda pemesanan pelanggan rutin tanpa menebak pesanan berikutnya.' },
      { title: 'Reseller Online', href: '/industri/reseller-online', example: 'Hubungkan riwayat yang tersedia tanpa menyatukan identitas sembarang.' },
      { title: 'Jasa', href: '/industri/jasa', example: 'Tinjau layanan terdahulu sebelum menentukan tindak lanjut.' },
    ],
    onboarding: [
      { title: 'Samakan identitas', text: 'Gunakan pengenal yang konsisten dan tinjau duplikat.' },
      { title: 'Hubungkan transaksi', text: 'Sertakan hanya riwayat yang boleh dipakai.' },
      { title: 'Catat izin', text: 'Simpan dasar, kanal, dan waktu persetujuan.' },
    ],
    resource: { type: 'Artikel RAMUNI', title: 'Pelanggan & CRM', text: 'Pelajari cara membaca perilaku pelanggan dan menjaga tindak lanjut tetap menghormati privasi.', href: '/blog', cta: 'Baca artikel terkait' },
    faq: [
      { question: 'Apakah RAMUNI menghubungi pelanggan otomatis?', answer: 'Tidak pada versi awal. Tim tetap memeriksa izin, memilih kanal, dan menentukan tindak lanjut.' },
      { question: 'Riwayat apa yang boleh dipakai?', answer: 'Gunakan hanya riwayat yang dibutuhkan, memiliki dasar izin, dan dapat dilihat oleh peran terkait.' },
      { question: 'Bagaimana menangani data pelanggan ganda?', answer: 'Gunakan pengenal yang konsisten, tetapi jangan menggabungkan dua identitas tanpa dasar yang dapat diperiksa.' },
    ],
    closingTitle: 'Mulai dari satu pertanyaan pelanggan yang perlu dijawab.',
    closingText: 'Lihat contoh pola dengan data sintetis tanpa mengirim pesan atau membuka data sensitif.',
  },
  {
    slug: 'laporan-bisnis-otomatis',
    title: 'Laporan Bisnis yang Konsisten',
    metaDescription: 'Susun ringkasan harian dan mingguan dari periode, rumus, dan sumber yang sama dengan persetujuan manusia.',
    eyebrow: 'Solusi laporan',
    heroTitle: 'Tutup minggu tanpa merakit laporan dari awal.',
    heroText: 'Gunakan periode, rumus, dan sumber yang sama agar rapat membahas perubahan, bukan memperdebatkan angka.',
    heroOutcome: 'Ringkasan dapat disiapkan dari aturan yang sama. Kanal pengiriman otomatis belum tersedia pada preview.',
    ctaLabel: 'Lihat Contoh Laporan Mingguan',
    layout: 'editorial',
    visual: {
      kind: 'report',
      label: 'Contoh laporan mingguan',
      title: 'Tiga perubahan siap dibahas',
      period: 'Data sintetis · minggu 8-14 Juli',
      metrics: [
        { label: 'Penjualan', value: '-7%', note: 'Produk B sore hari', tone: 'warning' },
        { label: 'Stok', value: '3 SKU', note: 'Perlu pemeriksaan hari ini', tone: 'accent' },
        { label: 'Tindak lanjut', value: '2 pemilik', note: 'Belum dikonfirmasi' },
      ],
    },
    symptoms: ['Rekap mingguan disusun ulang dari beberapa file.', 'Angka berbeda karena periode atau rumus berubah.', 'Temuan rapat tidak memiliki pemilik tindak lanjut.'],
    impact: [
      { title: 'Rapat dimulai terlambat', text: 'Waktu habis untuk menyamakan angka yang seharusnya sudah memiliki definisi.' },
      { title: 'Temuan kehilangan konteks', text: 'Perubahan muncul tanpa sumber transaksi atau periode yang jelas.' },
      { title: 'Tindak lanjut menghilang', text: 'Keputusan tidak mencatat siapa yang memeriksa langkah berikutnya.' },
    ],
    manualGap: {
      title: 'Menyalin angka lebih cepat tidak membuat laporan konsisten.',
      text: 'Rekap tetap berbeda ketika periode, rumus, sumber, dan pemilik tindak lanjut belum disepakati sejak awal.',
      note: 'Laporan yang dapat diperiksa dimulai dari kontrak metrik yang sama.',
      checks: [
        { label: 'Periode laporan', manual: 'Batas tanggal berubah saat file disusun ulang.', ramuni: 'Kunci rentang dan waktu tutup pada setiap ringkasan.' },
        { label: 'Rumus metrik', manual: 'Tim memakai definisi angka yang berbeda.', ramuni: 'Tampilkan nama, rumus, dan sumber di konteks yang sama.' },
        { label: 'Pemilik tindakan', manual: 'Temuan berhenti sebagai catatan rapat.', ramuni: 'Simpan keputusan dan siapa yang perlu memeriksanya.' },
      ],
    },
    workflow: [
      { verb: 'Masukkan', title: 'Metrik dan periode', text: 'Tentukan nama, rumus, sumber, serta batas waktu laporan.' },
      { verb: 'Periksa', title: 'Kelengkapan sumber', text: 'Cocokkan ringkasan dengan transaksi sebelum dipakai.' },
      { verb: 'Hubungkan', title: 'Perubahan dan bukti', text: 'Dahulukan tiga temuan, lalu simpan jalur ke detail.' },
      { verb: 'Setujui', title: 'Pemilik tindak lanjut', text: 'Pengguna memeriksa ringkasan dan menetapkan siapa yang melanjutkan.' },
    ],
    scenario: {
      eyebrow: 'Contoh laporan sintetis',
      title: 'Satu periode, tiga temuan, dua tindakan.',
      context: 'Tim retail menutup minggu dengan definisi metrik yang sudah disepakati.',
      rows: [
        { label: 'Periode', value: '8-14 Juli', note: 'Tutup pukul 21.00 WIB' },
        { label: 'Temuan utama', value: '3 perubahan', note: 'Penjualan, stok, dan biaya' },
        { label: 'Status persetujuan', value: 'Perlu tinjau', note: 'Belum dikirim ke luar RAMUNI' },
      ],
      finding: 'Produk B melemah pada sore hari, tiga SKU perlu dicek, dan biaya pengiriman meningkat.',
      evidence: ['Periode laporan', 'Definisi metrik', 'Transaksi sumber', 'Pemilik tindak lanjut'],
      decision: 'Supervisor memeriksa stok. Pemilik meninjau biaya pengiriman sebelum laporan disetujui.',
      boundary: 'Penyusunan ringkasan tidak berarti pengiriman otomatis. Kanal notifikasi mengikuti status rilis akun.',
    },
    capabilities: [
      { title: 'Laporan & Insight', href: '/produk/laporan-insight', status: 'Ringkasan masih disiapkan', text: 'Ringkasan harian dan mingguan dari aturan yang sama.' },
      { title: 'Dashboard Bisnis', href: '/produk/dashboard-bisnis', status: 'Demo dengan data sintetis', text: 'Perubahan utama sebelum detail.' },
      { title: 'Notifikasi', status: 'Belum tersedia pada preview', text: 'Kanal email, WhatsApp, dan push tidak diklaim aktif.' },
    ],
    industries: [
      { title: 'Retail', href: '/industri/retail', example: 'Ringkas penjualan, stok kritis, dan koreksi untuk pemilik.' },
      { title: 'Distributor', href: '/industri/distributor', example: 'Satukan pergerakan produk, pelanggan, dan status pembayaran.' },
      { title: 'Manufaktur Kecil', href: '/industri/manufaktur-kecil', example: 'Bawa perubahan stok, penjualan, dan biaya ke rapat periode.' },
    ],
    onboarding: [
      { title: 'Sepakati metrik', text: 'Tentukan nama, rumus, sumber, dan penanggung jawab.' },
      { title: 'Tetapkan jadwal', text: 'Pilih batas tutup harian atau mingguan yang realistis.' },
      { title: 'Uji satu periode', text: 'Bandingkan ringkasan dengan sumber sebelum menjadi kebiasaan.' },
    ],
    resource: { type: 'Template', title: 'Review Bisnis Mingguan', text: 'Lihat struktur temuan, bukti, keputusan, dan penanggung jawab sebelum file final dirilis.', href: '/template', cta: 'Lihat struktur template' },
    faq: [
      { question: 'Apa yang perlu disepakati sebelum laporan dibuat?', answer: 'Tentukan nama metrik, rumus, sumber, periode, jadwal tutup, dan orang yang menindaklanjuti.' },
      { question: 'Apakah laporan langsung dikirim otomatis?', answer: 'Belum pada preview. Ringkasan perlu diperiksa dan kanal pengiriman mengikuti status rilis akun.' },
      { question: 'Bagaimana jika angka antar tim berbeda?', answer: 'Periksa definisi metrik, batas periode, dan waktu pembaruan sebelum membahas hasil.' },
    ],
    closingTitle: 'Bawa satu laporan yang paling sering terlambat.',
    closingText: 'Demo menunjukkan bagaimana aturan, bukti, dan persetujuan manusia membentuk ringkasan mingguan.',
  },
];

export const solutionDetailBySlug = Object.fromEntries(
  solutionDetails.map((solution) => [solution.slug, solution]),
) as Record<string, SolutionDetail>;
