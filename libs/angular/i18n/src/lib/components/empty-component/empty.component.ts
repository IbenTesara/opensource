import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * This is an empty dummy component that can be used in combination with the NgxI18nSetLanguageGuard when needed
 */
@Component({
	selector: 'ngx-i18n-empty',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.Eager,
	template: '',
})
export class NgxI18nEmptyComponent {}
