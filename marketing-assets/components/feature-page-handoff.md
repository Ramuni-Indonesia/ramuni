# Handoff halaman Features

`/features/` sekarang menjadi katalog product-led yang memuat tiga lapisan:

1. **Peta fitur**: 5 feature detail dan link ke halaman masing-masing.
2. **Semua produk**: 9 modul RAMUNI dari AI, operasional, sampai integrasi.
3. **Solusi berdasarkan tujuan**: 5 alur masalah yang mengarahkan ke modul terkait.

Setiap `/features/[slug]/` menambahkan:

- screenshot/product rail dari asset yang tersedia;
- alur Input → Proses → Output yang berbeda untuk tiap fitur;
- satu preview komponen kartu yang dapat dipindahkan ke landing page lain;
- highlights, contoh pertanyaan, batas penggunaan, CTA, breadcrumb, canonical, dan JSON-LD yang sudah ada.

Halaman yang tercakup:

- `/features/ai-copilot/`
- `/features/profit-intelligence/`
- `/features/omnichannel/`
- `/features/web-builder/`
- `/features/knowledge-os/`

Jangan menghapus disclosure data simulasi dari kartu ketika dipindahkan ke homepage atau pricing. Untuk screenshot baru, isi `screenshots/manifest.json` harus diperbarui dan sumber akun harus tetap E2E terisolasi.

