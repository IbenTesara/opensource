import { Component, inject } from '@angular/core';

import { NgxMobileLayoutService } from '@lib/ngx-layout';

import { Page1Service } from '../../pages/page1.service';

@Component({
	selector: 'flyout',
	template: ` <p>Hey, this is a flyout!</p>
		{{ pageService?.name }}
		<button (click)="close()">Close</button>`,
})
export class FlyoutComponent {
	private layoutService: NgxMobileLayoutService = inject(NgxMobileLayoutService);

	public pageService: Page1Service = inject(Page1Service, { optional: true });

	public close(): void {
		this.layoutService.closeFlyout();
	}
}
