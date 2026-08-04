# Changelog - @ibenvandeveire/ngx-layout

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [22.1.0] - 2026-08-02

### Performance
- **Sort & ARIA Computations**: Optimized sort ARIA label calculation in `NgxTableComponent` using cached `computed()` signals (`sortAriaLabels`, `baseSortLabels`).

### Fixed
- Fixed exports for layout enums (`SortDirection`) and host class compilation bindings.

## [22.0.0] - 2026-07-29

### Changed
- **Angular 22 Migration**: Updated CDK and Angular core imports to v22.
- **Signal-Based Queries & Inputs**: Converted `NgxTableComponent`, `NgxAccordionComponent`, and drag-and-drop directives to `input()`, `linkedSignal()`, `contentChild()`, and `contentChildren()`.

## [21.6.0] - 2026-06-05

### Added
- **TreeGrid Support**: Integrated `NgxTreeGrid` directive and tree grid keyboard navigation into `NgxTableComponent`.
- Added `ngxOpenRowStateColumn` and `openRowStateTemplate` for expandable detail rows.

## [21.5.3] - 2026-05-20

### Fixed
- Fixed flyout persistence in `NgxMobileLayoutComponent` when changing screen breakpoints.

## [21.5.0] - 2026-04-10

### Added
- **Accessible Drag and Drop**: Introduced `NgxAccessibleDragAndDropHostDirective`, `ContainerDirective`, and `ItemDirective` with screen-reader live region announcements and keyboard sorting.
- **Configurable Layout**: Added `NgxConfigurableLayoutComponent` for dynamic grid layouts.

## [21.0.0] - 2026-03-01

### Added
- **NgxTable Component**: Released high-performance, accessible data table component wrapping `@angular/cdk/table`.
- Support for sorting, row selection (checkbox/radio), detail row templates, empty/loading templates, and custom cell formatting directives.

## [20.0.0] - 2025-11-01

### Added
- Initial release of `@ibenvandeveire/ngx-layout`.
- Basic layout directives (`button`, `link`, `display-content`) and `NgxAccordionComponent`.
