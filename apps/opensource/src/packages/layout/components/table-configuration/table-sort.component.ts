import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgxTableSortTemplateAbstractComponent } from '@lib/ngx-layout';

@Component({
	selector: 'table-sort',
	template: ``,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSortComponent extends NgxTableSortTemplateAbstractComponent {}
