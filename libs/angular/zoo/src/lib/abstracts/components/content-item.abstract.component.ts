import { Directive, input, InputSignal } from '@angular/core';

import { NgxContentItem } from '../../types/general.type';

@Directive()
export abstract class NgxContentItemAbstractComponent {
	/**
	 * The content item to display
	 */
	public readonly content: InputSignal<NgxContentItem> = input.required();
}
