---
name: ngx-forms-validators
description: >-
  Custom Angular validators from @ibenvandeveire/ngx-forms: allOrNothingRequired,
  atLeastOneRequired, date validators, setFormError, decimalsAfterComma.
---

# ngx-forms — NgxValidators

Compatible with reactive forms.

| Validator | Scope | Behavior |
| --------- | ----- | -------- |
| `allOrNothingRequired` | FormGroup | All filled or none |
| `atLeastOneRequired` | FormGroup | ≥1 filled; optional custom “filled” fn |
| `dependedRequired` | FormGroup | Dependent fields required when trigger filled |
| `chronologicalDates` | — | Two dates in order |
| `dateRangeValidator` | — | Date strictly between range (exclusive bounds) |
| `setFormError` / `clearFormError` | Control | Imperative error keys in custom validators |
| `decimalsAfterComma` | Control | Max decimal places; error `invalidDecimalsAfterComma` |
