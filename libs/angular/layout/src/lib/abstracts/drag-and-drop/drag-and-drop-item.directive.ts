import { Directive, Signal } from '@angular/core';

import { NgxHasFocusDragAndDropAbstractDirective } from './has-focus.directive';

/**
 * An abstract class to avoid circular dependency with the ItemDirective and the HostDirective
 */
@Directive()
export abstract class NgxAccessibleAbstractDragAndDropItemDirective extends NgxHasFocusDragAndDropAbstractDirective {
	/**
	 * An unique id of the draggable item
	 */
	abstract itemId: Signal<string>;

	/**
	 *  Marks the item as focussed and selected
	 */
	abstract markAsActive(): void;
}
