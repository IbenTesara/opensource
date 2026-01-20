import { Signal } from '@angular/core';
import { SignalStoreFeature } from '@ngrx/signals';

import {
	ArrayElementType,
	NgxSignalStoreSelectFunction,
	NgxSignalStoreSliceArrayGenerator,
	NgxSignalStoreSliceGenerator,
} from './signal-store-generator.types';

export type MethodsDictionary = Record<string, any>

/**
 * Data of an individual slice within an NgxSignalStore
 * @template DataType - The type of the data, by default unknown
 */
export interface NgxSignalStoreSlice<DataType = unknown> {
	data: DataType;
	loading: boolean;
	error: boolean;
	saving: boolean;
}

/**
 * The configuration to setup a slice in the NgxSignalStore
 */
export type NgxSignalStoreConfiguration<StateType extends NgxSignalStoreState> = {
	[Key in keyof StateType]: NgxSignalStoreSliceConfiguration<
		NgxSignalStoreSliceDataType<StateType[Key]>
	>;
};

/**
 * The configuration of a slice in the NgxSignalStore
 */
type NgxSignalStoreSliceConfiguration<DataType = unknown> = DataType extends unknown[]
	? DataType extends { id: string | number }[]
		? {
				generator: NgxSignalStoreSliceArrayGenerator<DataType>;
				initialData?: DataType;
		  }
		: {
				generator: NgxSignalStoreSliceArrayGenerator<DataType>;
				initialData?: DataType;
				selectId: NgxSignalStoreSelectFunction<DataType>;
		  }
	: DataType extends string | boolean | number | object
	? {
			generator: NgxSignalStoreSliceGenerator<DataType>;
			initialData?: DataType;
	  }
	: any;

/**
 * The state of a store
 */
export type NgxSignalStoreState = Record<string, NgxSignalStoreSlice>;

/**
 * Extracts the data type out of a NgxSignalStoreSlice
 */
type NgxSignalStoreSliceDataType<Type> = Type extends NgxSignalStoreSlice<infer DataType>
	? DataType
	: never;

/**
 * The methods that are available in the store
 */
type NgxSignalStoreSliceMethods<DataType> = [DataType] extends [unknown[]]
	? NgxSignalStoreSliceArrayMethods<DataType>
	: NgxSignalStoreSliceBaseMethods<DataType>;

/**
 * The methods that are available in the store for all slices
 */
export interface NgxSignalStoreSliceBaseMethods<DataType> extends MethodsDictionary {
	set: (data: DataType extends [never] ? boolean : DataType) => void;
	save: (data: DataType extends [never] ? boolean : DataType) => void;
	reset: () => void;
	clear: () => void;
	setError: (error: boolean) => void;
	setLoading: (loading: boolean) => void;
	setSaving: (saving: boolean) => void;
}

/**
 * Extra methods that are available in the store for array slices
 */
export interface NgxSignalStoreSliceArrayMethods<DataType>
	extends NgxSignalStoreSliceBaseMethods<DataType> {
	add: (data: DataType | ArrayElementType<DataType>) => void;
	prepend: (data: DataType | ArrayElementType<DataType>) => void;
	update: (data: ArrayElementType<DataType>) => void;
	remove: (data: ArrayElementType<DataType>) => void;
}

/**
 * The methods that are available to the dispatchDataToSignalStore method
 */
export type NgxSignalStoreDispatchActions = keyof Omit<
	NgxSignalStoreSliceArrayMethods<any[]>,
	'reset' | 'clear' | 'setError' | 'setLoading'
>;

/**
 * A record of the NgxSignalStore slices
 */
export type NgxSignalStoreRecord<StateType extends NgxSignalStoreState> = {
	[Key in keyof StateType]: SignalStoreFeature<{
		state: NgxSignalStoreSlice<NgxSignalStoreSliceDataType<StateType[Key]>>;
		props: undefined;
		methods: NgxSignalStoreSliceMethods<NgxSignalStoreSliceDataType<StateType[Key]>>;
	}>;
};

/**
 * A readonly version of the NgxSignalStore
 */
export type NgxSignalStoreViewState<StateType extends NgxSignalStoreState> = {
	[Key in keyof StateType]: {
		data: Signal<NgxSignalStoreSliceDataType<StateType[Key]>>;
		loading: Signal<boolean>;
		error: Signal<boolean>;
		saving: Signal<boolean>;
	};
};

/**
 * A writable version of the NgxSignalStore
 */
export type NgxSignalStore<StateType extends NgxSignalStoreState = any> = {
	[Key in keyof StateType]: {
		data: Signal<NgxSignalStoreSliceDataType<StateType[Key]>>;
		loading: Signal<boolean>;
		error: Signal<boolean>;
		saving: Signal<boolean>;
	} & NgxSignalStoreSliceMethods<NgxSignalStoreSliceDataType<StateType[Key]>>;
};
