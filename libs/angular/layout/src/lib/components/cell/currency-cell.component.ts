import { CurrencyPipe } from '@angular/common';
import { Component, ContentChild, TemplateRef, ViewChild, input } from '@angular/core';

import { NgxAbstractTableCellDirective } from './cell.directive';

@Component({
	selector: 'ngx-currency-table-cell',
	providers: [
		{
			provide: NgxAbstractTableCellDirective,
			useExisting: NgxCurrencyTableCellComponent,
		},
	],
	template: `
		<ng-template #cellTmpl let-item>
			{{ item | currency: currency() }}
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

	@ContentChild('headerTmpl', { static: false })
	public override headerTemplate: TemplateRef<any> = undefined;
	/**
	 * A template for the footer of the cell
	 */

	@ContentChild('footerTmpl', { static: false })
	public override footerTemplate: TemplateRef<any> = undefined;

	/**
	 * ViewChild that represents the cell template
	 */

	@ViewChild('cellTmpl', { static: true }) public override cellTemplate: TemplateRef<any> = undefined;

	/**
	 * A generic class to indicate that this is a currency cell
	 */
	public override cellClass: string = 'ngx-currency-table-cell';
}
