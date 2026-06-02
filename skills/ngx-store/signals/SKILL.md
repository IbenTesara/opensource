---
name: ngx-store-signals
description: >-
  Signal stores with createNgxSignalStore, provideNgxSignalStore, injectNgxSignalStore,
  NgxSignalStoreService, dispatchDataToSignalStore from @ibenvandeveire/ngx-store.
---

# ngx-store — Signals

## 1. Define state

```typescript
export interface TestState extends NgxSignalStoreState {
  userName: NgxSignalStoreSlice<string>;
  people: NgxSignalStoreSlice<{ id: string; name: string }[]>;
}
```

Each slice: `data`, `loading`, `error`.

## 2. createNgxSignalStore

```typescript
export const TestStore = createNgxSignalStore<TestState>({
  userName: { generator: createNgxSignalStoreSlice<string> },
  people: {
    generator: createNgxSignalStoreArraySlice<…>,
    selectId: (item) => item.id, // required if no `id` property
    initialData: [],
  },
});
```

Array slices: `add`, `prepend`, `update`, `remove`.

## 3. provideNgxSignalStore(TestStore)

Route or component `providers`.

## 4. Consume

- `injectNgxSignalStore(TestStore)` — direct access
- **Preferred:** `class StoreService extends NgxSignalStoreService<TestState>` with `super(TestStore)` → readonly `state`

Slice API: `data`, `loading`, `error`, `set`, `setLoading`, `setError`, `reset`, `clear` (+ array methods).

## dispatchDataToSignalStore

```typescript
dispatchDataToSignalStore('hello', of('Hello').pipe(delay(500)), this.store);
```

Same pattern as RxJS `dispatchDataToStore`.
