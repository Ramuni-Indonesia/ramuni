# RAMUNI Feature Backlog and Delivery Roadmap

Prioritas full product memakai `P0` Foundation/Beta, `P1` Sellable GA, `P2` Growth/Pro, `P3` Enterprise, dan `P4` Ecosystem. Story belum siap bila acceptance criteria, dependency, design, API/data contract, permission, audit/analytics event, migration/rollback, dan verification plan belum jelas.

## 1. Epics dan P0 stories

| Epic | P0 stories | Acceptance ringkas |
|---|---|---|
| `E00 Discovery` | ICP interview, journey, metric dictionary, costing ADR, threat model | Scope dan definisi angka disetujui |
| `E01 Platform` | Auth, session, tenant, membership, RBAC, onboarding | Server authorization dan isolation tests lulus |
| `E02 Catalog` | Category, unit, product, SKU, price/HPP, archive | Validasi, uniqueness, permission, audit |
| `E03 Inventory` | Movement ledger, balance, adjustment, low-stock alert | Append-only, atomic, concurrency-safe |
| `E04 Sales` | Draft/complete sale, payment, history, receipt, void/refund | Idempotent; sale-stock-journal konsisten |
| `E05 CRM` | Customer CRUD, history, summary, basic segment | PII permission dan tenant scope lulus |
| `E06 Finance` | Expense, accounts/journal, revenue/profit/cash summary | Journal balance dan traceable numbers |
| `E07 Dashboard` | AI summary, metrics, period comparison, health score | Formula versioned; empty/freshness state |
| `E08 AI` | Chat/SSE, metric tools, citations, insight, feedback, evals | Read-only, grounded, abstains safely |
| `E09 Reporting` | Daily insight, weekly report, export artifact | Background job idempotent dan observable |
| `E10 Notification` | In-app center, low-stock/report alert, preferences | Delivery dedup dan retry |
| `E11 Import` | CSV mapping, preview, dry-run, commit, error report | Checksum/idempotency dan reconciliation |
| `E12 Marketing` | Home, product, solutions, pricing, demo, security/legal | Responsive, verifiable claims, CTA measured |
| `E13 Blog/CMS` | Content model, workflow, blog listing/detail/category | Preview/revision/SEO/security lulus |
| `E14 Governance` | Audit, privacy requests, consent, retention, feature flags | Sensitive operations provable and recoverable |
| `E15 Operations` | CI/CD, staging, monitoring, backup/restore, runbook | E2E, alert, rollback, restore drill |

## 2. Dependency map

`E00 → E01 → E02/E05 → E03/E04/E06 → E07/E08/E09`. Governance dan operations berjalan sejak hari pertama. Marketing/blog dapat paralel, tetapi memakai brand tokens, feature truth, auth CTA, consent, dan analytics contract yang sama.

AI tidak boleh dibangun hanya dari prompt. Ia bergantung pada metric/query tools deterministik, authorization, aggregate freshness, dan golden evaluation set.

## 3. Sprint plan

Asumsi satu sprint dua minggu setelah Sprint 0.

| Sprint | Outcome yang dapat didemokan |
|---|---|
| 0 | Interview/prototype result, scope lock, metric dictionary, ERD, threat model, ADR, OpenAPI skeleton |
| 1 | CI/CD staging, auth, tenant, session, RBAC, audit/observability skeleton, app shell |
| 2 | Product/category/SKU, inventory ledger, adjustment, low-stock alert |
| 3 | Sale/payment atomic, history, void/reversal, customer profile |
| 4 | Expense/journal, aggregates, dashboard metrics, health score v1 |
| 5 | AI tool gateway, chat/SSE, evidence/citations, feedback, golden eval |
| 6 | Daily/weekly insight, notification, CSV import/export, privacy controls |
| 7 | Security/performance/accessibility hardening, backup restore, UAT, beta readiness |

Parallel marketing lane:

- `M1`: positioning, sitemap, design system, CMS models, analytics/consent.
- `M2`: home, product, pricing, demo/contact, security/legal, blog template.
- `M3`: solution/industry pages, 8-12 initial articles, redirects/sitemap, E2E funnel.

## 4. P1 backlog

- Multi-outlet dan warehouse scopes.
- Supplier, purchase order, goods receipt, stocktake, lots/expiry.
- Partial refund dan richer payment reconciliation.
- Rule-based customer segments dan campaign draft.
- Billing/trial/quota/add-on/cancellation.
- Email notification, official WhatsApp opt-in notification.
- Scheduled reports and CSV/PDF exports.
- Forecast stock dengan confidence interval.
- Integration directory dan initial POS/marketplace connector.
- Case studies, calculators, templates, changelog, help center search.

## 5. P2 backlog

- Controlled AI agent actions dengan approval dan compensation.
- Advanced anomaly detection dan forecasting.
- Offline POS/native mobile hanya jika riset memvalidasi.
- Public API/webhooks, partner/reseller ecosystem.
- Enterprise isolated tenancy, SSO, advanced governance.
- Bank reconciliation, accounting integration, atau tax features setelah legal/domain review.

## 6. Beta launch checklist

- Semua P0 critical acceptance scenario lulus.
- Tidak ada Sev-1/Sev-2 dan tidak ada critical/high vulnerability tanpa mitigasi.
- Tenant/RBAC/IDOR/injection/concurrency/idempotency tests lulus.
- Dashboard, report, dan AI memakai metric contract yang sama.
- AI golden set grounded-answer >=95% pada use-case yang didukung.
- Backup restore dan sale-stock-journal reconciliation berhasil.
- Monitoring, on-call owner, incident/rollback/support runbook tersedia.
- Privacy, terms, consent, retention, export/delete request, dan legal review siap.
- Public site tidak menjanjikan fitur/integrasi/customer proof yang belum nyata.

