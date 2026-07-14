import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'page-2',
	changeDetection: ChangeDetectionStrategy.Eager,
	template: 'This is the second page!',
})
export class Page2Component {}
