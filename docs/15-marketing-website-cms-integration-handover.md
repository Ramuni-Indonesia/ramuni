# RAMUNI Marketing Website to CMS Integration Handover

Date: 25 July 2026

Audience: marketing website/blog developer, CMS developer, QA, SEO, Product, Security

Current public stack: Astro 7 static output
Target CMS baseline: headless CMS + PostgreSQL; Astro remains the public renderer

## Verdict

The CMS plan is functionally compatible with the current marketing website, blog, money-site pages and resource routes. It covers content modelling, workflow, preview, publishing, SEO/AEO, redirects, media, migration, security and operations.

It is not plug-and-play yet. The current website still reads local Markdown, TypeScript data and page-level constants. Before cutover, both teams must implement and lock the delivery contract, page-type schemas, Astro adapter, preview, publish webhook, migration/reconciliation and rollback described here.

## Current website truth

| Current source | Current responsibility | Target CMS ownership |
|---|---|---|
| `src/content.config.ts` | Astro blog validation | Article delivery DTO and contract fixtures |
| `src/content/blog/*` | Local article fixtures | Article revisions, body blocks, sources and editorial state |
| `src/data/site.ts` | Header/footer, product/solution/role/industry catalog, resources | Global site settings plus entity catalog records |
| `src/data/productDetails.ts` | Product detail structured content | Product page schema and section blocks |
| `src/data/solutionDetails.ts` | Solution detail structured content | Solution page schema and section blocks |
| `src/data/pageNarratives.ts` | Product/solution narrative sections | Ordered, versioned structured blocks |
| `src/pages/produk/[slug].astro` | Product template and route generation | Remains Astro template; consumes published product records |
| `src/pages/solusi/[slug].astro` | Solution template and route generation | Remains Astro template; consumes published solution records |
| `src/pages/industri/[slug].astro` | Industry content partly embedded in page code | Industry schema and published records |
| `src/pages/untuk/[slug].astro` | Persona/role content partly embedded in page code | Persona schema and published records |
| `src/pages/blog/*` | Blog archive/detail/category/author/trust templates | Remains Astro rendering; consumes published CMS records |
| `src/pages/panduan`, `template`, `kalkulator`, `kamus-bisnis` | Resource hubs/details | Resource collections and delivery records |
| `src/layouts/BaseLayout.astro` | Metadata, canonical, schema, consent shell | Remains website-owned; consumes approved SEO/schema fields |
| `public/website-original/*` and approved brand assets | Public media | CMS DAM usage mapping; brand master remains approved kit |
| `docs/url-map.csv` | Route/indexability/release registry | Migration and reconciliation source; CMS route registry |

## Required CMS collections and globals

Do not model the whole money-site as one untyped `marketing_page` JSON blob. Implement versioned schemas for:

1. `articles`, `authors`, `reviewers`, `categories`, `tags`, `topic_clusters`;
2. `product_pages` and product catalog records;
3. `solution_pages`;
4. `industry_pages`;
5. `persona_pages` for `/untuk/*`;
6. `guides`, `templates`, `calculators`, `glossary_terms` and help content;
7. `landing_pages`, legal/policy pages and approved trust pages;
8. `media_assets`, rights, variants, focal points and usage;
9. `redirects`, slug history and canonical ownership;
10. `claim_evidence`, product availability and release gates;
11. global `site_settings`, `header_navigation`, `footer_navigation`, CTA configuration and featured-resource references.

The existing CMS handover's common fields, structured-block allowlist, workflow, security and delivery-snapshot rules apply to every collection.

## Canonical delivery contract

The CMS team owns the OpenAPI/JSON Schema; the website team owns a generated or schema-validated TypeScript client. Required public read endpoints remain:

```text
GET /v1/cms/delivery/routes?locale=id-ID
GET /v1/cms/delivery/content/{canonicalPath}
GET /v1/cms/delivery/collection/{type}?cursor=...
GET /v1/cms/delivery/redirects
```

Every delivered record must include:

```text
id, content_type, schema_version, locale
canonical_path, slug, route_family
published_revision_id, content_version
published_at, updated_at
indexability, canonical, sitemap_eligible
seo, social, schema_entities
owner/reviewer public references where relevant
typed content payload and relations
ETag/payload hash
```

Public delivery returns only the approved published revision. Draft, approval notes, internal evidence, raw audit data and unpublished media must never appear in this API.

