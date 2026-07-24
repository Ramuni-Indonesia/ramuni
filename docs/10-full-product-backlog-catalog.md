# RAMUNI Full Product Backlog Catalog

Prioritas: `P0` Foundation/Beta, `P1` Sellable GA, `P2` Growth/Pro, `P3` Enterprise, `P4` Ecosystem.

## 1. Identity and organization

| ID | P | Story | Acceptance |
|---|---|---|---|
| `US-IAM-01` | P0 | Signup/login/reset/verify | Secure session, rate limit, audit |
| `US-IAM-02` | P0 | Business and team invitation | Membership, role, tenant isolation |
| `US-IAM-03` | P0 | Server-side RBAC | Unauthorized API always rejected |
| `US-IAM-04` | P1 | MFA and session/device management | Recover, revoke, suspicious alert |
| `US-IAM-05` | P1 | Custom roles and approvals | Matrix, thresholds, audit, no lockout |
| `US-IAM-06` | P3 | SSO and SCIM | Domain policy, provisioning, audit |
| `US-ORG-01` | P0 | Business settings | Timezone, IDR, fiscal period, numbering |
| `US-ORG-02` | P1 | Multi-outlet/warehouse | CRUD, scoped staff, consolidated reports |
| `US-ORG-03` | P1 | Outlet/channel settings | Price, tax, payment, numbering |
| `US-ORG-04` | P3 | Multi-entity | Consolidation and permission controls |

## 2. Catalog, sales, POS

| ID | P | Story | Acceptance |
|---|---|---|---|
| `US-CAT-01` | P0 | Product/category/unit/SKU | Unique SKU, price/HPP, archive, import |
| `US-CAT-02` | P1 | Barcode/images/attributes | Scan/search, media, bulk edit |
| `US-CAT-03` | P1 | Multi-unit conversion | Purchase/sale/stock reconcile |
| `US-CAT-04` | P2 | Bundles/modifiers | Component stock/cost correct |
| `US-CAT-05` | P2 | Lots/expiry/serial | Traceability and expiry reporting |
| `US-SEL-01` | P0 | Complete sale | Atomic and idempotent stock/journal/outbox |
| `US-SEL-02` | P0 | History and receipt | Filter, detail, source trace, print/PDF |
| `US-SEL-03` | P1 | Register and shift | Open/close, expected cash, variance |
| `US-SEL-04` | P1 | Multi-tender | Cash, transfer, QRIS-ready, split/partial |
| `US-SEL-05` | P1 | Quote/order/invoice | Due date, partial fulfillment/payment |
| `US-SEL-06` | P1 | Return/refund/exchange | Partial/full, approval, reversal |
| `US-SEL-07` | P2 | Promotions and coupons | Eligibility, limits, redemption audit |
| `US-SEL-08` | P2 | Fulfillment | Pick/pack/ship/deliver and proof |
| `US-SEL-09` | P2 | Offline POS | Encrypted cache, sync, conflict queue |

## 3. Inventory and procurement

| ID | P | Story | Acceptance |
|---|---|---|---|
| `US-INV-01` | P0 | Stock ledger | Immutable movements and balance match |
| `US-INV-02` | P0 | Low-stock alert | Rules, dedup, notification |
| `US-INV-03` | P1 | Stock transfer | Dispatch/receive/partial/cancel |
| `US-INV-04` | P1 | Stocktake | Snapshot, variance, approval, adjustment |
| `US-INV-05` | P1 | Reservation | Available-to-promise, release, no double-sell |
| `US-INV-06` | P1 | Aging/valuation | Dead/fast/slow and WAC report |
| `US-PUR-01` | P1 | Supplier management | Terms, lead time, performance |
| `US-PUR-02` | P1 | Purchase order | Approval, partial receipt, close/cancel |
| `US-PUR-03` | P1 | Goods receipt | Stock/cost snapshot and PO reconcile |
| `US-PUR-04` | P2 | Supplier invoice match | 2-way/3-way and payable variance |
| `US-PUR-05` | P2 | Return/landed cost | Reversal and cost allocation |
| `US-PUR-06` | P2 | Reorder suggestion | Lead time, velocity, safety stock, draft PO |

