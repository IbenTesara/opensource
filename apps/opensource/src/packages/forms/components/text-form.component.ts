import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { createAccessorProviders, NgxDynamicFormInputComponent } from '@lib/ngx-forms';

@Component({
	selector: 'text-form',
	template: `
		<p>{{ options() }}</p>
		<input type="text" [formControl]="form" />
	`,
	imports: [ReactiveFormsModule],
	providers: [createAccessorProviders(TextFormComponent)],
})
export class TextFormComponent extends NgxDynamicFormInputComponent<
	string,
	string,
	FormControl<string>
> {
	override initForm(): FormControl<string> {
		return new FormControl();
	}
}
