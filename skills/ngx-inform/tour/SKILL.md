---
name: ngx-inform-tour
description: >-
  Guided tours with NgxTourService, tourItem directive, startNgxTour and
  useMockDataDuringTour from @ibenvandeveire/ngx-inform. Requires CDK overlay CSS.
---

# ngx-inform — Tour

## Setup

Root SCSS: `@import '@angular/cdk/overlay-prebuilt.css';`

```typescript
provideNgxTourConfiguration(CustomTourStepComponent);
// or { component, offset: { top, bottom } }
```

Step component extends **`NgxTourStepComponent`** — must include `#stepTitle` for `aria-labelledby`. Output `handleInteraction`: `'next' | 'back' | 'close'`.

## Steps

```typescript
this.tourService.startTour([
  {
    title: '…',
    content: '…',
    tourItem: 'helloWorld', // matches tourItem="helloWorld" on element
    position: 'below',
    cutoutMargin: 10,
    delay: 2000, // wait for DOM; default 100ms skip
    beforeVisible / onVisible / afterVisible,
    component, disableBackdrop, data, stepClass, offset,
  },
], onClose?, startIndex?).subscribe();
```

**Directive:** `tourItem="id"` → adds `ngx-tour-item-active` when highlighted.

**`*ngxTourShowWhen`** — conditional template while tour active.

**Observables:** `tourStarted$`, `tourEnded$`, `currentStep$`, `currentIndex$`, `previousStep$`, `currentTour$`.

## Operators

- `startNgxTour(steps, onClose?, startIndex?, tourService?)` — after source emits, forward value when tour ends
- `useMockDataDuringTour(mock)` — swap stream during tour (injection context only)

## Known issues

- Multi-page tours: `onClose` navigate home; may need `ChangeDetectorRef.detectChanges()` after `router.navigate`.
- Scroll: uses `scrollIntoView`; custom scroll if element not found.

## Mock

`NgxTourServiceMock`.
