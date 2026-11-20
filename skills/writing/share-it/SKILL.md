---
name: share-it
description: Turn one published blog post into platform-native promo drafts — LinkedIn, X, Bluesky, Reddit, Hacker News, Dev.to — each written by a drafter, graded by a separate adversarial reviewer, and delivered as a single self-contained HTML page with per-platform copy buttons. Use whenever the user says "share this post", "promote my blog", "write a LinkedIn post about this", "cross-post this", "distribute this article", "make social posts for", or asks where and how to post something they just published. Does NOT post anything — it stops at the clipboard, on purpose.
license: MIT
metadata:
  author: ankitvashisht
  version: "1.0.0"
---

# share-it

One post goes in. Six platform-native drafts come out, each already argued
with by a critic, rendered as a page you can copy from and close.

The bar: **a reader on that platform should not be able to tell it was
promo.** Every platform has a native shape — the LinkedIn hook that survives
truncation, the HN title that doesn't editorialise, the Reddit post that
earns its place in the sub. A draft that ignores the shape gets ignored by
the platform.

This skill never posts. The human is the last step, deliberately: automated
self-promotion is what gets Reddit accounts shadowbanned and HN submissions
buried, and no amount of saved clicking is worth an account.

## Workflow

### 1. Ingest

Read the post from a slug, file path, or URL. You need : title, description,
tags, the full body, and the canonical URL it will be promoted with.

Then classify it, because everything downstream branches on this:

- **tool** — a thing the reader can use or run : a library, a skill, a CLI, a
  technique with code. Tags like `developer tools`, `agent skills`, `react`.
- **essay** — an argument or an experience : philosophy, habits, career,
  learning. Tags like `philosophy`, `writing`, `focus`, `habits`.

If it's genuinely both, classify by what the *first two paragraphs* are
doing. Say the classification out loud before drafting; it decides routing.

### 2. Route

Read `references/routing.md`. Every platform still gets a card — routing only
decides whether that card is **recommended** or **discouraged**, and the
grader is allowed to reject outright. A discouraged card that comes back
`REJECT` is a correct, useful result. Do not soften it.

### 3. Draft — one agent per platform, in parallel

Dispatch one drafter per platform. Each drafter gets exactly three things :

1. the post (title, URL, full body)
2. `references/voice.md` — non-negotiable, read it fully
3. `references/rubrics/<platform>.md` — its own rubric only

Never hand one agent two platforms. The whole point is six independent takes
on the same source; a single agent writing all six produces six paraphrases
of one draft, which is the exact failure this skill exists to avoid.

If the harness has no subagents, do the platforms one at a time in separate
passes — but keep them separate.

### 4. Grade — a fresh critic per draft

Each draft goes to a **new, empty context** told the draft is weak and asked
to prove it. Never let a drafter grade its own work; it turns sycophantic
immediately and the whole loop converges on slop.

Each grader gets the draft, the same rubric, and — if
`~/.share-it/*/`  has history — the **last 3 hooks used on that platform**.
It returns:

```
verdict : PASS | FIX | REJECT
score   : n/10
blockers: [ ship-stoppers, rubric violations, dead hooks ]
nits    : [ improvements that don't block ]
```

`REJECT` means *do not post this here at all* — wrong platform, not a fixable
draft. Carry it through to the page as a rejection with the reason.

Repetition is the loudest tell of machine-written promo. If the hook echoes a
recent one — same opening move, same rhythm, same construction — that is a
blocker, not a nit.

**Length and density are blockers too.** A drafter with a rich source will
write everything it knows, and a grader that only checks voice and hooks will
pass it. Over the platform's target length, or more than one idea, or a
sentence that needs two reads : send it back. "Accurate and well written" is
not a defence — the first fix is always cut, never rephrase.

### 5. Refine — blockers only, two rounds maximum

Send blockers back to the drafter, never nits. Re-grade. **Stop at two
rounds.** A third round against a subjective rubric doesn't converge, it
sands the draft into mush.

Still failing after two? Ship it flagged `⚠ needs you` with the outstanding
blockers shown on the card. A flagged draft the human fixes in 30 seconds
beats a laundered one that reads fine and lands nowhere.

### 6. Render

Build one self-contained page from `references/template.html` at:

```
~/.share-it/<slug>/share.html
```

Then open it (`open` on macOS, `xdg-open` on Linux) and tell the user the
path. Keep the folder — the next run reads it for the repetition check.

Rules for the page:

- **Copy the raw target-format string**, never rich text. Plain text for
  LinkedIn / X / Bluesky, markdown for Reddit / Dev.to, a bare line for HN.
  Rich-text clipboard is exactly what mangles a paste.
- Preserve whitespace exactly — every draft lives in a `<pre>`, and the line
  breaks in it are load-bearing on LinkedIn.
- One card per platform, in routing order, recommended first.
- Show the verdict and score honestly. A `⚠ needs you` badge is information,
  not a failure to hide.

## What this skill does not do

No posting, no OAuth, no scheduling, no metrics. It stops at the clipboard.
If the user asks for auto-posting, tell them the honest tradeoff : the
clicking is two minutes, the account risk on Reddit and HN is permanent, and
the platforms worth automating (LinkedIn, X, Bluesky, Dev.to) are a separate
tool that should consume this one's output.
