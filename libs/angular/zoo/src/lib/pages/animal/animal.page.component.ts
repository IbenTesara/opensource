import { Component } from '@angular/core';

import { NgxAnimalPageAbstractComponent } from '../../abstracts';
import { NgxAnimalComponent } from '../../components';

@Component({
	selector: 'ngx-animal-page',
	templateUrl: './animal.page.component.html',
	imports: [NgxAnimalComponent],
})
export class NgxZooAnimalPageComponent extends NgxAnimalPageAbstractComponent {}
