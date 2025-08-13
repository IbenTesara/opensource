import { Provider } from '@angular/core';

import { NgxFormsErrorConfigurationOptions } from '../../interfaces';
import { NgxFormsErrorsConfigurationToken } from '../../tokens';

/**
 * Provides the necessary configuration for the NgxFormErrorsDirective
 *
 * @param configuration - The configuration for the directive
 */
export const provideNgxFormErrorsConfiguration = (
	configuration: NgxFormsErrorConfigurationOptions
): Provider => {
	return {
		provide: NgxFormsErrorsConfigurationToken,
		useValue: configuration,
	};
};
