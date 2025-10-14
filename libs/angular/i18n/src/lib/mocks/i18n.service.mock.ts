/**
 * Returns a mock version of the NgxI18nService
 *
 * @param testFunction - The test function we want to use
 * @param currentLanguage - The current language
 * @param defaultLanguage - The default language
 * @param availableLanguages - The list of available languages
 */
export const NgxI18nServiceMock = (
	testFunction: Function,
	currentLanguage: string,
	defaultLanguage: string,
	availableLanguages: string[]
) => ({
	currentLanguage,
	availableLanguages,
	defaultLanguage,
	initI18n: testFunction,
	setLanguage: testFunction,
	getTranslation: testFunction,
	getTranslationObservable: testFunction,
});
