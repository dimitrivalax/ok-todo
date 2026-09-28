# Architecture

Ok! Todo is an Ionic React single-page app packaged with Capacitor for Android
and iOS. There is no backend.

## Layers

```
pages/          Thin Ionic page shells (routing / tabs)
components/     Feature containers + task UI
services/       Domain logic + persistence + native APIs
global/types    Shared TypeScript types
translations/   i18next setup + locale JSON
theme/          Ionic CSS variables
```

**Pattern:** page shells render containers; containers hold React state and call
services; services own `localStorage` and Capacitor plugins. There is no global
store (Redux, Context for domain data, etc.). See
[ADR-0012](adr/0012-service-modules-without-global-store.md).

## Domain model

```ts
type Task = {
  id: string;
  label: string;
  dueTime: string | null; // "HH:mm" or null
  complete: boolean;
  notificationId?: number;
};

type Settings = {
  notificationTime: string; // "HH:mm"
};
```

## Persistence (`localStorage`)

| Key | Contents |
|-----|----------|
| `tasks` | `Task[]` |
| `settings` | `Settings` or absent |
| `notificationIds` | scheduled notification id list |
| `notificationIdCounter` | monotonic id counter (starts at 100) |

Helpers live in [`src/services/storage.services.ts`](../src/services/storage.services.ts).
Decision record: [ADR-0003](adr/0003-persist-data-in-localstorage.md).

## Services

| Module | Responsibility |
|--------|----------------|
| `task.services.tsx` | CRUD tasks; schedule/cancel notifications on write |
| `settings.services.tsx` | Load/save settings; default notification hour/minute |
| `notification.services.tsx` | Permissions, schedule/cancel, main daily reminder (id `42`) |
| `storage.services.ts` | Safe JSON read/write |

## Notifications

- Per-task daily local notifications when `dueTime` is set
- Reserved id **42** for the main “plan your day” reminder (created on app start)
- New ids allocated from a counter stored in `localStorage` (above 100)

See [ADR-0004](adr/0004-local-notifications-via-capacitor.md).

## Routing

Tabs in [`src/App.tsx`](../src/App.tsx): `/home`, `/settings`.

## Related ADRs

Stack choices: Ionic React ([0001](adr/0001-use-ionic-react-for-the-ui.md)),
Capacitor ([0002](adr/0002-use-capacitor-for-native-packaging.md)),
i18n ([0005](adr/0005-i18n-with-i18next.md)),
Vite + TypeScript ([0006](adr/0006-vite-typescript-build-tooling.md)).
