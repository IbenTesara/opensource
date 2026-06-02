---
name: ngx-authentication-guards
description: >-
  Route guards from @ibenvandeveire/ngx-authentication: NgxIsAuthenticatedGuard,
  NgxHasFeatureGuard, NgxHasPermissionGuard. Use with NgxAuthenticatedRoute data.
---

# ngx-authentication — Guards

Type routes as **`NgxAuthenticatedRoute`** / **`NgxAuthenticatedRoutes`** so `data` is required.

## NgxIsAuthenticatedGuard

```typescript
{
  path: 'sign-in',
  canActivate: [NgxIsAuthenticatedGuard],
  data: {
    redirect: '../dashboard',
    shouldBeAuthenticated: false, // guest-only route
  },
},
```

## NgxHasFeatureGuard

```typescript
{
  canActivate: [NgxHasFeatureGuard<Features>],
  data: { redirect: '../dashboard', feature: ['A'] },
},
```

## NgxHasPermissionGuard

```typescript
{
  canActivate: [NgxHasPermissionGuard<Permissions>],
  data: { redirect: '../dashboard', permission: ['Admin'] },
},
```

`redirect` — navigate when check fails.
