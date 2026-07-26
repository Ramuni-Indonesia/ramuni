#!/usr/bin/env bash
set -Eeuo pipefail

origin=${RAMUNI_STAGING_ORIGIN:-https://staging.ramuni.id}
deploy_root=${RAMUNI_STAGING_ROOT:-/var/www/ramuni-staging}
attempts=${RAMUNI_HEALTH_ATTEMPTS:-5}
expected_release=${RAMUNI_EXPECTED_RELEASE:-}
resolve_ip=${RAMUNI_HEALTH_RESOLVE_IP:-}

origin_host=$(node -e 'process.stdout.write(new URL(process.argv[1]).hostname)' "$origin")
origin_port=$(node -e 'const u=new URL(process.argv[1]); process.stdout.write(u.port || (u.protocol === "https:" ? "443" : "80"))' "$origin")
resolve_args=()
if [[ -n $resolve_ip ]]; then
  resolve_args=(--resolve "$origin_host:$origin_port:$resolve_ip")
fi

request() {
  curl --fail --silent --show-error --location \
    --connect-timeout 3 --max-time 10 --retry 1 \
    "${resolve_args[@]}" "$@"
}

for ((attempt = 1; attempt <= attempts; attempt += 1)); do
  if body=$(request "$origin/healthz") && grep -q '^release=' <<<"$body"; then
    headers=$(request --head "$origin/")
    grep -qi '^x-robots-tag:.*noindex' <<<"$headers"
    grep -qi '^cache-control:.*no-store' <<<"$headers"
    html=$(request "$origin/")
    grep -Fqi '<meta name="robots" content="noindex,follow">' <<<"$html"
    current=$(readlink -f "$deploy_root/current")
    [[ -d $current && -f $current/RELEASE && -f $current/index.html ]]
    request --head "$origin/robots.txt" | grep -qi '^x-robots-tag:.*noindex'
    robots=$(request "$origin/robots.txt")
    grep -Fxq 'Allow: /' <<<"$robots"
    ! grep -q '^Sitemap:' <<<"$robots"
    for sitemap_path in sitemap.xml sitemap-index.xml; do
      status=$(curl --silent --output /dev/null --write-out '%{http_code}' \
        --connect-timeout 3 --max-time 10 "${resolve_args[@]}" "$origin/$sitemap_path")
      [[ $status == 404 ]]
    done
    if [[ -n $expected_release ]]; then
      grep -Fxq "release=$expected_release" <<<"$body"
      grep -Fxq "release=$expected_release" "$current/RELEASE"
    fi
    printf 'healthy release=%s origin=%s resolve=%s\n' "$(basename "$current")" "$origin" "${resolve_ip:-dns}"
    exit 0
  fi
  sleep "$attempt"
done

echo "Staging health check failed after $attempts attempts: $origin" >&2
exit 1
