export type ProductLayout = 'evidence' | 'signals' | 'ledger' | 'flow' | 'balance';

export interface ProductLinkItem {
  title: string;
  text: string;
  href: string;
}

export interface ProductCapability {
  capabilityId: string;
  label: string;
  description: string;
  publicApproved: boolean;
  approvedStatus?: 'Available' | 'Private Beta' | 'Coming Soon';
}

export interface ProductDetail {
  layout: ProductLayout;
  audience: string;
  heroLead: string;
  outcome: string;
  question: string;
  problems: string[];
  example: {
    label: string;
    heading: string;
    rows: [string, string][];
    takeaway: string;
  };
  benefits: { title: string; meaning: string; decision: string }[];
  workflow: { label: string; text: string }[];
  capabilities: ProductCapability[];
  safety: {
    heading: string;
    boundary: string;
    checks: string[];
  };
  roles: ProductLinkItem[];
  industries: ProductLinkItem[];
  relatedProductSlugs: string[];
  solution: ProductLinkItem;
  resource: ProductLinkItem;
  help: ProductLinkItem;
  faq: { question: string; answer: string }[];
  closing: string;
}

export const productDetails: Record<string, ProductDetail> = {
  'asisten-ai': {
    layout: 'evidence',
    audience: 'Pemilik usaha dan tim operasional yang perlu memahami angka tanpa membuka banyak laporan.',
    heroLead: 'Tanyakan kondisi usaha dengan bahasa sehari-hari. Jawaban tetap menunjukkan periode, sumber, dan bagian yang perlu dicek.',
    outcome: 'Lebih cepat menemukan hal yang perlu diperhatikan hari ini.',
    question: 'Apa yang bisa saya tanyakan tentang bisnis?',
    problems: [
      'Angka penting tersebar di beberapa catatan.',
      'Penyebab perubahan belum terlihat dari totalnya.',
      'Jawaban cepat sulit dipercaya tanpa sumber yang jelas.',
    ],
    example: {
      label: 'Contoh jawaban berbasis data sintetis',
      heading: 'Jawaban singkat, jejak angkanya tetap terbuka.',
      rows: [['Periode', 'Hari ini dibanding tujuh hari terakhir'], ['Dasar', 'Penjualan dan saldo stok yang sudah masuk'], ['Perlu dicek', 'Stok fisik sebelum jam ramai']],
      takeaway: 'Gunakan jawaban untuk menentukan pemeriksaan berikutnya, bukan menggantikan keputusan manusia.',
    },
    benefits: [
      { title: 'Konteks lebih dulu', meaning: 'Pertanyaan mengikuti periode dan modul yang sedang dibuka.', decision: 'Tahu apakah jawabannya relevan untuk hari ini.' },
      { title: 'Bukti dapat ditelusuri', meaning: 'Angka pendukung muncul bersama ringkasan.', decision: 'Bisa memeriksa sumber sebelum bertindak.' },
      { title: 'Ketidakpastian terlihat', meaning: 'Dasar yang kurang ditandai sebagai perlu dicek.', decision: 'Tidak memaksakan kesimpulan dari data tipis.' },
    ],
    workflow: [
      { label: 'Tulis pertanyaan', text: 'Gunakan bahasa yang biasa dipakai saat membahas usaha.' },
      { label: 'Pilih konteks', text: 'RAMUNI membaca periode dan data yang sedang tersedia.' },
      { label: 'Baca temuan', text: 'Jawaban utama tampil bersama tingkat kecukupan data.' },
      { label: 'Buka bukti', text: 'Periksa angka asal sebelum menentukan tindakan.' },
    ],
    capabilities: [
      { capabilityId: 'AI-READ-001', label: 'Pertanyaan berbasis konteks', description: 'Jawaban mengikuti data usaha yang sedang dibuka.', publicApproved: false },
      { capabilityId: 'AI-EVIDENCE-001', label: 'Jejak bukti', description: 'Sumber angka, periode, dan waktu pembaruan ikut ditampilkan.', publicApproved: false },
      { capabilityId: 'AI-CONFIDENCE-001', label: 'Status kecukupan data', description: 'Jawaban menandai bagian yang cukup kuat atau masih perlu dicek.', publicApproved: false },
      { capabilityId: 'AI-GUARD-001', label: 'Mode baca saja', description: 'Tidak menjalankan transaksi atau tindakan bisnis otomatis.', publicApproved: false },
    ],
    safety: {
      heading: 'Batas jawaban terlihat sebelum dipakai.',
      boundary: 'Asisten bukan mesin pencari umum dan tidak menjalankan aksi bisnis secara otomatis.',
      checks: ['Periode dan waktu pembaruan', 'Sumber angka yang dipakai', 'Bagian yang masih perlu diperiksa manusia'],
    },
    roles: [
      { title: 'Pemilik Usaha', text: 'Melihat perubahan utama sebelum membuka rinciannya.', href: '/untuk/pemilik-usaha' },
      { title: 'Supervisor', text: 'Meringkas masalah operasional untuk dibahas bersama.', href: '/untuk/supervisor' },
      { title: 'Admin Toko', text: 'Memeriksa data yang belum lengkap.', href: '/untuk/admin-toko' },
    ],
    industries: [
      { title: 'Retail', text: 'Tanya tentang stok, produk laris, dan jam transaksi.', href: '/industri/retail' },
      { title: 'F&B', text: 'Baca perubahan menu bersama bahan dan waktu penjualan.', href: '/industri/fnb' },
      { title: 'Distributor', text: 'Periksa stok, pesanan ulang, dan pembayaran.', href: '/industri/distributor' },
    ],
    relatedProductSlugs: ['dashboard-bisnis', 'laporan-insight', 'integrasi'],
    solution: { title: 'Laporan bisnis lebih ringkas', text: 'Lihat alur dari data harian menjadi bahan evaluasi.', href: '/solusi/laporan-bisnis-otomatis' },
    resource: { title: 'AI Business Companion untuk UMKM', text: 'Kenali peran AI yang tetap menyertakan bukti dan batas.', href: '/blog/ai-business-companion-umkm' },
    help: { title: 'Mulai dari panduan dasar', text: 'Siapkan pertanyaan dan data sebelum mencoba contoh.', href: '/panduan' },
    faq: [
      { question: 'Data apa yang dipakai untuk menjawab?', answer: 'Jawaban mengikuti periode, modul, dan catatan yang sedang dibuka. Data yang belum lengkap perlu disebutkan.' },
      { question: 'Apakah Asisten AI dapat mengubah data?', answer: 'Tidak pada rancangan awal. Asisten membaca dan menjelaskan; perubahan tetap dilakukan pengguna sesuai akses.' },
      { question: 'Apa yang perlu diperiksa sebelum memakai jawaban?', answer: 'Periksa periode, waktu pembaruan, sumber angka, dan bagian yang masih membutuhkan penilaian manusia.' },
    ],
    closing: 'Mulai dari satu pertanyaan yang sering menghabiskan waktu Anda.',
  },
  'dashboard-bisnis': {
    layout: 'signals',
    audience: 'Pemilik usaha dan supervisor yang perlu melihat prioritas sebelum membaca seluruh angka.',
    heroLead: 'Satukan perubahan penjualan, stok, kas, dan pelanggan dalam ringkasan yang menunjukkan apa yang perlu dibuka lebih dulu.',
    outcome: 'Mulai dari prioritas, lalu telusuri metrik pendukungnya.',
    question: 'Apa yang perlu saya perhatikan hari ini?',
    problems: ['Ringkasan harian masih dirakit manual.', 'Angka penting tampil tanpa pembanding.', 'Tim membaca versi informasi yang berbeda.'],
    example: {
      label: 'Contoh ringkasan pagi',
      heading: 'Tiga perubahan penting tampil sebelum grafik lengkap.',
      rows: [['Diperbarui', 'Hari ini, 08.15'], ['Prioritas', 'Stok produk laris dan biaya operasional'], ['Alasan', 'Perubahan terbesar pada periode setara']],
      takeaway: 'Prioritas harus menjelaskan alasan kemunculannya, bukan memakai skor yang tidak dapat diterangkan.',
    },
    benefits: [
      { title: 'Urutan yang jelas', meaning: 'Perubahan terbesar tampil lebih dulu.', decision: 'Tahu bagian mana yang perlu dibuka sekarang.' },
      { title: 'Pembanding setara', meaning: 'Periode dan rumus dipakai secara konsisten.', decision: 'Tidak salah membaca perubahan musiman.' },
      { title: 'Data tidak terasa basi', meaning: 'Waktu pembaruan melekat pada ringkasan.', decision: 'Tahu kapan perlu menunggu atau memeriksa ulang.' },
    ],
    workflow: [
      { label: 'Buka ringkasan', text: 'Lihat perubahan utama saat hari dimulai.' },
      { label: 'Pilih pembanding', text: 'Gunakan rentang waktu yang setara.' },
      { label: 'Telusuri metrik', text: 'Buka angka dan transaksi pendukung.' },
      { label: 'Tandai prioritas', text: 'Bawa hal penting ke percakapan tim.' },
    ],
    capabilities: [
      { capabilityId: 'DASH-PRIORITY-001', label: 'Sorotan prioritas', description: 'Perubahan yang perlu diperiksa muncul lebih dulu.', publicApproved: false },
      { capabilityId: 'DASH-COMPARE-001', label: 'Perbandingan periode', description: 'Pembanding memakai rentang dan rumus yang setara.', publicApproved: false },
      { capabilityId: 'DASH-FRESH-001', label: 'Waktu pembaruan', description: 'Setiap sumber menunjukkan waktu pembaruan terakhir.', publicApproved: false },
      { capabilityId: 'DASH-DRILL-001', label: 'Telusur metrik', description: 'Sorotan dapat ditelusuri kembali ke angka asal.', publicApproved: false },
    ],
    safety: {
      heading: 'Prioritas tanpa skor misterius.',
      boundary: 'Ringkasan tidak menjanjikan ramalan sempurna. Alasan, periode, dan sumber harus dapat diperiksa.',
      checks: ['Alasan prioritas', 'Rumus pembanding', 'Waktu pembaruan sumber'],
    },
    roles: [
      { title: 'Pemilik Usaha', text: 'Membaca perubahan sebelum membuka rincian.', href: '/untuk/pemilik-usaha' },
      { title: 'Supervisor', text: 'Membawa pengecualian ke rapat operasional.', href: '/untuk/supervisor' },
    ],
    industries: [
      { title: 'Retail', text: 'Pantau omzet, produk laris, dan stok kritis bersama.', href: '/industri/retail' },
      { title: 'F&B', text: 'Baca menu, jam ramai, bahan, dan biaya.', href: '/industri/fnb' },
      { title: 'Jasa', text: 'Bandingkan pendapatan layanan dengan biaya terkait.', href: '/industri/jasa' },
    ],
    relatedProductSlugs: ['asisten-ai', 'laporan-insight', 'keuangan'],
    solution: { title: 'Pantau laba dan arus kas', text: 'Hubungkan ringkasan dengan perjalanan uang.', href: '/solusi/pantau-laba-dan-arus-kas' },
    resource: { title: 'Kamus istilah bisnis', text: 'Samakan arti omzet, laba, kas, dan stok.', href: '/kamus-bisnis' },
    help: { title: 'Panduan membaca dashboard', text: 'Pelajari urutan memeriksa ringkasan usaha.', href: '/panduan' },
    faq: [
      { question: 'Seberapa baru angka yang tampil?', answer: 'Setiap ringkasan perlu menyebut waktu pembaruan. Angka lama tidak ditampilkan seolah masih terkini.' },
      { question: 'Apakah semua orang melihat dashboard yang sama?', answer: 'Tidak. Ringkasan dan detail mengikuti tugas serta akses setiap peran.' },
      { question: 'Mengapa suatu angka muncul sebagai prioritas?', answer: 'Prioritas perlu menunjukkan perubahan, pembanding, dan alasan yang dapat ditelusuri.' },
    ],
    closing: 'Lihat hal penting tanpa membaca semua angka lebih dulu.',
  },
  'katalog-produk': {
    layout: 'ledger',
    audience: 'Pemilik usaha dan admin yang ingin memakai nama, SKU, unit, harga, dan HPP secara konsisten.',
    heroLead: 'Rapikan identitas produk sebelum dipakai untuk transaksi, stok, dan laporan.',
    outcome: 'Satu produk memiliki satu identitas yang dipahami seluruh tim.',
    question: 'Bagaimana data produk dan harga disiapkan?',
    problems: ['Nama dan satuan berubah antar catatan.', 'Harga jual dan HPP sulit ditelusuri.', 'Produk lama bercampur dengan produk aktif.'],
    example: {
      label: 'Contoh normalisasi katalog',
      heading: 'Dari tiga nama menjadi satu produk yang dapat ditelusuri.',
      rows: [['Identitas', 'Nama, SKU, kategori, dan unit'], ['Nilai', 'Harga jual dan HPP'], ['Status', 'Aktif atau diarsipkan tanpa menghapus riwayat']],
      takeaway: 'Daftar yang rapi mengurangi duplikasi sebelum data masuk ke transaksi dan stok.',
    },
    benefits: [
      { title: 'Nama yang sama', meaning: 'Produk memakai identitas dan unit yang konsisten.', decision: 'Tim tidak menjumlahkan barang yang sama dua kali.' },
      { title: 'Nilai mudah diperiksa', meaning: 'Harga dan HPP berada pada catatan yang sama.', decision: 'Perubahan nilai lebih mudah ditelusuri.' },
      { title: 'Riwayat tetap utuh', meaning: 'Produk lama diarsipkan, bukan dihapus.', decision: 'Laporan lama tidak kehilangan konteks.' },
    ],
    workflow: [
      { label: 'Kumpulkan nama', text: 'Satukan produk yang masih tersebar.' },
      { label: 'Samakan identitas', text: 'Tentukan SKU, kategori, dan unit.' },
      { label: 'Lengkapi nilai', text: 'Isi harga, HPP, dan batas stok.' },
      { label: 'Rawat daftar', text: 'Arsipkan produk lama tanpa menghapus riwayat.' },
    ],
    capabilities: [
      { capabilityId: 'CAT-CORE-001', label: 'Kategori, unit, produk, dan SKU', description: 'Identitas utama untuk menjaga katalog tetap konsisten.', publicApproved: false },
      { capabilityId: 'CAT-VALUE-001', label: 'Harga, HPP, dan stok minimum', description: 'Nilai dasar untuk transaksi dan pemeriksaan stok.', publicApproved: false },
      { capabilityId: 'CAT-ARCHIVE-001', label: 'Arsip produk', description: 'Pisahkan produk aktif tanpa menghapus riwayat.', publicApproved: false },
      { capabilityId: 'CAT-ADVANCED-001', label: 'Barcode, varian, bundel, lot, dan serial', description: 'Belum tersedia.', publicApproved: false },
      { capabilityId: 'CAT-PRICELIST-001', label: 'Daftar harga bertingkat', description: 'Belum tersedia.', publicApproved: false },
    ],
    safety: {
      heading: 'Fitur lanjutan tidak dibungkus sebagai satu janji.',
      boundary: 'Barcode, varian, bundel, lot, serial, dan daftar harga harus memiliki status masing-masing.',
      checks: ['Status per kelompok fitur', 'Jejak perubahan harga dan HPP', 'Akses orang yang mengubah data'],
    },
    roles: [
      { title: 'Pemilik Usaha', text: 'Menetapkan aturan nama, unit, harga, dan HPP.', href: '/untuk/pemilik-usaha' },
      { title: 'Admin Toko', text: 'Merapikan duplikat dan menjaga daftar aktif.', href: '/untuk/admin-toko' },
    ],
    industries: [
      { title: 'Retail', text: 'Jaga SKU dan satuan tetap sama dari rak ke laporan.', href: '/industri/retail' },
      { title: 'Distributor', text: 'Bedakan produk dan unit penjualan volume besar.', href: '/industri/distributor' },
      { title: 'Reseller Online', text: 'Samakan kode produk dari beberapa kanal.', href: '/industri/reseller-online' },
    ],
    relatedProductSlugs: ['inventori', 'penjualan', 'integrasi'],
    solution: { title: 'Kelola stok lebih terarah', text: 'Lihat bagaimana katalog menjadi dasar pergerakan stok.', href: '/solusi/kelola-stok' },
    resource: { title: 'Panduan membaca stok harian', text: 'Hubungkan identitas produk dengan saldo dan laju keluar.', href: '/blog/panduan-membaca-stok-harian' },
    help: { title: 'Panduan menyiapkan data', text: 'Mulai dari struktur produk yang konsisten.', href: '/panduan' },
    faq: [
      { question: 'Bagaimana menangani nama produk yang ganda?', answer: 'Pilih satu identitas utama, samakan SKU dan unit, lalu arsipkan duplikat tanpa menghapus riwayat.' },
      { question: 'Apakah varian dan bundel sudah termasuk?', answer: 'Belum dinyatakan tersedia. Barcode, varian, bundel, lot, serial, dan daftar harga memiliki status terpisah.' },
      { question: 'Siapa yang boleh mengubah harga atau HPP?', answer: 'Perubahan mengikuti akses akun dan perlu meninggalkan jejak yang dapat diperiksa.' },
    ],
    closing: 'Rapikan produk sekali, gunakan dengan cara yang sama.',
  },
  penjualan: {
    layout: 'flow',
    audience: 'Kasir, admin, dan pemilik yang ingin memahami transaksi di balik perubahan omzet.',
    heroLead: 'Catat transaksi dengan jelas, lalu lihat produk, waktu, dan status pembayaran yang membentuk omzet.',
    outcome: 'Tahu apa yang berubah sebelum memilih promosi atau tindakan lain.',
    question: 'Apa yang mendorong perubahan omzet?',
    problems: ['Transaksi dicatat terlambat.', 'Produk laris belum mudah terlihat.', 'Status pembayaran perlu diperiksa ulang.'],
    example: {
      label: 'Contoh pembacaan transaksi',
      heading: 'Total omzet dipecah menjadi produk, waktu, dan pembayaran.',
      rows: [['Pembanding', 'Hari kerja minggu ini dan minggu lalu'], ['Pendorong', 'Produk serta jam dengan perubahan terbesar'], ['Pemeriksaan', 'Transaksi belum dibayar atau belum lengkap']],
      takeaway: 'Periksa transaksi pembentuknya sebelum menyimpulkan promosi berhasil atau gagal.',
    },
    benefits: [
      { title: 'Transaksi utuh', meaning: 'Waktu, produk, nilai, dan pembayaran tercatat bersama.', decision: 'Tahu transaksi mana yang perlu diperiksa.' },
      { title: 'Pendorong terlihat', meaning: 'Pola dibaca per produk dan kategori.', decision: 'Tidak mengandalkan total omzet saja.' },
      { title: 'Pembayaran tidak tercampur', meaning: 'Status uang diterima dipisahkan dari nilai penjualan.', decision: 'Tidak menyamakan pesanan dengan kas masuk.' },
    ],
    workflow: [
      { label: 'Catat transaksi', text: 'Simpan waktu, produk, nilai, dan pembayaran.' },
      { label: 'Kelompokkan pola', text: 'Baca perubahan per produk dan kategori.' },
      { label: 'Bandingkan periode', text: 'Gunakan jumlah hari operasi yang setara.' },
      { label: 'Bahas penyebab', text: 'Bawa perubahan utama ke pemilik atau supervisor.' },
    ],
    capabilities: [
      { capabilityId: 'SALE-CAPTURE-001', label: 'Pencatatan transaksi', description: 'Catat penjualan dasar beserta waktu dan produknya.', publicApproved: false },
      { capabilityId: 'SALE-TREND-001', label: 'Tren produk dan kategori', description: 'Lihat produk dan kategori yang mendorong perubahan omzet.', publicApproved: false },
      { capabilityId: 'SALE-PAYMENT-001', label: 'Status pembayaran', description: 'Pisahkan nilai transaksi dari uang yang sudah diterima.', publicApproved: false },
      { capabilityId: 'SALE-POS-BOUNDARY', label: 'Cakupan POS lanjutan', description: 'Mode offline, tutup shift, retur, dan dukungan perangkat belum tersedia.', publicApproved: false },
    ],
    safety: {
      heading: 'Pencatatan penjualan bukan janji POS lengkap.',
      boundary: 'Mode offline, tutup shift, retur, pertukaran, dan dukungan perangkat memerlukan bukti terpisah.',
      checks: ['Status pembayaran', 'Transaksi ganda atau gagal', 'Cakupan perangkat dan mode offline'],
    },
    roles: [
      { title: 'Kasir', text: 'Mencatat item, nilai, waktu, dan pembayaran.', href: '/untuk/kasir' },
      { title: 'Admin Toko', text: 'Memeriksa transaksi terlambat atau ganda.', href: '/untuk/admin-toko' },
      { title: 'Pemilik Usaha', text: 'Membaca pendorong perubahan omzet.', href: '/untuk/pemilik-usaha' },
    ],
    industries: [
      { title: 'Retail', text: 'Bandingkan produk dan jam transaksi yang setara.', href: '/industri/retail' },
      { title: 'F&B', text: 'Lihat menu yang berubah sebelum menilai promosi.', href: '/industri/fnb' },
      { title: 'Reseller Online', text: 'Pisahkan catatan kanal sebelum membandingkan produk.', href: '/industri/reseller-online' },
    ],
    relatedProductSlugs: ['dashboard-bisnis', 'inventori', 'pelanggan'],
    solution: { title: 'Naikkan omzet dengan data', text: 'Cari produk, waktu, dan pelanggan yang benar-benar berubah.', href: '/solusi/naikkan-omzet' },
    resource: { title: 'Kamus omzet dan pembayaran', text: 'Samakan arti transaksi, omzet, dan kas masuk.', href: '/kamus-bisnis' },
    help: { title: 'Panduan operasional awal', text: 'Pelajari urutan mencatat dan memeriksa transaksi.', href: '/panduan' },
    faq: [
      { question: 'Apa beda transaksi dan pembayaran?', answer: 'Transaksi mencatat penjualan. Status pembayaran menunjukkan apakah uang sudah diterima atau masih perlu diperiksa.' },
      { question: 'Bagaimana menangani transaksi yang gagal tersimpan?', answer: 'Jangan langsung mengulang. Periksa statusnya agar tidak membuat transaksi ganda.' },
      { question: 'Apakah ini sudah mencakup POS lengkap?', answer: 'Belum dinyatakan. Offline, tutup shift, retur, perangkat, dan fitur POS lain memiliki status terpisah.' },
    ],
    closing: 'Temukan transaksi yang membentuk perubahan omzet.',
  },
  inventori: {
    layout: 'ledger',
    audience: 'Admin, supervisor, dan pemilik yang perlu memahami saldo serta alasan perubahannya.',
    heroLead: 'Baca stok saat ini bersama barang masuk, keluar, koreksi, dan laju penjualan.',
    outcome: 'Tahu barang yang perlu diperiksa sebelum rak kosong.',
    question: 'Stok mana yang perlu ditindaklanjuti?',
    problems: ['Stok habis baru diketahui saat diminta.', 'Selisih stok sulit dijelaskan.', 'Pembelian hanya mengandalkan ingatan.'],
    example: {
      label: 'Contoh perhatian stok',
      heading: 'Saldo dibaca bersama laju keluar dan koreksinya.',
      rows: [['Saldo tercatat', '18 unit pada pembaruan terakhir'], ['Laju keluar', '34 unit dalam tujuh hari'], ['Pemeriksaan', 'Cek fisik dan riwayat penyesuaian']],
      takeaway: 'Batas minimum menandai barang untuk diperiksa, bukan membuat pesanan otomatis.',
    },
    benefits: [
      { title: 'Gerak dapat ditelusuri', meaning: 'Barang masuk, keluar, dan koreksi memiliki jejak.', decision: 'Bisa menjelaskan penyebab selisih.' },
      { title: 'Saldo punya waktu', meaning: 'Jumlah terakhir tampil bersama pembaruannya.', decision: 'Tahu kapan perlu cek fisik.' },
      { title: 'Prioritas lebih masuk akal', meaning: 'Saldo dibaca bersama laju keluar.', decision: 'Mendahulukan barang yang benar-benar berisiko habis.' },
    ],
    workflow: [
      { label: 'Catat pergerakan', text: 'Simpan barang masuk, keluar, dan koreksi.' },
      { label: 'Hitung saldo', text: 'Lihat jumlah terakhir dan waktu pembaruan.' },
      { label: 'Bandingkan laju', text: 'Baca saldo bersama kecepatan penjualan.' },
      { label: 'Periksa tindakan', text: 'Cek fisik sebelum menyiapkan isi ulang.' },
    ],
    capabilities: [
      { capabilityId: 'INV-LEDGER-001', label: 'Riwayat pergerakan', description: 'Jejak barang masuk, keluar, dan koreksi tetap dapat diperiksa.', publicApproved: false },
      { capabilityId: 'INV-BALANCE-001', label: 'Saldo dan waktu pembaruan', description: 'Jumlah terkini tampil bersama waktu pembaruannya.', publicApproved: false },
      { capabilityId: 'INV-MIN-001', label: 'Batas stok minimum', description: 'Tandai barang yang perlu diperiksa lebih dulu.', publicApproved: false },
      { capabilityId: 'INV-PROCURE-BOUNDARY', label: 'Pengadaan otomatis', description: 'Belum tersedia dan tidak dipicu oleh batas stok minimum.', publicApproved: false },
    ],
    safety: {
      heading: 'Saldo tidak berubah tanpa alasan.',
      boundary: 'Koreksi memerlukan jejak. Batas minimum tidak membuat pesanan pembelian otomatis.',
      checks: ['Jumlah fisik dan saldo sistem', 'Alasan penyesuaian', 'Waktu isi ulang dan laju keluar'],
    },
    roles: [
      { title: 'Admin Toko', text: 'Mencatat pergerakan dan alasan koreksi.', href: '/untuk/admin-toko' },
      { title: 'Supervisor', text: 'Menangani selisih dan stok kritis.', href: '/untuk/supervisor' },
      { title: 'Pemilik Usaha', text: 'Menilai kebutuhan isi ulang dari data.', href: '/untuk/pemilik-usaha' },
    ],
    industries: [
      { title: 'Retail', text: 'Dahulukan SKU laris yang mendekati batas minimum.', href: '/industri/retail' },
      { title: 'F&B', text: 'Cek bahan utama sebelum jam ramai.', href: '/industri/fnb' },
      { title: 'Distributor', text: 'Bandingkan stok volume besar dengan pesanan tercatat.', href: '/industri/distributor' },
    ],
    relatedProductSlugs: ['katalog-produk', 'penjualan', 'laporan-insight'],
    solution: { title: 'Kelola stok', text: 'Baca saldo, laju keluar, dan waktu isi ulang bersama.', href: '/solusi/kelola-stok' },
    resource: { title: 'Panduan membaca stok harian', text: 'Pelajari cara memeriksa stok sebelum masalah muncul.', href: '/blog/panduan-membaca-stok-harian' },
    help: { title: 'Panduan inventori', text: 'Mulai dari satuan dan saldo awal yang dapat dipercaya.', href: '/panduan' },
    faq: [
      { question: 'Apakah stok minimum berarti harus langsung membeli?', answer: 'Tidak. Batas minimum menandai barang untuk diperiksa bersama saldo fisik, laju keluar, dan waktu isi ulang.' },
      { question: 'Bagaimana jika saldo sistem berbeda dari stok fisik?', answer: 'Catat jumlah fisik, selisih, waktu cek, dan alasan koreksi agar perubahan dapat ditelusuri.' },
      { question: 'Apakah RAMUNI membuat pesanan pembelian otomatis?', answer: 'Tidak pada cakupan ini. Pengadaan otomatis memerlukan status dan bukti terpisah.' },
    ],
    closing: 'Periksa stok sebelum masalah terlihat di rak.',
  },
  keuangan: {
    layout: 'balance',
    audience: 'Pemilik dan tim operasional yang ingin membedakan omzet, laba, kas, serta biaya.',
    heroLead: 'Lihat uang masuk dan keluar dengan definisi yang jelas, tanpa mencampur omzet, laba, dan saldo kas.',
    outcome: 'Pahami arah uang sebelum mengambil keputusan berikutnya.',
    question: 'Apakah usaha menghasilkan laba dan kas yang sehat?',
    problems: ['Omzet naik tetapi kas tidak terasa.', 'Biaya utama belum dikelompokkan.', 'Definisi laba berbeda antar catatan.'],
    example: {
      label: 'Contoh arus uang',
      heading: 'Pisahkan penjualan, biaya, laba, dan kas sebelum menyimpulkan.',
      rows: [['Uang masuk', 'Pembayaran yang benar-benar diterima'], ['Uang keluar', 'Biaya yang sudah dikelompokkan'], ['Pemeriksaan', 'Transaksi tertunda dan biaya terbesar']],
      takeaway: 'Gunakan definisi dan periode yang sama sebelum membandingkan hasil.',
    },
    benefits: [
      { title: 'Istilah tidak tercampur', meaning: 'Omzet, laba, dan kas memiliki definisi masing-masing.', decision: 'Tahu angka mana yang sedang dibahas.' },
      { title: 'Biaya memiliki kelompok', meaning: 'Pengeluaran dicatat dengan kategori konsisten.', decision: 'Melihat biaya yang paling memengaruhi hasil.' },
      { title: 'Periode dapat dibandingkan', meaning: 'Rumus dan batas waktu dipakai bersama.', decision: 'Tidak menarik kesimpulan dari rentang berbeda.' },
    ],
    workflow: [
      { label: 'Kelompokkan uang', text: 'Pisahkan pemasukan dan pengeluaran.' },
      { label: 'Terapkan definisi', text: 'Bedakan omzet, laba, dan saldo kas.' },
      { label: 'Bandingkan periode', text: 'Gunakan rumus dan rentang waktu yang sama.' },
      { label: 'Tinjau penyebab', text: 'Buka transaksi yang paling memengaruhi perubahan.' },
    ],
    capabilities: [
      { capabilityId: 'FIN-FLOW-001', label: 'Pemasukan dan pengeluaran', description: 'Kelompokkan uang masuk dan keluar agar mudah dibandingkan.', publicApproved: false },
      { capabilityId: 'FIN-PROFIT-001', label: 'Definisi laba', description: 'Gunakan rumus laba yang dapat dipahami seluruh tim.', publicApproved: false },
      { capabilityId: 'FIN-CASH-001', label: 'Ringkasan kas', description: 'Lihat saldo bersama aktivitas yang membentuknya.', publicApproved: false },
      { capabilityId: 'FIN-ACCOUNTING-BOUNDARY', label: 'Akuntansi dan pajak', description: 'Belum mencakup pembukuan debit-kredit lengkap, pelaporan pajak, atau nasihat profesional.', publicApproved: false },
    ],
    safety: {
      heading: 'Ringkasan operasional, bukan pengganti akuntan.',
      boundary: 'Halaman ini tidak menyatakan dukungan akuntansi double-entry, pelaporan pajak, atau nasihat profesional.',
      checks: ['Definisi metrik', 'Periode perbandingan', 'Transaksi yang belum lengkap'],
    },
    roles: [
      { title: 'Pemilik Usaha', text: 'Membaca arah omzet, biaya, laba, dan kas.', href: '/untuk/pemilik-usaha' },
      { title: 'Supervisor', text: 'Membandingkan periode dengan rumus yang sama.', href: '/untuk/supervisor' },
      { title: 'Admin Toko', text: 'Menjaga kategori uang tetap konsisten.', href: '/untuk/admin-toko' },
    ],
    industries: [
      { title: 'Jasa', text: 'Baca pendapatan layanan bersama biaya pengerjaan.', href: '/industri/jasa' },
      { title: 'Distributor', text: 'Pisahkan nilai pesanan dari pembayaran yang masuk.', href: '/industri/distributor' },
      { title: 'Manufaktur Kecil', text: 'Bandingkan biaya utama dengan penjualan.', href: '/industri/manufaktur-kecil' },
    ],
    relatedProductSlugs: ['penjualan', 'dashboard-bisnis', 'laporan-insight'],
    solution: { title: 'Pantau laba dan arus kas', text: 'Ikuti perjalanan uang dari transaksi ke ringkasan.', href: '/solusi/pantau-laba-dan-arus-kas' },
    resource: { title: 'Arus kas UMKM dengan bahasa ringan', text: 'Pisahkan uang masuk, uang keluar, laba, dan saldo.', href: '/blog/arus-kas-umkm-ringan' },
    help: { title: 'Panduan membaca keuangan', text: 'Mulai dari definisi angka yang dipakai bersama.', href: '/panduan' },
    faq: [
      { question: 'Apa beda omzet, laba, dan kas?', answer: 'Omzet adalah nilai penjualan, laba mengikuti rumus biaya, dan kas menunjukkan uang yang tersedia pada waktu tertentu.' },
      { question: 'Apakah informasi ini menggantikan akuntan?', answer: 'Tidak. Ringkasan bersifat operasional dan bukan nasihat pajak atau akuntansi profesional.' },
      { question: 'Apakah ini sudah menjadi sistem akuntansi lengkap?', answer: 'Tidak dinyatakan. Double-entry, pajak, tutup buku, dan fitur akuntansi lain memerlukan bukti terpisah.' },
    ],
    closing: 'Baca arah uang tanpa mencampur omzet dan kas.',
  },
  pelanggan: {
    layout: 'evidence',
    audience: 'Pemilik dan admin yang ingin memahami pembelian berulang dengan batas privasi yang jelas.',
    heroLead: 'Baca riwayat, frekuensi, dan izin sebelum memilih tindak lanjut pelanggan.',
    outcome: 'Bangun hubungan berdasarkan konteks yang benar-benar tersedia.',
    question: 'Siapa yang membeli dan kembali?',
    problems: ['Riwayat pelanggan tersebar.', 'Pembeli berulang belum dikenali.', 'Tindak lanjut belum selalu memiliki dasar izin.'],
    example: {
      label: 'Contoh pola pelanggan',
      heading: 'Riwayat, frekuensi, dan izin dibaca bersama.',
      rows: [['Riwayat', 'Transaksi yang terkait dengan pelanggan'], ['Pola', 'Waktu dan produk yang sering dibeli'], ['Izin', 'Dasar dan kanal tindak lanjut']],
      takeaway: 'Pola pembelian memberi konteks. Izin tetap menentukan apakah pelanggan boleh dihubungi.',
    },
    benefits: [
      { title: 'Riwayat tersambung', meaning: 'Pembelian yang boleh dipakai berada dalam satu konteks.', decision: 'Tahu interaksi terakhir tanpa menebak.' },
      { title: 'Pola berulang terlihat', meaning: 'Frekuensi dan produk dibaca dari catatan nyata.', decision: 'Memilih tindak lanjut yang lebih relevan.' },
      { title: 'Izin tidak dilupakan', meaning: 'Dasar dan kanal persetujuan ikut diperiksa.', decision: 'Tidak menghubungi pelanggan secara sembarang.' },
    ],
    workflow: [
      { label: 'Samakan identitas', text: 'Hubungkan riwayat yang memang boleh dipakai.' },
      { label: 'Baca pola', text: 'Lihat pembelian terakhir dan frekuensi.' },
      { label: 'Kelompokkan kebutuhan', text: 'Buat segmen sederhana dari perilaku nyata.' },
      { label: 'Periksa izin', text: 'Hubungi hanya melalui kanal yang sesuai.' },
    ],
    capabilities: [
      { capabilityId: 'CRM-HISTORY-001', label: 'Riwayat pembelian', description: 'Hubungkan catatan pembelian yang memang terkait dengan pelanggan.', publicApproved: false },
      { capabilityId: 'CRM-REPEAT-001', label: 'Status pembelian berulang', description: 'Baca frekuensi dari riwayat pembelian yang tersedia.', publicApproved: false },
      { capabilityId: 'CRM-SEGMENT-001', label: 'Kelompok pelanggan dasar', description: 'Buat kelompok sederhana dari riwayat, bukan prediksi perilaku.', publicApproved: false },
      { capabilityId: 'CRM-CONSENT-001', label: 'Batas izin', description: 'Tindak lanjut tidak berjalan otomatis dan tetap mengikuti persetujuan.', publicApproved: false },
    ],
    safety: {
      heading: 'Relevan tidak berarti boleh langsung menghubungi.',
      boundary: 'Tidak ada pesan otomatis tanpa dasar persetujuan, kanal yang sesuai, dan kontrol manusia.',
      checks: ['Dasar izin', 'Kanal yang disetujui', 'Akses orang yang melihat data'],
    },
    roles: [
      { title: 'Pemilik Usaha', text: 'Melihat pola pembelian berulang.', href: '/untuk/pemilik-usaha' },
      { title: 'Admin Toko', text: 'Menjaga identitas, riwayat, dan izin tetap rapi.', href: '/untuk/admin-toko' },
    ],
    industries: [
      { title: 'Retail', text: 'Baca riwayat pembelian yang memang tersedia.', href: '/industri/retail' },
      { title: 'Jasa', text: 'Lihat layanan yang pernah dipakai.', href: '/industri/jasa' },
      { title: 'Reseller Online', text: 'Hubungkan riwayat kanal dengan hati-hati.', href: '/industri/reseller-online' },
    ],
    relatedProductSlugs: ['penjualan', 'asisten-ai', 'dashboard-bisnis'],
    solution: { title: 'Pahami pelanggan', text: 'Lihat pola pembelian tanpa mengambil alih pilihan pelanggan.', href: '/solusi/pahami-pelanggan' },
    resource: { title: 'Panduan pelanggan', text: 'Pelajari cara membaca pola dengan batas privasi.', href: '/panduan' },
    help: { title: 'Bantuan dan kebijakan data', text: 'Lihat jalur bantuan sebelum mengelola data pelanggan.', href: '/bantuan' },
    faq: [
      { question: 'Apakah RAMUNI mengirim pesan otomatis?', answer: 'Tidak pada rancangan awal. Tindak lanjut dilakukan manusia setelah memeriksa izin dan konteks.' },
      { question: 'Data pelanggan apa yang perlu disimpan?', answer: 'Gunakan hanya data yang dibutuhkan, memiliki dasar izin, dan sesuai akses pekerjaan.' },
      { question: 'Bagaimana jika satu pelanggan tercatat beberapa kali?', answer: 'Samakan pengenal secara hati-hati. Jangan menggabungkan identitas tanpa dasar yang jelas.' },
    ],
    closing: 'Pahami pelanggan tanpa melewati batas privasi.',
  },
  'laporan-insight': {
    layout: 'signals',
    audience: 'Pemilik dan supervisor yang ingin menutup hari atau minggu dengan angka yang dapat dibahas.',
    heroLead: 'Susun perubahan, alasan, dan tindak lanjut dalam satu periode yang konsisten.',
    outcome: 'Rapat dimulai dari temuan, bukan perdebatan rumus.',
    question: 'Bagaimana saya menutup hari dan minggu?',
    problems: ['Rekap mingguan memakan waktu.', 'Angka berubah karena rumus berbeda.', 'Tindak lanjut rapat tidak memiliki pemilik.'],
    example: {
      label: 'Contoh laporan mingguan',
      heading: 'Satu periode, satu rumus, tiga hal untuk dibahas.',
      rows: [['Periode', 'Tujuh hari dengan batas waktu yang jelas'], ['Isi', 'Perubahan, penyebab, dan bukti'], ['Tindak lanjut', 'Pemilik dan tenggat untuk setiap temuan']],
      takeaway: 'Laporan selesai saat temuan memiliki dasar dan orang yang menindaklanjuti.',
    },
    benefits: [
      { title: 'Ritual lebih ringan', meaning: 'Catatan harian tumbuh menjadi ringkasan mingguan.', decision: 'Tidak merakit laporan dari awal.' },
      { title: 'Angka dapat disepakati', meaning: 'Periode dan rumus melekat pada laporan.', decision: 'Rapat fokus pada perubahan, bukan definisi.' },
      { title: 'Tindak lanjut terlihat', meaning: 'Setiap temuan memiliki pemilik.', decision: 'Keputusan tidak berhenti sebagai catatan.' },
    ],
    workflow: [
      { label: 'Kumpulkan periode', text: 'Ambil angka dari rentang waktu yang sama.' },
      { label: 'Pilih perubahan', text: 'Dahulukan temuan paling penting.' },
      { label: 'Sertakan bukti', text: 'Tampilkan rumus dan transaksi pendukung.' },
      { label: 'Tetapkan pemilik', text: 'Catat orang dan tenggat tindak lanjut.' },
    ],
    capabilities: [
      { capabilityId: 'REPORT-DAILY-001', label: 'Insight harian', description: 'Ringkas perubahan utama setiap hari.', publicApproved: false },
      { capabilityId: 'REPORT-WEEKLY-001', label: 'Laporan mingguan', description: 'Satukan temuan, bukti, dan tindak lanjut.', publicApproved: false },
      { capabilityId: 'REPORT-EXPORT-001', label: 'Ekspor laporan', description: 'Belum tersedia.', publicApproved: false },
      { capabilityId: 'REPORT-NOTIFY-001', label: 'Notifikasi dan pengiriman terjadwal', description: 'Belum tersedia.', publicApproved: false },
    ],
    safety: {
      heading: 'Jadwal dan kanal tidak diasumsikan aktif.',
      boundary: 'Ekspor, email, WhatsApp, dan pengiriman terjadwal memerlukan status serta bukti masing-masing.',
      checks: ['Periode dan rumus', 'Status ekspor', 'Status kanal pengiriman'],
    },
    roles: [
      { title: 'Pemilik Usaha', text: 'Membaca perubahan dan menentukan tindakan.', href: '/untuk/pemilik-usaha' },
      { title: 'Supervisor', text: 'Menyiapkan laporan dengan definisi yang disepakati.', href: '/untuk/supervisor' },
    ],
    industries: [
      { title: 'Retail', text: 'Ringkas penjualan, stok kritis, dan koreksi.', href: '/industri/retail' },
      { title: 'F&B', text: 'Bawa perubahan menu, bahan, dan biaya.', href: '/industri/fnb' },
      { title: 'Distributor', text: 'Hubungkan produk, pesanan ulang, dan pembayaran.', href: '/industri/distributor' },
    ],
    relatedProductSlugs: ['dashboard-bisnis', 'asisten-ai', 'keuangan'],
    solution: { title: 'Laporan bisnis otomatis', text: 'Rapikan aturan laporan sebelum menjadwalkannya.', href: '/solusi/laporan-bisnis-otomatis' },
    resource: { title: 'Template laporan', text: 'Gunakan struktur yang sama saat membahas perubahan.', href: '/template' },
    help: { title: 'Panduan laporan', text: 'Pelajari cara menetapkan periode dan rumus.', href: '/panduan' },
    faq: [
      { question: 'Kapan laporan dianggap siap dibahas?', answer: 'Saat periode, rumus, sumber, perubahan utama, dan pemilik tindak lanjut sudah jelas.' },
      { question: 'Apakah laporan dikirim otomatis?', answer: 'Belum dinyatakan. Setiap kanal dan jadwal pengiriman memerlukan status terpisah.' },
      { question: 'Bagaimana jika angka berbeda antar laporan?', answer: 'Periksa batas periode, definisi metrik, dan waktu pembaruan sebelum memilih angka acuan.' },
    ],
    closing: 'Bawa laporan yang siap dibahas.',
  },
  integrasi: {
    layout: 'flow',
    audience: 'Pemilik dan admin yang perlu memilih jalur data sesuai kesiapan sumber.',
    heroLead: 'Masukkan data melalui metode yang statusnya jelas, mulai dari file yang dapat diperiksa.',
    outcome: 'Tahu jalur data yang aktif, terbatas, atau belum tersedia.',
    question: 'Dari mana data dapat masuk?',
    problems: ['Data berada di aplikasi berbeda.', 'Format impor belum konsisten.', 'Logo konektor sering dianggap sebagai bukti ketersediaan.'],
    example: {
      label: 'Contoh jalur impor',
      heading: 'Data masuk, diperiksa, lalu dipakai.',
      rows: [['Jalur', 'CSV atau metode yang disetujui'], ['Pemeriksaan', 'Format, baris gagal, dan waktu masuk'], ['Tindakan', 'Perbaiki baris bermasalah sebelum mencoba ulang']],
      takeaway: 'Status koneksi harus menyebut metode dan batasnya. Logo saja bukan bukti integrasi.',
    },
    benefits: [
      { title: 'Metode tidak disamarkan', meaning: 'Direct, aggregator, impor, dan bantuan manual dibedakan.', decision: 'Memilih jalur sesuai kebutuhan dan kesiapan.' },
      { title: 'Kesalahan dapat diperbaiki', meaning: 'Baris gagal muncul bersama alasannya.', decision: 'Tidak mengulang impor secara membabi buta.' },
      { title: 'Freshness terlihat', meaning: 'Waktu data terakhir diterima ikut tampil.', decision: 'Tahu apakah ringkasan memakai data terbaru.' },
    ],
    workflow: [
      { label: 'Siapkan format', text: 'Samakan kolom dan nilai yang dibutuhkan.' },
      { label: 'Pilih metode', text: 'Gunakan jalur yang sudah aktif untuk akun.' },
      { label: 'Periksa hasil', text: 'Baca baris gagal dan waktu pembaruan.' },
      { label: 'Pakai data', text: 'Lanjut setelah hasil impor masuk akal.' },
    ],
    capabilities: [
      { capabilityId: 'INT-IMPORT-001', label: 'File import', description: 'Gunakan CSV sebagai titik awal yang dapat diperiksa.', publicApproved: false },
      { capabilityId: 'INT-DIRECT-001', label: 'Koneksi langsung', description: 'Belum tersedia.', publicApproved: false },
      { capabilityId: 'INT-AGGREGATOR-001', label: 'Aggregator tersertifikasi', description: 'Belum tersedia.', publicApproved: false },
      { capabilityId: 'INT-MANUAL-001', label: 'Bantuan manual', description: 'Metode terpisah dari koneksi otomatis dan perlu batas layanan.', publicApproved: false },
      { capabilityId: 'INT-DISABLED-001', label: 'Tidak tersedia', description: 'Jalur yang belum siap tetap disembunyikan atau diberi status tidak tersedia.', publicApproved: false },
    ],
    safety: {
      heading: 'Tidak ada koneksi pura-pura.',
      boundary: 'Jenis koneksi, frekuensi pembaruan, dan dukungan akan dijelaskan untuk setiap layanan yang tersedia.',
      checks: ['Metode integrasi', 'Status layanan dan metode koneksi', 'Baris gagal serta waktu pembaruan'],
    },
    roles: [
      { title: 'Pemilik Usaha', text: 'Menentukan sumber data dan tingkat aksesnya.', href: '/untuk/pemilik-usaha' },
      { title: 'Admin Toko', text: 'Menyiapkan format dan memeriksa baris gagal.', href: '/untuk/admin-toko' },
    ],
    industries: [
      { title: 'Retail', text: 'Mulai dari katalog dan transaksi yang dapat diekspor.', href: '/industri/retail' },
      { title: 'Distributor', text: 'Periksa format produk, pelanggan, dan pembayaran.', href: '/industri/distributor' },
      { title: 'Reseller Online', text: 'Bawa catatan kanal melalui metode yang tersedia.', href: '/industri/reseller-online' },
    ],
    relatedProductSlugs: ['katalog-produk', 'dashboard-bisnis', 'laporan-insight'],
    solution: { title: 'Laporan bisnis otomatis', text: 'Siapkan sumber data sebelum menyusun ringkasan.', href: '/solusi/laporan-bisnis-otomatis' },
    resource: { title: 'Panduan menyiapkan data', text: 'Pelajari cara merapikan sumber dan format.', href: '/panduan' },
    help: { title: 'Bantuan impor', text: 'Lihat jalur bantuan saat data gagal masuk.', href: '/bantuan' },
    faq: [
      { question: 'Metode data apa yang tersedia?', answer: 'CSV menjadi jalur awal dalam konsep ini. Metode lain hanya tampil setelah diuji dan aktif untuk akun terkait.' },
      { question: 'Apa yang terjadi jika sebagian baris gagal?', answer: 'Impor perlu menunjukkan baris bermasalah dan alasannya agar dapat diperbaiki sebelum mencoba lagi.' },
      { question: 'Apakah semua koneksi berjalan langsung?', answer: 'Tidak. Koneksi langsung, aggregator, impor, bantuan manual, dan jalur tidak tersedia harus dibedakan.' },
    ],
    closing: 'Mulai dari satu sumber data yang paling siap.',
  },
};
