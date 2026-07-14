import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { createAccessorProviders, NgxDynamicFormInputComponent } from '@lib/ngx-forms';

@Component({
	selector: 'text-field',
	template: `<textarea [formControl]="form"></textarea>`,
	imports: [ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.Eager,
	providers: [createAccessorProviders(TextFieldFormComponent)],
})
export class TextFieldFormComponent extends NgxDynamicFormInputComponent<
	null,
	string,
	FormControl<string>
> {
	override initForm(): FormControl<string> {
		return new FormControl();
	}
}
