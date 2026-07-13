import {
	ChangeDetectorRef,
	ComponentRef,
	Directive,
	TemplateRef,
	Type,
	ViewContainerRef,
	OnDestroy,
	inject,
	effect,
	input,
	InputSignal,
} from '@angular/core';
import { flatten } from 'lodash';
import { Subject, tap, takeUntil, combineLatest, map } from 'rxjs';

import { NgxCookiesFallBackComponent } from '../../abstracts';
import { NgxCookieService } from '../../services';
import { NgxCookiesFallbackComponentToken } from '../../tokens';
import { NgxHasCookieConfiguration } from '../../types';

/**
 * A structural directive that provides a way to render UI elements based on whether a (set of) cookie(s) have been accepted by the user.
 *
 * ## Accessibility (WCAG 2.2 SC 4.1.3 - Status Messages)
 * Since this directive dynamically inserts or removes elements from the DOM, screen readers may not automatically
 * announce the status change. However, because DOM changes in this directive typically happen on initial load
 * or directly in response to an explicit user interaction (e.g. cookie consent settings changes), standard page/focus navigation
 * is sufficient and wrapping in an `aria-live` region is not required. If the dynamic view updates are transient,
 * critical status messages, it is recommended to wrap the toggleable section in an `aria-live` region (e.g. `aria-live="polite"`).
 */
@Directive({
	selector: '[hasCookie]',
	standalone: true,
})
export class NgxHasCookieDirective implements OnDestroy {
	//TODO: Iben: Replace this with the OnDestroyComponent flow once we have a shared lib
	/**
	 * The destroyed state of the directive
	 */
	protected destroyed$: Subject<void>;

	/**
	 * An instance of the TemplateRef
	 */
	protected readonly templateRef: TemplateRef<any> = inject(TemplateRef);
	/**
	 * An instance of the ViewContainerRef
	 */
	protected viewContainer: ViewContainerRef = inject(ViewContainerRef);
	/**
	 * An instance of the NgxCookieService
	 */
	protected readonly ngxCookieService: NgxCookieService = inject(NgxCookieService);
	/**
	 * An instance of the ChangeDetectorRef
	 */
	protected readonly cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);
	/**
	 * The custom fallback component type
	 */
	protected readonly component: Type<NgxCookiesFallBackComponent> = inject(
		NgxCookiesFallbackComponentToken,
		{ optional: true }
	);

	/**
	 * The templateRef for the then block
	 */
	protected thenTemplateRef: TemplateRef<any> | null = null;
	/**
	 * The templateRef for the else block
	 */
	protected elseTemplateRef: TemplateRef<any> | null = null;

	/**
	 * The ref of the component we wish to render as a fallback
	 */
	protected componentRef: ComponentRef<NgxCookiesFallBackComponent>;

	/**
	 * The list of cookies we need to check
	 */
	protected cookies: NgxHasCookieConfiguration[] = [];

	/**
	 * A cookie or list of cookies the item should have
	 */
	public hasCookie: InputSignal<NgxHasCookieConfiguration | NgxHasCookieConfiguration[]> =
		input.required();

	/**
	 * The else template in case the cookie is not accepted
	 */
	public hasCookieElse: InputSignal<TemplateRef<any>> = input<TemplateRef<any>>();

	constructor() {
		this.thenTemplateRef = this.templateRef;

		effect(() => {
			const value = this.hasCookie();
			this.cookies = Array.isArray(value) ? value : [value];

			this.updateView();
		});

		effect(() => {
			if (this.hasCookieElse()) {
				this.updateView();
			}
		});
	}

	public ngOnDestroy(): void {
		this.dispose();
	}

	/**
	 * Updates the view and hides/renders the template as needed
	 */
	protected updateView(): void {
		// Iben: Dispose the current subscription
		this.dispose();

		// Iben: Create a new onDestroyed handler
		this.destroyed$ = new Subject();

		// Iben: Render the views based on the correct state
		combineLatest(
			// Iben Check for each cookie if it is accepted
			this.cookies.map((cookie) => {
				// Iben: If no specific services were provided, we can just check the category
				if (!cookie.services) {
					return this.ngxCookieService.hasAcceptedCategory(cookie.category);
				}

				// Iben: If specific services were provided, we can just check each individual category
				return combineLatest(
					cookie.services.map((service) => {
						return this.ngxCookieService.hasAcceptedService(cookie.category, service);
					})
				);
			})
		)
			.pipe(
				map((hasCookies) => {
					return flatten(hasCookies).every((hasCookie) => hasCookie);
				}),
				tap((hasCookie) => {
					// Iben: Clear the current view
					this.viewContainer.clear();

					// Iben: If there already is a component, destroy it so it can update correctly
					if (this.componentRef) {
						this.componentRef.destroy();
						this.componentRef = undefined;
					}

					// Iben: Render the correct templates
					hasCookie ? this.renderThenTemplate() : this.renderElseTemplate();

					// Iben: Detect the changes so that the view gets updated
					this.cdRef.detectChanges();
				}),
				takeUntil(this.destroyed$)
			)
			.subscribe();
	}

	/**
	 * Dispose the current subscription
	 */
	protected dispose(): void {
		if (this.destroyed$) {
			this.destroyed$.next();
			this.destroyed$.complete();
		}
	}

	/**
	 * Render the template on which the directive is set
	 */
	protected renderThenTemplate(): void {
		// Iben: If a thenTemplateRef is provided, render the template
		if (this.thenTemplateRef) {
			this.viewContainer.createEmbeddedView(this.thenTemplateRef);
		}
	}

	/**
	 * Render the fallbackTemplate or fallBackComponent
	 */
	protected renderElseTemplate(): void {
		// Iben: If a custom template ref was provided, render the template and early exit
		if (this.hasCookieElse()) {
			this.viewContainer.createEmbeddedView(this.hasCookieElse());

			return;
		}

		// Iben: If a component was provided as a fallback, we render that
		if (this.component) {
			// Iben: Render the provided component
			this.componentRef = this.viewContainer.createComponent<NgxCookiesFallBackComponent>(
				this.component
			);

			// Iben: Set the cookies of the component
			this.componentRef.setInput('cookies', this.cookies);
		}
	}
}
