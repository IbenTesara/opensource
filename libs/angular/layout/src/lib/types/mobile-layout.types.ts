import { Type } from '@angular/core';

export type ComponentType = Type<any> | null;

export interface ComponentRecord {
	default: ComponentType;
	[key: string]: ComponentType;
}

export type NgxMobileLayoutItem = ComponentType | ComponentRecord;

interface NgxMobileLayoutBase<DataType> {
	/**
	 * The header we wish to render
	 */
	header?: {
		/**
		 * The center part of the header we wish to render
		 */
		main?: DataType;
		/**
		 * The left part of the header we wish to render
		 */
		left?: DataType;
		/**
		 * The right part of the header we wish to render
		 */
		right?: DataType;
	};
	/**
	 * An optional flyout we wish to render
	 */
	flyout?: DataType;
	/**
	 * An optional aside we wish to render
	 */
	aside?: DataType;
	/**
	 * An optional navigation we wish to render
	 */
	navigation?: DataType;
	/**
	 * The footer we wish to render
	 */
	footer?: DataType;
}

/**
 * A layout for the `NgxMobileLayoutService`
 */
export type NgxMobileLayout = NgxMobileLayoutBase<ComponentType>;

/**
 * A layout configuration for the `NgxMobileLayoutService`
 */
export type NgxMobileLayoutConfiguration = NgxMobileLayoutBase<NgxMobileLayoutItem>;

/**
 * All possible elements of the mobile layout
 */
export type NgxMobileLayoutElements =
	| keyof Omit<NgxMobileLayout, 'header'>
	| `header.${keyof NgxMobileLayout['header']}`;
