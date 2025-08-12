import { Component } from '@angular/core';

import { NgxToastComponent } from '@lib/ngx-inform';

@Component({
	selector: 'toast',
	template: '{{toast().text}} <button (click)="close()">Close</button>',
	styleUrl: './toast.component.scss',
})
export class ToastComponent extends NgxToastComponent {}
