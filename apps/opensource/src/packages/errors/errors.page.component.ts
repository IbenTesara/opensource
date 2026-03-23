import { Component } from '@angular/core';

import { NgxErrorBoundaryDirective } from '@lib/ngx-errors';


@Component({
	selector: 'ngx-errors-page',
  templateUrl: './errors.page.component.html',
  imports: [NgxErrorBoundaryDirective]
})
export class NgxErrorPageComponent {
	public invokeError(): void {
		throw new Error('This is an error!');
	}
}
