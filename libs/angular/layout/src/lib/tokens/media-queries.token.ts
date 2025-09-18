import { InjectionToken } from '@angular/core';

import { NgxMediaQuery } from '../types';
/**
 * A list of media queries we wish to listen to on start
 */
export const NgxMediaQueriesToken = new InjectionToken<NgxMediaQuery[]>('NgxMediaQueriesToken');
