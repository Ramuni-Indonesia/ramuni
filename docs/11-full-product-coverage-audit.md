# RAMUNI Full Product Coverage Audit

## Verdict

Setelah perluasan v2, seluruh domain utama produk komersial sudah tercakup pada level capability, SRS, backlog, architecture, implementation program, manuals, developer handover, dan marketing truth model. Ini berarti **planning coverage lengkap**, bukan berarti fitur sudah diimplementasikan.

## Coverage matrix

| Domain | Before | After v2 | Primary docs |
|---|---|---|---|
| IAM/tenant/RBAC | Strong MVP | Full incl. SSO/SCIM/approvals | 01, 03, 09, 10 |
| Multi-outlet/org | Partial schema | Full operating model | 01, 02, 09, 10 |
| POS/sales | Basic transactions | Shift, tender, promo, fulfillment, offline | 01, 09, 10 |
| Inventory | Ledger baseline | Transfer, stocktake, lot/serial, valuation | 01, 03, 09, 10 |
| Procurement | Schema only | Full procure-to-pay | 01, 02, 03, 10 |
| Finance/accounting | Journal baseline | AR/AP, bank, close, statements | 01, 03, 09, 10 |
| CRM | Customer baseline | Leads, loyalty, campaigns, journeys | 01, 09, 10 |
| AI | Grounded advisory | Forecast, drafts, governed agents | 01, 03, 09, 10 |
| Reporting | Basic dashboards | Builder, schedules, semantic layer | 01, 03, 09, 10 |
| Billing | Mentioned future | Full entitlement/metering/dunning | 01, 02, 03, 09, 10 |
| Integrations/API | Generic adapters | Public platform, connectors, webhooks | 01, 03, 09, 10 |
| Mobile/offline | Responsive only | PWA/device/sync/conflict policy | 01, 03, 09, 10 |
| Support/admin | Runbook notes | Console, tickets, SLA, safe repair | 01, 03, 09, 10 |
| Security/compliance | Strong baseline | Enterprise/supply-chain/DR evidence | 01, 03, 09 |
| Marketing/blog | MVP funnel | Full-suite pages, trust, integrations | 05, 08 |
| Manuals/handover | MVP guides | Full role/release documentation | 06, 07 |

## Decisions still requiring product-owner validation

- First sellable vertical: retail, F&B, reseller, distributor, or service.
- POS-first versus integration-first operating model.
- PWA offline requirement and supported printers/scanners.
- Billing/payment provider, packages, price points, quota and overage.
- Accounting/tax scope and licensed reviewer.
- Priority connectors and official WhatsApp BSP.
- Single/multi-outlet availability in Starter/Growth.
- AI action risk matrix and which draft actions enter Growth release.
- Enterprise commitments: SSO, SCIM, isolated tenancy, data residency, SLA.
- Which P4 ecosystem investments have real partner demand.

## Recommended execution order

Do not build every capability simultaneously. Lock one vertical and deliver R0 Foundation → R1 Core Usable → R2 Sellable GA. Run real pilot operations, then sequence R3 Growth, R4 Enterprise, and R5 Ecosystem using adoption, retention, support burden, revenue, and risk evidence.
