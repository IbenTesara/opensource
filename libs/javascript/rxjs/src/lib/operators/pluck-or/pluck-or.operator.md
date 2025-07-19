# pluckOr

Selects a property from a provided Observable value if exists and emits the property. If the property does not exist, the operator will select the next provided property.

## How to use

```typescript
import { pluckOr } from '@ibenvandeveire/rxjs-utils';
import { of } from 'rxjs';

of({ name: undefined, firstName: 'Hello' })
	.pipe(pluckOr('name', 'firstName'))
	.subscribe((result) => {
		// => result: Hello
	});
```
