import { Route } from '@angular/router';

import { NgxMobileLayoutComponent, NgxMobileLayoutGuard } from '@lib/ngx-layout';

import { FormsPageComponent } from '../packages/forms/forms.component';
import { NgxLayoutPageComponent } from '../packages/layout/layout.component';
import { Page1Component } from '../packages/mobile-layout/pages/page-1.component';
import { Page2Component } from '../packages/mobile-layout/pages/page-2.component';
import { NgxSignalStoreComponent } from '../packages/store/store.component';

export const appRoutes: Route[] = [
	{
		path: 'forms',
		component: FormsPageComponent,
	},
	{
		path: 'layout',
		component: NgxLayoutPageComponent,
	},
	{
		path: 'store',
		component: NgxSignalStoreComponent,
	},
	{
		path: 'mobile-layout',
		component: NgxMobileLayoutComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'page2',
			},
			{
				path: 'page1',
				component: Page1Component,
				canActivate: [NgxMobileLayoutGuard],
			},
			{
				path: 'page2',
				component: Page2Component,
				canActivate: [NgxMobileLayoutGuard],
				data: {
					mobileLayout: {
						header: {
							right: null,
						},
					},
				},
			},
		],
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'forms',
	},
];
