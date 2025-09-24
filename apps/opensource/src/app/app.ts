import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { from, of, switchMap } from 'rxjs';

import {
	NgxModalService,
	NgxToastContainerComponent,
	NgxToastService,
	NgxTooltipDirective,
	NgxTourService,
	NgxTourShowWhenDirective,
} from '@lib/ngx-inform';
import { NgxButtonDirective, NgxMediaQueryDirective, NgxMediaQueryService } from '@lib/ngx-layout';

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
	private toastAmount: number = 1;

	public loading: WritableSignal<boolean> = signal(false);

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
										return from(this.router.navigate(['layout']));
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
		});

		this.toastAmount++;
	}

	public toggleLoading() {
		this.loading.update((loading) => !loading);
	}
}
