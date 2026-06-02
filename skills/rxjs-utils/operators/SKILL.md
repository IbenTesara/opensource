---
name: rxjs-utils-operators
description: >-
  RxJS operators from @ibenvandeveire/rxjs-utils: populate, pluck, pluckOr,
  fetchIf, combineBooleans. Use when enriching streams or conditional fetches.
---

# rxjs-utils — Operators

## populate

Fills missing keys on emitted objects from a record of observables (optional matcher per key).

```typescript
of({ hello: 'world' }).pipe(
  populate({
    world: () => of('hello'),
    'foo.bar': (data) => of(data.hello),
  }),
);
// → { hello: 'world', world: 'hello', foo: { bar: 'world' } }
```

## pluckOr

Emit first defined property among keys: `pluckOr('name', 'firstName')`.

## pluck

Emit single property: `pluck('name')`.

## fetchIf

If `search(sourceValue)` returns a value, emit it; else run `fetch` and emit result. Common for “load from API if not in state”.

```typescript
fetchIf(
  of([{ id: 'hello' }]),
  (data) => data.find((item) => item.id === 'world'),
  () => of({ id: 'world' }),
);
```

## combineBooleans

AND-combines `Observable<boolean>[]` → single `Observable<boolean>`.
