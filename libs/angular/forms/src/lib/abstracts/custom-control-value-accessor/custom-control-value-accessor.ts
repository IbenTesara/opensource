import {
	ChangeDetectorRef,
	DestroyRef,
	Directive,
	Injector,
	InputSignal,
	OutputRef,
	Signal,
	WritableSignal,
	inject,
	input,
	signal,
	viewChildren,
} from '@angular/core';
import { outputFromObservable, takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import {
	AbstractControl,
	ControlValueAccessor,
	FormControl,
	NgControl,
	ValidationErrors,
} from '@angular/forms';
import {
	BehaviorSubject,
	Observable,
	Subject,
	combineLatest,
	filter,
	of,
	switchMap,
	take,
	takeUntil,
	tap,
} from 'rxjs';

import { FormAccessorControlsEntity, FormStateOptionsEntity } from '../../types';
import {
	handleFormAccessorControlDisabling,
	handleFormAccessorMarkAsDirty,
	handleFormAccessorMarkAsPristine,
	handleFormAccessorMarkAsTouched,
	handleFormAccessorUpdateValueAndValidity,
	hasErrors,
} from '../../utils';
import { BaseFormAccessor } from '../base-form/base-form.accessor';

@Directive()
export abstract class NgxFormsControlValueAccessor<
	DataType = unknown,
	FormAccessorFormType extends AbstractControl = FormControl,
	FormValueType = DataType
> implements ControlValueAccessor
{
	/**
	 *  The Injector needed in the constructor
	 */
	private readonly injector: Injector = inject(Injector);

	/**
	 *  The initial value of the form
	 */
	protected defaultValue: Partial<FormValueType>;

	/**
	 *  The OnDestroyRef reference
	 */
	protected readonly destroyRef: DestroyRef = inject(DestroyRef);

	/**
	 *  The ChangeDetector reference
	 */
	public readonly cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);

	/**
	 * A subject to hold the parent control
	 */
	private readonly parent: WritableSignal<AbstractControl> = signal<AbstractControl>(undefined);

	/**
	 * A reference to the control tied to this control value accessor
	 */
	protected parentControl: Signal<AbstractControl> = this.parent.asReadonly();

	/**
	 * Whether the first setDisable has run
	 */
	protected initialSetDisableHasRun: boolean = false;

	/**
	 * Subject to check whether the form is initialized
	 */
	protected readonly initializedSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false
	);

	/**
	 * Whether or not we want to emit a value when we use the disableFields, by default this will emit
	 *
	 * @param  keys - Keys we're about to disable
	 */
	protected emitValueWhenDisableFieldsUsingInput?(
		keys: FormAccessorControlsEntity<FormAccessorFormType>[]
	): boolean;

	/**
	 * A list of all DataFormAccessors en FormAccessors of this component
	 */
	protected readonly accessors: Signal<BaseFormAccessor> =
		viewChildren<BaseFormAccessor>(BaseFormAccessor);

	/**
	 * An observable that emits whenever the form is initialized
	 */
	public initialized$: Observable<boolean> = this.initializedSubject$.asObservable();

	/**
	 * Inner form to write to
	 */
	public form: FormAccessorFormType;

	/**
	 * Keys of the fields we wish to disable.
	 * By default this will emit a valueChanges, this can be overwritten by the emitValueWhenDisableFieldsUsingInput in the Accessor
	 *
	 * @memberof FormAccessor
	 */
	public disableFields: InputSignal<FormAccessorControlsEntity<FormAccessorFormType>[]> =
		input<FormAccessorControlsEntity<FormAccessorFormType>[]>();

	/**
	 * Whether we want to skip the first setDisable (https://github.com/angular/angular/pull/47576).
	 * By default, this is true
	 */
	public readonly skipInitialSetDisable = input<boolean>(true);

	/**
	 * Emits to know whether the form has been initialized
	 */
	public readonly initializedForm: OutputRef<boolean> = outputFromObservable(
		this.initializedSubject$.asObservable()
	);

	constructor() {
		// Iben: Use setTimeOut to avoid the circular dependency issue
		setTimeout(() => {
			try {
				const parentControl = this.injector.get(NgControl);

				// Iben: If for some reason we can't find the control or the ngControl, early exit and throw an error
				if (!parentControl?.control) {
					console.error(
						'NgxForms: No control was found after initializing. Check if a control was assigned to the FormAccessor.'
					);

					return;
				}

				// Iben: Set the parent control
				this.parent.set(parentControl.control);

				// Iben: Grab the control from the parent container
				const control = parentControl.control;

				// Iben: Setup the markAsTouched flow
				// Iben: Keep a reference to the original `markAsTouched` handler.
				const markAsTouched = control.markAsTouched.bind(control);

				// Iben: Override the `markAsTouched` handler with our own.
				control.markAsTouched = (options?: FormStateOptionsEntity) => {
					// Iben: If the control is already marked as touched, we early exit
					if (control.touched) {
						return;
					}

					// Iben: Invoke the original `markAsTouchedHandler`.
					markAsTouched(options);

					// Iben: If the onlySelf flag is set to true, we early exit
					if (options?.onlySelf) {
						return;
					}

					// Iben: Invoke the custom `markAsTouchedHandler`.
					this.markAsTouched(options);
				};

				// Iben: Setup the markAsDirty flow
				// Iben: Keep a reference to the original `markAsDirty` handler.
				const markAsDirty = control.markAsDirty.bind(control);

				// Iben: Override the `markAsDirty` handler with our own.
				control.markAsDirty = (options?: FormStateOptionsEntity) => {
					// Iben: If the control is already marked as dirty, we early exit
					if (control.dirty) {
						return;
					}

					// Iben: Invoke the original `markAsDirtyHandler`.
					markAsDirty(options);

					// Iben: If the onlySelf flag is set to true, we early exit
					if (options?.onlySelf) {
						return;
					}

					// Iben: Invoke the custom `markAsDirtyHandler`.
					this.markAsDirty(options);
				};

				// Iben: Setup the markAsPristine flow
				// Iben: Keep a reference to the original `markAsPristine` handler.
				const markAsPristine = control.markAsPristine.bind(control);

				// Iben: Override the `markAsPristine` handler with our own.
				control.markAsPristine = (options?: FormStateOptionsEntity) => {
					// Iben: If the control is already marked as pristine, we early exit
					if (control.pristine) {
						return;
					}

					// Iben: Invoke the original `markAsPristineHandler`.
					markAsPristine(options);

					// Iben: If the onlySelf flag is set to true, we early exit
					if (options?.onlySelf) {
						return;
					}

					// Iben: Invoke the custom `markAsPristineHandler`.
					this.markAsPristine(options);
				};
			} catch (error) {
				console.warn(
					'NgxForms: No parent control was found while trying to set up the form accessor.'
				);
			}
		});

		combineLatest([this.initialized$, toObservable(this.disableFields)])
			.pipe(
				switchMap(([, keys]) => {
					// Iben: Early exit in case the keys are not provided
					if (!keys) {
						return of();
					}

					// Iben: Setup a subject to track whether we're still disabling the fields
					const disabling = new Subject();

					// Iben: Add the keys to a set for more performant lookup and convert those to a string to not have Typescript issues later down the line
					const controlKeys = new Set(keys);

					// Iben: Check if we need to dispatch the disable or enable event
					const emitEvent = this.emitValueWhenDisableFieldsUsingInput
						? this.emitValueWhenDisableFieldsUsingInput(keys)
						: true;

					// Iben: Listen to the initialized state of the form
					return this.initializedSubject$.pipe(
						filter(Boolean),
						tap(() => {
							// TODO: Iben: Remove this setTimeout once we're in a Signal based component
							setTimeout(() => {
								// Iben: Handle the disabling of the fields
								handleFormAccessorControlDisabling(
									this.form,
									controlKeys,
									emitEvent
								);
							});

							// Iben: Set the disabling subject so that we can complete this subscription
							disabling.next(undefined);
							disabling.complete();
						}),
						takeUntil(disabling)
					);
				}),
				takeUntilDestroyed(this.destroyRef)
			)
			.subscribe();
	}

	/**
	 * Sets up the ControlValueAccessor connectors
	 */
	public onTouch: Function = () => {}; // tslint:disable-line:no-empty
	public onChange: Function = (_: any) => {}; // tslint:disable-line:no-empty

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	/**
	 * Writes value to the inner form
	 *
	 * @param value - Value to patch in the inner form
	 */
	public writeValue(value: DataType | undefined | null): void {
		// Iben: Wait until the form is ready
		this.initialized$
			.pipe(
				filter(Boolean),
				take(1),
				tap(() => {
					// Iben: Early exit in case the form was not found
					if (!this.form) {
						console.error(
							'NgxForms: No form was found when trying to write a value. This error can occur when overwriting the ngOnInit without invoking super.OnInit().'
						);

						return;
					}

					// Iben: Reset the current form without emitEvent to not trigger the valueChanges
					this.form.reset(this.defaultValue || undefined, { emitEvent: false });

					// Iben: Patch the current form with the new value without emitEvent to not trigger the valueChanges
					if (value !== undefined && value !== null) {
						this.form.patchValue(
							this.onWriteValueMapper ? this.onWriteValueMapper(value) : value,
							{
								emitEvent: false,
							}
						);
					}

					// Iben: Validate the current value
					this.validate();

					// Iben: Detect changes so the changes are visible in the dom
					this.cdRef.detectChanges();
				})
			)
			.subscribe();
	}

	/**
	 * Mark all controls of the form as touched
	 */
	public markAsTouched(options: FormStateOptionsEntity = {}): void {
		handleFormAccessorMarkAsTouched(this.form, (this.accessors() as any) || [], options);

		// Iben: Detect changes so the changes are visible in the dom
		this.cdRef.detectChanges();
	}

	/**
	 * Mark all controls of the form as dirty
	 */
	public markAsDirty(options: FormStateOptionsEntity = {}): void {
		handleFormAccessorMarkAsDirty(this.form, (this.accessors() as any) || [], options);

		// Iben: Detect changes so the changes are visible in the dom
		this.cdRef.detectChanges();
	}

	/**
	 * Mark all controls of the form as pristine
	 */
	public markAsPristine(options: FormStateOptionsEntity = {}): void {
		handleFormAccessorMarkAsPristine(this.form, (this.accessors() as any) || [], options);

		// Iben: Detect changes so the changes are visible in the dom
		this.cdRef.detectChanges();
	}

	/**
	 * Update the value and validity of the provided form
	 */
	public updateAllValueAndValidity(options: FormStateOptionsEntity): void {
		handleFormAccessorUpdateValueAndValidity(
			this.form,
			(this.accessors() as any) || [],
			options
		);

		// Iben: Detect changes so the changes are visible in the dom
		this.cdRef.detectChanges();
	}

	/**
	 * Validates the inner form
	 */
	public validate(): ValidationErrors | null {
		// Iben: If the form itself is invalid, we return the invalidForm: true right away
		if (this.form?.invalid) {
			return { invalidForm: true };
		}

		// Iben: In case the form is invalid, we check if the child controls are possibly invalid
		return hasErrors(this.form) ? { invalidForm: true } : null;
	}

	/**
	 * Disables/enables the inner form based on the passed value
	 *
	 * @param isDisabled - Whether or not the form should be disabled
	 */
	public setDisabledState(isDisabled: boolean) {
		// Iben: Skip the initial setDisabled, as this messes up our form approach.
		// https://github.com/angular/angular/pull/47576
		if (this.skipInitialSetDisable() && !this.initialSetDisableHasRun) {
			this.initialSetDisableHasRun = true;

			return;
		}

		if (isDisabled) {
			this.form.disable({ emitEvent: false });
		} else {
			this.form.enable({ emitEvent: false });
		}

		// Iben: Detect changes so the changes are visible in the dom
		this.cdRef.detectChanges();
	}

	/**
	 * Optional method to map the inner form value to an outer form specific format
	 *
	 * @param value - Value from the form
	 */
	public onChangeMapper?(value: Partial<FormValueType>): DataType;

	/**
	 * Optional method to map the outer form value to an inner form specific format
	 *
	 * @param value - Value from the form
	 */
	public onWriteValueMapper?(value: DataType): FormValueType;
}
