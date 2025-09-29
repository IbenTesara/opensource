import { Type } from '@angular/core';

import { NgxDisplayContentComponent } from '../abstracts';

/**
 * The priority of the button
 */
export type NgxButtonPriority = 'primary' | 'secondary' | 'tertiary' | 'danger';

/**
 * The type of the button
 */
export type NgxButtonType = 'regular' | 'fab' | 'text' | 'outline';

/**
 * The position of the icon in the button
 */
export type NgxButtonIconPosition = 'left' | 'right';

/**
 * The width of the button
 */
export type NgxButtonWidth = 'full' | 'fit';

/**
 * Whether the text and icon or only the icon needs to be shown
 */
export type NgxButtonDisplayType = 'icon' | 'text' | 'both';

/**
 * The default configuration of the button
 *
 * loading - An optional component used for the loading state
 * icon - An optional component used for the icon
 * iconPosition - The optional default position of the icon, by default `left`
 * labelWrapper - The optional default HTML element used to wrap the button label, by default `span`
 */
export interface NgxButtonConfiguration {
	loading?: Type<NgxDisplayContentComponent>;
	icon?: Type<NgxDisplayContentComponent>;
	iconPosition?: NgxButtonIconPosition;
	labelWrapper?: string;
}
