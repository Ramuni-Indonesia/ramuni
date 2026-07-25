#!/usr/bin/env bash
set -Eeuo pipefail

ramuni_repo_dir=$(CDPATH= cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
ramuni_deploy_root=${RAMUNI_STAGING_ROOT:-/var/www/ramuni-staging}
ramuni_release_id="$(date -u +%Y%m%dT%H%M%SZ)-$(git -C "$ramuni_repo_dir" rev-parse --short=12 HEAD)"
ramuni_release_dir="$ramuni_deploy_root/releases/$ramuni_release_id"

case "$ramuni_release_dir" in
  "$ramuni_deploy_root"/releases/*) ;;
  *)
    echo "Refusing unresolved release path: $ramuni_release_dir" >&2
    exit 1
    ;;
esac

for command_name in git npm rsync sudo; do
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
npm ci --force
npm run check
PUBLIC_DEPLOY_ENV=staging \
PUBLIC_INDEXING_ENABLED=false \
PUBLIC_SITE_URL=https://staging.ramuni.id \
npm run build
PUBLIC_DEPLOY_ENV=staging \
PUBLIC_INDEXING_ENABLED=false \
PUBLIC_SITE_URL=https://staging.ramuni.id \
npm run audit
npm audit --audit-level=high

while IFS= read -r -d '' html_file; do
  if ! grep -Fq '<meta name="robots" content="noindex,follow">' "$html_file"; then
    echo "Staging noindex guard failed: $html_file" >&2
    exit 1
  fi
done < <(find dist -type f -name '*.html' -print0)

if find dist -maxdepth 1 -type f -name 'sitemap*.xml' -exec grep -l '<url>' {} + | grep -q .; then
  echo "Staging sitemap unexpectedly contains indexable URLs." >&2
  exit 1
fi

ramuni_artifact_digest=$(find dist -type f -print0 | sort -z | xargs -0 sha256sum | sha256sum | cut -d' ' -f1)

sudo install -d -o root -g www-data -m 0755 "$ramuni_deploy_root" "$ramuni_deploy_root/releases"
sudo install -d -o www-data -g www-data -m 0755 "$ramuni_release_dir"
sudo rsync -a --delete --chown=www-data:www-data --chmod=D755,F644 dist/ "$ramuni_release_dir/"
sudo ln -sfn "$ramuni_release_dir" "$ramuni_deploy_root/current.next"
sudo mv -Tf "$ramuni_deploy_root/current.next" "$ramuni_deploy_root/current"

printf 'release=%s\nsha=%s\nartifact_sha256=%s\ndeployed_at=%s\n' \
  "$ramuni_release_id" \
  "$(git rev-parse HEAD)" \
  "$ramuni_artifact_digest" \
  "$(date -u +%Y-%m-%dT%H:%M:%SZ)" | sudo tee "$ramuni_release_dir/RELEASE" >/dev/null
sudo chown www-data:www-data "$ramuni_release_dir/RELEASE"
sudo chmod 0644 "$ramuni_release_dir/RELEASE"

echo "Deployed $ramuni_release_id"
echo "Artifact SHA-256: $ramuni_artifact_digest"
echo "Current release: $ramuni_release_dir"
