import { Directive } from '@angular/core';
import { FormControlDirective } from '@angular/forms';

/**
 * A custom directive used by the NgxDynamicFormComponent, as the base FormControlDirective is not a standalone directive
 */
@Directive({
	standalone: true,
})
export class NgxDynamicFormDirective extends FormControlDirective {}
