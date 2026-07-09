import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import clean from 'obj-clean';
import {
	BehaviorSubject,
	combineLatest,
	distinctUntilChanged,
	filter,
	map,
	Observable,
	take,
	tap,
} from 'rxjs';

import { NgxMobileLayoutConfigurationToken } from '../../tokens';
import {
	ComponentType,
	NgxMobileLayout,
	NgxMobileLayoutByQuery,
	NgxMobileLayoutConfiguration,
	NgxMobileLayoutElements,
	NgxMobileLayoutOutletParams,
} from '../../types';
import { extractLayout } from '../../utils';
import { NgxMediaQueryService } from '../media-query/media-query.service';

/**
 * The `NgxMobileLayoutService` allows us to configure an entire layout based on routing rather than on HTML. This allows for an easier use for mobile-first applications.
 */
@Injectable({
	providedIn: 'root',
})
export class NgxMobileLayoutService {
	/**
	 * An instance of the NgxMediaQueryService
	 */
	protected readonly mediaService: NgxMediaQueryService = inject(NgxMediaQueryService);

	/**
	 * A subject holding whether the initial layout has been set
	 */
	protected readonly initialLayoutSetSubject$: BehaviorSubject<boolean> = new BehaviorSubject(
		false
	);

	/**
	 * Whether the initial layout has been set
	 */
	protected readonly initialLayoutSet$: Observable<boolean> = this.initialLayoutSetSubject$;

	/**
	 * An optional default layout that was provided
	 */
	protected readonly defaultLayout: NgxMobileLayoutConfiguration | undefined = inject(
		NgxMobileLayoutConfigurationToken,
		{ optional: true }
	);

	/**
	 * A subject holding the current layout of the application
	 */
	protected readonly layoutSubject$: BehaviorSubject<NgxMobileLayoutByQuery> =
		new BehaviorSubject<NgxMobileLayoutByQuery>(undefined);

	/**
	 * Whether the flyout should be shown
	 */
	protected readonly showFlyout: WritableSignal<boolean> = signal(false);

	/**
	 * Whether the currently opened flyout should be preserved when the route changes
	 */
	protected readonly preserveFlyout: WritableSignal<boolean> = signal(false);

	/**
	 * Whether the aside should be shown
	 */
	protected readonly showAside: WritableSignal<boolean> = signal(false);

	/**
	 * An array of queries
	 */
	protected queries: string[];

	/**
	 * The current layout of the application as an Observable
	 */
	public readonly layout$: Observable<NgxMobileLayout> = combineLatest([
		this.mediaService.currentQueryMatch$.pipe(
			distinctUntilChanged(),
			map((query) => (query ? query.toLowerCase() : 'default'))
		),
		this.layoutSubject$.asObservable().pipe(distinctUntilChanged(), filter(Boolean)),
	]).pipe(
		map(([query, layout]) => {
			return clean({
				header: {
					left: layout.header.left[query],
					main: layout.header.main[query],
					right: layout.header.right[query],
				},
				navigation: layout.navigation[query],
				flyout: layout.flyout[query],
				aside: layout.aside[query],
				footer: layout.footer[query],
			}) as NgxMobileLayout;
		})
	);

	/**
	 * Whether the flyout is visible
	 */
	public flyoutShown: Signal<boolean> = this.showFlyout.asReadonly();

	/**
	 * The parameter context of the flyout
	 */
	public flyoutParams: WritableSignal<NgxMobileLayoutOutletParams> = signal(undefined);

	/**
	 * The parameter context of the aside
	 */
	public asideParams: WritableSignal<NgxMobileLayoutOutletParams> = signal(undefined);

	/**
	 * Whether the aside is visible
	 */
	public asideShown: Signal<boolean> = this.showAside.asReadonly();

	/**
	 * Sets the provided layout for the
	 *
	 * @param layout - The layout we wish to set
	 */
	public setLayout(layout: NgxMobileLayoutConfiguration): Observable<boolean> {
		// Iben: To prevent timing issues, we wait until the initial layout has been set
		return this.initialLayoutSet$.pipe(
			filter(Boolean),
			take(1),
			tap(() => {
				// Iben: Preserve the flyout if it was required
				const result = this.preserveFlyout()
					? { ...layout, flyout: this.layoutSubject$.value.flyout }
					: layout;

				// Iben: Update the layout
				this.layoutSubject$.next(extractLayout(result, this.defaultLayout, this.queries));
			})
		);
	}

	/**
	 * Open a flyout
	 *
	 * @param flyout - An optional flyout
	 * @param params - An optional set of parameters for the flyout
	 *
	 */
	public openFlyout(
		flyout?: ComponentType,
		params?: NgxMobileLayoutOutletParams,
		preserveFlyout: boolean = false
	): void {
		// Iben: Add the flyout if there wasn't one defined
		if (flyout) {
			this.layoutSubject$.next({
				...this.layoutSubject$.getValue(),
				flyout: this.queries.reduce((previous, current) => {
					return {
						...previous,
						[current]: flyout,
					};
				}, {}),
			});

			// Iben: Make the flyout visible and add the injector
			this.showFlyout.set(true);
			this.preserveFlyout.set(preserveFlyout);
			this.flyoutParams.set(params);
		}
	}

	/**
	 * Close the currently open flyout
	 */
	public closeFlyout(): void {
		// Iben: Make the flyout invisible
		this.preserveFlyout.set(false);
		this.showFlyout.set(false);
		this.flyoutParams.set(undefined);
	}

	/**
	 * Open a aside
	 *
	 * @param aside - An optional aside component
	 * @param params - An set of parameters for the aside
	 */
	public openAside(aside?: ComponentType, params?: NgxMobileLayoutOutletParams): void {
		// Iben: Add the aside if there wasn't one defined
		if (aside) {
			this.layoutSubject$.next({
				...this.layoutSubject$.getValue(),
				aside: this.queries.reduce((previous, current) => {
					return {
						...previous,
						[current]: aside,
					};
				}, {}),
			});
		}

		// Iben: Show the aside and add the injector
		this.showAside.set(true);
		this.asideParams.set(params);
	}

	/**
	 * Close the currently open aside
	 */
	public closeAside(): void {
		this.showAside.set(false);
		this.asideParams.set(undefined);
	}

	/**
	 * Provides an initial layout if one was provided
	 */
	public setUpInitialLayout(markAsInitial: boolean = true): void {
		// Iben: Set up the initial queries and set it as 'default' if
		this.queries = this.mediaService.queries.length
			? this.mediaService.queries.map((query) => query.toLowerCase())
			: ['default'];

		// Iben: Preserve the flyout if it was required
		const layout = this.preserveFlyout()
			? { ...this.defaultLayout, flyout: this.layoutSubject$.value.flyout }
			: this.defaultLayout;

		// Iben: Set initial layout
		this.layoutSubject$.next(extractLayout(layout, {}, this.queries));

		// Iben: Mark the initial layout set as true
		if (markAsInitial) {
			this.initialLayoutSetSubject$.next(true);
		}
	}

	/**
	 * Returns whether an element is defined in the layout
	 *
	 * @param element - The element we wish to check
	 */
	public hasElement(element: NgxMobileLayoutElements): Observable<boolean> {
		return this.layout$.pipe(
			filter(Boolean),
			distinctUntilChanged(),
			map((layout) =>
				Boolean(
					element
						.split('.')
						.reduce<unknown>(
							(acc, key) =>
								acc == null ? undefined : (acc as Record<string, unknown>)[key],
							layout
						)
				)
			)
		);
	}
}
