import {
	Directive,
	EmbeddedViewRef,
	InputSignal,
	OnDestroy,
	TemplateRef,
	ViewContainerRef,
	effect,
	inject,
	input,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { NgxAuthenticationAbstractService } from '../../abstracts';
import { NgxAuthenticationServiceToken } from '../../tokens';

/**
 * A directive that will render a part of the template based on whether the user is authenticated.
 *
 * Based upon `*ngIf`. See https://github.com/angular/angular/blob/master/packages/common/src/directives/ng_if.ts
 *
 * ## Accessibility (WCAG 2.2 SC 4.1.3 - Status Messages)
 * Since this directive dynamically inserts or removes elements from the DOM, screen readers may not automatically
 * announce the status change. However, because DOM changes in this directive typically happen on initial load
 * or directly in response to an explicit user interaction (e.g. login/logout), standard page/focus navigation
 * is sufficient and wrapping in an `aria-live` region is not required. If the dynamic view updates are transient,
 * critical status messages, it is recommended to wrap the toggleable section in an `aria-live` region (e.g. `aria-live="polite"`).
 */
@Directive({
	selector: '[ngxIsAuthenticated]',
})
export class NgxIsAuthenticatedDirective implements OnDestroy {
	/**
	 * The provided AuthenticationService implementation
	 */
	protected readonly authenticationService = inject<NgxAuthenticationAbstractService>(
		NgxAuthenticationServiceToken
	);
	/**
	 * An instance of the ViewContainerRef
	 */
	protected viewContainer = inject(ViewContainerRef);

	/**
	 * The destroyed state of the directive
	 */
	protected destroyed$: Subject<void>;

	/**
	 * The templateRef for the then block
	 */
	protected thenTemplateRef: TemplateRef<any> | null = null;
	/**
	 * The viewRef for the then block
	 */
	protected thenViewRef: EmbeddedViewRef<any> | null = null;
	/**
	 * The templateRef for the else block
	 */
	protected elseTemplateRef: TemplateRef<any> | null = null;
	/**
	 * The viewRef for the else block
	 */
	protected elseViewRef: EmbeddedViewRef<any> | null = null;

	/**
	 * Whether the user has to be authenticated
	 */
	protected shouldBeAuthenticated: boolean = true;

	constructor() {
		const templateRef = inject<TemplateRef<any>>(TemplateRef);

		this.thenTemplateRef = templateRef;

		effect(() => {
			this.shouldBeAuthenticated = this.ngxIsAuthenticated();
			this.updateView();
		});

		effect(() => {
			this.elseTemplateRef = this.ngxIsAuthenticatedElse();
			this.elseViewRef = null;
			this.updateView();
		});
	}

	/**
	 * Whether the user has to be authenticated
	 */
	public ngxIsAuthenticated: InputSignal<boolean> = input();
	/**
	 * The else template in case the condition is not matched
	 */
	public ngxIsAuthenticatedElse: InputSignal<TemplateRef<any>> = input();

	public ngOnDestroy(): void {
		this.dispose();
	}

	/**
	 * Updates the view according to the authentication status
	 */
	protected updateView(): void {
		// Iben: Dispose the current subscription
		this.dispose();

		// Iben: Create a new onDestroyed handler
		this.destroyed$ = new Subject();

		// Iben: Render the views based on the correct state
		this.authenticationService.isAuthenticated$
			.pipe(
				tap((isAuthenticated) => {
					// Iben: Check if we should render the view
					if (
						(isAuthenticated && this.shouldBeAuthenticated) ||
						(!isAuthenticated && !this.shouldBeAuthenticated)
					) {
						if (!this.thenViewRef) {
							this.viewContainer.clear();
							this.elseViewRef = null;
							if (this.thenTemplateRef) {
								this.thenViewRef = this.viewContainer.createEmbeddedView(
									this.thenTemplateRef
								);
							}
						}
					} else {
						if (!this.elseViewRef) {
							this.viewContainer.clear();
							this.thenViewRef = null;
							if (this.elseTemplateRef) {
								this.elseViewRef = this.viewContainer.createEmbeddedView(
									this.elseTemplateRef
								);
							}
						}
					}
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
}
