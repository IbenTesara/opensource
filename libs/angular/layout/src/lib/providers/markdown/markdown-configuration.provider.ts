import { Provider } from '@angular/core';
import { MarkedExtension } from 'marked';

import { NgxMarkdownConfigurationToken } from '../../tokens';

/**
 * Provides the configuration for the NgxMarkdownService
 *
 * @param configuration - The required configuration
 */
export const provideNgxMarkdownConfiguration = (configuration: MarkedExtension[]): Provider => {
	return {
		provide: NgxMarkdownConfigurationToken,
		useValue: configuration,
	};
};
