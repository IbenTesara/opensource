import { Provider } from '@angular/core';

import { NgxCypressTagsToken } from '../../tokens';
import { NgxCypressTags } from '../../types';

/**
 * Provides tags for the NgxCypressDirective
 *
 * @param tags - The tags we want to provide to the NgxCypressTagDirective
 */
export const provideNgxCypressTags = (tags: NgxCypressTags): Provider => {
	return {
		provide: NgxCypressTagsToken,
		useValue: tags,
	};
};