## Website repository changes required

### 1. Add a content gateway

Create one server/build-time interface, for example:

```ts
interface MarketingContentGateway {
  listRoutes(input: RouteQuery): Promise<PublishedRoute[]>;
  getPage<T extends PublishedPage>(path: string): Promise<T | null>;
  listCollection<T extends PublishedPage>(type: string): Promise<T[]>;
  getRedirects(): Promise<PublishedRedirect[]>;
}
```

Implement:

- `LocalContentGateway` for current Markdown/TypeScript sources during migration;
- `CmsDeliveryGateway` for the published CMS API;
- a controlled staging-only comparison mode that reads both and reports differences.

Pages and components must not call the CMS directly. They call this gateway so the source can be switched and tested without rewriting templates.

### 2. Move route generation behind the gateway

Replace direct `products.map`, `solutionDetails.map`, inline industry/role arrays and `getCollection('blog')` route ownership with build-time `listRoutes`/typed collection calls. Preserve current canonical paths and trailing-slash policy.

### 3. Preserve typed templates

Keep Astro templates for product, solution, industry, persona, article and resources. Map CMS records into stable view models. Do not let arbitrary CMS HTML or layout JSON bypass component, accessibility, performance or brand controls.

### 4. Add signed preview

- Preview resolves an exact content ID, revision ID and locale.
- Token is short-lived, scoped, revocable and server-validated.
- Preview is `noindex`, `no-store`, excluded from sitemap and protected from public sharing.
- Browser-visible code never contains CMS admin credentials or a permanent delivery secret.
- Preview supports 320, 390, 768, 1024 and 1440 review widths.

### 5. Connect publishing

CMS publish creates an immutable delivery snapshot and signed event. The website build/revalidation adapter must:

1. verify HMAC, timestamp and replay window;
2. deduplicate by event ID/content version;
3. start a build against the requested snapshot;
4. run route, metadata, link, schema and accessibility smoke tests;
5. publish/cache-invalidate only when checks pass;
6. report success/failure to CMS;
7. keep the last good website active on failure.

### 6. Preserve release gates

The current `draft`, `noindex`, evidence approval and environment indexing behavior remains authoritative during migration. CMS approval does not silently override the production environment gate. Product, pricing, integration, customer, security and ROI claims remain blocked until evidence and owner approval exist.

### 7. Keep forms separate

CMS may deliver a `form_reference` or CTA identifier. Website lead forms continue to submit to the versioned CRM Lead API. CMS must never receive lead PII, consent records, WhatsApp messages or pipeline state.

## Field-mapping requirements

### Article parity

At minimum preserve every current `src/content.config.ts` field:

- title, description, dek, cover/alt;
- publish/update dates;
- category/category slug and tags;
- author/reviewer identity;
- review/editorial status;
- reading time, takeaways, sources, disclaimer and update summary;
- related records, CTA type, featured, draft and noindex.

CMS may add structured fields, but the adapter must fail a build if an indexable article loses required metadata, source/reviewer requirements or valid relations.

### Money-site parity

For product, solution, industry and persona routes preserve:

- existing slug and canonical;
- hero eyebrow/title/description and CTA contract;
- availability/release state;
- layouts and ordered sections;
- workflows, capabilities, examples, metrics labelled as synthetic where applicable;
- related products/solutions/industries/resources;
- FAQ and schema eligibility;
- claim-evidence references;
- navigation/footer visibility and order.

### Global navigation parity

CMS global settings may select published entities and featured content, but the website keeps presentation, keyboard behavior and maximum menu density. Publishing must fail when navigation targets an unpublished, redirected or missing record.

## Migration and cutover

### Phase A — Freeze and map

- Freeze `docs/url-map.csv`, local content and data hashes.
- Approve one CMS schema version and exact TypeScript delivery DTOs.
- Create field-level mapping for every current source above.

### Phase B — Import as non-public

- Import media, authors/reviewers/taxonomy, then pages/articles/resources.
- Preserve current draft/noindex/review/release state.
- Store source hash, target ID and import result.

### Phase C — Dual-read staging

- Render local and CMS versions for representative routes.
- Compare HTML semantics, visible copy, metadata, JSON-LD, links, media and screenshots.
- Reconcile route/content counts and every error.

### Phase D — CMS build source

