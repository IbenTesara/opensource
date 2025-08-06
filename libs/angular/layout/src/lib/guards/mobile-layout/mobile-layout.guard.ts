import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';

import { NgxMobileLayoutService } from '../../services';

/**
 * A guard that will set the mobile layout in the `NgxMobileLayoutService`
 */
export const NgxMobileLayoutGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
	// Iben: Get the layout service
	const layoutService: NgxMobileLayoutService = inject(NgxMobileLayoutService);

  // Iben: Set the desired layout
  // As the setLayout has a take one and we always want to continue routing, we can safely subscribe here
	layoutService.setLayout(route.data['mobileLayout']).subscribe();

	//Iben: Always return true as we merely set the layout
	return true;
};
