#!/usr/bin/env bash
# Specstride installer: one command for any variant.
#
#   curl -fsSL https://specstride.ai/install.sh | bash -s -- <plugin|dsh|hermes|core> [options]
#
# Variants
#   plugin   the Claude Code plugin (it bundles the core)
#   dsh      the DeepSeek Harness host (pins the core release tarballs)
#   hermes   the Hermes host (pins the core release tarballs)
#   core     the engine on its own: the `specstride` CLI, to run from a shell or to build a host
#
# Options
#   --ref REF     git branch or tag to build (default: main)
#   --src DIR     where clones live (default: $SPECSTRIDE_SRC or ~/.specstride/src)
#   --dry-run     print every command, run none
#   -h, --help    this text
#
# It runs the same steps as https://specstride.ai/install/, in the same order.
# It never uses sudo, never stars a repository for you, and sends nothing anywhere
# except the git clones and npm installs the steps themselves make.
set -euo pipefail

ORG="https://github.com/mairp"
REF="main"
SRC="${SPECSTRIDE_SRC:-$HOME/.specstride/src}"
DRY=0
VARIANT=""

say()  { printf '%s\n' "$*"; }
step() { printf '\n\033[1m==> %s\033[0m\n' "$*"; }
die()  { printf 'specstride-install: %s\n' "$*" >&2; exit 1; }
run()  {
  printf '  $ %s\n' "$*"
  [ "$DRY" = 1 ] && return 0
  "$@"
}
usage() {
  cat <<'USAGE'
Usage: install.sh <plugin|dsh|hermes|core> [--ref REF] [--src DIR] [--dry-run]

  plugin   the Claude Code plugin (it bundles the core)
  dsh      the DeepSeek Harness host (pins the core release tarballs)
  hermes   the Hermes host (pins the core release tarballs)
  core     the engine on its own: the specstride CLI

  --ref REF   git branch or tag to build (default: main)
  --src DIR   where clones live (default: $SPECSTRIDE_SRC or ~/.specstride/src)
  --dry-run   print every command, run none
USAGE
}
# in_dir DIR CMD... : run CMD inside DIR (printed, not entered, on --dry-run)
in_dir() {
  local d="$1"; shift
  printf '  (in %s)\n' "$d"
  if [ "$DRY" = 1 ]; then printf '  $ %s\n' "$*"; return 0; fi
  (cd "$d" && run "$@")
}

while [ $# -gt 0 ]; do
  case "$1" in
    plugin|claude|claude-code) VARIANT=plugin ;;
    dsh) VARIANT=dsh ;;
    hermes) VARIANT=hermes ;;
    core|cli) VARIANT=core ;;
    --ref) [ $# -ge 2 ] || die "--ref needs a value"; REF="$2"; shift ;;
    --src) [ $# -ge 2 ] || die "--src needs a value"; SRC="$2"; shift ;;
    --dry-run) DRY=1 ;;
    -h|--help) usage; exit 0 ;;
    *) die "unknown argument '$1' (want plugin, dsh, hermes or core)" ;;
  esac
  shift
done
[ -n "$VARIANT" ] || die "name a variant: plugin, dsh, hermes or core. Example: curl -fsSL https://specstride.ai/install.sh | bash -s -- plugin"

# --- prerequisites -----------------------------------------------------------
need() { command -v "$1" >/dev/null 2>&1 || die "$1 is not on PATH. $2"; }
case "$(uname -s)" in
  Linux) ;;
  Darwin) say "warning: macOS is not verified; no Mac has run Specstride yet." ;;
  *) say "warning: $(uname -s) is not verified; Linux is." ;;
esac
need git "Install git first."
need node "Install Node 22 or newer (https://nodejs.org)."
need npm "npm comes with Node; install Node 22 or newer."
NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
[ "$NODE_MAJOR" -ge 22 ] || die "Node $NODE_MAJOR found; Specstride needs Node 22 or newer."

doctor_note() { say "  The doctor reported findings above; each line names its fix. Fix them, then run it again."; }
in_git_repo() { git rev-parse --is-inside-work-tree >/dev/null 2>&1; }
HERE="$PWD"

# clone_or_update REPO -> sets DIR
clone_or_update() {
  DIR="$SRC/$1"
  if [ -d "$DIR/.git" ]; then
    step "Updating $1 in $DIR"
    run git -C "$DIR" fetch --quiet origin "$REF"
    run git -C "$DIR" checkout --quiet FETCH_HEAD
  else
    step "Cloning $1 into $DIR"
    run mkdir -p "$SRC"
    run git clone --quiet --branch "$REF" "$ORG/$1" "$DIR"
  fi
}

