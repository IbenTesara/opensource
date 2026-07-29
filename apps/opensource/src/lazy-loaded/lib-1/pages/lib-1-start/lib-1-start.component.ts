import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
	selector: 'lib-1-start-page',
	templateUrl: './lib-1-start.component.html',
	styleUrl: './lib-1-start.component.scss',
	imports: [TranslatePipe],
})
export class Lib1StartComponent {}
