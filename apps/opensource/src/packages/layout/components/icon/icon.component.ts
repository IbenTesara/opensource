import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgxDisplayContentComponent } from '@lib/ngx-layout';

@Component({
	selector: 'ui-icon',
	template: `<i [class]="data()"></i>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent extends NgxDisplayContentComponent {}
