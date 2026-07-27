import { hideElement } from './hide-element.util';

describe('hideElement', () => {
	it('should set off-screen positioning and 1px dimensions on the provided element', () => {
		const element = document.createElement('div');

		hideElement(element);

		expect(element.style.position).toBe('absolute');
		expect(element.style.width).toBe('1px');
		expect(element.style.height).toBe('1px');
		expect(element.style.marginTop).toBe('-1px');
		expect(element.style.overflow).toBe('hidden');
	});
});
