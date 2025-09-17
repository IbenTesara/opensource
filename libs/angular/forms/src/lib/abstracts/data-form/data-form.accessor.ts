import { Directive, input, InputSignal, OnDestroy } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl } from '@angular/forms';
import { isEqual } from 'lodash';
import { of, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';

import { NgxFormsControlValueAccessor } from '../custom-control-value-accessor';

@Directive()
export abstract class DataFormAccessor<
		ConstructionDataType = unknown,
		DataType = unknown,
		FormAccessorFormType extends AbstractControl = FormControl,
		FormValueType = DataType
	>
	extends NgxFormsControlValueAccessor<DataType, FormAccessorFormType, FormValueType>
	implements OnDestroy
{
	// Iben: Keep a reference to the current data so we don't make a new form if the data itself hasn't changed
	private currentData: ConstructionDataType;

	/**
	 * A subject that emits when the form has been destroyed in favor of a new one
	 */
	private readonly destroyFormSubject$: Subject<void> = new Subject();

	/**
	 * Method to set up the inner form
	 */
	abstract initForm(data: ConstructionDataType): FormAccessorFormType;

	/**
	 * The data we wish to use to set up the form
	 */
	public readonly data: InputSignal<ConstructionDataType> = input.required();

	constructor() {
		super();

		// Iben: Generate a form based on the data
		toObservable(this.data)
			.pipe(
				switchMap((data) => {
					// Iben: If we already have current data and the current data matches the new data, we don't make a new form
					if (this.currentData && isEqual(this.currentData, data)) {
						this.currentData = data;
						return of();
					}

					this.initializedSubject$.next(false);
					this.currentData = data;

					// Iben: Emit to the destroy so the previous subscription is cancelled
					this.destroyFormSubject$.next();

					// Set the inner form
					this.form = this.initForm(data);

					// Iben: Early exit in case the form was not found
					if (!this.form) {
						console.error(
							'NgxForms: No form was found after initializing. Check if the initForm method returns a form.'
						);

						return of();
					}

					// Denis: set the initialized property
					this.setInitializedWithData(data);

					// Iben: Check if the form is valid depending on the provided value
					this.validate();
					this.cdRef.detectChanges();

					// Iben: Subscribe to the value changes
					return this.form.valueChanges.pipe(
						tap<FormValueType>((value) => {
							// In case there's a mapper we map the value, else we send the form value
							this.onChange(this.onChangeMapper ? this.onChangeMapper(value) : value);
						}),
						takeUntil(this.destroyFormSubject$)
					);
				}),
				takeUntilDestroyed(this.destroyRef)
			)
			.subscribe();
	}

	ngOnDestroy(): void {
		// Iben: Destroy the currently open form
		this.destroyFormSubject$.next();
		this.destroyFormSubject$.complete();
	}

	/**
	 * setInitialized
	 *
	 * This method sets the initialized property to true when the form is initialized.
	 * This functionality has been moved to a separate method to enable
	 * overwriting this method to fit certain use-cases.
	 *
	 * @param {ConstructionDateType} data
	 * @returns void
	 * @private
	 */
	protected setInitializedWithData(data: ConstructionDataType): void {
		this.initializedSubject$.next(Array.isArray(data) ? data && data.length > 0 : !!data);
	}
}
