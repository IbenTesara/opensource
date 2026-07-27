import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of, throwError } from 'rxjs';

import { createBaseStoreAssets } from '../utils/base-store/base-store.util';

import { handleEffect } from './handle-effect.operator';

describe('handleEffect', () => {
	let mockStore: MockStore;
	let actions: any;

	beforeEach(() => {
		const assets = createBaseStoreAssets<string>({ slice: 'test' });
		actions = assets.actions;

		TestBed.configureTestingModule({
			imports: [StoreModule.forRoot({})],
			providers: [provideMockStore()],
		});

		mockStore = TestBed.inject(MockStore);
		jest.spyOn(mockStore, 'dispatch');
	});

	it('should handle successful effect call and dispatch set action with payload', () => {
		TestBed.runInInjectionContext(() => {
			const source = jest.fn().mockReturnValue(of('success-data'));
			const operator = handleEffect(actions, 'set', source);

			const actionStream$ = of(actions.effects.set({ payload: 'input' }));
			const spy = subscribeSpyTo(actionStream$.pipe(operator));

			expect(spy.getValues()).toEqual([
				{
					type: actions.set.type,
					payload: 'success-data',
				},
			]);
			expect(source).toHaveBeenCalledWith('input');
			expect(mockStore.dispatch).toHaveBeenCalledWith(actions.loading({ payload: false }));
		});
	});

	it('should catch error and dispatch error action when source throws', () => {
		TestBed.runInInjectionContext(() => {
			const source = jest.fn().mockReturnValue(throwError(() => new Error('Failed')));
			const operator = handleEffect(actions, 'set', source);

			const actionStream$ = of(actions.effects.set({ payload: 'input' }));
			const spy = subscribeSpyTo(actionStream$.pipe(operator));

			expect(spy.getValues()).toEqual([
				{
					type: actions.error.type,
					payload: true,
				},
			]);
			expect(mockStore.dispatch).toHaveBeenCalledWith(actions.loading({ payload: false }));
		});
	});
});
