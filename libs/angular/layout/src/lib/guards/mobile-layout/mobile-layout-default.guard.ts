import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';

import { NgxMobileLayoutService } from '../../services';
import { ComponentType } from '../../types';

/**
 * A guard that will set the default mobile layout in the `NgxMobileLayoutService`
 */
export const NgxMobileLayoutDefaultGuard: CanDeactivateFn<ComponentType> = () => {
	// Iben: Get the layout service
	const layoutService: NgxMobileLayoutService = inject(NgxMobileLayoutService);

	// Iben: Set the default layout
	layoutService.setUpInitialLayout(false);

	//Iben: Always return true as we merely set the layout
	return true;
};
