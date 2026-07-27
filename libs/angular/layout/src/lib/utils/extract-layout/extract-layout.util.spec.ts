import { Component } from '@angular/core';

import { extractLayout } from './extract-layout.util';

@Component({ template: '' })
class DummyComponentA {}

@Component({ template: '' })
class DummyComponentB {}

describe('extractLayout', () => {
	const queries = ['mobile', 'desktop'];

	it('should return an empty object for null items', () => {
		const layout = { navigation: null };
		const result = extractLayout(layout, undefined, queries);

		expect(result.navigation).toEqual({});
	});

	it('should apply a single component across all queries when item is a Type', () => {
		const layout = { navigation: DummyComponentA as any };
		const result = extractLayout(layout, undefined, queries);

		expect(result.navigation).toEqual({
			mobile: DummyComponentA,
			desktop: DummyComponentA,
		});
	});

	it('should fallback missing query slots to defaultLayout', () => {
		const layout = {
			header: {
				main: { mobile: DummyComponentA as any },
			},
		};
		const defaultLayout = {
			header: {
				main: DummyComponentB as any,
			},
		};

		const result = extractLayout(layout, defaultLayout, queries);

		expect(result.header.main).toEqual({
			mobile: DummyComponentA,
			desktop: DummyComponentB,
		});
	});
});
