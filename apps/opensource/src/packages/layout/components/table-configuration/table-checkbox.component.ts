import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxTableSelectTemplateAbstractComponent } from '@lib/ngx-layout';

@Component({
	selector: 'table-checkbox',
	imports: [ReactiveFormsModule],
	template: `
		{{ index() }}

		<input type="checkbox" [formControl]="control()" />
	`,
})
export class TableCheckboxComponent extends NgxTableSelectTemplateAbstractComponent {}
