import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxHasFocusDragAndDropAbstractDirective } from './has-focus.directive';

@Component({
	selector: 'test-has-focus',
	template: `<button (focus)="setFocus()" (blur)="removeFocus()">Focus Button</button>`,
	standalone: true,
	changeDetection: ChangeDetectionStrategy.Eager,
})
class TestHasFocusComponent extends NgxHasFocusDragAndDropAbstractDirective {
	public override onFocus = jest.fn();
	public override onBlur = jest.fn();
}

describe('NgxHasFocusDragAndDropAbstractDirective', () => {
	let fixture: ComponentFixture<TestHasFocusComponent>;
	let component: TestHasFocusComponent;
	let buttonEl: HTMLButtonElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestHasFocusComponent],
		});
		fixture = TestBed.createComponent(TestHasFocusComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		buttonEl = fixture.nativeElement.querySelector('button');
	});

	it('should update focus state and invoke callbacks on focus/blur events', () => {
		buttonEl.dispatchEvent(new Event('focus'));
		expect((component as any).hasFocus).toBe(true);
		expect(component.onFocus).toHaveBeenCalled();

		const actionSpy = jest.fn();
		component.handleWhenFocussed(actionSpy);
		expect(actionSpy).toHaveBeenCalled();

		buttonEl.dispatchEvent(new Event('blur'));
		expect((component as any).hasFocus).toBe(false);
		expect(component.onBlur).toHaveBeenCalled();
	});
});
