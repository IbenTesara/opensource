# safeGet

Safely retrieves a property value from an object by key, returning `null` if the provided value is `undefined`, `null`, or not an object.

## How to use

```typescript
import { safeGet } from '@ibenvandeveire/utils';

const user = { name: 'Iben', age: 30 };

const name = safeGet<string>(user, 'name'); // => 'Iben'
const missing = safeGet(user, 'invalid'); // => undefined
const nullValue = safeGet(null, 'name'); // => null
```
