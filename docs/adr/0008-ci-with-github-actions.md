# 0008. Continuous integration with GitHub Actions

- Status: Accepted
- Date: 2026-06-23

## Context

We want every push and pull request to be automatically checked so that lint
errors, type/build failures, and failing tests are caught before merge. The CI
must reproduce the local pnpm + Vite workflow
(see [ADR-0006](0006-vite-typescript-build-tooling.md)) and run the test suites
(see [ADR-0007](0007-testing-strategy-vitest-cypress.md)).

## Decision

We use **GitHub Actions**, defined in [.github/workflows/ci.yml](../../.github/workflows/ci.yml).
The `CI` workflow runs on pushes to `main`/`master` and on all pull requests,
with `concurrency` set to cancel in-progress runs for the same ref. It defines
four parallel jobs on `ubuntu-latest`, each using `pnpm/action-setup`,
`actions/setup-node` (Node 24, pnpm cache) and `pnpm install --frozen-lockfile`:

- **lint** — `pnpm lint`
- **unit-tests** — `pnpm exec vitest run`
- **build** — `pnpm build`
- **e2e-tests** — `cypress-io/github-action` starting `pnpm dev`, waiting on
  `http://localhost:5173`, and uploading `cypress/screenshots` on failure.

## Consequences

### Positive

- Lint, types/build, unit and e2e checks run automatically on every PR and push.
- Parallel jobs plus `cancel-in-progress` concurrency give fast feedback and
  save CI minutes.
- `--frozen-lockfile` enforces reproducible installs consistent with the pinned
  package manager.
- Failed e2e runs upload screenshots as artifacts for debugging.

### Negative / Trade-offs

- The four jobs each install dependencies independently (no shared install
  artifact), duplicating install time.
- E2E jobs are the slowest and most flake-prone part of CI.
- Tied to GitHub Actions and the Node version pinned in the workflow.

## Alternatives considered

- **Other CI providers (GitLab CI, CircleCI, etc.)** — viable, but GitHub
  Actions is native to the repository host with no extra integration.
- **A single combined job** — simpler config but loses parallelism and makes it
  harder to see which stage failed.
