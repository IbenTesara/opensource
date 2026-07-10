import {
	AfterViewInit,
	Directive,
	ElementRef,
	HostListener,
	OutputEmitterRef,
	inject,
	input,
	output,
} from '@angular/core';

/**
 * A directive that replaces the default click handler, enabling interactive components to respond to mouse clicks,
 * Enter keypress, and Space keypress events (with default scroll prevention). This directive is not to be added to elements that are already clickable.
 *
 * ## Accessibility Guidelines
 * - **Accessible Names**: Since this directive dynamically applies `role="button"` and `tabindex="0"`, developers must ensure that the host element has a clear accessible name (via text content, `aria-label`, or `aria-labelledby`) so that screen readers can announce it correctly.
 */
@Directive({
	selector: '[focusClick]',
	standalone: true,
	host: {
		role: 'button',
		'[attr.tabindex]': 'disabled() ? -1 : 0',
		'[attr.aria-disabled]': 'disabled()',
	},
})
export class FocusClickDirective implements AfterViewInit {
	/**
	 * An instance of the ElementRef
	 */
	protected readonly elementRef = inject(ElementRef);

	/**
	 * Disabled property for the element
	 */
	public readonly disabled = input<boolean>(false);

	// Allow the function passed by the host to be executed
	// when the emit() method gets called
	/**
	 * This directive replaces the default `click` directive and allows the user to execute
	 * the `click` event by clicking the mouse **and** by using the `enter` or `space` keys on focus.
	 *
	 * A tabindex of `0` is added, which turns to `-1` when disabled.
	 *
	 * @memberof FocusClickDirective
	 */
	public readonly focusClick: OutputEmitterRef<void | Event> = output<void | Event>();

	// Add eventhandler to the click event
	@HostListener('click', ['$event'])
	public isClicked(event: Event): void {
		if (!this.disabled()) {
			this.focusClick.emit(event);
		}
	}

	// Add eventhandler to keydown event When enter is pressed and the event
	// isn't blocked, execute the click function of the host
	@HostListener('keydown.enter')
	public isEntered(): void {
		if (!this.disabled()) {
			this.focusClick.emit();
		}
	}

	// Add eventhandler to keydown event When space is pressed, prevent page scrolling and
	// execute the click function of the host
	@HostListener('keydown.space', ['$event'])
	public isSpaced(event: Event): void {
		if (!this.disabled()) {
			event.preventDefault();
			this.focusClick.emit();
		}
	}

	public ngAfterViewInit(): void {
		// Iben: Verify that the element has an accessible name for screen readers
		const nativeElement = this.elementRef.nativeElement;
		const hasAriaLabel =
			nativeElement.hasAttribute('aria-label') ||
			nativeElement.hasAttribute('aria-labelledby') ||
			nativeElement.textContent?.trim().length > 0;

		if (!hasAriaLabel) {
			console.error(
				'NgxUtils: FocusClickDirective is applied but no accessible name (inner text, aria-label, or aria-labelledby) was found on the element. Screen readers will not be able to announce this button correctly.'
			);
		}
	}
}
