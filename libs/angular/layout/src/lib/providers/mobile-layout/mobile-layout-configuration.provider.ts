import { Provider } from '@angular/core';

import { NgxMobileLayoutConfigurationToken } from '../../tokens';
import { NgxMobileLayout } from '../../types';

/**
 * Provides an optional configuration for the `NgxMobileLayoutService`
 *
 * @param configuration - The optional configuration
 */
export const provideNgxMobileLayoutConfiguration = (configuration: NgxMobileLayout): Provider => {
	return {
		provide: NgxMobileLayoutConfigurationToken,
		useValue: configuration,
	};
};
