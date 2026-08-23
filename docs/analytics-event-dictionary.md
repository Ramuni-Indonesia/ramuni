# Analytics Event Dictionary

Status: client-side consent and lead-acceptance signals are implemented. Ahrefs Analytics and Microsoft Clarity run on the production build for aggregate audience/session measurement; GTM, GA4, Google Ads, Meta Pixel, and conversion delivery remain specification only.

The consent component stores a first-party choice and dispatches `ramuni:consent`. This event is not yet mapped to Google Consent Mode v2 or any vendor tag. Ahrefs and Clarity do not receive the lead event payloads or form values.

Enabled lead forms capture an allowlisted set of UTM parameters and advertising click IDs. The browser retains the first recorded touch and updates the last touch when a later attributed visit occurs. Both records are sanitized, limited in length, serialized into hidden form fields, and sent only with the lead submission. The receiving service must still validate these values before storage or use.

After the configured lead endpoint returns a successful HTTP response, the form dispatches `ramuni:lead:accepted` with `leadType`, `attributionPresent`, and `acceptedAt`, then redirects to the matching thank-you page. Calculator result and template download interactions dispatch `ramuni:calculator:used` and `ramuni:template:downloaded` with slug/type metadata only. These browser events contain no submitted form values, calculator inputs, or business records. They are integration signals and are not yet mapped to vendor conversion events.

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
| `pricing_view` | Pricing page view alias for commercial validation | `page_type` | No |
| `pricing_plan_click` | Visitor selects a plan CTA | `plan`, `billing_period`, `location` | No |
| `free_trial_click` | Visitor starts a trial/tour CTA | `location`, `destination` | No |
| `demo_request` | Visitor starts a demo/consultation CTA or the CRM accepts one | `location`, `form_type` | Yes after server acceptance |
| `contact_sales` | Visitor starts a sales consultation or the CRM accepts one | `location`, `form_type` | Yes after server acceptance |
| `feature_view` | Feature index/detail view or click | `feature`, `location` | No |
| `faq_open` | Visible FAQ accordion opens | `question_key`, `page_type` | No |
| `annual_toggle` | Pricing period changes to annual | `location` | No |
| `signup_started` | Visitor starts the free-trial/tour journey; product-owned account signup remains separate | `source_cta`, `page_type` | No |
| `signup_completed` | Reserved for a product-owned confirmed signup | `method`, non-PII `plan_context`, pseudonymous `event_id` | No; not emitted by marketing tour |
| `article_viewed` | Article view | `article_slug`, `category`, `author_slug` | No |
| `article_read` | Approved engagement threshold | `article_slug`, `scroll_depth`, `engaged_time` | No |
| `calculator_used` | A calculator produces a result | `calculator_type` | Micro |
| `template_downloaded` | Server or client confirms download | `template_slug`, `gated` | Micro |
| `consent_updated` | Consent choice is saved | consent signals and `consent_version` | No |

## Data rules

Never send name, email, phone, WhatsApp number, business name, message or textarea content, tenant or customer IDs, transaction values, financial records, or other business data to the data layer, analytics, pixels, URLs, or third-party error logs.

Implemented attribution keys are `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `utm_id`, `gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`, `ttclid`, and `li_fat_id`. The static site records first-touch and last-touch values plus landing path and capture time. The lead service must validate, normalize, retain, and delete these values under the same approved controls as the lead.

## Activation blockers

- Approved GTM and analytics identifiers.
- Approved consent copy and Consent Mode mapping.
- Test streams or filters for staging traffic.
- Single-fire, consent, PII, and conversion-reconciliation tests.
- Server-confirmed lead and signup events with deduplication.
- Retention, access, deletion, and incident owners.
