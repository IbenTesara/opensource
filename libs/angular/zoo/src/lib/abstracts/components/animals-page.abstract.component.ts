import { computed, Directive, inject, Signal } from '@angular/core';

import { NgxZooService } from '../../services';
import { NgxContentPage, NgxZooAnimal } from '../../types';

@Directive()
export abstract class NgxAnimalsPageAbstractComponent {
	/**
	 * An instance of the zoo service
	 */
	protected readonly zooService: NgxZooService = inject(NgxZooService);

	/**
	 * The animals to display
	 */
	protected readonly animals: Signal<NgxZooAnimal[]> = this.zooService.state.animals.data;

	/**
	 * The content page to display
	 */
	protected readonly contentPage: Signal<NgxContentPage> = computed(() =>
		this.zooService.state.content.data().find((content) => content.route === 'animals')
	);
}
