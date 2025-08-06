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
import { combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

import { NgxTourService } from '../../services';

/**
 *  * A directive that will render a part of the template based on the condition and the currently active tour
 *
 * Based upon `*ngIf`. See https://github.com/angular/angular/blob/master/packages/common/src/directives/ng_if.ts
 */
@Directive({
	selector: '[ngxTourShowWhen]',
})
export class NgxTourShowWhenDirective implements OnDestroy {
	private readonly tourService = inject<NgxTourService>(NgxTourService);
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

	constructor() {
		const templateRef = inject<TemplateRef<any>>(TemplateRef);

		this.thenTemplateRef = templateRef;

		effect(() => {
			if (this.ngxTourShowWhen()) {
				this.updateView();
			}
		});

		effect(() => {
			this.elseTemplateRef = this.ngxTourShowWhenElse();
			this.elseViewRef = null;
			this.updateView();
		});
	}

	/**
	 * Under which condition the item should be shown whilst the tour is active
	 */
	public ngxTourShowWhen: InputSignal<'hasNext' | 'hasPrevious' | 'whenActive' | 'whenInactive'> =
		input();
	/**
	 * The else template in case the condition is not matched
	 */
	public ngxTourShowWhenElse: InputSignal<TemplateRef<any>> = input();

	public ngOnDestroy(): void {
		this.dispose();
	}

	private updateView(): void {
		// Iben: Dispose the current subscription
		this.dispose();

		// Iben: Create a new onDestroyed handler
		this.destroyed$ = new Subject();

		// Iben: Render the views based on the correct state
		this.tourService.currentIndex$
			.pipe(
				distinctUntilChanged(),
        withLatestFrom( this.tourService.currentTour$ ),
				tap(([index, tour]) => {
					// Iben: Check if we should render the view
					if (
						(this.ngxTourShowWhen() === 'whenInactive' && index === undefined) ||
						(this.ngxTourShowWhen() === 'whenActive' && index !== undefined) ||
						(this.ngxTourShowWhen() === 'hasPrevious' && Boolean(tour?.[index - 1])) ||
						(this.ngxTourShowWhen() === 'hasNext' && Boolean(tour?.[index + 1]))
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
