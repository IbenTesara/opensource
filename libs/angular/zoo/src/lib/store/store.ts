import {
	createNgxSignalStore,
	createNgxSignalStoreArraySlice,
	createNgxSignalStoreSlice,
	NgxSignalStoreSlice,
	NgxSignalStoreState,
} from '@ibenvandeveire/ngx-store';

import { NgxContentPage, NgxZoo, NgxZooAnimal, NgxZooSection } from '../types';

export interface NgxZooState extends NgxSignalStoreState {
	zoos: NgxSignalStoreSlice<NgxZoo>;
	animals: NgxSignalStoreSlice<NgxZooAnimal[]>;
	sections: NgxSignalStoreSlice<NgxZooSection[]>;
	content: NgxSignalStoreSlice<NgxContentPage[]>;
}

export const NgxZooStore = createNgxSignalStore<NgxZooState>({
	zoos: {
		generator: createNgxSignalStoreSlice<NgxZoo>,
	},
	animals: {
		generator: createNgxSignalStoreArraySlice<NgxZooAnimal[]>,
	},
	sections: {
		generator: createNgxSignalStoreArraySlice<NgxZooSection[]>,
	},
	content: {
		generator: createNgxSignalStoreArraySlice<NgxContentPage[]>,
	},
});
