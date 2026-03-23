import { ProviderToken, Type } from '@angular/core';

import { NgxErrorAbstractComponent, NgxErrorHandler } from '../abstracts';

import { NgxError } from './error.type';

export type NgxErrorBoundaryPriority = 'high' | 'medium' | 'low' | 'ignore';
export type NgxErrorBoundaryHandlers = Partial<
	Record<NgxErrorBoundaryPriority, ProviderToken<NgxErrorHandler>>
>;

export interface NgxErrorBoundaryConfiguration {
	handler: Type<NgxErrorHandler>;
	component?: Type<NgxErrorAbstractComponent>;
}

export interface NgxErrorBoundary {
	id: string;
	retry: () => void;
	renderError: (error: NgxError, component?: Type<NgxErrorAbstractComponent>) => void;
	priority: NgxErrorBoundaryPriority;
}
