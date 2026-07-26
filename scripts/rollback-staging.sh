#!/usr/bin/env bash
set -Eeuo pipefail

script_dir=$(CDPATH= cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
if [[ -x $script_dir/health-check-staging.sh ]]; then
  health_check=$script_dir/health-check-staging.sh
else
  health_check=$(CDPATH= cd -- "$script_dir/../scripts" && pwd)/health-check-staging.sh
fi
deploy_root=${RAMUNI_STAGING_ROOT:-/var/www/ramuni-staging}
current=$(readlink -f "$deploy_root/current")
target=${1:-}

if [[ -z $target ]]; then
  target=$(find "$deploy_root/releases" -mindepth 1 -maxdepth 1 -type d ! -path "$current" -printf '%T@ %p\n' |
    sort -rn | awk 'NR == 1 { sub(/^[^ ]+ /, ""); print; exit }')
elif [[ $target != /* ]]; then
  target="$deploy_root/releases/$target"
fi

case "$target" in
  "$deploy_root"/releases/*) ;;
  *) echo "Refusing rollback target outside releases: $target" >&2; exit 1 ;;
esac
[[ -d $target && -f $target/index.html && -f $target/RELEASE ]] || {
  echo "Rollback target is not a valid release: $target" >&2
  exit 1
}

sudo ln -sfn "$target" "$deploy_root/current.rollback"
sudo mv -Tf "$deploy_root/current.rollback" "$deploy_root/current"
if ! "$health_check"; then
  sudo ln -sfn "$current" "$deploy_root/current.recover"
  sudo mv -Tf "$deploy_root/current.recover" "$deploy_root/current"
  echo "Rollback target failed health checks; restored $current" >&2
  exit 1
fi
echo "Rolled back from $current to $target"
