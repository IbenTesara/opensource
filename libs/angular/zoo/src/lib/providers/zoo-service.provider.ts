import { Provider, Type } from '@angular/core';
import { provideNgxSignalStore } from '@ibenvandeveire/ngx-store';

import { NgxZooProviderAbstractService } from '../abstracts';
import { NgxZooStore } from '../store';
import { NgxZooProviderToken } from '../tokens';

/**
 * Provides the NgxZooService
 * @param service - The service to provide
 */
export const provideNgxZooService = (service: Type<NgxZooProviderAbstractService>): Provider[] => {
	return [
		{
			provide: NgxZooProviderToken,
			useClass: service,
		},
		provideNgxSignalStore(NgxZooStore),
	];
};
