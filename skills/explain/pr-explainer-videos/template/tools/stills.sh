#!/bin/zsh
# Bundle once, then render one still per scene, 1 s before the scene ends (all reveals done).
# Optional args: scene ids to render only those.
cd "$(dirname $0)/.."
mkdir -p frames
npx remotion bundle src/index.ts --out-dir=build --log=error >/dev/null || exit 1
node -e '
const d = require("./src/durations.json"); const only = process.argv.slice(1); let end = 0;
for (const [id, t] of Object.entries(d)) { end += Math.ceil(t.seconds * 30); if (!only.length || only.includes(id)) console.log(id, end - 30) }
' "$@" | while read id frame; do
  npx remotion still build Explainer frames/$id.png --frame=$frame --log=error >/dev/null && echo frames/$id.png
done
