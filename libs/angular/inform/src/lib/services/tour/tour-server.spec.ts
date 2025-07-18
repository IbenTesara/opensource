import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { NgxWindowService, NgxWindowServiceMock } from '@iben/ngx-core';

import { MockTourStepComponent, OverlayMock } from '../../mocks';
import { provideNgxTourConfiguration } from '../../providers';

import { NgxTourService } from './tour.service';

describe('NgxTourService Server', () => {
	let service: NgxTourService;

	beforeEach(() => {
		const windowServiceMock = NgxWindowServiceMock(undefined);
		jest.spyOn(windowServiceMock, 'isBrowser').mockReturnValue(false);

		TestBed.configureTestingModule({
			providers: [
				NgxTourService,
				{
					provide: Overlay,
					useValue: OverlayMock(new MockTourStepComponent()),
				},
				{
					provide: NgxWindowService,
					useValue: NgxWindowServiceMock,
				},
				provideNgxTourConfiguration({
					component: MockTourStepComponent,
					offset: {},
				}),
			],
		});

		service = TestBed.inject(NgxTourService);
	});

	it('should not start the tour', (done) => {
		const tourStartedSpy = subscribeSpyTo(service.tourStarted$);
		const tourEndedSpy = subscribeSpyTo(service.tourEnded$);
		const tourActiveSpy = subscribeSpyTo(service.tourActive$);
		const consoleSpy = jest.spyOn(console, 'warn');

		service.startTour([{ title: 'hello', content: 'world' }]).subscribe(() => done());

		expect(tourStartedSpy.receivedNext()).toBe(false);
		expect(tourEndedSpy.receivedNext()).toBe(false);
		expect(tourActiveSpy.getValues()).toEqual([false]);
		expect(consoleSpy).toHaveBeenCalledTimes(1);
	});
});
