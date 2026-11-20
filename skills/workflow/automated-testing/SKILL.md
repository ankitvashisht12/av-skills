---
name: automated-testing
description: Plan and run repeatable feature tests across a local app, browser, backend, and data services, with saved evidence and a separate issue log. Use for a requested feature testing workflow, not for ordinary unit-test edits or CI validation alone.
---

# Automated feature testing

Read the current feature code and existing tests to find distinct decisions and boundaries. Inspect saved fixtures and the live local state before reuse. Write a plain-language case plan that covers user-visible paths and the matching backend states. If the user asks to review the plan first, stop before test actions that change data or incur cost.

For an approved run, use the browser or computer UI to verify visible behavior. Use local CLI or API checks to compare backend and data-service state. Prefer small, isolated synthetic cases. Give new rows a run ID, record original settings, and verify cleanup. A response code or unit test alone does not prove a browser case passed.

Store a case plan, run log, screenshots, and a separate issues file in the user's requested artifact location. For each case, record setup, expected result, observed result, evidence, and pass/fail/blocked status. For each failure, inspect the code, state the likely cause and proposed fix, and repeat the case after a fix. Mark hypotheses clearly.

Before any paid test, read the current provider usage and the user's budget rule. Include retries and in-flight work in the cost estimate. Stop new paid work when usage is unavailable, a limit is crossed, or the remaining budget cannot cover the next case. Do not treat an old cost sample as a guarantee. Keep large cap checks no-cost when selection or state can prove the boundary.
