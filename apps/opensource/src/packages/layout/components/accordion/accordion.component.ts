import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgxAccordion } from '@lib/ngx-layout';

@Component({
	selector: 'accordion-test',
	templateUrl: './accordion.component.html',
	styleUrl: './accordion.component.scss',
	imports: [NgxAccordion],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionTestComponent {}
