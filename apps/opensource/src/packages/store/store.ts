import {
	createNgxSignalStore,
	createNgxSignalStoreArraySlice,
	createNgxSignalStoreSlice,
	NgxSignalStoreSlice,
	NgxSignalStoreState,
} from '@lib/ngx-store';

export interface TestState extends NgxSignalStoreState {
	hello: NgxSignalStoreSlice<string>;
	zoos: NgxSignalStoreSlice<string[]>;
	people: NgxSignalStoreSlice<{ id: string; name: string }[]>;
	team: NgxSignalStoreSlice<{ name: string }[]>;
}

export const TestStore = createNgxSignalStore<TestState>({
	hello: {
		generator: createNgxSignalStoreSlice<string>,
	},
	zoos: {
		generator: createNgxSignalStoreArraySlice<string[]>,
		selectId: (item) => item,
	},
	people: {
		generator: createNgxSignalStoreArraySlice<{ id: string; name: string }[]>,
	},
	team: {
		generator: createNgxSignalStoreArraySlice<{ name: string }[]>,
		selectId: (person) => person.name,
	},
});
