---
name: types-authentication
description: >-
  Shared auth TypeScript types for @ibenvandeveire/ngx-authentication.
  Use for AuthenticationResponse, AuthenticatedUserSession, and typing
  sign-in/sign-out services.
---

# @ibenvandeveire/types-authentication

Shared types for `ngx-authentication` and your auth API layer. Install: `npm install @ibenvandeveire/types-authentication`.

## AuthenticationResponse

Generic shape of auth state:

| Part | Description |
| ---- | ----------- |
| `user` | Authenticated user |
| `session` | Features and permissions |
| `metadata` | Optional API metadata |

```typescript
type SignInResponse = AuthenticationResponse<
  User,
  AuthenticatedUserSession<Features, Permissions>,
  Metadata
>;
```

## AuthenticatedUserSession

Session with typed feature and permission keys:

```typescript
type Session = AuthenticatedUserSession<'A' | 'B', 'Admin' | 'User'>;
// { features: ['A'], permissions: ['User'] }
```

## Usage with ngx-authentication

Pass `SignInResponse` as the **first** generic on `NgxAuthenticationAbstractService`. See `skills/ngx-authentication/setup/SKILL.md`.
