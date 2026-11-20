---
name: pr-explainer-videos
description: Use when asked to make explainer videos, a walkthrough video, or "a video that shows how it works" for a PR, branch, feature or pipeline — especially when the owner does not yet understand some paths (what triggers what, how the AI decides, what happens on failure). Narrated, animated 1920x1080 videos with Remotion and a local Kokoro voice.
---

# PR explainer videos

## Overview

Turn a PR (or branch, or feature) into a set of narrated, animated videos that explain **how the system
works, step by step, from the code**: what starts each step, what goes in, what the AI is asked, what comes
out, what is stored, what happens next, and what happens when something goes wrong.

The best video is the **full-loop video**: it follows ONE concrete example (one
made-up request or record with one real mistake) through every stage, with a timestamp at each step and the trigger
written on every arrow. Always make that video. Deep-dive videos per key feature are optional extras.

## Workflow

`<skill>` below = the absolute path of this skill folder. `<run>` = the run folder:
a folder outside the repository, for example `~/videos/<project>/<YYYY-MM-DD>-<slug>/` (create it first).

1. **Recon the PR.** `gh pr view <n>` + `gh pr diff <n> --name-only` (or `git diff main...HEAD --stat`).
   - PR not checked out (merged, other branch): read files at its head with
     `git show "${sha}:path/to/file"` (quote it: in zsh `$sha:a…` is a modifier). `facts.md` cites that sha.
   Find two things:
   - **The loop**: the one entity that flows through the system (a conversation, an order, a link, a job…)
     and the ordered stages it passes. For each stage: automatic or a person; the trigger (event, schedule +
     interval, button, "when someone opens the page").
   - **Key features**: stages that need more than ~90 s to explain (an AI decision, a state machine, many
     rules or branches). Each can get a deep-dive video.
2. **Collect the viewer's questions.** Copy the user's own questions word for word. If the user gave one
   broad question, keep it and add the 3–5 concrete questions an owner who did not read the code would ask.
   Each video must answer the questions given to it.
3. **Plan the set** in `<run>/PLAN.md`. Video 1 = full loop (always). Add one deep dive per key feature,
   max 4 videos. No key features → full loop only. Per video: `## NN-name`, topic, questions (numbered).
4. **Set up.** Per video: `zsh <skill>/scripts/new-video.sh <run> <NN-name>` (copies the template; the
   first call does one `npm install` into `<run>/_shared`, needs network).
5. **Write `<run>/BRIEF.md`** from `references/brief-template.md` (fill in repo path or sha, code areas,
   word budget; keep or drop the AI line).
6. **Dispatch one subagent per video**, all in ONE message so they run in parallel: Agent tool,
   `subagent_type: general-purpose`, foreground. Prompt = brief path + folder + topic + the questions
   (verbatim) + for the full loop: the loop stages and "follow one made-up concrete example". Expect ~60–80
   min and ~300k tokens per video.
7. **Collect.** Check each `final.mp4` exists (`ffprobe` duration). Report to the user: paths (full loop
   first), durations, the short answers to their questions, and the **code facts that look wrong** that the
   agents found (narrating code exposes bugs: wrong help text, unreachable paths).
8. **Do not attach the videos to the PR or push anything** unless the user asks. When asked:
   `gh pr edit <n> --body-file body.md --attach ./video.mp4` (gh ≥ 2.103). Never name the voice tool.

## Per-video pipeline (subagents follow this; it is in the brief too)

| Step | Command (run inside the video folder) |
|---|---|
| Facts from code | write `facts.md`: fact → `file:line` |
| Script | `tools/script.json`: scenes → `lines` (1 line = 1–2 short sentences = 1 caption = 1 reveal) |
| Pronunciation | `tools/spoken.json`: `replace` (times, URLs, emails, big numbers → spoken words) and `ipa` (unknown words) |
| Voice | `python3 ../_shared/run_heavy.py -- $KOKORO_PY tools/speech.py [scene-ids]` |
| Script doc | `$KOKORO_PY tools/write_script_md.py` (needs the voice step; before it, write `script.md` by hand) |
| Scenes | `src/Scenes.tsx`: one component per scene id; `at={n}` = show when line n starts; captions go in `<Captions lines>` here |
| Layout check | `zsh tools/stills.sh [scene-ids]` → Read each `frames/<id>.png` |
| Render | `python3 ../_shared/run_heavy.py -- zsh tools/render.sh` |
| Final check | `zsh tools/check.sh` → Read `frames/final/*.png` |

`KOKORO_PY` = the Python of a virtual environment that has kokoro-onnx installed.
`KOKORO_MODELS` = the folder with the model files (default `~/.cache/kokoro`). Voice `am_michael` (male),
speed 0.9 (`KOKORO_VOICE`, `KOKORO_SPEED`). Missing setup: `uv venv` + `uv pip install kokoro-onnx misaki[en] soundfile`,
and download `kokoro-v1.0.onnx` + `voices-v1.0.bin` from the kokoro-onnx GitHub release `model-files-v1.0`.

## What makes the video good

Narration rules and scene design: `references/narration.md`. The core:
- One concrete, made-up example entity (never real customer data), with clock times on the steps that
  run at a time ("Monday 14:10 UTC… Tuesday 06:05…").
- Every arrow says what starts the next step (a person / a schedule with its interval / an event / a page
  read) and how long it takes.
- Blue = automatic, amber = any person (customer or team), purple = AI, red = fail, green = pass.
- Real numbers from the code (caps, windows, thresholds, intervals). Plain words; no function, file,
  table, vendor or internal component names ("the analytics store", not the product name).
- Edge paths: no data, failures and retries, the entity changes after it was processed, and (when the
  feature has them) budget limits and bad AI output.
- Opens with the whole path in one picture; closes with a recap timeline of the same picture.

## Common mistakes (seen in the reference run)

| Mistake | Fix |
|---|---|
| Deep dives ran 7.5–8 min (target 6) | Word budget in the brief: 130 words ≈ 1 min at speed 0.9. Full loop ≤ 900 words, deep dive ≤ 750. Cut lines that answer no question and name no trigger or number. |
| Narrating the user's wrong guess ("selects 20 samples") | The code wins. Say the correction plainly: "A run takes up to 100 chats, not 20." |
| Using the user's label for a product term | Use the label the UI shows ("Unmet demand"), and say it once when the user used another word. |
| Each agent runs `npm install` / renders at once | Shared install via `new-video.sh`; every heavy step through `run_heavy.py`; `--concurrency=2`. No tsc, builds or tests. |
| Text overlaps or runs off screen | Run `stills.sh` per scene BEFORE the full render; look at every still. |
| Quiet audio | `render.sh` applies `loudnorm=I=-16:TP=-1.5`; `check.sh` must show max ≈ −1.5 dB. |
| Misaki `❓` assert in `speech.py` | Add the word to `spoken.json` (`ipa` or `replace`), re-voice only that scene. |
| Word count ignores URLs, times and numbers that are spoken as several words | Count the words after the `spoken.json` replacements; stay ~5% under the budget. |
| Video length ≠ audio length | Scene length comes only from `durations.json`; never hard-code frames. |
