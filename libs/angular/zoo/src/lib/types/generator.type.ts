import { Route } from '@angular/router';

export type NgxZooRoute = string | [string, Route['loadComponent']];

export interface NgxZooRouteConfiguration {
	home: Route['loadComponent'];
	sections: NgxZooRoute[];
	content: NgxZooRoute[];
	animals?: Route['loadComponent'];
	animal?: Route['loadComponent'];
}
