import { InjectionToken } from '@angular/core';

import { NgxErrorHandler } from '../abstracts';
import { NgxErrorBoundaryConfiguration } from '../types';
/**
 * A token to provide the necessary configuration to the NgxErrorsService
 */
export const NgxErrorBoundaryConfigurationToken =
	new InjectionToken<NgxErrorBoundaryConfiguration>('NgxErrorBoundaryConfiguration');

  export const NgxErrorBoundaryHandlerToken = new InjectionToken<NgxErrorHandler>(
		'NgxErrorBoundaryConfiguration'
  );
