import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'navigation',
	imports: [RouterModule],
	template: `
		<a [routerLink]="['page1']"> Page 1 </a>
		<a [routerLink]="['page2']"> Page 2 </a>
	`,
})
export class NavigationComponent {}
