# Development

## Prerequisites

- Node.js 24+
- pnpm 11+ (see `packageManager` in `package.json`)
- For native work: Android Studio and/or Xcode + Capacitor tooling

## Install and run

```bash
pnpm install
pnpm dev
```

The Vite app is served on `http://localhost:5173` by default.

## Scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Dev server |
| `pnpm build` | `tsc` + Vite production build into `dist/` |
| `pnpm preview` | Preview the production build |
| `pnpm lint` | ESLint |
| `pnpm test.unit` | Vitest |
| `pnpm test.e2e` | Cypress (`cypress run`) |
| `pnpm android:bundle` | Build web assets, `cap sync android`, Gradle `bundleRelease` |

## Capacitor

```bash
pnpm build
npx cap sync
npx cap open android   # or ios
```

Config: [`capacitor.config.ts`](../capacitor.config.ts) (`appId`: `fr.ok.todo`).

Android signing: place `android/keystore.properties` and the keystore locally.
They are gitignored.

## Tests

- **Unit:** Vitest + Testing Library; service tests under `src/services/*.test.tsx`
- **E2E:** Cypress specs under `cypress/e2e/`; shadow DOM enabled for Ionic
- E2E assertions currently use **French** UI strings (browser/CI locale assumption)

CI runs lint, unit tests, build, and e2e on push/PR
([`.github/workflows/ci.yml`](../.github/workflows/ci.yml)).

See [ADR-0007](adr/0007-testing-strategy-vitest-cypress.md) and
[ADR-0008](adr/0008-ci-with-github-actions.md).
