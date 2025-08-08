import { Inject, Injectable } from '@angular/core';

import {
	NgxSignalStore,
	NgxSignalStoreRecord,
	NgxSignalStoreState,
	NgxSignalStoreViewState,
} from '../types';
import { injectNxSignalStore } from '../utils';

/**
 * An abstract service that can be used to store handle a NgxSignalStore
 */
@Injectable()
export abstract class NgxSignalStoreService<StoreState extends NgxSignalStoreState> {
	/**
	 * The store we preserve the state in
	 */
	protected store: NgxSignalStore<StoreState>;

	// eslint-disable-next-line @angular-eslint/prefer-inject
	constructor(@Inject('store') createdStore: NgxSignalStoreRecord<StoreState>) {
		// Iben: Inject the created store
		this.store = injectNxSignalStore(createdStore);
	}

	/**
	 * Returns a read only version of the state
	 */
	public get state(): NgxSignalStoreViewState<StoreState> {
		// Iben: If no initial created store was passed to the service, we early exit
		if (!this.store) {
			console.error(
				'@ibenvandeveire/ngx-store: No created store was provided to the NgxSignalStoreService in the constructor, so no state could be generated.'
			);

			return undefined;
		}

		// Iben: Return the store
		return this.store;
	}
}
