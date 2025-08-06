import { InjectionToken } from '@angular/core';

import { NgxMobileLayoutConfiguration } from '../types';

/**
 * An optional token to provide the base mobile configuration to the `NgxMobileLayoutService`
 */
export const NgxMobileLayoutConfigurationToken = new InjectionToken<NgxMobileLayoutConfiguration>(
	'NgxMobileLayoutConfiguration'
);
