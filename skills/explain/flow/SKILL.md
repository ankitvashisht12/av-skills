---
name: flow
description: Create a compact interactive HTML journey that explains how a repository, feature, subsystem, or user flow works. Use when the user needs fast orientation, plain-language flow, visible rules and failure paths, or technical detail available on demand.
---

# Flow

Turn verified code and requirements into one standalone HTML document. A Flow
document tells the reader what happens, in order, and what happens when a step
fails. It starts in plain language. Technical facts stay available behind an
info control so the main journey remains easy to scan.

Read `references/format.md` before creating a Flow document.

## Workflow

1. **Investigate first.** Read the relevant source, its callers, and the
   requirements. Do not infer runtime behavior from names alone.
2. **Choose the journey boundary.** Explain one repository, feature, system
   journey, or code path. Split broad scopes into separate Flow documents.
3. **Write the reader journey.** Use numbered sections. Each section has a
   plain-language lead, ordered substeps, important rules, and failure paths.
4. **Hide technical detail.** Add an accessible info button and native dialog
   for identifiers, algorithms, limits, data shapes, or implementation detail.
   The technical detail must support the section; it must not repeat it.
5. **Make it interactive but standalone.** Use one self-contained HTML file
   with inline CSS and minimal JavaScript. It must work when opened from disk.
6. **Verify it.** Check every stated behavior against the source, each info
   control opens the correct detail, all navigation links work, and the main
   journey remains readable without opening a dialog.

## Writing rules

- Lead with what a user sees or does, then describe the system behavior.
- Use direct, short sentences. Define a technical term at first use.
- Show rules as clear, visible statements. Use exact numbers only when verified.
- For each material failure path, state the trigger, user-visible result, and
  recovery behavior. Do not hide failures behind vague language.
- Use info controls for technical detail, not as decoration.
- Do not include raw source dumps, large diffs, or unrelated architecture.

## Deliverable

Save the HTML next to the work when a repository is available. Use a clear
name such as `docs/flows/import-journey.html`. Open it after visual review.

## Do not use Flow for

Use Explain It when the reader needs a multi-page deep dive, code diffs, or a
larger technical study.
