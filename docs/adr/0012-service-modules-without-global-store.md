# 0012. Service modules without a global state store

- Status: Accepted
- Date: 2026-09-28

## Context

The domain state is a small task array plus settings. We need a clear place for
CRUD and native side effects without introducing a heavy state-management stack.

## Decision

We use **plain service modules** under `src/services/` and keep React state in
feature containers (for example `HomeContainer`, `SettingsContainer`). Containers
call services and reload from persistence when needed. There is no Redux,
Zustand, or app-wide React Context for domain data.

## Consequences

### Positive

- Easy to follow data flow for a small app.
- Services are straightforward to unit test.
- No store boilerplate or subscription wiring.

### Negative / Trade-offs

- Multiple containers do not share live in-memory state; each refreshes from
  `localStorage` after mutations.
- Scaling to many screens with shared ephemeral state would become awkward.

## Alternatives considered

- **Redux / Zustand / Jotai** — strong for large UIs; unnecessary here.
- **React Context for tasks** — avoids prop drilling but still couples the tree
  to a global cache we do not need yet.
