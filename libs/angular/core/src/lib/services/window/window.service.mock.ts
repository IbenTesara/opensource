import { BehaviorSubject } from 'rxjs';

/*
 * This windowMock constant return an object with a selected spy.
 * The reason why the spy is not provided by default is for this mock
 * to work on both Jest and Jasmine based test-suites.
 *
 * example:
 * NgxWindowMock(jest.fn());
 * */
export const NgxWindowMock = (spy: unknown) => ({
	addEventListener: spy,
	defaultView: {
		scrollTo: () => null,
		innerWidth: 720,
		addEventListener: spy,
	},
});

/*
 * This documentMock constant return an object with a selected spy.
 * The reason why the spy is not provided by default is for this mock
 * to work on both Jest and Jasmine based test-suites.
 *
 * example:
 * NgxDocumentMock(jest.fn());
 * */
export const NgxDocumentMock = (spy: unknown) => ({
	body: {
		classList: new Set(),
		style: {},
	},
	createElement: spy,
});

/*
 * Provide a spy for your testing framework because the windowMock requires it.
 *
 * The reason why the spy is not provided by default is for this mock
 * to work on both Jest and Jasmine based test-suites.
 *
 * example:
 * NgxWindowServiceMock(jest.fn(), 1440);
 * */
export const NgxWindowServiceMock = (spy: unknown, width: number = 1200) => {
	const window = NgxWindowMock(spy) as unknown as Window;
	const document = NgxDocumentMock(spy) as unknown as Document;
	return {
		width: new BehaviorSubject(width),
		window: NgxWindowMock(spy),
		scrollTo: () => null,
		hasDocument: () => true,
		isBrowser: () => true,
		runInBrowser: (
			callback: (data: { browserWindow: Window; browserDocument: Document }) => void
		) => callback({ browserWindow: window, browserDocument: document }),
	};
};