## 4. Finance and payments

| ID | P | Story | Acceptance |
|---|---|---|---|
| `US-FIN-01` | P0 | Expense/journal | Balanced entry, accounts, audit |
| `US-FIN-02` | P0 | Revenue/profit/cash | Metric contract and drill-down |
| `US-FIN-03` | P1 | Configurable COA | Safe mappings and opening balance |
| `US-FIN-04` | P1 | AR/AP and aging | Invoice/bill, allocation, overdue |
| `US-FIN-05` | P1 | Financial statements | P&L, balance, cash flow, trial balance |
| `US-FIN-06` | P1 | Period close | Checklist, lock/reopen, audit |
| `US-FIN-07` | P2 | Bank reconciliation | Import, matching, variance |
| `US-FIN-08` | P2 | Budget | Setup, actual variance, alerts |
| `US-PAY-01` | P1 | Payment boundary | Hosted/tokenized, signed webhook |
| `US-PAY-02` | P2 | Settlement reconciliation | Fees/refunds/bank/provider report |
| `US-FIN-09` | P3 | Multi-currency/entity | Exchange, consolidation, audit |

## 5. CRM, loyalty, campaigns

| ID | P | Story | Acceptance |
|---|---|---|---|
| `US-CRM-01` | P0 | Customer/history | PII permission and purchase summary |
| `US-CRM-02` | P1 | Notes/tasks/tags/dedup | Merge audit, owner, reminders |
| `US-CRM-03` | P1 | Segment builder | RFM, product, outlet, consent filters |
| `US-CRM-04` | P2 | Loyalty | Earn/burn/expire, tier, reward, fraud controls |
| `US-CRM-05` | P2 | Campaign audience | Frozen audience, approval, opt-out |
| `US-CRM-06` | P2 | Journeys | Welcome, reorder, birthday, win-back |
| `US-CRM-07` | P2 | Campaign ROI | Delivery/read/click/sales attribution |

## 6. AI, reporting, automation

| ID | P | Story | Acceptance |
|---|---|---|---|
| `US-AI-01` | P0 | XAI adapter | Backend-only, smoke test, no key in logs |
| `US-AI-02` | P0 | Grounded Q&A | Tools, citation, abstain, tenant isolation |
| `US-AI-03` | P1 | Recommendations | Restock/margin/churn/expense with evidence |
| `US-AI-04` | P2 | Forecast/scenario | Confidence, assumptions, eval tracking |
| `US-AI-05` | P2 | Draft actions | PO/campaign/report/task approval |
| `US-AI-06` | P3 | AI governance | Policy, budget, route, kill switch, eval dashboard |
| `US-RPT-01` | P0 | Dashboard | Period, freshness, source, health score |
| `US-RPT-02` | P1 | Drill-down/schedule | Saved filters, delivery, export audit |
| `US-RPT-03` | P2 | Report builder | Semantic metrics and permissions |
| `US-WFL-01` | P1 | Approval inbox | Approve/reject/comment/expiry/audit |
| `US-WFL-02` | P2 | Automation builder | Event/condition/action/retry/history/kill switch |

## 7. Billing, integration, support, enterprise

