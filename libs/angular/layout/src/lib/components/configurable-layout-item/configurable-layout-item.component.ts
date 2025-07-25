import { Component, TemplateRef, input, viewChild } from '@angular/core';

/**
 * The layout item pairs with the `<ngx-configurable-layout>` container.
 * This component will in itself not be rendered. The key provided in this component
 * will need to be provided in the `[keys]` input or the `formControl` of the layout container
 * as well. The order in which they are provided there, will define the order in which
 * the items will be rendered.
 */
@Component({
	selector: 'ngx-configurable-layout-item',
	templateUrl: './configurable-layout-item.component.html',
	standalone: true,
})
export class NgxConfigurableLayoutItemComponent {
	/**
	 * The unique key of the layout item.
	 */
	public readonly key = input.required<string>();

	/**
	 * An optional label for the layout item used for WCAG purposes.
	 */
	public readonly label = input<string>();

	/**
	 * The template reference of the;
	 */
	public readonly template = viewChild<TemplateRef<any>>('contentTmpl');
}
