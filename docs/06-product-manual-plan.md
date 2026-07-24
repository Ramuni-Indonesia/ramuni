# RAMUNI Product Manual Plan

Manual diterbitkan sebagai help center pengguna dan SOP internal. Setiap artikel memakai bahasa sederhana, screenshot terverifikasi, permission, langkah, dan troubleshooting.

## 1. User manual

- Pengantar: apa itu RAMUNI, istilah omzet/laba/stok/health score, kemampuan dan batasan AI.
- Getting started: signup, verification, login/reset, membuat bisnis, locale/timezone/IDR, undang tim dan role.
- Onboarding checklist: profil → outlet awal → kategori → 5 produk → stok awal → transaksi → dashboard → pertanyaan AI.
- Dashboard: AI Summary, Health Score, revenue/profit/order/customer, filter periode, freshness dan empty state.
- AI Assistant: cara bertanya, membaca evidence/period/confidence, feedback, chat deletion, data yang tidak boleh dimasukkan.
- Product: category, unit, SKU, price, HPP, minimum stock, archive.
- Inventory: stock in/out, adjustment, movement history, alert, stocktake, alasan stok tidak diedit langsung.
- Sales: draft, item, discount/tax, customer, payment, complete, receipt, history, void/refund.
- CRM: customer, purchase history, repeat status, segments, PII privacy.
- Finance: expenses, categories, receipts, revenue, gross/net operating profit, cash summary, batasan akuntansi/pajak.
- Reports/notifications: daily insight, weekly report, exports, preference.
- Settings/security: profile, members, roles, sessions, MFA, export/delete, suspicious activity.
- Troubleshooting/FAQ: login, stock mismatch, failed sale, empty dashboard, insufficient AI data, report failure, notification, connectivity.

## 2. Admin/support manual

- Identity verification dan least-data support workflow.
- Login/session/RBAC/import/transaction/stock/report/AI complaint playbooks.
- Support access dengan reason, approval, expiry, visible indicator, dan audit.
- Correction via movement/reversal/adjustment; ledger tidak dihapus.
- Privacy access/export/correction/delete/consent request.
- AI ops: provider status, model run/evidence, rerun, bad-answer flag, tenant kill switch.
- Incident response: severity, triage, containment, communication, breach checklist, restore, postmortem.

## 3. Developer manual

- Local prerequisites, env, seed, migrations, web/API/worker/test commands.
- Architecture/bounded contexts/module layers dan cara menambah endpoint/job/event.
- RLS/composite FK, inventory ledger, journal, outbox/inbox, import.
- Auth/RBAC, validation, secrets, no-PII logs, upload, CSRF/CORS/CSP, rate limits.
- AI prompt version, tools, metric service, RAG, tenant retrieval, eval/cost, provider adapter, approval.
- QA, staging, migration, release, rollback, backup/restore, observability.

## 4. Page template

```text
Judul
Untuk siapa dan kapan digunakan
Sebelum mulai
Permission yang dibutuhkan
Langkah-langkah
Contoh
Catatan penting
Troubleshooting
Artikel terkait
```

P0 sebelum beta: getting started, account recovery, business setup, product/initial stock, sale, dashboard, AI, expenses, team/roles, privacy/security FAQ, primary troubleshooting.

P1: import/export, weekly report, segments, suppliers/PO, refund/return, billing, email/WA notification.

P2: integrations, agent approval, advanced multi-outlet, forecasting, public API docs.

## 5. Full-product manual expansion

Add role-based collections for owner, cashier, warehouse, procurement, finance/accountant, marketer/CRM, approver, enterprise admin, developer partner and platform support.

Required guides:

- POS register/shift, split tender, receipt/printer, return/refund, cash variance and offline recovery.
- Multi-outlet/warehouse, transfers, stocktake, lots/expiry/serial and inventory reconciliation.
- Supplier, requisition/approval, PO, partial receipt, supplier bill, 3-way match, landed cost and purchase return.
- AR/AP, bank reconciliation, tax snapshot, financial statements, period close/reopen and accountant adjustments.
- CRM segments, loyalty, campaigns, consent/opt-out, automation and campaign ROI.
- Billing/trial/quota, payment failure, upgrade/downgrade, cancellation, invoice and data export.
- Integrations, token rotation, sync health, replay, API/webhooks and sandbox.
- AI recommendation, scenario, draft action, approval, execution receipt, compensation and incident reporting.
- Enterprise SSO/SCIM, custom roles, maker-checker, audit export, retention and legal hold.
- Platform admin/support, impersonation, safe repair, job replay, incidents, DR and provider outage.

Documentation is versioned per release/edition. UI deep-links to exact help revision. Every new GA feature must ship with quick start, full guide, permission table, troubleshooting, recovery/rollback, FAQ and support macro.
