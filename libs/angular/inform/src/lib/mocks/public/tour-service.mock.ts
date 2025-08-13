import { BehaviorSubject } from 'rxjs';

import { NgxTourService } from '../../services';
import { NgxTourStep } from '../../types';

/**
 * Provides a mock service of the NgxTourService in TestBed setups
 *
 * @param testFunction - The test function, for instance jest.fn()
 */
export const NgxTourServiceMock = (testFunction: Function) => {
	return {
		provide: NgxTourService,
		useValue: {
			currentTour$: new BehaviorSubject<NgxTourStep[]>([]),
			currentStep$: new BehaviorSubject<NgxTourStep>(undefined),
			currentIndex$: new BehaviorSubject<number>(undefined),
			tourEnded$: new BehaviorSubject<boolean>(undefined),
			tourStarted$: new BehaviorSubject<boolean>(undefined),
			tourActive$: new BehaviorSubject<boolean>(undefined),
			startTour: testFunction,
			registerElement: testFunction,
			unregisterElement: testFunction,
			closeTour: testFunction,
		},
	};
};
