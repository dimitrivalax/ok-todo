# Product scope

Ok! Todo is a personal, offline-first todo app. The product intentionally stays
small.

## In scope

- One flat list of tasks (label, optional due time `HH:mm`, completed flag)
- Three UI sections driven by the clock, not calendar dates:
  - **Today** — tasks with a due time still ahead of now
  - **Tomorrow** — tasks whose due time has already passed today
  - **One day** — tasks with no due time
- Local reminders for tasks with a due time
- A daily “plan your day” reminder at a configurable time (default 08:30)
- System language detection with 24 EU locales (fallback: English)

## Out of scope

- User accounts, authentication, or multi-user sharing
- Cloud sync or backup
- Multiple lists, projects, tags, or priorities
- Full calendar dates / recurring rules beyond daily local notifications
- Analytics, ads, or third-party trackers

See also [ADR-0009](adr/0009-flat-task-model-without-lists.md),
[ADR-0010](adr/0010-time-of-day-buckets.md), and
[ADR-0011](adr/0011-offline-first-no-backend.md).
