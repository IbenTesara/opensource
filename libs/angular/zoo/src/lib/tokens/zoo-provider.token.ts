import { InjectionToken } from '@angular/core';

import { NgxZooProviderAbstractService } from '../abstracts';

export const NgxZooProviderToken = new InjectionToken<NgxZooProviderAbstractService>(
	'NgxZooProviderToken'
);
