import { Injectable } from '@angular/core';
import { Observable, of, throwError, switchMap } from 'rxjs';

import { NgxStoreService } from '../abstracts';
import { BaseStoreAssets, EntityStoreAssets, StoreFlowAssets } from '../interfaces';
import {
	createBaseStoreAssets,
	createEntityAdapterStoreAssets,
	createStoreAssets,
	dispatchDataToStore,
} from '../utils';

interface StoreState extends StoreFlowAssets {
	data: EntityStoreAssets<string>;
	isCompleted: BaseStoreAssets<boolean>;
}

export const { actions, reducers, selectors } = createStoreAssets<StoreState>('state', [
	{
		subSlice: 'data',
		generator: createEntityAdapterStoreAssets<string>,
		selectId: (item) => item,
	},
	{
		subSlice: 'isCompleted',
		generator: createBaseStoreAssets<boolean>,
	},
]);

@Injectable()
export class StoreStateService extends NgxStoreService<StoreState> {
	constructor() {
		super(selectors);
	}

	setWithError(): Observable<never> {
		return dispatchDataToStore(
			actions.data,
			throwError(() => new Error('This is an error')),
			this.store
		).pipe(switchMap(() => throwError(() => new Error('This is an error'))));
	}

	setData(payload: string[]): Observable<string[]> {
		return dispatchDataToStore(actions.data, of(payload), this.store).pipe(
			switchMap(() => this.state.data$)
		);
	}

	setCompleted(payload: boolean): Observable<boolean> {
		return dispatchDataToStore(actions.isCompleted, of(payload), this.store).pipe(
			switchMap(() => this.state.isCompleted$)
		);
	}
}
