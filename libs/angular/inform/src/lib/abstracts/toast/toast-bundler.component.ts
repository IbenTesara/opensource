import { Directive, inject, input, InputSignal } from '@angular/core';

import { NgxToastService } from '../../services';

@Directive({
	host: {
		'attr.role': 'alert',
	},
})
export abstract class NgxToastBundlerComponent {
	private readonly toastService: NgxToastService = inject(NgxToastService);

	/**
	 * The amount of toasts that are left and currently not shown
	 */
	public readonly amount: InputSignal<number> = input.required();

	/**
	 * Shows all the toasts that were bundled
	 */
	public showBundled(): void {
		this.toastService.showBundled();
	}
}
