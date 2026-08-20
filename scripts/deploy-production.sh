#!/usr/bin/env bash
set -Eeuo pipefail

ramuni_repo_dir=$(CDPATH= cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
# The live www virtual host already points at this atomically switched release
# root. Keep the default explicit so a production deploy cannot silently use a
# differently named directory.
ramuni_deploy_root=${RAMUNI_PRODUCTION_ROOT:-/var/www/ramuni-staging}
ramuni_origin=${RAMUNI_PRODUCTION_ORIGIN:-https://www.ramuni.id}
ramuni_asset_base_url=${RAMUNI_ASSET_BASE_URL:-https://assets-staging.ramuni.id}
ramuni_r2_env_file=${RAMUNI_R2_ENV_FILE:-/home/meetsin/.config/ramuni/r2.env}
ramuni_lead_endpoint=${RAMUNI_PUBLIC_LEAD_ENDPOINT:-https://crm.ramuni.id/v1/public/lead-submissions}
ramuni_claim_pages_approved=${RAMUNI_PUBLIC_CLAIM_PAGES_APPROVED:-false}
ramuni_resource_review_approved=${RAMUNI_PUBLIC_RESOURCE_REVIEW_APPROVED:-false}
ramuni_calculator_review_approved=${RAMUNI_PUBLIC_CALCULATOR_REVIEW_APPROVED:-false}
ramuni_security_review_approved=${RAMUNI_PUBLIC_SECURITY_REVIEW_APPROVED:-false}
ramuni_release_id="$(date -u +%Y%m%dT%H%M%SZ)-$(git -C "$ramuni_repo_dir" rev-parse --short=12 HEAD)"
ramuni_release_dir="$ramuni_deploy_root/releases/$ramuni_release_id"
ramuni_current_link="$ramuni_deploy_root/current"
ramuni_previous_target=""
ramuni_switched=0
ramuni_privileged_mode=""

for ramuni_gate_value in \
  "$ramuni_claim_pages_approved" \
  "$ramuni_resource_review_approved" \
  "$ramuni_calculator_review_approved" \
  "$ramuni_security_review_approved"; do
  case "$ramuni_gate_value" in
    true|false) ;;
    *)
      echo "Public release gates must be true or false." >&2
      exit 2
      ;;
  esac
done

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

ramuni_node_major=$(node -p 'Number(process.versions.node.split(".")[0])' 2>/dev/null || printf '0')
if (( ramuni_node_major < 22 )) && [[ ${RAMUNI_NODE22_REEXEC:-0} != 1 ]]; then
  command -v npx >/dev/null || {
    echo "Node >=22.12 or npx is required for the Astro build." >&2
    exit 1
  }
  exec env RAMUNI_NODE22_REEXEC=1 npx -y -p node@22 -c \
    "bash '$ramuni_repo_dir/scripts/deploy-production.sh'"
fi

rollback_on_error() {
  local exit_code=$?
  if [[ $ramuni_switched -eq 1 && -n $ramuni_previous_target && -d $ramuni_previous_target ]]; then
    echo "Production deployment failed after activation; restoring $ramuni_previous_target" >&2
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

for command_name in brotli curl git gzip npm rsync; do
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

echo "Building production artifact from $(git rev-parse --short=12 HEAD)..."
if [[ -d dist ]]; then
  ramuni_privileged chown -R "$(id -u):$(id -g)" "$ramuni_repo_dir/dist"
fi
npm ci --force
npm run check
if [[ -f $ramuni_r2_env_file ]]; then
  npm run r2:sync -- --env-file "$ramuni_r2_env_file"
else
  echo "R2 sync skipped; set RAMUNI_R2_ENV_FILE to publish public assets." >&2
fi
PUBLIC_DEPLOY_ENV=production \
PUBLIC_INDEXING_ENABLED=true \
PUBLIC_SITE_URL="$ramuni_origin" \
PUBLIC_ASSET_BASE_URL="$ramuni_asset_base_url" \
PUBLIC_LEAD_ENDPOINT="$ramuni_lead_endpoint" \
PUBLIC_CLAIM_PAGES_APPROVED="$ramuni_claim_pages_approved" \
PUBLIC_RESOURCE_REVIEW_APPROVED="$ramuni_resource_review_approved" \
PUBLIC_CALCULATOR_REVIEW_APPROVED="$ramuni_calculator_review_approved" \
PUBLIC_SECURITY_REVIEW_APPROVED="$ramuni_security_review_approved" \
npm run build
PUBLIC_SITE_URL="$ramuni_origin" \
PUBLIC_ASSET_BASE_URL="$ramuni_asset_base_url" \
npm run assets:cdn
PUBLIC_DEPLOY_ENV=production \
PUBLIC_INDEXING_ENABLED=true \
PUBLIC_SITE_URL="$ramuni_origin" \
PUBLIC_ASSET_BASE_URL="$ramuni_asset_base_url" \
PUBLIC_LEAD_ENDPOINT="$ramuni_lead_endpoint" \
PUBLIC_CLAIM_PAGES_APPROVED="$ramuni_claim_pages_approved" \
PUBLIC_RESOURCE_REVIEW_APPROVED="$ramuni_resource_review_approved" \
PUBLIC_CALCULATOR_REVIEW_APPROVED="$ramuni_calculator_review_approved" \
PUBLIC_SECURITY_REVIEW_APPROVED="$ramuni_security_review_approved" \
npm run audit
npm audit --audit-level=high

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

ramuni_privileged ln -sfn "$ramuni_release_dir" "$ramuni_deploy_root/current.next"
ramuni_privileged mv -Tf "$ramuni_deploy_root/current.next" "$ramuni_current_link"
ramuni_switched=1

ramuni_origin_host=$(node -e 'process.stdout.write(new URL(process.argv[1]).hostname)' "$ramuni_origin")
ramuni_origin_port=$(node -e 'const u=new URL(process.argv[1]); process.stdout.write(u.port || (u.protocol === "https:" ? "443" : "80"))' "$ramuni_origin")
ramuni_health_resolve_ip=${RAMUNI_HEALTH_RESOLVE_IP:-127.0.0.1}
ramuni_resolve_args=(--resolve "$ramuni_origin_host:$ramuni_origin_port:$ramuni_health_resolve_ip")
ramuni_request() {
  curl --fail --silent --show-error --location --connect-timeout 3 --max-time 10 --retry 1 \
    "${ramuni_resolve_args[@]}" "$@"
}

ramuni_healthy=0
for attempt in 1 2 3 4 5; do
  if ramuni_health_body=$(ramuni_request "$ramuni_origin/healthz") && grep -Fxq "release=$ramuni_release_id" <<<"$ramuni_health_body"; then
    ramuni_headers=$(ramuni_request --head "$ramuni_origin/")
    grep -qi '^x-robots-tag:.*index' <<<"$ramuni_headers"
    ! grep -qi '^x-robots-tag:.*noindex' <<<"$ramuni_headers"
    grep -qi '^cache-control:.*no-store' <<<"$ramuni_headers"
    ramuni_html=$(ramuni_request "$ramuni_origin/")
    grep -Fqi '<meta name="robots" content="index,follow">' <<<"$ramuni_html"
    grep -Fqi '<link rel="canonical" href="https://www.ramuni.id/">' <<<"$ramuni_html"
    ramuni_robots=$(ramuni_request "$ramuni_origin/robots.txt")
    grep -Fxq 'Sitemap: https://www.ramuni.id/sitemap.xml' <<<"$ramuni_robots"
    ramuni_sitemap_index=$(ramuni_request "$ramuni_origin/sitemap.xml")
    grep -Fq 'sitemap-blog.xml' <<<"$ramuni_sitemap_index"
    if [[ $ramuni_claim_pages_approved == true ]]; then
      ramuni_products_sitemap=$(ramuni_request "$ramuni_origin/sitemap-products.xml")
      grep -Fq '<loc>https://www.ramuni.id/produk/inventori/</loc>' <<<"$ramuni_products_sitemap"
      ramuni_product_page=$(ramuni_request "$ramuni_origin/produk/inventori/")
      grep -Fqi '<meta name="robots" content="index,follow">' <<<"$ramuni_product_page"
    fi
    if [[ $ramuni_resource_review_approved == true ]]; then
      ramuni_authors_sitemap=$(ramuni_request "$ramuni_origin/sitemap-blog-authors.xml")
      grep -Fq '<loc>https://www.ramuni.id/blog/penulis/alya-pramesti/</loc>' <<<"$ramuni_authors_sitemap"
      ramuni_pages_sitemap=$(ramuni_request "$ramuni_origin/sitemap-pages.xml")
      grep -Fq '<loc>https://www.ramuni.id/blog/penulis/</loc>' <<<"$ramuni_pages_sitemap"
      ramuni_author_page=$(ramuni_request "$ramuni_origin/blog/penulis/alya-pramesti/")
      grep -Fqi '<meta name="robots" content="index,follow">' <<<"$ramuni_author_page"
      ramuni_writers_page=$(ramuni_request "$ramuni_origin/blog/penulis/")
      grep -Fqi '<link rel="canonical" href="https://www.ramuni.id/blog/penulis/">' <<<"$ramuni_writers_page"
    fi
    ramuni_blog_sitemap=$(ramuni_request "$ramuni_origin/sitemap-blog-posts.xml")
    for slug in cara-menghitung-food-cost-usaha-makanan cara-mengatur-stok-bahan-baku-bakery contoh-laporan-kas-harian-kedai-makanan; do
      grep -Fq "<loc>https://www.ramuni.id/blog/$slug/</loc><lastmod>2026-08-20</lastmod>" <<<"$ramuni_blog_sitemap"
      ramuni_article=$(ramuni_request "$ramuni_origin/blog/$slug/")
      grep -Fqi "<link rel=\"canonical\" href=\"https://www.ramuni.id/blog/$slug/\"" <<<"$ramuni_article"
      grep -Fqi '<meta name="robots" content="index,follow">' <<<"$ramuni_article"
    done
    [[ -f "$ramuni_release_dir/RELEASE" ]]
    ramuni_healthy=1
    break
  fi
  sleep "$attempt"
done

if [[ $ramuni_healthy -ne 1 ]]; then
  echo "Production health check failed after activation: $ramuni_origin" >&2
  exit 1
fi

ramuni_switched=0
echo "Deployed $ramuni_release_id"
echo "Artifact SHA-256: $ramuni_artifact_digest"
echo "Current release: $ramuni_release_dir"
