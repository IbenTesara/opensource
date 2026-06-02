---
name: ngx-inform-modals
description: >-
  ARIA-enforced modals via NgxModalService and openNgxModal from
  @ibenvandeveire/ngx-inform. Use instead of raw CDK Dialog when compliance is required.
---

# ngx-inform — Modals

Wraps CDK Dialog with **mandatory** WCAG/ARIA; non-compliant CDK options disabled.

## provideNgxModalConfiguration

```typescript
provideNgxModalConfiguration({
  closeOnNavigation: true,
  autoClose: true,
  modals: {
    confirm: {
      component: ConfirmModalComponent,
      role: 'alertdialog',
      panelClass: 'panel-confirm',
    },
  },
}),
```

Preset modals: `type: 'confirm'` in `open()`.

## Opening

**Required:** `label` **or** `labelledById`. `alertdialog` → also `describedById` (element must exist in DOM).

```typescript
this.modalService.open<'Confirm' | 'Deny'>({
  type: 'confirm',
  labelledById: 'confirm-label',
  describedById: 'confirm-button',
  data: { title: '…' },
}).subscribe((action) => …);
```

Custom: `component: ModalComponent` extending `NgxModalAbstractComponent`.

## openNgxModal operator

Maps stream to modal action; use with `filter` + `switchMap` for confirm-then-delete flows. Pass service as 2nd arg outside injection context.

## Mock

`NgxModalServiceMock`.
