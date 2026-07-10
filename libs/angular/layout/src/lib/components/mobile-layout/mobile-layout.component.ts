import { A11yModule } from '@angular/cdk/a11y';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
	Component,
	contentChild,
	effect,
	inject,
	OnInit,
	Signal,
	TemplateRef,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';

import { NgxMobileLayoutService } from '../../services';
import { NgxMobileLayout, NgxMobileLayoutOutletParams } from '../../types';

/**
 * A component used to render a mobile-first layout
 */
@Component({
	selector: 'ngx-mobile-layout',
	imports: [NgComponentOutlet, NgTemplateOutlet, RouterModule, A11yModule],
	templateUrl: './mobile-layout.component.html',
})
export class NgxMobileLayoutComponent implements OnInit {
	/**
	 * The previous active element
	 */
	protected previousActiveElement: HTMLElement;

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
	 * The params context for the aside
	 */
	protected readonly asideParams: Signal<NgxMobileLayoutOutletParams> =
		this.layoutService.asideParams;

	/**
	 * The params context for the flyout
	 */
	protected readonly flyoutParams: Signal<NgxMobileLayoutOutletParams> =
		this.layoutService.flyoutParams;

	/**
	 * An optional template we can pass to replace the default routerOutlet
	 */
	public readonly contentTemplate = contentChild<TemplateRef<any>>('contentTmpl');

	constructor() {
		// Iben: Track the active element when aside or flyout opens to restore focus when they close
		effect(() => {
			const isOpen = this.asideShown() || this.flyoutShown();

			if (isOpen) {
				// Iben: Store the active element before the dialog opens
				if (!this.previousActiveElement && document.activeElement instanceof HTMLElement) {
					this.previousActiveElement = document.activeElement;
				}
			} else {
				// Iben: Restore focus to the original triggering element
				if (this.previousActiveElement) {
					this.previousActiveElement.focus();
					this.previousActiveElement = null;
				}
			}
		});
	}

	ngOnInit(): void {
		// Iben: Sets up the initial layout if one was provided
		this.layoutService.setUpInitialLayout();
	}
}
