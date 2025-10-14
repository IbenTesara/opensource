import { Subject } from 'rxjs';

/**
 * Returns a mock version of the `NgxStorageServiceMock`.
 *
 * @param testFunction - The test function we wish to use.
 */
export const NgxStorageServiceMock = (testFunction: Function) => ({
	storageEvents$: new Subject(),
	localStorage: {
		getItem: testFunction,
		getItemObservable: testFunction,
		removeItem: testFunction,
		setItem: testFunction,
		clear: testFunction,
	},
	sessionStorage: {
		getItem: testFunction,
		getItemObservable: testFunction,
		removeItem: testFunction,
		setItem: testFunction,
		clear: testFunction,
	},
});
