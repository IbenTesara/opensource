import { ErrorHandler, Provider } from '@angular/core';

import { NgxErrorBoundaryService } from '../services';
import { NgxErrorBoundaryConfigurationToken, NgxErrorBoundaryHandlerToken } from '../token';
import { NgxErrorBoundaryConfiguration } from '../types';

/**
 * Provides the necessary configuration for the NgxDynamicFormComponent
 *
 * @param configuration - The configuration for the component
 */
export const provideNgxErrorBoundaryConfiguration = (
	configuration: NgxErrorBoundaryConfiguration,
): Provider[] => {
	return [
		{
			provide: NgxErrorBoundaryConfigurationToken,
			useValue: configuration.component,
		},
		{
			provide: NgxErrorBoundaryHandlerToken,
			useClass: configuration.handler,
    },
    {
      provide: ErrorHandler,
      useClass: NgxErrorBoundaryService
    }
	];
};
