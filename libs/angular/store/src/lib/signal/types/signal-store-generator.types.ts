/**
 * An extraction type to get the type of an element in an array type
 */
export type ArrayElementType<ArrayType> = ArrayType extends (infer DataType)[] ? DataType : never;

/**
 * The function we use to select an unique element in a slice with array data
 */
export type NgxSignalStoreSelectFunction<DataType extends unknown[]> = (
	data: ArrayElementType<DataType>
) => string | number;

/**
 * The generator function we use to create slices with array data
 */
export type NgxSignalStoreSliceArrayGenerator<DataType extends unknown[]> = (
	initialData?: DataType,
	selectId?: NgxSignalStoreSelectFunction<DataType>
) => any;

/**
 * The generator function we use to create slices with non array data
 */
export type NgxSignalStoreSliceGenerator<DataType extends string | number | object | boolean> = (
	initialData?: DataType
) => any;
