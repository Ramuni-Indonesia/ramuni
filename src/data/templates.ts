export type TemplateKey = 'stok-harian' | 'arus-kas-sederhana' | 'evaluasi-mingguan' | 'penjualan-harian' | 'hpp-produk' | 'stok-opname';

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
  updatedAtIso: string;
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
    updatedAtIso: '2026-07-26',
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
      'Hapus baris contoh sebelum memasukkan catatan usaha.',
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
    updatedAtIso: '2026-07-26',
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
      'Nominal hanya menunjukkan format dan bukan tolok ukur kinerja usaha.',
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
    updatedAtIso: '2026-07-26',
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
  'penjualan-harian': {
    slug: 'penjualan-harian',
    eyebrow: 'Penjualan harian',
    title: 'Template Rekap Penjualan Harian',
    shortTitle: 'Penjualan harian',
    summary: 'Pisahkan penjualan kotor, diskon, retur, dan penjualan bersih per hari atau kanal.',
    outcome: 'Perubahan omzet yang dapat dibandingkan tanpa kehilangan konteks transaksi.',
    cadence: 'Isi setelah tutup transaksi harian',
    version: '1.0',
    updatedAt: '29 Juli 2026',
    updatedAtIso: '2026-07-29',
    downloadName: 'ramuni-template-penjualan-harian-v1.csv',
    columns: [
      { key: 'tanggal', label: 'Tanggal', description: 'Tanggal operasional yang direkap.', align: 'text' },
      { key: 'kanal', label: 'Kanal', description: 'Toko, marketplace, pesan langsung, atau kanal lain.', align: 'status' },
      { key: 'jumlah_transaksi', label: 'Jumlah transaksi', description: 'Transaksi valid setelah pembatalan dipisahkan.', align: 'number' },
      { key: 'penjualan_kotor', label: 'Penjualan kotor', description: 'Nilai sebelum diskon dan retur.', align: 'number' },
      { key: 'diskon', label: 'Diskon', description: 'Potongan harga yang ditanggung usaha.', align: 'number' },
      { key: 'retur', label: 'Retur', description: 'Nilai transaksi yang dikembalikan pada periode tersebut.', align: 'number' },
      { key: 'penjualan_bersih', label: 'Penjualan bersih', description: 'Penjualan kotor dikurangi diskon dan retur.', align: 'number' },
      { key: 'catatan', label: 'Catatan', description: 'Promosi, stok kosong, jam tutup, atau kejadian penting.', align: 'text' },
    ],
    exampleRows: [
      { tanggal: '2026-07-27', kanal: 'Toko', jumlah_transaksi: '86', penjualan_kotor: '4250000', diskon: '175000', retur: '0', penjualan_bersih: '4075000', catatan: 'Promo bundel sore' },
      { tanggal: '2026-07-27', kanal: 'Marketplace', jumlah_transaksi: '31', penjualan_kotor: '2150000', diskon: '90000', retur: '125000', penjualan_bersih: '1935000', catatan: 'Satu pesanan diretur' },
      { tanggal: '2026-07-28', kanal: 'Toko', jumlah_transaksi: '74', penjualan_kotor: '3875000', diskon: '120000', retur: '0', penjualan_bersih: '3755000', catatan: 'Jam operasional lebih pendek' },
    ],
    instructions: [
      { title: 'Pisahkan setiap kanal', text: 'Gunakan satu baris per tanggal dan kanal agar perubahan tidak tertutup oleh total gabungan.' },
      { title: 'Gunakan transaksi valid', text: 'Pisahkan pembatalan, retur, dan transaksi uji dari jumlah transaksi selesai.' },
      { title: 'Hitung penjualan bersih', text: 'Kurangi diskon dan retur dari penjualan kotor dengan aturan yang sama setiap hari.' },
      { title: 'Catat konteks penting', text: 'Tulis promosi, stok kosong, hari libur, atau perubahan jam operasional sebelum membandingkan.' },
    ],
    limitations: [
      'Template ini merangkum penjualan, bukan laba. HPP dan biaya usaha belum dikurangkan.',
      'Pajak, fee kanal, dan biaya layanan perlu dipisahkan sesuai kebutuhan pencatatan usaha.',
      'Hapus seluruh baris contoh sebelum memasukkan data usaha.',
    ],
  },
  'hpp-produk': {
    slug: 'hpp-produk',
    eyebrow: 'Harga dan biaya',
    title: 'Template HPP Produk Sederhana',
    shortTitle: 'HPP produk',
    summary: 'Susun komponen bahan, kemasan, dan biaya variabel langsung untuk memperkirakan HPP per unit.',
    outcome: 'Dasar biaya produk yang lebih mudah diperiksa sebelum menentukan harga jual.',
    cadence: 'Perbarui saat harga atau komposisi berubah',
    version: '1.0',
    updatedAt: '29 Juli 2026',
    updatedAtIso: '2026-07-29',
    downloadName: 'ramuni-template-hpp-produk-v1.csv',
    columns: [
      { key: 'produk_sku', label: 'Produk / SKU', description: 'Nama atau kode produk yang dihitung.', align: 'text' },
      { key: 'komponen', label: 'Komponen', description: 'Bahan, kemasan, atau biaya variabel langsung.', align: 'text' },
      { key: 'kuantitas', label: 'Kuantitas', description: 'Jumlah komponen yang dipakai untuk satu batch.', align: 'number' },
      { key: 'satuan', label: 'Satuan', description: 'Gram, ml, unit, meter, atau satuan lain.', align: 'status' },
      { key: 'harga_satuan', label: 'Harga satuan', description: 'Biaya per satuan pada dasar yang dipakai.', align: 'number' },
      { key: 'subtotal', label: 'Subtotal', description: 'Kuantitas dikali harga satuan.', align: 'number' },
      { key: 'hasil_unit', label: 'Hasil unit', description: 'Jumlah produk layak jual dari satu batch.', align: 'number' },
      { key: 'hpp_per_unit', label: 'HPP per unit', description: 'Total subtotal dibagi hasil unit.', align: 'number' },
      { key: 'catatan', label: 'Catatan', description: 'Susut, waste, perubahan pemasok, atau asumsi.', align: 'text' },
    ],
    exampleRows: [
      { produk_sku: 'CONTOH-MINUMAN-01', komponen: 'Bahan utama', kuantitas: '1000', satuan: 'ml', harga_satuan: '18', subtotal: '18000', hasil_unit: '10', hpp_per_unit: '3400', catatan: 'Contoh format, bukan standar biaya' },
      { produk_sku: 'CONTOH-MINUMAN-01', komponen: 'Kemasan', kuantitas: '10', satuan: 'unit', harga_satuan: '950', subtotal: '9500', hasil_unit: '10', hpp_per_unit: '3400', catatan: 'Periksa harga pemasok terbaru' },
      { produk_sku: 'CONTOH-MINUMAN-01', komponen: 'Bahan pelengkap', kuantitas: '10', satuan: 'unit', harga_satuan: '650', subtotal: '6500', hasil_unit: '10', hpp_per_unit: '3400', catatan: 'Total contoh Rp34.000 per 10 unit' },
    ],
    instructions: [
      { title: 'Tentukan satu batch', text: 'Gunakan satu dasar produksi atau pembelian yang jelas agar seluruh komponen berada pada skala sama.' },
      { title: 'Samakan satuan', text: 'Ubah harga dan pemakaian ke gram, ml, atau unit yang sama sebelum mengalikan.' },
      { title: 'Masukkan waste yang relevan', text: 'Catat susut dan hasil produk layak jual agar biaya tidak dibagi dengan jumlah yang terlalu besar.' },
      { title: 'Perbarui saat biaya berubah', text: 'Tinjau ulang ketika harga pemasok, ukuran kemasan, resep, atau hasil batch berubah.' },
    ],
    limitations: [
      'Template ini memberi HPP sederhana dan belum otomatis mencakup tenaga kerja, overhead, pajak, atau metode akuntansi tertentu.',
      'Hindari menghitung biaya ganda ketika komponen sudah masuk dalam subtotal lain.',
      'Gunakan tenaga profesional bila perhitungan diperlukan untuk laporan akuntansi atau perpajakan.',
    ],
  },
  'stok-opname': {
    slug: 'stok-opname',
    eyebrow: 'Pemeriksaan stok',
    title: 'Template Stok Opname Sederhana',
    shortTitle: 'Stok opname',
    summary: 'Bandingkan stok catatan dan stok fisik, lalu simpan alasan selisihnya per SKU.',
    outcome: 'Daftar selisih stok yang jelas untuk diperiksa sebelum koreksi atau restock.',
    cadence: 'Gunakan saat pemeriksaan fisik berkala',
    version: '1.0',
    updatedAt: '29 Juli 2026',
    updatedAtIso: '2026-07-29',
    downloadName: 'ramuni-template-stok-opname-v1.csv',
    columns: [
      { key: 'tanggal', label: 'Tanggal', description: 'Tanggal pemeriksaan fisik.', align: 'text' },
      { key: 'sku', label: 'SKU', description: 'Kode unik barang yang diperiksa.', align: 'text' },
      { key: 'nama_barang', label: 'Nama barang', description: 'Nama barang yang mudah dikenali tim.', align: 'text' },
      { key: 'stok_catatan', label: 'Stok catatan', description: 'Saldo menurut catatan sebelum koreksi.', align: 'number' },
      { key: 'stok_fisik', label: 'Stok fisik', description: 'Jumlah yang benar-benar dihitung.', align: 'number' },
      { key: 'selisih', label: 'Selisih', description: 'Stok fisik dikurangi stok catatan.', align: 'number' },
      { key: 'nilai_satuan', label: 'Nilai satuan', description: 'Dasar nilai per unit bila ingin mengukur dampak selisih.', align: 'number' },
      { key: 'alasan', label: 'Alasan', description: 'Rusak, retur, salah catat, belum diketahui, atau alasan lain.', align: 'status' },
      { key: 'diperiksa_oleh', label: 'Diperiksa oleh', description: 'Nama pemeriksa atau penanggung jawab.', align: 'text' },
    ],
    exampleRows: [
      { tanggal: '2026-07-29', sku: 'CONTOH-001', nama_barang: 'Kopi bubuk 250 g', stok_catatan: '24', stok_fisik: '22', selisih: '-2', nilai_satuan: '42000', alasan: 'Satu rusak, satu belum diketahui', diperiksa_oleh: 'Rani' },
      { tanggal: '2026-07-29', sku: 'CONTOH-002', nama_barang: 'Teh melati 100 g', stok_catatan: '18', stok_fisik: '18', selisih: '0', nilai_satuan: '26000', alasan: 'Sesuai', diperiksa_oleh: 'Dimas' },
      { tanggal: '2026-07-29', sku: 'CONTOH-003', nama_barang: 'Gula aren 500 ml', stok_catatan: '11', stok_fisik: '12', selisih: '1', nilai_satuan: '35000', alasan: 'Penerimaan belum dicatat', diperiksa_oleh: 'Rani' },
    ],
    instructions: [
      { title: 'Bekukan perubahan sementara', text: 'Hindari barang masuk atau keluar saat penghitungan agar angka fisik tidak berubah di tengah proses.' },
      { title: 'Hitung per SKU', text: 'Gunakan satu baris untuk satu barang dan ulangi hitungan bila selisih terlihat tidak wajar.' },
      { title: 'Tulis alasan sebelum koreksi', text: 'Pisahkan kerusakan, retur, penerimaan yang belum dicatat, dan selisih yang masih perlu dicari.' },
      { title: 'Simpan jejak pemeriksaan', text: 'Isi nama pemeriksa dan tanggal agar koreksi berikutnya dapat ditelusuri.' },
    ],
    limitations: [
      'Template ini membantu pemeriksaan sederhana dan tidak menggantikan prosedur audit persediaan.',
      'Nilai satuan bersifat opsional; gunakan dasar nilai yang konsisten bila diisi.',
      'Hapus seluruh baris contoh sebelum memasukkan data usaha.',
    ],
  },
};

export const templateEntries = Object.entries(businessTemplates) as [TemplateKey, BusinessTemplate][];
