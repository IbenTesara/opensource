import { Provider } from '@angular/core';

import { NgxModalConfigurationToken } from '../../tokens';
import { NgxModalConfiguration } from '../../types';

/**
 * Provides the configuration for the NgxModalService
 *
 * @param configuration - The required configuration
 */
export const provideNgxModalConfiguration = (configuration: NgxModalConfiguration): Provider => {
	return {
		provide: NgxModalConfigurationToken,
		useValue: configuration,
	};
};
