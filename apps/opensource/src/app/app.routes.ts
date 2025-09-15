import { Route } from '@angular/router';

import {
	NgxI18nEmptyComponent,
	NgxI18nGuard,
	NgxI18nSetLanguageGuard,
	provideWithTranslations,
} from '@lib/ngx-i18n';
import { NgxMobileLayoutDefaultGuard, NgxMobileLayoutGuard } from '@lib/ngx-layout';

import { FormsPageComponent } from '../packages/forms/forms.component';
import { NgxLayoutPageComponent } from '../packages/layout/layout.component';
import { NgxMobileLayoutPageComponent } from '../packages/mobile-layout/mobile-layout.component';
import { Page1Component } from '../packages/mobile-layout/pages/page-1.component';
import { Page2Component } from '../packages/mobile-layout/pages/page-2.component';
import { NgxSignalStoreComponent } from '../packages/store/store.component';

export const appRoutes: Route[] = [
	{
		path: '',
		pathMatch: 'full',
		canActivate: [NgxI18nSetLanguageGuard],
		component: NgxI18nEmptyComponent,
	},
	{
		path: ':language',
		canActivate: [NgxI18nGuard],
		loadChildren: () => [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'forms',
			},
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
			provideWithTranslations(
				{
					path: 'mobile-layout',
					component: NgxMobileLayoutPageComponent,
					loadChildren: () => [
						{
							path: '',
							pathMatch: 'full',
							redirectTo: 'page1',
						},
						{
							path: 'page1',
							component: Page1Component,
						},
						{
							path: 'page2',
							component: Page2Component,
							canActivate: [NgxMobileLayoutGuard],
							canDeactivate: [NgxMobileLayoutDefaultGuard],
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
				['i18n/layout/']
			),
		],
	},
];
