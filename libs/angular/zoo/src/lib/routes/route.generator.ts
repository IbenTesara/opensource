import { Routes } from '@angular/router';

import { NgxZooRouteConfiguration } from '../types';

export const generateNgxZooRoutes = (
	configuration: NgxZooRouteConfiguration,
	extraRoutes: Routes = []
): Routes => {
	return [
		{
			path: '',
			pathMatch: 'full',
			loadComponent: configuration.home,
		},
		...configuration.sections.map((route) =>
			Array.isArray(route)
				? {
						path: route[0],
						loadComponent: route[1],
					}
				: {
						path: route,
						loadComponent: () =>
							import('../pages/section/section.page.component').then(
								(m) => m.NgxZooSectionPageComponent
							),
					}
		),
		...configuration.content.map((route) =>
			Array.isArray(route)
				? {
						path: route[0],
						loadComponent: route[1],
					}
				: {
						path: route,
						loadComponent: () =>
							import('../pages/content/content.page.component').then(
								(m) => m.NgxZooContentPageComponent
							),
					}
		),
		{
			path: 'animals',
			loadComponent: configuration.animals
				? configuration.animals
				: () =>
						import('../pages/animals/animals.page.component').then(
							(m) => m.NgxZooAnimalsPageComponent
						),
		},
		{
			path: 'animals/:id',
			loadComponent: configuration.animal
				? configuration.animal
				: () =>
						import('../pages/animal/animal.page.component').then(
							(m) => m.NgxZooAnimalPageComponent
						),
		},
		...extraRoutes,
	];
};
