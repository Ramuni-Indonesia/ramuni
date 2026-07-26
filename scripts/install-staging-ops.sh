#!/usr/bin/env bash
set -Eeuo pipefail

repo_dir=$(CDPATH= cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
nginx_available=/etc/nginx/sites-available/staging.ramuni.id
nginx_enabled=/etc/nginx/sites-enabled/staging.ramuni.id
security_snippet=/etc/nginx/snippets/ramuni-staging-security-headers.conf

for command_name in install ln nginx systemctl; do
  command -v "$command_name" >/dev/null || {
    echo "Required command is missing: $command_name" >&2
    exit 1
  }
done

# Install to temporary paths first. Nginx is never reloaded unless the complete
# candidate configuration validates successfully.
sudo install -o root -g root -m 0644 \
  "$repo_dir/ops/nginx/staging.ramuni.id.conf" "$nginx_available.next"
sudo install -o root -g root -m 0644 \
  "$repo_dir/ops/nginx/ramuni-staging-security-headers.conf" "$security_snippet.next"
sudo mv -f "$nginx_available.next" "$nginx_available"
sudo mv -f "$security_snippet.next" "$security_snippet"
sudo ln -sfn "$nginx_available" "$nginx_enabled"

sudo nginx -t

sudo install -d -o root -g root -m 0755 /usr/local/lib/ramuni-staging
sudo install -o root -g root -m 0755 \
  "$repo_dir/scripts/health-check-staging.sh" \
  "$repo_dir/scripts/monitor-staging.sh" \
  "$repo_dir/scripts/rollback-staging.sh" \
  /usr/local/lib/ramuni-staging/
sudo install -o root -g root -m 0644 \
  "$repo_dir/ops/systemd/ramuni-staging-health.service" \
  "$repo_dir/ops/systemd/ramuni-staging-health.timer" \
  /etc/systemd/system/

sudo systemctl daemon-reload
sudo systemctl enable ramuni-staging-health.timer
if sudo systemctl is-active --quiet nginx; then
  sudo systemctl reload nginx
else
  sudo systemctl restart nginx
fi
sudo systemctl start ramuni-staging-health.timer

RAMUNI_HEALTH_RESOLVE_IP=127.0.0.1 "$repo_dir/scripts/health-check-staging.sh"
echo "Installed Nginx, HTTP/2, compression, cache policy, and recovery monitor for staging.ramuni.id"
