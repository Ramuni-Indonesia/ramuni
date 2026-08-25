# Katalog kartu visual RAMUNI

Semua kartu dirender oleh `MarketingFeatureCardGrid.astro`. Nilai di bawah adalah konteks visual dan copy marketing, bukan klaim data pelanggan.

## AI & Insight / feature detail

| Kartu | Route | Konteks preview | Signal |
| --- | --- | --- | --- |
| AI Copilot | `/features/ai-copilot/` | Asisten AI, sumber jawaban | 3 sumber terlihat |
| Profit Intelligence | `/features/profit-intelligence/` | Keuangan, margin dan kas | 35% margin contoh |
| Omnichannel | `/features/omnichannel/` | Pelanggan, izin follow-up | 9 izin perlu dicek |
| Web Builder | `/features/web-builder/` | Ringkasan ruang usaha | 1 ruang profil |
| Knowledge OS | `/features/knowledge-os/` | Laporan dan sumber tim | 4 sumber siap ditelusuri |

## Produk

| Kartu | Route | Konteks preview |
| --- | --- | --- |
| Asisten AI | `/produk/asisten-ai/` | `ai` |
| Dashboard Bisnis | `/produk/dashboard-bisnis/` | `overview` |
| Laporan & Insight | `/produk/laporan-insight/` | `report` |
| Penjualan | `/produk/penjualan/` | `sales` |
| Inventori | `/produk/inventori/` | `stock` |
| Keuangan | `/produk/keuangan/` | `finance` |
| Pelanggan | `/produk/pelanggan/` | `customer` |
| Katalog Produk | `/produk/katalog-produk/` | `catalog` |
| Integrasi Data | `/produk/integrasi/` | `integration` |

## Solusi

| Kartu | Route | Konteks preview |
| --- | --- | --- |
| Naikkan Omzet | `/solusi/naikkan-omzet/` | `sales` |
| Kelola Stok | `/solusi/kelola-stok/` | `stock` |
| Pantau Laba & Arus Kas | `/solusi/pantau-laba-dan-arus-kas/` | `finance` |
| Pahami Pelanggan | `/solusi/pahami-pelanggan/` | `customer` |
| Laporan Bisnis | `/solusi/laporan-bisnis-otomatis/` | `report` |

## Motion dan responsif

- Kartu masuk dari bawah dengan stagger pendek ketika mendekati viewport.
- Hover hanya mengubah transform, border, dan shadow; tidak menggeser layout.
- `prefers-reduced-motion` mematikan entry/hover motion.
- Desktop memakai bento 12 kolom, tablet turun ke 6 kolom, mobile satu kolom.
- Dashboard preview mengecil lewat mode `compact`, tetapi tetap mempertahankan topbar, metrik, chart, dan disclosure.

