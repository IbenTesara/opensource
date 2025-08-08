import { inject } from '@angular/core';

import {
	NgxSignalStoreState,
	NgxSignalStoreRecord,
	NgxSignalStore,
	NgxSignalStoreConfiguration,
} from '../types';

/**
 * Returns a NgxSignalStore based on the provided configuration
 *
 * @param slices - The provided slices
 */
export const createNgxSignalStore = <StateType extends NgxSignalStoreState>(
	slices: NgxSignalStoreConfiguration<StateType>
): NgxSignalStoreRecord<StateType> => {
	return Object.keys(slices).reduce<NgxSignalStoreRecord<StateType>>((result, slice) => {
		return {
			...result,
			// Iben: To keep the typing relatively simply, we cast this generator to any
			[slice]: (slices[slice].generator as any)(
				slices[slice].initialData,
				slices[slice].selectId
			),
		};
	}, {} as NgxSignalStoreRecord<StateType>);
};

/**
 * Injects a created NgxSignalStore into the component or service
 *
 * @template StateType - The type of the store
 * @param store - The created NgxSignalStore
 */
export const injectNxSignalStore = <StateType extends NgxSignalStoreState>(
	store: NgxSignalStoreRecord<StateType>
): NgxSignalStore<StateType> => {
	return Object.keys(store).reduce((result, slice) => {
		return {
			...result,
			[slice]: inject(store[slice]),
		};
	}, {} as NgxSignalStore<StateType>);
};
