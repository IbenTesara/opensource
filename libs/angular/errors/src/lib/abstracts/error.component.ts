import { Directive, input, InputSignal } from '@angular/core';

import { NgxError } from '../types';

@Directive()
export abstract class NgxErrorAbstractComponent {
	/**
	 * The encountered error
	 */
	public readonly error: InputSignal<NgxError> = input();

	/**
	 * The retry function to rerender the initial template
	 */
	public readonly retry: InputSignal<() => void> = input.required();
}
