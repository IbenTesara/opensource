import { Type } from '@angular/core';

export type ComponentType = Type<any> | null;

/**
 * A layout configuration for the `NgxMobileLayoutService`
 */
export interface NgxMobileLayout {
	/**
	 * The header we wish to render
	 */
	header?: {
		/**
		 * The center part of the header we wish to render
		 */
		main?: ComponentType;
		/**
		 * The left part of the header we wish to render
		 */
		left?: ComponentType;
		/**
		 * The right part of the header we wish to render
		 */
		right?: ComponentType;
	};
	/**
	 * An optional flyout we wish to render
	 */
	flyout?: ComponentType;
	/**
	 * An optional aside we wish to render
	 */
	aside?: ComponentType;
	/**
	 * An optional navigation we wish to render
	 */
	navigation?: ComponentType;
	/**
	 * The footer we wish to render
	 */
	footer?: ComponentType;
}

/**
 * All possible elements of the mobile layout
 */
export type NgxMobileLayoutElements =
	| keyof Omit<NgxMobileLayout, 'header'>
	| `header.${keyof NgxMobileLayout['header']}`;
