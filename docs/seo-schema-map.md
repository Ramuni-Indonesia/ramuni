# SEO and Schema Map

Status: static SEO foundation is implemented. Public-domain validation, final schema approval, Search Console, Bing, and production redirect evidence remain external blockers.

## Indexing contract

- `PUBLIC_DEPLOY_ENV` accepts `local`, `preview`, `staging`, or `production`; missing or unknown values resolve to `local`.
- Local, preview, and staging output is globally `noindex,follow` and contributes no sitemap URLs.
- Production pages are eligible for indexing only when `PUBLIC_INDEXING_ENABLED=true`.
- Claim, security, calculator, and resource approval flags remain subordinate to the production gate.
- Search, account, thank-you, system, thin taxonomy, legal shell, status, help shell, and dummy blog routes remain excluded according to the Astro sitemap filter and page-level metadata.

## Current structured data

| Route family | Current emitted schema |
|---|---|
| `/` | Generic `WebPage` when indexable; supplied `Organization`, `WebSite`, `SoftwareApplication`, and visible `FAQPage` |
| `/tentang` | `AboutPage` when indexable |
| `/kontak` | `ContactPage` when indexable |
| Resource hubs | `CollectionPage` when indexable |
| `/produk` and `/produk/[slug]` | `BreadcrumbList`; generic page schema only when indexable |
| `/solusi` and `/solusi/[slug]` | `BreadcrumbList`; generic page schema only when indexable |
| `/harga` | Generic page schema when indexable; supplied `SoftwareApplication` and `BreadcrumbList` |
| `/blog` | Generic page schema when indexable; supplied `CollectionPage` and `BreadcrumbList` |
| `/blog/[slug]` | Supplied `BlogPosting` and `BreadcrumbList`; current fixtures are noindex |
| `/blog/kategori/[slug]` | Supplied `CollectionPage` and `BreadcrumbList`; current thin categories are noindex |
| `/penulis` | Supplied `CollectionPage`, `ItemList`, and `BreadcrumbList`; indexable with the approved resource release gate |
| `/blog/penulis/[slug]` | Supplied `ProfilePage` with a transparent editorial pen-name `Person` entity and `BreadcrumbList`; indexable with the approved resource release gate |
| `/kalkulator/[slug]` | Supplied `WebApplication` and `BreadcrumbList`; generic page schema only after approval and indexing |

Some industry, role, guide, glossary, and support pages currently render HTML breadcrumbs manually but do not yet emit `BreadcrumbList`. Product-like schema, offers, ratings, customer evidence, and FAQ schema are not inferred where they are not explicitly implemented. Do not claim otherwise in validation reports.

## Metadata and crawl behavior

- `BaseLayout.astro` owns language, title, description, canonical, robots, Open Graph, Twitter card, and generic page schema.
- Canonicals use `PUBLIC_SITE_URL`; production must confirm the final HTTPS origin and host redirect policy.
- `astro.config.mjs` owns sitemap membership and applies the same environment and content release gates as page metadata.
- `robots.txt` points to the configured origin sitemap. Hosting protection remains required for preview and staging.

## Release evidence still required

- Final-domain 200 and redirect checks for every indexable route family.
- Rich Results and Schema.org validation after final schema review.
- Google Search Console and Bing verification plus successful sitemap fetch.
- Public robots and canonical inspection.
- Crawl for broken links, orphans, duplicate metadata, and redirect chains.
- Public mobile PSI and Core Web Vitals baseline.
