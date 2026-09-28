# 0001. Use Ionic React for the UI layer

- Status: Accepted
- Date: 2026-06-23

## Context

Ok! Todo is a single-codebase todo application that must run as a mobile app on
both iOS and Android while still being developable and testable in a browser.
The team is comfortable with React and TypeScript and wants ready-made,
mobile-grade UI components (navigation, tabs, modals, form inputs) rather than
hand-building a native look and feel.

## Decision

We use **Ionic React** (`@ionic/react`) as the UI component library and
`@ionic/react-router` for navigation. The application shell in
[src/App.tsx](../../src/App.tsx) is built from Ionic primitives
(`IonApp`, `IonTabs`, `IonRouterOutlet`, `IonTabBar`) and bootstrapped with
`setupIonicReact()`. Routing uses `react-router` v5 via `IonReactRouter`.

## Consequences

### Positive

- One React/TypeScript codebase targets web, iOS and Android.
- Mobile-ready components, theming and dark-mode support come out of the box
  (Ionic CSS imports and `@ionic/react/css/palettes/dark.system.css`).
- Pairs naturally with Capacitor (see [ADR-0002](0002-use-capacitor-for-native-packaging.md)).

### Negative / Trade-offs

- The app inherits Ionic's web-component runtime and bundle size.
- UI follows Ionic's design language; deep visual customization requires
  working within its theming variables.
- Pinned to `react-router` v5 (Ionic's supported version) rather than the
  latest router API.

## Alternatives considered

- **React Native** — true native rendering, but a separate (non-web) stack and
  no in-browser preview; larger rewrite of mental model.
- **Plain React + custom CSS / another component kit (MUI, etc.)** — more work
  to reach a mobile-native feel and to integrate with native packaging.
- **Flutter** — would require leaving the React/TypeScript ecosystem entirely.
