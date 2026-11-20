#!/bin/zsh

set -euo pipefail

skill_root=${0:A:h:h}

for expected_text in \
  'technical detail available on demand' \
  'references/format.md' \
  'failure paths' \
  'Native `<dialog>` panels'; do
  if ! rg -F --quiet "$expected_text" "$skill_root/SKILL.md" "$skill_root/references/format.md"; then
    print -u2 -- "Missing '$expected_text'"
    exit 1
  fi
done
