---
name: review-learn
description: After a PR merges, compare an earlier automated review (ultimate-review or a repository-specific review skill) with the human review comments, find the important issues the review missed, and propose rule additions or updates for the repository docs or the review skill. Proposals only; nothing is edited, committed, or posted without approval. Use for "learn from PR N", "what did the review miss", or "update the review rules".
---

# Review learn

Turn missed human review comments into a small number of checked rule proposals. A proposal is useful only if it would make a future review report a real defect that it would otherwise miss, without adding false findings.

Do not edit, commit, push, comment, or post. Write one proposal file and stop. The user approves each proposal.

## 1. Collect the inputs

For each PR the user names:

- The earlier review. Use the review record at `git rev-parse --git-path review-state` for that skill and PR, or a review file the user gives. If no review exists, say so and ask whether to run a blind review at the head that the first human review saw. Do not compare against a review made after the human comments, because that review may have used the comments.
- All human review data: review submissions, inline threads with replies, conversation comments, and resolved state. Handle pagination. Skip bots and the PR author, but keep an author reply that confirms or rejects a comment.
- The commit each comment was made on (`original_commit_id`), and the later commits that changed that area.

## 2. Keep only confirmed, important issues

For each human comment, decide:

- Does it name a defect or a required rule: wrong result, crash, lost or exposed data, hang, limit breach, security, a broken stated goal, or a mandatory repository rule? Style, naming, and questions are out.
- Is the defect present in the code at the head the review saw? Check it in the code with `git show <sha>:<path>`. A comment, an author reply, or a later fix is a lead, not proof.

Mark each confirmed issue `blocker`, `high`, or `medium` for this analysis only. Drop low issues.

## 3. Match against the review

For each confirmed issue, find the matching review finding (the same failing condition), a rejection-ledger entry, a slot-table cell, or a Gaps line. Classify the outcome:

- `found`: the review reported it. No proposal.
- `rejected-wrong`: the review saw it and rejected it with a wrong proof. Quote the proof.
- `dropped`: the review saw it and did not report it, with no proof.
- `never-looked`: the review shows no sign it read that path.
- `needs-product-rule`: the defect depends on a fact that is not in the code, the description, or the repository docs, such as "internal config never reaches the client".

## 4. Propose a rule

At most one proposal per missed issue. Prefer changing an existing rule over adding a new one. Search the target files for an existing rule first, and update that rule if one exists.

Choose the target:

- **Repository docs**, for `needs-product-rule`: the nearest file that owns the area, such as the package `AGENTS.md`, a README, or a `docs/` page. The rule is a product fact that a human reviewer knew, written so that a reader can check it in code.
- **Review skill check list**, for `rejected-wrong`, `dropped`, or `never-looked` when the cause is a general review pattern, not a product fact: the review skill's own check list (for ultimate-review, `references/risk-checks.md`), or the breaker proof rules in `references/breaker.md`.

Each proposal must:

- name a condition that a reviewer can check in code at a fixed revision;
- apply to future changes, not only to this one fix;
- say which finding it would have produced for this PR;
- say how it could cause a false finding, and how the wording prevents that.

Reject your own proposal if it only restates this PR's fix, depends on a person's taste, or duplicates an existing rule.

## 5. Write the proposal file

Write `review-learn-<pr or range>.md` in a scratch or user-given folder, not in tracked files. Lead with counts: confirmed issues, found, and each miss class. Then one block per proposal:

- `L-n`: the PR, the comment link, and the missed issue in one sentence.
- Class and quoted evidence from the review.
- Target file and the exact text to add, or the old and new text.
- Why it generalizes, and its false-finding risk.

List any confirmed misses that got no proposal, with the reason.

When the user approves proposals, apply each one as its own commit in the repository that owns the target file. Do not push without asking.
