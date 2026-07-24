# Analytics Event Dictionary

Status: specification only. The site does not currently load GTM, GA4, Google Ads, Meta Pixel, or another analytics SDK.

The consent component stores a first-party choice and dispatches `ramuni:consent`. This event is not yet mapped to Google Consent Mode v2 or any vendor tag.

## Event contract

| Event | Valid trigger | Allowed properties | Conversion |
|---|---|---|---|
| `cta_clicked` | Major CTA click | `cta_text`, `cta_location`, `destination_url`, `page_type` | No |
| `navigation_clicked` | Header, footer, or menu link | `nav_label`, `nav_location`, `destination_url` | No |
| `form_started` | First interaction with an enabled form | `form_type`, `form_location` | No |
| `generate_lead` | Server confirms lead storage | `form_type`, `lead_type`, `page_type`, pseudonymous `event_id` | Yes |
| `demo_requested` | Server confirms demo request storage | `form_location`, `page_type`, pseudonymous `event_id` | Yes |
| `whatsapp_clicked` | Approved WhatsApp CTA click | `cta_location`, `page_type` | Micro |
| `sign_up_started` | Visitor enters the product-owned signup flow | `source_cta`, `page_type` | No |
| `sign_up` | Product confirms completed signup | `method`, non-PII `plan_context`, pseudonymous `event_id` | Yes |
| `pricing_viewed` | Pricing page view | `pricing_version` | No |
| `article_viewed` | Article view | `article_slug`, `category`, `author_slug` | No |
| `article_read` | Approved engagement threshold | `article_slug`, `scroll_depth`, `engaged_time` | No |
| `calculator_used` | A calculator produces a result | `calculator_type` | Micro |
| `template_downloaded` | Server or client confirms download | `template_slug`, `gated` | Micro |
| `consent_updated` | Consent choice is saved | consent signals and `consent_version` | No |

## Data rules

Never send name, email, phone, WhatsApp number, business name, message or textarea content, tenant or customer IDs, transaction values, financial records, or other business data to the data layer, analytics, pixels, URLs, or third-party error logs.

Attribution keys such as UTM values and click IDs require server-side validation and storage with the lead. They are not currently implemented by the static site.

## Activation blockers

- Approved GTM and analytics identifiers.
- Approved consent copy and Consent Mode mapping.
- Test streams or filters for staging traffic.
- Single-fire, consent, PII, and conversion-reconciliation tests.
- Server-confirmed lead and signup events with deduplication.
- Retention, access, deletion, and incident owners.
