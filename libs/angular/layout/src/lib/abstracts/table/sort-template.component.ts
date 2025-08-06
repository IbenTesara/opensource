import { Directive, input, InputSignal} from '@angular/core';

import { NgxTableSortDirection } from '../../enums';

/**
 * An abstract component provided for the NgxTableComponent, allowing to user to set a default sort template for all tables
 *
 */
@Directive()
export abstract class NgxTableSortTemplateAbstractComponent {
	/**
	 * The current sort direction the component has to visualize
	 */
	public direction: InputSignal<NgxTableSortDirection> = input<NgxTableSortDirection>();
}
