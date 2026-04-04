import { computed, Directive, inject, Signal } from '@angular/core';
import { Router } from '@angular/router';

import { NgxZooService } from '../../services';
import { NgxContentPage } from '../../types';

@Directive()
export abstract class NgxContentPageAbstractComponent {
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
	protected readonly contentPage: Signal<NgxContentPage> = computed(() =>
		this.zooService.state.content.data().find((content) => {
			return content.route === this.router.url.split('/').pop();
		})
	);
}
