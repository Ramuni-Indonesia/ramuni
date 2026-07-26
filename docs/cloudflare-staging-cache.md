# Cloudflare staging cache handoff

`staging.ramuni.id` currently resolves directly to the origin (`13.140.149.2`).
Cloudflare is authoritative for the zone, but the staging record is DNS-only.
The origin is ready for Cloudflare; proxy activation still requires a
zone-scoped API token or a dashboard operator.

## Recommended zone changes

1. Change the `staging` A record to **Proxied**.
2. Set SSL/TLS mode to **Full (strict)**. Enable TLS 1.3, HTTP/2, HTTP/3,
   Brotli, Early Hints, and Always Use HTTPS.
3. Create Cache Rules in this order:
   - Bypass cache for `/healthz`, all HTML, `robots.txt`, and `sitemap*.xml`.
   - Cache `/_astro/*` at the edge for one year and respect the origin browser
     TTL. These filenames are content-hashed and immutable.
   - Cache images and fonts (`avif`, `gif`, `ico`, `jpg`, `jpeg`, `png`, `svg`,
     `webp`, `woff`, `woff2`) at the edge for seven days, respect origin browser
     TTL, and permit stale delivery on origin errors.
4. Do not use Cache Everything for staging HTML. Its `no-store` and noindex
   responses must become visible immediately after an atomic deployment.
5. If a public filename is replaced in place, purge that URL. Fingerprinted
   `/_astro/` files never require purging and remain safe during rollback.

## Validation

After proxy activation, `dig +short staging.ramuni.id` must return Cloudflare
anycast addresses and responses must include `cf-ray`. A second asset request
should report `cf-cache-status: HIT`; `/`, `/healthz`, `robots.txt`, and sitemap
requests should report `DYNAMIC` or `BYPASS`.

Before restricting the origin to Cloudflare IP ranges, preserve Let's Encrypt
ACME access and define an authenticated maintenance path for operators.
