---
name: ngx-inform-tooltips
description: >-
  ngxTooltip directive and provideNgxTooltipConfiguration from @ibenvandeveire/ngx-inform.
  Custom tooltip components must extend NgxTooltipAbstractComponent.
---

# ngx-inform — Tooltips

## Setup

```typescript
provideNgxTooltipConfiguration({
  component: MyTooltipComponent, // extends NgxTooltipAbstractComponent
  defaultPosition: 'right', // default above
}),
```

## Template

```html
<h1 ngxTooltip="Text" ngxTooltipId="title_1">Title</h1>
```

- **`ngxTooltipId`** — must be **unique** (or auto UUID)
- **`ngxTooltipPosition`** — `above` | `below` | `left` | `right`
- **`ngxTooltipComponent`** — override default
- **`ngxTooltipDisabled`** — default `false`

Component gets `text`, `position`, `positionClass` (`ngx-tooltip-position-*`).

## Mock

`NgxTooltipServiceMock`.
