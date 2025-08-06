import { Component } from '@angular/core';

import { NgxMobileLayoutComponent } from '@lib/ngx-layout';


@Component({
	selector: 'mobile-layout-page',
	imports: [NgxMobileLayoutComponent],
	template: `<ngx-mobile-layout />`,
})
export class NgxMobileLayoutPageComponent {}
