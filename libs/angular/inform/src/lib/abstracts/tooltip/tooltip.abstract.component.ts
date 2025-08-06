import { Directive, HostListener, inject, input } from '@angular/core';

import { NgxTooltipService } from '../../services';
import { NgxTooltipPosition, NgxTooltipPositionClass } from '../../types';

/**
 * An abstract for the NgxTooltipDirective
 */
@Directive({
	host: {
		id: 'id()',
    class: 'positionClass()',
    'attr.role': 'tooltip'
	},
})
export abstract class NgxTooltipAbstractComponent {
	private readonly ngxTooltipService = inject(NgxTooltipService);

	/**
	 * Set tooltip as active
	 */
	@HostListener('mouseenter') showOnMouseEnter() {
		this.ngxTooltipService.setToolTipEvent({
			id: this.id(),
			source: 'tooltip',
			active: true,
		});
	}

	/**
	 * Set the tooltip as inactive
	 */
	@HostListener('mouseleave') removeOnMouseOut() {
		this.ngxTooltipService.setToolTipEvent({
			id: this.id(),
			source: 'tooltip',
			active: false,
		});
	}

	/**
	 * The position class of the tooltip
	 */
	/**
	 * The position class of the tooltip
	 */
	public readonly positionClass = input<NgxTooltipPositionClass>();

	/**
	 * The id of the tooltip
	 */
	/**
	 * The id of the tooltip
	 */
	public readonly id = input.required<string>();

	/**
	 * The current position of the tooltip
	 */
	public readonly position = input.required<NgxTooltipPosition>();

	/**
	 * The text of the tooltip
	 */
	public readonly text = input.required<string>();
}
