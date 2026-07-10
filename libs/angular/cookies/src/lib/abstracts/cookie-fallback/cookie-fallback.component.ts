import { Directive, input } from '@angular/core';

import { NgxHasCookieConfiguration } from '../../types';

/**
 * An abstract component that can optionally be used as a fallback to content that depends on accepted cookies.
 *
 * ## Accessibility Guidelines
 * - **Blocked Content Explanations**: When extending `NgxCookiesFallBackComponent`, developers must ensure that the custom UI includes clear, descriptive text explaining exactly *why* the content is blocked and *which* categories of cookies must be accepted to unlock it.
 * - **Example**: *"This YouTube video is blocked because you have not accepted Marketing cookies. Accept Marketing cookies to watch this video."*
 */
@Directive()
export abstract class NgxCookiesFallBackComponent {
	/**
	 * The cookies that were required to show the original content
	 */
	readonly cookies = input<NgxHasCookieConfiguration[]>([]);
}
