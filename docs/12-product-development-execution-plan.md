# RAMUNI Product Development Execution Plan

Status: working plan for product engineering only  
Scope boundary: authenticated SaaS product, not marketing/money site, blog, or public CMS  
Source baseline: planning pack v2 documents `00`, `01`, `02`, `03`, `04`, `06`, `07`, `09`, `10-full-product-backlog-catalog`, and `11`

Backlog shape: 79 full-product stories total: 15 P0 Foundation/Beta, 33 P1 Sellable GA, 23 P2 Growth/Pro, 6 P3 Enterprise and 2 P4 Ecosystem. P0 is the beta foundation; P1 is the commercial sellability boundary.

## 1. Mandate and scope boundary

This plan covers:

- Authenticated web/PWA product and product-owned auth routes.
- API, worker, scheduler, AI evaluation runner, product admin/support console.
- IAM, tenant, business/outlet, membership, RBAC/ABAC and session security.
- Catalog, pricing, sales/POS, payment boundary, inventory and procurement.
- Finance/internal accounting, CRM, analytics, reports and notifications.
- HashMicro XAI read-only advisory, deterministic metric tools and evaluation.
- Import/export, billing/entitlements, integrations, product support and operations.
- Product design system, contextual help, privacy, audit, observability and release evidence.

Explicitly excluded:

- Public marketing/money site and `apps/marketing` implementation.
- Blog, public CMS, public product/solution/industry/role/pricing/demo/contact pages.
- SEO, sitemap, schema, public redirects, campaign landing pages and public lead forms.
- GTM, GA4, Meta/Google Ads pixels and public campaign attribution implementation.
- Marketing content production and public help/status page rendering.

Product will only expose stable contracts needed by those external surfaces: auth URLs, plan/capability truth, integration availability, consent-safe signup attribution, lifecycle events, product status data and support/help APIs.

## 2. Delivery principles

1. Deliver `R0 Foundation -> R1 Core Usable -> Private Beta -> R2 Sellable GA`; do not build R3-R5 concurrently.
2. Start as a modular monolith. Extract services only after measured load, security, compliance or team-ownership pressure.
3. Tenant isolation, permission, audit, idempotency and observability are acceptance criteria, not later hardening.
4. The sale transaction kernel is atomic: sale, payment, stock movement/balance, customer history, journal and outbox commit together.
5. Inventory movements and financial journals are immutable; corrections use reversal/adjustment.
6. Dashboard, reports and AI use one versioned metric semantic layer.
7. HashMicro XAI is backend-only. The model receives minimized evidence, never arbitrary SQL access or an unrestricted tool surface.
8. Entitlements enforce commercial access. Feature flags are only for rollout, experiments and kill switches.
9. Schema is outlet/warehouse-ready, while the first UX may remain single-outlet.
10. Every story must map requirement -> schema -> API/event -> UI -> permission/entitlement -> audit/analytics -> tests -> manual -> release evidence.

## 3. Initial repository target

```text
apps/
  web/               # authenticated Next.js product/PWA
  api/               # NestJS/Fastify modular monolith
  worker/            # queues, outbox consumers, integrations
  scheduler/         # recurring aggregates, reports, reconciliation
  ai-evals/          # XAI contract and golden-set regression
  platform-admin/    # internal support/operations, introduced before GA
packages/
  ui/                # semantic tokens and accessible product primitives
  contracts/         # OpenAPI-derived types, events, RFC7807 errors
  db/                # immutable migrations, typed SQL, RLS policies
  auth/              # session, actor, tenant and authorization context
  metrics/           # versioned business metric definitions
  config/            # runtime-validated environment configuration
  observability/     # logs, metrics, traces and correlation
  entitlements/      # commercial access and quota contracts
  test-factories/    # tenant-safe synthetic fixtures
docs/
  adr/
  runbooks/
  evidence/
```

Do not create `apps/marketing` or `cms-admin` in this product execution stream. POS begins as a bounded module and dedicated product route; a separate deployable is created only if device/offline/performance evidence requires it.

## 4. Workstreams

### A. Product foundation

- Monorepo, package boundaries, strict TypeScript, lint, format, test and build pipelines.
- Environment validation, secret references, dev/staging/prod isolation.
- Design tokens, accessibility primitives, app shell, responsive navigation and error boundaries.
- OpenAPI skeleton, RFC7807 error contract, request IDs and structured telemetry.

