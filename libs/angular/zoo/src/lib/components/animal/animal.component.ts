import { Component } from '@angular/core';

import { NgxAnimalAbstractComponent } from '../../abstracts';
import { NgxContentItemComponent } from '../content-item/content-item.component';
import { NgxContentLinkComponent } from '../content-link/content-link.component';

@Component({
	selector: 'ngx-animal',
	templateUrl: './animal.component.html',
	imports: [NgxContentLinkComponent, NgxContentItemComponent],
})
export class NgxAnimalComponent extends NgxAnimalAbstractComponent {}
