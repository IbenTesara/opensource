import { of } from 'rxjs';

import { sliceArray } from './slice.operator';

describe('sliceArray', () => {
	it('should slice array elements', (done) => {
		of([1, 2, 3, 4, 5])
			.pipe(sliceArray(1, 3))
			.subscribe((result) => {
				expect(result).toEqual([2, 3]);
				done();
			});
	});

	it('should return empty array when data is null/undefined', (done) => {
		of(null as any)
			.pipe(sliceArray())
			.subscribe((result) => {
				expect(result).toEqual([]);
				done();
			});
	});
});
