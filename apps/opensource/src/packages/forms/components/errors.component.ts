import { Component } from '@angular/core';

import { NgxFormsErrorAbstractComponent } from '@lib/ngx-forms';

@Component({
	selector: 'app-error',
	template: `{{ errors()[0] }}`,
})
export class ErrorComponent extends NgxFormsErrorAbstractComponent {}
