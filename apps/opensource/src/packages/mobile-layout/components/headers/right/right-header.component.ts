import { Component, inject } from '@angular/core';

import { NgxMobileLayoutService } from '@lib/ngx-layout';

@Component({
	selector: 'right-header',
	template: '<button (click)="open()">Open</button>',
})
export class RightHeaderComponent {
	private layoutService: NgxMobileLayoutService = inject(NgxMobileLayoutService);

	public open(): void {
		this.layoutService.openFlyout();
	}
}
