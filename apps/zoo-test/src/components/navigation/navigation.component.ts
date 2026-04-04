import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgxLinkDirective } from '@lib/ngx-layout';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  imports: [RouterModule, NgxLinkDirective],
})
export class NavigationComponent {}
