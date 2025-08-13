import {
	ApplicationConfig,
	provideBrowserGlobalErrorListeners,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
	provideNgxModalConfiguration,
	provideNgxToastConfiguration,
	provideNgxTooltipConfiguration,
	provideNgxTourConfiguration,
} from '@lib/ngx-inform';
import { provideNgxMobileLayoutConfiguration } from '@lib/ngx-layout';
import { provideNgxCypressTags } from '@lib/ngx-utils';

import { ConfirmModalComponent } from '../packages/inform/components/confirm/confirm.component';
import { ToastComponent } from '../packages/inform/components/toast/toast.component';
import { TooltipComponent } from '../packages/inform/components/tooltip/tooltip.component';
import { TourStepComponent } from '../packages/inform/components/tour-step/tour-step.component';
import { MainHeaderComponent } from '../packages/mobile-layout/components/headers/main/main-header.component';
import { RightHeaderComponent } from '../packages/mobile-layout/components/headers/right/right-header.component';
import { NavigationComponent } from '../packages/mobile-layout/components/nav/nav.component';
import { CypressTags } from '../packages/utils/cypress-tags';

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
		provideNgxMobileLayoutConfiguration({
			layout: {
				header: {
					main: MainHeaderComponent,
					right: RightHeaderComponent,
				},
				navigation: NavigationComponent,
			},
		}),
		provideNgxToastConfiguration({
			component: ToastComponent,
			position: 'top-right',
			maxAmount: {
				strategy: 'ignore',
				amount: 1,
			},
    } ),
    provideNgxCypressTags(CypressTags)
	],
};
