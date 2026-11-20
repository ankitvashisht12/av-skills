# Public inspiration

These instructions are original wording. The sources below informed the design. This file records ideas and choices; it is not a runtime dependency. Reviewers do not need these tools, models, or repositories installed.

- [Matt Pocock: code review](https://github.com/mattpocock/skills/tree/59db609eb1e18aaf59b63284d0e52255aff0c63c/skills/engineering/code-review) — check stated requirements and local rules. Add behavior and failure analysis; do not turn code smells into required changes. MIT.
- [P-Stack: interrogate](https://github.com/cursor/plugins/blob/e58dd043600587dbaf58ba315e7f2b38373eeb43/pstack/skills/interrogate/SKILL.md) — prove a reachable failure and inspect the first faulty decision. Prefer safe reproduction; permit a complete code trace when execution is unavailable. MIT.
- [Addy Osmani: review and quality](https://github.com/addyosmani/agent-skills/tree/aeac41d4d005999432bb7312f7ff06383a91d59d/skills/code-review-and-quality) — review business behavior and integration contracts; allow net improvement without requiring perfection. MIT.
- [Anthropic: code review](https://github.com/anthropics/claude-plugins-official/blob/df9699a55c56707e9948a32951ea356638ea8519/plugins/code-review/commands/code-review.md) and [PR review toolkit](https://github.com/anthropics/claude-plugins-official/blob/df9699a55c56707e9948a32951ea356638ea8519/plugins/pr-review-toolkit/commands/review-pr.md) — choose relevant checks, verify candidates, and control posting. Do not inherit fixed panels or exclusions for input-dependent defects. Apache-2.0.
- [Sentry: code review](https://github.com/getsentry/skills/blob/a582c51ee29d0f35e6ac321340796f77d43da733/skills/code-review/SKILL.md) and [find bugs](https://github.com/getsentry/skills/blob/a582c51ee29d0f35e6ac321340796f77d43da733/skills/find-bugs/SKILL.md) — map changed input and trust boundaries, verify existing guards, and state coverage gaps. Apache-2.0.
- [Anthropic: security review](https://github.com/anthropics/claude-code-security-review/blob/0c6a49f1fa56a1d472575da86a94dbc1edb78eda/.claude/commands/security-review.md) — use repository threat context and concrete attack paths. Do not inherit broad exclusions for resource exhaustion or dependency risks. MIT.
- [PostHog: validation criteria](https://github.com/PostHog/ai-plugin/blob/95f1802ee8c7e6cfa5f238fc104a6a441540383e/skills/review-hog-validation-criteria/SKILL.md) — examine complete thread context and challenge whether a reported path can occur. No source prose or code was copied. A public repository does not by itself grant a reuse license.

The skill keeps one cause per finding, accepts an empty review, and avoids mandatory overlapping review panels, severity scores, style quotas, or repeated polish passes. Source licenses are listed for attribution; they do not choose a license for this new skill.

## Human review examples

Public review discussions also informed the workflow. These are examples, not proof that every suggestion was correct or a benchmark of this skill.

- [Google's review standard](https://google.github.io/eng-practices/review/reviewer/standard.html) and [comment guidance](https://google.github.io/eng-practices/review/reviewer/comments.html): accept useful progress and distinguish a required change from a preference.
- [Next.js: behavior-sensitive tests](https://github.com/vercel/next.js/pull/81396#discussion_r2225416140): a generated-file snapshot does not establish correct type checking.
- [Next.js: safe separate work](https://github.com/vercel/next.js/pull/31936#discussion_r813229556): preserve compatibility now; an independent warning or mode can follow separately.
- [Rust: recoverable errors](https://github.com/rust-lang/rust/pull/69864#discussion_r473673789): verify the result that callers receive when an operation fails.
- [Django: disputed hardening](https://github.com/django/django/pull/18627#discussion_r1829276892): read author replies and distinguish a concrete risk from a simpler-design preference.
- [CPython: concurrent state](https://github.com/python/cpython/pull/124640#discussion_r1781868015): short changes to shared state can require checks in an affected build mode.
