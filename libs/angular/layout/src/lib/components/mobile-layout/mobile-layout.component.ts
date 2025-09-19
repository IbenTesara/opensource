import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, inject, OnInit, Signal, TemplateRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';

import { NgxMobileLayoutService } from '../../services';
import { NgxMobileLayout } from '../../types';

/**
 * A component used to render a mobile-first layout
 */
@Component({
	selector: 'ngx-mobile-layout',
	imports: [NgComponentOutlet, NgTemplateOutlet, RouterModule],
	templateUrl: './mobile-layout.component.html',
})
export class NgxMobileLayoutComponent implements OnInit {
	/**
	 * The instance of the NgxMobileLayoutService
	 */
	protected readonly layoutService: NgxMobileLayoutService = inject(NgxMobileLayoutService);

	/**
	 * The currently displayed layout
	 */
	protected layout: Signal<NgxMobileLayout> = toSignal(this.layoutService.layout$);

	/**
	 * Whether the flyout needs to be shown
	 */
	protected readonly flyoutShown: Signal<boolean> = this.layoutService.flyoutShown;

	/**
	 * Whether the aside needs to be shown
	 */
	protected readonly asideShown: Signal<boolean> = this.layoutService.asideShown;

	/**
	 * An optional template we can pass to replace the default routerOutlet
	 */
	public readonly contentTemplate = contentChild<TemplateRef<any>>('contentTmpl');

	ngOnInit(): void {
		// Iben: Sets up the initial layout if one was provided
		this.layoutService.setUpInitialLayout();
	}
}
