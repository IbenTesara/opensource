---
name: ngx-layout-table
description: >-
  ngx-table component with cells, sorting, selection, detail rows, and treegrid
  directives from @ibenvandeveire/ngx-layout.
---

# ngx-layout — Table

```html
<ngx-table [columns]="['name', 'firstName']" [data]="users()" />
```

## Custom cells — ngx-table-cell

`column` matches `columns` key. Templates: `#headerTmpl`, `#cellTmpl`, `#footerTmpl`.

`#cellTmpl` — `let-row="row"`, `let-index="index"`, implicit property by column key.

Built-in: `ngx-table-date-cell`, `ngx-table-currency-cell`.

## provideNgxTableConfiguration

| Option | Purpose |
| ------ | ------- |
| `showDetailRow` | `always` \| `on-click` \| `on-single-item` |
| `showOpenRowState` | Open indicator |
| `allowMultipleRowsOpen` | Multiple detail rows |
| `hideHeaderWhen` | `when-empty`, `when-loading` |
| `components` | loading, empty, checkbox, sort, openRowState |

## Sorting

`[sortable]="true"` + `#sortTmpl`; `[currentSorting]` input — **you** sort `data` in component (`NgxTableSortEvent`).

## Selection

`[selectable]="true"`, `selectableType`: `checkbox` \| `radio`, `selectableKey` — implements **CVA** → `FormControl`.

## Detail rows

`#detailRowTmpl let-row` + `(rowClicked)`.

## Treegrid (WCAG)

| Directive | Role |
| --------- | ---- |
| `[ngxTreeGrid]` on table | `role="treegrid"` |
| `ngxTreeGridRow` + index | Vertical nav |
| `ngxTreeGridCell` | Horizontal nav |

`[ngxTreeGridExpandable]="true"` — expand/collapse with arrows. Follow W3C treegrid pattern.
