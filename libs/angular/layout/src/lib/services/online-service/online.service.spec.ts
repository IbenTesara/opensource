import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { NgxWindowService } from '@ibenvandeveire/ngx-core';

import { NgxOnlineService } from './online.service';

describe('NgxOnlineService', () => {
	let windowServiceMock: { isBrowser: jest.Mock };

	beforeEach(() => {
		windowServiceMock = {
			isBrowser: jest.fn().mockReturnValue(true),
		};

		TestBed.configureTestingModule({
			providers: [
				NgxOnlineService,
				{
					provide: NgxWindowService,
					useValue: windowServiceMock,
				},
			],
		});
	});

	it('should react to window online and offline events in browser environment', () => {
		const service = TestBed.inject(NgxOnlineService);
		const spy = subscribeSpyTo(service.online$);

		// Iben: Dispatch window online event
		window.dispatchEvent(new Event('online'));
		expect(spy.getLastValue()).toBe(true);

		// Iben: Dispatch window offline event
		window.dispatchEvent(new Event('offline'));
		expect(spy.getLastValue()).toBe(false);
	});

	it('should not attach listeners when not in browser environment', () => {
		windowServiceMock.isBrowser.mockReturnValue(false);

		const service = TestBed.inject(NgxOnlineService);
		const spy = subscribeSpyTo(service.online$);

		window.dispatchEvent(new Event('online'));
		expect(spy.getLastValue()).toBeUndefined();
	});
});
