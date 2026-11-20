#!/bin/zsh
# Usage: new-video.sh <run-dir> <video-folder-name>
# Creates <run-dir>/_shared (one Remotion install for all videos of the run) and a video project from the template.
set -e
SKILL="$(cd "$(dirname $0)/.." && pwd)"
RUN="$1"; NAME="$2"
[[ -z "$RUN" || -z "$NAME" ]] && { echo "usage: new-video.sh <run-dir> <video-folder-name>"; exit 1; }
mkdir -p "$RUN"
if [[ ! -d "$RUN/_shared/node_modules" ]]; then
  mkdir -p "$RUN/_shared" && cp "$SKILL/template/package.json" "$RUN/_shared/"
  (cd "$RUN/_shared" && npm install --no-audit --no-fund --loglevel=error)
fi
cp "$SKILL/scripts/run_heavy.py" "$RUN/_shared/run_heavy.py"
[[ -e "$RUN/$NAME" ]] && { echo "$RUN/$NAME exists"; exit 1; }
cp -R "$SKILL/template" "$RUN/$NAME"
ln -s ../_shared/node_modules "$RUN/$NAME/node_modules"
echo "$RUN/$NAME"
