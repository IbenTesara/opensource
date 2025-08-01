import { ChangeDetectorRef, Component, Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormAccessor } from '../../abstracts';
import { createAccessorProviders } from '../../utils';

@Component({
	selector: 'kp-form-accessor',
	template: ``,
	providers: [createAccessorProviders(FormAccessorComponent)],
	imports: [ReactiveFormsModule],
})
export class FormAccessorComponent extends FormAccessor<any, any> {
	initForm() {
		return new FormGroup({
			hello: new FormControl(null, [Validators.required, Validators.email]),
			world: new FormControl(null, Validators.minLength(3)),
		});
	}
}

describe('FormAccessor', () => {
	let fixture: ComponentFixture<FormAccessorComponent>;
	let component: FormAccessorComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ReactiveFormsModule, FormAccessorComponent],
			providers: [ChangeDetectorRef, Injector, NgControl],
		});

		fixture = TestBed.createComponent(FormAccessorComponent);
		component = fixture.componentInstance;

		try {
			fixture.detectChanges();
		} catch {
			/* empty */
		}
	});

	it('should mark the form as touched', () => {
		component.markAsTouched();

		expect(component.form.get('hello').touched).toBeTruthy();
		expect(component.form.get('world').touched).toBeTruthy();
	});

	it('should mark the form as dirty', () => {
		component.markAsDirty();

		expect(component.form.get('hello').dirty).toBeTruthy();
		expect(component.form.get('world').dirty).toBeTruthy();
	});

	it('should mark the form as pristine', () => {
		component.markAsPristine();

		expect(component.form.get('hello').pristine).toBeTruthy();
		expect(component.form.get('world').pristine).toBeTruthy();
	});

	it('should disable the form', () => {
    //Iben: Set this as the component is not rendered
    fixture.componentRef.setInput('skipInitialSetDisable', false)
		component.setDisabledState(true);

		expect(component.form.disabled).toBeTruthy();
		expect(component.form.get('hello').disabled).toBeTruthy();
		expect(component.form.get('world').disabled).toBeTruthy();
	});

	it('should validate the form', () => {
		expect(component.validate()).toEqual({ invalidForm: true });
	});
});

@Component({
	selector: 'kp-test-form-accessor',
	template: ``,
	providers: [createAccessorProviders(FormAccessorComponent)],
	imports: [ReactiveFormsModule],
})
export class TestComponent extends FormAccessor<string, FormControl<number>, number> {
	initForm() {
		return new FormControl<number>(null);
	}

	public override onChangeMapper(value: number): string {
		return `${value}`;
	}

	public override onWriteValueMapper(value: string): number {
		return parseInt(value);
	}
}

describe('FormAccessor with mapper', () => {
	let fixture: ComponentFixture<TestComponent>;
	let component: TestComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ReactiveFormsModule, TestComponent],
			providers: [ChangeDetectorRef, Injector, NgControl],
		});

		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;

		try {
			fixture.detectChanges();
		} catch {
			/* empty */
		}
	});

	it('should map the value when written', () => {
		expect(component.onWriteValueMapper('5')).toEqual(5);
	});

	it('should map the value when changed', () => {
		expect(component.onChangeMapper(5)).toEqual('5');
	});
});
