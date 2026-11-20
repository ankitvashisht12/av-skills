#!/bin/zsh
# Final-file checks: video vs audio length, loudness, and 8 evenly spaced frames to LOOK at.
cd "$(dirname $0)/.."
probe() { ffprobe -v error -select_streams $1:0 -show_entries stream=duration -of default=nw=1:nk=1 final.mp4 }
video=$(probe v); audio=$(probe a)
echo "video ${video}s  audio ${audio}s"
ffmpeg -hide_banner -i final.mp4 -af volumedetect -vn -f null - 2>&1 | grep -E "mean_volume|max_volume"
mkdir -p frames/final
for index in {1..8}; do
  ffmpeg -y -loglevel error -ss $(( video * (index - 0.5) / 8 )) -i final.mp4 -frames:v 1 frames/final/$index.png
done
ls frames/final/*.png
