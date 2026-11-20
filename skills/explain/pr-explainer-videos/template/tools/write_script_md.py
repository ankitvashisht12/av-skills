"""Write script.md (narration by scene, with measured scene lengths) from script.json."""
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
scenes = json.loads((root / "tools/script.json").read_text())
durations = json.loads((root / "src/durations.json").read_text())
out = ["# Narration by scene", ""]
clock = 0.0
for number, scene in enumerate(scenes, 1):
    seconds = durations[scene["id"]]["seconds"]
    out.append(f"## {number}. {scene['title']}  ({int(clock // 60)}:{int(clock % 60):02d}, {seconds:.0f} s)")
    out.append("")
    out.extend(f"- {line}" for line in scene["lines"])
    out.append("")
    clock += seconds
out.append(f"Total: {int(clock // 60)}:{int(clock % 60):02d}")
(root / "script.md").write_text("\n".join(out) + "\n")
print("script.md", round(clock, 1))
