# 0011. Offline-first with no backend or telemetry

- Status: Accepted
- Date: 2026-09-28

## Context

Ok! Todo is a personal planner. Users should not need an account or network to
use it, and privacy policies claim that no personal data is collected or
transmitted.

## Decision

The application is **offline-first and local-only**:

- No backend API, accounts, or cloud sync
- No analytics, crash-reporting, ads, or third-party tracking SDKs
- All task and settings data stay in device `localStorage`
  ([ADR-0003](0003-persist-data-in-localstorage.md))
- Reminders use on-device local notifications only
  ([ADR-0004](0004-local-notifications-via-capacitor.md))

Privacy statements live in
[docs/privacy-policy.html](../privacy-policy.html) and
[docs/privacy-policy.en.html](../privacy-policy.en.html).

## Consequences

### Positive

- Strong privacy posture and simple threat model.
- Works without network after install.
- No server cost or credential management.

### Negative / Trade-offs

- No cross-device sync or cloud backup; clearing app storage loses data.
- No remote diagnostics when users hit bugs.
- Native manifests may still declare network-related permissions inherited from
  the Capacitor template even though the app does not call home.

## Alternatives considered

- **Optional cloud sync** — useful for multi-device users but implies accounts,
  encryption, and ongoing ops — out of scope.
- **Anonymous analytics** — would conflict with the no-collection privacy claim.