### B. Identity, tenancy and governance

- Signup, verification, login/reset, secure sessions and recovery.
- Tenant/business, membership, invitation, workspace switch and server-side RBAC.
- PostgreSQL RLS, composite tenant foreign keys, tenant-aware cache/object/job/vector policies.
- Audit, idempotency, outbox/inbox, feature flags, consent and privacy request foundations.

### C. Transaction kernel

- Catalog/category/unit/product/SKU/price/HPP/import.
- Inventory immutable movement ledger, current balance, adjustment and low-stock rules.
- Customer profile/history.
- Draft and completed sale, payment, receipt, void/full reversal baseline.
- Expense and internal balanced journal.
- Reference reconciliation dataset and concurrency/property tests.

### D. Intelligence layer

- Versioned metric dictionary and deterministic query service.
- Daily aggregates, freshness, drill-down, health score and reconciliation.
- Dashboard, basic report artifact and in-app notifications.
- `AiGatewayAdapter`, authorized metric tools, citation/evidence snapshots, SSE, feedback and safe abstention.

### E. Commercial and operational readiness

- Plans, plan versions, subscription, entitlements, quota/metering and billing lifecycle.
- POS shifts, cash variance, multi-tender and full/partial return/refund policy.
- Multi-outlet/warehouse, transfer, stocktake, supplier, PO and goods receipt.
- Financial statements/period close appropriate to the approved accounting scope.
- Platform admin, support access approval/expiry/banner/audit, safe job replay and repair preview.
- Backup/restore, DR, pentest/legal gates, cancellation/export/delete end to end.

## 5. Release plan and exit gates

### Gate 0 - Product decisions and architecture records

Deliver:

- Approved ICP/first vertical and primary input workflow.
- P0/P1 scope reconciliation and capability traceability matrix.
- ADRs for stack, tenant/RLS, auth/session, costing, stock policy, journal, metrics, XAI, retention and deployment.
- ERD/data dictionary, threat model, privacy data flow, permission matrix and entitlement model draft.
- UI information architecture, core journeys, responsive state matrix and semantic design-token contract.

Exit when no P0 story is missing acceptance criteria, dependencies, API/data contract, permission, audit/analytics events and verification plan.

### R0 - Foundation

Deliver:

- Repository, CI/security gates, preview/staging, migrations and telemetry.
- App shell/design primitives without depending on final marketing implementation.
- IAM/tenant/RBAC/RLS/audit/idempotency/outbox foundations.
- Cross-tenant automated negative-test harness.

Exit when tenant A cannot access tenant B through DB/API/cache/object/job/vector paths, and deployment/rollback smoke tests pass.

### R1 - Core Usable

Deliver:

- Onboarding to business and first outlet.
- Product/customer/import/initial stock.
- Atomic sale/payment/stock/journal/outbox and history/receipt.
- Expense, core metrics, dashboard and basic in-app notification.
- HashMicro XAI grounded read-only questions with evidence and abstention.

Exit when signup -> onboarding -> five products -> initial stock -> sale -> dashboard -> AI insight is complete and the sale reconciles exactly to stock and journal.

### Private Beta hardening

Deliver:

- Pilot-safe recovery, reconciliation, backup restore, rate limits, security and accessibility.
- Product manual/contextual help for P0 flows.
- Golden AI set, load/concurrency tests, incident/support runbooks and known-limitations register.

Exit when P0 E2E, tenant isolation, AI grounding, restore and Sev-1/Sev-2 gates pass. Private beta may be free and does not imply Sellable GA.

### R2 - Sellable GA

Deliver:

- Billing/subscription/entitlement/quota and payment reconciliation.
- Real daily POS operations: shift, tender, returns/refunds and approved receipt/device scope.
- Procurement, transfer, stocktake, finance statements/close and reconciliation.
- Platform admin/support, privacy lifecycle, legal/security/DR and cancellation/export/delete.

Exit only when billing and entitlements are accurate, daily operations reconcile, support works without uncontrolled access, and pentest/legal/restore evidence is complete.

### R3-R5 - Evidence-driven expansion

