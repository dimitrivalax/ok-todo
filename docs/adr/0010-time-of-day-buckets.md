# 0010. Time-of-day buckets without calendar dates

- Status: Accepted
- Date: 2026-09-28

## Context

Users need a lightweight way to order work across the day without managing full
calendar dates. The app is built around “now” and optional clock times.

## Decision

Tasks store an optional **`dueTime`** as an `HH:mm` string (or `null`), not a
calendar date. The home screen buckets tasks by comparing `dueTime` to the
current clock in
[src/components/home/HomeContainer.tsx](../../src/components/home/HomeContainer.tsx):

- **Today** — `dueTime` is set and strictly after now
- **Tomorrow** — `dueTime` is set and less than or equal to now (past-due today
  rolls into this section)
- **One day** — `dueTime` is `null`

## Consequences

### Positive

- No date picker or timezone calendar logic.
- Natural daily rollover as the clock advances.
- Aligns with daily local notifications keyed on hour/minute.

### Negative / Trade-offs

- “Tomorrow” means “due time already passed today,” not a calendar tomorrow.
- Tasks cannot be scheduled for a specific future date.
- Section membership changes as time passes without an explicit user action.

## Alternatives considered

- **Full due dates (`YYYY-MM-DD` + time)** — richer planning but heavier UI and
  persistence; rejected for product simplicity.
- **Explicit Today / Tomorrow / Someday fields** — clearer labels but duplicates
  what the clock comparison already expresses.
