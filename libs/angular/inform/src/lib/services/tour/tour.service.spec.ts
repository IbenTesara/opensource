import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { NgxWindowService, NgxWindowServiceMock } from '@ibenvandeveire/ngx-core';

import { MockTourStepComponent, OverlayMock } from '../../mocks';
import { provideNgxTourConfiguration } from '../../providers';

import { NgxTourService } from './tour.service';

window.scrollTo = jest.fn();

//TODO: Iben: Add Cypress tests so we can test the actual flow and the remaining methods

//TODO: Wouter: Fix the failing tests, the currentStep$ is not emitting the correct values at the correct time for the tests to intercept.
describe('NgxTourService Browser', () => {
	let service: NgxTourService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [MockTourStepComponent],
			providers: [
				NgxTourService,
				{
					provide: Overlay,
					useValue: OverlayMock(undefined),
				},
				{
					provide: NgxWindowService,
					useValue: NgxWindowServiceMock(jest.fn()),
				},
				provideNgxTourConfiguration({
					component: MockTourStepComponent,
					offset: {},
				}),
			],
    } );
    TestBed.compileComponents();
		service = TestBed.inject(NgxTourService);
	});

	afterAll(() => {
		jest.clearAllMocks();
	});

  it( 'should emit when the tour has started',() => {
    TestBed.runInInjectionContext( () => {
      const spy = subscribeSpyTo(service.tourStarted$);

      service.startTour([{ title: 'hello', content: 'world' }]).subscribe();
      expect(spy.getValuesLength()).toEqual(1);
    } );
	});

	it('should emit when the tour has closed', () => {
    TestBed.runInInjectionContext( () => {
      const spy = subscribeSpyTo(service.tourEnded$);

      service.startTour([{ title: 'hello', content: 'world' }]).subscribe();
      service.closeTour().subscribe();

      expect(spy.getValuesLength()).toEqual(1);
    });
	});

  it.only( 'should emit the current step',() => {
    TestBed.runInInjectionContext( () => {
      const stepSpy = subscribeSpyTo(service.currentStep$);
      const indexSpy = subscribeSpyTo(service.currentIndex$);

      service.startTour([{ title: 'hello', content: 'world' }]).subscribe();

      expect(indexSpy.getValues()).toEqual([0]);
      expect(stepSpy.receivedNext()).toBe(true);
      expect(stepSpy.getValues()).toEqual([{ title: 'hello', content: 'world' }]);
    });
	});

	it.only('should start the tour at the provided index', () => {
    TestBed.runInInjectionContext( () => {
      const spy = subscribeSpyTo(service.currentStep$);
      const indexSpy = subscribeSpyTo(service.currentIndex$);

      service
        .startTour(
          [
            { title: 'hello', content: 'world' },
            { title: 'step', content: 'two' },
          ],
          undefined,
          1
        )
        .subscribe();

      expect(spy.getValues()).toEqual([{ title: 'step', content: 'two' }]);
      expect(indexSpy.getValues()).toEqual([0, 1]);
    });
	});
});

