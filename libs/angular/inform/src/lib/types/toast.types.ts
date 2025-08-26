import { AnimationFunction, Type } from '@angular/core';

import { NgxToastBundlerComponent, NgxToastComponent } from '../abstracts';

/**
 * The configuration for an individual toast
 */
export interface NgxToastConfiguration {
	autoClose?: boolean;
	hasPriority?: boolean;
	component?: Type<NgxToastComponent>;
}

/**
 * The position of a toast
 */
export type NgxToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/**
 * The base configuration for a toast setup with a max amount
 */
interface NgxToastMaxAmountBaseConfiguration {
	amount: number;
	strategy: 'wait' | 'ignore' | 'bundle';
}

/**
 * The configuration for a toast setup with a max amount that need to be bundled
 */
interface NgxToastMaxAmountBundleConfiguration extends NgxToastMaxAmountBaseConfiguration {
	strategy: 'bundle';
	component: Type<NgxToastBundlerComponent>;
}

/**
 * The base configuration for a toast setup with a max amount that is not bundled
 */
interface NgxToastMaxAmountOtherConfiguration extends NgxToastMaxAmountBaseConfiguration {
	strategy: 'wait' | 'ignore';
}

/**
 * The configuration for a toast setup with a max amount
 */
export type NgxToastMaxAmountConfiguration =
	| NgxToastMaxAmountBundleConfiguration
	| NgxToastMaxAmountOtherConfiguration;

/**
 * The configuration we wish to apply to every toast unless we override it
 */
export interface NgxToastDefaultConfiguration extends Omit<NgxToastConfiguration, 'hasPriority'> {
	component: Type<NgxToastComponent>;
	position: NgxToastPosition;
	maxAmount?: NgxToastMaxAmountConfiguration;
	animations?: {
		enter: string | AnimationFunction;
		leave: string | AnimationFunction;
	};
	maxTime?: number;
}

/**
 * The interface for a toast in the NgxToastService
 */
export interface NgxToast<DataType = unknown> {
	id: string;
	text: string;
	data?: DataType;
	configuration?: NgxToastConfiguration;
}

/**
 * The interface needed to create a NgxToast
 */
export type NgxToastCreator<DataType = unknown> = Omit<NgxToast<DataType>, 'id' | 'toBeRemoved'>;

/**
 * An event for when toasts are shown, updated or removed
 */
export interface NgxToastEvent {
	toast: NgxToast;
	type: 'add' | 'remove';
}
