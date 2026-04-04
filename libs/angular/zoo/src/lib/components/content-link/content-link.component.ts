import { Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxLinkDirective } from '@ibenvandeveire/ngx-layout';

import { NgxContentLink } from '../../types';

@Component({
	selector: 'ngx-content-link',
	template: ` @if (link().destination === 'external') {
			<a
				ngxLink
				[linkType]="link().linkType"
				[linkWidth]="link().linkWidth"
				[priority]="link().priority"
				[context]="link().context"
				[icon]="link().icon"
				[iconPosition]="link().iconPosition"
				[destination]="link().destination"
				[href]="link().link[0]"
			>
				{{ link().text }}
			</a>
		} @else {
			<a
				ngxLink
				[linkType]="link().linkType"
				[linkWidth]="link().linkWidth"
				[priority]="link().priority"
				[context]="link().context"
				[icon]="link().icon"
				[iconPosition]="link().iconPosition"
				[destination]="link().destination"
				[routerLink]="link().link"
			>
				{{ link().text }}
			</a>
		}`,
	imports: [NgxLinkDirective, RouterLink],
})
export class NgxContentLinkComponent {
	public readonly link: InputSignal<NgxContentLink> = input.required();
}
