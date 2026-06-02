---
name: ngx-authentication-setup
description: >-
  Bootstrap @ibenvandeveire/ngx-authentication with provideNgxAuthenticationConfiguration
  and NgxAuthenticationAbstractService. Use when wiring sign-in/out and auth types.
---

# ngx-authentication — Setup

Install: `npm install @ibenvandeveire/ngx-authentication` (+ `@ibenvandeveire/types-authentication`).

```typescript
providers: [
  provideNgxAuthenticationConfiguration({ service: YourAuthenticationService }),
],
```

Implement `NgxAuthenticationAbstractService<SignInResponse, SignInData, SignOutData, SignOutResult>`:

```typescript
@Injectable({ providedIn: 'root' })
export class AuthenticationService extends NgxAuthenticationAbstractService<
  SignInResponse,
  SignInData,
  SignOutData,
  void
> {
  protected signInUser(data: SignInData): Observable<SignInResponse> { … }
  protected signOutUser(data: SignOutData): Observable<void> { … }
}
```

`SignInResponse` = `AuthenticationResponse<User, AuthenticatedUserSession<Features, Permissions>, Metadata>`.

Optional: `httpClientConfiguration` — see `ngx-authentication/http-client/SKILL.md` (includes `provideHttpClient`).
