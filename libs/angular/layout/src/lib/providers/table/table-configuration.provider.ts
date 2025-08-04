import { Provider } from '@angular/core';

import { NgxTableConfiguration, NgxTableConfigurationToken } from '../../tokens';

/**
 * Provides the optional configuration for the NgxTable component
 *
 * @param configuration - The provided of configuration
 */
export const provideNgxTableConfiguration = (configuration: NgxTableConfiguration): Provider => {
	return {
		provide: NgxTableConfigurationToken,
		useValue: configuration,
	};
};
