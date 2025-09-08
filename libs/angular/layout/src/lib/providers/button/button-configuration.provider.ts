import { Provider } from '@angular/core';

import { NgxButtonConfigurationToken } from '../../tokens';
import { NgxButtonConfiguration } from '../../types';

/**
 * Provides the configuration for the NgxButton directive
 *
 * @param configuration - The required configuration
 */
export const provideNgxButtonConfiguration = (configuration: NgxButtonConfiguration): Provider => {
	return {
		provide: NgxButtonConfigurationToken,
		useValue: configuration,
	};
};
