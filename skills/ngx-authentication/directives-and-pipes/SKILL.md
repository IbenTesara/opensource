---
name: ngx-authentication-directives-pipes
description: >-
  Template directives ngxIsAuthenticated, ngxHasFeature, ngxHasPermission and
  impure pipes from @ibenvandeveire/ngx-authentication.
---

# ngx-authentication — Directives & pipes

## Directives (structural, ngIf-style)

```html
<p *ngxIsAuthenticated="true">Authenticated</p>
<p *ngxHasFeature="'A'">Has feature A</p>
<p *ngxHasPermission="'Admin'">Admin</p>
```

**Options:**

- `shouldHaveAllFeatures` / similar for permissions — require all vs any
- Inverse: `shouldHavePermission: false` (show when user lacks permission)

```html
<p *ngxHasFeature="['A','B']; shouldHaveAllFeatures: false">A and/or B</p>
```

## Pipes

`ngxHasFeature`, `ngxHasPermission` — **impure**. Prefer signals/observables in components when possible; pipes for simple templates.

## Mocks

`NgxAuthenticationServiceMock`, `NgxAuthenticationResponseMock` — types from `types-authentication`.
