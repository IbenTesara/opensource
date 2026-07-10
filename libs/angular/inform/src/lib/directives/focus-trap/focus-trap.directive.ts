import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { AfterViewInit, Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * A standalone directive that traps focus within the host element and restores focus to the previously active element upon destruction.
 *
 * @export
 * @class NgxFocusTrapDirective
 */
@Directive({
	selector: '[ngxFocusTrap]',
	standalone: true,
})
export class NgxFocusTrapDirective implements OnInit, AfterViewInit, OnDestroy {
	/**
	 * An instance of the ElementRef
	 */
	protected readonly elementRef = inject(ElementRef);

	/**
	 * An instance of the FocusTrapFactory
	 */
	protected readonly focusTrapFactory = inject(FocusTrapFactory);

	/**
	 * An instance of the FocusTrap
	 */
	protected focusTrap: FocusTrap;

	/**
	 * The element that had focus before the overlay was opened
	 */
	protected previouslyFocusedElement: HTMLElement | null = null;

	public ngOnInit(): void {
		// Iben: Capture the currently active element to restore focus later
		if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
			this.previouslyFocusedElement = document.activeElement;
		}
	}

	public ngAfterViewInit(): void {
		// Iben: Initialize the CDK Focus Trap and set focus to the initial element inside the container
		this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
		this.focusTrap.focusInitialElement();
	}

	public ngOnDestroy(): void {
		// Iben: Destroy the focus trap
		if (this.focusTrap) {
			this.focusTrap.destroy();
		}

		// Iben: Restore focus back to the triggering element
		if (this.previouslyFocusedElement) {
			this.previouslyFocusedElement.focus();
		}
	}
}
