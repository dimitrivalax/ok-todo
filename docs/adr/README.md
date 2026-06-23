# Architecture Decision Records

This directory records the significant architecture decisions made for the
**Ok! Todo** application. Each record captures the context, the decision, its
consequences, and the alternatives that were considered.

The records use a lightweight [MADR](https://adr.github.io/madr/)-style format.
They are written retrospectively to explain the "why" behind the current stack.

## Index

- [ADR-0001 — Use Ionic React for the UI layer](0001-use-ionic-react-for-the-ui.md)
- [ADR-0002 — Use Capacitor for native iOS/Android packaging](0002-use-capacitor-for-native-packaging.md)
- [ADR-0003 — Persist data in browser localStorage](0003-persist-data-in-localstorage.md)
- [ADR-0004 — Local reminders via Capacitor Local Notifications](0004-local-notifications-via-capacitor.md)
- [ADR-0005 — Internationalization with i18next](0005-i18n-with-i18next.md)
- [ADR-0006 — Vite + TypeScript build tooling](0006-vite-typescript-build-tooling.md)
- [ADR-0007 — Testing strategy: Vitest + Cypress](0007-testing-strategy-vitest-cypress.md)
- [ADR-0008 — Continuous integration with GitHub Actions](0008-ci-with-github-actions.md)

## Status values

- **Proposed** — under discussion.
- **Accepted** — agreed and in effect.
- **Deprecated** — no longer relevant but kept for history.
- **Superseded** — replaced by a newer ADR (link to it).

## Adding a new ADR

1. Copy [`0000-template.md`](0000-template.md) to `NNNN-kebab-title.md`, using
   the next free number.
2. Fill in the sections and set the status (usually `Proposed`, then `Accepted`).
3. Add a line to the index above.
