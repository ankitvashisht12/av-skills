#!/usr/bin/env bash
# Link every skill outside in-progress/ into the local agent skill folders.
# Each link points into this repo, so `git pull` updates the installed skills.
set -euo pipefail
REPO="$(cd "$(dirname "$0")/.." && pwd)"
for dest in "$HOME/.claude/skills" "$HOME/.agents/skills"; do
  mkdir -p "$dest"
  while IFS= read -r -d '' skill_md; do
    src="$(dirname "$skill_md")"
    ln -sfn "$src" "$dest/$(basename "$src")"
    echo "linked $(basename "$src") -> $dest"
  done < <(find "$REPO/skills" -name SKILL.md -not -path '*/node_modules/*' -not -path '*/in-progress/*' -print0)
done
