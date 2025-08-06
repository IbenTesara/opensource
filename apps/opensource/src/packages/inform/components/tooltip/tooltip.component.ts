import { Component } from '@angular/core';

import { NgxTooltipAbstractComponent } from '@lib/ngx-inform';

@Component( {
  selector: 'tooltip',
  template: `{{text()}}`
} )
export class TooltipComponent extends NgxTooltipAbstractComponent { };
