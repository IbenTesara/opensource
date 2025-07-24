import { InjectionToken } from '@angular/core';

type CypressLeafObject = Record<string,string> | string;
type CypressObject = Record<string,CypressLeafObject | string>;

/** The configuration token for the NgxCypressTagDirective */
export const NgxCypressTagConfigurationToken = new InjectionToken<CypressObject>(
	'NgxCypressTagConfigurationToken'
);
