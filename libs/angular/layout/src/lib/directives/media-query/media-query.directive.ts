import {
	ChangeDetectorRef,
	Directive,
	EmbeddedViewRef,
	inject,
	input,
	InputSignal,
	TemplateRef,
	ViewContainerRef,
	OnDestroy,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Subject, tap, takeUntil, combineLatest } from 'rxjs';

import { NgxMediaQueryService } from '../../services';

/**
 * A directive that will render a part of the template based on whether the current screen size matches the provided query
 *
 * Based upon `*ngIf`. See https://github.com/angular/angular/blob/master/packages/common/src/directives/ng_if.ts
 */

@Directive({
	selector: '[ngxMediaQuery]',
})
export class NgxMediaQueryDirective implements OnDestroy {
	protected readonly mediaQueryService: NgxMediaQueryService = inject(NgxMediaQueryService);
	/**
	 * The provided template ref
	 */
	protected readonly templateRef = inject<TemplateRef<any>>(TemplateRef);
	/**
	 * The provided ViewContainerRef
	 */
	protected readonly viewContainer = inject(ViewContainerRef);

	/**
	 * The provided ChangeDetectorRef
	 */
	protected readonly cdRef = inject(ChangeDetectorRef);

	/**
	 * The destroyed state of the directive
	 */
	protected destroyed$: Subject<void>;

	/**
	 * The needed templateRefs
	 */
	protected thenTemplateRef: TemplateRef<unknown> | null = null;
	protected thenViewRef: EmbeddedViewRef<unknown> | null = null;
	protected elseTemplateRef: TemplateRef<unknown> | null = null;
	protected elseViewRef: EmbeddedViewRef<unknown> | null = null;

	/**
	 * The query it should match
	 */
	public ngxMediaQuery: InputSignal<string> = input();

	/**
	 * The else template in case the query isn't matched
	 */
	public ngxMediaQueryElse: InputSignal<TemplateRef<unknown>> = input(undefined);

	/**
	 * Whether the query should be matched, by default this is true
	 */
	public ngxMediaQueryShouldMatch: InputSignal<boolean> = input(true);

	constructor() {
		const templateRef = this.templateRef;

		this.thenTemplateRef = templateRef;

		// Iben: Listen to the changes and handle them accordingly
		combineLatest([
			toObservable(this.ngxMediaQuery),
			toObservable(this.ngxMediaQueryElse),
			toObservable(this.ngxMediaQueryShouldMatch),
		])
			.pipe(
				tap(() => {
					this.updateView();
				}),
				takeUntilDestroyed()
			)
			.subscribe();
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
		this.mediaQueryService
			.matchesQuery(this.ngxMediaQuery())
			.pipe(
				tap((matchesQuery) => {
					// Iben: Clear the current view
					this.viewContainer.clear();

					// Iben: Check if we should render the view
					const shouldRender: boolean = this.ngxMediaQueryShouldMatch()
						? matchesQuery
						: !matchesQuery;

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
