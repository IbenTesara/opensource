import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { get } from 'lodash';
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
	 * Whether the aside should be shown
	 */
	protected readonly showAside: WritableSignal<boolean> = signal(false);

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
				this.layoutSubject$.next(extractLayout(layout, this.defaultLayout, this.queries));
			})
		);
	}

	/**
	 * Open a flyout
	 *
	 * @param flyout - An optional flyout
	 */
	public openFlyout(flyout?: ComponentType): void {
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

			// Iben: Make the flyout visible
			this.showFlyout.set(true);
		}
	}

	/**
	 * Close the currently open flyout
	 */
	public closeFlyout(): void {
		// Iben: Make the flyout invisible
		this.showFlyout.set(false);
	}

	/**
	 * Open a aside
	 */
	public openAside(): void {
		this.showAside.set(true);
	}

	/**
	 * Close the currently open aside
	 */
	public closeAside(): void {
		this.showAside.set(false);
	}

	/**
	 * Provides an initial layout if one was provided
	 */
	public setUpInitialLayout(markAsInitial: boolean = true): void {
		// Iben: Set up the initial queries and set it as 'default' if
		this.queries = this.mediaService.queries.length
			? this.mediaService.queries.map((query) => query.toLowerCase())
			: ['default'];

		// Iben: Set initial layout
		this.layoutSubject$.next(extractLayout(this.defaultLayout, {}, this.queries));

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
			map((layout) => Boolean(get(layout, element)))
		);
	}
}
