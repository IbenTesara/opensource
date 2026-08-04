# Changelog - @ibenvandeveire/ngx-authentication

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [22.0.0] - 2026-07-29

### Changed
- **Angular 22 Upgrade**: Upgraded peer dependencies and core framework references to Angular 22.
- **Signal-based queries**: Refactored internal component/directive queries to modern Signal-based APIs (`viewChildren`, `contentChild`).
- **Access Modifiers**: Updated private properties across abstract classes and services to `protected` for better inheritance and extendability in consuming applications.

## [21.0.1] - 2026-05-10

### Fixed
- Fixed minor typing issues when checking permissions across combined feature sets.

## [21.0.0] - 2026-03-15

### Added
- **Global Features Support**: Introduced `setGlobalFeatures` method to support features accessible regardless of user sign-in state.
- **Standalone Directives & Guards**: Converted `HasFeatureDirective`, `HasPermissionDirective`, and `IsAuthenticatedDirective` to standalone.

## [20.0.1] - 2026-01-20

### Fixed
- Fixed null reference check in `hasPermission` stream when session state is uninitialized.

## [20.0.0] - 2025-11-01

### Added
- Initial release of `@ibenvandeveire/ngx-authentication`.
- Core abstract authentication service `NgxAuthenticationAbstractService`.
- Directives, guards, and pipes for `hasFeature`, `hasPermission`, and `isAuthenticated`.
- HTTP interceptor and test mocks for authenticated Angular applications.
