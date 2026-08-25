# SaaS E2E screenshot handoff

Folder ini berisi screenshot UI SaaS RAMUNI yang siap dipakai tim marketing sebagai bukti tampilan produk.

## Coverage

- 70 route statis aman dari build manifest.
- 3 viewport: `desktop` (1440×900), `tablet` (1024×768), dan `mobile` (390×844, DPR 2).
- Total **210 PNG full-page**.
- Manifest: [`manifest.json`](./manifest.json).
- Semua 210 hasil berstatus `captured`, HTTP tidak error, dan login/workspace E2E terautentikasi pada ketiga viewport.

## Provenance dan batas penggunaan

Capture dibuat dari build SaaS lokal dengan browser Chromium Playwright terisolasi. Data berasal dari workspace E2E sintetis `Toko Katalog Real`, bukan akun pelanggan atau production. Gunakan sebagai screenshot UI/evidence; jangan menyebut angka yang tampak sebagai hasil pelanggan atau data live.

## Struktur

```text
desktop/*.png   # 70 route
tablet/*.png    # 70 route
mobile/*.png    # 70 route
manifest.json   # route, viewport, status, auth, dan path asset
```

Nama file mengikuti slug route, misalnya `finance-statements--desktop.png` atau `inventory-alerts--mobile.png`. `manifest.json` adalah sumber kebenaran untuk daftar route lengkap dan status setiap file.
