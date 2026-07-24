# RAMUNI Architecture, Database, AI, and Security Plan

## 1. Architecture decision

Gunakan **modular monolith** hingga product-market fit, dengan deployable terpisah untuk marketing, app web, API, worker, scheduler, dan AI evaluations. Ini menjaga transaksi sale-stock-finance tetap atomik tanpa kompleksitas microservices, sementara boundary module memungkinkan ekstraksi nanti.

Recommended baseline:

- Next.js + TypeScript + Tailwind/Shadcn untuk marketing dan app.
- NestJS/Fastify + TypeScript untuk REST API `/v1` dan SSE AI streaming.
- PostgreSQL + `pgvector`; Redis + BullMQ; S3-compatible object storage.
- HashMicro XAI gateway `https://xai.hashmicro.co/v1` sebagai AI provider awal melalui backend adapter.
- OpenTelemetry + managed logs/metrics/traces/error tracking.
- Container deployment; database/Redis/worker private; CDN/WAF/load balancer public.
- Environment dev/staging/production terisolasi total: account, DB, bucket, keys, domains, dan secrets.

Marketing/CMS menggunakan runtime dan permission boundary terpisah dari tenant app walau tetap dapat berada dalam monorepo.

## 2. Runtime view

```text
Browser → CDN/WAF
          ├─ Marketing Next.js → Public Content API/CMS
          └─ App Next.js → REST API / AI SSE
                            ├─ PostgreSQL + pgvector
                            ├─ Redis / queue
                            ├─ Object storage
                            └─ Worker / scheduler → LLM, email, WA, integrations
```

Konsistensi kritis berlangsung sinkron dalam satu DB transaction. Email, insight, report, webhook, dan integration sync berjalan async melalui transactional outbox, inbox deduplication, retry+jitter, DLQ, replay, dan reconciliation.

## 3. Bounded contexts

Identity & Access; Tenant & Business; Catalog & Pricing; Sales; Inventory & Procurement; Finance; CRM; Analytics & Insight; AI Companion; Notification & Integration; Public Content; Platform Governance.

## 4. Multi-tenancy rules

- Shared DB/schema dengan `tenant_id NOT NULL` dan PostgreSQL Row-Level Security.
- Tenant aktif berasal dari authenticated membership, bukan header bebas client.
- Request transaction menjalankan `SET LOCAL app.tenant_id`.
- Composite foreign keys `(tenant_id, referenced_id)` mencegah referensi lintas tenant.
- Cache keys, object prefixes, aggregates, jobs, logs, dan vector retrieval tenant-scoped.
- Job membawa tenant ID tetapi selalu re-authorize sebelum akses.
- Baseline schema menyiapkan outlet/warehouse walau beta UI dapat dibatasi satu outlet.
- Automated negative tests mencoba cross-tenant read/write/search/file/cache.

## 5. Database conventions

- UUIDv7; `timestamptz` UTC; business timezone default `Asia/Jakarta`.
- Uang `numeric(19,4)` dan dikirim API sebagai decimal string; currency ISO-4217.
- Quantity `numeric(19,4)`; jangan gunakan float.
- Mutable row memiliki timestamps dan optimistic `version`.
- Ledger tidak dihapus; koreksi melalui reversal/adjustment.
- Index tenant tables diawali `tenant_id`; uniqueness tenant-aware.
- Stock source of truth adalah movement ledger, bukan `products.stock`.
- Weighted-average costing sebagai baseline; finance internal double-entry walau UI tetap sederhana.

## 6. Logical schema

### Identity dan tenant

`users`, `user_identities`, `sessions`, `mfa_credentials`, `tenants`, `business_profiles`, `outlets`, `warehouses`, `memberships`, `roles`, `permissions`, `role_permissions`, `membership_roles`, `invitations`, `consent_records`.

Penting: `businesses.user_id` dan `users.role enum` dari draft diganti dengan memberships + RBAC many-to-many.

### Catalog dan inventory

`categories`, `units`, `products`, `product_variants`, `product_barcodes`, `price_lists`, `price_list_items`, `tax_codes`, `stock_balances`, `inventory_movements`, `stock_alert_rules`, `inventory_lots`, `stocktakes`, `stocktake_items`, `suppliers`, `supplier_products`, `purchase_orders`, `purchase_order_items`, `goods_receipts`, `goods_receipt_items`.

