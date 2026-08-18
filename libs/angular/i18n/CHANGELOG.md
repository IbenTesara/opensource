# Changelog - @ibenvandeveire/ngx-i18n

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [22.1.2] - 2026-08-18

### Fixed
- **TranslateLoader Provider Registration**: Explicitly configured `TranslateLoader` provider token with `NgxI18nMultiTranslationHttpLoader` in `provideNgxI18nConfiguration` and `provideWithTranslations` to ensure compatibility with `@ngx-translate/core` v17+ (workaround for ngx-translate #1651).

## [22.1.1] - 2026-08-03

### Fixed
- **Accessibility Fix**: Fixed accessibility announcer and ARIA focus management when application language is switched dynamically at runtime.

## [22.1.0] - 2026-08-02

### Fixed
- **Translation Loading**: Fixed issue where translations were deleted before new language files completed loading, causing flickering missing key warnings.
- **Language Switch Persistence**: Improved language change reaction across scoped feature instances via `rootI18nService.currentLanguage$`.

## [22.0.0] - 2026-07-29

### Changed
- **Angular 22 Upgrade**: Peer dependencies updated to Angular 22 and `@ngx-translate/core` v17.
- **DestroyRef Refactoring**: Replaced `takeUntil` subject patterns with `takeUntilDestroyed(this.destroyRef)` in `NgxI18nService`.

## [21.0.0] - 2026-03-20

### Added
- **MultiTranslationLoader**: Added loader for merging multiple JSON translation namespaces into a single active scope.
- **Route Guards & Resolvers**: Added `NgxI18nGuard`, `NgxSetLanguageGuard`, and `NgxI18nResolver` for pre-loading locale bundles during route transitions.

## [20.0.0] - 2025-11-01

### Added
- Initial release of `@ibenvandeveire/ngx-i18n`.
- `NgxI18nRootService` and scoped `NgxI18nService` for feature-level localization management.
