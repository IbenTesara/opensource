import { NgxTooltipService } from '../../services';

/**
 * Provides a mock version of the NgxTooltipService for TestBed setups
 *
 * @param testFunction - The test function, for instance jest.fn()
 */
export const NgxTooltipServiceMock = (testFunction: Function) => {
	return {
		provide: NgxTooltipService,
		useValue: {
			showToolTip: testFunction,
			removeTooltip: testFunction,
			setToolTipEvent: testFunction,
		},
	};
};
