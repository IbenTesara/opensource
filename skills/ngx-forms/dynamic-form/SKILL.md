---
name: ngx-forms-dynamic-form
description: >-
  NgxDynamicFormComponent and provideNgxDynamicFormConfiguration from
  @ibenvandeveire/ngx-forms for runtime input component selection.
---

# ngx-forms — Dynamic form

`NgxDynamicFormComponent` — CVA that renders different inputs by `key`.

## Configuration

```typescript
provideNgxDynamicFormConfiguration({
  text: TextFormComponent,
  textField: TextFieldFormComponent,
}),
```

Components extend `NgxDynamicFormInputComponent`.

## Template

```html
<ngx-dynamic-form formControlName="field" key="text" />
```

Optional `options` forwarded to child input.
