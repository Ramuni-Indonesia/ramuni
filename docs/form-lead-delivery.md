# Form and Lead Delivery Handoff

Status: the browser uses the CRM public lead v1 contract. Staging enables the endpoint only after the CRM origin allowlist and runtime health checks pass.

## Current client contract

- Form kinds: `early-access`, `demo`, and `contact`.
- Endpoint: `PUBLIC_LEAD_ENDPOINT` only; staging deploys with `https://crm.ramuni.id/v1/public/lead-submissions`.
- Empty endpoint: the form fails closed and exposes no direct WhatsApp bypass.
- Configured endpoint: browser sends canonical JSON with `Idempotency-Key` and `X-Form-Contract-Version: 1`.
- Required contact fields include name, email, E.164-normalized WhatsApp phone, company, industry, team size, intent, and contact consent.
- Visitor/session/capture identifiers are opaque and contain no PII. Retry keeps the idempotency key until the user edits the request.
- Attribution is allowlisted; referrer query/fragment and likely email/phone values are discarded.
- Only HTTP 201 with `status=accepted` and a receipt ID counts as success.
- Contact handoff opens the fixed official WhatsApp destination only after CRM acceptance; no submitted PII is placed in its URL.
- Current consent version: `2026-07-25`.

## Required server contract

- Accept only approved origins and methods over HTTPS.
- Validate and normalize every field server-side; cap lengths and reject unsafe input.
- Apply CSRF or an equivalent origin-bound control where applicable.
- Use bot controls, per-origin and per-identity rate limits, and idempotency.
- Store consent text/version and server receipt time with the lead.
- Encrypt PII in transit and at rest; restrict access and audit reads or exports.
- Keep PII out of URLs, analytics, pixels, third-party logs, traces, and alerts.
- Deliver through a retryable queue or outbox with deduplication, dead-letter handling, and operator alerts.
- Return a stable success response only after durable acceptance.
- Emit conversion events server-side only after acceptance and with a non-PII deduplication key.

## Acceptance evidence

Required tests: validation failures, duplicate submission, CSRF/origin rejection, bot/rate limiting, timeout and retry, queue failure, dead-letter recovery, consent persistence, PII-log scan, destination delivery, and conversion reconciliation.

The CRM endpoint and durable intake service exist at `crm.ramuni.id`. Before a staging release, apply the staging origin allowlist, recreate the two API replicas one at a time, verify health/CORS and a synthetic submission, then build the marketing artifact with `PUBLIC_LEAD_ENDPOINT` configured.
