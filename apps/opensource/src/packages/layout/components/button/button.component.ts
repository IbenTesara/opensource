import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { NgxButtonDirective } from '@lib/ngx-layout';

@Component({
	selector: 'button-child-test',
	template: `{{ label() ? 'YE' : 'HA' }} {{ label() }}`,
})
export class ButtonChildComponent {
	public label = input();
}

@Component({
	selector: 'button-test',
	template: `<button ngxButton>
		<button-child-test [label]="label()" />
	</button>`,
	imports: [NgxButtonDirective, ButtonChildComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonTestComponent {
	public label = input();
}
