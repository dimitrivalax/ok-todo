# 0013. Dual complete UX (toggle and swipe)

- Status: Accepted
- Date: 2026-09-28

## Context

Completing a task should be fast on both touch and click. Ionic provides
toggles and low-level gesture helpers; we want both entry points without
duplicating business logic.

## Decision

In [src/components/task/TaskItem.tsx](../../src/components/task/TaskItem.tsx) we
expose **two ways** to mark a task complete or incomplete:

- An `IonToggle` at the end of the row
- A horizontal swipe gesture (`createGesture`) beyond a fixed pixel threshold

Both paths call the same parent callbacks (`onSwipeRight` / `onSwipeLeft`). The
gesture is created once; latest props are read through a `propsRef` so handlers
stay current without recreating the gesture every render.

## Consequences

### Positive

- Touch-friendly swipe and explicit toggle both work.
- Completion logic stays in the parent/container/services.

### Negative / Trade-offs

- Two interaction models to maintain and test.
- Gesture threshold (`X_SLIDE_OFFSET`) is a magic constant tuned for feel.
- The props-ref pattern is slightly non-obvious for newcomers.

## Alternatives considered

- **Toggle only** — simpler but weaker on touch-first mobile use.
- **Swipe only** — less discoverable for desktop / accessibility.
- **Recreate gesture on every props change** — correct but more churn; avoided
  via `propsRef`.
