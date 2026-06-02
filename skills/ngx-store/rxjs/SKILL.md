---
name: ngx-store-rxjs
description: >-
  NgRx boilerplate reduction with createStoreAssets, handleEffect, dispatchDataToStore,
  and NgxStoreService from @ibenvandeveire/ngx-store.
---

# ngx-store — RXJS / NgRx

Install: `npm install @ibenvandeveire/ngx-store` (+ NgRx). Works with existing NgRx; utils are opt-in.

## createStoreAssets

Define slice type, then generate actions/reducers/selectors per sub-slice:

```typescript
type ExampleStoreAssets = {
  channel: BaseStoreAssets<DataType>;
  videos: EntityStoreAssets<DataType>;
};

export const { actions, reducers, selectors } = createStoreAssets<ExampleStoreAssets>('slice', [
  { subSlice: 'channel', generator: createBaseStoreAssets<DataType> },
  { subSlice: 'videos', generator: createEntityAdapterStoreAssets<DataType> },
]);
```

**Base:** `set`, `loading`, `error`, `clear`, `effects.set` + selectors `select`, `selectLoading`, `selectError`, `selectErrorMessage`.

**Entity:** adds `add`, `update`, `delete`, effect triggers + `selectAll`.

Second generic on assets types effect payload shapes.

## handleEffect

```typescript
createEffect(() =>
  this.actions$.pipe(
    handleEffect<User[]>(actions.users, 'set', this.userService.fetchUsers),
  ),
);
```

## dispatchDataToStore

Auto loading/error around HTTP:

```typescript
return dispatchDataToStore(actions.channel, this.http.get<DataType>('…'), this.store);
```

## NgxStoreService

Extend with `super(store, selectors)` → `state` object with `$` observables per sub-slice (`isCompleted$`, `isCompletedLoading$`, …).

Methods: `selectFromStore`, `selectLoadingFromStore`, `selectErrorFromStore`, `selectErrorMessageFromStore`.
