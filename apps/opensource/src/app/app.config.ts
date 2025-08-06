import {
	ApplicationConfig,
	provideBrowserGlobalErrorListeners,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
	provideNgxModalConfiguration,
	provideNgxTooltipConfiguration,
	provideNgxTourConfiguration,
} from '@lib/ngx-inform';

import { ConfirmModalComponent } from '../packages/inform/components/confirm/confirm.component';
import { TooltipComponent } from '../packages/inform/components/tooltip/tooltip.component';
import { TourStepComponent } from '../packages/inform/components/tour-step/tour-step.component';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(appRoutes),
		provideNgxTourConfiguration(TourStepComponent),
		provideNgxTooltipConfiguration({
			component: TooltipComponent,
			defaultPosition: 'right',
		}),
		provideNgxModalConfiguration({
			modals: {
				confirm: {
					component: ConfirmModalComponent,
					role: 'alertdialog',
					autoClose: true,
				},
			},
		}),
	],
};
