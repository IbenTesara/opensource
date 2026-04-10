import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { createAccessorProviders, NgxDynamicFormInputComponent } from '@lib/ngx-forms';

@Component({
	selector: 'text-form',
	template: `
		<div [style.margin.px]="15">
			<p>{{ options() }}</p>
			<input type="text" [formControl]="form" />
			{{ form.touched }}
		</div>
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
