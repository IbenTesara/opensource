/**
 * The configuration we can pass to the translation system
 */
export interface NgxI18nConfiguration {
	/**
	 * The default language the application should be in
	 */
	defaultLanguage: string;
	/**
	 * A list of languages the application has translations for
	 */
	availableLanguages?: string[];
	/**
	 * A list of default translation files we want to load in if we don't provide a custom loader
	 */
	defaultAssetPaths: string[];
	/**
	 * The param name we use for the language, by default this is `language`
	 */
	languageRouteParam?: string;
	/**
	 * The cache busting parameter to append to the translation file requests.
	 * This can be useful when you want to force the browser to fetch the latest
	 * version of the translation files by appending this value to the `v` query
	 * parameter.
	 *
	 * When not provided, no query parameter will be added to the request.
	 *
	 * @example
	 * `?v=1` when `cacheBust: '' + 1`
	 * `?v=1.0.0` when `cacheBust: '1.0.0'`
	 * `?v=1743428073628` when `cacheBust: String(Date.now())`
	 */
	cacheBust?: string;
}
