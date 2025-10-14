import { BehaviorSubject, Subject } from 'rxjs';

/**
 * Returns a mock version of the NgxI18nRootService
 *
 * @param testFunction - The test function we want to use
 * @param defaultLanguage - The default language
 * @param languageRouteParam - An optional language param, by default `language`
 */
export const NgxI18nRootServiceMock = (
	testFunction: Function,
	defaultLanguage: string,
	languageRouteParam?: string
) => {
	const currentLanguage$ = new BehaviorSubject(defaultLanguage);

	return {
		availableLanguages$: new Subject(),
		defaultLanguage,
		languageRouteParam: languageRouteParam || 'language',
		currentLanguage$,
		currentLanguage: () => currentLanguage$.getValue(),
		setCurrentLanguage: testFunction,
		initializeLanguage: testFunction,
		setAvailableLanguages: testFunction,
		getNewLanguage: testFunction,
	};
};
