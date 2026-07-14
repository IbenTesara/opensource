import { Component, ChangeDetectionStrategy } from '@angular/core';

import { NgxToastComponent } from '@lib/ngx-inform';

@Component({
	selector: 'toast',
	template: '{{toast().text}} <button (click)="close()">Close</button>',
	changeDetection: ChangeDetectionStrategy.Eager,
	styleUrl: './toast.component.scss',
})
export class ToastComponent extends NgxToastComponent {}
