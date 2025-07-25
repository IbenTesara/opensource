import { Directive, OutputEmitterRef, TemplateRef, input, output } from '@angular/core';

import { NgxTableSortDirection } from '../../enums/sort-direction.enum';
import { NgxTableCypressDataTags, NgxTableSortEvent } from '../../types';

@Directive({
	selector: 'ngx-abstract-table-cell',
	standalone: true,
})
export class NgxAbstractTableCellDirective {
	/**
	 * The current sortDirection of the cell
	 */
	public sortDirection: NgxTableSortDirection | null = null;

	/**
	 * The templates used to set in the table
	 */
	public footerTemplate: TemplateRef<any>;
	public headerTemplate: TemplateRef<any>;
	public cellTemplate: TemplateRef<any>;

	/**
	 * An optional class that can be set for the cell
	 */
	public cellClass: string;

	/**
	 * The name of the column we want this cell to represent
	 */
	public readonly column = input.required<string>();

	/**
	 * Whether or not the cell is sortable
	 */
	public readonly sortable = input<boolean>(false);

	/**
	 * A tag that can be added to a column in the table, set according to the cypress best practices
	 * See https://docs.cypress.io/guides/references/best-practices#Selecting-Elements
	 */
	public readonly cypressDataTags = input<NgxTableCypressDataTags>();

	/**
	 * Whether the content of a cell is editable. By default, this is set to false
	 */
	public readonly editable = input<boolean>(false);

	/**
	 * Emits the sortable event if a column is sortable
	 */
	public sort: OutputEmitterRef<NgxTableSortEvent> = output<NgxTableSortEvent>();

	/**
	 * Handles the sorting click events
	 */
	public handleSort(): void {
		// Iben: Setup the sort direction
		let newSortDirection = NgxTableSortDirection.ASCENDING;

		// Iben: If a an existing sorting direction exists, we switch based on the ones we have
		if (this.sortDirection) {
			newSortDirection =
				this.sortDirection === NgxTableSortDirection.ASCENDING
					? NgxTableSortDirection.DESCENDING
					: NgxTableSortDirection.ASCENDING;
		}

		// Iben: Set the internal sorting direction
		this.setSortDirection(newSortDirection);

		// Iben: Emit the sorting event
		this.sort.emit({
			direction: this.sortDirection,
			column: this.column(),
		});
	}

	/**
	 * Resets the sort direction back to null
	 */
	public resetSortDirection(): void {
		this.sortDirection = null;
	}

	/**
	 * Sets the sorting direction based on the provided direction
	 *
	 * @param direction - The provided direction
	 */
	public setSortDirection(direction: NgxTableSortDirection): void {
		this.sortDirection = direction;
	}
}
