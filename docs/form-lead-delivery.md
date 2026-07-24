# Form and Lead Delivery Handoff

Status: the browser form shell is implemented; no production lead service is configured or verified.

## Current client contract

- Form kinds: `early-access`, `demo`, and `contact`.
- Endpoint: `PUBLIC_LEAD_ENDPOINT` only.
- Empty endpoint: fields and submit controls are disabled and no form action is emitted.
- Configured endpoint: browser sends `POST` with `FormData` and requests JSON.
- Non-2xx or network failure: inline failure status; no success redirect.
- Success: redirect to the matching typed thank-you route.
- Payload fields currently include `name`, `email`, `business`, `industry`, `businessSize`, `intent`, optional `need`, `consent`, `leadType`, and `consentVersion`.
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

The endpoint URL, hosting owner, CRM or inbox destination, retention period, deletion workflow, on-call owner, and recovery target remain external blockers.
