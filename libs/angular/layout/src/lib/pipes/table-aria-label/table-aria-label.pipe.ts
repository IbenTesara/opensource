import { inject, Pipe, PipeTransform } from '@angular/core';

import { NgxTableConfigurationToken } from '../../tokens';
import { NgxTableAriaLabels } from '../../types';

// Iben: Define configuration keys and fallback prefixes mapping at module level to prevent re-allocation
const CONFIG_MAPPING = {
	select: { key: 'selectRow' as const, fallbackPrefix: 'Select' },
	expand: { key: 'expandRow' as const, fallbackPrefix: 'Expand' },
	collapse: { key: 'collapseRow' as const, fallbackPrefix: 'Collapse' },
};

@Pipe({
	name: 'ngxTableAriaLabel',
	standalone: true,
})
export class NgxTableAriaLabelPipe implements PipeTransform {
	/**
	 * The global configuration we wish to use for the table
	 */
	private readonly globalConfig = inject(NgxTableConfigurationToken, { optional: true });

	/**
	 * Resolves the ARIA label we wish to set on the selection and expansion controls
	 *
	 * @param index - The index of the row we wish to target, undefined for the header controls
	 * @param type - The action type we wish to perform
	 * @param config - The custom ARIA labels configuration we wish to use
	 */
	transform(
		index: number | undefined,
		type: 'select' | 'expand' | 'collapse',
		config?: NgxTableAriaLabels
	): string {
		// Iben: If the index is undefined, we resolve and return the select all label
		if (index === undefined) {
			return (
				config?.selectAll ?? this.globalConfig?.ariaLabels?.selectAll ?? 'Select all rows'
			);
		}

		const { key, fallbackPrefix } = CONFIG_MAPPING[type];

		// Iben: Resolve the configured label (local overrides global)
		const label = config?.[key] ?? this.globalConfig?.ariaLabels?.[key];

		// Iben: Return dynamic callback value if it is a function
		if (typeof label === 'function') {
			return label(index);
		}

		// Iben: Return static string if configured
		if (typeof label === 'string') {
			return label;
		}

		// Iben: Fallback to the standard English label
		return `${fallbackPrefix} row ${index + 1}`;
	}
}
