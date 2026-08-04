# Changelog - @ibenvandeveire/ngx-store

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [22.0.0] - 2026-07-29

### Changed
- **Angular 22 & NgRx 21 Upgrade**: Upgraded `@ngrx/store`, `@ngrx/effects`, `@ngrx/entity`, and `@ngrx/signals` dependencies.
- **Signal Store Generator**: Refactored `createNgxSignalStore` and `injectNgxSignalStore` to use Angular `inject()` function.

## [21.0.1] - 2026-05-11

### Fixed
- Fixed array element deduplication in `createNgxSignalStoreArraySlice` when using custom `selectId` functions.

## [21.0.0] - 2026-03-15

### Added
- **Signal-Based Store Architecture**: Introduced `@ngrx/signals` based store primitives (`createNgxSignalStoreSlice`, `createNgxSignalStoreArraySlice`, `dispatchDataToSignalStore`).
- Slice-level loading, saving, error, and data signal states out of the box.

## [20.4.0] - 2026-01-10

### Added
- Added entity adapter reducer helpers and `handleEffect` operator for RxJS NgRx stores.

## [20.1.0] - 2025-11-05

### Added
- Initial release of `@ibenvandeveire/ngx-store`.
- `NgxStoreService` base class for selecting state, loading, error, and error messages from NgRx store slices.
