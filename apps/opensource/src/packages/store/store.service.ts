import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import {
	dispatchDataToSignalStore,
	injectNgxSignalStore,
	NgxSignalStore,
	NgxSignalStoreService,
} from '@lib/ngx-store';

import { TestState, TestStore } from './store';

@Injectable()
export class StoreService extends NgxSignalStoreService<TestState> {
	protected override store: NgxSignalStore<TestState> = injectNgxSignalStore(TestStore);

	public sayHello(): Observable<void> {
		return dispatchDataToSignalStore<string>(
			'hello',
			of('Hello there!').pipe(delay(500)),
			this.store
		);
	}
}
