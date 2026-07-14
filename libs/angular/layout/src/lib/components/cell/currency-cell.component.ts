import { CurrencyPipe } from '@angular/common';
import { Component, TemplateRef, contentChild, input, viewChild } from '@angular/core';

import { NgxAbstractTableCellDirective } from './cell.directive';

@Component({
	selector: 'ngx-table-currency-cell',
	providers: [
		{
			provide: NgxAbstractTableCellDirective,
			useExisting: NgxCurrencyTableCellComponent,
		},
	],
	template: `
		<ng-template #cellTmpl let-item>
			{{ item | currency : currency() }}
		</ng-template>
	`,
	imports: [CurrencyPipe],
})
export class NgxCurrencyTableCellComponent extends NgxAbstractTableCellDirective {
	/**
	 * The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format of the provided amount, by default `EUR`
	 */
	public readonly currency = input('EUR');

	/**
	 * A template for the header of the cell
	 */

	public override readonly headerTemplate = contentChild<TemplateRef<any>>('headerTmpl');
	/**
	 * A template for the footer of the cell
	 */

	public override readonly footerTemplate = contentChild<TemplateRef<any>>('footerTmpl');

	/**
	 * ViewChild that represents the cell template
	 */

	public override readonly cellTemplate = viewChild<TemplateRef<any>>('cellTmpl');

	/**
	 * A generic class to indicate that this is a currency cell
	 */
	public override cellClass: string = 'ngx-currency-table-cell';
}
