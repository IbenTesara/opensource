import { Directive, input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive()
export class NgxFormsErrorAbstractComponent {
	/**
	 * An array of error messages that can be rendered
	 */
	public readonly errors = input.required<string[]>();
	/**
	 * An array of error keys that can be rendered
	 */
	public readonly errorKeys = input.required<string[]>();
	/**
	 * The error object provided by the control
	 */
	public readonly data = input.required<ValidationErrors>();
}
