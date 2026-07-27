import { FormControl, FormGroup } from '@angular/forms';

import { NgxValidators } from './validators';

describe('NgxValidators', () => {
	it('should expose decimalsAfterComma validator', () => {
		const validator = NgxValidators.decimalsAfterComma(2);
		const control = new FormControl('12.345');
		expect(validator(control)).toEqual({
			invalidDecimalsAfterComma: true,
		});
	});

	it('should expose allOrNothingRequired validator', () => {
		const group = new FormGroup({
			first: new FormControl('value'),
			second: new FormControl(''),
		});

		const result = NgxValidators.allOrNothingRequired(group);
		expect(result).toEqual({ allOrNothingRequiredError: ['second'] });
	});
});
