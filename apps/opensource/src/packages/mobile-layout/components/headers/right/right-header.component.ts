import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

import { NgxMobileLayoutService } from '@lib/ngx-layout';

import { FlyoutComponent } from '../../flyout/flyout.component';

@Component({
	selector: 'right-header',
	changeDetection: ChangeDetectionStrategy.Eager,
	template: '<button (click)="open()">Open</button>',
})
export class RightHeaderComponent {
	private layoutService: NgxMobileLayoutService = inject(NgxMobileLayoutService);

	public open(): void {
		this.layoutService.openFlyout(FlyoutComponent, {
			label: 'Header Flyout',
		});
	}
}
