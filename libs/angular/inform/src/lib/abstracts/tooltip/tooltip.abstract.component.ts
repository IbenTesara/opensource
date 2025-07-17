import { Directive, HostBinding, HostListener, Input, inject } from '@angular/core';

import { NgxTooltipService } from '../../services';
import { NgxTooltipPosition, NgxTooltipPositionClass } from '../../types';

/**
 * An abstract for the NgxTooltipDirective
 */
@Directive()
export abstract class NgxTooltipAbstractComponent {
	private readonly ngxTooltipService = inject(NgxTooltipService);

	/**
	 * Set tooltip as active
	 */
	@HostListener('mouseenter') showOnMouseEnter() {
		this.ngxTooltipService.setToolTipEvent({
			id: this.id,
			source: 'tooltip',
			active: true,
		});
	}

	/**
	 * Set the tooltip as inactive
	 */
	@HostListener('mouseleave') removeOnMouseOut() {
		this.ngxTooltipService.setToolTipEvent({
			id: this.id,
			source: 'tooltip',
			active: false,
		});
	}

	/**
	 * The role of the component
	 */
	@HostBinding('role') public readonly role = 'tooltip';

	/**
	 * The position class of the tooltip
	 */
	@HostBinding('class') @Input() public positionClass: NgxTooltipPositionClass;

	/**
	 * The id of the tooltip
	 */
	@HostBinding('id') @Input({ required: true }) public id: string;

	/**
	 * The current position of the tooltip
	 */
	@Input({ required: true }) public position: NgxTooltipPosition;

	/**
	 * The text of the tooltip
	 */
	@Input({ required: true }) public text: string;
}
