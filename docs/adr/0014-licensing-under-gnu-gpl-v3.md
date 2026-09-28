# 0014. Licensing under GNU GPL v3

- Status: Accepted
- Date: 2026-09-28

## Context

The project is published as open source so others can inspect, study, and
redistribute it. We need a clear license that matches a copyleft preference and
covers application source (not a library publish to npm).

## Decision

We license Ok! Todo under the **GNU General Public License version 3**
(`GPL-3.0-only`), with the full text in [LICENSE](../../LICENSE) and
`"license": "GPL-3.0-only"` in [package.json](../../package.json).

`package.json` remains `"private": true` because this is an application, not an
npm package intended for registry publication.

There is no external contribution process; the license still governs forks and
redistribution.

## Consequences

### Positive

- Clear copyleft terms for source distribution.
- Compatible with studying and forking under GPL obligations.
- SPDX identifier is machine-readable for tooling.

### Negative / Trade-offs

- Proprietary derivatives are not permitted without a separate license grant.
- App store redistribution must still comply with GPL source-offer requirements.
- Some downstream projects avoid GPL for license-compatibility reasons.

## Alternatives considered

- **MIT / Apache-2.0** — simpler permissive reuse; rejected in favor of copyleft.
- **GPL-3.0-or-later** — slightly more flexible for future FSF versions; we pin
  `GPL-3.0-only` for predictability.
