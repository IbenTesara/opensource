import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { from,of,switchMap } from 'rxjs';

import {
	NgxModalService,
	NgxToastContainerComponent,
	NgxToastService,
	NgxTooltipDirective,
	NgxTourService,
	NgxTourShowWhenDirective,
} from '@lib/ngx-inform';

@Component({
	imports: [
		RouterModule,
		NgxTourShowWhenDirective,
		NgxTooltipDirective,
		NgxToastContainerComponent,
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
	private toastAmount: number = 1;

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
}