Critical constraints:

- Unique `(tenant_id, sku)` dan `(tenant_id, barcode)`.
- Unique balance `(tenant_id, warehouse_id, variant_id)`.
- Signed movement quantity non-zero; reversal menunjuk movement asal.
- Atomic update/row lock mencegah oversell.

### Sales dan finance

`sales_orders`, `sales_order_items`, `payments`, `sales_returns`, `sales_return_items`, `refunds`, `accounts`, `accounting_periods`, `journal_entries`, `journal_lines`, `expense_categories`, `expenses`, `bank_accounts`, `reconciliations`.

Completed sale menyimpan immutable item snapshot: SKU/name, quantity, unit price, discount, tax, dan cost-at-sale. Satu transaction menyimpan payment, movement/balance, revenue/COGS journal, dan outbox. Constraint/trigger memastikan total debit = credit.

### CRM dan analytics

`customers`, `customer_addresses`, `customer_tags`, `customer_tag_links`, `customer_segments`, `customer_segment_memberships`, `customer_notes`, `customer_activities`, `business_metric_daily`, `product_metric_daily`, `customer_metric_daily`, `health_score_snapshots`, `insights`, `recommendations`, `report_definitions`, `report_runs`, `report_artifacts`.

Phone/email dienkripsi bila perlu dan exact-match search memakai blind index/hash. Dashboard membaca aggregate tables yang direfresh incremental dan direkonsiliasi nightly.

### AI

`ai_conversations`, `ai_messages`, `ai_context_snapshots`, `knowledge_sources`, `knowledge_documents`, `knowledge_chunks`, `ai_model_runs`, `ai_tool_calls`, `ai_feedback`, `agent_action_requests`, `agent_action_executions`, `prompt_versions`, `ai_eval_runs`.

Draft `ai_conversations(message,response)` dinormalisasi agar multi-turn, citations, context, model cost, tool calls, evaluation, dan deletion dapat dilacak.

### Integration, content, dan governance

`notification_preferences`, `notifications`, `notification_deliveries`, `provider_connections`, `sync_jobs`, `sync_cursors`, `webhook_endpoints`, `webhook_deliveries`, `content_posts`, `content_categories`, `content_tags`, `landing_pages`, `media_assets`, `seo_metadata`, `redirects`, `leads`, `marketing_consents`, `audit_logs`, `security_events`, `idempotency_keys`, `outbox_events`, `inbox_messages`, `import_batches`, `import_rows`, `import_errors`, `data_subject_requests`, `data_exports`, `deletion_requests`, `retention_holds`, `feature_flags`.

## 7. API contract

- REST `/v1`, OpenAPI, cursor pagination, RFC 7807 errors.
- `Idempotency-Key` wajib pada sale/payment/import/agent action.
- `If-Match`/version untuk optimistic concurrency; `X-Request-ID` untuk tracing.
- Runtime schema validation dan server-side field allowlist.
- HMAC signed, timestamped, replay-protected webhooks.
- Tidak ada arbitrary SQL dari LLM; AI hanya memakai typed semantic tools.

## 8. AI/RAG safety architecture

### HashMicro XAI provider requirement

- Base URL: `https://xai.hashmicro.co/v1`.
- Endpoint default MVP: `POST /v1/chat/completions`; Responses API tidak aktif sampai contract test dan payload-nya tervalidasi.
- Model dikonfigurasi lewat environment. Baseline awal `gpt-5.5`; optional reasoning route `gpt-5.5-high` setelah cost/latency diuji.
- API key hanya melalui secret manager/environment `RAMUNI_XAI_API_KEY`; dilarang menyimpannya di repo, log, seed, handover, atau Obsidian.
- Jika `model not found`, coba prefixless IDs seperti `gpt-5.5`, `gpt-5.4`, dan `gpt-5.4-mini`.
- Semua call melalui `AiGatewayAdapter` agar masking, retry, rate limit, budget, telemetry, dan fallback konsisten.
- Pre-production smoke test wajib memverifikasi `GET /v1/models`, `POST /v1/chat/completions`, error mapping, timeout, dan tidak adanya API key/PII di log.

