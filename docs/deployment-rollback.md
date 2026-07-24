# Deployment and Rollback Handoff

Status: build and static verification are implemented. The production host, CDN, preview protection, DNS, promotion mechanism, and rollback operator are not yet defined in this repository.

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

The host-specific commands, health endpoint, retention count, rollback SLA, and DNS recovery procedure remain external blockers and must be added after a platform is selected.