# The engine CLI tarball a host pins (vendor/core/specstride-<version>.tgz).
pinned_cli() {
  local t
  for t in "$DIR"/vendor/core/specstride-[0-9]*.tgz; do [ -e "$t" ] && { printf '%s\n' "$t"; return 0; }; done
  printf '%s\n' "$DIR/vendor/core/specstride-0.1.0.tgz"
}

STAR_REPOS=()

case "$VARIANT" in
  plugin)
    need claude "Install Claude Code first: https://docs.anthropic.com/claude-code"
    step "Installing the Specstride plugin into Claude Code"
    run claude plugin marketplace add mairp/specstride-plugin
    run claude plugin install specstride@specstride-marketplace
    say ""
    say "Done. Try it on the ready-made example feature first:"
    say "  git clone $ORG/specstride-example && cd specstride-example && claude"
    say "  then say: Run Specstride on the feature in this repo."
    STAR_REPOS=(specstride-plugin specstride-core)
    ;;

  core)
    clone_or_update specstride-core
    step "Building the engine and packing its release"
    run npm --prefix "$DIR" ci --no-audit --no-fund
    in_dir "$DIR" node scripts/pack-release.mjs
    TGZ=""
    for t in "$DIR"/.build/release/specstride-[0-9]*.tgz; do [ -e "$t" ] && TGZ="$t"; done
    [ -n "$TGZ" ] || TGZ="$DIR/.build/release/specstride-0.1.0.tgz"
    step "Installing the specstride CLI"
    run npm install -g --no-audit --no-fund "$TGZ"
    step "Checking"
    run specstride --protocol
    if in_git_repo; then run specstride doctor || doctor_note; else say "  (not in a git repository: run 'specstride doctor' in yours)"; fi
    STAR_REPOS=(specstride-core)
    ;;

  dsh)
    need dsh "Install the DeepSeek Harness (dsh 0.1.0-rc.8): https://github.com/deepseek-ai/deepseek-harness"
    clone_or_update specstride-dsh
    step "Building the dsh host (pinned engine tarballs, every build gate)"
    run npm --prefix "$DIR" install --no-audit --no-fund
    run npm --prefix "$DIR" run build
    step "Installing specstride-host-dsh and the specstride CLI it pins"
    in_dir "$DIR" npm install -g --no-audit --no-fund . "$(pinned_cli)"
    if in_git_repo; then
      step "Installing the skills into this repository ($HERE/.dsh/skills/)"
      run specstride-host-dsh install --project
      run specstride-host-dsh doctor || doctor_note
    else
      say ""
      say "Not in a git repository, so the skills were not installed. In your repository, run:"
      say "  specstride-host-dsh install --project && specstride-host-dsh doctor"
    fi
    say ""
    say "Then, in a dsh session in your repository, say:"
    say "  run the specstride-run skill in dry-run on the feature"
    STAR_REPOS=(specstride-dsh specstride-core)
    ;;

  hermes)
    need hermes "Install Hermes 0.22.2 (hermes-agent) first: https://github.com/hermes-agent/hermes-agent"
    if ! hermes profile list 2>/dev/null | grep -qw specstride; then
      step "Creating the Hermes profile 'specstride'"
      run hermes profile create specstride
    fi
    clone_or_update specstride-hermes
    step "Building the Hermes host (pinned engine tarballs, every build gate)"
    run npm --prefix "$DIR" install --no-audit --no-fund
    run npm --prefix "$DIR" run build
    step "Installing specstride-host-hermes and the specstride CLI it pins"
    in_dir "$DIR" npm install -g --no-audit --no-fund . "$(pinned_cli)"
    step "Installing the skills and the plugin into the 'specstride' profile"
    run specstride-host-hermes install --profile specstride
    run specstride-host-hermes doctor || doctor_note
    say ""
    say "Then, in a Hermes session on your repository (hermes -p specstride), say:"
    say "  run the specstride-run skill in dry-run on the feature"
    say "Add --with-kanban to 'specstride-host-hermes install' for the kanban board."
    STAR_REPOS=(specstride-hermes specstride-core)
    ;;
esac

say ""
say "Useful? A star on GitHub helps others find Specstride:"
for r in "${STAR_REPOS[@]}"; do say "  $ORG/$r"; done
say "(with the GitHub CLI: gh api -X PUT user/starred/mairp/${STAR_REPOS[0]})"
