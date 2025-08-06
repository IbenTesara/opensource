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
	 * An optional navigation we wish to render
	 */
	navigation?: ComponentType;
	/**
	 * The footer we wish to render
	 */
	footer?: ComponentType;
}

/**
 * An optional configuration for the `NgxMobileLayoutService`
 */
export interface NgxMobileLayoutConfiguration {
	/**
	 * An optional default layout we always wish to show
	 */
	layout?: Omit<NgxMobileLayout, 'flyout'>;
	/**
	 * The amount of time it takes (in milliseconds) for the flyout animation to be played
	 */
	flyoutAnimationDuration?: number;
}
