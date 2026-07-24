# RAMUNI Software Requirements Specification

## 1. Tujuan dan batas sistem

SRS ini mendefinisikan RAMUNI sebagai SaaS multi-tenant untuk pencatatan bisnis, analitik, dan AI advisory. Aktor: owner, manager, admin, cashier, content editor, platform operator, dan visitor. Sistem terdiri dari public marketing site, authenticated business app, API, workers, AI gateway, public content CMS, dan operation console internal.

## 2. Functional requirements

### Identity, tenant, dan onboarding

- `FR-IAM-001` User dapat signup, verifikasi email, login, logout, dan reset password.
- `FR-IAM-002` Owner dapat membuat bisnis dan mengatur locale, IDR, zona waktu, serta profil.
- `FR-IAM-003` User dapat menjadi anggota beberapa bisnis dan berpindah workspace tanpa data tercampur.
- `FR-IAM-004` Owner dapat mengundang, menonaktifkan, dan memberi role owner/manager/admin/cashier.
- `FR-IAM-005` Permission ditegakkan di server/API untuk setiap request dan background job.
- `FR-IAM-006` User dapat melihat dan mencabut sesi aktif; tindakan sensitif mendukung step-up auth.
- `FR-IAM-007` Onboarding memandu bisnis → produk/import → transaksi → insight pertama.

### Catalog dan inventory

- `FR-INV-001` User berizin dapat mengelola kategori, unit, produk, varian/SKU, harga jual, HPP, status, dan minimum stock.
- `FR-INV-002` SKU unik per bisnis; master yang sudah direferensikan diarsipkan, tidak hard-delete.
- `FR-INV-003` Semua perubahan stok menghasilkan inventory movement immutable dengan actor, alasan, waktu, referensi, dan reversal.
- `FR-INV-004` Sale completed mengurangi stok secara atomik dan concurrency-safe.
- `FR-INV-005` Void/refund mengembalikan stok melalui reversal, bukan mengubah history.
- `FR-INV-006` User dapat melihat balance, movement history, dan low-stock alert.
- `FR-INV-007` Kebijakan stok negatif dikonfigurasi; default ditolak.

### Sales

- `FR-SAL-001` Kasir dapat membuat draft sale dengan satu atau lebih item.
- `FR-SAL-002` Server menghitung subtotal, diskon, pajak opsional, total, dan cost snapshot.
- `FR-SAL-003` Sale mempunyai nomor unik per bisnis/outlet dan status `draft`, `completed`, `voided`, `partially_refunded`, atau `refunded`.
- `FR-SAL-004` Completion mengubah sale, payment, inventory, customer history, finance journal, dan outbox secara atomik.
- `FR-SAL-005` User dapat mencari/filter/paginate history dan melihat receipt/detail.
- `FR-SAL-006` Semua write menerima idempotency key untuk mencegah transaksi ganda.

### Finance

- `FR-FIN-001` User berizin dapat mencatat kategori dan pengeluaran beserta receipt.
- `FR-FIN-002` Sistem menghitung revenue, gross profit, operating expense, dan net operating profit sesuai metric dictionary.
- `FR-FIN-003` Semua angka laporan dapat ditelusuri ke transaksi/jurnal sumber.
- `FR-FIN-004` Koreksi memakai reversal/adjustment dan audit; closed period tidak dapat diedit tanpa reopen berizin.
- `FR-FIN-005` Semua journal entry harus balance.

### CRM

- `FR-CRM-001` User dapat mengelola pelanggan dan menghubungkannya dengan sale.
- `FR-CRM-002` Sistem menghitung total belanja, frekuensi, transaksi terakhir, dan repeat status.
- `FR-CRM-003` Segmentasi v1 berbasis aturan: baru, loyal, bernilai tinggi, berisiko churn.
- `FR-CRM-004` PII pelanggan hanya terlihat oleh role yang diizinkan dan tercakup export/deletion request.

### Dashboard, insights, dan reports

- `FR-DSH-001` Dashboard menampilkan AI/business summary sebelum grafik.
- `FR-DSH-002` Revenue, profit, orders, customers, stock alert, dan comparison mengikuti satu periode aktif.
- `FR-DSH-003` Business Health Score 0-100 memiliki formula versioned dan faktor yang dapat dijelaskan.
- `FR-DSH-004` Insight menyimpan period, evidence, freshness, severity, confidence/limitation, dan CTA.
- `FR-RPT-001` Daily insight dan weekly report dibuat oleh job idempotent yang dapat di-retry.
- `FR-RPT-002` Laporan sales, stock, customer, dan finance dapat difilter dan diekspor.

### AI Companion

