import { NgxTableSortDirection } from '../../enums';

import { NgxTableSortIconPipe } from './sort-icon.pipe';

describe('NgxTableSortIconPipe', () => {
	let pipe: NgxTableSortIconPipe;

	beforeEach(() => {
		pipe = new NgxTableSortIconPipe();
	});

	it('should return "&equiv;" when direction is null or falsy', () => {
		expect(pipe.transform(null)).toBe('&equiv;');
		expect(pipe.transform(undefined as any)).toBe('&equiv;');
	});

	it('should return "&uArr;" for ASCENDING and "&dArr;" for DESCENDING', () => {
		expect(pipe.transform(NgxTableSortDirection.ASCENDING)).toBe('&uArr;');
		expect(pipe.transform(NgxTableSortDirection.DESCENDING)).toBe('&dArr;');
	});
});
