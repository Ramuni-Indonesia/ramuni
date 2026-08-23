#!/usr/bin/env bash
set -Eeuo pipefail

ramuni_repo_dir=$(CDPATH= cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
ramuni_deploy_root=${RAMUNI_STAGING_ROOT:-/var/www/ramuni-staging}
ramuni_release_id="$(date -u +%Y%m%dT%H%M%SZ)-$(git -C "$ramuni_repo_dir" rev-parse --short=12 HEAD)"
ramuni_release_dir="$ramuni_deploy_root/releases/$ramuni_release_id"
ramuni_current_link="$ramuni_deploy_root/current"
ramuni_previous_target=""
ramuni_switched=0
ramuni_privileged_mode=""

if sudo -n true >/dev/null 2>&1; then
  ramuni_privileged_mode=sudo
elif command -v /usr/bin/docker >/dev/null && /usr/bin/docker image inspect nginx:alpine >/dev/null 2>&1; then
  ramuni_privileged_mode=docker
else
  echo "Deployment needs passwordless sudo or the local nginx:alpine Docker image for atomic file activation." >&2
  exit 1
fi

ramuni_privileged() {
  if [[ $ramuni_privileged_mode == sudo ]]; then
    sudo -n "$@"
    return
  fi
  /usr/bin/docker run --rm --network none --entrypoint /bin/sh -v /:/host nginx:alpine \
    -c 'exec chroot /host "$@"' sh "$@"
}

# Astro 7 requires Node 22. The host's system Node may intentionally remain on
# the Ubuntu-supported line, so deployment runs itself inside an ephemeral
# Node 22 toolchain when necessary.
ramuni_node_major=$(node -p 'Number(process.versions.node.split(".")[0])' 2>/dev/null || printf '0')
if (( ramuni_node_major < 22 )) && [[ ${RAMUNI_NODE22_REEXEC:-0} != 1 ]]; then
  command -v npx >/dev/null || {
    echo "Node >=22.12 or npx is required for the Astro build." >&2
    exit 1
  }
  exec env RAMUNI_NODE22_REEXEC=1 npx -y -p node@22 -c \
    "bash '$ramuni_repo_dir/scripts/deploy-staging.sh'"
fi

rollback_on_error() {
  local exit_code=$?
  if [[ $ramuni_switched -eq 1 && -n $ramuni_previous_target && -d $ramuni_previous_target ]]; then
    echo "Deployment failed after activation; restoring $ramuni_previous_target" >&2
    ramuni_privileged ln -sfn "$ramuni_previous_target" "$ramuni_deploy_root/current.rollback"
    ramuni_privileged mv -Tf "$ramuni_deploy_root/current.rollback" "$ramuni_current_link"
  fi
  exit "$exit_code"
}
trap rollback_on_error ERR

case "$ramuni_release_dir" in
  "$ramuni_deploy_root"/releases/*) ;;
  *)
    echo "Refusing unresolved release path: $ramuni_release_dir" >&2
    exit 1
    ;;
esac

for command_name in brotli curl git gzip npm rsync sudo; do
  command -v "$command_name" >/dev/null || {
    echo "Required command is missing: $command_name" >&2
    exit 1
  }
done

cd "$ramuni_repo_dir"

if [[ -n $(git status --porcelain) ]]; then
  echo "Refusing to deploy from a dirty worktree." >&2
  exit 1
fi

echo "Building staging artifact from $(git rev-parse --short=12 HEAD)..."
if [[ -d dist ]]; then
  ramuni_privileged chown -R "$(id -u):$(id -g)" "$ramuni_repo_dir/dist"
fi
npm ci --force
npm run check
ramuni_r2_env_file=${RAMUNI_R2_ENV_FILE:-/home/meetsin/.config/ramuni/r2.env}
ramuni_asset_base_url=${RAMUNI_ASSET_BASE_URL:-https://assets-staging.ramuni.id}
ramuni_lead_endpoint=${RAMUNI_PUBLIC_LEAD_ENDPOINT:-https://crm.ramuni.id/v1/public/lead-submissions}
if [[ -f $ramuni_r2_env_file ]]; then
  npm run r2:sync -- --env-file "$ramuni_r2_env_file"
else
  echo "R2 sync skipped; set RAMUNI_R2_ENV_FILE to publish public assets." >&2
fi
PUBLIC_DEPLOY_ENV=staging \
PUBLIC_INDEXING_ENABLED=false \
PUBLIC_SITE_URL=https://staging.ramuni.id \
PUBLIC_ASSET_BASE_URL="$ramuni_asset_base_url" \
PUBLIC_LEAD_ENDPOINT="$ramuni_lead_endpoint" \
PUBLIC_PRICING_APPROVED=false \
npm run build
PUBLIC_SITE_URL=https://staging.ramuni.id \
PUBLIC_ASSET_BASE_URL="$ramuni_asset_base_url" \
npm run assets:cdn
PUBLIC_DEPLOY_ENV=staging \
PUBLIC_INDEXING_ENABLED=false \
PUBLIC_SITE_URL=https://staging.ramuni.id \
PUBLIC_ASSET_BASE_URL="$ramuni_asset_base_url" \
PUBLIC_LEAD_ENDPOINT="$ramuni_lead_endpoint" \
PUBLIC_PRICING_APPROVED=false \
npm run audit
npm audit --audit-level=high

while IFS= read -r -d '' html_file; do
  if ! grep -Eqi '<meta name="robots" content="[^"]*noindex' "$html_file"; then
    echo "Staging noindex guard failed: $html_file" >&2
    exit 1
  fi
done < <(find dist -type f -name '*.html' -print0)

if find dist -maxdepth 1 -type f -name 'sitemap*.xml' -exec grep -l '<url>' {} + | grep -q .; then
  echo "Staging sitemap unexpectedly contains indexable URLs." >&2
  exit 1
fi

# Nginx serves these precompressed siblings through gzip_static/brotli_static.
# HTML remains no-store but is compressed in transit; content-hashed Astro
# assets can be cached for a year without recompressing on every request.
while IFS= read -r -d '' compressible_file; do
  gzip -9 -c "$compressible_file" > "$compressible_file.gz"
  brotli --quality=9 --force --output="$compressible_file.br" "$compressible_file"
done < <(find dist -type f \( \
  -name '*.css' -o -name '*.html' -o -name '*.js' -o -name '*.json' \
  -o -name '*.svg' -o -name '*.txt' -o -name '*.xml' -o -name '*.webmanifest' \
\) -size +255c -print0)

ramuni_artifact_digest=$(find dist -type f -print0 | sort -z | xargs -0 sha256sum | sha256sum | cut -d' ' -f1)

ramuni_privileged install -d -o root -g www-data -m 2775 "$ramuni_deploy_root" "$ramuni_deploy_root/releases"
ramuni_privileged install -d -o www-data -g www-data -m 0755 "$ramuni_release_dir"
ramuni_privileged rsync -a --delete --chown=www-data:www-data --chmod=D755,F644 "$ramuni_repo_dir/dist/" "$ramuni_release_dir/"
if [[ -L $ramuni_current_link ]]; then
  ramuni_previous_target=$(readlink -f "$ramuni_current_link")
fi

ramuni_release_metadata=$(mktemp)
printf 'release=%s\nsha=%s\nartifact_sha256=%s\ndeployed_at=%s\n' \
  "$ramuni_release_id" \
  "$(git rev-parse HEAD)" \
  "$ramuni_artifact_digest" \
  "$(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$ramuni_release_metadata"
ramuni_privileged install -o www-data -g www-data -m 0644 "$ramuni_release_metadata" "$ramuni_release_dir/RELEASE"
rm -f "$ramuni_release_metadata"

# Keep recovery tooling independent of a particular Git worktree path.
ramuni_privileged install -d -o root -g root -m 0755 /usr/local/lib/ramuni-staging
ramuni_privileged install -o root -g root -m 0755 \
  "$ramuni_repo_dir/scripts/health-check-staging.sh" \
  "$ramuni_repo_dir/scripts/monitor-staging.sh" \
  "$ramuni_repo_dir/scripts/rollback-staging.sh" \
  /usr/local/lib/ramuni-staging/

# RELEASE exists before the atomic alias switch, avoiding a transient 503 from
# /healthz during activation.
ramuni_privileged ln -sfn "$ramuni_release_dir" "$ramuni_deploy_root/current.next"
ramuni_privileged mv -Tf "$ramuni_deploy_root/current.next" "$ramuni_current_link"
ramuni_switched=1

RAMUNI_HEALTH_RESOLVE_IP="${RAMUNI_HEALTH_RESOLVE_IP:-127.0.0.1}" \
RAMUNI_EXPECTED_RELEASE="$ramuni_release_id" \
  "$ramuni_repo_dir/scripts/health-check-staging.sh"
ramuni_switched=0

echo "Deployed $ramuni_release_id"
echo "Artifact SHA-256: $ramuni_artifact_digest"
echo "Current release: $ramuni_release_dir"
