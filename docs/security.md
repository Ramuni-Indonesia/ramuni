# Marketing Site Security Handoff

Status: static application safeguards are partial. Hosting, lead service, CMS, identity, monitoring, and production security controls require separate implementation and evidence.

## Current repository controls

- Astro produces static HTML; no marketing-site database or server session exists here.
- Public environment indexing is fail-closed outside an explicitly enabled production build.
- Lead forms fail closed without a configured endpoint.
- No analytics or advertising vendor script is currently loaded.
- Consent defaults non-essential categories to off.
- `.env` files are ignored except `.env.example`; no secret belongs in a `PUBLIC_*` variable because Astro exposes it to the browser.
- Dependency audit is part of CI.
- `/.well-known/security.txt` exists, but currently points to the general contact and security pages rather than a dedicated verified security mailbox.

## Hosting controls required

- HTTPS redirect and HSTS after domain validation.
- Content Security Policy tested against the final asset, form, and analytics origins.
- `X-Content-Type-Options: nosniff`, strict `Referrer-Policy`, and minimal `Permissions-Policy`.
- Cache rules that separate immutable assets from HTML and sensitive responses.
- Protected preview and staging access; `noindex` is not access control.
- Rate limiting, bot defense, DDoS protection, origin restrictions, and safe error pages.
- Secret management, least-privilege deployment identity, signed artifacts, and auditable promotion.
- PII-scrubbed logs, alerting, incident ownership, retention, backup, and restore tests.

## Application controls still external

- The lead service controls listed in `form-lead-delivery.md`.
- CMS RBAC, MFA, signed preview, audit trail, sanitization, upload validation, and webhook authentication.
- Product authentication origin and safe handoff for `/masuk`.
- Consent-aware GTM and advertising tags with a verified PII scan.
- SAST, secret scanning, dependency policy, and incident response evidence in the deployment platform.

Do not infer certifications, compliance status, encryption architecture, uptime, data residency, or vendor controls from this static repository. Public security copy remains evidence-gated.
