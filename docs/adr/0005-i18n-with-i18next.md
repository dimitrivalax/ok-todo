# 0005. Internationalization with i18next

- Status: Accepted
- Date: 2026-06-23

## Context

The app targets users in more than one language (French and English today) and
needs translated UI labels and notification text. We want a mature, React-aware
i18n solution that keeps translations in simple, reviewable files.

## Decision

We use **i18next** with **react-i18next** for internationalization. i18next is
initialized once in [src/translations/i18n.ts](../../src/translations/i18n.ts)
with `fr` as the default language and `en` as an additional locale, loading
translations from JSON bundles (`src/translations/fr/global.json` and
`src/translations/en/global.json`). React components read strings through the
`useTranslation` hook (e.g. tab labels in [src/App.tsx](../../src/App.tsx)), and
non-React code (notifications) imports the shared `i18next` instance directly
(see [src/services/notifcation.services.tsx](../../src/services/notifcation.services.tsx)).

## Consequences

### Positive

- Mature ecosystem with first-class React bindings and a hook-based API.
- Translations live in plain JSON files, easy to diff, review and extend with
  new locales.
- A single shared instance serves both UI components and service-layer code.

### Negative / Trade-offs

- All translation bundles are imported statically and bundled (no lazy loading
  of locales).
- `debug: true` is enabled in the init config, which is noisy in production.
- The default language is hard-coded to `fr` rather than detected from the device.

## Alternatives considered

- **react-intl (FormatJS)** — solid alternative, but ICU-message-centric and a
  different API; i18next's hooks and JSON resources fit the existing structure.
- **Custom/hand-rolled dictionary lookup** — minimal at first but quickly lacks
  pluralization, interpolation and tooling.
