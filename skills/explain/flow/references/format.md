# Flow document format

Use this generic demo pattern: a user starts an action, the system checks the
input, work progresses through clear steps, and each failure path states what
the user sees and what they can do next. Do not name or copy a source report.

## Document shape

1. Clear title and one-paragraph promise.
2. A short legend for rules, failures, and technical detail.
3. A linked table of contents when the document has more than four sections.
4. Numbered journey sections. Each section includes:
   - a title that states the event;
   - a plain-language lead paragraph;
   - ordered substeps;
   - visible rules and failure paths; and
   - info buttons for relevant technical detail.
5. Native `<dialog>` panels for the details. Each info button must identify
   one dialog with `data-dlg`.

## Language

Write for a smart reader who does not know this repository. Prefer “The user
uploads a file; the system checks it” over implementation-first prose. Keep
one idea per sentence. Describe recovery directly: “The task resumes from the
saved cursor” rather than “The system is resilient.”

## Visual rules

- Keep the page calm and dense enough to scan.
- Use numbered circles for primary steps and decimal numbers for substeps.
- Use color plus a text label for rules and failure states.
- Give the technical dialog a descriptive title and a close button.
- Use semantic HTML, keyboard-accessible buttons, and working focus states.
- Keep all CSS and JavaScript in the HTML file. Do not require a server,
  framework, router, or external runtime.
