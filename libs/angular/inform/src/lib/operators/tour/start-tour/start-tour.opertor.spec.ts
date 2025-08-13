import { TestBed } from '@angular/core/testing';
import { finalize, of, take } from 'rxjs';

import { NgxTourServiceMock } from '../../../mocks';
import { NgxTourService } from '../../../services';

import { startNgxTour } from './start-tour.operator';

describe('startNgxTour', () => {
	let service: NgxTourService;

	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [NgxTourServiceMock(jest.fn())] });

		service = TestBed.inject(NgxTourService);
	});

	it('should start a tour', (done) => {
		const source = of('Hello');

		source
			.pipe(
				take(1),
				startNgxTour(
          [],
          undefined,
          0,
					service
				),
				finalize(() => {
					done();
				})
			)
			.subscribe(() => {
				expect(service.startTour).toHaveBeenCalledWith([], undefined, 0, service);
			});
	});
});
