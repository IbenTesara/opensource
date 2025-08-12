import { Provider } from '@angular/core';

import { NgxToastConfigurationToken } from '../../tokens';
import { NgxToastDefaultConfiguration } from '../../types';

/**
 * Provides the configuration for the NgxModalService
 *
 * @param configuration - The required configuration
 */
export const provideNgxToastConfiguration = (
	configuration: NgxToastDefaultConfiguration
): Provider => {
	if (
		!configuration.autoClose &&
		configuration.maxTime !== undefined &&
		configuration.maxTime < 5000
	) {
		console.error(
			'@ibenvandeveire/ngx-inform/NgxToast: The provided maxTime for the toasts is less than 5 seconds. From an accessibility perspective, any alert should be visible for at least 5 seconds.'
		);
	}
	return {
		provide: NgxToastConfigurationToken,
		useValue: configuration,
	};
};
