import {
	ChangeDetectionStrategy,
	Component,
	effect,
	inject,
	input,
	inputBinding,
	InputSignal,
	Signal,
	viewChild,
	ViewContainerRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormAccessor } from '../../abstracts';
import { NgxDynamicFormDirective } from '../../directives';
import { NgxDynamicFormConfigurationToken } from '../../tokens';
import { NgxDynamicFormConfiguration } from '../../types';
import { createAccessorProviders } from '../../utils';

/**
 * A dynamic form component that will dynamically render an input component based on the provided key
 *
 * ## Accessibility Guidelines
 * - **Explicit Label Association**: When rendering dynamic input components using `<ngx-dynamic-form>`, developers must ensure that every generated form control is linked to an accessible label via a native `<label>` element with a matching `for` attribute pointing to the input element's `id`. Alternatively, if a visual label is not used, provide a clear and descriptive `aria-label` or `aria-labelledby` attribute on the input element.
 *
 * @export
 * @class NgxDynamicFormComponent
 * @template DataType - The type of the data in the form
 * @template OptionsType - The type of options passed to the rendered component
 */
@Component({
	selector: 'ngx-dynamic-form',
	template: `<ng-container #ngxDynamicFormContainer />`,
	providers: [createAccessorProviders(NgxDynamicFormComponent)],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxDynamicFormComponent<
	DataType = unknown,
	OptionsType = unknown,
> extends FormAccessor<DataType, FormControl<DataType>> {
	/**
	 * An instance of the form configuration
	 */
	protected readonly dynamicFormConfiguration: NgxDynamicFormConfiguration = inject(
		NgxDynamicFormConfigurationToken
  );

	/**
	 * An instance of the ViewContainer
	 */
	protected readonly viewContainerRef: Signal<ViewContainerRef> = viewChild(
		'ngxDynamicFormContainer',
		{ read: ViewContainerRef }
	);

	/**
	 * Options passed to the rendered input component
	 */
	public readonly options: InputSignal<OptionsType> = input();

	/**
	 * The key of the input that needs to be rendered
	 */
	public key: InputSignal<string> = input.required();

	constructor() {
		super();

		effect(() => {
			// Iben: If no component was provided for the key, we throw an error and early exit
			if (!this.dynamicFormConfiguration[this.key()]) {
				console.error(
					`NgxForms: No component was provided for the key "${this.key()}". so no dynamic form element was rendered.`
				);

				return;
			}

			// Iben: Create the component and add it to the viewContainerRef
			this.viewContainerRef().createComponent(this.dynamicFormConfiguration[this.key()], {
				bindings: [inputBinding('options', () => this.options())],
				// Iben: Provide the injector so the CustomControlValueAccessor keeps working
				injector: this.injector,
				// Iben: Setup the directive so we can pass the form
				directives: [
					{
						type: NgxDynamicFormDirective,
						bindings: [inputBinding('formControl', () => this.form)],
					},
				],
      } );

      // Iben: Detect changes after the component was added
      this.cdRef.detectChanges();
		});
	}

	override initForm(): FormControl<DataType> {
		return new FormControl<DataType>(null);
	}
}