- `FR-AI-001` AI hanya mengakses tools/data yang lolos tenant dan user authorization.
- `FR-AI-002` AI menjawab pertanyaan sales, stock, finance, customer, dan business summary dalam Bahasa Indonesia.
- `FR-AI-003` Jawaban numerik harus memuat periode, waktu freshness, dan citation/evidence.
- `FR-AI-004` Jika data tidak cukup/kontradiktif, AI harus abstain dan menjelaskan data yang dibutuhkan.
- `FR-AI-005` Sistem menyimpan conversation/message terpisah per bisnis sesuai retention policy.
- `FR-AI-006` User dapat memberi feedback dan menghapus memory/chat sesuai policy.
- `FR-AI-007` Dokumen dan input dianggap untrusted; prompt injection, tool abuse, dan PII leakage harus ditangani.
- `FR-AI-008` MVP bersifat read-only advisory. Aksi masa depan memakai preview → explicit approval → execution receipt.

### Notification, import, dan audit

- `FR-NOT-001` In-app/email alert menghormati preference dan tidak boleh terkirim ganda.
- `FR-IMP-001` CSV import memiliki mapping, preview, dry-run, error per baris, checksum, dan commit idempotent.
- `FR-AUD-001` Role, sale, stock, finance, export, integration, dan AI action dicatat dengan actor/time/resource; secret/PII berlebih diredaksi.

### Marketing dan content

- `FR-MKT-001` Public site memuat home, product, solution, industry, pricing, demo/contact, security, about, help, dan legal.
- `FR-MKT-002` Lead form tervalidasi, anti-spam, menyimpan attribution serta consent version.
- `FR-CMS-001` Editor dapat draft, preview, review, schedule, publish, revise, rollback, unpublish, dan redirect.
- `FR-CMS-002` Blog mempunyai listing, article, category, tag, author, search, related content, dan pagination.
- `FR-SEO-001` Setiap public page mendukung metadata, canonical, Open Graph, sitemap, robots, breadcrumb, dan schema yang relevan.

## 3. Non-functional requirements

| ID | Target penerimaan MVP |
|---|---|
| `NFR-PERF-001` | CRUD API p95 <=500 ms read dan <=800 ms write pada beban target yang disepakati |
| `NFR-PERF-002` | App/dashboard usable p75 <=3 detik pada mobile 4G wajar |
| `NFR-AI-001` | Status proses <=1 detik; target first token <=5 detik saat provider sehat |
| `NFR-AVL-001` | Beta 99.5%; paid v1 target 99.9% setelah capacity test |
| `NFR-REC-001` | Beta RPO 24 jam/RTO 4 jam; paid v1 ditingkatkan ke RPO 5 menit/RTO 60 menit dengan PITR |
| `NFR-SEC-001` | TLS, encryption at rest, Argon2id/managed OIDC, secure cookies, CSRF, CSP, rate limit, secrets manager |
| `NFR-TEN-001` | Automated cross-tenant read/write/vector/cache/object tests semuanya lulus |
| `NFR-PRV-001` | Consent, purpose, access, correction, export, deletion, retention, and incident workflow tersedia |
| `NFR-AI-002` | Golden set menguji numeric accuracy, grounding, abstention, injection, dan tenant leakage |
| `NFR-OBS-001` | Structured logs, traces, metrics, alert, queue/DLQ, AI usage/cost, dan audit correlation |
| `NFR-ACC-001` | Core flows dan marketing menargetkan WCAG 2.1 AA |
| `NFR-LOC-001` | `id-ID`, IDR, UTC storage, business timezone default Asia/Jakarta |
| `NFR-SEO-001` | CWV target LCP <2.5 s, INP <200 ms, CLS <0.1 pada p75 |
| `NFR-QLT-001` | Tidak ada vulnerability critical/high tanpa mitigasi sebelum production |

## 4. Critical acceptance scenarios

1. Dua bisnis dengan user dan produk serupa tidak dapat membaca, menebak ID, mencari vector, menerima cache, file, atau notification milik satu sama lain.
2. Dua kasir menjual unit terakhir secara bersamaan: hanya transaksi yang memenuhi kebijakan stok yang complete dan ledger tetap konsisten.
3. Request completion yang dikirim ulang dengan idempotency key sama hanya menghasilkan satu sale/payment/movement/journal.
4. Void/refund tidak menghapus history dan menghasilkan reversal yang dapat direkonsiliasi.
5. Angka revenue/profit yang ditanya melalui AI sama dengan dashboard dan report untuk period yang sama.
6. Pertanyaan AI tanpa data cukup tidak menghasilkan angka fiktif.
7. Prompt injection dalam dokumen tidak dapat meminta secret, arbitrary SQL, atau data tenant lain.
8. Import yang sebagian rusak dapat di-preview, tidak melakukan partial commit tak terduga, dan menghasilkan error row report.
9. Artikel draft/noindex tidak muncul di sitemap; perubahan slug published membuat 301 redirect.
10. Backup dapat dipulihkan dan reconciliation sale-stock-journal lulus.

