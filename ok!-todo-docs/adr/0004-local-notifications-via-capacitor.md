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
[src/services/notification.services.tsx](../../src/services/notification.services.tsx):

- `createNotification` requests display permission, then schedules a daily
  notification at the task's `dueTime` (or the user's default time from settings).
  Ids are allocated from a monotonic counter stored in `localStorage` under
  `notificationIdCounter` (starting at **100**). An existing id may be reused
  when rescheduling the same task.
- A fixed daily "plan your day" reminder uses the reserved id **`42`**
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
- The counter + reserved id `42` avoids random collisions for new notifications.

### Negative / Trade-offs

- Id bookkeeping is manual (kept in `localStorage`) and can drift from the OS
  scheduler if notifications are cleared outside the app.
- The reserved id `42` is a magic constant that must stay below the counter start.
- Behavior depends on per-OS notification permissions and scheduling limits;
  no remote/targeted notifications are possible.

## Alternatives considered

- **Push notifications (FCM/APNs)** — enable server-driven and remote reminders
  but require a backend, credentials, and network — unnecessary for local
  reminders.
- **In-app reminders only** — would not fire when the app is closed.
- **Random notification ids** — simpler allocation but risk rare collisions;
  rejected in favor of the counter.
