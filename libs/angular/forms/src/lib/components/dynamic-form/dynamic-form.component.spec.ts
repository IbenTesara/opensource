import { Component, forwardRef, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NgxDynamicFormConfigurationToken } from '../../tokens';

import { NgxDynamicFormComponent } from './dynamic-form.component';

@Component({
	selector: 'test-input',
	template: `<div>Input</div>`,
	standalone: true,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TestInputComponent),
			multi: true,
		},
	],
})
class TestInputComponent implements ControlValueAccessor {
	public readonly options = input<any>();
	writeValue(): void {}
	registerOnChange(): void {}
	registerOnTouched(): void {}
}

@Component({
	template: `<ngx-dynamic-form key="text"></ngx-dynamic-form>`,
	imports: [NgxDynamicFormComponent],
})
class TestHostComponent {}

describe('NgxDynamicFormComponent', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let consoleSpy: jest.SpyInstance;

	beforeEach(() => {
		consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

		TestBed.configureTestingModule({
			imports: [TestHostComponent, NgxDynamicFormComponent],
			providers: [
				{
					provide: NgxDynamicFormConfigurationToken,
					useValue: {
						text: TestInputComponent,
					},
				},
			],
		});

		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();
	});

	afterEach(() => {
		consoleSpy.mockRestore();
	});

	it('should render component based on dynamic form configuration key', () => {
		const dynamicComp = fixture.nativeElement.querySelector('ngx-dynamic-form');
		expect(dynamicComp).not.toBeNull();
	});
});
