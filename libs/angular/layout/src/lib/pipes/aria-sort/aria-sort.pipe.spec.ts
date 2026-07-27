import { NgxAriaSortPipe } from './aria-sort.pipe';

describe('NgxAriaSortPipe', () => {
	let pipe: NgxAriaSortPipe;

	beforeEach(() => {
		pipe = new NgxAriaSortPipe();
	});

	it('should return "none" if cell or sortDirection is undefined or null', () => {
		expect(pipe.transform({ currentSorting: null as any, cell: null as any })).toBe('none');
		expect(pipe.transform({ currentSorting: null as any, cell: {} as any })).toBe('none');
	});

	it('should transform cell sortDirection to lowercase ascending/descending string', () => {
		const cellAsc = { sortDirection: 'ASCENDING' } as any;
		const cellDesc = { sortDirection: 'DESCENDING' } as any;

		expect(pipe.transform({ currentSorting: null as any, cell: cellAsc })).toBe('ascending');
		expect(pipe.transform({ currentSorting: null as any, cell: cellDesc })).toBe('descending');
	});
});
