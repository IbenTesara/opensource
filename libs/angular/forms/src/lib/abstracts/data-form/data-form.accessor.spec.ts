import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Injector,
	inputBinding,
	signal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { createAccessorProviders } from '../../utils';

import { DataFormAccessor } from './data-form.accessor';

@Component({
	selector: 'kp-form-accessor',
	template: ``,
	providers: [createAccessorProviders(FormAccessorComponent)],
	imports: [ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAccessorComponent extends DataFormAccessor<string[], any, any> {
	initForm(data: string[]) {
		const result = new FormGroup({});

		data.forEach((item) => {
			result.addControl(
				item,
				new FormGroup({
					hello: new FormControl(null, [Validators.required, Validators.email]),
					world: new FormControl(null, Validators.minLength(3)),
				})
			);
		});

		return result;
	}
}

describe('FormAccessor', () => {
	let fixture: ComponentFixture<FormAccessorComponent>;
	let component: FormAccessorComponent;
	const data = signal(['test', 'hello']);

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ReactiveFormsModule, FormAccessorComponent],
			providers: [
				ChangeDetectorRef,
				Injector,
				{ provide: NgControl, useValue: { control: new FormControl() } },
			],
		});

		fixture = TestBed.createComponent(FormAccessorComponent, {
			bindings: [inputBinding('data', data)],
		});
		component = fixture.componentInstance;

		try {
			fixture.detectChanges();
		} catch {
			/* empty */
		}
	});

	it('should create the form on the provided data', () => {
		expect(component.form.get('test.world')).toBeDefined();
		expect(component.form.get('test.hello')).toBeDefined();
		expect(component.form.get('hello.world')).toBeDefined();
		expect(component.form.get('hello.hello')).toBeDefined();
	});

	it('should create a new form with new data', () => {
		data.set(['iben']);
		fixture.detectChanges();

		expect(component.form.get('iben.world')).toBeDefined();
		expect(component.form.get('iben.hello')).toBeDefined();
	});

	it('should handle null form initialization gracefully', () => {
		const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
		jest.spyOn(component, 'initForm').mockReturnValue(null);
		data.set(['null-test']);
		fixture.detectChanges();

		expect(spy).toHaveBeenCalledWith(
			'NgxForms: No form was found after initializing. Check if the initForm method returns a form.'
		);
		spy.mockRestore();
	});
});
