# CMS content gateway

The Astro renderer uses `MarketingContentGateway` only at build time. Browser code never receives CMS credentials.

Modes:

- `local`: current TypeScript/Markdown content; default and rollback source.
- `cms-active`: only immutable active CMS snapshots; intended after complete route reconciliation.
- `cms-candidate`: exact signed-provider candidate overlay. During migration, `RAMUNI_CMS_MIGRATION_FALLBACK=local` merges active CMS records over local records so one candidate cannot erase unmigrated routes.

Product and solution adapters currently require an existing typed local template baseline for the CMS slug. CMS may change route identity, title, hero and SEO fields, while the rich local template supplies fields not yet represented by the current CMS schema. A CMS-only slug therefore fails the build rather than rendering an incomplete page. Completing typed CMS section parity for every route family remains required before pure `cms-active` cutover.

The delivery token and candidate file are protected build-server inputs. Use `RAMUNI_CMS_DELIVERY_TOKEN_FILE`; do not use a `PUBLIC_*` variable or commit token/candidate values.

Focused gate:

```bash
npm run test:content-gateway
```
