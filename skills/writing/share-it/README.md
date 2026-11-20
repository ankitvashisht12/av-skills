# share-it

An [Agent Skill](https://agentskills.io) that turns one published blog post
into six platform-native promo drafts — LinkedIn, X, Bluesky, Reddit, Hacker
News, Dev.to — and hands them to you on one page with copy buttons.

It does not post anything. That's deliberate.

## Why

Writing the post is the hard part, and then it reaches the four people who
already read your blog. The distribution work that fixes that is genuinely
annoying : six platforms, six different shapes, and the same idea rewritten
six times without sounding like six paraphrases of one draft.

That's the part worth automating. The clicking is two minutes.

## How it works

```
/share-it <slug | path | url>

  ingest ─ read the post, classify it as a tool post or an essay
  route  ─ a table decides which platforms suit it, and which to discourage
  draft  ─ one agent per platform, in parallel, each with only its own rubric
  grade  ─ a separate agent per draft, fresh context, told to prove it's bad
  refine ─ blockers only, two rounds maximum, then ship it flagged
  render ─ one self-contained HTML page, opened for you
```

The drafter never grades its own work. That single rule is most of the
quality — a model asked to review its own draft turns agreeable immediately.

The grader can return **REJECT**, meaning don't post this here at all. An
essay does not belong on Hacker News, and a tool that says so is more useful
than one that always produces six confident drafts.

## Install

```bash
npx skills add ankitvashisht12/av-skills --skill share-it
```

Then just ask :

> "share my latest post"
>
> "write the social posts for /blog/why-i-started-writing-again"
>
> "where should I post this, and what should the LinkedIn version say?"

## Make it yours

Everything portable lives in `references/`. One file isn't :

**`references/voice.md`** describes my writing voice. Rewrite it before you
use this, or every draft will sound like me instead of you. It's the only
file that matters for whether the output is usable.

`references/rubrics/*.md` hold the per-platform rules — hook length, link
placement, what gets a submission flagged. These get better every time you
learn something about a platform; add it to the rubric, not to a prompt.

## Output

`~/.share-it/<slug>/share.html` — self-contained, works from disk, light and
dark. Each card carries the draft in a `<pre>`, a live character count, the
grader's verdict and score, remaining nits in a fold, and a copy button that
copies the **raw** string (plain text or markdown, per platform — rich-text
clipboard is what mangles pastes).

The folder is kept so the next run can check your last three hooks per
platform and block you from repeating yourself. Repetition is the loudest
tell of machine-written promo.

## What it deliberately doesn't do

No posting, no OAuth, no scheduling, no analytics. Reddit and Hacker News in
particular punish automated self-promotion permanently, and no amount of
saved clicking is worth an account. The human is the last step.

MIT.
