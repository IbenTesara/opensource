---
name: ngx-layout-configurable-layout
description: >-
  ngx-configurable-layout grid with static/editable modes, drag-and-drop, and
  provideNgxDragAndDropService from @ibenvandeveire/ngx-layout.
---

# ngx-layout — Configurable layout

`ngx-configurable-layout` + `ngx-configurable-layout-item` with `key` matching 2D layout array.

**Required:** `provideNgxDragAndDropService(YourDragAndDropService)` implementing `NgxAccessibleDragAndDropAbstractService`.

## Static

`layoutType="static"` + `[keys]="[['widget-a','widget-b'],['widget-c']]"` — user cannot rearrange.

## Editable

`layoutType="editable"` + `FormControl` value:

```typescript
[[{ key: 'widget-a', isActive: true }, { key: 'widget-b', isActive: true }]]
```

- `showInactive` — show toggles for inactive items
- `disabled: true` on item — no toggle, class `ngx-layout-item-disabled`
- `#checkboxTmpl` — custom toggle

## Drag and drop

`[allowDragAndDrop]="true"` — CDK DnD; optional `dropPredicate`. Style via `ngx-layout-*` classes.

## itemSize

`fill` (default) | `fit-content` | `equal` (height 100% on children for row height).

## Gaps

`rowGap`, `columnGap` — prefer over margins (CSS grid).

## Accessibility

Built-in labels: nl, en, fr, de, es, pt, tr, ku. Override `itemLabel`, `rowLabel`, per-item `label`.

## Classes

`ngx-layout-grid`, `-row`, `-item`, `-drag-placeholder`, `-item-toggle`, `-item-inactive`, `-item-disabled`, `-grid-inactive-shown`.
