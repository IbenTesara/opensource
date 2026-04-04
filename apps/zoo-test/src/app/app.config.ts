import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideNgxMobileLayoutConfiguration } from '@lib/ngx-layout';
import { provideNgxZooService } from '@lib/zoo';

import { NavigationComponent } from '../components';
import { ZooProviderService } from '../services/zoo.provider.service';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(appRoutes),
    provideNgxZooService( ZooProviderService ),
    provideNgxMobileLayoutConfiguration({
      navigation: NavigationComponent,
    }),
	],
};
