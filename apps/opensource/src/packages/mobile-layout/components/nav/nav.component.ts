import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgxLinkDirective } from '@lib/ngx-layout';

@Component({
	selector: 'navigation',
	imports: [RouterModule, NgxLinkDirective],
	template: `
		<a ngxLink [routerLink]="['page1']"> Page 1 </a>
		<a ngxLink [routerLink]="['page2']"> Page 2 </a>

		<a ngxLink icon="fa fa-hello" destination="external" href="https://www.youtube.com/"
			>YouTube</a
		>
	`,
})
export class NavigationComponent {}
