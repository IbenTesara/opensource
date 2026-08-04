# Changelog - @ibenvandeveire/ngx-forms

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [22.1.0] - 2026-08-01

### Added
- **Signal Inputs & Queries**: Updated `disableFields`, `skipInitialSetDisable`, `preserveFormValueOnNewData`, `data`, and child accessor queries to use Angular Signal inputs (`input()`, `viewChildren()`).
- **Dynamic Form Integration**: Added `NgxDynamicFormDirective` as an injectable parent control fallback for `FormAccessor`.

## [22.0.0] - 2026-07-29

### Changed
- **Angular 22 Upgrade**: Core dependencies updated to Angular 22.
- **Form Touch/Dirty Propagation**: Overrode native `markAsTouched`, `markAsDirty`, and `markAsPristine` handlers on parent controls to automatically trigger child accessor state updates.

## [21.3.5] - 2026-06-12

### Fixed
- Fixed exception when `errorViewContainer` was destroyed prior to form control disposal.

## [21.3.4] - 2026-05-28

### Added
- Added support for custom value mappers (`onChangeMapper`, `onWriteValueMapper`) in `FormAccessor`.

## [21.3.0] - 2026-04-15

### Added
- **NgxSaveOnExitGuard & Component**: Added route guard and abstract base component for preventing unsaved form loss on navigation or tab closure (`beforeunload`).
- **Custom Validators**: Added `NgxValidators` collection including `allOrNothingRequired`, `atLeastOneRequired`, `dependedRequired`, `decimalsAfterComma`, `chronologicalDates`, and `dateRangeValidator`.

## [21.0.0] - 2026-03-01

### Added
- Introduced `DataFormAccessor` for asynchronous/data-driven form structures.
- Introduced `FormAccessorContainer` for nested form composition.

## [20.0.0] - 2025-11-01

### Added
- Initial release of `@ibenvandeveire/ngx-forms`.
- Base `NgxFormsControlValueAccessor` and `FormAccessor` for custom ControlValueAccessor components.
