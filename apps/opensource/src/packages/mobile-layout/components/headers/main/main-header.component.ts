import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'main-header',
	changeDetection: ChangeDetectionStrategy.Eager,
	template: 'Hello, this is the main header!',
})
export class MainHeaderComponent {}
