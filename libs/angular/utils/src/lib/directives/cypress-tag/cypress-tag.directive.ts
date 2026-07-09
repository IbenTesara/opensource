import { computed, Directive, input, InputSignal, Signal } from '@angular/core';

@Directive({
	selector: '[cypressTag]',
	standalone: true,
	host: {
		'[attr.data-cy]': 'tag()',
	},
})
export class NgxCypressTagDirective<TagPath extends string> {
	public tag: Signal<string> = computed(() => {
		return this.cypressTag()
			.split('.')
			.reduce<unknown>(
				(acc, key) => (acc == null ? undefined : (acc as Record<string, unknown>)[key]),
				{}
			) as string;
	});

	/**
	 * Sets the tag for Cypress
	 */
	public cypressTag: InputSignal<TagPath> = input.required();
}
