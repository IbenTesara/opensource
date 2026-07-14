import { Component, ChangeDetectionStrategy } from '@angular/core';

import { NgxFormsErrorAbstractComponent } from '@lib/ngx-forms';

@Component({
	selector: 'app-error',
	changeDetection: ChangeDetectionStrategy.Eager,
	template: `{{ errors()[0] }}`,
})
export class ErrorComponent extends NgxFormsErrorAbstractComponent {}
