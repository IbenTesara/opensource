import { Component, ChangeDetectionStrategy } from '@angular/core';

import { NgxTooltipAbstractComponent } from '@lib/ngx-inform';

@Component({
	selector: 'tooltip',
	changeDetection: ChangeDetectionStrategy.Eager,
	template: `{{ text() }}`,
})
export class TooltipComponent extends NgxTooltipAbstractComponent {}
