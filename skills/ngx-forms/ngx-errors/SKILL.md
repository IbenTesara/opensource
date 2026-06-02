---
name: ngx-forms-errors
description: >-
  NgxFormsErrorsDirective and root error configuration from @ibenvandeveire/ngx-forms.
  Use for consistent validation messages and custom error components.
---

# ngx-forms — NgxErrors

## Root configuration

```typescript
{
  provide: NgxFormsErrorsConfigurationToken,
  useValue: {
    errors: { required: '…', email: '…' },
    showWhen: 'touched', // or 'dirty'
    component: CustomErrorComponent, // optional
    show: 1 | 'all', // optional — multiple errors
    location: 'before' | 'after', // default after
  },
},
```

Import `NgxFormsErrorsDirective` in standalone components.

## Template

```html
<input *ngxFormsErrors="'hello'" formControlName="hello" />
```

Pass control name string or `AbstractControl`. Renders below control (default `p.ngx-forms-error`).

## Custom component

Extend `NgxFormsErrorAbstractComponent` — inputs: `errors` (strings), `errorKeys`, `data` (`ValidationErrors`).

Default: first error only unless `show` configured.
