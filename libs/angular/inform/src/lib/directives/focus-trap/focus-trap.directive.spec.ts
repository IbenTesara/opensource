import { InteractivityChecker } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NgxFocusTrapDirective } from './focus-trap.directive';

@Component({
	selector: 'ngx-test-focus-trap',
	template: `
		<button id="trigger">Trigger</button>
		@if (showTrap) {
			<div id="trap" ngxFocusTrap>
				<button id="inside-1">Inside 1</button>
				<button id="inside-2">Inside 2</button>
			</div>
		}
	`,
	imports: [NgxFocusTrapDirective],
})
class TestFocusTrapComponent {
	public showTrap = false;
}

describe('NgxFocusTrapDirective', () => {
	let fixture: ComponentFixture<TestFocusTrapComponent>;
	let triggerElement: HTMLButtonElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestFocusTrapComponent, NgxFocusTrapDirective],
			providers: [
				// Iben: Mock the isVisible check of InteractivityChecker by extending the real one.
				// This avoids JSDOM's 0-dimension check failures while keeping real focusability checks.
				{
					provide: InteractivityChecker,
					useFactory: (platform: Platform) => {
						const checker = new InteractivityChecker(platform);
						checker.isVisible = () => true;
						return checker;
					},
					deps: [Platform],
				},
			],
		});
		fixture = TestBed.createComponent(TestFocusTrapComponent);
		fixture.detectChanges();

		// Iben: To test focus APIs, elements must be attached to the document body
		document.body.appendChild(fixture.nativeElement);

		triggerElement = fixture.nativeElement.querySelector('#trigger');
	});

	afterEach(() => {
		// Iben: Clean up document body
		document.body.removeChild(fixture.nativeElement);
	});

	it('should capture the active element and restore focus on destroy', fakeAsync(() => {
		// Iben: Focus the triggering button
		triggerElement.focus();
		expect(document.activeElement).toBe(triggerElement);

		// Iben: Toggle the focus trap to be active
		fixture.componentInstance.showTrap = true;
		fixture.detectChanges();

		// Iben: Wait for focus initial element ready async task
		tick();
		fixture.detectChanges();

		// Iben: Verify that focus is trapped inside the first focusable element
		const inside1 = fixture.nativeElement.querySelector('#inside-1') as HTMLButtonElement;
		expect(document.activeElement).toBe(inside1);

		// Iben: Destroy the focus trap
		fixture.componentInstance.showTrap = false;
		fixture.detectChanges();

		// Iben: Wait for any async cleanup/focus change
		tick();
		fixture.detectChanges();

		// Iben: Verify that focus is successfully restored to the triggering button
		expect(document.activeElement).toBe(triggerElement);
	}));
});
