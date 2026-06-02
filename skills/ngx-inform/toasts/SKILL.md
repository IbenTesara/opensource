---
name: ngx-inform-toasts
description: >-
  WCAG toasts via NgxToastService, provideNgxToastConfiguration, ngxToastOnSuccess
  and ngxToastOnError from @ibenvandeveire/ngx-inform.
---

# ngx-inform — Toasts

Install: `npm install @ibenvandeveire/ngx-inform`. A11y setup required — missing config throws.

## Configuration (app.config)

```typescript
provideNgxToastConfiguration({
  component: ToastComponent, // extends NgxToastComponent
  position: 'top-right',
  maxAmount: { strategy: 'wait', amount: 5 },
  // autoClose, maxTime (min 5000ms), animationTime
}),
```

**maxAmount strategies:** `ignore` | `wait` | `bundle` (bundler component for hidden count).

Add `NgxToastContainerComponent` at app root (recommended).

## showToast

`{ text, data?, configuration? }` — per-toast overrides; `hasPriority: true` prepends queue.

## Operators

Require injection context **or** pass `NgxToastService` as 2nd arg:

- `ngxToastOnSuccess(message, toastService)` — emit on next, forward value
- `ngxToastOnError(message, toastService)` — toast on error, rethrow

## Mock

`NgxToastServiceMock`.
