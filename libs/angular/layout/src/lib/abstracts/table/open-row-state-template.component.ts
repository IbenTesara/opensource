import { Directive, input, InputSignal } from '@angular/core';

/**
 * An abstract component provided for the NgxTableComponent, allowing to user to set a default open row state template for all tables
 *
 */
@Directive()
export abstract class NgxTableOpenRowStateTemplateAbstractComponent {
	/**
	 * The current open state the component has to visualize
	 */
	public isOpen: InputSignal<boolean> = input<boolean>();

	/**
	 * The row data
	 */
	public row: InputSignal<any> = input<any>();

	/**
	 * The index of the row
	 */
	public index: InputSignal<number> = input<number>();
}
