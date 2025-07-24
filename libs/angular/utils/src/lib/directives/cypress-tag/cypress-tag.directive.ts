import {
	computed,
	Directive,
	input,
	InputSignal,
	Signal,
} from '@angular/core';
import { get } from 'lodash';

@Directive({
	selector: '[cypressTag]',
	standalone: true,
	host: {
		'attr.data-cy': 'tag()',
	},
})
export class NgxCypressTagDirective<TagPath extends string> {
	public tag: Signal<string> = computed(() => {
		return get({}, this.cypressTag());
	});

	/**
	 * Sets the tag for Cypress
	 */
	public cypressTag: InputSignal<TagPath> = input.required();
}
