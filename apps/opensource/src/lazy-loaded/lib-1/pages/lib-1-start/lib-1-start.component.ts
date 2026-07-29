import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { LanguageSelectComponent } from '../../../components';

@Component({
	selector: 'lib-1-start-page',
	templateUrl: './lib-1-start.component.html',
	styleUrl: './lib-1-start.component.scss',
	imports: [TranslatePipe, LanguageSelectComponent],
})
export class Lib1StartComponent {}
