---
name: rxjs-utils-array-operators
description: >-
  Array RxJS operators from @ibenvandeveire/rxjs-utils: mapArray, sortArray,
  sliceArray. Use on observables that emit arrays; empty array if undefined.
---

# rxjs-utils — Array operators

Work on `Observable<T[] | undefined>`. **`undefined` → `[]`**.

## mapArray

Map each element: `mapArray((item) => item.id)`.

## sortArray

Sort emitted array; optional compare fn (default ascending).

## sliceArray

Slice by start/end indices: `sliceArray(1, 4)`.
