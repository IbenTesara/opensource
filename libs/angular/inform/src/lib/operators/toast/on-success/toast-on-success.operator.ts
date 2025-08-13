import { assertInInjectionContext, inject } from '@angular/core';
import { OperatorFunction, throwError, tap, switchMap } from 'rxjs';

import { NgxToastService } from '../../../services';
import { NgxToastCreator } from '../../../types';

/**
 * An operator that will display a toast on success
 *
 * *Important*: If the operator is not used in the injection context, an instance of the NgxToastService has to be provided
 *
 * @param toast - The toast we wish to display on success
 * @param toastService - An optional instance of the NgxToastService
 */
export const ngxToastOnSuccess = <ToastDataType = unknown, DataType = unknown>(
	toast: NgxToastCreator<ToastDataType> | string,
	service?: NgxToastService
): OperatorFunction<DataType, DataType> => {
	// Iben: Inject the toast service
	// Iben: Inject the toast service
	if (!service) {
		ngDevMode && assertInInjectionContext(ngxToastOnSuccess);
		service = inject(NgxToastService);
	}

	// Iben: If no toast service was provided, we throw an error
	if (!service) {
		switchMap(() => {
			return throwError(() =>
				Error(
					'@ibenvandeveire/ngx-inform - NgxToast: No instance of NgxToastService was provided to the ngxToastOnSuccess Operator.'
				)
			);
		});
	}

	// Iben: Show a toast
	return tap<DataType>(() => {
		service.showToast(toast);
	});
};
