import { Type } from '@angular/core';

import { NgxToastComponent } from '../abstracts';

/**
 * The configuration for an individual toast
 */
export interface NgxToastConfiguration {
	autoClose?: boolean;
	maxTime?: number;
	animationTime?: number;
	priority?: 'high' | 'low';
	component?: Type<NgxToastComponent>;
}

/**
 * The position of a toast
 */
export type NgxToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/**
 * The configuration we wish to apply to every toast unless we override it
 */
export interface NgxToastDefaultConfiguration extends NgxToastConfiguration {
	component: Type<NgxToastComponent>;
	position: NgxToastPosition;
	maxAmount?: number;
	animationTime?: number;
}

export interface NgxToast<DataType = unknown> {
	id: string;
	text: string;
	data?: DataType;
	toBeRemoved?: boolean;
	configuration?: NgxToastConfiguration;
}
