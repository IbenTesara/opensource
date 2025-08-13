import { TestBed } from '@angular/core/testing';
import { catchError, finalize, of, take, throwError } from 'rxjs';

import { NgxToastServiceMock } from '../../../mocks';
import { NgxToastService } from '../../../services';

import { ngxToastOnError } from './toast-on-error.operator';

describe('ngxToastOnError', () => {
	let service: NgxToastService;

	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [NgxToastServiceMock(jest.fn())] });

		service = TestBed.inject(NgxToastService);
	});

	it('should display a toast on error', (done) => {
		const source = throwError(() => new Error('This is an error'));

		source
			.pipe(
				take(1),
				ngxToastOnError({ text: 'This is an error toast!' }, service),
				catchError(() => 'Hello'),
				finalize(() => {
					done();
				})
			)
			.subscribe(() => {
				expect(service.showToast).toHaveBeenCalledWith({ text: 'This is an error toast!' });
			});
	});

	it('should not display a toast when there is no error', (done) => {
		const source = of('Hello');

		source
			.pipe(
				take(1),
				ngxToastOnError({ text: 'This is an error toast!' }, service),
				finalize(() => {
					done();
				})
			)
			.subscribe(() => {
				expect(service.showToast).not.toHaveBeenCalled();
			});
	});
});
