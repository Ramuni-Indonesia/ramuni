# CMS build provider

`ops/cms-build-provider` is the always-on loopback service behind exact Nginx path `POST /api/cms/revalidate`.

It verifies the CMS HMAC, five-minute timestamp window, callback origin/path and `Idempotency-Key`; stores every accepted event in SQLite WAL before returning `202`; processes one build at a time; fetches the exact service-authenticated candidate; builds the pinned full marketing Git SHA with a local migration fallback; verifies every affected route contains the exact snapshot marker (or is absent for unpublish); and only then atomically switches `/var/www/ramuni-staging/current`. Failed builds never move the symlink. Success and failure callbacks use the same protected shared HMAC secret and retry durably.

Secrets are file references with protected permissions. Required provider environment names are:

- `RAMUNI_PROVIDER_MARKETING_SHA`
- `RAMUNI_PROVIDER_CMS_BASE_URL`
- `RAMUNI_PROVIDER_PUBLIC_BASE_URL`
- `RAMUNI_PROVIDER_CMS_DELIVERY_TOKEN_FILE`
- `RAMUNI_PROVIDER_SHARED_HMAC_SECRET_FILE`
- `RAMUNI_PROVIDER_DATABASE_PATH`
- `RAMUNI_PROVIDER_STATE_ROOT`
- `RAMUNI_PROVIDER_MARKETING_REPOSITORY`
- `RAMUNI_PROVIDER_RELEASE_ROOT`

The provider service and Nginx change must be installed only after the pinned SHA passes Node 22 checks. Keep the previous `current` symlink target and provider environment backup for rollback.

For the supplied Docker-backed systemd unit, provider paths inside `provider.env` must use container paths: repository `/app`, secret files below `/run/secrets`, state below `/var/lib/ramuni-cms-build-provider`, and release root `/var/www/ramuni-staging`. The host checkout mounted at `/app` is the dedicated clean clone `/home/meetsin/internal/ramuni-source-provider-runtime`; do not point the service at an editor worktree or the canonical dirty checkout. The unit uses the full Node 22 Bookworm image because the build runner requires `git` as well as Node/npm.
