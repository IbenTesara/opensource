import { assertInInjectionContext, inject } from '@angular/core';
import { OperatorFunction, throwError, switchMap } from 'rxjs';

import { NgxModalService } from '../../../services';
import { NgxModalActionType, NgxModalOptions } from '../../../types';

/**
 * An operator that will display a modal
 *
 * *Important*: If the operator is not used in the injection context, an instance of the NgxModalService has to be provided
 *
 * @param options - The options of the modal we wish to show
 * @param service - An optional instance of the NgxModalService
 */
export const openNgxModal = <
	ActionType extends NgxModalActionType = string,
	ModalDataType = unknown,
	DataType = unknown
>(
	options: NgxModalOptions<ActionType, ModalDataType>,
	service?: NgxModalService
): OperatorFunction<DataType, ActionType> => {
	// Iben: Inject the modal service
	if (!service) {
		ngDevMode && assertInInjectionContext(openNgxModal);
		service = inject(NgxModalService);
	}

	// Iben: If no modal service was provided, we throw an error
	if (!service) {
		switchMap(() => {
			return throwError(() =>
				Error(
					'@ibenvandeveire/ngx-inform - NgxModal: No instance of NgxModalService was provided to the openNgxModal Operator.'
				)
			);
		});
	}

	// Iben: Open a modal
	return switchMap(() => {
		return service.open<ActionType, ModalDataType>(options);
	});
};
