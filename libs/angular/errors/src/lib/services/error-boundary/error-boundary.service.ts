import { ErrorHandler, inject, Injectable, Injector } from '@angular/core';

import { NgxErrorHandler } from '../../abstracts';
import { NgxErrorBoundaryDirective } from '../../directives';
import { NgxErrorBoundaryConfigurationToken, NgxErrorBoundaryHandlerToken } from '../../token';
import { NgxError, NgxErrorBoundaryConfiguration } from '../../types';

@Injectable({ providedIn: 'root' })
export class NgxErrorBoundaryService implements ErrorHandler {
	protected injector: Injector = inject(Injector);
	/**
	 * The configuration
	 */
	protected readonly configuration: NgxErrorBoundaryConfiguration = inject(
		NgxErrorBoundaryConfigurationToken
	);

	/**
	 * A general error handler that will handle all errors
	 */
	protected readonly errorHandler: NgxErrorHandler = inject(NgxErrorBoundaryHandlerToken);

	/**
	 * A map with all the errors the application has ran into
	 */
	public readonly errors: Map<string, NgxError> = new Map();

	handleError(error: Error): void {
		const boundary: NgxErrorBoundaryDirective = this.injector.get(
			NgxErrorBoundaryDirective,
			undefined,
			{ optional: true }
    );


		if (!boundary) {
			console.log('No boundary found');
			this.errorHandler.handleError({
				element: null,
				priority: 'high',
				time: new Date().toDateString(),
				error,
			});

			return;
		}

		const ngxError = {
			element: boundary.id,
			priority: boundary.ngxErrorBoundary(),
			time: new Date().toDateString(),
			error,
		};

		// Iben: Handle the error in the overall error handler
		this.errorHandler.handleError(ngxError);

		// Iben: Early exit if we wish to ignore the errors in this component
		if (boundary.ngxErrorBoundary() === 'ignore') {
			return;
		}

		// Iben: Render the error
		boundary.renderError(ngxError, this.configuration.component);
	}
}
