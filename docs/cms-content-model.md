# CMS Content Model Handoff

Status: contract only. No CMS, preview API, webhook, or remote content store is connected in the current Astro delivery.

## Current source of truth

- Marketing page data lives in `src/data/` and page-level Astro files.
- Blog fixtures live in `src/content/blog/` and are validated by `src/content.config.ts`.
- The three blog articles are dummy editorial fixtures and remain `noindex,follow`.
- A later CMS adapter must preserve the route, metadata, review, and release contracts below. It must not make draft content public by default.

## Required entries

### Article

Required fields: `title`, `slug`, `description`, `dek`, `cover`, `coverAlt`, `publishedAt`, `category`, `categorySlug`, `authorName`, `authorSlug`, `reviewStatus`, `editorialStatus`, `readingTime`, `takeaways`, `updateSummary`, `ctaType`, `draft`, and `noindex`.

Recommended media fields: `coverWidth` and `coverHeight` as positive integers. They preserve the image aspect ratio in article cards, social metadata, and article detail pages. Existing CMS records remain compatible and fall back to `1200 x 675` when these fields are absent. `cover` remains CMS-managed and may point to the approved HTTPS CDN or R2 media URL.

Optional fields: `updatedAt`, `tags`, `reviewerName`, `reviewerSlug`, `sources`, `disclaimer`, `related`, and `featured`.

Current enums:

- `reviewStatus`: `draft-template`, `needs-review`, `reviewed`
- `ctaType`: `early-access`, `demo`, `product`

Publication invariant: an article is eligible for public indexing only when it is not a draft, has completed the required editorial or subject review, has final sources where claims need them, and the production environment indexing gate is open.

### Author and reviewer

Fields: `name`, `slug`, `role`, `shortBio`, `longBio`, `expertise`, `avatar`, `avatarAlt`, `profileStatus`, and optional approved social links. Reviewer identity is required for finance, AI, security, privacy, and legal-sensitive content before public indexing.

### Category and tag

Fields: `name`, `slug`, `description`, `status`, and `noindex`. A taxonomy archive stays noindex until it has useful unique introduction copy and enough reviewed content.

### Marketing page

Fields: `title`, `slug`, `description`, `pageType`, `sections`, `primaryCta`, `secondaryCta`, `availabilityStatus`, `claimEvidenceIds`, `owner`, `reviewers`, `noindex`, and `updatedAt`. Product, solution, role, industry, security, calculator, and resource entries must retain their existing release gates.

## CMS controls still required

- Role-based access, MFA, audit history, revision restore, and signed preview.
- Rich-text allowlist and sanitization at publish and render boundaries.
- Asset type, size, dimension, and alt-text validation.
- Unique slug and canonical validation.
- Webhook authentication, replay protection, idempotency, and build failure visibility.
- Content export and backup recovery test.

These controls are external blockers. They have not been implemented or verified by the static site.
