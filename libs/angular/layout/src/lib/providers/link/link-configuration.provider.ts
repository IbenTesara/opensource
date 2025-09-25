import { Provider } from '@angular/core';

import { NgxLinkConfigurationToken } from '../../tokens';
import { NgxLinkConfiguration } from '../../types';

/**
 * Provides the configuration for the NgxLink directive
 *
 * @param configuration - The required configuration
 */
export const provideNgxLinkConfiguration = (configuration: NgxLinkConfiguration): Provider => {
	return {
		provide: NgxLinkConfigurationToken,
		useValue: configuration,
	};
};