- Switch staging builds to `CmsDeliveryGateway`.
- Exercise preview, scheduled publish, update, unpublish, slug redirect and failed build.
- Keep local gateway as rollback during the agreed stabilization period.

### Phase E — Production cutover

- Deploy from an immutable CMS snapshot.
- Verify sitemap, canonical, robots, key routes, forms and consent.
- Record release SHA, CMS snapshot/version, build ID and rollback point.
- Remove local authoring only after the rollback window and reconciliation sign-off.

## Required contract fixtures

The CMS and website repositories share sanitized fixtures for:

- one reviewed article with sources/reviewer;
- one noindex draft article;
- product, solution, industry and persona pages;
- guide, template, calculator and glossary records;
- homepage/site-settings/navigation;
- slug change plus redirect;
- unpublished relation target;
- missing media/alt, invalid schema and unsupported block versions.

CI validates the same fixtures against CMS schema, delivery API and Astro renderer.

## Acceptance criteria

- [ ] All current canonical routes are present or have approved redirect/retirement decisions.
- [ ] Product, solution, industry, persona and resource templates render from typed CMS fixtures.
- [ ] Blog archive/detail/category/author output matches the current route contract.
- [ ] Tag and reviewer routes are implemented or explicitly retained as noindex deferrals.
- [ ] Draft/unapproved content never enters public delivery, sitemap or navigation.
- [ ] Metadata, canonical, OG/Twitter and JSON-LD remain valid.
- [ ] Navigation never links to unpublished/missing content.
- [ ] CMS media has required alt, variants, rights and usage records.
- [ ] Preview token, publish webhook and replay/duplicate negative tests pass.
- [ ] Failed build keeps the last good public site.
- [ ] Slug changes create valid single-hop redirects without cycles.
- [ ] `npm run check`, `npm run build` and `npm run audit` pass using CMS fixtures and staging delivery.
- [ ] Representative visual comparison passes at 320, 390, 768, 1024 and 1440 px.
- [ ] Lead forms and consent behavior remain unchanged and PII never reaches CMS.
- [ ] Migration reconciliation reports zero unexplained missing/extra records.
- [ ] Backup restore and rollback to the last static/CMS snapshot are demonstrated.

## Responsibility matrix

| Deliverable | CMS team | Marketing website team | Joint approval |
|---|---|---|---|
| CMS schema, workflow, delivery snapshots | Owns | Reviews consumer needs | Product/editorial |
| OpenAPI/JSON Schema and fixtures | Owns server | Owns client/renderer tests | Both tech leads |
| Astro templates, gateway and view models | Consulted | Owns | Both tech leads |
| Preview service and render route | Token/revision ownership | Render/runtime ownership | Security + both teams |
| Publish webhook/build/revalidation | Emits/audits | Consumes/deploys | Release owner |
| Migration/import | Owns target/importer | Owns source mapping/parity | Content + SEO owners |
| SEO/schema/canonical parity | Supplies data | Renders/validates | SEO owner |
| Brand/accessibility/performance | Supplies constrained fields | Owns UI implementation | Brand + QA |
| Forms/CRM integration | No PII ownership | Owns website adapter | CRM team |
| Rollback/incident runbooks | CMS recovery | Website release recovery | Operations |

## Handover artifacts the marketing developer must receive

Before implementation starts:

- CMS ADR and environment/topology;
- OpenAPI plus versioned JSON Schema/TypeScript DTOs;
- content-type and block-schema dictionary;
- sanitized delivery fixtures and expected rendered routes;
- preview-token and webhook verification contract;
- environment variable list without secret values;
- migration mapping and current route inventory;
- error, retry, cache and ETag behavior;
- staging CMS URL, protected preview URL and test service account scope;
- deployment/rollback/runbooks and named operational owners.

At final handover:

- source branch/commit and deploy artifact hash;
- CMS schema/migration version and delivery snapshot ID;
- reconciliation, E2E, accessibility, visual, SEO/schema and security evidence;
- dashboard/alerts and incident contacts;
- known limitations and deferred content types;
- signed Product, Editorial, SEO, Security and Release acceptance.

## Scope accounting

The CMS platform baseline remains 987 SP. Marketing-repository adapter, migration parity and cross-system E2E are part of the shared integration/governance workstream, not hidden inside a CMS content-editor story. They must be sliced and estimated jointly before sprint commitment.
