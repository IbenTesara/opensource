import { Component } from '@angular/core';
import { NgxMarkdownPipe } from '@ibenvandeveire/ngx-layout';

import { NgxContentItemAbstractComponent } from '../../abstracts';
import { NgxContentLinkComponent } from '../content-link/content-link.component';

@Component({
	selector: 'ngx-content-item',
	templateUrl: './content-item.component.html',
	imports: [NgxContentLinkComponent, NgxMarkdownPipe],
})
export class NgxContentItemComponent extends NgxContentItemAbstractComponent {}
