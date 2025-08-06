import { Route } from '@angular/router';

import { FormsPageComponent } from '../packages/forms/forms.component';
import { NgxLayoutPageComponent } from '../packages/layout/layout.component';

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
		path: '',
		pathMatch: 'full',
		redirectTo: 'forms',
	},
];
