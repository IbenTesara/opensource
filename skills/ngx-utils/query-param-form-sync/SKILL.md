---
name: ngx-utils-query-param-form-sync
description: >-
  NgxQueryParamFormSyncComponent to sync Angular forms with URL query params.
  Use for shareable filtered views and optional scramble/unscramble.
---

# ngx-utils — Query param form sync

Extend `NgxQueryParamFormSyncComponent<Filters, FormGroupType>`.

## Required

`initForm()` — form backing query params.

`clearData()` — provided on base to reset form.

Inject `ActivatedRoute` + `Router`; call `super(route, router)` in constructor.

## Optional

| Method | Purpose |
| ------ | ------- |
| `handleDataChanges(value)` | React to form changes — **do not** subscribe inside (already in subscription) |
| `scrambleParams` / `unscrambleParams` | GDPR-safe URL sharing |

Use for filter UIs where URL and UI must stay aligned.
