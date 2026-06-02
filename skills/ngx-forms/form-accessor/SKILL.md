---
name: ngx-forms-form-accessor
description: >-
  FormAccessor, DataFormAccessor, and createAccessorProviders from
  @ibenvandeveire/ngx-forms for reusable ControlValueAccessor components.
---

# ngx-forms — FormAccessor

Install: `npm install @ibenvandeveire/ngx-forms`.

Abstract CVA layer with defaults for `writeValue`, `validate`, `setDisabledState`, `markAsTouched`, `markAsPristine`.

## Base

```typescript
export class MyComponent extends FormAccessor<FormDataType, FormControlType> {
  initForm(): FormGroup {
    return new FormGroup({ foo: new FormControl(), bar: new FormControl() });
  }
}
```

## External vs internal shape

Third generic `InternalFormDataType` + optional mappers:

- `onWriteValueMapper` — API → form UI
- `onChangeMapper` — form UI → API

## disableFields

`disableFields` input — disable specific keys; optional `emitValueWhenDisableFieldsUsingInput`.

## setDisableState

First `setDisableState` ignored by default (Angular always calls it). Set `skipInitialSetDisable: false` to opt out.

## DataFormAccessor

`data` input drives `initForm` (e.g. dynamic control lists).

## createAccessorProviders

Registers `NG_VALUE_ACCESSOR` + `NG_VALIDATORS`. Prefer over manual providers.

## FormAccessorContainer

- Manual providers: also provide `BaseFormAccessor` with `useExisting: forwardRef(…)`.
- `updateValueAndValidity()` — recursive on nested accessors.
- Skip `BaseFormAccessor` when using `createAccessorProviders`.
