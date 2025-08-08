/*
 * Public API Surface of store
 */
export { NgxStoreService } from './abstracts';
export type {
	BaseStoreAssets,
	EntityStoreAssets,
	NgxStore,
	BaseStoreActions,
	BaseStoreSelectors,
	EntityStoreActions,
	EntityStoreSelectors,
	StoreFlowAssets,
	BasicEntityAdapterActions,
} from './interfaces';
export {
	createStoreAssets,
	dispatchDataToStore,
	createBaseStoreAssets,
	createEntityAdapterStoreAssets,
} from './utils';
export { handleEffect } from './operators';
