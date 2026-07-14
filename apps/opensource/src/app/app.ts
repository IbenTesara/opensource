import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
	NavigationCancel,
	NavigationEnd,
	NavigationError,
	NavigationStart,
	Router,
	RouterModule,
} from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, from, map, of, switchMap } from 'rxjs';

import { NgxI18nService } from '@lib/ngx-i18n';
import {
	NgxModalService,
	NgxToastContainerComponent,
	NgxToastService,
	NgxTooltipDirective,
	NgxTourService,
	NgxTourShowWhenDirective,
} from '@lib/ngx-inform';
import {
	NgxButtonDirective,
	NgxMatchesQueryPipe,
	NgxMediaQueryDirective,
	NgxMediaQueryService,
} from '@lib/ngx-layout';

import { ButtonTestComponent } from '../packages/layout/components/button/button.component';

@Component({
	imports: [
		RouterModule,
		NgxTourShowWhenDirective,
		NgxTooltipDirective,
		NgxToastContainerComponent,
		TranslatePipe,
		NgxButtonDirective,
		NgxMediaQueryDirective,
		ButtonTestComponent,
		NgxMatchesQueryPipe,
	],
	selector: 'app-root',
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App {
	private readonly tourService = inject(NgxTourService);
	private readonly toastService = inject(NgxToastService);
	private readonly modalService = inject(NgxModalService);
	private readonly router: Router = inject(Router);
	private readonly mediaQueryService = inject(NgxMediaQueryService);
	protected readonly i18nService: NgxI18nService = inject(NgxI18nService);
	private toastAmount: number = 1;

	public loading: WritableSignal<boolean> = signal(false);

	/**
	 * Guards/resolvers on a route (e.g. the lib-2 start resolver) can take a while to settle.
	 * Angular keeps the previously activated route rendered in the meantime, so without this
	 * indicator that wait is invisible and a click during it just cancels the navigation.
	 */
	public readonly navigating: Signal<boolean> = toSignal(
		this.router.events.pipe(
			filter(
				(event) =>
					event instanceof NavigationStart ||
					event instanceof NavigationEnd ||
					event instanceof NavigationCancel ||
					event instanceof NavigationError
			),
			map((event) => event instanceof NavigationStart)
		),
		{ initialValue: false }
	);

	constructor() {
		this.mediaQueryService.currentQueryMatch$.subscribe(console.log);
	}

	public startTour() {
		this.modalService
			.open({ type: 'confirm', describedById: 'confirm', label: 'Confirm' })
			.pipe(
				switchMap((action) => {
					return action === 'Decline'
						? of()
						: this.tourService.startTour([
								{ title: 'Hello!', content: 'Welcome to the tour!' },
								{
									title: `Let's get started!`,
									content: `During this tour we'll take you through the application`,
								},
								{
									title: 'Display content',
									delay: 100,
									content: 'This is where we have the display content directive!',
									tourItem: 'display-content',
									beforeVisible: () => {
										return from(this.router.navigate(['../../en', 'layout']));
									},
								},
						  ]);
				})
			)
			.subscribe();
	}

	public showToast() {
		this.toastService.showToast({
			text: `Hello, this is toast ${this.toastAmount}`,
			configuration: {
				autoClose: false,
			},
		});

		this.toastAmount++;
	}

	public toggleLoading() {
		this.loading.update((loading) => !loading);
	}
}
