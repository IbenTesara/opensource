import { of } from 'rxjs';

import { mapArray } from './map.operator';

describe('mapArray', () => {
	it('should map array elements', (done) => {
		of([1, 2, 3])
			.pipe(mapArray((x) => x * 2))
			.subscribe((result) => {
				expect(result).toEqual([2, 4, 6]);
				done();
			});
	});

	it('should return empty array when data is null/undefined', (done) => {
		of(null as any)
			.pipe(mapArray((x) => x))
			.subscribe((result) => {
				expect(result).toEqual([]);
				done();
			});
	});
});
