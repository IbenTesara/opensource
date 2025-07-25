import { Directive, OnDestroy, viewChildren } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';

import { FormStateOptionsEntity } from '../../interfaces';
import {
	handleFormAccessorMarkAsDirty,
	handleFormAccessorMarkAsTouched,
	handleFormAccessorUpdateValueAndValidity,
} from '../../utils';
import { BaseFormAccessor } from '../base-form/base-form.accessor';

@Directive()
export class FormAccessorContainer implements OnDestroy {
	/**
	 * A list of all DataFormAccessors en FormAccessors of this component
	 */
	readonly accessors = viewChildren(BaseFormAccessor);

	/**
	 * Destroyed state of the component
	 */
	protected readonly destroyed$ = new Subject();

	/**
	 * @deprecated This method should no longer be used, use the markAsDirty on the form itself instead
	 *
	 * Marks the form and all the inputs of every subsequent form-accessors as dirty
	 *
	 * @param  form - The form used in the component
	 * @param options - Options passed to the form state changer
	 */
	public markAllAsDirty(form: AbstractControl, options: FormStateOptionsEntity = {}): void {
		this.handleAccessorsAction(() => {
			handleFormAccessorMarkAsDirty(form, this.accessors() as any || [], options);
		});
	}

	/**
	 * @deprecated This method should no longer be used, use the markAsTouched on the form itself instead
	 *
	 * Marks the form and all the inputs of every subsequent form-accessors as touched
	 *
	 * @param  form - The form used in the component
	 * @param options - Options passed to the form state changer
	 */
	public markAllAsTouched(form: AbstractControl, options: FormStateOptionsEntity = {}): void {
		this.handleAccessorsAction(() => {
			handleFormAccessorMarkAsTouched(form, this.accessors() as any || [], options);
		});
	}

	/**
	 * Updates the value and validity of the form and all the inputs of every subsequent form-accessors
	 *
	 * @param form - The provided forms
	 * @param options - Options passed to the updateValueAndValidity
	 */
	public updateAllValueAndValidity(
		form: AbstractControl,
		options: FormStateOptionsEntity = {}
	): void {
		this.handleAccessorsAction(() => {
			handleFormAccessorUpdateValueAndValidity(
				form,
				this.accessors() as any || [],
				options
			);
		});
	}

	/**
	 * Handle the destroy state of the component
	 */
	public ngOnDestroy(): void {
		this.destroyed$.next(undefined);
		this.destroyed$.complete();
	}

	/**
	 * Handle the accessors action of the FormContainer and throw a warning if no accessors are provided
	 *
	 * @param  action - The provided action
	 */
	private handleAccessorsAction(action: () => void) {
		// Iben: Throw a warn in case there are no accessors found
		const accessors = this.accessors();
  if (!accessors || accessors.length === 0) {
			console.warn(
				'NgxForms: No (Data)FormAccessors were found in this component. Check if each (Data)FormAccessor also provides the BaseFormAccessor in its providers array. If this is intentional, this warning can be ignored.'
			);
		}

		// Iben: Handle the provided action
		action();
	}
}
