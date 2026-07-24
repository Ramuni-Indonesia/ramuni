# RAMUNI Full Product Capability Map

## 1. Audit verdict

Planning sebelumnya kuat untuk MVP dan fondasi teknis, tetapi belum cukup untuk produk komersial lengkap. Gap terbesar: billing/entitlements, POS operasional nyata, procurement, finance/accounting lengkap, CRM automation/loyalty, report builder, offline sync, integrations, platform admin/support, dan controlled AI agents.

Dokumen ini menetapkan target **full product**, bukan janji bahwa semua kemampuan diluncurkan bersamaan. Product editions dan feature flags menjaga produk tetap dapat dikirim bertahap tanpa kehilangan arah akhir.

## 2. Product editions

| Edition | Target | Capability utama |
|---|---|---|
| Starter | Usaha mikro | 1 outlet, sales, stock, expense, dashboard, AI quota dasar |
| Growth | UMKM bertumbuh | Multi-user/outlet, procurement, CRM, reports, campaigns, integrations |
| Pro | Operasi kompleks | Advanced roles, accounting, forecasts, workflow approvals, API/webhooks |
| Enterprise/Partner | Koperasi, franchise, distributor | SSO/SCIM, isolated tenancy, custom retention, audit export, SLA, partner tools |

## 3. Complete capability domains

### A. Identity, organization, and governance

- Email/password, social/OIDC, passwordless/passkeys, email/phone verification.
- MFA, recovery codes, device/session list, remote revoke, suspicious-login alerts.
- Multi-business, legal entity, outlet, warehouse, department/team, business ownership transfer.
- Built-in/custom roles, permission matrix, outlet/data scope, delegated accountant access.
- Maker-checker approvals, separation of duties, step-up auth, verified domains.
- Enterprise SAML SSO, SCIM provisioning, IP allowlist, service/API accounts.
- User lifecycle: invite, activate, suspend, reactivate, delete/anonymize, offboarding.

### B. Business and outlet management

- Legal/tax profile, address, operating hours, currency, timezone, fiscal period.
- Outlet/warehouse hierarchy, document numbering, outlet price/tax/payment settings.
- Cross-outlet stock visibility, transfers, consolidation, channel/store mapping.
- Per-outlet targets, staff assignments, dashboards, and operating status.

### C. Catalog and pricing

- Products, services, variants, SKU/barcode, brands, categories, units and conversions.
- Bundles/kits, modifiers/add-ons, composite/recipe/BOM, serial/lot/expiry.
- Multiple price lists, wholesale/tier price, outlet/channel price, scheduled price.
- Inclusive/exclusive tax, cost method, margin rules, minimum advertised price policy.
- Media, attributes, custom fields, active/archive, bulk edit/import/export.

### D. Sales, POS, and order fulfillment

- Barcode/search cart, hold/recall, quotation, sales order, invoice, receipt.
- Cashier register/shift open-close, opening cash, cash in/out, variance approval.
- Cash, transfer, card/EDC, e-wallet, QRIS, COD, split/partial/multi-tender payment.
- Discounts, promotions, coupons, bundles, price override approval, loyalty redemption.
- Tips/service/delivery fees, tax, rounding, customer credit/store credit.
- Pick-pack-ship/delivery/pickup, fulfillment status, delivery proof.
- Void, partial/full return, exchange, refund, credit note, reversal.
- Receipt print/email/official WhatsApp, customer display, barcode/receipt peripherals.
- Sales target, salesperson attribution, commission and channel performance.

### E. Inventory and procurement

- Immutable stock ledger, on-hand/reserved/available/in-transit, negative-stock policy.
- Opening stock, adjustment, transfer request/dispatch/receive, stocktake/cycle count.
- Batch/lot/serial/expiry, FEFO/FIFO option, damaged/quarantine stock.
- Supplier master, terms, price history, lead time, contacts and documents.
- Purchase request, RFQ, approval, PO, partial receipt/backorder, supplier bill.
- Purchase return, landed cost allocation, payment linkage.
- Min/max, safety stock, reorder point, lead-time demand, auto-PO draft.
- Valuation, aging, dead stock, shrinkage, movement and supplier performance reports.

### F. Finance and accounting

- Configurable chart of accounts, opening balance, balanced journal, period lock/close.
- Revenue, COGS, discount, tax, returns, operating expenses and cash movements.
- Accounts receivable/payable, invoice/bill, allocation, aging, customer/vendor credit.
- Cash/bank accounts, transfers, statement import, matching and reconciliation.
- Recurring journals, accrual, prepayment, budgets, fixed assets/depreciation.
- P&L, balance sheet, cash flow, trial balance, general ledger, tax/payment reports.
- Multi-currency/exchange rate for Pro; accountant adjustment and audit.
- Indonesia tax/export integration only after legal/accounting validation.

### G. CRM, loyalty, and marketing automation

- Customer/prospect/lead, dedup/merge, custom fields, timeline, notes, tasks.
- Consent and channel preferences, tags, RFM, cohort, LTV, churn and repeat score.
- Loyalty account, points ledger, tiers, rewards, membership, vouchers, referrals.
- Segment/audience builder with frozen audience snapshots.
- Official WhatsApp/email templates, campaign draft/send/schedule.
- Triggered journeys: welcome, reorder, birthday, win-back, abandoned invoice.
- Frequency caps, quiet hours, approval, opt-out, delivery/bounce/read/click tracking.
- Campaign attribution and ROI tied to real sales.

### H. AI Business Companion and agents

