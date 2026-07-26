# Cloudflare staging cache

`staging.ramuni.id` is proxied through Cloudflare. The origin remains
`13.140.149.2`, while public DNS returns Cloudflare anycast addresses.

## Active settings

- SSL/TLS mode: **Full (strict)**
- TLS 1.3, HTTP/2, HTTP/3, Brotli, Early Hints, and Always Use HTTPS: enabled
- Browser cache TTL: four hours as the zone fallback; origin headers and the
  staging cache rules below take precedence where applicable
- `/_astro/*`: cached at the edge for one year and uses the immutable browser
  cache headers supplied by the origin
- Images and fonts (`avif`, `gif`, `ico`, `jpg`, `jpeg`, `png`, `svg`, `webp`,
  `woff`, `woff2`): cached at the edge for seven days
- `/healthz`, `robots.txt`, `sitemap*`, and `.html` responses: explicitly
  bypass edge caching

Do not enable Cache Everything for staging HTML. The origin deliberately sends
`Cache-Control: no-store` and `X-Robots-Tag: noindex, nofollow, noarchive,
nosnippet`, so deployments and indexing controls must take effect immediately.

## Credentials

Cloudflare credentials are stored only on the staging server at
`/home/meetsin/.config/ramuni/cloudflare.env`. The file is owned by the
`meetsin` user with mode `0600` and contains these variables:

```dotenv
CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_ZONE_ID=...
CLOUDFLARE_API_TOKEN=...
```

Never copy values into the repository, CI logs, shell history, issue comments,
or pull requests. Rotate an exposed token in Cloudflare, then replace the local
file without changing its permissions.

R2 S3 credentials are stored separately at
`/home/meetsin/.config/ramuni/r2.env`, also with mode `0600`. The active bucket
is `ramuni` in the APAC location, and its staging delivery domain is
`https://assets-staging.ramuni.id`.

To publish the static files from `public/`, run:

```bash
npm run r2:sync -- --env-file /home/meetsin/.config/ramuni/r2.env
```

The sync is non-destructive: it uploads new or changed files and skips objects
whose remote checksum already matches the local file. It never deletes remote objects.
Objects use their source-relative path, so `public/brand/logo.webp` becomes
`https://assets-staging.ramuni.id/brand/logo.webp`.

The R2 bucket permits cross-origin `GET` and `HEAD` requests from the staging,
apex, and `www` sites. The custom domain caches successful assets for seven
days and supports stale delivery during an origin interruption.

## Validation

Expected behavior:

- `dig +short staging.ramuni.id` returns Cloudflare anycast addresses.
- Responses include `cf-ray` and advertise HTTP/3 through `alt-svc`.
- A second request to an `/_astro/` asset reports `cf-cache-status: HIT`.
- A second request to an image or font reports `cf-cache-status: HIT`.
- `/`, `/healthz`, `robots.txt`, and sitemap requests report `DYNAMIC` or
  `BYPASS`.
- `/` and `robots.txt` include the staging noindex response header.
- `/sitemap.xml` remains HTTP 404 while staging is private from search engines.
- `https://assets-staging.ramuni.id/health/r2-check.txt` returns HTTP 200; a
  repeated request from the same Cloudflare location reports
  `cf-cache-status: HIT`.

If a public filename is replaced in place, purge that URL. Fingerprinted
`/_astro/` files do not require purging and remain safe during rollback.

Before restricting the origin to Cloudflare IP ranges, preserve Let's Encrypt
ACME access and define an authenticated maintenance path for operators.
