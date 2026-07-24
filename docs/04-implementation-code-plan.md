# RAMUNI Implementation and Codebase Plan

## 1. Monorepo structure

```text
apps/
  marketing/      # public Next.js and SEO
  web/            # authenticated Next.js/PWA
  api/            # NestJS/Fastify modular API
  worker/         # queue consumers and integrations
  scheduler/      # recurring jobs
  cms-admin/      # isolated content authoring, if self-built
  ai-evals/       # golden sets and regression runner
packages/
  ui/             # tokens and accessible components
  contracts/      # OpenAPI-derived types/events
  db/             # SQL migrations, typed queries, RLS
  auth/           # session/RBAC/tenant context
  config/         # validated configuration
  observability/  # logging/tracing/metrics
  test-factories/ # tenant-safe fixtures
docs/
  adr/             # architecture decision records
```

API modules: `identity`, `tenant`, `catalog`, `inventory`, `sales`, `finance`, `crm`, `analytics`, `ai`, `reporting`, `notifications`, `integrations`, `governance`.

Module internals:

```text
domain/          # entities, value objects, invariants, domain events
application/     # use cases, commands/queries, authorization
infrastructure/  # repositories and provider adapters
presentation/    # controllers and schemas
tests/
```

## 2. Coding rules

- Domain code tidak mengimpor web framework/provider.
- Setiap use case menerima authenticated actor dan tenant context.
- Application service memiliki DB transaction; external side effects keluar via outbox.
- SQL-first typed layer (Drizzle/Kysely atau setara); RLS/composite FK tidak disembunyikan ORM.
- Runtime validation tetap wajib walau TypeScript typed.
- External provider selalu di belakang adapter; model/email/WA/payment dapat diganti.
- AI provider awal wajib lewat `https://xai.hashmicro.co/v1` dengan secret `RAMUNI_XAI_API_KEY`, model env-based, dan `AiGatewayAdapter`.
- Uang memakai decimal value object, waktu UTC, dan explicit business timezone.
- Write critical bersifat idempotent; mutation penting teraudit.
- Feature flags mengontrol AI, integrations, automation, dan tenant rollout.
- ADR wajib untuk tenancy, costing, metric formula, auth, provider AI, retention, and deployment.

## 3. Delivery sequence

### Phase 0 — 1-2 minggu

Scope/metric/costing lock, ERD, threat model, data classification, API skeleton, CI/CD, isolated staging, secrets, telemetry, test harness.

### Phase 1 — 2-3 minggu

Auth/session, tenant/membership/RBAC/RLS, business/outlet, audit/idempotency/outbox skeleton, app shell, design tokens.

### Phase 2 — 4-6 minggu

Catalog, customers, sales/payment, inventory ledger/balance, finance journal/expense, CSV import. Exit: completed sale dapat direkonsiliasi ke stock dan journal.

### Phase 3 — 3-4 minggu

Daily aggregates, dashboard metrics, health score v1, alerts, weekly report, notification. Exit: dashboard cocok dengan reference ledger.

### Phase 4 — 3-4 minggu

Read-only AI chat/SSE, metric tools, RAG/citations, prompt/version/cost logs, golden evals. Exit: numeric grounding dan isolation gate lulus.

### Phase 5 — setelah beta evidence

Billing, integrations, official WhatsApp/email, agent action proposals/approval, multi-outlet, supplier/PO sesuai validasi pasar.

## 4. Test pyramid and quality gates

- Unit: pricing, discount, tax, weighted-average COGS, stock, refund, journal balance, health score.
- Integration with real PostgreSQL: RLS, transaction, migration, outbox/idempotency.
- Concurrency: dua kasir menjual stok terakhir; retry request/payment/webhook.
- Contract: OpenAPI consumer/provider compatibility.
- E2E Playwright: signup → onboarding → product/import → stock → sale → dashboard → AI → report.
- Security: IDOR, tenant leak, injection, CSRF, SSRF, upload, rate limit, privilege escalation.
- Property tests: journal selalu balance; reversal mengembalikan net stock/amount.
- AI eval: Bahasa Indonesia, numeric exactness, citations, ambiguity, refusal, injection, PII, cross-tenant.
- Operations: forward/backward migration, backup restore, reconciliation, load and failover drills.

CI merge gate: format/lint/typecheck, unit/integration, migration lint, OpenAPI diff, SAST/SCA/secret scan, build. Pre-release gate menambah E2E, accessibility, performance, AI eval, container scan, restore/reconciliation evidence.

## 5. Environment and release flow

Feature branch → pull request → ephemeral/preview checks → merge to staging → migration + deploy → smoke/E2E/security/reconciliation → UAT → explicit production approval → canary/rolling deploy → post-deploy checks.

