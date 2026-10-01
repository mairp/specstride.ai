#!/usr/bin/env bash
# Subsets JetBrains Mono (no-ligature build) to the glyphs the site uses, including
# box drawing and block elements for the ASCII art, which the usual web subsets
# leave out. Needs fonttools + brotli (pip install fonttools brotli) and the
# `jetbrains-mono` npm tarball unpacked at $1. The output is committed, so a
# normal build never runs this. The font licence is public/fonts/OFL.txt.
set -euo pipefail
SRC="${1:?path to unpacked jetbrains-mono package}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
WEB="U+0020-007E,U+00A0-00FF,U+2010-2027,U+2030-205E,U+2190-21FF,U+2212,U+2500-257F,U+2580-259F,U+25A0-25FF,U+2600-27BF"
OG="U+0020-007E,U+00A0-00FF,U+2010-2027,U+2190-21FF,U+2500-257F,U+2580-259F,U+25A0-25FF,U+2713,U+2717"
for w in Regular Bold; do
  # decompress first: subsetting straight from WOFF2 gives a TTF that resvg can't read
  python3 -c "from fontTools.ttLib import TTFont; f=TTFont('$SRC/fonts/webfonts/JetBrainsMonoNL-$w.woff2'); f.flavor=None; f.save('$TMP/$w.ttf')"
  pyftsubset "$TMP/$w.ttf" --unicodes="$WEB" --flavor=woff2 --layout-features='*' \
    --output-file="$ROOT/public/fonts/jetbrains-mono-$w.woff2"
  # TTF copy for the build-time OG image renderer (resvg reads TTF, not WOFF2)
  pyftsubset "$TMP/$w.ttf" --unicodes="$OG" --output-file="$ROOT/scripts/assets/JetBrainsMonoNL-$w.ttf"
done
ls -l "$ROOT/public/fonts" "$ROOT/scripts/assets"
