import { Directive, input, InputSignal } from '@angular/core';

import { NgxToast } from '../../types';

@Directive({
	host: {
		'attr.role': 'alert',
	},
})
export abstract class NgxToastComponent {
	public toast: InputSignal<NgxToast> = input.required();
}
