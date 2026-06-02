---
name: ngx-utils-broadcast-channel
description: >-
  NgxBroadcastChannelService wrapping Broadcast Channel API with SSR guards.
  Use for initChannel, postMessage, selectChannelMessages across tabs.
---

# ngx-utils — Broadcast Channel

`NgxBroadcastChannelService` — browser-only (via `NgxWindowService`). Named channels in a record; reuses existing channel on duplicate `initChannel`.

| Method | Notes |
| ------ | ----- |
| `initChannel(name)` | No-op + log if no name |
| `closeChannel(name)` | No-op if missing |
| `postMessage(name, msg)` | No-op + log if channel missing |
| `selectChannelMessages(name)` | `EMPTY` + log if invalid |
| `selectChannelMessageErrors(name)` | Error channel subscription |

**Lifecycle:** `initChannel` in `ngOnInit`, `closeChannel` in `ngOnDestroy`.

## Mock

`NgxBroadcastChannelServiceMock`.
