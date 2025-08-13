import { signal, Type } from '@angular/core';

import { NgxToastBundlerComponent } from '../../abstracts';
import { NgxToastService } from '../../services';
import { NgxToast } from '../../types';

/**
 * Provides a mock version of the NgxToastService for TestBed setups
 *
 * @param testFunction - The test function, for instance jest.fn()
 */
export const NgxToastServiceMock = (
	testFunction: Function,
	bundledComponent?: Type<NgxToastBundlerComponent>
) => {
	return {
		provide: NgxToastService,
		useValue: {
			toasts: signal<NgxToast[]>([]),
			hasBundledToasts: signal<number>(undefined),
			bundledComponent: bundledComponent,
			showToast: testFunction,
			removeToast: testFunction,
			setFocus: testFunction,
			markAsRendered: testFunction,
			showBundled: testFunction,
		},
	};
};
