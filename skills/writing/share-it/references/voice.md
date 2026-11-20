# Voice

Read this fully before writing a single line. A draft that violates this file
is wrong even if it would perform well — the point is promo that sounds like
the person, not promo that sounds like promo.

This file describes **Ankit's** voice. If you fork this skill, rewrite this
file first; everything else is portable, this isn't.

## Load — one idea, and stop

This is the failure that shows up first and hardest. A draft that is *correct*
on every other rule and carries five ideas is still a bad draft. Nobody reads
it.

- **One idea per post.** Not one idea plus the method, plus the rigour, plus
  the regression check. If a fact is not the idea, cut it. It survives on the
  blog, in the README, in a reply to whoever asks.
- **Say it in the words you'd use out loud.** If a sentence needs a second
  read to parse, rewrite it, however accurate it is. "Modal colour per
  cropped region for fills, 98th-percentile luminance for antialiased text"
  is precise, honest, and nobody finishes it.
- **The reader is not an engineer on this project.** Layout minutiae, token
  provenance, and no-regressions proofs are how *you* know it was hard. They
  are not why *they* should care.
- **Shorter than feels finished.** The instinct that a post looks thin is
  almost always wrong. Cut until it feels slightly bare, then ship it.
- **A screenshot outranks a paragraph.** If an attached image shows the
  thing, do not also describe the thing.

Worked example — a tool post, two new features, the whole idea and no more:

> Ever screenshotted a Slack thread just to explain something?
>
> Two new skins in the leaked chats : Slack and Discord.
>
> Slack was the hard one. It isn't bubbles — it's a full-width feed. Avatar
> gutter, sender name, reaction pills. Nothing from the other six skins
> carried over.
>
> Discord is the second. Threads, roles and embeds all had to fit in one
> PNG.
>
> Type both sides, pick a skin, get a link, an embed, or a PNG. No signup.
>
> Link in the comments.

Note what is *absent*: how the colours were sourced, what the design-tokens
doc says, which other themes changed, how it was verified. All true, all
interesting to the author, none of it in the post.

## The shape of a sentence

- **Short declaratives, then one long one.** The rhythm comes from the
  contrast. Four medium sentences in a row is where drafts go flat.
- **Spaced colon before an explanation** : like this. It's a signature mark —
  use it once or twice, never four times.
- **Em dash for the aside** — the second thought that qualifies the first.
- **Fragments are allowed** when they land. "Applause. Statue. Chapter in a
  textbook."
- No semicolons in social drafts. They read as essay, not as post.

## The moves that actually characterise the writing

**Name the thing, then undercut it.** State the received wisdom plainly,
then show why it's hollow. ("The most quoted line about original genius is a
line denying original genius.")

**Concrete before abstract, always.** A muscle torn under load. A seed
destroyed. An app you have to reinstall and log into. The abstraction arrives
after the example, never instead of it.

**Implicate yourself.** The writing is never delivered from above. "I'm not
writing this as someone who has arrived." "I lived under that rule for
years." If a draft claims authority the author hasn't earned, it's wrong.

**Admit the limit.** Where something is uncertain, say so, in plain words.
Never inflate a claim to make a better hook.

**Arithmetic, not adjectives.** "One person is enough" beats "hugely
impactful". Prefer a mechanism or a number to an intensifier.

**End flat.** No bow, no swelling summary, no call to action. The last line
is quiet and often short. ("Write the thing. Worst case you understand it
better than you did this morning.")

## Register

- First person, past experience, present conclusion.
- Second person only to include the reader in a shared trap, never to
  instruct them from above.
- Confident about what he did, uncertain about what it means.
- Dry, occasionally funny, never zany. Humour comes from precision.
- No exclamation marks. At most one emoji in a whole draft, and only where it
  carries meaning.

## Banned outright

Words and constructions that instantly break the voice:

> game-changer · unlock · leverage (as a verb) · dive deep · delve · in
> today's fast-paced world · here's the thing · let that sink in · the
> results speak for themselves · I'm humbled/thrilled/excited to share ·
> hot take · this changed everything · you won't believe · a thread 🧵 ·
> 10x · supercharge · seamless · journey (for a career) · mindset shift ·
> at the end of the day · needless to say

Structural bans:

- **The emoji-bullet listicle.** `🔥 Point one` / `💡 Point two`. Never.
- **The one-word-per-line stack** used for fake drama.
- **Engagement bait.** "Thoughts? 👇", "Agree?", "Comment X and I'll DM you",
  "Repost if you found this useful", "Follow for more".
- **The fake reveal.** Announcing that you're about to say something
  profound, instead of saying it.
- **Recycling the blog's own sign-off.** "I hope you find this article
  interesting. Thanks for reading. Until then, bye 👋" belongs on the blog
  and only on the blog. Never in a social draft.

## Hooks

The first line does all the work. It must be true, specific, and openable
without the rest.

Good openings, from actual posts :

- A question the reader has felt but not named. *"Have you ever had an idea,
  sat down to write about it, and then stopped because you realised it wasn't
  really yours?"*
- A flat admission. *"That was my week. So I built a skill for it."*
- A mirrored or self-cancelling statement. *"It's the same four words twice,
  mirrored."*
- A concrete scene. *"You ask Claude to review a repo you barely know. It
  comes back with 30 findings."*

Never open with :

- the title of the post
- "I wrote a new blog post about…"
- a statistic with no owner ("90% of developers…")
- a definition ("Neuroplasticity is…")

**Rotate the move.** Check the last three hooks on that platform. If the new
one uses the same opening move as any of them — even with different words —
it's a blocker. Two question-openers in a row reads as a formula, and a
formula reads as automation.

## Give the idea away, keep the payoff

The draft must be worth reading standing alone — an ad for a link is not.
But it must not resolve the tension, or there's no reason to click. Name the
problem in full, gesture at the fact that there's an answer, stop.

The test : if the reader could summarise your conclusion from the post alone,
you gave away too much. If they can't tell what the post is even about, you
gave away too little.
