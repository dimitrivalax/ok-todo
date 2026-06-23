# 0002. Use Capacitor for native iOS/Android packaging

- Status: Accepted
- Date: 2026-06-23

## Context

The web UI built with Ionic React (see [ADR-0001](0001-use-ionic-react-for-the-ui.md))
needs to be shipped as installable iOS and Android apps and to access native
device capabilities such as local notifications, haptics, keyboard and status
bar. We want to keep a single web build as the source of truth.

## Decision

We use **Capacitor** to wrap the web build as native apps. The Vite output
directory (`dist`) is used as the web asset source, configured in
[capacitor.config.ts](../../capacitor.config.ts) (`appId: com.ok.todo`,
`appName: Ok! Todo`, `webDir: dist`). Native platforms are added via
`@capacitor/ios` and `@capacitor/android`, and native features are consumed
through Capacitor plugins (`@capacitor/local-notifications`, `@capacitor/haptics`,
`@capacitor/keyboard`, `@capacitor/status-bar`, `@capacitor/app`).

## Consequences

### Positive

- A single web build runs on web, iOS and Android.
- First-class integration with Ionic React.
- Native APIs are reachable from TypeScript via a consistent plugin model;
  plugin defaults (e.g. notification icons) are centralized in
  [capacitor.config.ts](../../capacitor.config.ts).

### Negative / Trade-offs

- Native builds require the platform toolchains (Xcode, Android SDK) and the
  committed `ios/` (and Android) projects must be kept in sync.
- The UI runs in a WebView, so it is not truly native rendering.
- Some device features depend on plugin availability and per-platform behavior.

## Alternatives considered

- **Cordova** — older predecessor to Capacitor; weaker modern tooling and
  native-project ergonomics.
- **PWA only** — no app-store distribution and more limited/inconsistent access
  to native notification scheduling.
- **React Native** — native rendering but a different, non-web architecture
  (see [ADR-0001](0001-use-ionic-react-for-the-ui.md)).
