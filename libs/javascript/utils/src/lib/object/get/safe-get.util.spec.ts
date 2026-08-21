import { safeGet } from './safe-get.util';

describe('safeGet', () => {
	type TestType = {
		name: string;
		age?: number;
		nested?: {
			active: boolean;
		};
	};

	it('should return property value when key exists on object', () => {
		const testObj: TestType = {
			name: 'Iben',
			age: 30,
			nested: { active: true },
		};

		expect(safeGet(testObj, 'name')).toBe('Iben');
		expect(safeGet(testObj, 'age')).toBe(30);
		expect(safeGet(testObj, 'nested')).toEqual({ active: true });
	});

	it('should return undefined when key does not exist on object', () => {
		const testObj = { name: 'Iben' };

		expect(safeGet(testObj, 'nonExistent' as any)).toBeUndefined();
	});

	it('should return null when value is null or undefined', () => {
		expect(safeGet(null, 'name')).toBeNull();
		expect(safeGet(undefined, 'name')).toBeNull();
	});

	it('should return null when value is not an object', () => {
		expect(safeGet('string' as any, 'length')).toBeNull();
		expect(safeGet(123 as any, 'toString')).toBeNull();
		expect(safeGet(true as any, 'valueOf')).toBeNull();
	});
});
