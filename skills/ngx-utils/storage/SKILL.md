---
name: ngx-utils-storage
description: >-
  SSR-safe Observable localStorage/sessionStorage via NgxStorageService from
  @ibenvandeveire/ngx-utils. Use for getItemObservable, setItem, storageEvents$.
---

# ngx-utils — Storage

Install: `npm install @ibenvandeveire/ngx-utils`.

**Only** reads/writes through service API update observables — direct `window.localStorage` is invisible to streams. Values auto JSON stringify/parse. No-op outside browser (SSR).

## API

| Method | Behavior |
| ------ | -------- |
| `getItem` / `getItemObservable` | Sync vs reactive |
| `setItem` / `removeItem` | Emits on `storageEvents$` |
| `clear` | Clears storage; completes item observables; emits event |

```typescript
this.storageService.localStorage.setItem('Hello', { world: true });
this.storageService.storageEvents$.subscribe(/* NgxStorageEvent */);
```

## Mock

`NgxStorageServiceMock` in tests.
