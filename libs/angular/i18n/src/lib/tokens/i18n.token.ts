import { InjectionToken } from '@angular/core';

import { NgxI18nConfiguration } from '../i18n.types';

/**
 * A token to pass the i18n configuration to the service
 */
export const NgxI18nConfigurationToken = new InjectionToken<NgxI18nConfiguration>(
	'NgxI18nConfigurationToken'
);