## 7. Definition of done

Acceptance criteria, UX states, responsive/accessibility, server authorization, tenant isolation, audit/analytics, unit/integration/E2E tests, API/user docs, monitoring, migration/rollback, dan UAT seluruhnya selesai. Fitur di balik flag tetap harus memenuhi security baseline.

## 8. Full-product epic roadmap

| Epic | P1 Sellable GA | P2 Growth/Pro | P3 Enterprise | P4 Ecosystem |
|---|---|---|---|---|
| Organization | Multi-outlet/warehouse, scoped staff | Consolidated ops and approvals | Multi-entity, SSO/SCIM | Franchise/partner hierarchy |
| Catalog | Barcode, images, multi-unit, services | Bundles, price lists, lots/serials | Catalog governance | Supplier catalog network |
| POS/Sales | Shift, multi-tender, invoice, returns | Fulfillment, promos, offline queue | High-volume controls | Omnichannel orchestration |
| Inventory | Transfer, stocktake, reservation, aging | Reorder, expiry, valuation | Advanced audit/control | Optimization network |
| Procurement | Supplier, PO, receipt, return | 3-way match, landed cost | Approval/compliance | RFQ/supplier portal |
| Finance | AR/AP, COA, tax snapshot, statements | Bank reconcile, budget, accountant export | Multi-entity/compliance | Accounting ecosystem |
| CRM | Leads, notes/tasks, dedup, segments | Loyalty, campaigns, journeys | Consent governance | CDP connectors |
| Analytics | Drill-down, saved/scheduled reports | Builder, anomaly, forecast | Executive consolidation | Privacy-safe benchmarks |
| AI | Proactive grounded recommendations | Approved draft actions/scenarios | AI policy/admin governance | Agent/vertical marketplace |
| Billing | Trial, plans, entitlement, invoices | Usage, add-ons, dunning | Contract billing | Reseller billing |
| Integrations | Payment, email/WA, accounting export | API/webhooks/connectors | OAuth governance | App marketplace/SDK |
| Support/Ops | Help, tickets, admin console, DR | Health scoring/CSAT | SLA/trust evidence | Partner support |

## 9. P1 backlog — Sellable GA

- Billing/trial/subscription/entitlement/quota/upgrade/downgrade/cancel/dunning baseline.
- Multi-outlet/warehouse and outlet-scoped permissions.
- Barcode, multi-unit, product images, service items and bulk catalog operations.
- POS register/shift, cash movements, split tender, QRIS/provider-ready payments, promotions, partial returns/refunds and receipts.
- Transfers, stocktake, reservation, aging and damaged/lost workflows.
- Suppliers, purchase orders, partial goods receipt, purchase returns and supplier performance.
- COA, AR/AP, tax snapshots, P&L, balance sheet, cash flow, trial balance and period close.
- Customer notes/tasks/tags/dedup, richer segmentation and consent preferences.
- Drill-down dashboards, saved and scheduled reports.
- Proactive XAI recommendations with citations and data freshness.
- In-app help, product tours, support cases, announcements, platform-admin console.
- Migration wizard and sellable website/pricing/feature availability registry.

## 10. P2 backlog — Growth/Pro

- Supplier invoices, 3-way matching, landed costs, batch/expiry/serial handling.
- Price lists, customer/outlet pricing, promotion/coupon engine and loyalty ledger.
- Campaign audiences, official WhatsApp/email templates, journeys, opt-out and ROI.
- Custom report builder, forecast/anomaly, scheduled exports and semantic metric catalog.
- Workflow automation builder with approvals and run history.
- AI draft PO/campaign/report/task with approval, receipt and compensation.
- Payment reconciliation, bank statement import, budgeting and accountant integration.
- Public API v1, outbound webhooks, connector directory, sync health and replay tooling.
- Robust installable PWA/offline queue and supported device/peripheral matrix.

## 11. P3 backlog — Enterprise

- SSO/OIDC/SAML, SCIM, custom roles, enforced MFA, domain claim and IP allowlist.
- Approval matrix, segregation of duties, audit export, legal hold and custom retention.
- Multi-entity consolidation, multi-currency and enterprise financial controls.
- Isolated tenancy/deployment option, enterprise SLA, DR/security evidence pack.
- Advanced platform support access governance and production change audit.

## 12. P4 backlog — Ecosystem

- Developer portal, OAuth apps, API keys, SDK, sandbox and webhook tester.
- Connector/app marketplace with certification, review and lifecycle governance.
- Partner/reseller portal, attribution, commissions and reseller billing.
- Supplier/customer portals and optional RFQ ecosystem.
- Governed AI-agent/vertical-copilot marketplace and automation templates.
- Privacy-approved anonymized benchmarking only after legal and statistical review.

## 13. Full-product release gates

### Sellable GA

- Owner can onboard, subscribe, sell, procure, reconcile stock/finance, receive support, export/cancel, and reach first insight without developer intervention.
- Billing, entitlement, POS shift, payments, inventory, procurement and financial statements reconcile.
- Tenant isolation, pentest, legal/privacy, support, backup/restore and DR gates pass.

### Growth/Pro

- Automation, loyalty/campaigns, connectors, custom reports and approved AI drafts are observable, retry-safe and plan-entitled.
- Large imports/exports and API/webhooks are auditable, recoverable and abuse-controlled.

### Enterprise

- SSO/SCIM, custom roles, maker-checker, audit export, retention/legal hold, multi-entity reporting and SLA evidence pass.

### Ecosystem

- Public platform, partner billing, connector certification and agent governance are stable with sandbox, docs, policy and incident ownership.
