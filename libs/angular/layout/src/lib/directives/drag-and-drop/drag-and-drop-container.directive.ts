import { Directive, input } from '@angular/core';

/**
 * A directive to handle accessible drag and drop flows. This directive is meant to be placed on the drag and drop container(s).
 */
@Directive({
	selector: '[ngxAccessibleDragAndDropContainer]',
	exportAs: 'ngxAccessibleDragAndDropContainer',
	standalone: true,
})
export class NgxAccessibleDragAndDropContainerDirective {
	/**
	 * The index of the container
	 */
	public readonly index = input.required<number>({ alias: "ngxAccessibleDragAndDropContainerIndex" });

	/**
	 * An optional label used in the event messages
	 */
	public readonly label = input<string>(undefined, { alias: "ngxAccessibleDragAndDropContainerLabel" });
}
