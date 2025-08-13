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
import { NgxWindowService } from '@ibenvandeveire/ngx-core';

import { NgxModalActionType } from '../../types';

/**
 * An abstract for the NgxModalService
 */
@Directive()
export class NgxModalAbstractComponent<ActionType extends NgxModalActionType, DataType = any>
	implements AfterViewInit
{
	private readonly windowService = inject(NgxWindowService);
	private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	/**
	 * Remove the modal on escape pressed
	 */
	@HostListener('document:keydown.escape') public onEscape() {
		this.close.emit();
	}

	/**
	 * An optional aria-labelledby property
	 */
	public readonly ariaLabelledBy = input<string>();

	/**
	 * An optional aria-describedBy property
	 */
	public readonly ariaDescribedBy = input<string>();

	/**
	 * Optional data that can be passed to the modal
	 */
	public readonly data = input<DataType>();

	/**
	 * An emitter that will emit an action we can later respond to
	 */
	public action: OutputEmitterRef<ActionType> = output<ActionType>();

	/**
	 * An emitter that will emit if the modal is closed
	 */
	// eslint-disable-next-line @angular-eslint/no-output-native
	public close: OutputEmitterRef<void> = output<void>();

	public ngAfterViewInit(): void {
		// Iben: If we are in the browser, check if either of the two accessibility labels are set
		const ariaLabelledBy = this.ariaLabelledBy();
		const ariaDescribedBy = this.ariaDescribedBy();
		if (this.windowService.isBrowser() && (ariaLabelledBy || ariaDescribedBy)) {
			// Iben: Find the element with the id and the parent
			const element = document.getElementById(ariaLabelledBy || ariaDescribedBy);
			const parent = this.elementRef.nativeElement;

			// Iben: If no corresponding element was found or if it isn't part of the modal, throw an error
			if (!element || !parent.contains(element)) {
				console.error(
					`@ibenvandeveire/ngx-inform - NgxModalAbstractComponent: The ${
						ariaLabelledBy ? '"aria-labelledBy"' : 'aria-describedBy'
					} property was passed to the modal but no element with said id was found. Because of that, the necessary accessibility attributes could not be set. Please add an id with the value "${
						ariaLabelledBy || ariaDescribedBy
					}" to an element of the modal.`
				);
			}
		}
	}
}
