# Brief template (copy to `<run>/BRIEF.md`, fill the <…> parts)

Write `<skill>` and `<run>` as absolute paths in the brief. Keep the line in [brackets] only if the
feature has an AI step; otherwise write "This feature has no AI step."

```markdown
# Shared brief: <feature> explainer videos

## Goal
<Owner> owns this code but does not know some of its paths. Each video makes the viewer understand, step by
step, what the system does: what starts each step, what goes in, how it decides, what comes out, what
is stored, what happens next, and what happens when something fails.
[The AI steps: say what the AI receives, the rules it is given, and how its output is checked.]

## Source of truth
Repo (READ ONLY — do not edit, commit, push, or touch git state): <absolute repo/worktree path>, <PR/branch>.
<If the PR is not checked out: read files with `git show "<sha>:path"` (keep the quotes in zsh); cite the sha in facts.md.>
Every claim comes from the code: read the code, prompts, schedules, limits and constants. Use the real
numbers. Not sure? Read more code; never guess. Keep `facts.md` in your folder: each fact → file:line.
Code areas: <list per feature, with paths>. Use `git grep` to find callers, crons and UI labels.

## Narration and scenes
Follow `<skill>/references/narration.md` exactly.
Word budget: <full loop ≤ 900 / deep dive ≤ 750> words (130 words ≈ 1 min). Count the words before you voice.

## Project
Your folder was made from the skill template; `node_modules` is a symlink to the shared install.
Do NOT run npm install. Pipeline and commands: `<skill>/SKILL.md` → "Per-video pipeline".
Composition id: `Explainer`. Voice: am_michael, speed 0.9. Never say or show which voice tool is used.

## Machine limits
Several videos are made at the same time on one laptop. Run every heavy step (voice, render) through
`python3 <run>/_shared/run_heavy.py -- <command>`. No tsc, builds, tests, or dev servers.

## Done means
- `final.mp4` rendered; `tools/check.sh` shows video ≈ audio length and max volume ≈ −1.5 dB.
- You LOOKED at every scene still and the 8 final frames (Read the PNGs): text fits, no overlap,
  each frame matches what the voice says.
- `script.md`, `facts.md`, source in the folder.
Report: final.mp4 path, duration, a 10–15 line plain summary of what the video explains, the answers to
the viewer's questions, and code facts that look wrong or that you were not sure about.
```
