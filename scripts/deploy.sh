#!/usr/bin/env bash
# Build and deploy to Cloudflare (Worker "specstride-site" with static assets).
# Reads CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID from an env file that never
# enters the repository: $CF_ENV_FILE, default ~/.cf-admin.env.
set -euo pipefail
cd "$(dirname "$0")/.."
ENV_FILE="${CF_ENV_FILE:-$HOME/.cf-admin.env}"
[ -r "$ENV_FILE" ] || { echo "deploy: cannot read $ENV_FILE" >&2; exit 1; }
set -a; . "$ENV_FILE"; set +a
npm run build
npx wrangler deploy
