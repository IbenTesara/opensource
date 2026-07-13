import {
	ChangeDetectorRef,
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
import { Subject, takeUntil, tap } from 'rxjs';

import { NgxAuthenticationAbstractService } from '../../abstracts';
import { NgxAuthenticationServiceToken } from '../../tokens';
import { convertToArray } from '../../utils';

/**
 * A directive that will render a part of the template based on whether the required permissions(s) are provided.
 *
 * Based upon `*ngIf`. See https://github.com/angular/angular/blob/master/packages/common/src/directives/ng_if.ts
 *
 * ## Accessibility (WCAG 2.2 SC 4.1.3 - Status Messages)
 * Since this directive dynamically inserts or removes elements from the DOM, screen readers may not automatically
 * announce the status change. However, because DOM changes in this directive typically happen on initial load
 * or directly in response to an explicit user interaction (e.g. settings updates), standard page/focus navigation
 * is sufficient and wrapping in an `aria-live` region is not required. If the dynamic view updates are transient,
 * critical status messages, it is recommended to wrap the toggleable section in an `aria-live` region (e.g. `aria-live="polite"`).
 */

//TODO: Iben: Implement Cypress/PlayWright tests
@Directive({
	selector: '[ngxHasPermission]',
})
export class NgxHasPermissionDirective<PermissionType extends string> implements OnDestroy {
	/**
	 * An instance of the ViewContainerRef
	 */
	protected viewContainer = inject(ViewContainerRef);
	/**
	 * The provided AuthenticationService implementation
	 */
	protected readonly authenticationService = inject<NgxAuthenticationAbstractService>(
		NgxAuthenticationServiceToken
	);
	/**
	 * The provided ChangeDetectorRef
	 */
	protected readonly cdRef = inject(ChangeDetectorRef);

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
	 * The (list of) permission(s) we need to check
	 */
	protected permission: PermissionType | PermissionType[] = [];

	/**
	 * Whether the permission should be enabled
	 */
	protected shouldHavePermission: boolean = true;

	/**
	 * Whether all permissions should be enabled
	 */
	protected shouldHaveAllPermissions: boolean = true;

	/**
	 * A permission or list of permissions the item should have
	 */
	public ngxHasPermission: InputSignal<PermissionType | PermissionType[]> = input();

	/**
	 * The else template in case the permission is not enabled
	 */
	public ngxHasPermissionElse: InputSignal<TemplateRef<any>> = input();

	/**
	 * Whether the permission should be enabled, by default this is true
	 */
	public ngxHasPermissionShouldHavePermission: InputSignal<boolean> = input();

	/**
	 * Whether all permissions should be enabled, by default this is true
	 */
	public ngxHasPermissionShouldHaveAllPermissions: InputSignal<boolean> = input();

	constructor() {
		const templateRef = inject<TemplateRef<any>>(TemplateRef);

		this.thenTemplateRef = templateRef;

		effect(() => {
			this.shouldHaveAllPermissions = this.ngxHasPermissionShouldHaveAllPermissions();
			this.shouldHavePermission = this.ngxHasPermissionShouldHavePermission();
			this.permission = this.ngxHasPermission();

			this.updateView();
		});

		effect(() => {
			this.elseTemplateRef = this.ngxHasPermissionElse();
			this.elseViewRef = null;
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
		this.authenticationService
			.hasPermission(
				convertToArray<PermissionType>(this.permission),
				this.shouldHaveAllPermissions
			)
			.pipe(
				tap((hasPermission) => {
					// Iben: Clear the current view
					this.viewContainer.clear();

					// Iben: Check if we should render the view
					const shouldRender: boolean = this.shouldHavePermission
						? hasPermission
						: !hasPermission;

					// Iben: Render the correct templates
					if (shouldRender) {
						this.viewContainer.clear();
						this.elseViewRef = null;

						if (this.thenTemplateRef) {
							this.thenViewRef = this.viewContainer.createEmbeddedView(
								this.thenTemplateRef
							);
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
}
