import { Directive, input, InputSignal } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

import { FormAccessor } from '../form/form.accessor';

/**
 * The base component configuration for an input rendered in a NgxDynamicFormComponent
 *
 * @template OptionsType - The type of the options used to render the input
 * @template DataType - The type of the data of the form control
 * @template FormAccessorFormType - The type of form control
 * @template FormValueType - The type of data used inside the form
 */
@Directive()
export abstract class NgxDynamicFormInputComponent<
	OptionsType = unknown,
	DataType = unknown,
	FormAccessorFormType extends AbstractControl = FormControl,
	FormValueType = DataType,
> extends FormAccessor<DataType, FormAccessorFormType, FormValueType> {
	/**
	 * Options to render the input component
	 */
	public readonly options: InputSignal<OptionsType> = input();
}
