import { Route } from '@angular/router';

import { generateNgxZooRoutes } from '@lib/zoo';

export const appRoutes: Route[] = generateNgxZooRoutes({
	home: () => import('../pages/home.page.component').then((m) => m.HomePageComponent),
	sections: ['worlds/africa', 'worlds/asia', 'worlds/north-america'],
	content: ['information'],
});
