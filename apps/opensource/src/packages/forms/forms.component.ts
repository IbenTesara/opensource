import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { NgxFormsErrorsConfigurationToken, NgxFormsErrorsDirective } from '@lib/ngx-forms';

import { DataFormTest } from './components/data-form.component';

@Component({
	selector: 'ngx-forms-page',
	providers: [
		{
			provide: NgxFormsErrorsConfigurationToken,
			useValue: { showWhen: 'touched', errors: { required: 'Dit veld is verplicht' } },
		},
	],
	imports: [ReactiveFormsModule, NgxFormsErrorsDirective, DataFormTest],
	templateUrl: './forms.component.html',
})
export class FormsPageComponent {
	public readonly control: FormControl = new FormControl(null, Validators.required);

	public options = signal(['A', 'B', 'C']);

	public addOption() {
		this.options.update((value) => [...value, new Date().toISOString()]);
	}

	public setValue() {
		this.control.setValue('A');
	}
}
