import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
	selector: 'lib-2-start-page',
	templateUrl: './lib-2-start.component.html',
	styleUrl: './lib-2-start.component.scss',
	imports: [TranslatePipe],
})
export class Lib2StartComponent {}
