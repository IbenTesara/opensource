---
name: ngx-layout-mobile-layout
description: >-
  NgxMobileLayoutComponent, guards, and NgxMobileLayoutService for mobile shell
  header/nav/footer/flyout/aside from @ibenvandeveire/ngx-layout.
---

# ngx-layout — Mobile layout

Install: `npm install @ibenvandeveire/ngx-layout`. Minimal default styling.

## Component (app root)

```html
<ngx-mobile-layout>
  <ng-template #contentTmpl>
    <router-outlet />
  </ng-template>
</ngx-mobile-layout>
```

CSS classes: `ngx-mobile-layout-main`, `-header`, `-navigation`, `-content`, `-flyout`, `-flyout-in/out`, `-aside`, `-aside-in/out`.

## provideNgxMobileLayoutConfiguration (app.config)

Optional slots: `header` (`main` | `left` | `right`), `navigation`, `footer`, `aside`, `flyout`.

## Route overrides

`NgxMobileLayoutGuard` + route `data.mobileLayout` — e.g. `{ header: { right: null }, footer: DetailFooterComponent }`.

`NgxMobileLayoutDefaultGuard` on `canDeactivate` — restore defaults.

## NgxMobileLayoutService

`openFlyout` / `closeFlyout`, `openAside` / `closeAside` — optional component + `Injector` for flyout providers.