- Grounded conversational BI for sales, inventory, finance, CRM and operations.
- Citations, metric version, freshness, confidence/limitations, safe abstention.
- Saved prompts/playbooks, daily brief, weekly/monthly executive report.
- Forecasts, anomaly detection, cause analysis, what-if scenarios.
- Recommendations with lifecycle: new, viewed, accepted, dismissed, completed, measured.
- Draft actions: PO, campaign, report, task, stock transfer, customer follow-up.
- Policy matrix by risk, preview/diff, approval/multi-approval, expiry, execution receipt, compensation.
- Tenant quota/cost dashboard, model rollout/fallback, kill switch, evaluation feedback loop.
- HashMicro XAI is the initial provider; no browser direct call and no arbitrary SQL.

### I. Analytics and reporting

- Insight-first dashboards with drill-down to source transactions.
- Report catalog for sales, payment, discount, refund, inventory, procurement, finance, CRM, campaign and AI usage.
- Saved views/filters, custom dashboard/report builder, role/outlet/channel/product dimensions.
- Targets/budgets, period comparisons, scheduled delivery, export job lifecycle.
- Metric semantic layer with formula version, owner, freshness SLA and migration.
- Forecast, anomaly, cohort, retention, LTV, vendor and product profitability.

### J. Import, integration, and developer platform

- CSV/Excel templates, mapping, dry-run, resumable import, error rows and reconciliation.
- Integration catalog with available/beta/soon status.
- OAuth/provider connections, encrypted tokens, scope, rotation, revoke and sync status.
- Priority connectors: official WhatsApp/email, payment/QRIS, POS, marketplaces, accounting.
- Public REST API, service accounts, granular scopes, sandbox, versioning/deprecation.
- Webhook subscriptions, HMAC signing, replay protection, delivery logs and retry.
- Connector SDK/adapters, field mapping, resync, reconciliation and support diagnostics.

### K. Billing and monetization

- Plans, plan versions, features, entitlements, add-ons and feature flags.
- Trial, subscription, seat/outlet/storage/AI limits, usage meters and quota.
- Checkout/payment method, recurring billing, invoice/tax receipt, payment reconciliation.
- Upgrade/downgrade/proration, coupon/promo/referral credits, overage.
- Failed-payment dunning, grace, suspension, reactivation, cancellation, refund/credit note.
- Self-service billing portal and audited admin override.
- API/jobs/AI must enforce entitlements server-side.

### L. Mobile, offline, and devices

- Installable PWA, responsive app, push notifications, barcode camera.
- Device registration, encrypted local cache, remote logout/wipe.
- Connectivity state, offline sales queue, idempotency, background sync and conflicts.
- Explicit offline policy for price, customer, stock and payment.
- Printer, scanner, cash drawer and customer-display support where validated.
- Native mobile considered only when PWA/peripheral constraints justify it.

### M. Notification and collaboration

- In-app, email, official WhatsApp, web push channels.
- Preferences, per-event channel, quiet hours, digest, escalation and unsubscribe.
- Mentions, comments, assignments, approval inbox, reminders and activity feed.
- Template versioning, localization, delivery tracking and deduplication.

### N. Platform admin, support, and success

- Admin console for tenant/user/subscription/provider/feature-flag/job status.
- Support cases, SLA, priority, assignment, internal note, customer communication.
- Support access request with reason, approval, expiry, visible banner and audit.
- Job replay/DLQ, connector resync, reconciliation and safe data repair preview.
- Tenant suspend/reactivate/export/delete, abuse controls, announcements and status page.
- Knowledge base feedback, onboarding progress, health score, customer-success playbooks.

### O. Security, privacy, and reliability

- UU PDP/PSE assessment, DPA/vendor register, consent, DSAR, retention and deletion proof.
- RLS, RBAC/ABAC, MFA, maker-checker, tamper-evident audit and audit export.
- KMS/encryption policy, key rotation, secrets manager, SBOM/signing/provenance.
- SAST/SCA/secret/container/IaC/runtime scanning with vulnerability SLA.
- PCI scope avoidance via hosted/tokenized payment provider.
- SLOs, multi-AZ, PITR, DR, BCP, restore/failover drills and incident postmortem.

## 4. Commercial release horizon

| Release | Outcome |
|---|---|
| R0 Foundation | Architecture, IAM/tenant, security, metric dictionary, design system, CI/CD |
| R1 Core Usable | Catalog, POS basics, stock ledger, customer, expense/journal, dashboard, XAI read-only |
| R2 Sellable GA | Billing, entitlements, shifts/multi-tender/promos/refunds, procurement/transfers/stocktake, reports, support admin, legal/DR/pentest |
| R3 Growth | Loyalty, campaigns, official WA/email, scheduled/custom reports, connectors, AI draft actions |
| R4 Scale/Enterprise | API/webhooks, SSO/SCIM, maker-checker, multi-currency, advanced accounting, isolated tenancy, offline/peripherals |
| R5 Intelligence/Ecosystem | Advanced agents, workflow builder, vertical packs, partner marketplace, mature forecast/anomaly |

## 5. Full-product sellability gate

RAMUNI dianggap sellable GA ketika onboarding sampai first insight dapat diselesaikan tanpa bantuan developer; billing dan entitlement dapat menagih/membatasi dengan benar; outlet/POS/stock/procurement/finance dapat direkonsiliasi; support dapat menangani tenant tanpa akses liar; backup/restore/pentest/legal gates lulus; public website hanya menjual capability berstatus GA; dan cancellation/export/delete dapat diselesaikan end-to-end.
