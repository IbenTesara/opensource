import { computed, Directive, inject, Signal } from '@angular/core';
import { Router } from '@angular/router';

import { NgxZooService } from '../../services';
import { NgxZooSection } from '../../types';

@Directive()
export abstract class NgxSectionAbstractComponent {
	/**
	 * An instance of the zoo service
	 */
	protected readonly zooService: NgxZooService = inject(NgxZooService);

	/**
	 * An instance of the router
	 */
	protected readonly router: Router = inject(Router);

	/**
	 * The content page to display
	 */
	protected readonly section: Signal<NgxZooSection> = computed(() => {
		return this.zooService.state.sections.data().find((section) => {
			return section.route === this.router.url.split('/').pop();
		});
	});
}
