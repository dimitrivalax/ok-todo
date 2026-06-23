# 0006. Vite + TypeScript build tooling

- Status: Accepted
- Date: 2026-06-23

## Context

The project needs a fast development experience (dev server, HMR) and an
optimized production bundle that Capacitor can package from `dist`. It also
needs type safety across the React codebase and support for older mobile
WebViews/browsers.

## Decision

We build with **Vite** and **TypeScript**, managed with **pnpm**. Configuration
lives in [vite.config.ts](../../vite.config.ts) using `@vitejs/plugin-react` for
React/JSX and `@vitejs/plugin-legacy` for legacy-browser/WebView support. The
production build runs `tsc && vite build` (see the `build` script in
[package.json](../../package.json)), so type checking gates the build. The
output directory `dist` is the web asset source for Capacitor
(see [ADR-0002](0002-use-capacitor-for-native-packaging.md)).

## Consequences

### Positive

- Fast dev server with HMR and quick production builds.
- `tsc` in the build step catches type errors before bundling.
- `@vitejs/plugin-legacy` widens device/browser compatibility for the packaged app.
- `pnpm` with a frozen lockfile gives reproducible installs (used in CI,
  see [ADR-0008](0008-ci-with-github-actions.md)).

### Negative / Trade-offs

- The legacy plugin adds extra bundles/polyfills and build time.
- Vite/plugin major versions move quickly, so upgrades need attention.
- Commitment to the pnpm workflow (lockfile and `packageManager` field) for all
  contributors and CI.

## Alternatives considered

- **Create React App / Webpack** — slower dev feedback and now effectively
  unmaintained for CRA.
- **Ionic CLI default tooling** — extra abstraction over what is a standard Vite
  React app.
- **npm / yarn** — viable, but pnpm is already pinned via `packageManager` and
  offers fast, disk-efficient installs.
