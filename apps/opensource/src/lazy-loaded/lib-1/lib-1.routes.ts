import { Routes } from '@angular/router';

import { provideWithTranslations } from '@lib/ngx-i18n';

import { TRANSLATION_PATHS } from './i18n';
import { Lib1StartComponent } from './pages';

export const LazyLoadedLib1Routes: Routes = [
	provideWithTranslations(
		{
			path: '',
			component: Lib1StartComponent,
		},
		TRANSLATION_PATHS
	),
];
