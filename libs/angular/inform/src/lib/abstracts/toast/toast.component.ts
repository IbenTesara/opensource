import {
	AfterViewInit,
	computed,
	Directive,
	inject,
	input,
	InputSignal,
	Signal,
} from '@angular/core';

import { NgxToastService } from '../../services';
import { NgxToast } from '../../types';

@Directive({
	host: {
		'[attr.role]': 'role()',
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

	/**
	 * The role of the toast
	 */
	public readonly role: Signal<string> = computed(() => {
		// Iben: By default the toast is an alert, which can be overwritten when needed
		return this.toast().role || 'alert';
	});

	public ngAfterViewInit(): void {
		// Iben: Mark the toast as rendered so it can auto remove itself if need be
		this.toastService.markAsRendered(this.toast());
	}

	/**
	 * Removes the toast from the DOM after the animation is played
	 */
	public close(): void {
		this.toastService.removeToast(this.toast(), true);
	}
}
