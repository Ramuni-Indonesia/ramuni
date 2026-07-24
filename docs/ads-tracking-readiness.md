# Ads and Tracking Readiness

Status: not ready for paid spend. No advertising or analytics vendor script is loaded by the current site.

## Implemented foundation

- Canonical early-access, demo, contact, and typed thank-you routes exist.
- Lead forms fail closed when `PUBLIC_LEAD_ENDPOINT` is empty.
- The first-party consent interface defaults analytics and marketing choices to off.
- Static pages avoid unverified customer, pricing, integration, and outcome claims.
- Dummy articles and unapproved resource or claim pages remain gated from indexing.

## Required before tags are enabled

1. Approve privacy and cookie wording, consent version, and withdrawal behavior.
2. Map the consent event to all required Consent Mode v2 signals.
3. Provide test and production GTM, GA4, Google Ads, and Meta identifiers through approved secret or environment management.
4. Connect the lead endpoint and confirm that conversion events fire only after server acceptance.
5. Implement an `event_id` contract for browser/server deduplication where CAPI or enhanced conversion flows are approved.
6. Validate that URL, data layer, tag payloads, pixels, and error logs contain no PII or business data.
7. Preserve first-touch and last-touch attribution server-side; do not trust browser storage as the record of truth.
8. Reconcile test conversions against successfully stored leads.
9. Complete responsive, accessibility, public PSI, and final-domain landing-page QA.

## Channel state

| Channel | Current state | External blocker |
|---|---|---|
| GA4 and GTM | Not connected | Approved properties, consent mapping, and test evidence |
| Google Ads | Not connected | Account linking, conversion ownership, final URLs, and reconciliation |
| Meta Pixel and CAPI | Not connected | Business/domain verification, consent, event deduplication, and Test Events |
| Search Console and Bing | Not connected | Live domain ownership and sitemap submission |

Do not publish campaign-spend approval from this repository. Media budget, audiences, claims, and account access remain business-owner decisions.
