# Changelog - @ibenvandeveire/rxjs-utils

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-08-01

### Added
- **Populate Operator Optimization**: Enhanced `populate` operator to use `structuredClone` with `lodash.cloneDeep` fallback to optimize memory allocation when populating nested paths.

### Changed
- Replaced `dot-prop` dependency with `lodash/get` and `lodash/set`.

## [1.0.0] - 2025-11-01

### Added
- Initial release of `@ibenvandeveire/rxjs-utils`.
- Custom RxJS operators:
  - `populate`: Populates object properties asynchronously using child observables.
  - `pluck` & `pluckOr`: Safe property plucking with fallback values.
  - `fetchIf`: Conditional fetching operator.
  - `combineBoolean`: Combines boolean observables.
  - Array operators (`map`, `slice`, `sort`).