1. Authorize actor + tenant + permission.
2. Classify intent dan pilih allowlisted tool.
3. Tool menjalankan deterministic metric/query, bukan generated SQL.
4. Retrieval selalu tenant-filtered sebelum similarity ranking.
5. Mask/minimize PII sebelum provider call.
6. Model menyusun penjelasan dari evidence snapshot.
7. Validator memeriksa number/citation/policy; bila gagal, abstain.
8. Simpan model/prompt version, token/cost, latency, outcome, dan feedback.

Dokumen selalu dianggap data tidak tepercaya. Provider harus dinilai untuk no-training/no-retention, lokasi pemrosesan, DPA, dan transfer lintas batas. AI memiliki budget/rate limit per tenant. Future actions selalu preview → explicit approval → idempotent execution → audit receipt/compensation.

## 9. Security controls

- Managed OIDC atau Argon2id, HttpOnly/Secure/SameSite cookies, rotation, CSRF, MFA untuk admin dan owner-sensitive actions.
- RBAC + optional outlet scope + least privilege + step-up auth.
- TLS 1.2+, encryption at rest/KMS, secrets manager, rotation, environment isolation.
- WAF, layered rate limits, bot protection, CSP/HSTS, output encoding, SSRF protection.
- Upload MIME/content validation, size limits, malware scanning, signed URLs.
- SAST, SCA, secret, container, IaC, migration, and license scanning in CI.
- OWASP ASVS L2/API Top 10 review; pentest sebelum paid production.
- Support impersonation hanya dengan reason, approval, expiry, visible banner, dan audit.

Privasi memerlukan data inventory/classification, privacy notice Bahasa Indonesia, purpose/legal basis, granular consent dan withdrawal, retention schedule, access/correction/export/deletion, vendor DPA, cross-border assessment, legal hold, deletion across DB/vector/object/cache/vendor, serta incident workflow. Lakukan legal review UU PDP, PP 71/2019, PSE Privat, dan BI/OJK bila scope menyentuh layanan keuangan. Rancangan ini bukan opini hukum.

## 10. Reliability and observability

Beta: 99.5%, RPO 24 jam, RTO 4 jam. Paid GA target: 99.9%, PITR >=35 hari, RPO 5 menit, RTO 60 menit setelah diuji.

Pantau API/error/latency, DB locks/pool/slow query, queue lag/retry/DLQ, import errors, stock/journal reconciliation, report duration, auth/security events, webhook delivery, serta AI first-token latency, grounding, tokens, and cost. Log terstruktur memuat request/trace IDs dan pseudonymous actor/tenant; jangan mencatat secret, full PII, atau full prompt secara default.

## 11. Migration and data rollout

Gunakan numbered immutable SQL migrations dan expand-contract: deploy compatible schema → compatible app → resumable backfill → count/financial/stock verification → feature flag → cleanup pada release terpisah. Lint lock risk dan hindari blocking DDL saat jam operasi.

CSV import: upload → parse staging rows → normalize → preview/errors → dry-run → idempotent commit → reconciliation. Source checksum dan mapping disimpan untuk dedup/audit.

## 12. Full-product architecture expansion

Tambahkan bounded contexts: `organization`, `pos`, `procurement`, `accounting`, `billing-entitlements`, `loyalty-campaigns`, `workflow-automation`, `offline-sync-devices`, `developer-platform`, `platform-admin-support`, `data-platform`, dan `agent-runtime`. Tetap modular monolith; ekstraksi service hanya berdasarkan load, team ownership, security boundary, atau compliance yang terukur.

### Commercial authorization order

Setiap paid operation memeriksa: tenant active → subscription usable → entitlement available → quota sufficient → user permission → approval policy. Feature flag hanya untuk rollout/experiment/kill switch dan tidak boleh menggantikan entitlement berbayar.

### Additional schema families

