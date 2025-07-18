import { IsNotEmptyPipe } from './is-not-empty.pipe';

describe('IsNotEmptyPipe', () => {
	describe('transform', () => {
		it('should return false when the given value is null', () => {
			const pipe = new IsNotEmptyPipe();

			expect(pipe.transform(null)).toBeFalsy();
		});

		it(
            'should return false when the given value is not an object or array',
            () => {
                const pipe = new IsNotEmptyPipe();

                expect(pipe.transform(1)).toBeFalsy();
                expect(pipe.transform(true)).toBeFalsy();
                expect(pipe.transform('text')).toBeFalsy();
            }
        );

		it('should return false when the given value is an empty array', () => {
			const pipe = new IsNotEmptyPipe();

			expect(pipe.transform([])).toBeFalsy();
		});

		it('should return true when the given value is an array with values', () => {
			const pipe = new IsNotEmptyPipe();

			expect(pipe.transform(['value'])).toBeTruthy();
		});

		it('should return false when the given value is an empty object', () => {
			const pipe = new IsNotEmptyPipe();

			expect(pipe.transform({})).toBeFalsy();
		});

		it(
            'should return true when the given value is an object with properties',
            () => {
                const pipe = new IsNotEmptyPipe();

                expect(
                    pipe.transform({
                        hasValue: true,
                    })
                ).toBeTruthy();
            }
        );

		it(
            'should return false when checkProps is provided and the given object is missing values for these props',
            () => {
                const pipe = new IsNotEmptyPipe();

                expect(
                    pipe.transform(
                        {
                            test1: true,
                            test2: false,
                        },
                        ['test1', 'test2', 'test3']
                    )
                ).toBeFalsy();
            }
        );

		it(
            'should return true when checkProps is provided and the given object contains values for all these props',
            () => {
                const pipe = new IsNotEmptyPipe();

                expect(
                    pipe.transform(
                        {
                            test1: true,
                            test2: false,
                            test3: 'something',
                        },
                        ['test1', 'test2', 'test3']
                    )
                ).toBeTruthy();
            }
        );
	});
});
