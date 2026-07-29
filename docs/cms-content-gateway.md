# CMS content gateway

The Astro renderer uses `MarketingContentGateway` only at build time. Browser code never receives CMS credentials.

Modes:

- `local`: current TypeScript/Markdown content; default and rollback source.
- `cms-active`: only immutable active CMS snapshots; intended after complete route reconciliation.
- `cms-candidate`: exact signed-provider candidate overlay. During migration, `RAMUNI_CMS_MIGRATION_FALLBACK=local` merges active CMS records over local records so one candidate cannot erase unmigrated routes.

Product and solution adapters currently require an existing typed local template baseline for the CMS slug. CMS may change route identity, title, hero and SEO fields, while the rich local template supplies fields not yet represented by the current CMS schema. A CMS-only slug therefore fails the build rather than rendering an incomplete page. Completing typed CMS section parity for every route family remains required before pure `cms-active` cutover.

## Article collection adapter

Blog archive, category, author, search, resource-hub, pagination, and detail routes read the `articles` collection through the same build-time gateway. The accepted schema is deliberately narrow:

- `content_type` is `articles` and `schema_version` is `1`;
- the payload preserves every field validated by `src/content.config.ts`;
- article body uses `bodyBlocks` (or the delivery-wire alias `body_blocks`) with only `heading`, `paragraph`, `list`, and `quote` blocks;
- headings accept depth 2 or 3, links are not accepted as arbitrary HTML, and source URLs must use HTTPS;
- unknown blocks, malformed dates, incomplete indexable reviewer metadata, or missing required editorial fields fail the build.
- CMS cover URLs must be absolute HTTPS URLs from the approved public media domain. The CMS projection may supply `coverWidth` and `coverHeight` so cards, article detail images, and social metadata reserve the correct space. Legacy records without dimensions safely fall back to 1200x675.

Local Markdown remains the default rollback source. It is merged with CMS records only when `RAMUNI_CMS_MIGRATION_FALLBACK=local` is explicitly enabled in candidate mode; matching CMS canonical paths replace their local fixture. Pure `cms-active` mode does not silently restore missing local articles. This makes a partially migrated or malformed collection visible during release verification instead of hiding it behind local content.

The delivery token and candidate file are protected build-server inputs. Use `RAMUNI_CMS_DELIVERY_TOKEN_FILE`; do not use a `PUBLIC_*` variable or commit token/candidate values.

Focused gate:

```bash
npm run test:content-gateway
```
