import { Type } from '@angular/core';

import {
	ComponentType,
	NgxMobileLayoutByQuery,
	NgxMobileLayoutConfiguration,
	NgxMobileLayoutItem,
} from '../../types';

/**
 * Extracts the layout from the configuration and sorts them by query
 *
 * @param layout - The layout configuration we wish to set
 * @param defaultLayout - The default layout that was set
 * @param queries - The queries set to the NgxMediaQueryService
 */
export const extractLayout = (
	layout: NgxMobileLayoutConfiguration,
	defaultLayout: NgxMobileLayoutConfiguration | undefined,
	queries: string[]
): NgxMobileLayoutByQuery => {
	return {
		header: {
			left: extractComponents(layout?.header?.left, defaultLayout?.header?.left, queries),
			main: extractComponents(layout?.header?.main, defaultLayout?.header?.main, queries),
			right: extractComponents(layout?.header?.right, defaultLayout?.header?.right, queries),
		},
		navigation: extractComponents(layout?.navigation, defaultLayout?.navigation, queries),
		aside: extractComponents(layout?.aside, defaultLayout?.aside, queries),
		flyout: extractComponents(layout?.flyout, defaultLayout?.flyout, queries),
		footer: extractComponents(layout?.footer, defaultLayout?.footer, queries),
	};
};

/**
 * Extracts the components from the item and creates a layout item per query
 *
 * @param item - The item used by the layout
 * @param defaultLayout - The default layout that was set
 * @param queries - The queries set to the NgxMediaQueryService
 */
const extractComponents = (
	item: NgxMobileLayoutItem,
	defaultLayout: NgxMobileLayoutItem,
	queries: string[]
): Record<string, ComponentType> => {
	// Iben: If the item is null, we return an empty object
	if (item === null) {
		return {};
	}

	// Iben: If a single component is presented, we use this component for each query
	if (item instanceof Type) {
		const result = {};

		queries.forEach((query) => {
			result[query] = item;
		});

		return result;
	}

	// Iben: In this case, a record of components was provided
	const result = { ...(item || {}) };

	// Iben: If no default was provided, we return the record as is.
	if (!defaultLayout) {
		return result;
	}

	// Iben: If the default layout is a single component, we fill in the missing gaps
	if (defaultLayout instanceof Type) {
		queries.forEach((query) => {
			if (result[query] === undefined) {
				result[query] = defaultLayout;
			}
		});
	} else {
		// Iben: If the default layout is a a record, we fill in the missing gaps with the ones that are provided
		queries.forEach((query) => {
			if (result[query] === undefined) {
				result[query] = defaultLayout[query];
			}
		});
	}

	return result;
};
