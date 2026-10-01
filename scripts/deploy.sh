#!/usr/bin/env bash
# Build and deploy to Cloudflare (Worker "specstride-site" with static assets).
# The committed site-mode file decides what ships: "live" builds and deploys the
# full site; "construction" deploys only the placeholder. Reads
# CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID from an env file that never
# enters the repository: $CF_ENV_FILE, default ~/.cf-admin.env.
set -euo pipefail
cd "$(dirname "$0")/.."
MODE="$(tr -d '[:space:]' < site-mode)"
ENV_FILE="${CF_ENV_FILE:-$HOME/.cf-admin.env}"
[ -r "$ENV_FILE" ] || { echo "deploy: cannot read $ENV_FILE" >&2; exit 1; }
set -a; . "$ENV_FILE"; set +a
case "$MODE" in
  live)         npm run build && npx wrangler deploy ;;
  construction) node scripts/gen-ascii.mjs && node scripts/build-construction.mjs && npx wrangler deploy -c wrangler.construction.jsonc ;;
  *) echo "deploy: site-mode must be 'live' or 'construction', got '$MODE'" >&2; exit 1 ;;
esac
