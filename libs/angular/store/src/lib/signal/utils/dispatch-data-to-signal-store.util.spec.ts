import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { of, throwError } from 'rxjs';

import { dispatchDataToSignalStore } from './dispatch-data-to-signal-store.util';

describe('dispatchDataToSignalStore', () => {
	let mockSlice: any;
	let mockStore: any;

	beforeEach(() => {
		mockSlice = {
			setLoading: jest.fn(),
			setSaving: jest.fn(),
			setError: jest.fn(),
			set: jest.fn(),
		};
		mockStore = {
			user: mockSlice,
		};
	});

	it('should set loading, dispatch data to set action, and clear loading on completion', () => {
		const spy = subscribeSpyTo(
			dispatchDataToSignalStore('user', of({ name: 'John' }), mockStore, 'set')
		);

		expect(mockSlice.setLoading).toHaveBeenCalledWith(true);
		expect(mockSlice.setError).toHaveBeenCalledWith(false);
		expect(mockSlice.set).toHaveBeenCalledWith({ name: 'John' });
		expect(mockSlice.setLoading).toHaveBeenCalledWith(false);
		expect(spy.getValues()).toEqual([undefined]);
	});

	it('should set error on error', () => {
		const spy = subscribeSpyTo(
			dispatchDataToSignalStore(
				'user',
				throwError(() => new Error('Failed')),
				mockStore,
				'set'
			),
			{ expectErrors: true }
		);

		expect(mockSlice.setError).toHaveBeenCalledWith(true);
		expect(mockSlice.setLoading).toHaveBeenCalledWith(false);
		expect(spy.getError()).toBeDefined();
	});
});
