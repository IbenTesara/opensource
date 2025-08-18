import { EnvironmentProviders, Provider } from '@angular/core';
import { Route } from '@angular/router';
import {
	provideChildTranslateService,
	provideTranslateLoader,
	provideTranslateService,
} from '@ngx-translate/core';

import { NgxI18nTranslationLoaderGuard } from '../guards';
import { NgxI18nConfiguration } from '../i18n.types';
import { NgxI18nMultiTranslationHttpLoader } from '../loader';
import { NgxI18nTranslationLoaderResolver } from '../resolvers';
import { NgxI18nService } from '../services';
import { NgxI18nConfigurationToken, NgxI18nTranslationPathsToken } from '../tokens';

/**
 * Returns the root providers for the NgxI18nModule
 *
 * @param config - The configuration for the NgxI18nModule
 * @param translationLoader - An optional translation loader
 */
export const provideNgxI18nConfiguration = (
	config: NgxI18nConfiguration,
	paths?: string[]
): (Provider | EnvironmentProviders)[] => {
	// Iben: Return the providers from the module
	return [
		{
			provide: NgxI18nTranslationPathsToken,
			useValue: paths || config.defaultAssetPaths,
		},
		provideTranslateService({
			loader: provideTranslateLoader(NgxI18nMultiTranslationHttpLoader),
			lang: config.defaultLanguage,
			fallbackLang: config.defaultLanguage,
		}),
		{
			provide: NgxI18nConfigurationToken,
			useValue: config,
		},
		NgxI18nService,
	];
};

/**
 * Returns a route with the provided translations
 *
 * @param route - The route we wish to provide with translations
 * @param translationLoader - An optional translation loader
 */
export const provideWithTranslations = (route: Route, paths: string[]): Route => {
	// Iben: Grab the existing route and extend the providers with the providers from the module
	return {
		...route,
		canActivate: [...(route.canActivate || []), NgxI18nTranslationLoaderGuard],
		providers: [
			...(route.providers || []),
			{
				provide: NgxI18nTranslationPathsToken,
				useValue: paths,
			},
			provideChildTranslateService({
				loader: provideTranslateLoader(NgxI18nMultiTranslationHttpLoader),
			}),
			NgxI18nService,
			NgxI18nTranslationLoaderResolver,
		],
	};
};
