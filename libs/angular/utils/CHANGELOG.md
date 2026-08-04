# Changelog - @ibenvandeveire/ngx-utils

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [22.0.0] - 2026-07-29

### Changed
- **Angular 22 Migration**: Updated core dependencies to Angular 22.
- **SSR Safe Storage**: Updated `NgxStorageService` to safely handle non-browser execution without throwing DOM exceptions.

### Deprecated
- `NgxMediaQueryService` in `ngx-utils` is deprecated in favor of `NgxMediaQueryService` from `@ibenvandeveire/ngx-layout`.

## [21.0.1] - 2026-05-08

### Fixed
- Fixed IBAN formatting regex in `IbanPipe` for international bank account numbers with variable length.

## [21.0.0] - 2026-03-10

### Added
- **Storage Service & Mocks**: Added `NgxStorageService` providing observable wrappers around `localStorage` and `sessionStorage` with change event streams.
- **BroadcastChannelService**: Added cross-tab messaging service and corresponding `BroadcastChannelServiceMock`.
- **QueryParamFormSyncComponent**: Abstract component for bidirectional reactive form and URL query parameter synchronization.

## [20.0.1] - 2025-11-02

### Added
- Initial release of `@ibenvandeveire/ngx-utils`.
- Common Angular directives (`CypressTagDirective`, `FocusClickDirective`) and formatting pipes (`BtwPipe`, `IbanPipe`, `ReplaceElementsPipe`, `TransformPipe`).
