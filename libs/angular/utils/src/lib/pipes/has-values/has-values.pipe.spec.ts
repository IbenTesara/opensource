import { HasValuesPipe } from './has-values.pipe';

describe('HasValuesPipe', () => {
	const pipe = new HasValuesPipe();

	it('should return true if the object has values', () => {
		const test = {
			message: 'Like and subscribe!',
			url: 'youtube.com/@Iben',
		};

		expect(pipe.transform(test)).toBeTruthy();
	});

	it('should return true if the object has no values', () => {
		const test = {
			message: undefined,
		};

		expect(pipe.transform(test)).toBeFalsy();

		const testEmpty = {};

		expect(pipe.transform(testEmpty)).toBeFalsy();
	});

	it('should return false in case the provided value is not an object', () => {
		expect(pipe.transform(undefined)).toBeFalsy();
		expect(pipe.transform(null)).toBeFalsy();
		expect(pipe.transform('test' as any)).toBeFalsy();
		expect(pipe.transform(['test'] as any)).toBeFalsy();
		expect(pipe.transform(0 as any)).toBeFalsy();
	});
});
