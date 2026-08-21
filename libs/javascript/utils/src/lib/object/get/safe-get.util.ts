/**
 * Safely retrieves a property value from an object by key, returning `null` if the provided value is `undefined`, `null`, or not an object.
 *
 * @param {DataType} value - The object to retrieve the property from
 * @param {KeyType} key - The key of the property to retrieve
 */
export const safeGet = <DataType extends object = object, KeyType extends keyof DataType = any>(
	value: DataType,
	key: KeyType
): DataType[KeyType] | null => {
	// Iben: If the property is undefined, null or not an object, return null
	if (value === undefined || value === null || typeof value !== 'object') {
		return null;
	}

	// Iben: Return the value
	return value[key];
};
