---
name: ngx-layout-display-content
description: >-
  *displayContent structural directive and provideNgxDisplayContentConfiguration
  for loading/error/offline UI from @ibenvandeveire/ngx-layout.
---

# ngx-layout — Display content

## Setup

```typescript
provideNgxDisplayContentConfiguration({
  components: {
    loading: LoadingComponent,
    error: ErrorComponent,
    offline: OfflineComponent,
  },
  hideWhenNoTemplateProvided: true,
  listenToOnlineStatus: true, // uses NgxOnlineService
}),
```

Components implement `NgxDisplayContentAbstractComponent` (`data` input).

## Usage

```html
<div *displayContent="{ loading: true }">Main content</div>
```

Priority: **offline** → **loading** → **error** (when `listenToOnlineStatus`, offline wins over loading).

## Overrides

```html
*displayContent="{ error: true }; condition: { error: { data: '…', template: errorTmpl } }; ariaLive: 'assertive'"
```

Sets `aria-live` (default `polite`) and `aria-busy` when appropriate.

## NgxOnlineService

`online$` — SSR-safe; pair with `listenToOnlineStatus` or manual `offline` in directive input.
