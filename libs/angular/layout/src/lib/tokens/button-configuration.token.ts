import { InjectionToken } from '@angular/core';

import { NgxButtonConfiguration } from '../types';
/**
 * A token to provide the necessary configuration to the NgxButton directive
 */
export const NgxButtonConfigurationToken = new InjectionToken<NgxButtonConfiguration>(
	'NgxButtonConfiguration'
);
