# 0007. Testing strategy: Vitest + Cypress

- Status: Accepted
- Date: 2026-06-23

## Context

We want confidence in both isolated logic/components and full user journeys, on
a UI built from Ionic web components that rely heavily on the shadow DOM. The
test tooling should integrate cleanly with the Vite build
(see [ADR-0006](0006-vite-typescript-build-tooling.md)) and run in CI.

## Decision

We use a two-layer testing strategy:

- **Vitest** for unit/component tests, configured in
  [vite.config.ts](../../vite.config.ts) with `environment: 'jsdom'`, `globals: true`,
  and `setupFiles: './src/setupTests.ts'`. Component tests use Testing Library
  (`@testing-library/react`, `@testing-library/jest-dom`). Run with `pnpm test.unit`.
- **Cypress** for end-to-end tests, configured in
  [cypress.config.ts](../../cypress.config.ts) against `baseUrl http://localhost:5173`
  with `includeShadowDom: true` (so queries pierce Ionic's shadow DOM) and a
  10s default command timeout. Specs live in `cypress/e2e/`. Run with `pnpm test.e2e`.

## Consequences

### Positive

- Vitest shares Vite's config/transform pipeline, so unit tests run fast with no
  separate build setup.
- Cypress exercises real user flows in a browser, with `includeShadowDom`
  handling Ionic components correctly.
- Both layers run in CI (see [ADR-0008](0008-ci-with-github-actions.md)), with
  Cypress screenshots uploaded on failure.

### Negative / Trade-offs

- Two frameworks to learn and maintain.
- E2E tests need a running dev server and are slower/flakier than unit tests.
- jsdom does not fully replicate a real browser, so some behavior is only
  observable in the Cypress layer.

## Alternatives considered

- **Jest** for unit tests — would not reuse the Vite pipeline and needs extra
  configuration for ESM/TS.
- **Playwright** for e2e — strong alternative, but Cypress's `includeShadowDom`
  and DX fit the Ionic UI well and are already in place.
- **Single-layer testing** — either misses integration coverage (unit only) or
  is too slow/brittle as the only safety net (e2e only).
