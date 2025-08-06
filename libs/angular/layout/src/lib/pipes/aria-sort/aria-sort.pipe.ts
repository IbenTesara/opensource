import { Pipe, PipeTransform } from '@angular/core';

import { NgxAbstractTableCellDirective } from '../../components';
import { NgxTableSortEvent } from '../../types';


@Pipe({
	name: 'ngxAriaSort',
	standalone: true,
})
export class NgxAriaSortPipe implements PipeTransform {
	transform(value: {
		currentSorting: NgxTableSortEvent;
		cell: NgxAbstractTableCellDirective;
	}): 'none' | 'ascending' | 'descending' {
		const { cell } = value;

		if (!cell || !cell.sortDirection) {
			return 'none';
		}

		return cell.sortDirection.toLocaleLowerCase() as 'ascending' | 'descending';
	}
}
