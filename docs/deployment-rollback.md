# Deployment and Rollback Handoff

Status: build, static verification, and the Nginx staging host are implemented. Production hosting, public CDN, access protection, DNS recovery ownership, and the production promotion operator remain launch decisions.

## Environment policy

| Environment | Required values | Index behavior |
|---|---|---|
| Local | `PUBLIC_DEPLOY_ENV=local`, `PUBLIC_INDEXING_ENABLED=false` | Global noindex; no sitemap URLs |
| Preview | `PUBLIC_DEPLOY_ENV=preview`, `PUBLIC_INDEXING_ENABLED=false` | Global noindex; no sitemap URLs; hosting access protection required |
| Staging | `PUBLIC_DEPLOY_ENV=staging`, `PUBLIC_INDEXING_ENABLED=false` | Global noindex; no sitemap URLs; test integrations only |
| Production | `PUBLIC_DEPLOY_ENV=production`, `PUBLIC_INDEXING_ENABLED=true` | Eligible pages indexable; page-level release gates still apply |

An unknown or missing `PUBLIC_DEPLOY_ENV` resolves to `local`. Setting only `PUBLIC_INDEXING_ENABLED=true` outside production does not open indexing.

## Build and release candidate

```powershell
npm ci
npm run check
npm run build
npm run audit
npm audit --audit-level=high
```

For a production candidate, set the two production indexing variables explicitly in the deployment environment. Also set `PUBLIC_SITE_URL` to the approved final HTTPS origin and leave `PUBLIC_LEAD_ENDPOINT` empty until its service passes E2E and security review.

Before promotion, record the Git SHA, dependency lockfile, environment name, page-level release flags, artifact digest, test output, responsive QA, Lighthouse result, and approvers. The current Git branch or a local successful build is not production deployment evidence.

## Promotion gates

- Clean build from the recorded SHA.
- Static audit and dependency audit pass.
- Final-domain redirects, canonicals, sitemap, robots, headers, compression, caching, and key-route 200 checks pass.
- Forms pass server E2E or remain visibly disabled.
- Consent, analytics, and pixels pass single-fire and PII tests before activation.
- Fresh mobile and desktop visual, keyboard, reduced-motion, and PSI checks pass.
- Legal, security, product, pricing, and claim approvals match the enabled release flags.

## Rollback

1. Stop promotion if health, crawl, form, consent, or asset checks fail.
2. Repoint the hosting release alias to the last known-good immutable artifact. Do not rebuild an old SHA with new environment values.
3. Restore the previous environment manifest and page-level release gates with that artifact.
4. Purge HTML only when required; keep content-hashed assets available during cache convergence.
5. Verify homepage, conversion routes, robots, sitemap, assets, and representative route families.
6. Record the incident, failed artifact, restored artifact, timing, user impact, and follow-up owner.

## Current staging host

- Origin: `https://staging.ramuni.id`
- Document root alias: `/var/www/ramuni-staging/current`
- Immutable releases: `/var/www/ramuni-staging/releases/<UTC timestamp>-<Git SHA>`
- Health endpoint: `/healthz`
- Nginx source: `ops/nginx/staging.ramuni.id.conf`
- Security-header source: `ops/nginx/ramuni-staging-security-headers.conf`
- Publisher: `scripts/deploy-staging.sh`

The staging build is fail-closed at four layers: every page emits `noindex,follow`, Nginx emits `X-Robots-Tag`, `robots.txt` disallows every crawler, and the sitemap contains no indexable URLs. HTML uses `Cache-Control: no-store`. Astro's content-hashed `/_astro/` assets use a one-year immutable cache; non-hashed media and fonts use a one-day staging cache with stale-while-revalidate.

Publish only from a clean reviewed worktree:

```bash
./scripts/deploy-staging.sh
```

Rollback does not rebuild. Resolve the previous release directory, repoint the alias atomically, and verify it:

```bash
sudo ln -sfn /var/www/ramuni-staging/releases/<known-good-release> /var/www/ramuni-staging/current.next
sudo mv -Tf /var/www/ramuni-staging/current.next /var/www/ramuni-staging/current
curl -fsS https://staging.ramuni.id/healthz
```

Keep at least two verified releases. Retention cleanup remains a deliberate operator action; the deployment script never deletes a previous release. A production CDN is intentionally not placed in front of staging until its cache purge, TLS, origin protection, and log ownership are approved.
