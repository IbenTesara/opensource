import { inject, Injectable } from '@angular/core';
import clean from 'obj-clean';
import { BehaviorSubject, filter, Observable, take, tap } from 'rxjs';

import { NgxMobileLayoutConfigurationToken } from '../../tokens';
import { ComponentType, NgxMobileLayout, NgxMobileLayoutConfiguration } from '../../types';

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
	private readonly initialLayoutSetSubject$: BehaviorSubject<boolean> = new BehaviorSubject(
		false
	);

	/**
	 * Whether the initial layout has been set
	 */
	private readonly initialLayoutSet$: Observable<boolean> = this.initialLayoutSetSubject$;

	/**
	 * An optional default layout that was provided
	 */
	private readonly defaultLayout: NgxMobileLayoutConfiguration | undefined = inject(
		NgxMobileLayoutConfigurationToken,
		{ optional: true }
	);

	/**
	 * A subject holding whether the flyout is being added or not
	 */
	private readonly flyoutStateSubject$: BehaviorSubject<'IN' | 'OUT'> = new BehaviorSubject(
		undefined
	);

	/**
	 * Whether the flyout is being added or removed
	 */
	public readonly flyoutState$: Observable<'IN' | 'OUT'> =
		this.flyoutStateSubject$.asObservable();

	/**
	 * A subject holding the current layout of the application
	 */
	private readonly layoutSubject$: BehaviorSubject<NgxMobileLayout> =
		new BehaviorSubject<NgxMobileLayout>(undefined);

	/**
	 * The current layout of the application as an Observable
	 */
	public readonly layout$: Observable<NgxMobileLayout> = this.layoutSubject$.asObservable();

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
				const defaultLayout = this.defaultLayout.layout;

				// Iben: If no default layout is provided, we set the layout as is
				if (!this.defaultLayout && layout) {
					this.layoutSubject$.next(clean(layout) as NgxMobileLayout);

					return;
				}

				// Iben: If layout is provided, we set the default layout
				if (!layout && this.defaultLayout) {
					this.layoutSubject$.next(clean(defaultLayout) as NgxMobileLayout);

					return;
				}

				// Iben: If a default layout is provided, we want to only replace the layout elements that weren't part of the original default
				this.layoutSubject$.next(
					clean({
						header: {
							left: this.getComponent(
								layout.header?.left,
								defaultLayout.header?.left
							),
							main: this.getComponent(
								layout.header?.main,
								defaultLayout.header?.main
							),
							right: this.getComponent(
								layout.header?.right,
								defaultLayout.header?.right
							),
						},
						navigation: this.getComponent(layout.navigation, defaultLayout.navigation),
						// Iben: The flyout is the only item that does not have a default element, so we don't have to fetch it using getComponent
						flyout: layout.flyout,
						footer: this.getComponent(layout.footer, defaultLayout.footer),
					}) as NgxMobileLayout
				);
			})
		);
	}

	/**
	 * Open a provided flyout
	 *
	 * @param flyout - The provided flyout
	 */
	public openFlyout(flyout: ComponentType) {
		// Iben: Notify the component that a flyout is about to be added
		this.flyoutStateSubject$.next('IN');

		// Iben: Add the flyout
		this.layoutSubject$.next({
			...this.layoutSubject$.getValue(),
			flyout,
		});
	}

	/**
	 * Close the currently open flyout
	 */
	public closeFlyout() {
		// Iben: Notify the component that a flyout is about to be removed
		this.flyoutStateSubject$.next('OUT');

		// Iben: Remove the flyout after the specified time
		setTimeout(() => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { flyout, ...rest } = this.layoutSubject$.getValue();

			this.layoutSubject$.next(rest);
		}, this.defaultLayout?.flyoutAnimationDuration || 300);
	}

	/**
	 * Provides an initial layout if one was provided
	 */
	public setUpInitialLayout(markAsInitial: boolean = true): void {
		// Iben: Set initial layout
		this.layoutSubject$.next(clean(this.defaultLayout?.layout) as NgxMobileLayout);

		// Iben: Mark the initial layout set as true
		if (markAsInitial) {
			this.initialLayoutSetSubject$.next(true);
		}
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
