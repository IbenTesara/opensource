import { SignalStoreFeature } from '@ngrx/signals';

import { NgxSignalStoreRecord } from '../types';

/**
 * Provides all the created signal stores to the provided spot
 *
 * @param store - The created store
 */
export const provideNgxSignalStore = (store: NgxSignalStoreRecord<any>): SignalStoreFeature[] => {
	return Object.values(store);
};
