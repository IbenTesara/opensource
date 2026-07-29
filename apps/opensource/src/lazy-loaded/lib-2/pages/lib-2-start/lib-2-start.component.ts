import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { LanguageSelectComponent } from '../../../components';

@Component({
	selector: 'lib-2-start-page',
	templateUrl: './lib-2-start.component.html',
	styleUrl: './lib-2-start.component.scss',
	imports: [TranslatePipe, LanguageSelectComponent],
})
export class Lib2StartComponent {}
