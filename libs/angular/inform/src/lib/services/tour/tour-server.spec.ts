import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { NgxWindowService, NgxWindowServiceMock } from '@ibenvandeveire/ngx-core';

import { MockTourStepComponent, OverlayMock } from '../../mocks';
import { provideNgxTourConfiguration } from '../../providers';

import { NgxTourService } from './tour.service';

xdescribe('NgxTourService Server', () => {
	let service: NgxTourService;

	beforeEach(() => {
		const windowServiceMock = NgxWindowServiceMock(jest.fn);
		jest.spyOn(windowServiceMock, 'isBrowser').mockReturnValue(false);

		TestBed.configureTestingModule({
			imports: [MockTourStepComponent],
			providers: [
				NgxTourService,
				{
					provide: Overlay,
					useValue: OverlayMock(undefined, jest.fn()),
				},
				{
					provide: NgxWindowService,
					useValue: windowServiceMock,
				},
				provideNgxTourConfiguration({
					component: MockTourStepComponent,
					offset: {},
				}),
			],
		});
		TestBed.compileComponents();

		service = TestBed.inject(NgxTourService);
	});

	it('should not start the tour', (done) => {
		TestBed.runInInjectionContext(() => {
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
});
