import { Type } from '@angular/core';

import { NgxDisplayContentComponent } from '../abstracts';

/**
 * The priority of the link
 */
export type NgxLinkPriority = 'primary' | 'secondary' | 'tertiary' | 'danger';

/**
 * The position of the icon in the button
 */
export type NgxLinkIconPosition = 'left' | 'right';

/**
 * The type of the link
 */
export type NgxLinkType = 'text' | 'icon' | 'button';

/**
 * The width of the link
 */
export type NgxLinkWidth = 'full' | 'fit';

/**
 * The context of the link
 */
export type NgxLinkContext = 'navigation' | 'breadcrumb' | 'anchor' | 'form' | 'footer';

/**
 * Whether the link is an internal link or external link
 */
export type NgxLinkDestination = 'internal' | 'external';

/**
 * The default configuration of the link
 *
 * loading - An optional component used for the loading state
 * icon - An optional component used for the icon
 * iconPosition - The optional default position of the icon, by default `left`
 * labelWrapper - The optional default HTML element used to wrap the button link, by default `span`
 */
export interface NgxLinkConfiguration {
	loading?: Type<NgxDisplayContentComponent>;
	icon?: Type<NgxDisplayContentComponent>;
	iconPosition?: NgxLinkIconPosition;
	labelWrapper?: string;
}