- Billing: `plans`, `plan_versions`, `features`, `entitlements`, `subscriptions`, `subscription_items`, `trials`, `usage_meters`, `usage_events`, `billing_invoices`, `billing_payments`, `credit_notes`, `coupons`, `dunning_cases`, `billing_webhook_events`.
- POS: `registers`, `register_devices`, `register_shifts`, `cash_drawer_movements`, `sales_invoices`, `receipts`, `promotions`, `promotion_redemptions`, `fulfillments`, `shipments`, `number_sequences`.
- Procurement/inventory: `inventory_transfers`, `inventory_transfer_items`, `stock_reservations`, `replenishment_rules`, `replenishment_suggestions`, `purchase_requisitions`, `supplier_quotations`, `supplier_invoices`, `purchase_returns`, `landed_costs`, `serial_numbers`, `unit_conversions`, `inventory_closures`.
- Finance: `fiscal_years`, `receivables`, `payables`, `payment_allocations`, `bank_transactions`, `bank_import_batches`, `bank_matching_rules`, `budgets`, `fixed_assets`, `depreciation_runs`, `tax_periods`, `financial_statement_runs`.
- CRM/growth: `leads`, `pipelines`, `opportunities`, `crm_tasks`, `campaigns`, `campaign_audiences`, `campaign_messages`, `journeys`, `loyalty_accounts`, `loyalty_transactions`, `rewards`, `customer_merge_history`.
- Automation/AI: `automation_definitions`, `automation_versions`, `automation_runs`, `automation_steps`, `automation_approvals`, `agent_definitions`, `agent_versions`, `agent_runs`, `agent_steps`, `agent_tool_policies`, `agent_approval_requests`, `agent_artifacts`, `model_routes`, `tenant_ai_budgets`, `ai_safety_incidents`.
- Integration/platform: `oauth_applications`, `oauth_grants`, `api_clients`, `api_scopes`, `connector_configs`, `connector_mappings`, `external_id_maps`, `sync_conflicts`, `provider_health_events`, `support_cases`, `support_access_requests`, `impersonation_sessions`, `admin_action_requests`, `service_incidents`.
- Offline/data: `client_devices`, `device_sessions`, `offline_commands`, `command_receipts`, `sync_sessions`, `device_revocations`, `metric_definitions`, `metric_versions`, `pipeline_runs`, `data_quality_checks`, `dataset_freshness`.

Gunakan nama berbeda untuk customer/business payments dan SaaS subscription payments agar audit dan reconciliation tidak ambigu.

### Payment, integration, and offline boundaries

- Minimize PCI scope with hosted checkout/tokenized provider; never store PAN/CVV.
- Provider webhooks require signature rotation, replay window, idempotency, inbox/DLQ and reconciliation.
- Offline store is never source of truth. Use device identity, encrypted minimum cache, client idempotency key, local command outbox, server cursor and entity-specific conflict policy.
- Offline may allow low-risk cash sale within limits; refunds, price overrides, stock adjustments, role changes and sensitive finance stay online/approved.
- Connector adapters own OAuth/tokens, mappings, external IDs, sync cursor, replay and degraded-mode behavior.

### Data platform evolution

PostgreSQL OLTP remains transactional truth. When thresholds are exceeded, outbox/CDC feeds object storage or warehouse/read replica. A versioned semantic metric layer is the single source for dashboards, reports, API and AI. Track lineage, freshness, quality checks, late events and backfills. AI must not run heavy analytics on primary OLTP.

### Platform administration

Platform admin is a separate application/trust boundary, not a tenant super-admin role. Support access requires request, reason, approval, expiry, visible banner and audit. Stock/financial ledgers cannot be edited directly; repair uses previewed commands, approvals, reconciliation and receipts.

### Full AI-agent governance

Agent runtime needs versioned definition/tool policy, delegated authorization with expiry, bounded steps/budget/time, dry-run preview, risk-based approval, idempotent execution, step receipts, partial-failure compensation, human escalation, kill switch, shadow mode and golden eval. No arbitrary SQL, HTTP, shell or dynamic tool discovery.

### Paid-GA SRE design

- Multi-AZ database, replica/failover, PITR and immutable encrypted backups.
- Backup DB, objects, configuration, CMS and encryption-key metadata.
- SLI/SLO/error budgets for login, sale completion, stock update, billing, report and AI.
- Restore/failover/load/soak/chaos drills with measured RPO/RTO.
- Runbooks for DB, XAI, payment, messaging, queue, storage, credential, tenant leak and corrupt ledger incidents.
- Degraded modes: core sales continue when AI is down; reporting shows freshness lag; webhooks replay after provider recovery.
- Security adds SBOM, artifact signing/provenance, vulnerability SLA, vendor/DPA register, access review, tamper-evident audit, DPIA/AI risk review and breach decision workflow.
