import { computed, Directive, inject, input, InputSignal, Signal } from '@angular/core';

import { NgxZooService } from '../../services';
import { NgxZooAnimal } from '../../types';

@Directive()
export abstract class NgxAnimalAbstractComponent {
	/**
	 * An instance of the zoo service
	 */
	protected readonly zooService: NgxZooService = inject(NgxZooService);

	/**
	 * The animal to display
	 */
	public readonly id: InputSignal<string> = input.required();

	/**
	 * The display mode of the animal component, by default this is `full`.
	 */
	public readonly display: InputSignal<'full' | 'short'> = input('full');

	/**
	 * The animal to display
	 */
	protected readonly animal: Signal<NgxZooAnimal> = computed(() => {
		return this.zooService.state.animals.data().find((animal) => {
			return animal.id === this.id();
		});
	});
}
