---
name: ngx-core
description: >-
  SSR-safe window/document access and ngOnChanges helpers from
  @ibenvandeveire/ngx-core. Use for NgxWindowService, scroll/width observables,
  runInBrowser, or simpleChangeHasChanged.
---

# @ibenvandeveire/ngx-core

Base utilities for other `@ibenvandeveire` Angular packages. Install: `npm install @ibenvandeveire/ngx-core`. Major version tracks Angular.

## NgxWindowService

Inject `NgxWindowService` instead of using `window`/`document` directly (SSR-safe).

| API | Purpose |
| --- | ------- |
| `width$` | Window width; defaults to `1200` when no window |
| `scrollingUp$` | `true` when scrolling up |
| `currentScrollPosition` / `currentScrollPosition$` | Scroll position after scroll handling |
| `window` | `Window` reference |
| `scrollTo(offset?)` | Scroll; default offset `0` (top); no-op without window |
| `hasDocument()` | Whether `document` exists |
| `isBrowser()` | Uses `isPlatformBrowser` internally |
| `runInBrowser(({ browserWindow, browserDocument }) => …)` | Run callback only in browser |

**Document:** not exposed directly — use `runInBrowser` or `hasDocument`.

```typescript
private readonly windowService = inject(NgxWindowService);

this.windowService.runInBrowser(({ browserDocument }) => {
  browserDocument.querySelector('…');
});
```

## simpleChangeHasChanged

Utility for `ngOnChanges`: returns whether a `SimpleChange` actually changed (JSON compare of previous vs current).

```typescript
import { simpleChangeHasChanged } from '@ibenvandeveire/ngx-core';

ngOnChanges(changes: SimpleChanges): void {
  if (simpleChangeHasChanged(changes.layoutType)) {
    // react
  }
}
```

Also exported from `@ibenvandeveire/ngx-utils` — prefer one import per feature area.
