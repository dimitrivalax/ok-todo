# 0003. Persist data in browser localStorage

- Status: Accepted
- Date: 2026-06-23

## Context

Ok! Todo stores tasks and user settings locally. The app is offline-first and
single-user with no account system, and there is no backend service. We need a
simple, synchronous way to persist small amounts of structured data that works
both in the browser and inside the Capacitor WebView.

## Decision

We persist all application data in the browser's **`localStorage`**, serialized
as JSON. Tasks are kept under the `tasks` key, settings under `settings`, and
scheduled notification ids under `notificationIds`. Access is centralized in
service modules:

- [src/services/storage.services.ts](../../src/services/storage.services.ts)
  provides shared `readJson` / `writeJson` helpers.
- [src/services/task.services.tsx](../../src/services/task.services.tsx) reads
  and writes the `tasks` array (`getTasks`, `saveNewTask`, `updateTask`,
  `removeTask`).
- [src/services/settings.services.tsx](../../src/services/settings.services.tsx)
  reads and writes the `settings` object.
- Notification bookkeeping also uses `localStorage` keys `notificationIds` and
  `notificationIdCounter` (see [ADR-0004](0004-local-notifications-via-capacitor.md)).

## Consequences

### Positive

- No backend, no database setup, and no network dependency — fully offline.
- Synchronous API keeps the service code simple.
- Works uniformly in the browser and the Capacitor WebView.

### Negative / Trade-offs

- Data is bound to the WebView storage and is not synced across devices; it can
  be cleared by the OS/user, with no backup.
- `localStorage` has a small size limit and stores strings only (manual
  `JSON.parse`/`JSON.stringify`), with no schema/migration support.
- No transactional guarantees or querying; whole arrays are rewritten on each
  change.

## Alternatives considered

- **`@capacitor/preferences`** — native-backed key/value store; more robust on
  device but asynchronous and still not a queryable database.
- **SQLite (`@capacitor-community/sqlite`)** — proper relational storage and
  queries, but significant added complexity for a small todo dataset.
- **IndexedDB** — larger capacity and async API, but heavier than needed for the
  current data volume.
- **Remote backend / sync** — enables multi-device sync but requires
  accounts, a server, and network handling — out of scope for this app.
