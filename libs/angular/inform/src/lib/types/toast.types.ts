import { Type } from '@angular/core';

import { NgxToastComponent } from '../abstracts';

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

interface NgxToastMaxAmountBaseConfiguration {
	amount: number;
	strategy: 'wait' | 'ignore' | 'bundle';
}

interface NgxToastMaxAmountBundleConfiguration extends NgxToastMaxAmountBaseConfiguration {
	strategy: 'bundle';
	component: Type<any>;
}

interface NgxToastMaxAmountOtherConfiguration extends NgxToastMaxAmountBaseConfiguration {
	strategy: 'wait' | 'ignore';
}

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
	animationTime?: number;
	maxTime?: number;
}
export interface NgxToast<DataType = unknown> {
	id: string;
	text: string;
	data?: DataType;
	toBeRemoved?: boolean;
	configuration?: NgxToastConfiguration;
}

export interface NgxToastEvent {
	toast: NgxToast;
	type: 'add' | 'update' | 'remove';
}
