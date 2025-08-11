import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';

import { NgxToastService } from '../../services';
import { NgxToastConfigurationToken } from '../../tokens';
import { NgxToast, NgxToastDefaultConfiguration } from '../../types';

@Component({
	selector: 'ngx-toast-container',
	templateUrl: './toast-container.component.html',
	styleUrl: './toast-container.component.scss',
	imports: [NgComponentOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'ngx-toast-container',
	},
})
export class NgxToastContainerComponent {
	/**
	 * The default configuration required for the toast
	 */
	private readonly toastService: NgxToastService = inject(NgxToastService);

	/**
	 * The default configuration provided for the toast
	 */
	public readonly configuration: NgxToastDefaultConfiguration = inject(
		NgxToastConfigurationToken
	);

	/**
	 * A list of toasts to display
	 */
	public toasts: Signal<NgxToast[]> = this.toastService.toasts;

	public setFocus(hasFocus: boolean): void {
		this.toastService.setFocus(hasFocus);
	}
}
