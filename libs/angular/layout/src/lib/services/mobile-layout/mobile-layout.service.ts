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
	NgxMobileLayoutConfiguration,
	NgxMobileLayoutElements,
	NgxMobileLayoutItem,
} from '../../types';
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
	protected readonly layoutSubject$: BehaviorSubject<NgxMobileLayoutConfiguration> =
		new BehaviorSubject<NgxMobileLayoutConfiguration>(undefined);

	/**
	 * Whether the flyout should be shown
	 */
	protected showFlyout: WritableSignal<boolean> = signal(false);

	/**
	 * Whether the aside should be shown
	 */
	protected showAside: WritableSignal<boolean> = signal(false);

	/**
	 * The current layout of the application as an Observable
	 */
	public readonly layout$: Observable<NgxMobileLayout> = combineLatest([
		this.mediaService.currentQueryMatch$.pipe(distinctUntilChanged()),
		this.layoutSubject$.asObservable().pipe(distinctUntilChanged(), filter(Boolean)),
	]).pipe(
		map(([query, layout]) => {
			return clean({
				header: {
					left: this.extractComponent(layout.header.left, query),
					main: this.extractComponent(layout.header.main, query),
					right: this.extractComponent(layout.header.right, query),
				},
				navigation: this.extractComponent(layout.navigation, query),
				flyout: this.extractComponent(layout.flyout, query),
				aside: this.extractComponent(layout.aside, query),
				footer: this.extractComponent(layout.footer, query),
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
				// Iben: If no default layout is provided, we set the layout as is
				if (!this.defaultLayout && layout) {
					this.layoutSubject$.next(clean(layout) as NgxMobileLayoutConfiguration);

					return;
				}

				// Iben: If layout is provided, we set the default layout
				if (!layout && this.defaultLayout) {
					this.layoutSubject$.next(
						clean(this.defaultLayout) as NgxMobileLayoutConfiguration
					);

					return;
				}

				// Iben: If a default layout is provided, we want to only replace the layout elements that weren't part of the original default
				this.layoutSubject$.next(
					clean({
						header: {
							left: this.getComponent(
								layout.header?.left,
								this.defaultLayout.header?.left
							),
							main: this.getComponent(
								layout.header?.main,
								this.defaultLayout.header?.main
							),
							right: this.getComponent(
								layout.header?.right,
								this.defaultLayout.header?.right
							),
						},
						navigation: this.getComponent(
							layout.navigation,
							this.defaultLayout.navigation
						),
						flyout: this.getComponent(layout.footer, this.defaultLayout.flyout),
						aside: this.getComponent(layout.aside, this.defaultLayout.aside),
						footer: this.getComponent(layout.footer, this.defaultLayout.footer),
					}) as NgxMobileLayoutConfiguration
				);
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
				flyout,
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
		// Iben: Set initial layout
		this.layoutSubject$.next(clean(this.defaultLayout) as NgxMobileLayoutConfiguration);

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

	/**
	 * Returns either the component or the fallback we wish to render
	 *
	 * @param component - The component
	 * @param fallback - The fallback
	 */
	private getComponent(
		component: NgxMobileLayoutItem,
		fallback: NgxMobileLayoutItem
	): NgxMobileLayoutItem {
		// Iben: If the component was explicitly set to `null`, we know we need to remove the current component and not fall back to the fallback
		if (component === null) {
			return undefined;
		}

		// Iben: Either return the component, or the fallback
		return component || fallback;
	}

	/**
	 * Extract the component based on the provided query
	 *
	 * @param component - A component or component record
	 * @param query - An optional query
	 */
	private extractComponent(component: NgxMobileLayoutItem, query?: string): ComponentType {
		// Iben: If no component was provided, we early exit
		if (!component) {
			return null;
		}

		// Iben: If a default property exists, we assume we are dealing with a record
		if (component['default']) {
			// Iben: Return the component matching the query or the default
			return component[(query || 'default').toLowerCase()] || component['default'];
		}

		// Iben: Return the component as is
		return component as ComponentType;
	}
}
