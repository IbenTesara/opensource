import { inject, Injectable, Sanitizer, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Marked, MarkedExtension, MarkedOptions } from 'marked';
import { from, map, Observable, take } from 'rxjs';

import { NgxMarkdownConfigurationToken } from '../../tokens';

/**
 * A service that can be used to parse markdown strings to HTML using the Marked library
 */
@Injectable({
	providedIn: 'root',
})
export class NgxMarkdownService {
	/**
	 * An optional set of configuration for the Marked library
	 */
	private readonly configuration: MarkedExtension[] = inject(NgxMarkdownConfigurationToken, {
		optional: true,
	});

	/**
	 * An instance of the Sanitizer
	 */
	private readonly sanitizer: Sanitizer = inject(DomSanitizer);

	/**
	 * An instance of the Marked library
	 * https://marked.js.org/
	 */
	private markedInstance: Marked = this.configuration
		? new Marked(...this.configuration)
		: new Marked();

	/**
	 * Parse markdown to HTML and sanitizes the HTML string
	 *
	 * @param markdown - The markdown string to parse
	 */
	public parse(markdown: string, options?: Omit<MarkedOptions, 'async'>): Observable<string> {
		// Iben: Parse the markdown string to HTML using the Marked library
		return from(this.markedInstance.parse(markdown, { ...(options || {}), async: true })).pipe(
			take(1),
			// Iben: Sanitize the HTML string
			map((html) => this.sanitizer.sanitize(SecurityContext.HTML, html))
		);
	}

	/**
	 * Get the instance of the Marked library
	 */
	public getMarkedInstance(): Marked {
		return this.markedInstance;
	}
}