## 5. Assumptions yang wajib dikunci sebelum build

- Wedge pertama dan workflow input utama (POS-like vs import/integration).
- Single outlet atau multi-outlet beta.
- Weighted-average costing, kebijakan stok negatif, tax, refund, dan metric dictionary.
- Paket, quota AI, trial, billing, serta provider pembayaran.
- Provider LLM, data region, no-training/no-retention, chat retention, dan data deletion.
- Support SLA, kapasitas target, legal review UU PDP/PSE, serta incident ownership.

## 6. Full-product SRS expansion

Requirement berikut memperluas SRS dari beta menjadi produk lengkap. Semuanya harus dipetakan ke plan entitlement, role permission, audit event, data model, dan verification plan.

### Organization and governance

- `FR-ORG-001` Multi-outlet, multi-warehouse, channels, legal/tax profile, fiscal calendar, operating hours, dan numbering sequences.
- `FR-ORG-002` Permission granular per outlet, warehouse, module, action, channel, dan sensitivity.
- `FR-ORG-003` Custom roles, approval policy, maker-checker, step-up auth, dan delegated accountant.
- `FR-ORG-004` Enterprise SSO/OIDC/SAML, SCIM, domain claim, enforced MFA, IP allowlist, audit export, legal hold, dan custom retention.

### Catalog, POS, sales

- `FR-CAT-001` Barcode, images, attributes, multi-unit, variants, services, bundles/kits, modifiers, lots/expiry, serials, price lists, outlet/channel/customer pricing, dan scheduled promos.
- `FR-POS-001` Barcode cart, hold/recall, register/shift, cash drawer, receipt, split tender, QRIS/payment gateway, discounts/coupons, price-override approval, tips/service/delivery fees.
- `FR-SAL-018` Quotation, order, invoice, delivery/fulfillment, partial payment/fulfillment, return/exchange/refund, store credit, credit note, AR aging, settlement, dan reconciliation.
- `FR-SAL-019` Offline/PWA sales membutuhkan registered device, encrypted cache, idempotency, conflict handling, remote revoke, dan explicit offline policy.

### Inventory and procurement

- `FR-STK-009` Transfer request/dispatch/receive, reservation, stocktake/cycle count, variance approval, damaged/lost/expired stock, valuation, aging, dead stock, and stockout risk.
- `FR-PUR-001` Supplier, purchase request/approval, PO, partial receipt/backorder, supplier invoice, 2-way/3-way match, purchase return, landed cost, supplier performance, and reorder suggestion.

### Finance, CRM, loyalty

- `FR-ACC-001` Configurable COA, opening balance, AR/AP, bank/cash, payment allocation, statement import/reconciliation, tax snapshot, budget, period close, P&L, balance sheet, cash flow, trial balance, ledger, and accountant export.
- `FR-CRM-012` Lead/prospect/customer lifecycle, notes/tasks/reminders, tags, attribution, dedup/merge, RFM/LTV/churn, pipeline, and timeline.
- `FR-LOY-001` Points ledger, tiers, rewards, vouchers, membership, expiry, redemption, and fraud controls.
- `FR-CMP-001` Audience builder, consent/preferences, templates, schedule/approval, quiet hours, caps, opt-out, delivery/read/click, attribution, and campaign ROI.

### AI, workflow, reporting

- `FR-AI-019` Conversational BI, executive briefing, anomaly, forecast, scenario simulation, restock/margin/promo/customer recommendations, and draft actions.
- `FR-AI-020` AI execution requires risk class, preview/diff, approval/multi-approval, expiry, idempotency, receipt, audit, and compensation.
- `FR-WFL-001` Event-condition-action rules, reminders, approval inbox, scheduled automation, history, retries, skip reason, and kill switch.
- `FR-RPT-010` Report catalog/builder, saved filters, scheduled delivery, drill-down, semantic metrics, freshness SLA, targets/budgets, and anomaly reports.

### Billing, integrations, support

