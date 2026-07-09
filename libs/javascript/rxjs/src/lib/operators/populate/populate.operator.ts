import { clone } from 'remeda';
import { Observable, OperatorFunction, combineLatest, map, of, switchMap } from 'rxjs';

/**
 * getByPath
 *
 * Reads the value at a dot-separated path in an object
 *
 * @param data - The object we wish to read the value from
 * @param path - A dot-separated path to the property, e.g. 'ads.items'
 * @returns The value at the path, or undefined if it does not exist
 */
export const getByPath = (data: unknown, path: string): unknown =>
	path
		.split('.')
		.reduce<unknown>(
			(acc, key) => (acc == null ? undefined : (acc as Record<string, unknown>)[key]),
			data
		);

/**
 * setByPath
 *
 * Sets the value at a dot-separated path in an object, mutating it in place
 *
 * Any missing intermediate objects along the path are created as needed
 *
 * @param target - The object we wish to set the value on
 * @param path - A dot-separated path to the property, e.g. 'ads.items'
 * @param value - The value we wish to set at the path
 */
export const setByPath = (target: Record<string, unknown>, path: string, value: unknown): void => {
	const keys = path.split('.');
	const lastKey = keys.pop() as string;
	const parent = keys.reduce<Record<string, unknown>>((acc, key) => {
		if (typeof acc[key] !== 'object' || acc[key] === null) {
			acc[key] = {};
		}

		return acc[key] as Record<string, unknown>;
	}, target);

	parent[lastKey] = value;
};

//TODO: Iben: Find out a way to type this better than with any, but without introducing a complex typing hell
/**
 * Populates an existing data source with additional data from provided observables
 *
 * @param  populater - A record of which keys need to be updated with a provided observable
 * @param populateIf - An optional function to determine when a value needs to be fetched
 */
export const populate = <DataType extends object>(
	populater: Record<string, (data: DataType) => Observable<any>>,
	populateIf?: (value: any) => boolean
): OperatorFunction<DataType, DataType> => {
	return switchMap((data) => {
		// Iben: Filter out all keys that are populated
		const keys = Object.keys(populater).filter((key) => {
			const value = getByPath(data, key);

			// Iben: If no populateIf function is provided, we check if the value is undefined or null
			if (!populateIf) {
				return value === undefined || value === null;
			}

			// Iben: If a populateIf function is provided, we use this function to see whether we should populate a key
			return populateIf(value);
		});

		// Iben: Map the keys to their corresponding observables
		const observables = [...keys].map((key) => populater[key](data));

		// Iben: If no Observables were generated, return the data as is
		if (observables.length === 0) {
			return of(data);
		}

		// Iben: Loop over the provided observables and populate the data
		return combineLatest(observables).pipe(
			map((results) => {
				// Iben: Use clone to avoid issues with readonly properties
				const result = clone(data) as DataType;

				// Iben: Loop over the results and merge them into the value
				results.forEach((value, index) => {
					setByPath(result as Record<string, unknown>, keys[index], value);
				});

				return result;
			})
		);
	});
};
