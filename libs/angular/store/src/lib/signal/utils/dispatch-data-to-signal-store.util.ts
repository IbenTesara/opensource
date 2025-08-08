import { catchError, finalize, map, Observable, tap, throwError } from 'rxjs';

import { NgxSignalStore, NgxSignalStoreDispatchActions } from '../types';

/**
 * Dispatches data to a signal store
 *
 * @template DataType - The typing of the data
 * @param slice - The slice we wish to dispatch the data to
 * @param data - The data we wish to dispatch
 * @param store - The store we wish to dispatch the data to
 * @param action - The action we handle, by default this is `set`
 */
export const dispatchDataToSignalStore = <DataType>(
	slice: string,
	data: Observable<DataType>,
	store: NgxSignalStore,
	action: NgxSignalStoreDispatchActions = 'set'
): Observable<void> => {
	// Iben: Set the loading to true and the error to false
	store[slice].setLoading(true);
	store[slice].setError(false);

	// Iben: Respond to the data
	return data.pipe(
		// Iben: Push the result to the store
		tap((result) => {
			store[slice][action as string](result);
		}),
		// Iben: In case there's an error, set the error and throw it
		catchError((error) => {
			store[slice].setError(true);

			return throwError(() => error);
		}),
		// Iben: Map to undefined so no data from the observable leaks to the
		map(() => undefined),
		// Iben: Set the loading back to false regardless of success
		finalize(() => {
			store[slice].setLoading(false);
		})
	);
};
