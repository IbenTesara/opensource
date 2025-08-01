import { InjectionToken } from '@angular/core';

import { NgxAuthenticationAbstractService } from '../abstracts';
import { NgxAuthenticatedHttpClientConfiguration } from '../types';

/**
 * A token to provide the necessary service to the directives/guard
 */
export const NgxAuthenticationServiceToken = new InjectionToken<NgxAuthenticationAbstractService>(
	'NgxAuthenticationServiceToken'
);

/**
 * A token to provide the necessary urlHandler to the NgxAuthenticatedHttpClient
 */
export const NgxAuthenticationUrlHandlerToken = new InjectionToken<
	NgxAuthenticatedHttpClientConfiguration['baseUrl']
>('NgxAuthenticationUrlHandlerToken');

/**
 * A token to provide the necessary handler to the NgxAuthenticatedHttpInterceptor
 */
export const NgxAuthenticationInterceptorToken = new InjectionToken<
	NgxAuthenticatedHttpClientConfiguration['authenticatedCallHandler']
>('NgxAuthenticationInterceptorToken');
