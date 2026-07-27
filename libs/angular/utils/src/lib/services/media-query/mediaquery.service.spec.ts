import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { NgxWindowService } from '@ibenvandeveire/ngx-core';

import { NgxMediaQueryService } from './mediaquery.service';

describe('NgxMediaQueryService', () => {
	let service: NgxMediaQueryService;
	let matchMediaMock: jest.Mock;

	beforeEach(() => {
		matchMediaMock = jest.fn().mockImplementation((query) => ({
			matches: query.includes('min-width: 600px'),
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		}));

		TestBed.configureTestingModule({
			providers: [
				NgxMediaQueryService,
				{
					provide: NgxWindowService,
					useValue: {
						runInBrowser: (cb: any) =>
							cb({ browserWindow: { matchMedia: matchMediaMock } }),
					},
				},
			],
		});

		service = TestBed.inject(NgxMediaQueryService);
	});

	it('should register media queries and return matching observable', () => {
		service.registerMediaQueries(['mobile', '(min-width: 600px)']);
		const spy = subscribeSpyTo(service.getMatchingQuery$('mobile'));

		expect(spy.getValues()).toEqual([true]);
	});

	it('should throw error when asking for unregistered media query', () => {
		expect(() => service.getMatchingQuery$('unknown')).toThrow(
			/No media query with id 'unknown'/
		);
	});
});
