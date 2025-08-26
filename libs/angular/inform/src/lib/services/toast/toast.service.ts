import { computed, inject, Injectable, Signal, Type } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { uniqBy } from 'lodash';
import {
	BehaviorSubject,
	combineLatest,
	concatMap,
	distinctUntilChanged,
	filter,
	map,
	of,
	Subject,
	tap,
	withLatestFrom,
} from 'rxjs';
import { v7 as uuid } from 'uuid';

import { NgxToastBundlerComponent } from '../../abstracts';
import { NgxToastConfigurationToken } from '../../tokens';
import {
	NgxToast,
	NgxToastCreator,
	NgxToastDefaultConfiguration,
	NgxToastEvent,
} from '../../types/toast.types';

/**
 * A service that acts as the single source of truth in the application
 */
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
	 * Whether we want to show the bundled toasts
	 */
	private showBundledToasts$: BehaviorSubject<boolean> = new BehaviorSubject(false);

	/**
	 * Whether the list of all toasts is focussed upon, either by focus or by hover
	 */
	private isFocussed: boolean = false;

	/**
	 * A list of all the currently visible toasts
	 */
	public toasts: Signal<NgxToast[]> = toSignal(
		combineLatest([this.queue$, this.showBundledToasts$]).pipe(
			map(([toasts, showBundled]) => {
				// Iben: Prevent duplicates
				const result = uniqBy(toasts, (item) => item.id) || [];

				// Iben: If there is no max amount, we return the toasts as is
				if (!this.configuration.maxAmount || showBundled) {
					return result;
				}

				// Iben: If the there is a max amount, we return the limited list
				return result.slice(0, this.configuration.maxAmount.amount);
			})
		)
	);

	/**
	 * The amount of bundled toasts there are
	 */
	public hasBundledToasts: Signal<number> = computed(() => {
		if (!this.configuration.maxAmount || this.configuration.maxAmount.strategy !== 'bundle') {
			return 0;
		}

		return this.queue$.getValue().length - this.toasts().length;
	});

	/**
	 * The component used to represent the bundled toasts
	 */
	public bundledComponent: Type<NgxToastBundlerComponent> =
		this.configuration?.maxAmount?.['component'];

	/**
	 * Creates an instance of NgxToastService.
	 */
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
							// Iben: If we need to add the item to the queue, we add it based on its priority
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
							// Iben: Remove the toast when needed
							this.queue$.next([...queue.slice(0, index), ...queue.slice(index + 1)]);
						})
					);
				}),
				takeUntilDestroyed()
			)
			.subscribe();

		/**
		 * Listens to the amount of items in the queue and resets the showBundledToasts accordingly
		 */
		this.queue$
			.pipe(
				map((toasts) => toasts.length),
				distinctUntilChanged(),
				filter((length) => !length),
				tap(() => {
					this.showBundledToasts$.next(false);
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
		data: NgxToastCreator<DataType> | string
	): NgxToast<DataType> {
		// Iben: Early exit if we reached
		if (
			this.configuration.maxAmount &&
			this.queue$.getValue().length === this.configuration.maxAmount.amount &&
			this.configuration.maxAmount.strategy === 'ignore'
		) {
			return undefined;
		}

		// Iben: Generate an id for the toast
		const id = uuid();
		const toast = { ...(typeof data === 'string' ? { text: data } : data), id };

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
		// Iben: If the toast is no longer in the queue, because it was removed by the end user, we early exit
		if (!this.queue$.getValue().find(({ id }) => toast.id === id)) {
			return;
		}

		// Iben: If the toast list is currently being focussed on, we try again within 5 seconds
		if (this.isFocussed && (this.configuration.autoClose || toast.configuration?.autoClose)) {
			setTimeout(() => {
				this.removeToast(toast);
			}, 5000);

			return;
		}

		// Iben: If the toast list isn't focussed on, we remove it from the dom
		this.toastEvents$.next({
			toast,
			type: 'remove',
		});
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

	/**
	 * Shows the bundled toasts in case there are
	 */
	public showBundled(): void {
		// Iben: If the maxAmount strategy isn't bundle, we early exit as this method is then irrelevant
		if (this.configuration.maxAmount?.strategy !== 'bundle') {
			return;
		}

		this.showBundledToasts$.next(true);
	}
}
