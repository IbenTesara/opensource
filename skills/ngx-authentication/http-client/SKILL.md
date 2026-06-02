---
name: ngx-authentication-http-client
description: >-
  NgxAuthenticatedHttpClient and provideNgxAuthenticationConfiguration httpClientConfiguration.
  Use for base URL, withCredentials, authenticated interceptors, and download helper.
---

# ngx-authentication — NgxAuthenticatedHttpClient

Optional. Enable via `provideNgxAuthenticationConfiguration({ service, httpClientConfiguration })`.

| Option | Purpose |
| ------ | ------- |
| `baseUrl` | Function → prefix for all URLs (`baseurl/request-url`) |
| `interceptors` | Extra HTTP interceptors |
| `authenticatedCallHandler` | Transform authenticated requests |

Provides `HttpClient` automatically — do not duplicate `provideHttpClient`.

## API

`get`, `post`, `put`, `patch`, `delete`, plus **`download`** (GET for blobs).

```typescript
const httpClient = inject(NgxAuthenticatedHttpClient);
httpClient.get<Data>('get-data');
```

Default **`withCredentials: true`**. Override per call, e.g. login:

```typescript
httpClient.post<Data>('login', data, undefined, false);
```
