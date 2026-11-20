# av-skills

Agent skills that I use for real engineering work. They work with Claude Code, Codex, and other harnesses that read `SKILL.md` files.

## Install

**Claude Code**

```bash
claude plugin marketplace add ankitvashisht12/av-skills
claude plugin install av-skills@av-skills
```

**One skill, any harness**

```bash
npx skills add ankitvashisht12/av-skills --skill ultimate-review
```

**From a clone** (links every skill into `~/.claude/skills` and `~/.agents/skills`)

```bash
git clone https://github.com/ankitvashisht12/av-skills && av-skills/scripts/link-skills.sh
```

## Skills

### Code review

- [ultimate-review](skills/code-review/ultimate-review/SKILL.md): review a PR, branch, or local diff. It reports only supported defects, separates "Fix in this PR" from "Follow-up", reads existing discussion to avoid duplicates, and supports repeat reviews after fixes. A second agent, on another model when one is available, checks every rejected candidate.
- [review-learn](skills/code-review/review-learn/SKILL.md): after a PR merges, compare the earlier review with the human comments. It proposes rule changes for the repository docs or the review skill. Proposals only.

### Explain

- [explain-it](skills/explain/explain-it/SKILL.md): a small static HTML site that explains a change, a bug, or a subsystem to a reader who does not know the codebase.
- [flow](skills/explain/flow/SKILL.md): one compact interactive HTML journey for a feature, subsystem, or user flow.
- [pr-explainer-videos](skills/explain/pr-explainer-videos/SKILL.md): narrated, animated explainer videos for a PR, with Remotion and a local Kokoro voice.

### Workflow

- [automated-testing](skills/workflow/automated-testing/SKILL.md): plan and run repeatable feature tests across a local app, browser, backend, and data services, with saved evidence and an issue log.

### Writing

- [share-it](skills/writing/share-it/SKILL.md): turn one published blog post into platform-native drafts for LinkedIn, X, Bluesky, Reddit, Hacker News, and Dev.to.

## Also by me

- [argus](https://github.com/ankitvashisht12/argus): turn a branch or PR into an annotated review site on localhost. Ships the `argus-review` skill.
- [crew](https://github.com/ankitvashisht12/crew): multi-agent work in Herdr with named task tabs, role panes, and parallel worktrees.
- [2b](https://github.com/ankitvashisht12/2b): a second brain for linked, typed notes, tasks, and projects.

## License

MIT
