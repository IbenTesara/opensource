import { Provider } from '@angular/core';

import { NgxTooltipConfigurationToken } from '../../tokens';
import { NgxTooltipConfiguration } from '../../types';

/**
 * Provides the configuration for the NgxTooltipDirective
 *
 * @param configuration - The required configuration
 */
export const provideNgxTooltipConfiguration = (
	configuration: NgxTooltipConfiguration
): Provider => {
	return {
		provide: NgxTooltipConfigurationToken,
		useValue: configuration,
	};
};
