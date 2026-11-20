"""Local Kokoro speech: one wav per scene in public/audio, plus src/durations.json with line start times.

Usage: speech.py [scene-id ...]   (no ids = all scenes; ids = re-voice only those scenes)
"""
import json
import os
import re
import sys
from pathlib import Path

os.environ.update(OMP_NUM_THREADS="2", OPENBLAS_NUM_THREADS="2", VECLIB_MAXIMUM_THREADS="2")
import numpy as np
import onnxruntime as ort
import soundfile as sf
from kokoro_onnx import Kokoro
from misaki import en

ROOT = Path(__file__).resolve().parents[1]
MODELS = Path(os.environ.get(
    "KOKORO_MODELS",
    Path.home() / ".cache/kokoro"))
VOICE = os.environ.get("KOKORO_VOICE", "am_michael")
SPEED = float(os.environ.get("KOKORO_SPEED", "0.9"))
SAMPLE_RATE = 24000
LEAD_IN = 0.35
LINE_GAP = 0.35
TAIL = 0.6


def load_spoken():
    path = ROOT / "tools/spoken.json"
    return json.loads(path.read_text()) if path.exists() else {"replace": {}, "ipa": {}}


def spoken(text: str, rules: dict) -> str:
    for written, said in rules.get("replace", {}).items():
        text = text.replace(written, said)
    for word, ipa in rules.get("ipa", {}).items():
        text = re.sub(rf"\b{re.escape(word)}\b", f"[{word}]({ipa})", text)
    return re.sub(r"\s·\s", ", ", text)


def main():
    only = set(sys.argv[1:])
    scenes = json.loads((ROOT / "tools/script.json").read_text())
    rules = load_spoken()
    converter = en.G2P(trf=False, british=False)
    options = ort.SessionOptions()
    options.intra_op_num_threads = 2
    options.inter_op_num_threads = 1
    session = ort.InferenceSession(str(MODELS / "kokoro-v1.0.onnx"), options,
                                   providers=["CPUExecutionProvider"])
    engine = Kokoro.from_session(session, str(MODELS / "voices-v1.0.bin"))
    audio_dir = ROOT / "public/audio"
    audio_dir.mkdir(parents=True, exist_ok=True)
    durations_path = ROOT / "src/durations.json"
    durations = json.loads(durations_path.read_text()) if durations_path.exists() else {}
    for scene in scenes:
        if only and scene["id"] not in only:
            continue
        parts = [np.zeros(round(LEAD_IN * SAMPLE_RATE), np.float32)]
        cursor = LEAD_IN
        line_starts = []
        for line in scene["lines"]:
            phonemes, _ = converter(spoken(line, rules))
            # ❓ = Misaki does not know a word. Add it to tools/spoken.json ("ipa" or "replace").
            assert "❓" not in phonemes, (line, phonemes)
            audio, rate = engine.create(phonemes, voice=VOICE, speed=SPEED, is_phonemes=True)
            assert rate == SAMPLE_RATE
            line_starts.append(round(cursor, 3))
            parts.append(audio.astype(np.float32))
            cursor += len(audio) / rate
            parts.append(np.zeros(round(LINE_GAP * SAMPLE_RATE), np.float32))
            cursor += LINE_GAP
        cursor += TAIL - LINE_GAP
        total = np.concatenate(parts)
        total = np.pad(total, (0, max(0, round(cursor * SAMPLE_RATE) - len(total))))
        sf.write(audio_dir / f"{scene['id']}.wav", total, SAMPLE_RATE, subtype="PCM_16")
        durations[scene["id"]] = {"seconds": round(cursor, 3), "lineStarts": line_starts}
        print(scene["id"], round(cursor, 2), flush=True)
    order = [scene["id"] for scene in scenes]
    durations = {scene_id: durations[scene_id] for scene_id in order if scene_id in durations}
    durations_path.write_text(json.dumps(durations, indent=1))
    print("TOTAL", round(sum(item["seconds"] for item in durations.values()), 1))


if __name__ == "__main__":
    main()
