import { InjectionToken } from '@angular/core';

import { NgxCypressTags } from '../types';

/** The configuration token for the NgxCypressTagDirective */
export const NgxCypressTagsToken = new InjectionToken<NgxCypressTags>(
	'NgxCypressTagsToken'
);
