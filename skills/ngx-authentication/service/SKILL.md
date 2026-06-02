---
name: ngx-authentication-service
description: >-
  NgxAuthenticationAbstractService state: user$, session$, metadata$, hasFeature,
  hasPermission, global features. Use after provideNgxAuthenticationConfiguration.
---

# ngx-authentication — Service

After `provideNgxAuthenticationConfiguration`, inject your service (extends `NgxAuthenticationAbstractService`).

## Observables

- `user$`, `session$`, `metadata$`

## Methods

- `hasPermission(…)`, `hasFeature(…)`
- `setGlobalFeatures(…)` — features available to all users (including anonymous)

## Custom storage

Override `storeAuthenticationResponse` / `getAuthenticationResponse` to persist auth in NgRx or elsewhere instead of built-in state.
