import { assertInInjectionContext, inject } from '@angular/core';
import { OperatorFunction, throwError, switchMap, map } from 'rxjs';

import { NgxTourService } from '../../../services';
import { NgxTourAction, NgxTourStep } from '../../../types';

/**
 * An operator that will start a tour
 *
 * *Important*: If the operator is not used in the injection context, an instance of the NgxTourService has to be provided
 *
 * @param tour - The tour we wish to start
 * @param onClose - An optional on close function we wish to run
 * @param startIndex - An optional index we wish to start the tour from , default this is 0
 * @param service - An optional instance of the NgxTourService
 */
export const startNgxTour = <DataType = unknown>(
	tour: NgxTourStep[],
	onClose?: NgxTourAction,
	startIndex = 0,
	service?: NgxTourService
): OperatorFunction<DataType, DataType> => {
	// Iben: Inject the modal service
	if (!service) {
		ngDevMode && assertInInjectionContext(startNgxTour);
		service = inject(NgxTourService);
	}

	// Iben: If no modal service was provided, we throw an error
	if (!service) {
		switchMap(() => {
			return throwError(() =>
				Error(
					'@ibenvandeveire/ngx-inform - NgxTour: No instance of NgxTourService was provided to the startNgxTour Operator.'
				)
			);
		});
	}

	// Iben: Start the tour
	return switchMap((data) => {
		return service.startTour(tour, onClose, startIndex).pipe(map(() => data));
	});
};
