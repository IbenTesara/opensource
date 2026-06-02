---
name: ngx-utils-pipes
description: >-
  FocusClickDirective, BTW/IBAN/Transform/HasObservers pipes, and ngxReplaceElements
  from @ibenvandeveire/ngx-utils.
---

# ngx-utils — Focus click & pipes

## FocusClickDirective

A11y-friendly click: mouse **and** Enter when focused (replaces plain `click` where keyboard access matters).

## BTW / IBAN

Format Belgian VAT (`474603875` → `474.603.875`) and IBAN spacing.

## HasObserversPipe

Checks if an `@Output()` has subscribers.

## TransformPipe

`value | transform: fn` — arbitrary transform in template.

## ngxReplaceElements

Embed Angular web components inside translated/HTML strings.

1. Component with lowercase `@Input()` names (Web Component limitation).
2. `createCustomElement` + `customElements.define` in browser (`NgxWindowService.isBrowser()`).
3. `provideNgxReplaceElementsConfiguration({ link: { element, selector with {{id}}, includeInnerHtml? } })`.
4. String anchors: `<a data-link-id='uniqueId'>…</a>`
5. Pipe: `string | ngxReplaceElements: [{ id, elementId, data }]`

## simpleChangeHasChanged

Same as ngx-core — JSON compare in `ngOnChanges`.
