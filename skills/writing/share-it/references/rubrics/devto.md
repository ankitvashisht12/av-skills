# Rubric — Dev.to

This is not a copywriting job. It's a **conversion** : the whole post, moved
to Dev.to's markdown, with the canonical URL pointing home.

The card carries the complete article, ready to paste into Dev.to's markdown
editor.

## Frontmatter

```yaml
---
title: <the original title>
published: false
description: <the original description, ≤ 160 chars>
tags: <up to 4, lowercase, no spaces, no hashes>
canonical_url: <the original post URL>
cover_image: <absolute URL, or omit>
---
```

`canonical_url` is the point of the entire exercise. Without it this is
duplicate content competing with the author's own site. It is a blocker, not
a nit.

`published: false` so the human presses publish, consistent with this skill
never publishing anything.

## Conversion rules

- Strip every JSX/MDX component. Custom components become plain markdown, or
  are dropped if they don't survive the trip.
- Rewrite relative links (`/blog/x`) as absolute URLs to the live site.
- Rewrite relative image paths as absolute URLs.
- Keep code fences and their language tags.
- Dev.to accepts a `{% embed %}` liquid tag for common sources — use it only
  where an embed genuinely beats a link.
- Do not rewrite the prose. This is the author's article, not a summary.

## Blockers

- [ ] `canonical_url` present and pointing at the original post
- [ ] `published: false`
- [ ] ≤ 4 tags, lowercase, no `#`
- [ ] No MDX/JSX components left in the body
- [ ] No relative URLs anywhere — links or images
- [ ] Body is the full article, not a summary or an excerpt
- [ ] Code fences intact with language tags

## Nits

- Tags that actually exist on Dev.to and have followers beat invented ones
- Description ≤ 160 characters
- A cover image measurably helps; note it if one is missing

## Score

- **9–10** — pastes in and publishes with zero edits
- **7–8** — one small fix needed
- **5–6** — several manual fixes, or tags are guesses
- **≤4** — a blocker, most likely a missing canonical URL
