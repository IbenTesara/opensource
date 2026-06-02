---
name: ibenvandeveire-utils
description: >-
  Framework-agnostic helpers from @ibenvandeveire/utils. Use when merging
  partial objects and omitting undefined properties with the merge util.
---

# @ibenvandeveire/utils

Framework-agnostic TypeScript utilities. Install: `npm install @ibenvandeveire/utils`.

## merge

Merges defined values into a start object. Additional fields are tuples `[key, value]`; `undefined` values are **omitted**.

```typescript
import { merge } from '@ibenvandeveire/utils';

merge<Example>(
  { id: 'test' },
  ['books', books],
  ['user', user],
  ['metaData', metaData], // undefined → not in result
);
```

Use when building config/DTO objects from optional partials without spreading `undefined`.
