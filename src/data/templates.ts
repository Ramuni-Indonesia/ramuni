export type TemplateKey = 'stok-harian' | 'arus-kas-sederhana' | 'evaluasi-mingguan';

export interface TemplateColumn {
  key: string;
  label: string;
  description: string;
  align?: 'text' | 'number' | 'status';
}

export interface TemplateInstruction {
  title: string;
  text: string;
}

export interface BusinessTemplate {
  slug: TemplateKey;
  eyebrow: string;
  title: string;
  shortTitle: string;
  summary: string;
  outcome: string;
  cadence: string;
  version: string;
  updatedAt: string;
  downloadName: string;
  columns: TemplateColumn[];
  exampleRows: Record<string, string>[];
  instructions: TemplateInstruction[];
  limitations: string[];
}

export const businessTemplates: Record<TemplateKey, BusinessTemplate> = {
  'stok-harian': {
    slug: 'stok-harian',
    eyebrow: 'Operasional stok',
    title: 'Template Stok Harian',
    shortTitle: 'Stok harian',
    summary: 'Catat barang masuk dan keluar tanpa kehilangan alasan di balik perubahannya.',
    outcome: 'Saldo akhir yang bisa diperiksa kembali sebelum restock.',
    cadence: 'Isi setiap hari operasional',
    version: '1.0',
    updatedAt: '26 Juli 2026',
    downloadName: 'ramuni-template-stok-harian-v1.csv',
    columns: [
      { key: 'tanggal', label: 'Tanggal', description: 'Tanggal pencatatan.', align: 'text' },
      { key: 'sku', label: 'SKU', description: 'Kode barang yang konsisten.', align: 'text' },
      { key: 'nama_barang', label: 'Nama barang', description: 'Nama yang mudah dikenali tim.', align: 'text' },
      { key: 'saldo_awal', label: 'Saldo awal', description: 'Jumlah sebelum transaksi hari itu.', align: 'number' },
      { key: 'barang_masuk', label: 'Masuk', description: 'Barang diterima hari itu.', align: 'number' },
      { key: 'barang_keluar', label: 'Keluar', description: 'Barang terjual, dipakai, atau rusak.', align: 'number' },
      { key: 'saldo_akhir', label: 'Saldo akhir', description: 'Saldo awal ditambah masuk, dikurangi keluar.', align: 'number' },
      { key: 'catatan', label: 'Catatan', description: 'Alasan selisih atau kejadian penting.', align: 'text' },
      { key: 'diperiksa_oleh', label: 'Diperiksa oleh', description: 'Nama orang yang melakukan pengecekan.', align: 'text' },
    ],
    exampleRows: [
      { tanggal: '2026-07-21', sku: 'CONTOH-001', nama_barang: 'Kopi bubuk 250 g', saldo_awal: '24', barang_masuk: '12', barang_keluar: '7', saldo_akhir: '29', catatan: 'Penerimaan pemasok pagi', diperiksa_oleh: 'Rani' },
      { tanggal: '2026-07-22', sku: 'CONTOH-001', nama_barang: 'Kopi bubuk 250 g', saldo_awal: '29', barang_masuk: '0', barang_keluar: '9', saldo_akhir: '20', catatan: 'Satu barang rusak dicatat sebagai keluar', diperiksa_oleh: 'Rani' },
      { tanggal: '2026-07-22', sku: 'CONTOH-002', nama_barang: 'Teh melati 100 g', saldo_awal: '18', barang_masuk: '0', barang_keluar: '5', saldo_akhir: '13', catatan: 'Tidak ada selisih saat pemeriksaan', diperiksa_oleh: 'Dimas' },
    ],
    instructions: [
      { title: 'Mulai dari stok fisik', text: 'Samakan saldo awal dengan hitungan fisik sebelum mencatat transaksi baru.' },
      { title: 'Pisahkan setiap barang', text: 'Gunakan satu baris untuk satu SKU pada satu tanggal agar perubahan tidak tercampur.' },
      { title: 'Tulis alasan selisih', text: 'Catat barang rusak, sampel, atau koreksi supaya saldo akhir tidak menjadi angka tanpa konteks.' },
      { title: 'Periksa sebelum tutup hari', text: 'Bandingkan saldo akhir dengan stok fisik dan isi nama pemeriksa.' },
    ],
    limitations: [
      'CSV tidak menghitung saldo secara otomatis; periksa kembali rumus saldo awal + masuk - keluar.',
      'Template ini belum menggantikan pencatatan batch, tanggal kedaluwarsa, atau valuasi persediaan.',
      'Contoh berisi data sintetis. Hapus baris contoh sebelum memasukkan catatan usaha.',
    ],
  },
  'arus-kas-sederhana': {
    slug: 'arus-kas-sederhana',
    eyebrow: 'Keuangan harian',
    title: 'Template Arus Kas Sederhana',
    shortTitle: 'Arus kas sederhana',
    summary: 'Satukan uang masuk, uang keluar, dan penjelasan singkat dalam satu urutan waktu.',
    outcome: 'Perubahan kas yang lebih mudah ditelusuri saat saldo berbeda.',
    cadence: 'Isi saat transaksi terjadi',
    version: '1.0',
    updatedAt: '26 Juli 2026',
    downloadName: 'ramuni-template-arus-kas-sederhana-v1.csv',
    columns: [
      { key: 'tanggal', label: 'Tanggal', description: 'Tanggal uang diterima atau dibayar.', align: 'text' },
      { key: 'kategori', label: 'Kategori', description: 'Kelompok transaksi yang dipakai konsisten.', align: 'status' },
      { key: 'keterangan', label: 'Keterangan', description: 'Penjelasan transaksi.', align: 'text' },
      { key: 'uang_masuk', label: 'Uang masuk', description: 'Nominal kas yang diterima.', align: 'number' },
      { key: 'uang_keluar', label: 'Uang keluar', description: 'Nominal kas yang dibayar.', align: 'number' },
      { key: 'saldo_berjalan', label: 'Saldo berjalan', description: 'Saldo setelah transaksi dicatat.', align: 'number' },
      { key: 'bukti_catatan', label: 'Bukti / catatan', description: 'Nama berkas atau referensi bukti.', align: 'text' },
    ],
    exampleRows: [
      { tanggal: '2026-07-21', kategori: 'Penjualan', keterangan: 'Penjualan tunai harian', uang_masuk: '1250000', uang_keluar: '0', saldo_berjalan: '4250000', bukti_catatan: 'Rekap kasir 21/07' },
      { tanggal: '2026-07-21', kategori: 'Bahan baku', keterangan: 'Pembelian bahan kemasan', uang_masuk: '0', uang_keluar: '325000', saldo_berjalan: '3925000', bukti_catatan: 'Nota contoh A-014' },
      { tanggal: '2026-07-22', kategori: 'Operasional', keterangan: 'Biaya pengiriman', uang_masuk: '0', uang_keluar: '85000', saldo_berjalan: '3840000', bukti_catatan: 'Rekap kurir 22/07' },
    ],
    instructions: [
      { title: 'Tentukan saldo pembuka', text: 'Gunakan saldo kas yang benar-benar tersedia, bukan total penjualan atau piutang.' },
      { title: 'Catat satu transaksi per baris', text: 'Jangan gabungkan transaksi yang kategorinya berbeda hanya karena terjadi pada hari yang sama.' },
      { title: 'Pakai kategori yang tetap', text: 'Gunakan nama kategori yang sama dari minggu ke minggu agar pola pengeluaran lebih mudah dibaca.' },
      { title: 'Cocokkan dengan bukti', text: 'Periksa saldo berjalan terhadap kas, rekening, nota, dan rekap pembayaran yang relevan.' },
    ],
    limitations: [
      'Template ini adalah catatan arus kas sederhana, bukan laporan laba rugi atau pengganti pembukuan akuntansi.',
      'CSV tidak memisahkan kas dan rekening bank secara otomatis. Buat file terpisah bila sumber dana perlu dibedakan.',
      'Contoh nominal sepenuhnya sintetis dan bukan tolok ukur kinerja usaha.',
    ],
  },
  'evaluasi-mingguan': {
    slug: 'evaluasi-mingguan',
    eyebrow: 'Ritme keputusan',
    title: 'Template Evaluasi Mingguan',
    shortTitle: 'Evaluasi mingguan',
    summary: 'Ubah temuan mingguan menjadi keputusan, pemilik tugas, dan tanggal pemeriksaan berikutnya.',
    outcome: 'Rapat singkat yang berakhir dengan tindak lanjut yang jelas.',
    cadence: 'Isi sebelum dan sesudah evaluasi',
    version: '1.0',
    updatedAt: '26 Juli 2026',
    downloadName: 'ramuni-template-evaluasi-mingguan-v1.csv',
    columns: [
      { key: 'minggu', label: 'Minggu', description: 'Periode yang sedang dievaluasi.', align: 'text' },
      { key: 'fokus', label: 'Fokus', description: 'Area usaha yang diperiksa.', align: 'status' },
      { key: 'temuan', label: 'Temuan', description: 'Hal yang berubah atau perlu diperhatikan.', align: 'text' },
      { key: 'bukti', label: 'Bukti', description: 'Catatan yang mendukung temuan.', align: 'text' },
      { key: 'keputusan', label: 'Keputusan', description: 'Tindakan yang disepakati.', align: 'text' },
      { key: 'penanggung_jawab', label: 'Penanggung jawab', description: 'Satu orang yang memastikan tindak lanjut.', align: 'text' },
      { key: 'target_tanggal', label: 'Target', description: 'Tanggal untuk memeriksa hasil.', align: 'text' },
      { key: 'status', label: 'Status', description: 'Belum mulai, berjalan, atau selesai.', align: 'status' },
    ],
    exampleRows: [
      { minggu: '2026-W30', fokus: 'Stok', temuan: 'Kemasan 250 g turun lebih cepat', bukti: 'Catatan stok 21-24 Juli', keputusan: 'Periksa pemakaian dan jadwal pemasok', penanggung_jawab: 'Rani', target_tanggal: '2026-07-28', status: 'Berjalan' },
      { minggu: '2026-W30', fokus: 'Kas', temuan: 'Biaya kirim naik selama tiga hari', bukti: 'Catatan arus kas 21-23 Juli', keputusan: 'Bandingkan rute dan biaya per pesanan', penanggung_jawab: 'Dimas', target_tanggal: '2026-07-29', status: 'Belum mulai' },
      { minggu: '2026-W30', fokus: 'Pelanggan', temuan: 'Pertanyaan produk berulang', bukti: 'Ringkasan percakapan tanpa data pribadi', keputusan: 'Perbarui jawaban singkat produk', penanggung_jawab: 'Sari', target_tanggal: '2026-07-30', status: 'Selesai' },
    ],
    instructions: [
      { title: 'Pilih maksimal tiga fokus', text: 'Bawa hanya perubahan yang membutuhkan pemeriksaan atau keputusan minggu ini.' },
      { title: 'Pasangkan temuan dengan bukti', text: 'Tautkan temuan ke catatan stok, kas, penjualan, atau umpan balik yang relevan.' },
      { title: 'Tulis satu keputusan', text: 'Gunakan kalimat tindakan yang cukup spesifik untuk dikerjakan dan diperiksa.' },
      { title: 'Tentukan pemilik dan target', text: 'Pilih satu penanggung jawab serta tanggal pemeriksaan, lalu perbarui status pada pertemuan berikutnya.' },
    ],
    limitations: [
      'Template membantu merapikan diskusi, tetapi tidak menentukan prioritas atau keputusan untuk pengguna.',
      'Jangan salin data pribadi pelanggan atau informasi sensitif ke kolom bukti.',
      'Contoh disusun untuk menunjukkan format dan tidak menggambarkan usaha atau hasil pelanggan nyata.',
    ],
  },
};

export const templateEntries = Object.entries(businessTemplates) as [TemplateKey, BusinessTemplate][];
