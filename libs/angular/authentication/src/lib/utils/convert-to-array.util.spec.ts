import { convertToArray } from './convert-to-array.util';

describe('convertToArray', () => {
	it('should wrap single item in an array', () => {
		expect(convertToArray('ITEM')).toEqual(['ITEM']);
	});

	it('should return array as-is if already an array', () => {
		expect(convertToArray(['ITEM_1', 'ITEM_2'])).toEqual(['ITEM_1', 'ITEM_2']);
	});
});
