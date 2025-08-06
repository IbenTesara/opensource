import { NgComponentOutlet } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs';

import { NgxMobileLayoutService } from '../../services';
import { NgxMobileLayout } from '../../types';

/**
 * A component used to render a mobile-first layout
 */
@Component({
	selector: 'ngx-mobile-layout',
	imports: [NgComponentOutlet, RouterModule],
	templateUrl: './mobile-layout.component.html',
})
export class NgxMobileLayoutComponent implements OnInit {
	/**
	 * The instance of the NgxMobileLayoutService
	 */
	private readonly layoutService: NgxMobileLayoutService = inject(NgxMobileLayoutService);

	/**
	 * The currently displayed layout
	 */
	public layout: Signal<NgxMobileLayout> = toSignal(this.layoutService.layout$);

	/**
	 * A class added to the flyout element when it gets added or removed
	 */
	public flyoutClass: Signal<string> = toSignal(
		this.layoutService.flyoutState$.pipe(
			map((state) =>
				state === 'IN' ? 'ngx-mobile-layout-flyout-in' : 'ngx-mobile-layout-flyout-out'
			)
		)
	);

	ngOnInit(): void {
		// Iben: Sets up the initial layout if one was provided
		this.layoutService.setUpInitialLayout();
	}
}
