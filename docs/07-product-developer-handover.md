# RAMUNI Product/App Developer Handover

## Tujuan

Untuk developer/agent yang membangun RAMUNI: web app, API, database, worker, dashboard, AI Companion, billing, POS, procurement, accounting, CRM, integrations, support dan operations. Baca `00-master-plan.md` sampai `04-implementation-code-plan.md` serta `09-full-product-capability-map.md` sebelum coding.

## Non-negotiables

- AI wajib memakai `https://xai.hashmicro.co` melalui backend.
- API key tidak boleh masuk repo, log, prompt, screenshot, handover, Obsidian, seed, atau `.env.example`.
- AI MVP read-only advisory; action future: preview -> approval -> idempotent execution -> audit receipt.
- Angka bisnis berasal dari deterministic metric tools, bukan tebakan model.
- Multi-tenancy wajib di DB, API, cache, object storage, vector retrieval, queue, dan logs.
- Stock memakai immutable ledger; finance memakai weighted-average COGS dan double-entry journal.

## Stack

- Next.js/TypeScript/Tailwind-Shadcn app.
- NestJS/Fastify modular-monolith API.
- PostgreSQL + pgvector + RLS; Redis + BullMQ.
- Deployables: `web`, `api`, `worker`, `scheduler`, `ai-evals`.
- Dev/staging/prod isolated total.

## HashMicro XAI contract

```text
RAMUNI_XAI_BASE_URL=https://xai.hashmicro.co/v1
RAMUNI_XAI_API_KEY=<secret-manager-reference-only>
RAMUNI_XAI_MODEL=gpt-5.5
RAMUNI_XAI_REASONING_MODEL=gpt-5.5-high
RAMUNI_XAI_TIMEOUT_MS=30000
RAMUNI_XAI_MAX_RETRIES=2
```

- Default MVP: `POST /v1/chat/completions`.
- Staging smoke test wajib untuk `GET /v1/models` dan `POST /v1/chat/completions`.
- Responses API hanya aktif setelah payload/contract test valid.
- Jika `model not found`, coba prefixless `gpt-5.5`, `gpt-5.4`, `gpt-5.4-mini`.
- Semua call lewat `AiGatewayAdapter`: timeout, bounded retry, circuit breaker, quota, telemetry, redaction.
- Log hanya metadata; jangan log key, PII, atau full prompt default.

## Build order

1. Monorepo dan CI/security gates.
2. ADR stack, tenancy/RLS, XAI, costing, journal, metric dictionary.
3. Migrations users/tenants/memberships/RBAC/audit/idempotency/outbox.
4. Tenant middleware + RLS + cross-tenant tests.
5. Auth/session/onboarding/business switch/invite.
6. Catalog dan inventory ledger/balance.
7. Atomic sale/payment/stock/journal/outbox.
8. CRM, expenses, aggregates, dashboard, report.
9. XAI adapter, AI metric tools, eval harness.
10. AI chat/SSE/citations/feedback dan insight workers.

## Database areas

- Identity: users, sessions, tenants, profiles, outlets, warehouses, memberships, roles, permissions, invitations, consents.
- Core: categories, units, products, variants, stock balances/movements, sales/items, payments, returns/refunds, customers, expenses, accounts, journal entries/lines.
- AI: daily metrics, health scores, insights, recommendations, reports, conversations/messages/model runs/tool calls/feedback.
- Governance: audit/security events, idempotency, outbox/inbox, imports, privacy requests.

## Acceptance tests

- Signup -> business -> invite role -> switch business.
- Stock balance sama dengan movement ledger.
- Concurrent sale tidak oversell di luar policy.
- Sale completion exactly-once membuat payment/stock/journal/outbox.
- Void/refund membuat reversal dan audit.
- Dashboard/report/AI sama untuk period dan metric version yang sama.
- AI abstain saat data kurang dan tidak bocor lintas tenant.
- XAI smoke test lulus tanpa key/PII di log.
- Backup restore dan stock/journal reconciliation lulus.

## Bukti yang wajib dikembalikan developer

- Branch/commit SHA, migration list, OpenAPI artifact.
- Env matrix tanpa nilai secret.
- XAI capability/smoke-test evidence.
- AI golden-set, tenant-isolation, dan E2E reports.
- Observability/alert refs, known limitations, deployment/rollback steps.

## Full-product handover rule

Developer harus mengembalikan capability traceability matrix yang memetakan requirement ID → epic/story → schema/API → permission/entitlement → tests → manual → release evidence. Feature flag tidak boleh menggantikan paid entitlement. Produk belum Sellable GA sampai billing, POS daily close, procurement, stock/finance reconciliation, support admin, legal/security and DR gates selesai.

For offline and external order delivery, read `12-story-point-estimate.md`, `13-offline-and-omnichannel-order-plan.md`, and `14-product-owner-decision-register.md`. Direct Grab/Gojek claims require partner contract, sandbox/certification, reconciliation, outage recovery and production-pilot evidence.
