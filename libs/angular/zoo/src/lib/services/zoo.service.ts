import { inject, Injectable } from '@angular/core';
import {
	dispatchDataToSignalStore,
	injectNgxSignalStore,
	NgxSignalStore,
	NgxSignalStoreDispatchActions,
	NgxSignalStoreService,
} from '@ibenvandeveire/ngx-store';
import { Observable } from 'rxjs';

import { NgxZooProviderAbstractService } from '../abstracts';
import { NgxZooState, NgxZooStore } from '../store';
import { NgxZooProviderToken } from '../tokens';
import { NgxAnimalFilter } from '../types';

@Injectable({
	providedIn: 'root',
})
export class NgxZooService extends NgxSignalStoreService<NgxZooState> {
	protected override store: NgxSignalStore<NgxZooState> = injectNgxSignalStore(NgxZooStore);
	/**
	 * An instance of the zoo provider abstract service.
	 */
	protected readonly zooProvider: NgxZooProviderAbstractService = inject(NgxZooProviderToken);

	/**
	 * Gets the animals dispatches them to the signal store.
	 * @param action - The action to dispatch the data to the signal store, by default this is `set`.
	 */
	public getAnimals(
		action: NgxSignalStoreDispatchActions = 'set',
		filters?: NgxAnimalFilter
	): Observable<void> {
		console.log('getAnimals');
		return dispatchDataToSignalStore(
			'animals',
			this.zooProvider.getAnimals(filters),
			this.store,
			action
		);
	}

	/**
	 * Gets the sections and dispatches them to the signal store.
	 * @param action - The action to dispatch the data to the signal store, by default this is `set`.
	 */
	public getSections(action: NgxSignalStoreDispatchActions = 'set'): Observable<void> {
		return dispatchDataToSignalStore(
			'sections',
			this.zooProvider.getSections(),
			this.store,
			action
		);
	}

	/**
	 * Gets the content and dispatches them to the signal store.
	 * @param action - The action to dispatch the data to the signal store, by default this is `set`.
	 */
	public getContent(action: NgxSignalStoreDispatchActions = 'set'): Observable<void> {
		return dispatchDataToSignalStore(
			'content',
			this.zooProvider.getContent(),
			this.store,
			action
		);
	}
}
