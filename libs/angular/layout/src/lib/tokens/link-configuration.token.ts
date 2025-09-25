import { InjectionToken } from '@angular/core';

import { NgxLinkConfiguration } from '../types';
/**
 * A token to provide the necessary configuration to the NgxLink directive
 */
export const NgxLinkConfigurationToken = new InjectionToken<NgxLinkConfiguration>(
	'NgxLinkConfiguration'
);
