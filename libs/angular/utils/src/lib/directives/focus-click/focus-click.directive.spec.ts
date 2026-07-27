import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FocusClickDirective } from './focus-click.directive';

@Component({
	template: `
		<div
			focusClick
			[disabled]="isDisabled"
			(focusClick)="onFocusClick($event)"
			aria-label="Interactive Card"
		>
			Card Content
		</div>
	`,
	imports: [FocusClickDirective],
	changeDetection: ChangeDetectionStrategy.Eager,
})
class TestHostComponent {
	public isDisabled = false;
	public onFocusClick = jest.fn();
}

describe('FocusClickDirective', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let divEl: HTMLDivElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestHostComponent, FocusClickDirective],
		});
		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();
		divEl = fixture.nativeElement.querySelector('div');
	});

	it('should add role="button" and tabindex="0" host attributes', () => {
		expect(divEl.getAttribute('role')).toBe('button');
		expect(divEl.getAttribute('tabindex')).toBe('0');
		expect(divEl.getAttribute('aria-disabled')).toBe('false');
	});

	it('should update tabindex to -1 and aria-disabled to true when disabled', () => {
		fixture.componentInstance.isDisabled = true;
		fixture.detectChanges();

		expect(divEl.getAttribute('tabindex')).toBe('-1');
		expect(divEl.getAttribute('aria-disabled')).toBe('true');
	});

	it('should emit focusClick on click, enter keydown, and space keydown', () => {
		const host = fixture.componentInstance;

		divEl.dispatchEvent(new Event('click'));
		expect(host.onFocusClick).toHaveBeenCalledTimes(1);

		divEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
		expect(host.onFocusClick).toHaveBeenCalledTimes(2);

		const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
		const preventDefaultSpy = jest.spyOn(spaceEvent, 'preventDefault');
		divEl.dispatchEvent(spaceEvent);
		expect(preventDefaultSpy).toHaveBeenCalled();
		expect(host.onFocusClick).toHaveBeenCalledTimes(3);
	});

	it('should not emit focusClick when disabled', () => {
		fixture.componentInstance.isDisabled = true;
		fixture.detectChanges();

		const host = fixture.componentInstance;

		divEl.dispatchEvent(new Event('click'));
		divEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

		expect(host.onFocusClick).not.toHaveBeenCalled();
	});

	it('should log error when element lacks accessible name', () => {
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

		@Component({
			template: `<div focusClick></div>`,
			imports: [FocusClickDirective],
		})
		class InaccessibleHostComponent {}

		const inacFixture = TestBed.createComponent(InaccessibleHostComponent);
		inacFixture.detectChanges();

		expect(consoleSpy).toHaveBeenCalledWith(
			expect.stringContaining('FocusClickDirective is applied but no accessible name')
		);

		consoleSpy.mockRestore();
	});
});
