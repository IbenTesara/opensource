import { Directive, ElementRef, AfterViewInit, inject, input, contentChildren } from '@angular/core';

import {
	NgxAccessibleAbstractDragAndDropItemDirective,
	NgxAccessibleDragAndDropAbstractService,
} from '../../abstracts';

import { NgxAccessibleDragAndDropContainerDirective } from './drag-and-drop-container.directive';

/**
 * A directive to handle accessible drag and drop flows. This directive is meant to be placed on the host of the drag and drop container(s).
 */
@Directive({
	selector: '[ngxAccessibleDragAndDropHost]',
	exportAs: 'ngxAccessibleDragAndDropHost',
	standalone: true,
})
export class NgxAccessibleDragAndDropHostDirective implements AfterViewInit {
	private readonly dragAndDropService = inject(NgxAccessibleDragAndDropAbstractService);
	readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	/**
	 * A list of all the drag and drop items
	 */
	public items: Record<string, NgxAccessibleAbstractDragAndDropItemDirective> = {};

	/**
	 * A list of all the drag and drop containers
	 */
	public readonly containers = contentChildren(NgxAccessibleDragAndDropContainerDirective, { descendants: true });

	/**
	 * An optional description describing how the drag and drop works.
	 */
	public readonly description = input<string>(undefined, { alias: "ngxAccessibleDragAndDropHostDescription" });

	/**
	 * Mark a specific drag and drop item as active
	 *
	 * @param  id - The id of the drag and drop item
	 */
	public markAsActive(id: string): void {
		this.items[id].markAsActive();
	}

	/**
	 * Returns the container based on the provided index
	 *
	 * @param index - The index of the container
	 */
	public getContainer(index: number): NgxAccessibleDragAndDropContainerDirective {
		return this.containers().find((container) => container.index() === index);
	}

	public ngAfterViewInit(): void {
		// Iben: Add the description tag
		this.dragAndDropService
			.setDragAndDropDescription(this.elementRef.nativeElement, this.description())
			.subscribe();
	}

	public registerDragAndDropItem(item: NgxAccessibleAbstractDragAndDropItemDirective): void {
		this.items[item.itemId()] = item;
	}
}
