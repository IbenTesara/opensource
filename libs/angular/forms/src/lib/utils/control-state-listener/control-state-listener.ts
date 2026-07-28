import { Injector } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { combineLatest, map, Observable, startWith } from 'rxjs';

import type { FieldState, ReadonlyFieldState, ValidationError } from '@angular/forms/signals';

import { touchedEventListener } from '../touched-event-listener/touched-event-listener';

export interface FormErrorControlState {
	invalid: boolean;
	touched: boolean;
	dirty: boolean;
	errors: ValidationErrors | ValidationError[] | null;
}

/**
 * Listens to state changes (invalid, touched, dirty, errors) for both Reactive Forms and Signal Forms controls
 *
 * @param control - The AbstractControl or Signal Forms FieldState
 * @param injector - Optional Injector required when passing a Signal Forms FieldState
 */
export function controlStateListener(
	control: AbstractControl | FieldState<any> | ReadonlyFieldState<any>,
	injector?: Injector
): Observable<FormErrorControlState> {
	// Iben: If the control is an AbstractControl (Reactive Forms), listen to valueChanges, touchedEventListener, and statusChanges
	if (control instanceof AbstractControl) {
		return combineLatest([
			control.valueChanges.pipe(startWith(control.value)),
			touchedEventListener(control),
			control.statusChanges.pipe(startWith(control.status)),
		]).pipe(
			map(([, touched]) => ({
				invalid: control.invalid,
				touched,
				dirty: control.dirty,
				errors: control.errors,
			}))
		);
	}

	// Iben: If the control is a Signal Forms FieldState, convert state signals to RxJS observables and combine them
	return combineLatest([
		toObservable(control.invalid, { injector }).pipe(startWith(control.invalid())),
		toObservable(control.touched, { injector }).pipe(startWith(control.touched())),
		toObservable(control.dirty, { injector }).pipe(startWith(control.dirty())),
		toObservable(control.errors, { injector }).pipe(startWith(control.errors())),
	]).pipe(
		map(([invalid, touched, dirty, errors]) => ({
			invalid,
			touched,
			dirty,
			errors,
		}))
	);
}