Rollback memakai previous application image; schema changes backward-compatible. Destructive schema cleanup selalu release terpisah. Jangan menggunakan production data mentah di dev/staging; gunakan synthetic/masked fixtures.

## 6. First implementation tickets

1. ADR stack, tenancy/RLS, weighted-average costing, internal double-entry, auth/session.
2. Repository/monorepo, package boundaries, lint/type/test/build pipelines.
3. PostgreSQL migrations untuk user/tenant/membership/RBAC/audit/idempotency/outbox.
4. Tenant context middleware + RLS policies + cross-tenant test matrix.
5. App/marketing design tokens and accessible primitives.
6. Signup/login/onboarding/business switch and invitation.
7. Catalog and inventory movement/balance with concurrency tests.
8. Sale completion transaction and reconciliation reference dataset.
9. Metrics dictionary implementation and aggregate worker.
10. HashMicro XAI adapter + smoke test `GET /models` dan `POST /chat/completions` dengan prompt non-sensitif.
11. AI tool contract/evaluation harness sebelum chat UI.

## 7. HashMicro XAI implementation contract

```text
RAMUNI_XAI_BASE_URL=https://xai.hashmicro.co/v1
RAMUNI_XAI_API_KEY=<secret-manager-reference-only>
RAMUNI_XAI_MODEL=gpt-5.5
RAMUNI_XAI_REASONING_MODEL=gpt-5.5-high
RAMUNI_XAI_TIMEOUT_MS=30000
RAMUNI_XAI_MAX_RETRIES=2
```

`.env.example` hanya berisi placeholder. MVP memakai Chat Completions; adapter Responses tidak aktif sampai payload dan contract test tervalidasi. Adapter wajib menyediakan PII masking, tenant budget/rate limit, timeout, bounded retry, circuit breaker, safe fallback, metadata logging, dan persistence ke `ai_model_runs`. Model tidak boleh membuat arbitrary SQL atau membuka tool di luar allowlist.

## 8. Full-product repository expansion

```text
apps/
  pos/
  mobile-pwa/
  platform-admin/
  developer-portal/
  data-pipeline/
packages/
  billing/
  entitlements/
  payments/
  procurement/
  accounting/
  offline-sync/
  automation/
  integrations-sdk/
  data-contracts/
  ai-agent-runtime/
  compliance/
```

Additional API modules: `organization`, `pos`, `cash-management`, `procurement`, `accounting`, `billing`, `entitlements`, `loyalty`, `campaigns`, `automation`, `offline-sync`, `devices`, `platform-ops`, `support`, `developer-platform`, `data-platform`, `documents`, and `search`.

## 9. Full-product delivery program

1. Foundation: tenancy, security, design system, CI/CD, metrics and observability.
2. Core usable: catalog, POS basics, sales, inventory, customers, expenses/journal, dashboard, XAI advisory.
3. Sellable GA: billing/entitlements, shifts/multi-tender/promos/refunds, procurement/transfers/stocktake, financial statements, support admin, DR/pentest/legal.
4. Growth: loyalty/campaigns, official WA/email, automation, custom reports, forecasts, first connectors and approved AI drafts.
5. Scale/Enterprise: SSO/SCIM, maker-checker, multi-currency/entity, API/webhooks, offline/peripherals, isolated tenancy.
6. Ecosystem: developer portal, connector SDK/marketplace, partner billing, vertical packs and governed AI-agent templates.

Billing/entitlement must exist before paid GA, not after product completion.

## 10. Additional test matrix

- Entitlement/quota race, proration, downgrade, past-due, dunning and billing webhook replay.
- Shift close/cash variance, split payment, partial fulfillment/refund and printer failure.
- PO -> receipt -> supplier bill -> payment -> stock/journal reconciliation.
- Period close/reopen, tax rounding, bank matching, AR/AP aging and multi-currency.
- Offline double-submit, device clock drift/revoke, reconnect and sync conflict.
- Connector duplicate/mapping conflict/outage and API scope/quota/deprecation.
- Support-access expiry, repair approval and audit immutability.
- Agent approval bypass, tool-policy violation, partial execution and compensation.
- Warehouse freshness/lineage/backfill, load/soak/failover/restore and DSAR deletion across all stores/vendors.

## 11. Required full-product artifacts

- Full ERD/data dictionary and requirement traceability matrix.
- Plan/entitlement/quota matrix and billing lifecycle state machine.
- POS/offline sync protocol and device/peripheral support matrix.
- Connector contract, public API/webhook version policy and developer sandbox guide.
- AI-agent risk/approval matrix and metric semantic catalog.
- Threat model, privacy data-flow/retention map and vendor/subprocessor register.
- SLO/SLI/error-budget catalog, restore/failover evidence, platform-admin/support runbook and release-readiness evidence pack.
