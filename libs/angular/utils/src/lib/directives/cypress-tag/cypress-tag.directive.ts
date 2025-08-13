import { computed, Directive, inject, input, InputSignal, Signal } from '@angular/core';
import { get } from 'lodash';

import { NgxCypressTagsToken } from '../../tokens';
import { NgxCypressTagPath, NgxCypressTags } from '../../types';

@Directive({
	selector: '[ngxCypressTag]',
	standalone: true,
	host: {
		'[attr.data-cy]': 'tag()',
	},
})
export class NgxCypressTagDirective {
	/**
	 * The available Cypress tags
	 */
	private tags: NgxCypressTags = inject(NgxCypressTagsToken);

	/**
	 * The actual tag set to the data-cy attribute
	 */
	public tag: Signal<string> = computed(() => {
		return get(this.tags, this.ngxCypressTag());
	});

	/**
	 * Sets the tag for Cypress
	 */
	public ngxCypressTag: InputSignal<NgxCypressTagPath> = input.required();
}
