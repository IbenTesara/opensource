import { FormControl, FormGroup } from '@angular/forms';

/**
 * Maps an object interface to a (nested) FormGroup interface
 *
 * IMPORTANT: This does not provide FormArrays automatically
 */
export type NgxFormInterface<DataType extends object> = {
	[key in keyof DataType]: [DataType[key]] extends [object]
		? FormGroup<NgxFormInterface<DataType[key]>>
		: FormControl<DataType[key]>;
};
