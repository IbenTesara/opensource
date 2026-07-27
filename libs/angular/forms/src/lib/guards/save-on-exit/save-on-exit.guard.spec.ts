import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { Observable, of } from 'rxjs';

import { NgxSaveOnExitAbstractService } from '../../abstracts';

import { NgxSaveOnExitGuard } from './save-on-exit.guard';

describe('NgxSaveOnExitGuard', () => {
	let saveOnExitServiceMock: { bypassSaveOnExit: jest.Mock; handleDirtyState: jest.Mock };

	beforeEach(() => {
		saveOnExitServiceMock = {
			bypassSaveOnExit: jest.fn().mockReturnValue(false),
			handleDirtyState: jest.fn().mockReturnValue(of(false)),
		};

		TestBed.configureTestingModule({
			providers: [{ provide: NgxSaveOnExitAbstractService, useValue: saveOnExitServiceMock }],
		});
	});

	it('should allow navigation if component is not dirty', () => {
		const componentMock: any = { isDirty: () => false };
		const result$ = TestBed.runInInjectionContext(() =>
			NgxSaveOnExitGuard(componentMock, {} as any, {} as any, {} as any)
		) as Observable<boolean>;

		const spy = subscribeSpyTo(result$);
		expect(spy.getValues()).toEqual([true]);
	});

	it('should delegate to saveOnExitService when component is dirty', () => {
		const componentMock: any = { isDirty: () => true };
		const result$ = TestBed.runInInjectionContext(() =>
			NgxSaveOnExitGuard(componentMock, {} as any, {} as any, {} as any)
		) as Observable<boolean>;

		const spy = subscribeSpyTo(result$);
		expect(spy.getValues()).toEqual([false]);
		expect(saveOnExitServiceMock.handleDirtyState).toHaveBeenCalledWith(componentMock);
	});
});
