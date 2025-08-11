import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { v4 as uuid } from 'uuid';

import { NgxToastConfigurationToken } from '../../tokens';
import { NgxToast, NgxToastConfiguration } from '../../types/toast.types';

@Injectable({
	providedIn: 'root',
})
export class NgxToastService {
	/**
	 * The default configuration required for the toast
	 */
	private readonly configuration: NgxToastConfiguration = inject(NgxToastConfigurationToken);

	/**
	 * A writable list of all currently visible toasts
	 */
	private toastsList: WritableSignal<NgxToast[]> = signal([]);

	/**
	 * Whether the list of all toasts is focussed upon, either by focus or by hover
	 */
	private isFocussed: boolean = false;

	/**
	 * A list of all the currently visible toasts
	 */
	public toasts: Signal<NgxToast[]> = this.toastsList.asReadonly();

	/**
	 * Displays a provided toast and returns the generated id
	 *
	 * @param toast - The provided toast
	 */
	public showToast(toast: Omit<NgxToast, 'id' | 'toBeRemoved'>): string {
		// Iben: Determine the priority of the toast
		const priority = toast.configuration?.priority || this.configuration.priority || 'high';

		// Iben: Generate an id for the toast
		const id = uuid();
		const displayToast = { ...toast, id };

		// Iben: Add the toast to the toast list
		this.toastsList.update((toasts) => {
			return priority === 'high' ? [displayToast, ...toasts] : [...toasts, displayToast];
		});

		// Iben: Check if we need to autoclose the toast and close it if it is set to true
		const autoClose = toast.configuration?.autoClose || this.configuration.autoClose;

		if (autoClose === true || autoClose === undefined) {
			const maxTime = toast.configuration?.maxTime || this.configuration.maxTime || 5000;

			setTimeout(() => {
				this.removeToast(displayToast.id);
			}, maxTime);
		}

		// Iben: Return the generated id of the toast
		return id;
	}

	/**
	 * Removes a toast based on the provided id
	 *
	 * @param id - The id of the provided toast
	 */
	public removeToast(id: string): void {
		// Iben: If the toast list is currently being focussed on, we try again within 5 seconds
		if (this.isFocussed) {
			setTimeout(() => {
				this.removeToast(id);
			}, 5000);

			return;
		}
		// Iben: get the toast and update it to mark it as toBeRemoved
		let toast: NgxToast;
		let index: number;

		this.toastsList.update((toasts) => {
			index = toasts.findIndex((toast) => toast.id === id);
			toast = { ...toasts[index], toBeRemoved: true };

			return [...toasts.slice(0, index), toast, ...toasts.slice(index + 1)];
		});

		// Iben: Determine the animation time, by default this is 300ms if no other animationTime was provided
		const animationTime =
			toast.configuration?.animationTime || this.configuration.animationTime || 300;

		// Iben: Remove the toast
		setTimeout(() => {
			// Iben: If the toast list isn't focussed on, we remove it from the dom
			this.toastsList.update((toasts) => [
				...toasts.slice(0, index),
				...toasts.slice(index + 1),
			]);
			// Iben: Subtract an extra millisecond from the animationTime for the Angular changeDetection tick
		}, animationTime - 1);
	}

	/**
	 * Sets whether the list of toasts is currently being focussed on by the user
	 *
	 * @param hasFocus - Whether or not it is being focussed
	 */
	public setFocus(hasFocus: boolean) {
		this.isFocussed = hasFocus;
	}
}
