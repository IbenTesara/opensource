import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgxAccordion, NgxMarkdownPipe } from '@lib/ngx-layout';

@Component({
	selector: 'accordion-test',
	templateUrl: './accordion.component.html',
	styleUrl: './accordion.component.scss',
	imports: [NgxAccordion, NgxMarkdownPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionTestComponent {}
