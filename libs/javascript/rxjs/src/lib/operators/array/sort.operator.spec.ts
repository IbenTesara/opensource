import { of } from 'rxjs';

import { sortArray } from './sort.operator';

describe('sortArray', () => {
	it('should sort array elements', (done) => {
		of([3, 1, 2])
			.pipe(sortArray((a, b) => a - b))
			.subscribe((result) => {
				expect(result).toEqual([1, 2, 3]);
				done();
			});
	});

	it('should return empty array when data is null/undefined', (done) => {
		of(null as any)
			.pipe(sortArray())
			.subscribe((result) => {
				expect(result).toEqual([]);
				done();
			});
	});
});
