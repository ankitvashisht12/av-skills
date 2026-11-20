# Risk checks

Read only the sections that match the change. These are prompts for tracing code, not automatic findings.

## Access and untrusted data

Trace caller identity, object ownership, permissions, and environment through each new entry point. Check alternate routes, bulk operations, and direct object IDs. Check signatures against the original bytes, expiry, replay, and key rotation when applicable. Follow untrusted data to HTML, SQL, shell, file paths, URLs, and external requests. Check redirects, file sizes, time limits, and secret or personal-data output. Do not report a generic attack without a reachable path.

## State, concurrency, and providers

Write the state transitions and who may perform them. Check two workers, retries after partial success, out-of-order events, stale results, lease expiry, and shutdown. Identify where the operation becomes durable. A timeout does not prove that a provider did no work. Check deduplication keys, side-effect ownership, bounded retry, and recovery after an uncertain result. Check that a guard does not lose events or block cleanup.

Check the meaning of terminal markers. A sent, billed, or complete flag must follow the required durable result, including downstream event delivery when promised. For logs or receipts with a completeness contract, follow empty, rejected, and thrown paths as well as success; preserve required identity fields on early failures. Do not require every path to emit a record unless that contract applies.

When a timeout, eligibility rule, or expiry becomes stricter, inspect every new early return in downstream work. Account for durable pending markers, locks, child jobs, and ownership cleanup. Expiring the parent request does not itself clear child state. Check the next normal run as well as the expiry event. Use a reachable allowed state; production frequency is separate from whether the code path is possible.

## Data and compatibility

Read writers and readers together. Check existing rows, null and omitted values, default values, index order, pagination, and uniqueness assumptions. For migrations, check interruption, repeat execution, backfill, mixed-version operation, and rollback or forward recovery. Confirm whether any affected data has shipped before demanding backward compatibility. For APIs and libraries, include documented clients, error contracts, serialization, and platform support.

Generated labels and prompt outputs can be stored identifiers. Find saved consumers before accepting a rename as text-only. When a policy helper is replaced, compare its settings and supported categories with the previous helper. Verify scope on both sides of a query: tenant, environment, deployment, channel, and time range only as applicable. Test normalization before classification when classification depends on the normalized value.

For privacy or data conversion, track each copy of one logical value. Include uploaded input chunks, staging blobs, receipts, logs, derived fields, retained originals, and exports as applicable. Protecting destination rows does not erase raw input. Check success, failure, abandonment, and retention cleanup. If detection or validation uses context, permissions, units, or encoding, verify that every derived copy preserves those inputs or reuses the validated result. Do not treat a test with a stubbed safety control as proof of that control.

For parsing, masking, and truncation, use valid domain syntax, explicit and inferred values, encodings, overlapping matches, and whole-value boundaries. Preserve types, distinct keys, and source identity. Count serialized bytes including escaping and omission markers. Keep quoted speech, tool facts, labels, and errors separate when they are different evidence. An omitted fact is not proof of its absence. For partial updates, trace explicit empty values through save and reload.

## Scale and operation

Trace query cardinality, fan-out, memory, bytes, retention, and retry multiplication. Check whether page limits apply before or after filtering; preserve the promised page contract. A small returned result does not prove a cheap scan. Use the workload supported by the product or observed operation. Check disabled and idle entities as well as active ones. Check rate and quota limits, backpressure, cleanup, logging needed for recovery, and whether an optimization changes correctness. State unknown estimates as assumptions.

Apply limits at the request, transaction, or worker scope where work can combine, not just to each item. Include concurrent callers and alternate transports of a shared helper. Check a stale destructive confirmation against the version that the user saw.

## Frontend and user flows

Follow state across navigation, account changes, loading, errors, empty results, retries, and unmount. Check stale closures, request races, cache keys, optimistic updates and rollback, keyboard access, labels, focus, and responsive behavior on changed flows. Inspect the server/client boundary and public bundles for private data. Request browser checks only when useful to establish a specific behavior; report untested interaction limits plainly.

## Build, dependencies, and deployment

Check the declared runtime and installed API version. Prefer repository code or matching official docs over remembered APIs. Review dependency changes with lockfiles, build scripts, and supported platforms. Trace environment variables, caches, generated artifacts, and target selection. For CI, check untrusted inputs, token scope, artifact origin, and whether success is tied to the exact revision. Identify safe order and recovery when deployment spans several services. Do not run a deployment to validate it.
