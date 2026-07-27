import { TestBed } from '@angular/core/testing';

import { createNgxSignalStoreSlice } from './generators/create-signal-store-slice.util';
import { createNgxSignalStore, injectNgxSignalStore } from './signal-store-generator.util';

describe('signalStoreGeneratorUtil', () => {
	it('should create and inject a multi-slice NgxSignalStore', () => {
		const storeRecord = createNgxSignalStore({
			user: {
				generator: createNgxSignalStoreSlice,
				initialData: 'John Doe',
			},
			theme: {
				generator: createNgxSignalStoreSlice,
				initialData: 'dark',
			},
		});

		expect(storeRecord['user']).toBeDefined();
		expect(storeRecord['theme']).toBeDefined();

		TestBed.configureTestingModule({
			providers: [storeRecord['user'], storeRecord['theme']],
		});

		TestBed.runInInjectionContext(() => {
			const store = injectNgxSignalStore(storeRecord);

			expect(store['user'].data()).toBe('John Doe');
			expect(store['theme'].data()).toBe('dark');

			store['user'].set('Jane Doe');
			expect(store['user'].data()).toBe('Jane Doe');
		});
	});
});
