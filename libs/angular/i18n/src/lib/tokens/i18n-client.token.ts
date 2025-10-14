import { InjectionToken } from '@angular/core';

import { NgxI18nAbstractClient } from '../abstracts';

/**
 * A token to pass the i18n client to the service
 */
export const NgxI18nClientToken = new InjectionToken<NgxI18nAbstractClient>('NgxI18nClientToken');
