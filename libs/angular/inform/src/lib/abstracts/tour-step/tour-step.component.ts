import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  signal,
  WritableSignal,
  inject,
  input,
  OutputEmitterRef,
  output,
  viewChild
} from '@angular/core';
import { v4 as uuid } from 'uuid';

import { NgxTourService } from '../../services';
import { NgxTourInteraction, NgxTourStepPosition } from '../../types';

/**
 * An abstract class that defines the minimum properties needed for the step component to be rendered
 */
@Directive({
	host: {
		role: 'dialog',
		'[attr.aria-modal]': 'true',
		'[attr.aria-labelledby]': 'titleId()',
	},
})
export abstract class NgxTourStepComponent<DataType = any> implements OnInit, AfterViewInit {
	private readonly tourService = inject(NgxTourService);

	/**
	 * Close the tour on escape pressed
	 */
	@HostListener('document:keydown.escape') public onEscape() {
		this.tourService.closeTour().subscribe();
	}

	/**
	 * The ngx-tour-step class of the component
	 */
	@HostBinding('class') protected rootClass: string;

	/**
	 * The id of the element that the tour-step describes
	 */
	/**
	 * The id of the element that the tour-step describes
	 */
	@HostBinding('attr.aria-details')
	public readonly elementId = input.required<string>();

	/**
	 * The element of the tour-step that is seen as the title
	 */
	public readonly titleElement = viewChild<ElementRef<HTMLElement>>('stepTitle');

	/**
	 * The position of the step
	 */
	public readonly position = input.required<NgxTourStepPosition | undefined>();

	/**
	 * The title of the step
	 */
	public readonly title = input.required<string>();

	/**
	 * The content of the step
	 */
	public readonly content = input.required<string>();

	/**
	 * The index of the step
	 */
	public readonly currentStep = input.required<number>();

	/**
	 * The total amount of steps
	 */
	public readonly amountOfSteps = input.required<number>();

	/**
	 * Optional data we wish to use in a step
	 */
	public readonly data = input<DataType>();

	/**
	 * A custom step class we can set
	 */
	public readonly stepClass = input<string>();

	/**
	 * Emits the possible interactions with a step
	 */
	public handleInteraction: OutputEmitterRef<NgxTourInteraction> = output<NgxTourInteraction>();

	/**
	 * The aria-labelledby id of the title element
	 */
	public titleId: WritableSignal<string> = signal('');

	public ngOnInit(): void {
		// Iben: We set the correct host class. As this step is rendered and not changed afterwards, we do not have to adjust this in the onChanges
		const position = this.position();
		const positionClass = position ? `ngx-tour-step-position-${position}` : '';
		this.rootClass = `ngx-tour-step ${positionClass} ${this.stepClass() || ''}`;
	}

	public ngAfterViewInit(): void {
		// Iben: If no title element was found, we throw an error
		const titleElement = this.titleElement();
  if (!titleElement) {
			console.error(
				'NgxTourService: The tour step component does not have an element marked with `stepTitle`. Because of that, the necessary accessibility attributes could not be set. Please add the `stepTitle` tag to the element that represents the title of the step.'
			);

			return;
		}

		// Iben: Connect the aria-labbledby tag to the title element
		let id = titleElement.nativeElement.getAttribute('id');

		// Iben: If the title element does not have an id, we generate one
		if (!id) {
			id = uuid();
			titleElement.nativeElement.setAttribute('id', id);
		}

		// Iben: To prevent issues with changeDetection, we use a signal here to update the id
		this.titleId.set(id);
	}
}