| ID | P | Story | Acceptance |
|---|---|---|---|
| `US-BIL-01` | P1 | Trial/subscription | Entitlement, invoice, checkout, plan change |
| `US-BIL-02` | P1 | Quota/metering | Seat/outlet/AI/API/storage server-enforced |
| `US-BIL-03` | P2 | Dunning/add-ons | Grace, suspension, recovery, promo audit |
| `US-BIL-04` | P2 | Cancellation/refund | Churn reason, export reminder, credit note |
| `US-INT-01` | P1 | Integration directory | Setup, status, sync health, error UX |
| `US-INT-02` | P2 | API/webhooks | Scopes, limits, signature, replay, docs |
| `US-INT-03` | P2 | Connector framework | Mapping, external IDs, resync, reconcile |
| `US-SUP-01` | P1 | Help/tickets | Contextual help, SLA, announcements |
| `US-OPS-01` | P1 | Platform admin | Tenant health, jobs, flags, safe actions |
| `US-OPS-02` | P1 | Support access | Reason, approval, expiry, banner, audit |
| `US-ENT-01` | P3 | Enterprise identity | SSO, SCIM, IP allowlist, audit export |
| `US-ENT-02` | P3 | Compliance controls | Legal hold, retention, DPA/SLA evidence |
| `US-ECO-01` | P4 | Developer portal | Sandbox, SDK, webhook tester, app review |
| `US-ECO-02` | P4 | Partner/reseller | Attribution, commission, billing, support |

## 8. Offline and device resilience

| ID | P | Story | Acceptance |
|---|---|---|---|
| `US-OFF-01` | P1 | Installable PWA | Versioned cache, update notice, supported browsers |
| `US-OFF-02` | P1 | Device registration/revoke | Device identity, limit, remote logout |
| `US-OFF-03` | P2 | Encrypted local cache | Minimum data, expiry, wipe, no secrets |
| `US-OFF-04` | P1 | Offline auth policy | Max duration, role scope, step-up on reconnect |
| `US-OFF-05` | P2 | Catalog/customer sync | Cursor, delta, freshness and storage limits |
| `US-OFF-06` | P1 | Offline cash sale | Policy limit, local receipt, pending-sync state |
| `US-OFF-07` | P1 | Command outbox | Client idempotency and exactly-once receipt |
| `US-OFF-08` | P2 | Conflict resolution | Entity-specific rule and operator queue |
| `US-OFF-09` | P2 | Reconnect reconciliation | Sale/stock/cash counts and exception report |
| `US-OFF-10` | P2 | Printer/scanner support | Certified matrix and recoverable failures |
| `US-OFF-11` | P1 | Offline monitoring | Device status, queue depth, stale-data alert |
| `US-OFF-12` | P1 | Risk action blocking | No offline refund, role change or sensitive finance |

## 9. Omnichannel order and delivery tracking

| ID | P | Story | Acceptance |
|---|---|---|---|
| `US-ORD-01` | P1 | Provider/store connection | Scoped credential, status, revoke, audit |
| `US-ORD-02` | P1 | Catalog/menu mapping | Variant/modifier mapping and validation |
| `US-ORD-03` | P1 | Order ingestion | Signed webhook/poll fallback and dedup |
| `US-ORD-04` | P1 | Canonical order state | Monotonic transitions and source evidence |
| `US-ORD-05` | P1 | Accept/reject/prep time | SLA timer, reason, provider acknowledgement |
| `US-ORD-06` | P1 | Stock reservation | Channel allocation, release, no double-sell |
| `US-ORD-07` | P2 | Courier events | Assigned/pickup/delivered with provider evidence |
| `US-ORD-08` | P2 | ETA/tracking view | Freshness, deep link, no fabricated GPS |
| `US-ORD-09` | P1 | Cancellation/refund | State-aware reversal and provider reconciliation |
| `US-ORD-10` | P1 | Fees/commission/tax | Snapshot, settlement mapping, margin report |
| `US-ORD-11` | P2 | Settlement reconciliation | Batch lines, variances, disputes, audit |
| `US-ORD-12` | P1 | Replay/manual recovery | Cursor, safe replay, duplicate prevention |
| `US-ORD-13` | P2 | Customer/store notification | Template, consent, status and delivery result |
| `US-ORD-14` | P1 | Connector health | Rate limit, outage, backlog and alerting |

## 10. Onboarding, notification, and collaboration

