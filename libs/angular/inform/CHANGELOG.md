# Changelog - @ibenvandeveire/ngx-inform

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [22.0.0] - 2026-07-29

### Changed
- **Angular 22 & CDK Upgrade**: Upgraded CDK Dialog and Overlay dependencies to v22.
- **Signal-based Directives**: Converted `NgxTooltipDirective`, `NgxTourItemDirective`, and `NgxFocusTrapDirective` to Angular Signal inputs and queries.
- **Access Modifiers**: Refactored internal service state to `protected` to enable custom modal/toast/tour extension services.

## [21.0.2] - 2026-05-14

### Fixed
- Fixed backdrop cutout margin calculations in `NgxTourService` when scrolling elements into view on high-DPI viewports.

## [21.0.0] - 2026-03-12

### Added
- **Guided Product Tours**: Added `NgxTourService`, `NgxTourItemDirective`, and `NgxTourStepComponent` with focus trapping, backdrop cutouts, and keyboard navigation.
- **RxJS Stream Operators**: Added `openModal`, `toastOnError`, `toastOnSuccess`, and `startTour` operators for reactive workflow integration.

## [20.3.0] - 2026-01-25

### Added
- **WCAG Accessibility**: Enforced `alertdialog` description checks (`describedById`) in `NgxModalService`.
- Added automatic focus restoration on modal close.

## [20.1.0] - 2025-11-10

### Added
- Initial release of `@ibenvandeveire/ngx-inform`.
- Accessible modal service built on Angular CDK Dialog.
- Toast notification container and queue service.
- Floating tooltip service and directive.
