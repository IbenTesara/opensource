import { Directive, TemplateRef, contentChild } from '@angular/core';

import { NgxAbstractTableCellDirective } from './cell.directive';

@Directive({
	selector: 'ngx-table-cell',
	providers: [
		{
			provide: NgxAbstractTableCellDirective,
			useExisting: NgxTableCellDirective,
		},
	],
	standalone: true,
})
export class NgxTableCellDirective extends NgxAbstractTableCellDirective {
	/**
	 * A template for the header of the cell
	 */

	public override readonly headerTemplate = contentChild<TemplateRef<any>>('headerTmpl');
	/**
	 * A template for the body of the cell
	 */

	public override readonly cellTemplate = contentChild<TemplateRef<any>>('cellTmpl');
	/**
	 * A template for the footer of the cell
	 */

	public override readonly footerTemplate = contentChild<TemplateRef<any>>('footerTmpl');
}
