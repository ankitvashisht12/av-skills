#!/bin/zsh
# Render the video, then normalize loudness (Kokoro output is quiet) into final.mp4.
setopt pipefail
cd "$(dirname $0)/.."
mkdir -p out
npx remotion render src/index.ts Explainer out/raw.mp4 --concurrency=2 2>&1 | grep -v -E "^(Rendered|Stitched|Bundling) " || exit 1
ffmpeg -y -loglevel error -i out/raw.mp4 -c:v copy -af loudnorm=I=-16:TP=-1.5 -ar 48000 -c:a aac -b:a 192k final.mp4 && echo final.mp4
