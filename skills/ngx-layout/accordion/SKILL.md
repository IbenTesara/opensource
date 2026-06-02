---
name: ngx-layout-accordion
description: >-
  WCAG ngx-accordion and ngx-accordion-item from @ibenvandeveire/ngx-layout.
  Import NgxAccordion for keyboard-accessible accordion.
---

# ngx-layout — Accordion

Import **`NgxAccordion`** (container + item).

```html
<ngx-accordion open="first">
  <ngx-accordion-item>
    <ng-template #headerTmpl>Section one</ng-template>
    <ng-template #contentTmpl>Content…</ng-template>
  </ngx-accordion-item>
</ngx-accordion>
```

Templates get open state via `$implicit` outlet.

## open input

`all` | `first` | index | index[] — initial open section(s). Ignores `disabled` for forced-open items.

## disabled

Per-item `[disabled]="true"` — user cannot toggle (unless opened via parent `open`).

## Classes

`ngx-accordion`, `ngx-accordion-item`, `ngx-accordion-header`, `ngx-accordion-content`, `is-open`. Uses native `<details>` internally.
