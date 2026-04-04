import { Directive, inject, input, InputSignal } from '@angular/core';

import { NgxZooService } from '../../services';

@Directive()
export abstract class NgxAnimalPageAbstractComponent {
	/**
	 * An instance of the zoo service
	 */
	protected readonly zooService: NgxZooService = inject(NgxZooService);

	/**
	 * The id of the animal to display
	 */
	public readonly id: InputSignal<string> = input.required();
}
