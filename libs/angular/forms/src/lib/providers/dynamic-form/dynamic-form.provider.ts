import { Provider } from '@angular/core';

import { NgxDynamicFormConfigurationToken } from '../../tokens';
import { NgxDynamicFormConfiguration } from '../../types';

/**
 * Provides the necessary configuration for the NgxDynamicFormComponent
 *
 * @param configuration - The configuration for the component
 */
export const provideNgxDynamicFormConfiguration = (
	configuration: NgxDynamicFormConfiguration
): Provider => {
	return {
		provide: NgxDynamicFormConfigurationToken,
		useValue: configuration,
	};
};