- `FR-BIL-001` Plans/versions, entitlements, add-ons, trial, subscriptions, seats/outlets/storage/AI/API meters, quota, invoices, payments, tax receipts, coupons, dunning, suspension/reactivation, cancellation/refund, and audited overrides.
- `FR-INT-001` Integration directory, OAuth/API keys, encrypted token rotation, scopes, sync health, mappings, external IDs, reconciliation, replay, public API, sandbox, signed webhooks, rate limits, versioning, and deprecation.
- `FR-SUP-001` Help center, tours, support cases, CSAT/NPS, announcements, tenant health, safe support access, job replay, connector diagnostics, data-repair preview, and status page.
- `FR-OPS-001` Separate platform-admin console for tenants, subscriptions, providers, flags, jobs, maintenance, incidents, and audited support actions.

### Full-product non-functional requirements

- `NFR-BIL-001` Entitlements and quotas are enforced server-side across UI, API, workers, integrations, and AI.
- `NFR-INT-001` Connector sync has checkpoints, DLQ, replay, reconciliation, visible health, and safe retry.
- `NFR-MOB-001` Offline flows are encrypted, idempotent, conflict-aware, revocable, and bounded by offline duration.
- `NFR-OPS-002` Paid GA requires PITR, tested restore/failover, SLO/SLI/error budget, incident runbooks, and support SLA.
- `NFR-SEC-006` Vulnerability SLA, SBOM, artifact signing/provenance, access review, impersonation control, webhook replay protection, API abuse controls, and audit export.

### Full-product acceptance scenarios

1. Multi-outlet staff sees only authorized outlet/warehouse data.
2. PO -> receipt -> supplier invoice -> payment reconciles stock, payable and journal.
3. POS shift close records expected/count cash and variance audit.
4. Billing webhook retry never duplicates payment or corrupts entitlement.
5. AI draft action never executes without authorized approval.
6. API key revoke, webhook replay protection and connector token rotation work.
7. Offline reconnect creates exactly one server sale and exposes conflicts.
8. Support access expires and leaves tamper-evident audit.
9. Large exports mask PII, expire, and remain tenant-scoped.
10. Enterprise SSO/SCIM/custom roles cannot bypass RBAC.

### Offline and device requirements

- `FR-OFF-001` Registered PWA devices can operate approved low-risk flows during outage with signed policy and expiry.
- `FR-OFF-002` Offline cash sales use client UUID, device sequence, immutable local outbox and server idempotency receipt.
- `FR-OFF-003` UI always shows connectivity, last sync, data freshness, queued count and restricted actions.
- `FR-OFF-004` Local cache is encrypted/minimized and supports remote revoke, expiry and safe schema migration.
- `FR-OFF-005` Conflict policy is entity-specific; generic last-write-wins is forbidden for transactions, stock, payment and finance.
- `FR-OFF-006` Card, dynamic QRIS, refund, price override above threshold, stock adjustment, role/billing/integration changes and finance close remain online-only unless separately certified.
- `FR-OFF-007` Reconnect performs authenticated batch upload, receipt persistence, delta pull, stock/payment/journal reconciliation and visible conflict queue.
- `FR-OFF-008` Offline sale remains recorded when stock conflicts; system creates controlled exception rather than silently deleting the sale.

### Omnichannel order and delivery requirements

- `FR-OMNI-001` Integrations support direct partner, certified aggregator, file import, manual-assisted and disabled modes with visible availability status.
- `FR-OMNI-002` External orders are deduplicated by integration account and provider order/event identifiers.
- `FR-OMNI-003` Order, fulfillment, payment and settlement use separate canonical state machines while preserving raw provider status.
- `FR-OMNI-004` Catalog/menu mapping covers outlet, SKU, variant, modifier, bundle, channel price, tax, hours and availability.
- `FR-OMNI-005` Incoming order creates stock reservation; reject/expiry releases it and completion posts inventory ledger.
- `FR-OMNI-006` Provider webhook verification, polling catch-up, retry, circuit breaker, rate limit, DLQ and reconciliation are mandatory.
- `FR-OMNI-007` Merchant tracking shows timeline, ETA/freshness, provider evidence, masked identities and exceptions; live GPS appears only when provider supplies it.
- `FR-OMNI-008` Cancellation/refund is a saga across order, stock/waste, payment, courier, fees, settlement and journal.
- `FR-OMNI-009` Provider settlement decomposes gross, discounts, delivery, commission, fees, refunds, tax and net payout, then reconciles to bank and ledger.
- `FR-OMNI-010` When outlet internet is down but cloud is healthy, provider events remain stored; stale heartbeat disables auto-accept unless explicit approved policy says otherwise.
- `FR-OMNI-011` Native provider courier must not trigger a second courier booking.
- `FR-OMNI-012` Integration cannot be marketed as available until sandbox, certification, production pilot, support and reconciliation gates pass.
