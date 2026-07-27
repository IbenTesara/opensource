import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxButtonDirective } from './button.directive';

@Component({
	template: `
		<button
			ngxButton
			[loading]="isLoading"
			[buttonType]="type"
			[priority]="priority"
			[display]="display"
			[icon]="iconName"
			[iconPosition]="iconPos"
			[attr.aria-label]="ariaLabel"
		>
			Click Me
		</button>
	`,
	imports: [NgxButtonDirective],
	changeDetection: ChangeDetectionStrategy.Eager,
})
class TestHostComponent {
	public isLoading = false;
	public type = 'regular';
	public priority = 'primary';
	public display = 'both';
	public iconName: string | undefined = undefined;
	public iconPos = 'left';
	public ariaLabel: string | undefined = undefined;
}

describe('NgxButtonDirective', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let buttonEl: HTMLButtonElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestHostComponent, NgxButtonDirective],
		});
		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();
		buttonEl = fixture.nativeElement.querySelector('button');
	});

	it('should wrap inner button text in label element', () => {
		const labelSpan = buttonEl.querySelector('.ngx-button-label');
		expect(labelSpan).not.toBeNull();
		expect(labelSpan.textContent).toContain('Click Me');
	});

	it('should set appropriate CSS classes based on inputs', () => {
		expect(buttonEl.className).toContain('ngx-button');
		expect(buttonEl.className).toContain('ngx-button-regular');
		expect(buttonEl.className).toContain('ngx-button-primary');
		expect(buttonEl.className).toContain('ngx-button-fit');
	});

	it('should bind loading attributes when loading is true', () => {
		expect(buttonEl.getAttribute('aria-busy')).toBeNull();
		expect(buttonEl.getAttribute('aria-disabled')).toBeNull();
		expect(buttonEl.getAttribute('disabled')).toBeNull();

		fixture.componentInstance.isLoading = true;
		fixture.detectChanges();

		expect(buttonEl.getAttribute('aria-busy')).toBe('true');
		expect(buttonEl.getAttribute('aria-disabled')).toBe('true');
		expect(buttonEl.getAttribute('disabled')).toBe('true');
		expect(buttonEl.className).toContain('ngx-button-loading');
	});

	it('should insert icon element when icon input is provided', () => {
		fixture.componentInstance.iconName = 'icon-check';
		fixture.detectChanges();

		const iconEl = buttonEl.querySelector('i.ngx-button-icon');
		expect(iconEl).not.toBeNull();
		expect(iconEl.className).toContain('icon-check');
		expect(iconEl.getAttribute('aria-hidden')).toBe('true');
	});

	it('should log an error if used in icon-only mode without accessible label', () => {
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

		fixture.componentInstance.display = 'icon';
		fixture.detectChanges();

		expect(consoleSpy).toHaveBeenCalledWith(
			expect.stringContaining('NgxLayout: NgxButtonDirective is used in icon-only mode')
		);

		consoleSpy.mockRestore();
	});
});
