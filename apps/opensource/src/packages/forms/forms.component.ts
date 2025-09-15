import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import {
	NgxFormsErrorsConfigurationToken,
	NgxFormsErrorsDirective,
	NgxInputDirective,
} from '@lib/ngx-forms';

@Component({
	selector: 'ngx-forms-page',
	providers: [
		{
			provide: NgxFormsErrorsConfigurationToken,
			useValue: { showWhen: 'touched', errors: { required: 'Dit veld is verplicht' } },
		},
	],
	imports: [ReactiveFormsModule, NgxFormsErrorsDirective, NgxInputDirective],
	templateUrl: './forms.component.html',
})
export class FormsPageComponent {
	public readonly control: FormControl = new FormControl('', Validators.required);
}
