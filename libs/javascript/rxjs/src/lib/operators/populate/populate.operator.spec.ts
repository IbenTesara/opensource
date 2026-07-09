import { of } from 'rxjs';
import { getByPath, populate, setByPath } from './populate.operator';

describe('getByPath', () => {
	it('should return the value of a top-level property', () => {
		expect(getByPath({ title: 'Test' }, 'title')).toEqual('Test');
	});

	it('should return the value of a nested property', () => {
		expect(getByPath({ ads: { adsId: '1' } }, 'ads.adsId')).toEqual('1');
	});

	it('should return undefined if the path does not exist', () => {
		expect(getByPath({ title: 'Test' }, 'description')).toBeUndefined();
	});

	it('should return undefined if an intermediate segment of the path does not exist', () => {
		expect(getByPath({ title: 'Test' }, 'ads.adsId')).toBeUndefined();
	});

	it('should return undefined if the data itself is null or undefined', () => {
		expect(getByPath(null, 'title')).toBeUndefined();
		expect(getByPath(undefined, 'title')).toBeUndefined();
	});
});

describe('setByPath', () => {
	it('should set a top-level property', () => {
		const target = { title: 'Test' };

		setByPath(target, 'title', 'Updated');

		expect(target).toEqual({ title: 'Updated' });
	});

	it('should set a nested property when the intermediate object already exists', () => {
		const target = { ads: { adsId: '1' } };

		setByPath(target, 'ads.items', ['1']);

		expect(target).toEqual({ ads: { adsId: '1', items: ['1'] } });
	});

	it('should create intermediate objects when they do not exist yet', () => {
		const target: Record<string, unknown> = {};

		setByPath(target, 'hello.world', 'value');

		expect(target).toEqual({ hello: { world: 'value' } });
	});

	it('should overwrite a non-object intermediate value when setting a deeper path', () => {
		const target: Record<string, unknown> = { ads: 'not-an-object' };

		setByPath(target, 'ads.items', ['1']);

		expect(target).toEqual({ ads: { items: ['1'] } });
	});

	it('should mutate the provided target in place', () => {
		const target: Record<string, unknown> = {};

		const result = setByPath(target, 'title', 'Test');

		expect(result).toBeUndefined();
		expect(target).toEqual({ title: 'Test' });
	});
});

describe('populate', () => {
	describe('Default populateIf', () => {
		const page = of({
			title: 'Test',
			description: 'Test',
			ads: {
				adsId: '1',
			},
			linkId: '1',
		});

		const populateRecord = {
			'ads.items': (data: any) => of([data.ads.adsId]),
			link: () => of({ url: 'youtube.com/@Iben' }),
		};
		it('should correctly populate the missing keys', async () => {
			page.pipe(populate(populateRecord)).subscribe((result) => {
				expect(result).toEqual({
					title: 'Test',
					description: 'Test',
					link: { url: 'youtube.com/@Iben' },
					linkId: '1',
					ads: {
						adsId: '1',
						items: ['1'],
					},
				});
			});
		});
	});

	describe('Default populateIf', () => {
		const page = of({
			title: 'Test',
			description: 'Test',
			ads: '1',
			link: '1',
		});
		const populateRecord = {
			ads: (data: any) => of([data.ads]),
			link: () => of({ url: 'youtube.com/@Iben' }),
			'hello.world': () => {
				return of('');
			},
		};

		it('should correctly populate the missing keys', async () => {
			page.pipe(populate(populateRecord, (value) => typeof value === 'string')).subscribe(
				(result) => {
					expect(result).toEqual({
						title: 'Test',
						description: 'Test',
						link: { url: 'youtube.com/@Iben' },
						ads: ['1'],
					});
				}
			);
		});
	});

	describe('Default populateIf', () => {
		const page = of({
			title: 'Test',
			description: 'Test',
			ads: '1',
			link: '1',
		});
		const populateRecord = {
			'hello.world': () => {
				console.log('I AM RUNNING');
				return of('');
			},
		};

		it('should correctly populate the missing keys', async () => {
			page.pipe(populate(populateRecord, (value) => typeof value === 'string')).subscribe(
				(result) => {
					expect(result).toEqual({
						title: 'Test',
						description: 'Test',
						link: '1',
						ads: '1',
					});
				}
			);
		});
	});
});
