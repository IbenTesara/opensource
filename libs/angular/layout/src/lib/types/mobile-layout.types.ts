import { EnvironmentInjector, Injector, Type } from '@angular/core';

export type ComponentType = Type<any> | null;

export type NgxMobileLayoutItem = ComponentType | Record<string, ComponentType>;

export interface NgxMobileLayoutBase<DataType> {
	/**
	 * The header we wish to render
	 */
	header: {
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
	flyout: DataType;
	/**
	 * An optional aside we wish to render
	 */
	aside: DataType;
	/**
	 * An optional navigation we wish to render
	 */
	navigation: DataType;
	/**
	 * The footer we wish to render
	 */
	footer: DataType;
}

/**
 * Parameters configured when opening a component inside a mobile layout outlet (aside or flyout).
 */
export interface NgxMobileLayoutOutletParams {
	/**
	 * The accessible name (ARIA label) for the dialog or flyout container.
	 */
	label: string;

	/**
	 * An optional parent injector to use for the instantiated component.
	 */
	injector?: Injector;

	/**
	 * An optional set of input values to pass to the component.
	 */
	inputs?: Record<string, unknown>;

	/**
	 * Optional projectable nodes to project into the component.
	 */
	content?: Node[][];

	/**
	 * An optional environment injector to use for compiling components.
	 */
	environmentInjector?: EnvironmentInjector;
}

/**
 * A layout for the `NgxMobileLayoutService`
 */
export type NgxMobileLayout = Partial<NgxMobileLayoutBase<ComponentType>>;

/**
 * A layout configuration for the `NgxMobileLayoutService`
 */
export type NgxMobileLayoutConfiguration = Partial<NgxMobileLayoutBase<NgxMobileLayoutItem>>;

export type NgxMobileLayoutByQuery = NgxMobileLayoutBase<Record<string, ComponentType>>;

/**
 * All possible elements of the mobile layout
 */
export type NgxMobileLayoutElements =
	| keyof Omit<NgxMobileLayout, 'header'>
	| `header.${keyof NgxMobileLayout['header']}`;
