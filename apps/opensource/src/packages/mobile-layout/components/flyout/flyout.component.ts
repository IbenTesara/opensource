import { Component, inject } from '@angular/core';

import { NgxMobileLayoutService } from '@lib/ngx-layout';

@Component({
	selector: 'flyout',
	template: `<p>Hey, this is a flyout!</p>
		<button (click)="close()">Close</button>`,
})
export class FlyoutComponent {
	private layoutService: NgxMobileLayoutService = inject(NgxMobileLayoutService);

	public close(): void {
		this.layoutService.closeFlyout();
	}
}