- R3 Growth: CRM/loyalty/campaigns, official WA/email, scheduled/custom reports, first connectors, approved AI draft actions.
- R4 Enterprise: SSO/SCIM, maker-checker, API/webhooks, multi-currency/entity, isolated tenancy, validated offline/peripherals.
- R5 Ecosystem: developer/partner portal, connector SDK/marketplace, vertical packs and governed agent templates.

Each later capability needs adoption, revenue, support-load and risk evidence before entering implementation.

## 6. Scope resolutions proposed for Gate 0

These are working defaults until the product owner approves them:

- P0 refund: void/full reversal only; partial return/refund/exchange moves to Sellable GA.
- P0 notifications: in-app only; external email/official WhatsApp later.
- P0 exports: on-demand CSV/basic artifact; scheduled delivery and polished PDF later.
- P0 outlet: single-outlet UX, outlet/warehouse-ready schema and authorization.
- Billing: not required for a free private beta; mandatory before Sellable GA.
- Product privacy consent and marketing consent remain separate records/contracts.
- Customer sale payments and RAMUNI subscription billing use separate modules, schemas and provider boundaries.
- Brand assets remain swappable semantic tokens until the current local brand kit is explicitly approved.

## 7. Multi-agent execution model

The lead agent owns architecture coherence, scope, integration, release evidence and final review. Parallel agents work on bounded branches or file sets:

1. Architecture/data/security agent: ADRs, ERD, RLS, migrations, threat model and tenant tests.
2. Product frontend agent: app shell, design system, onboarding and domain UI states.
3. Core backend agent: IAM, catalog, inventory, sales, finance and transaction invariants.
4. Intelligence/AI agent: metrics, aggregates, reports, XAI adapter, tools and evals.
5. QA/security agent: test matrix, E2E, concurrency, accessibility, security and evidence packs.
6. Commercial/ops agent for GA: billing, entitlements, support admin, DR and operational runbooks.

Agents may research or implement in parallel, but migrations, shared contracts, auth/tenant context, UI primitives and release gates require lead review before merge.

## 8. Quality gates

Every merge:

- Format, lint, typecheck, unit and integration tests.
- Migration lint and real PostgreSQL RLS tests.
- OpenAPI/event contract diff.
- SAST, dependency, secret, license and container/IaC scans where applicable.
- Build and tenant-isolation regression.

Before beta/release:

- Full E2E, WCAG target checks, performance/load/concurrency tests.
- IDOR/tenant leak, CSRF, SSRF, injection, upload and privilege-escalation tests.
- Journal/stock property tests and reconciliation.
- AI numeric/citation/abstention/injection/PII/cross-tenant evaluation.
- Forward/backward migration, backup restore, rollback and failure drills.
- Release evidence containing branch/SHA, migrations, contracts, environment matrix without secrets, test reports, limitations and rollback steps.

## 9. First implementation batch

1. Confirm product-only scope and approve Gate 0 working defaults.
2. Create traceability matrix for P0 and P1 Sellable GA.
3. Write ADRs and lock stack/package boundaries.
4. Create monorepo, CI gates and isolated environment configuration.
5. Implement base UI tokens/primitives and product app shell.
6. Create identity/tenant/membership/RBAC/audit/idempotency/outbox migrations.
7. Implement tenant context, RLS and cross-tenant test matrix.
8. Implement signup/session/onboarding/workspace switch/invitation.
9. Implement catalog and inventory movement/balance.
10. Implement atomic sale/payment/stock/journal/outbox with reconciliation fixtures.
11. Implement customer, expense and safe CSV import.
12. Implement metric dictionary, aggregates and dashboard.
13. Implement HashMicro XAI adapter and non-sensitive staging contract smoke tests.
14. Implement authorized AI metric tools/evals before chat UI.
15. Complete R1 E2E and beta hardening evidence before opening Sellable GA work.

## 10. Change control

- New capabilities enter through the full backlog catalog and receive a priority/horizon.
- A story cannot start without Definition of Ready evidence.
- Changes to tenant, money, stock, journal, billing, permissions or AI action policy require ADR review.
- Marketing requests cannot silently expand product scope; they must use the published cross-surface contracts.
- Production promotion always requires explicit approval and verified rollback readiness.
