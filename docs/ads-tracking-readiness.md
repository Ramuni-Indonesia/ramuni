# Ads and Tracking Readiness

Status: not ready for paid spend. Ahrefs Analytics and Microsoft Clarity are loaded only on the production build; advertising, GA4, GTM, and conversion vendor tags remain disabled.

## Implemented foundation

- Canonical early-access, demo, contact, and typed thank-you routes exist.
- Lead forms fail closed when `PUBLIC_LEAD_ENDPOINT` is empty.
- The first-party consent interface defaults analytics and marketing choices to off.
- Static pages avoid unverified customer, pricing, integration, and outcome claims.
- Dummy articles and unapproved resource or claim pages remain gated from indexing.
- Ahrefs Analytics is loaded asynchronously with the approved site key on production pages only. It is an audience/SEO measurement signal, not a paid-media conversion tag.
- Microsoft Clarity is scheduled after the browser is idle (or a two-second fallback) so its third-party work is outside the initial render path; its existing consent payload remains `ad_Storage: denied` and `analytics_Storage: granted`.

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
