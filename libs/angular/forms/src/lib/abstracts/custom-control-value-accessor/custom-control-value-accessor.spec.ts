import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FormAccessor } from '../../abstracts';

@Component({
	selector: 'test-cva',
	template: ``,
	standalone: true,
	changeDetection: ChangeDetectionStrategy.Eager,
	imports: [ReactiveFormsModule],
})
class TestCvaComponent extends FormAccessor<any, FormGroup> {
	initForm() {
		return new FormGroup({
			name: new FormControl(''),
		});
	}
}

describe('NgxFormsControlValueAccessor', () => {
	let fixture: ComponentFixture<TestCvaComponent>;
	let component: TestCvaComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestCvaComponent, ReactiveFormsModule],
		});
		fixture = TestBed.createComponent(TestCvaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should write value and validate inner form state', () => {
		expect(component.validate()).toBeNull();

		component.form.controls['name'].setErrors({ required: true });
		expect(component.validate()).toEqual({ invalidForm: true });
	});
});
