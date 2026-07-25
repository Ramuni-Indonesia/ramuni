# Security Policy

RAMUNI is a proprietary product repository. Do not disclose vulnerabilities in public issues, pull requests, discussions, or social channels.

## Reporting

Use the contact path published in [`public/.well-known/security.txt`](public/.well-known/security.txt). Include enough detail for triage, but do not include customer data, production secrets, credential material, or exploit automation that could harm third parties.

## Repository rules

- Never commit personal access tokens, API keys, private keys, cookies, database exports, customer records, or production `.env` files.
- Keep lead endpoint, analytics, advertising, and integration secrets outside the public build.
- Public pages must remain evidence-gated until the relevant product, legal, pricing, security, or resource owner signs off.
- Use synthetic data for screenshots, demos, examples, tests, and documentation unless a formal data approval exists.

The CI repository guard rejects common committed credential patterns, but manual review is still required.
