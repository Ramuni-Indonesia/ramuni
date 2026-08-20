#!/usr/bin/env bash
set -Eeuo pipefail

ramuni_repo_dir=$(CDPATH= cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
ramuni_nginx_available=/etc/nginx/sites-available/www.ramuni.id
ramuni_nginx_enabled=/etc/nginx/sites-enabled/www.ramuni.id
ramuni_security_snippet=/etc/nginx/snippets/ramuni-production-security-headers.conf
ramuni_privileged_mode=""

for ramuni_command in install ln mv cp nginx; do
  command -v "$ramuni_command" >/dev/null || {
    echo "Required command is missing: $ramuni_command" >&2
    exit 1
  }
done

if sudo -n true >/dev/null 2>&1; then
  ramuni_privileged_mode=sudo
elif command -v /usr/bin/docker >/dev/null && /usr/bin/docker image inspect nginx:alpine >/dev/null 2>&1; then
  ramuni_privileged_mode=docker
else
  echo "Installing production Nginx operations needs passwordless sudo or the local nginx:alpine Docker image." >&2
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

ramuni_reload_nginx() {
  if [[ $ramuni_privileged_mode == sudo ]]; then
    sudo -n systemctl reload nginx
    return
  fi
  /usr/bin/docker run --rm --network none --pid host --privileged --entrypoint /bin/sh -v /:/host nginx:alpine \
    -c 'exec chroot /host /usr/sbin/nginx -s reload'
}

ramuni_timestamp=$(date -u +%Y%m%dT%H%M%SZ)
ramuni_nginx_backup="${ramuni_nginx_available}.bak-${ramuni_timestamp}"
ramuni_security_backup="${ramuni_security_snippet}.bak-${ramuni_timestamp}"

# Install both candidates first, then atomically promote them. If Nginx rejects
# the candidate, restore the prior files before leaving the host unchanged.
ramuni_privileged install -o root -g root -m 0644 \
  "$ramuni_repo_dir/ops/nginx/www.ramuni.id.conf" "${ramuni_nginx_available}.next"
ramuni_privileged install -o root -g root -m 0644 \
  "$ramuni_repo_dir/ops/nginx/ramuni-production-security-headers.conf" "${ramuni_security_snippet}.next"
ramuni_privileged cp -p "$ramuni_nginx_available" "$ramuni_nginx_backup"
ramuni_privileged cp -p "$ramuni_security_snippet" "$ramuni_security_backup"
ramuni_privileged mv -f "${ramuni_nginx_available}.next" "$ramuni_nginx_available"
ramuni_privileged mv -f "${ramuni_security_snippet}.next" "$ramuni_security_snippet"
ramuni_privileged ln -sfn "$ramuni_nginx_available" "$ramuni_nginx_enabled"

if ! ramuni_privileged nginx -t; then
  ramuni_privileged mv -f "$ramuni_nginx_backup" "$ramuni_nginx_available"
  ramuni_privileged mv -f "$ramuni_security_backup" "$ramuni_security_snippet"
  ramuni_privileged nginx -t
  echo "Rejected production Nginx candidate and restored the previous configuration." >&2
  exit 1
fi

ramuni_reload_nginx
echo "Installed and reloaded production Nginx configuration for www.ramuni.id"
