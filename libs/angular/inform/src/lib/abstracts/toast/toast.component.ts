import { AfterViewInit, Directive, inject, input, InputSignal } from '@angular/core';

import { NgxToastService } from '../../services';
import { NgxToast } from '../../types';

@Directive({
	host: {
		'attr.role': 'alert',
	},
})
export abstract class NgxToastComponent<DataType = unknown> implements AfterViewInit {
	/**
	 * Instance of the toast service
	 */
	private readonly toastService: NgxToastService = inject(NgxToastService);

	/**
	 * The toast we wish to show
	 */
	public toast: InputSignal<NgxToast<DataType>> = input.required();

	public ngAfterViewInit(): void {
		// Iben: Mark the toast as rendered so it can auto remove itself if need be
		this.toastService.markAsRendered(this.toast());
	}

	/**
	 * Removes the toast from the DOM after the animation is played
	 */
	public close(): void {
		this.toastService.removeToast(this.toast());
	}
}
