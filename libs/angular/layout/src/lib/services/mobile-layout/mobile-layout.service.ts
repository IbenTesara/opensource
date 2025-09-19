import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { get } from 'lodash';
import clean from 'obj-clean';
import { BehaviorSubject, distinctUntilChanged, filter, map, Observable, take, tap } from 'rxjs';

import { NgxMobileLayoutConfigurationToken } from '../../tokens';
import { ComponentType, NgxMobileLayout, NgxMobileLayoutElements } from '../../types';

/**
 * The `NgxMobileLayoutService` allows us to configure an entire layout based on routing rather than on HTML. This allows for an easier use for mobile-first applications.
 */
@Injectable({
	providedIn: 'root',
})
export class NgxMobileLayoutService {
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
	protected readonly defaultLayout: NgxMobileLayout | undefined = inject(
		NgxMobileLayoutConfigurationToken,
		{ optional: true }
	);

	/**
	 * A subject holding the current layout of the application
	 */
	protected readonly layoutSubject$: BehaviorSubject<NgxMobileLayout> =
		new BehaviorSubject<NgxMobileLayout>(undefined);

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
	public readonly layout$: Observable<NgxMobileLayout> = this.layoutSubject$.asObservable();

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
	public setLayout(layout: NgxMobileLayout): Observable<boolean> {
		// Iben: To prevent timing issues, we wait until the initial layout has been set
		return this.initialLayoutSet$.pipe(
			filter(Boolean),
			take(1),
			tap(() => {
				// Iben: If no default layout is provided, we set the layout as is
				if (!this.defaultLayout && layout) {
					this.layoutSubject$.next(clean(layout) as NgxMobileLayout);

					return;
				}

				// Iben: If layout is provided, we set the default layout
				if (!layout && this.defaultLayout) {
					this.layoutSubject$.next(clean(this.defaultLayout) as NgxMobileLayout);

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
					}) as NgxMobileLayout
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
		this.layoutSubject$.next(clean(this.defaultLayout) as NgxMobileLayout);

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
	private getComponent(component: ComponentType, fallback: ComponentType): ComponentType {
		// Iben: If the component was explicitly set to `null`, we know we need to remove the current component and not fall back to the fallback
		if (component === null) {
			return undefined;
		}

		// Iben: Either return the component, or the fallback
		return component || fallback;
	}
}
