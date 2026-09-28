# 0009. Flat task model without lists or projects

- Status: Accepted
- Date: 2026-09-28

## Context

Todo apps often grow lists, projects, tags, and priorities. Ok! Todo aims to stay
a small personal planner focused on “what do I do today?” rather than project
management.

## Decision

We keep a **single flat task list**. There are no lists, projects, tags, or
folders in the data model. Organization in the UI comes only from time-based
sections (see [ADR-0010](0010-time-of-day-buckets.md)).

The `Task` type in [src/global/types.ts](../../src/global/types.ts) contains
`id`, `label`, `dueTime`, `complete`, and optional `notificationId` only.

## Consequences

### Positive

- Minimal mental model and UI surface.
- Simpler persistence and tests.
- Clear product boundary documented in [docs/product.md](../product.md).

### Negative / Trade-offs

- Users who need multi-project organization must use another tool or fork.
- Future list/project support would be a breaking product and schema change.

## Alternatives considered

- **Multiple lists / projects** — common in productivity apps but out of scope
  for this product’s simplicity goal.
- **Tags or priorities** — add filtering power at the cost of UI and model
  complexity; deferred indefinitely.
