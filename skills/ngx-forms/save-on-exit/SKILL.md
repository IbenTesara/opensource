---
name: ngx-forms-save-on-exit
description: >-
  Save-before-leave flow: NgxSaveOnExitComponent, NgxSaveOnExitAbstractService,
  NgxSaveOnExitGuard from @ibenvandeveire/ngx-forms.
---

# ngx-forms — SaveOnExit

## NgxSaveOnExitComponent (abstract)

| Method | Purpose |
| ------ | ------- |
| `isDirty()` | Triggers guard/service when true |
| `isValid()` | Branch valid vs invalid unsaved exit |

`allowBeforeUnloadHandler: true` — browser tab close warning (off by default).

## NgxSaveOnExitAbstractService

`handleDirtyState(component)` — custom UX (toast, modal, etc.). Root or route-level provider.

Optional `bypassSaveOnExit()` — skip guard for specific routes.

## NgxSaveOnExitGuard

On route: component extends `NgxSaveOnExitComponent` + service provided → blocks navigation when dirty.
