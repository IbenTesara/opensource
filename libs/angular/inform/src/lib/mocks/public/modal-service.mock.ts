import { BehaviorSubject } from 'rxjs';

import { NgxModalService } from '../../services';

/**
 * Provides a mock version of the NgxModalService for TestBed setups
 *
 * @param testFunction - The test function, for instance jest.fn()
 */
export const NgxModalServiceMock = (testFunction: Function) => {
	return {
		provide: NgxModalService,
		useValue: {
			hasActiveModal$: new BehaviorSubject<boolean>(false),
			open: testFunction,
			close: testFunction,
		},
	};
};
