#!/usr/bin/env bash
set -Eeuo pipefail

state_dir=${RAMUNI_MONITOR_STATE_DIR:-/var/lib/ramuni-staging-monitor}
failures_file="$state_dir/failures"
threshold=${RAMUNI_MONITOR_FAILURE_THRESHOLD:-3}
script_dir=$(CDPATH= cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
if [[ -x $script_dir/health-check-staging.sh ]]; then
  tool_dir=$script_dir
else
  tool_dir=$(CDPATH= cd -- "$script_dir/../scripts" && pwd)
fi

sudo install -d -m 0755 "$state_dir"
if "$tool_dir/health-check-staging.sh"; then
  printf '0\n' | sudo tee "$failures_file" >/dev/null
  exit 0
fi

failures=$(cat "$failures_file" 2>/dev/null || printf '0')
[[ $failures =~ ^[0-9]+$ ]] || failures=0
failures=$((failures + 1))
printf '%s\n' "$failures" | sudo tee "$failures_file" >/dev/null
echo "Staging health failure $failures/$threshold" >&2

if (( failures >= threshold )); then
  "$tool_dir/rollback-staging.sh"
  printf '0\n' | sudo tee "$failures_file" >/dev/null
fi
