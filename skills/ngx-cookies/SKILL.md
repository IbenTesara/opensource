---
name: ngx-cookies
description: >-
  Angular wrapper for CookieConsent V3 and cookie helpers from
  @ibenvandeveire/ngx-cookies. Use for setupCookiesHandler, consent observables,
  set/get/remove cookie, or *hasCookie directive.
---

# @ibenvandeveire/ngx-cookies

Thin Angular layer over [vanilla-cookieconsent](https://cookieconsent.orestbida.com). Install: `npm install @ibenvandeveire/ngx-cookies` and add CSS:

```json
"styles": ["node_modules/vanilla-cookieconsent/dist/cookieconsent.css"]
```

Major version tracks Angular. Configure consent via CookieConsent docs; this package wires events to Observables.

## NgxCookieService — cookie consent

- Call **`setupCookiesHandler`** in **`ngAfterViewInit`** (required).
- Observables: `firstCookiesConsented`, `cookiesConsented`, `cookiesConsentChanged`, `modalVisible$`.
- Category/service: `hasAcceptedCategory`, `acceptCategory`, `hasAcceptedService`, `acceptService`.
- **`showModal()`** — open consent UI anytime.

## NgxCookieService — set/get/remove

| Method | Notes |
| ------ | ----- |
| `setCookie` / `getCookie` / `removeCookie` | Imperative API |
| `cookiesChanged$` | Emits on set/remove via service only; **not** on startup if value unchanged |
| `getCookieObservable(name)` | Includes **initial** value |

Direct `document.cookie` changes are **not** reflected in observables.

## hasCookieDirective

Structural directive `*hasCookie` — renders content when cookie(s) accepted.

- Default: hide if not accepted.
- App-wide fallback: provide `NgxCookieFallbackComponentToken` with component extending `NgxCookiesFallBackComponent`.
- Per-use `else` template overrides global fallback.

```html
<div *hasCookie="'analytics'">Tracking enabled</div>
```
