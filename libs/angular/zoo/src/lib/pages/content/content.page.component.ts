import { Component } from '@angular/core';

import { NgxContentPageAbstractComponent } from '../../abstracts';
import { NgxContentItemComponent, NgxContentLinkComponent } from '../../components';

@Component({
	selector: 'ngx-content-page',
	templateUrl: './content.page.component.html',
	imports: [NgxContentItemComponent, NgxContentLinkComponent],
})
export class NgxZooContentPageComponent extends NgxContentPageAbstractComponent {}
