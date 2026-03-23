import { Component } from '@angular/core';

import { NgxErrorAbstractComponent } from '@lib/ngx-errors';

@Component({
	selector: 'ngx-error-handler',
	template: ` <button (click)="retry()()">An error occured!</button> `,
})
export class NgxErrorHandlerComponent extends NgxErrorAbstractComponent {}
