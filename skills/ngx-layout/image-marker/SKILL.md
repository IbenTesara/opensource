---
name: ngx-layout-image-marker
description: >-
  ngx-image-marker for MarkerJs2/MarkerLive annotations on images from
  @ibenvandeveire/ngx-layout. ZoneJS workarounds included.
---

# ngx-layout — Image marker

MarkerJs2 + MarkerLive. Some MarkerJs2 features reimplemented for ZoneJS compatibility.

```html
<ngx-image-marker
  image="/assets/plan.png"
  imageDescription="Floor plan"
  [canEdit]="editing()"
  [startState]="markerState()"
  (stateUpdated)="markerState.set($event)"
/>
```

| Input/Output | Purpose |
| ------------ | ------- |
| `canEdit` | Edit vs view mode |
| `startState` | Initial annotations |
| `stateUpdated` | Emits on edit changes |
| `markerClicked` | View mode marker click |
| `zoomLevels` / `currentZoomLevel` | Zoom control |
| `markerTypes` | Restrict tools — **separate** types for view vs edit packages |

## Styling

Classes map to MarkerJS style settings: `ngx-image-marker-toolbar`, `-toolbox`, `-notes-area`, etc.

## Accessibility

No keyboard support in MarkerJS — inform users; compliance work in progress.
