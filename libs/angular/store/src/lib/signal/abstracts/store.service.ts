import { Injectable } from '@angular/core';

import { NgxSignalStore, NgxSignalStoreState, NgxSignalStoreViewState } from '../types';

/**
 * An abstract service that can be used to store handle a NgxSignalStore
 */
@Injectable()
export abstract class NgxSignalStoreService<StoreState extends NgxSignalStoreState> {
	/**
	 * The store we preserve the state in
	 */
	protected abstract store: NgxSignalStore<StoreState>;

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
