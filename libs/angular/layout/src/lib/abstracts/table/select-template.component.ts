import { Directive, input, InputSignal } from '@angular/core';
import { FormControl } from '@angular/forms';

/**
 * An abstract component provided for the NgxTableComponent, allowing to user to set a default select template for all tables
 *
 */
@Directive()
export abstract class NgxTableSelectTemplateAbstractComponent {
	/**
	 * The control we wish to pass to the input
	 */
	public control: InputSignal<FormControl<any>> = input();

	/**
	 * The row that is visualized
	 */
	public row: InputSignal<any> = input<any>();

	/**
	 * The index of the row
	 */
	public index: InputSignal<number> = input<number>();
}
