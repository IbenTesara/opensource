import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NgxMobileLayoutComponent } from '@lib/ngx-layout';

@Component({
	selector: 'mobile-layout-page',
	imports: [NgxMobileLayoutComponent, RouterOutlet],
	template: `<ngx-mobile-layout
		><ng-template #contentTmpl>
			Custom:
			<router-outlet />
		</ng-template>
	</ngx-mobile-layout>`,
})
export class NgxMobileLayoutPageComponent {}
