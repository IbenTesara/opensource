import { NgxTableSortDirection } from '../enums/sort-direction.enum';

export interface NgxTableAriaLabels {
	/**
	 * The ARIA label we wish to set on the select-all checkbox in the table header
	 */
	selectAll?: string;

	/**
	 * The ARIA label we wish to set on the checkbox/radio button in individual table rows
	 */
	selectRow?: string | ((index: number) => string);

	/**
	 * The ARIA label we wish to set on the expand row button in individual table rows
	 */
	expandRow?: string | ((index: number) => string);

	/**
	 * The ARIA label we wish to set on the collapse row button in individual table rows
	 */
	collapseRow?: string | ((index: number) => string);

	/**
	 * The ARIA label we wish to set on the sort button in individual table headers
	 */
	sortColumn?: string | ((column: string, direction: NgxTableSortDirection | null) => string);

	/**
	 * The ARIA label we wish to set on the selection column header
	 */
	selectionColumn?: string;

	/**
	 * The ARIA label we wish to set on the expansion column header
	 */
	expansionColumn?: string;
}
