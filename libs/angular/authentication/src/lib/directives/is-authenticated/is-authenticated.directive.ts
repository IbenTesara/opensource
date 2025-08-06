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
 *  * A directive that will render a part of the template based on whether the user is authenticated.
 *
 * Based upon `*ngIf`. See https://github.com/angular/angular/blob/master/packages/common/src/directives/ng_if.ts
 */
@Directive({
	selector: '[ngxIsAuthenticated]',
})
export class NgxIsAuthenticatedDirective implements OnDestroy {
	private readonly authenticationService = inject<NgxAuthenticationAbstractService>(
		NgxAuthenticationServiceToken
	);
	private viewContainer = inject(ViewContainerRef);

	/**
	 * The destroyed state of the directive
	 */
	private destroyed$: Subject<void>;

	/**
	 * The needed templateRefs
	 */
	private thenTemplateRef: TemplateRef<any> | null = null;
	private thenViewRef: EmbeddedViewRef<any> | null = null;
	private elseTemplateRef: TemplateRef<any> | null = null;
	private elseViewRef: EmbeddedViewRef<any> | null = null;

	/**
	 * Whether the user has to be authenticated
	 */
	private shouldBeAuthenticated: boolean = true;

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

	private updateView(): void {
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
	private dispose(): void {
		if (this.destroyed$) {
			this.destroyed$.next();
			this.destroyed$.complete();
		}
	}
}
