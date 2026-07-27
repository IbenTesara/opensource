import { TestBed } from '@angular/core/testing';

import {
	createNgxSignalStoreSlice,
	createNgxSignalStoreArraySlice,
} from './create-signal-store-slice.util';

describe('createNgxSignalStoreSlice', () => {
	it('should initialize state and perform slice state mutations', () => {
		const SliceStore = createNgxSignalStoreSlice<string>('initialValue');

		TestBed.configureTestingModule({
			providers: [SliceStore],
		});

		const store = TestBed.inject(SliceStore);

		expect(store.data()).toBe('initialValue');
		expect(store.loading()).toBe(false);
		expect(store.error()).toBe(false);
		expect(store.saving()).toBe(false);

		// Iben: Test set and save methods
		store.set('newValue');
		expect(store.data()).toBe('newValue');

		store.setLoading(true);
		expect(store.loading()).toBe(true);

		store.setError(true);
		expect(store.error()).toBe(true);

		store.setSaving(true);
		expect(store.saving()).toBe(true);

		// Iben: Test reset and clear
		store.reset();
		expect(store.data()).toBe('initialValue');

		store.clear();
		expect(store.data()).toBeUndefined();
	});
});

describe('createNgxSignalStoreArraySlice', () => {
	it('should handle array operations: add, prepend, update, remove', () => {
		interface Item {
			id: number;
			name: string;
		}

		const ArrayStore = createNgxSignalStoreArraySlice<Item[]>([{ id: 1, name: 'Item 1' }]);

		TestBed.configureTestingModule({
			providers: [ArrayStore],
		});

		const store = TestBed.inject(ArrayStore);

		expect(store.data().length).toBe(1);

		// Iben: Test add and prepend
		store.add({ id: 2, name: 'Item 2' });
		expect(store.data().length).toBe(2);
		expect(store.data()[1].name).toBe('Item 2');

		store.prepend({ id: 0, name: 'Item 0' });
		expect(store.data().length).toBe(3);
		expect(store.data()[0].name).toBe('Item 0');

		// Iben: Test update
		store.update({ id: 1, name: 'Updated Item 1' });
		expect(store.data()[1].name).toBe('Updated Item 1');

		// Iben: Test remove
		store.remove({ id: 0, name: 'Item 0' });
		expect(store.data().length).toBe(2);
		expect(store.data()[0].id).toBe(1);

		// Iben: Test clear
		store.clear();
		expect(store.data()).toEqual([]);
	});

	it('should support custom selectId for update and remove operations', () => {
		interface CustomItem {
			uuid: string;
			val: string;
		}

		const CustomArrayStore = createNgxSignalStoreArraySlice<CustomItem[]>(
			[{ uuid: 'a1', val: 'A' }],
			(item) => item.uuid
		);

		TestBed.configureTestingModule({
			providers: [CustomArrayStore],
		});

		const store = TestBed.inject(CustomArrayStore);

		store.update({ uuid: 'a1', val: 'Updated A' });
		expect(store.data()[0].val).toBe('Updated A');

		store.remove({ uuid: 'a1', val: 'Updated A' });
		expect(store.data().length).toBe(0);
	});
});
