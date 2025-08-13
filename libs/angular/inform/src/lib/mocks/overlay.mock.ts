import type { NgxTourStepComponent } from '../abstracts';

/** This mock provides an implementation to the CDK Overlay */
export const OverlayMock = (component: NgxTourStepComponent<any>, testFunction: Function): any => ({
	position: () => ({
		global: () => ({
			centerHorizontally: testFunction,
			centerVertically: testFunction,
		}),
	}),
	scrollStrategies: {
		block: testFunction,
		noop: testFunction,
	},
	create: () => ({
		attach: () => ({
			instance: component,
		}),
		dispose: testFunction,
	}),
});
