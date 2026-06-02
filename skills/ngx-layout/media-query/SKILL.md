---
name: ngx-layout-media-query
description: >-
  NgxMediaQueryService, provideNgxMediaQueries, *ngxMediaQuery directive and
  ngxMatchesQuery pipe from @ibenvandeveire/ngx-layout. Prefer over deprecated ngx-utils version.
---

# ngx-layout — Media query

> `NgxMediaQueryService` in **ngx-utils** is deprecated — use **ngx-layout**.

## Register breakpoints (app.config)

```typescript
provideNgxMediaQueries([
  { id: 'Mobile', query: '(width <= 875px)' },
  { id: 'Desktop', query: '(width >= 1024px)' },
]),
```

## NgxMediaQueryService

```typescript
inject(NgxMediaQueryService).matchesQuery('Mobile'); // Observable<boolean>
```

Runtime: `registerQuery`. SSR-safe.

## *ngxMediaQuery directive

```html
<ng-container *ngxMediaQuery="['Desktop', 'Tablet']">…</ng-container>
<ng-container *ngxMediaQuery="'Mobile'; ngxMediaQueryElse: fallback">…</ng-container>
```

| Input | Purpose |
| ----- | ------- |
| ngxMediaQuery | id or ids |
| ngxMediaQueryElse | template when no match |
| ngxMediaQueryShouldMatch | default true; false = show when **not** matching |
| ngxMediaQueryMatchingPredicate | `every` (default) or `some` |

## ngxMatchesQuery pipe

```html
@if (['Desktop'] | ngxMatchesQuery) { … }
```

Second arg: `every` | `some` for multiple ids.
