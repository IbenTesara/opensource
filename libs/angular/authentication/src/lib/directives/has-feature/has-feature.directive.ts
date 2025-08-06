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
 * A directive that will render a part of the template based on whether the required feature(s) are provided.
 *
 * Based upon `*ngIf`. See https://github.com/angular/angular/blob/master/packages/common/src/directives/ng_if.ts
 */

//TODO: Iben: Implement Cypress/PlayWright tests
@Directive({
	selector: '[ngxHasFeature]',
})
export class NgxHasFeatureDirective<FeatureType extends string> implements OnDestroy {
	/**
	 * The provided template ref
	 */
	templateRef = inject<TemplateRef<any>>(TemplateRef);
	/**
	 * The provided ViewContainerRef
	 */
	private viewContainer = inject(ViewContainerRef);
	/**
	 * The provided AuthenticationService implementation
	 */
	private readonly authenticationService = inject<NgxAuthenticationAbstractService>(
		NgxAuthenticationServiceToken
	);
	/**
	 * The provided ChangeDetectorRef
	 */
	private readonly cdRef = inject(ChangeDetectorRef);

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
	 * The (list of) feature(s) we need to check
	 */
	private feature: FeatureType | FeatureType[] = [];

	/**
	 * Whether the feature should be enabled
	 */
	private shouldHaveFeature: boolean = true;

	/**
	 * Whether all features should be enabled
	 */
	private shouldHaveAllFeatures: boolean = true;

	/**
	 * A feature or list of features the item should have
	 */
	public ngxHasFeature: InputSignal<FeatureType | FeatureType[]> = input();

	/**
	 * The else template in case the feature is not enabled
	 */
	public ngxHasFeatureElse: InputSignal<TemplateRef<any>> = input();

	/**
	 * Whether the feature should be enabled, by default this is true
	 */
	public ngxHasFeatureShouldHaveFeature: InputSignal<boolean> = input();

	/**
	 * Whether all features should be enabled, by default this is true
	 */
	public ngxHasFeatureShouldHaveAllFeatures: InputSignal<boolean> = input();

	constructor() {
		const templateRef = this.templateRef;

		this.thenTemplateRef = templateRef;

		effect(() => {
			this.shouldHaveAllFeatures = this.ngxHasFeatureShouldHaveAllFeatures();
			this.shouldHaveFeature = this.ngxHasFeatureShouldHaveFeature();
			this.feature = this.ngxHasFeature();

			this.updateView();
		});

		effect(() => {
			this.elseTemplateRef = this.ngxHasFeatureElse();
			this.elseViewRef = null;
		});
	}

	public ngOnDestroy(): void {
		this.dispose();
	}

	/**
	 * Updates the view and hides/renders the template as needed
	 */
	private updateView(): void {
		// Iben: Dispose the current subscription
		this.dispose();

		// Iben: Create a new onDestroyed handler
		this.destroyed$ = new Subject();

		// Iben: Render the views based on the correct state
		this.authenticationService
			.hasFeature(convertToArray<FeatureType>(this.feature), this.shouldHaveAllFeatures)
			.pipe(
				tap((hasFeature) => {
					// Iben: Clear the current view
					this.viewContainer.clear();

					// Iben: Check if we should render the view
					const shouldRender: boolean = this.shouldHaveFeature ? hasFeature : !hasFeature;

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
	private dispose(): void {
		if (this.destroyed$) {
			this.destroyed$.next();
			this.destroyed$.complete();
		}
	}
}
