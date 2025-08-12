import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Signal, Type } from '@angular/core';

import { NgxToastBundlerComponent } from '../../abstracts';
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

	/**
	 * Whether there are bundled toasts that aren't currently visible
	 */
	public hasBundledToasts: Signal<number> = this.toastService.hasBundledToasts;

	/**
	 * A component that will display the amount of bundled toasts
	 */
	public bundledComponent: Type<NgxToastBundlerComponent> = this.toastService.bundledComponent;

	/**
	 * Set whether the element has focus
	 *
	 * @param hasFocus
	 */
	public setFocus(hasFocus: boolean): void {
		this.toastService.setFocus(hasFocus);
	}
}
