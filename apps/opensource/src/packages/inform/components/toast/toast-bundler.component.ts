import { Component, ChangeDetectionStrategy } from '@angular/core';

import { NgxToastBundlerComponent } from '@lib/ngx-inform';

@Component({
	selector: 'toast-bundler',
	changeDetection: ChangeDetectionStrategy.Eager,
	template: `<button (click)="showBundled()">{{ amount() }} toasts remaining.</button>`,
})
export class ToastBundlerComponent extends NgxToastBundlerComponent {}