| ID | P | Story | Acceptance |
|---|---|---|---|
| `US-ONB-01` | P1 | Industry setup template | Correct defaults, preview, editable |
| `US-ONB-02` | P1 | Migration/import wizard | Mapping, dry-run, errors, rollback |
| `US-ONB-03` | P1 | Activation checklist | Progress, deep links, role awareness |
| `US-ONB-04` | P1 | Demo/sample data | Isolated, resettable, clearly labeled |
| `US-ONB-05` | P1 | Product tours | Accessible, dismissible, versioned |
| `US-ONB-06` | P0 | Activation analytics | Funnel events without PII |
| `US-NOT-01` | P0 | Notification center | Read/archive, priority, deep link |
| `US-NOT-02` | P1 | Preferences and quiet hours | Per-event/channel/digest settings |
| `US-NOT-03` | P2 | Email/WA/push channels | Consent, delivery, retry, opt-out |
| `US-NOT-04` | P1 | Versioned templates | Locale, preview, approval, rollback |
| `US-COL-01` | P2 | Mentions/comments/assignments | Permission, notification, audit |
| `US-NOT-05` | P1 | Delivery monitoring | Provider status, DLQ and replay |

## 11. Security, compliance, and reliability

| ID | P | Story | Acceptance |
|---|---|---|---|
| `US-SEC-01` | P0 | Tenant isolation | API/cache/vector/object/job negative tests |
| `US-SEC-02` | P0 | Audit trail | Actor, resource, before/after redaction, export |
| `US-PRV-01` | P1 | Privacy requests | Access/correct/export/delete proof |
| `US-SEC-03` | P0 | Security pipeline | SAST/SCA/secret/container/IaC gates |
| `US-REL-01` | P0 | Backup/restore | Encrypted backup and reconciliation drill |
| `US-REL-02` | P1 | DR/failover | Measured RPO/RTO and runbook |
| `US-REL-03` | P1 | Incident/status | Severity, comms, postmortem, status page |
| `US-PRV-02` | P1 | Vendor/DPA register | Subprocessor, transfer and risk evidence |
| `US-SEC-04` | P2 | Passkeys/device trust | Registration, recovery, revoke, risk signal |
| `US-SEC-05` | P3 | Enterprise security policy | Enforced MFA, access review, tamper evidence |

## 12. Marketing, documentation, and enablement

| ID | P | Story | Acceptance |
|---|---|---|---|
| `US-MKT-01` | P0 | Marketing design system | Accessible tokens and reusable templates |
| `US-MKT-02` | P0 | Home/product hubs | Clear message, CTA, responsive, measured |
| `US-MKT-03` | P1 | Product pages | Feature truth, proof, plan and CTA |
| `US-MKT-04` | P1 | Solution/industry pages | Unique intent, internal links, no doorway pages |
| `US-MKT-05` | P1 | Pricing/enterprise/trust | Limits, availability, security proof |
| `US-CMS-01` | P0 | CMS workflow | Draft/review/publish/revision/rollback |
| `US-BLG-01` | P1 | Blog/resources | Taxonomy, templates, related content |
| `US-SEO-01` | P0 | Technical SEO/schema | Canonical, sitemap, robots, valid schema |
| `US-ANA-01` | P0 | Analytics/consent | Event dictionary, dedup, consent, no PII |
| `US-LEAD-01` | P0 | Demo/lead funnel | Validation, attribution, queue, success/error |
| `US-DOC-01` | P2 | Developer/integration docs | Versioned API, examples, webhook reference |
| `US-MKT-06` | P0 | Web release quality | WCAG, CWV, link/schema/form E2E |
| `US-DOC-02` | P0 | User help baseline | Getting started and critical flows |
| `US-DOC-03` | P1 | Role-based manuals | Owner, cashier, warehouse, finance, marketing |
| `US-DOC-04` | P0 | Developer docs | Local, architecture, deploy, rollback |
| `US-DOC-05` | P0 | Support runbooks/macros | Incidents, recovery and customer replies |
| `US-DOC-06` | P1 | Contextual versioned help | Deep link matches feature/release |
| `US-DOC-07` | P2 | Tutorial media | Accessible scripts, captions, version labels |

## 13. Traceability requirement

Every item maps to SRS ID, schema, API, UI flow, permission/entitlement, audit event, analytics event, tests, manual, support macro, and release evidence.
