# Changelog - @ibenvandeveire/ngx-cookies

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [22.0.0] - 2026-07-29

### Changed
- **Angular 22 Upgrade**: Updated framework dependencies to Angular 22.
- **vanilla-cookieconsent Integration**: Updated underlying consent management library to v3.1.0.
- **Inheritance & Visibility**: Made private service properties `protected` to facilitate subclassing.

## [21.1.2] - 2026-05-18

### Fixed
- Fixed issue where cookie category state updates failed to trigger UI re-renders on initial page load in SSR environments.

## [21.1.0] - 2026-04-02

### Added
- Added fallback component token `NgxCookiesFallbackComponentToken` for rendering custom consent dialogs.
- Added `NgxHasCookieDirective` to conditionally display DOM content based on accepted cookie categories.

## [21.0.0] - 2026-03-01

### Changed
- Updated initialization lifecycle for `NgxCookieService` to prevent hydration mismatches.

## [20.0.1] - 2025-11-15

### Added
- Initial release of `@ibenvandeveire/ngx-cookies`.
- SSR-safe cookie service wrapping `vanilla-cookieconsent`.
- Category management for essential, analytical, and marketing cookies.
