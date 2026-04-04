import { Component } from '@angular/core';
import { NgxMarkdownPipe } from '@ibenvandeveire/ngx-layout';

import { NgxSectionAbstractComponent } from '../../abstracts';
import { NgxContentItemComponent, NgxAnimalComponent } from '../../components';

@Component({
	selector: 'ngx-section-page',
	templateUrl: './section.page.component.html',
	imports: [NgxContentItemComponent, NgxAnimalComponent, NgxMarkdownPipe],
})
export class NgxZooSectionPageComponent extends NgxSectionAbstractComponent {}
