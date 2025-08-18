import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
	selector: 'page-1',
	template: `{{ 'content' | translate }}`,
	imports: [TranslatePipe],
})
export class Page1Component {}
