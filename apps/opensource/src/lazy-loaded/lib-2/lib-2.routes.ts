import { Routes } from '@angular/router';

import { provideWithTranslations } from '@lib/ngx-i18n';

import { TRANSLATION_PATHS } from './i18n';
import { Lib2StartComponent } from './pages';
import { startResolver } from './resolvers';

export const LazyLoadedLib2Routes: Routes = [
	provideWithTranslations(
		{
			path: '',
			component: Lib2StartComponent,
			resolve: {
				data: startResolver,
			},
		},
		TRANSLATION_PATHS
	),
];
