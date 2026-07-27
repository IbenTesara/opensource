import { elementIsVisibleInViewport } from './element-visible-in-viewport.util';

describe('elementIsVisibleInViewport', () => {
	it('should return isVisible: true when no element is provided', () => {
		const result = elementIsVisibleInViewport(null as any, 10);
		expect(result).toEqual({ isVisible: true, scrollY: undefined, relativeTo: 'top' });
	});

	it('should calculate correct visibility and position for an element in viewport', () => {
		const dummyElement = document.createElement('div');
		jest.spyOn(dummyElement, 'getBoundingClientRect').mockReturnValue({
			top: 100,
			bottom: 200,
			height: 100,
			left: 0,
			right: 100,
			width: 100,
			x: 0,
			y: 100,
			toJSON: () => {},
		});

		Object.defineProperty(window, 'innerHeight', {
			writable: true,
			configurable: true,
			value: 800,
		});
		Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 50 });

		const result = elementIsVisibleInViewport(dummyElement, 10, { top: 5, bottom: 5 });

		expect(result.isVisible).toBe(true);
		expect(result.relativeTo).toBe('top');
		expect(result.scrollY).toBe(45); // 50 - 5
	});

	it('should return isVisible: false with top position calculation when element is above/near top', () => {
		const dummyElement = document.createElement('div');
		jest.spyOn(dummyElement, 'getBoundingClientRect').mockReturnValue({
			top: -50,
			bottom: 50,
			height: 100,
			left: 0,
			right: 100,
			width: 100,
			x: 0,
			y: -50,
			toJSON: () => {},
		});

		Object.defineProperty(window, 'innerHeight', {
			writable: true,
			configurable: true,
			value: 800,
		});

		const result = elementIsVisibleInViewport(dummyElement, 10);

		expect(result.isVisible).toBe(false);
		expect(result.relativeTo).toBe('top');
		expect(result.scrollY).toBe(-60); // -50 - 10
	});
});
