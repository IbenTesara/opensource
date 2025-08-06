import { Component } from '@angular/core';

import { NgxModalAbstractComponent } from '@lib/ngx-inform';

@Component({
	selector: 'confirm-modal',
	template: `
		<p id="confirm">Do you wish to confirm this?</p>
		<button (click)="action.emit('Confirm')">Confirm!</button>
		<button (click)="action.emit('Decline')">Decline!</button>
	`,
	styleUrl: './confirm.component.scss',
})
export class ConfirmModalComponent extends NgxModalAbstractComponent<'Confirm' | 'Decline'> {}
