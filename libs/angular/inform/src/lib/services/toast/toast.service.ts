import { inject, Injectable, Signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, concatMap, map, of, Subject, tap, withLatestFrom } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { NgxToastConfigurationToken } from '../../tokens';
import { NgxToast, NgxToastDefaultConfiguration, NgxToastEvent } from '../../types/toast.types';

@Injectable({
	providedIn: 'root',
})
export class NgxToastService {
	/**
	 * The default configuration required for the toast
	 */
	private readonly configuration: NgxToastDefaultConfiguration = inject(
		NgxToastConfigurationToken
	);

	/**
	 * The queue with all the toasts in it
	 */
	private queue$: BehaviorSubject<NgxToast[]> = new BehaviorSubject([]);

	/**
	 * The toast event handler that will handle updates to the queue
	 */
	private toastEvents$: Subject<NgxToastEvent> = new Subject<NgxToastEvent>();

	/**
	 * Whether the list of all toasts is focussed upon, either by focus or by hover
	 */
	private isFocussed: boolean = false;

	/**
	 * A list of all the currently visible toasts
	 */
	public toasts: Signal<NgxToast[]> = toSignal(
		this.queue$.pipe(
			map((toasts) => {
				// Iben: If there is no max amount, we return the toasts as is
				if (!this.configuration.maxAmount) {
					return toasts;
				}

				// Iben: If the there is a max amount, we return the limited list
				return toasts.slice(0, this.configuration.maxAmount.amount);
			})
		)
	);

	constructor() {
		// Iben: Subscribe to the toast events
		this.toastEvents$
			.pipe(
				// Iben: Concatmap all the events so we will handle them one by one
				concatMap((event) => {
					// Iben: Get the latest version of the queue
					return of(event).pipe(
						withLatestFrom(this.queue$),
						tap(([{ toast, type }, queue]) => {
							// Iben: If we need to add the item to the queue, we add it based on its proiority
							if (type === 'add') {
								this.queue$.next(
									toast.configuration?.hasPriority
										? [toast, ...queue]
										: [...queue, toast]
								);

								return;
							}

							// Iben: Get the index of the toast we need to update or remove
							const index = queue.findIndex(({ id }) => id === toast.id);

							// Iben: If we need to update it, we mark it as being removed
							if (type === 'update') {
								this.queue$.next([
									...queue.slice(0, index),
									{
										...toast,
										toBeRemoved: true,
									},
									...queue.slice(index + 1),
								]);
							} else {
								// Iben: Remove the toast when needed
								this.queue$.next([
									...queue.slice(0, index),
									...queue.slice(index + 1),
								]);
							}
						})
					);
				}),
				takeUntilDestroyed()
			)
			.subscribe();
	}

	/**
	 * Displays a provided toast and returns the generated id
	 *
	 * @param data - The data needed for the toast
	 */
	public showToast<DataType = unknown>(
		data: Omit<NgxToast<DataType>, 'id' | 'toBeRemoved'>
	): NgxToast<DataType> {
		// Iben: Early exit if we reached
		if (
			!this.configuration.maxAmount ||
			(this.queue$.getValue().length === this.configuration.maxAmount.amount &&
				this.configuration.maxAmount.strategy === 'ignore')
		) {
			return undefined;
		}

		// Iben: Generate an id for the toast
		const id = uuid();
		const toast = { ...data, id };

		// Iben: Add the toast to the toast list
		this.toastEvents$.next({
			type: 'add',
			toast: toast,
		});

		// Iben: Return the toast
		return toast;
	}

	/**
	 * Removes a toast based on the provided id
	 *
	 * @param toast - The toast we wish to remove
	 */
	public removeToast(toast: NgxToast): void {
		// Iben: If the toast list is currently being focussed on, we try again within 5 seconds
		if (this.isFocussed && (this.configuration.autoClose || toast.configuration?.autoClose)) {
			setTimeout(() => {
				this.removeToast(toast);
			}, 5000);

			return;
		}

		// Iben: Update the toast
		this.toastEvents$.next({
			toast,
			type: 'update',
		});

		// Iben: Determine the animation time, by default this is 300ms if no other animationTime was provided
		const animationTime =
			this.configuration.animationTime === undefined ? this.configuration.animationTime : 300;

		// Iben: Remove the toast
		setTimeout(
			() => {
				// Iben: If the toast list isn't focussed on, we remove it from the dom
				this.toastEvents$.next({
					toast,
					type: 'remove',
				});
				// Iben: Subtract an extra millisecond from the animationTime for the Angular changeDetection tick
			},
			animationTime === 0 ? animationTime : animationTime - 1
		);
	}

	/**
	 * Sets whether the list of toasts is currently being focussed on by the user
	 *
	 * @param hasFocus - Whether or not it is being focussed
	 */
	public setFocus(hasFocus: boolean) {
		this.isFocussed = hasFocus;
	}

	/**
	 * Mark the toast as rendered, so that we can automatically remove it if needed
	 *
	 * @param toast - The toast we wish to remove if needed
	 */
	public markAsRendered(toast: NgxToast): void {
		// Iben: If the toast isn't currently visible, we early exit
		if (!this.toasts().find(({ id }) => toast.id === id)) {
			return;
		}

		// Iben: Check if we need to autoclose the toast and close it if it is set to true
		const autoClose = toast.configuration?.autoClose || this.configuration.autoClose;

		if (autoClose === true || autoClose === undefined) {
			const maxTime = this.configuration.maxTime || 5000;

			setTimeout(() => {
				this.removeToast(toast);
			}, maxTime);
		}
	}
}
