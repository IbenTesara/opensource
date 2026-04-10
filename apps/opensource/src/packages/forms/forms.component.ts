import { Component, signal } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import {
	NgxDynamicFormComponent,
	NgxFormsErrorsConfigurationToken,
	NgxFormsErrorsDirective,
	provideNgxDynamicFormConfiguration,
} from '@lib/ngx-forms';

import { DataFormTest } from './components/data-form.component';
import { ErrorComponent } from './components/errors.component';
import { TextFieldFormComponent } from './components/text-field.component';
import { TextFormComponent } from './components/text-form.component';

@Component({
	selector: 'ngx-forms-page',
	providers: [
		{
			provide: NgxFormsErrorsConfigurationToken,
			useValue: {
				showWhen: 'touched',
				errors: { required: 'Dit veld is verplicht' },
				location: 'before',
				component: ErrorComponent,
			},
		},
		provideNgxDynamicFormConfiguration({
			text: TextFormComponent,
			textField: TextFieldFormComponent,
		}),
	],
	imports: [ReactiveFormsModule, NgxFormsErrorsDirective, DataFormTest, NgxDynamicFormComponent],
	templateUrl: './forms.component.html',
})
export class FormsPageComponent {
	public readonly control: FormControl = new FormControl(null, Validators.required);

	public textControl = new FormControl('', Validators.required);
	public textFieldControl = new FormControl('', Validators.required);

	public options = signal(['A', 'B', 'C']);

	public addOption() {
		this.options.update((value) => [...value, new Date().toISOString()]);
	}

	public setValue() {
		this.control.setValue('A');
	}

	public markElementAsTouched(control: AbstractControl) {
		control.markAsTouched();
	}
}
