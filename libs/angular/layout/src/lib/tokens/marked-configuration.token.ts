import { InjectionToken } from '@angular/core';
import { MarkedExtension } from 'marked';

/**
 * A token to provide the necessary configuration to NgxMarkdownService
 */
export const NgxMarkdownConfigurationToken = new InjectionToken<MarkedExtension[]>(
	'NgxMarkdownConfigurationToken'
);
