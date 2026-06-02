---
name: ngx-i18n
description: >-
  Lazy modular i18n for Angular from @ibenvandeveire/ngx-i18n. Use for
  provideNgxI18nConfiguration, provideWithTranslations, language guards,
  translation loaders, or NgxI18nLoadingService.
---

# @ibenvandeveire/ngx-i18n

Feature-scoped translation files, lazy-loaded per route. Install: `npm install @ibenvandeveire/ngx-i18n`.

## Services

| Service | Scope |
| ------- | ----- |
| `NgxI18nService` | Per feature — use for translations inside a feature |
| `NgxI18nRootService` | App-wide language source of truth; persists language to localStorage |

## Setup — root

In `app.config.ts`:

```typescript
provideNgxI18nConfiguration({
  defaultAssetPaths: ['./i18n/core/'],
  availableLanguages: ['en'],
  defaultLanguage: 'en',
  // optional: languageRouteParam (default 'language'), cacheBust
});
```

**Translation path** = directory ending with `/` pointing at JSON files.

## Setup — feature routes

```typescript
provideWithTranslations(
  { path: '', component: TestComponent },
  ['./i18n/test/', './i18n/shared/'],
);
```

Adds `NgxI18nTranslationLoaderGuard`; shared paths load once.

## Guards

| Guard | Role |
| ----- | ---- |
| `NgxI18nSetLanguageGuard` | Base route: set language from route or localStorage, else default |
| `NgxI18nGuard` | `:language` — load translations; reject unknown languages → default |
| `NgxI18nEmptyComponent` | Dummy component when base route has no component |

```typescript
{ path: '', canActivate: [NgxI18nSetLanguageGuard], component: NgxI18nEmptyComponent },
{ path: ':language', canActivate: [NgxI18nGuard], loadChildren: … },
```

## Translation loader

- `NgxI18nMultiTranslationHttpLoader` — parallel JSON load + merge.
- **`NgxI18nLoadingService`** — loading UI during fetch/language switch.
- Custom: `client` extending `NgxI18nAbstractClient` in `provideNgxI18nConfiguration`.

## Mocks

`NgxI18nRootServiceMock`, `NgxI18nServiceMock` for tests.
