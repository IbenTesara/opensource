import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { createAccessorProviders, DataFormAccessor } from '@lib/ngx-forms';

@Component({
	selector: 'data-form',
	templateUrl: './data-form.component.html',
	providers: [createAccessorProviders(DataFormTest)],
	imports: [ReactiveFormsModule, JsonPipe],
})
export class DataFormTest extends DataFormAccessor<string[]> {
	override initForm(data: unknown): FormControl<any> {
		return new FormControl();
	}
}
