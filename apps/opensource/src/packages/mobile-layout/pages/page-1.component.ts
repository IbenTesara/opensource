import { Component, inject, Injector } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { NgxMobileLayoutService } from '@lib/ngx-layout';

import { FlyoutComponent } from '../components/flyout/flyout.component';

import { Page1Service } from './page1.service';

@Component({
	selector: 'page-1',
	template: `{{ 'content' | translate }} <button (click)="open()">Open flyout</button>`,
	imports: [TranslatePipe],
	providers: [Page1Service],
})
export class Page1Component {
	protected readonly pageService: Page1Service = inject(Page1Service);
	protected readonly layoutService: NgxMobileLayoutService = inject(NgxMobileLayoutService);

	protected open() {
		this.layoutService.openFlyout(FlyoutComponent, {
			injector: Injector.create({
				providers: [{ provide: Page1Service, useValue: this.pageService }],
			}),
		});
	}
}
