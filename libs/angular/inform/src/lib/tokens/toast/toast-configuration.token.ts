import { InjectionToken } from '@angular/core';

import { NgxToastDefaultConfiguration } from '../../types';

/**
 * A token to provide the optional configuration to the NgxToastService
 */
// This is exported due to testing frameworks (like Storybook) not being able to resolve the InjectionToken in the `provideNgxTooltipConfiguration`.
export const NgxToastConfigurationToken = new InjectionToken<NgxToastDefaultConfiguration>(
	'NgxToastConfiguration'
);
