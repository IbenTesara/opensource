import { InjectionToken } from '@angular/core';

/**
 * A token to pass the i18n paths to the service
 */
export const NgxI18nTranslationPathsToken = new InjectionToken<string[]>(
	'NgxI18nTranslationPathsToken'
);
