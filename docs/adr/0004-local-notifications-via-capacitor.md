# 0004. Local reminders via Capacitor Local Notifications

- Status: Accepted
- Date: 2026-06-23

## Context

The app reminds users about their tasks and nudges them to plan their day. These
reminders must fire even when the app is closed, work without a backend or push
infrastructure, and respect a user-configurable reminder time.

## Decision

We schedule reminders on-device using **`@capacitor/local-notifications`**.
Notification logic is centralized in
[src/services/notifcation.services.tsx](../../src/services/notifcation.services.tsx):

- `createNotification` requests display permission, then schedules a daily
  notification at the task's `dueTime` (or the user's default time from settings),
  using either an existing id or a random id.
- A fixed daily "plan your day" reminder uses the reserved id `42`
  (`createOrUpdateMainNotification`), triggered on app start from
  [src/App.tsx](../../src/App.tsx).
- Scheduled ids are tracked in `localStorage` under `notificationIds`, and
  `cancelNotification` cancels and removes them.

Default notification icons/colors are configured in
[capacitor.config.ts](../../capacitor.config.ts).

## Consequences

### Positive

- Reminders work fully offline with no server or push credentials.
- Reminder times integrate with user settings
  (see [ADR-0003](0003-persist-data-in-localstorage.md)).
- Permission handling and scheduling are isolated behind one service module.

### Negative / Trade-offs

- Random ids for per-task notifications risk rare collisions, and id bookkeeping
  is manual (kept in `localStorage`), which can drift from the OS scheduler.
- The reserved id `42` is a magic constant that must not collide with task ids.
- Behavior depends on per-OS notification permissions and scheduling limits;
  no remote/targeted notifications are possible.

## Alternatives considered

- **Push notifications (FCM/APNs)** — enable server-driven and remote reminders
  but require a backend, credentials, and network — unnecessary for local
  reminders.
- **In-app reminders only** — would not fire when the app is closed.
