# Changelog - @ibenvandeveire/ngx-core

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [22.0.1] - 2026-08-04

### Fixed
- **Window Service & Inheritance**: Replaced direct global `window` usage in `handleContentScroll` with `this.window` (derived from `NgxWindowService`/`PLATFORM_ID`) and updated method access modifiers to `protected` for subclassing.

## [22.0.0] - 2026-07-29

### Changed
- **Angular 22 Upgrade**: Updated framework target and dependencies to Angular 22.
- **SSR Window Service**: Enhanced `NgxWindowService` with SSR platform checks using modern Angular `inject(PLATFORM_ID)`.
- **Mocks**: Exported updated unit test mocks (`NgxWindowServiceMock`, `NgxWindowMock`, `NgxDocumentMock`).

## [21.0.1] - 2026-05-02

### Fixed
- Fixed window resize event listener cleanup when destroying platform context.

## [21.0.0] - 2026-03-10

### Added
- Added scroll tracking observables (`scrollingUp$`, `currentScrollPosition$`) to `NgxWindowService`.
- Added `runInBrowser` helper to execute code exclusively in browser runtime contexts safely.

## [20.2.0] - 2025-12-01

### Added
- Added `simpleChangeHasChanged` utility function for Angular component lifecycle change detection checks.
- Initial core primitives for Angular applications.
