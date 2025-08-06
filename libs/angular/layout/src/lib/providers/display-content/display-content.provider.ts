import { Provider } from '@angular/core';

import { NgxDisplayContentConfigurationToken } from '../../tokens';
import { NgxDisplayContentConfiguration } from '../../types';

/**
 * Provides the configuration for the NgxDisplayContent directive
 *
 * @param configuration - The required configuration
 */
export const provideNgxDisplayContentConfiguration = (
	configuration: NgxDisplayContentConfiguration
): Provider => {
	return {
		provide: NgxDisplayContentConfigurationToken,
		useValue: configuration,
	};
};
