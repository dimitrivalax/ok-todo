# Ok! Todo

A simple, offline-first todo list for web, Android, and iOS.

Tasks stay on the device (no accounts, no sync, no analytics). Optional due
times drive local reminders. The UI is available in 24 EU languages.

**License:** [GNU GPL v3](LICENSE)

## Features

- Flat task list with Today / Tomorrow / One day sections (time-of-day based)
- Local reminders via Capacitor Local Notifications
- Settings for the daily “plan your day” reminder time
- Ionic React UI packaged with Capacitor

## Quick start

Requires [Node.js](https://nodejs.org/) 24+ and [pnpm](https://pnpm.io/) 11+.

```bash
pnpm install
pnpm dev
```

Useful scripts:

| Script | Description |
|--------|-------------|
| `pnpm dev` | Vite dev server |
| `pnpm build` | Typecheck + production build (`dist/`) |
| `pnpm lint` | ESLint |
| `pnpm test.unit` | Vitest unit tests |
| `pnpm test.e2e` | Cypress e2e (app must be reachable; see CI) |
| `pnpm android:bundle` | Web build + Capacitor sync + Android release bundle |

## Native apps

```bash
pnpm build
npx cap sync
npx cap open android   # or ios
```

Android release signing uses a local `android/keystore.properties` and keystore
file. Those files are gitignored — **never commit signing secrets**.

App id: `fr.ok.todo`.

## Documentation

- [Product scope](docs/product.md)
- [Architecture](docs/architecture.md)
- [Development](docs/development.md)
- [Architecture Decision Records](docs/adr/README.md)
- Privacy policy: [Français](docs/privacy-policy.html) · [English](docs/privacy-policy.en.html)

## License

Copyright (C) 2024–2026 Dimitri Valax

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version. See the [LICENSE](LICENSE) file for details.

This repository is published for transparency, study, and redistribution under
the GPL. There is no contribution process.
