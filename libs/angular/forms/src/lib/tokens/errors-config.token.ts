import { InjectionToken } from '@angular/core';

import { NgxFormsErrorConfigurationOptions } from '../types';

export const NgxFormsErrorsConfigurationToken =
	new InjectionToken<NgxFormsErrorConfigurationOptions>('NgxFormsErrorsConfiguration');
