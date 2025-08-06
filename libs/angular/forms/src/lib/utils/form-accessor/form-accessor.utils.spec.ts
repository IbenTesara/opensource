import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { handleFormAccessorControlDisabling } from './form-accessor.utils';

describe('handleFormAccessorControlDisabling', () => {
	describe('FormControl', () => {
		let control: FormControl;

		beforeEach(() => {
			control = new FormControl();
		});

		it(
            'should disable the formControl when the self property is passed along',
            () => {
                handleFormAccessorControlDisabling(control, new Set(['formAccessorSelf']), true);

                expect(control.disabled).toBeTruthy();
            }
        );

		it('should enable the formControl when no key is passed along', () => {
			handleFormAccessorControlDisabling(control, new Set([]), true);

			expect(control.disabled).toBeFalsy();
		});
	});

	describe('FormArray', () => {
		let control: FormArray;

		beforeEach(() => {
			control = new FormArray([]);
		});

		it(
            'should disable the formArray when the self property is passed along',
            () => {
                handleFormAccessorControlDisabling(control, new Set(['formAccessorSelf']), true);

                expect(control.disabled).toBeTruthy();
            }
        );

		it('should enable the formArray when no key is passed along', () => {
			handleFormAccessorControlDisabling(control, new Set([]), true);

			expect(control.disabled).toBeFalsy();
		});
	});
	describe('FormGroup', () => {
		let control: FormGroup;

		beforeEach(() => {
			control = new FormGroup({
				moustache: new FormControl(),
				wax: new FormControl(),
			});
		});

		it(
            'should disable the formControl when the self property is passed along',
            () => {
                handleFormAccessorControlDisabling(control, new Set(['moustache']), true);

                expect(control.get('moustache').disabled).toBeTruthy();
                expect(control.get('wax').disabled).toBeFalsy();
            }
        );

		it('should enable the formControl when no key is passed along', () => {
			handleFormAccessorControlDisabling(control, new Set([]), true);

			expect(control.get('moustache').disabled).toBeFalsy();
			expect(control.get('wax').disabled).toBeFalsy();
		});
	});
});
