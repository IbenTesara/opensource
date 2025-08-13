import { Component } from '@angular/core';

import { NgxCypressTagDirective} from '@lib/ngx-utils';


@Component( {
  selector: 'main-header',
  imports: [NgxCypressTagDirective],
  template: `<h1 [ngxCypressTag]="''">Hello, this is the main header!</h1>`
} )
export class MainHeaderComponent {}
