import { Directive, HostListener, OutputEmitterRef, input, output } from '@angular/core';

@Directive({
	selector: '[focusClick]',
	standalone: true,
	host: {
		'[attr.tabIndex]': '0',
	},
})
export class FocusClickDirective {
	// Allow the button to ignore click events when set to true
	public readonly disabled = input<boolean>(false);

	// Allow the function passed by the host to be executed
	// when the emit() method gets called
	/**
	 * This directive replaces the default `click` directive and allows the user to execute
	 * the `click` event by clicking the mouse **and**  by using the `enter` key on focus.
	 *
	 * A tabindex of `0` gets added to the host.
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
}
