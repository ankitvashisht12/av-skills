# Narration and scene design

## The story shape

**Full-loop video** (always):
1. *The whole path*: one diagram with every stage (max 7 boxes; group small stages into one box).
   Legend: blue = automatic, amber = a person.
2. *The example*: one made-up entity with one concrete event that matters (a chat where the agent gives
   a wrong refund window and the approved policy says otherwise). Show it as a card.
3. *How it is saved*: what the system records, and when.
4. One scene per stage, titled "Step N · <stage>". Each scene says: the trigger with its real interval,
   what the stage reads, what it decides and by which rule, what it writes, and when our example comes out.
5. *The paths at the end*: every end state or branch the entity can take, and what moves it there.
   For a feature with a cycle (new data feeds the first stage again), add *the loop repeats*.
6. *Recap*: a timeline of the example. Steps that run at a time get day + time; steps that run when
   someone opens a page say "when the page opens". Automatic steps in blue, person steps in amber.

**Deep-dive video** (one feature):
1. The whole feature in one picture.
2. What starts it (every trigger, and when it does NOT start).
3. What it picks (which items, how many, from which window, in which order, and why).
4. How it decides. With an AI step: what the AI receives and is asked, the exact rules it gets for each
   output kind, one sample card per kind. Without one: the rules or the formula, with one worked example.
5. How bad input or output is caught (validation, repair, drop, retry) and how duplicates merge.
6. What is stored and what the user sees in the UI; what the user can do next (one sentence hands off to
   the next video).
7. Edge paths: no data, budget, failures, stale data, data that changes after it was processed.
8. Recap: the same picture as scene 1, with the numbers on it.

## Sentence rules

- One idea per sentence. Short sentences. Active voice. Present tense.
- Each `lines` entry = one sentence (two short ones at most). Each line gets one on-screen caption of
  max ~8 words (written in `<Captions lines>` in `Scenes.tsx`), and each line reveals one visual element.
- Use "when X happens, then Y; after that, Z".
- Real numbers from the code: "up to 100 chats", "every 15 minutes", "0.7 or more", "$1 per agent per UTC day".
- No function, file, table, field, vendor or internal component names. Say "the system", "the AI",
  "a person", "the analytics store", "a queue", and the product words the UI shows.
- URLs, emails and clock times: keep them short in the line ("acme dot com slash visit" is long; prefer
  "the visit link") and put the shown form on screen. Every one that stays in a line needs a
  `spoken.json` replacement.
- No analogies or metaphors. Say the mechanism directly.
- When the user believed something false, correct it in one plain sentence.
- When a fact is an estimate or not proven, say "about" or leave it out. Put it in the report.

## Scene rules

- 1920x1080, dark background, kit colors only (`src/kit.tsx`: auto, person, ai, fail, pass).
- Title area top-left (`Header`), caption bar at the bottom (`Captions`). Keep content between y = 180 and 940.
- The visual grows with the voice: `at={lineIndex}` plus a small `delay`. Nothing appears before its line.
- Prefer: boxes and labeled arrows (the label = the trigger), sample cards (chat bubbles, a finding card),
  counters for numbers, a filling bar for a time window or a threshold, a checklist for rules.
- Max 7 boxes on screen at once. Font ≥ 24 px. No paragraphs on screen.
- Reuse one diagram component for the opening and the recap,
  so the viewer sees the same map twice.
