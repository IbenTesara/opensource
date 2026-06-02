---
name: rxjs-utils-types
description: >-
  Observable type aliases from @ibenvandeveire/rxjs-utils (ObservableBoolean,
  ObservableArray, ObservableRecord, etc.). Use for clearer RxJS signatures.
---

# rxjs-utils — Types

Install: `npm install @ibenvandeveire/rxjs-utils`.

Aliases extending `Observable<T>`:

| Type | Definition |
| ---- | ---------- |
| `ObservableBoolean` | `Observable<boolean>` |
| `ObservableArray<T>` | `Observable<T[]>` |
| `ObservableString` | `Observable<string>` |
| `ObservableNumber` | `Observable<number>` |
| `ObservableRecord<DataType, DataId>` | `Observable<Record<DataId, DataType>>` |
| `ObservableBooleanRecord` | `Observable<Record<string, boolean>>` |
| `ObservableBlob` | `Observable<{ fileType: string; blob: Blob }>` |
| `ObservableStringRecord<ValueType>` | `Observable<Record<string, ValueType>>` |

Use for readable store/service APIs; no runtime behavior.
