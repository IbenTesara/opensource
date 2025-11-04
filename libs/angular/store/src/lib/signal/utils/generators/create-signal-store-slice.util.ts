import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

import { NgxSignalStoreSlice } from '../../types';
import { ArrayElementType } from '../../types/signal-store-generator.types';

/**
 * Returns a SignalStoreSlice based on the provided configuration
 *
 * @param initialData - The provided slice
 */
export const createNgxSignalStoreSlice = <DataType>(initialData?: DataType) => {
	// Iben: Return the signalStore
	return signalStore(
		// Iben: Setup the initial state
		withState<NgxSignalStoreSlice<DataType>>({
			data: initialData,
			loading: false,
			error: false,
			saving: false,
		}),
		// Iben: Methods
		withMethods((store) => ({
			set(data: DataType) {
				patchState(store, () => ({ data, loading: false, error: false, saving: false }));
			},
			save(data: DataType) {
				patchState(store, () => ({ data, loading: false, error: false, saving: false }));
			},
			setLoading(loading: boolean) {
				patchState(store, () => ({ loading }));
			},
			setSaving(saving: boolean) {
				patchState(store, () => ({ saving }));
			},
			setError(error: boolean) {
				patchState(store, () => ({ error }));
			},
			reset() {
				patchState(store, () => ({ data: initialData }));
			},
			clear() {
				patchState(store, () => ({ data: undefined }));
			},
		}))
	);
};

/**
 * Returns a SignalStoreSlice based on the provided configuration, specifically for a slice that is an array
 *
 * @param initialData - The provided slice
 */
export const createNgxSignalStoreArraySlice = <DataType extends any[]>(
	initialData?: DataType,
	selectId?: (data: ArrayElementType<DataType>) => string | number
) => {
	// Iben: Return the signalStore
	return signalStore(
		// Iben: Setup the initial state
		withState<NgxSignalStoreSlice<DataType>>({
			data: initialData,
			loading: false,
			error: false,
			saving: false,
		}),
		// Iben: Methods
		withMethods((store) => ({
			set(data: DataType) {
				patchState(store, () => ({ data, loading: false, error: false, saving: false }));
			},
			save(data: DataType) {
				patchState(store, () => ({ data, loading: false, error: false, saving: false }));
			},
			add(data: DataType | ArrayElementType<DataType>) {
				patchState(store, (state) => {
					return {
						// Iben: Add a single or multiple items
						data: [
							...(state.data || []),
							...(Array.isArray(data) ? data : [data]),
						] as DataType,
					};
				});
			},
			prepend(data: DataType | ArrayElementType<DataType>) {
				patchState(store, (state) => {
					return {
						// Iben: Add a single or multiple items
						data: [
							...(Array.isArray(data) ? data : [data]),
							...(state.data || []),
						] as DataType,
					};
				});
			},
			update(data: ArrayElementType<DataType>) {
				patchState(store, (state) => {
					// Iben: Find the index of the item
					const itemIndex = state.data.findIndex((item) => {
						return selectId
							? selectId(item) === selectId(data)
							: item['id'] === data['id'];
					});

					// Iben: If the item wasn't found, return the state as is
					if (itemIndex === -1) {
						return state;
					}

					// Iben: If the item was found, update the state
					return {
						data: [
							...(state.data || []).slice(0, itemIndex),
							data,
							...(state.data || []).slice(itemIndex + 1),
						] as DataType,
					};
				});
			},
			remove(data: ArrayElementType<DataType>) {
				patchState(store, (state) => {
					// Iben: Find the index of the item
					const itemIndex = state.data.findIndex((item) => {
						return selectId
							? selectId(item) === selectId(data)
							: item['id'] === data['id'];
					});

					// Iben: If the item wasn't found, return the state as is
					if (itemIndex === -1) {
						return state;
					}

					// Iben: If the item was found, update the state
					return {
						data: [
							...(state.data || []).slice(0, itemIndex),
							...(state.data || []).slice(itemIndex + 1),
						] as DataType,
					};
				});
			},
			setLoading(loading: boolean) {
				patchState(store, () => ({ loading }));
			},
			setError(error: boolean) {
				patchState(store, () => ({ error }));
			},
			setSaving(saving: boolean) {
				patchState(store, () => ({ saving }));
			},
			reset() {
				patchState(store, () => ({ data: initialData }));
			},
			clear() {
				patchState(store, () => ({ data: [] as DataType }));
			},
		}))
	);
};
