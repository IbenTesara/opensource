import { Provider } from '@angular/core';

import { NgxMediaQueriesToken } from '../../tokens';
import { NgxMediaQuery } from '../../types';

/**
 * Provides an optional list of media queries for the `NgxMediaQueryService`
 *
 * @param queries - A list of queries
 */
export const provideNgxMediaQueries = (queries: NgxMediaQuery[]): Provider => {
	return {
		provide: NgxMediaQueriesToken,
		useValue: queries,
	};
};
