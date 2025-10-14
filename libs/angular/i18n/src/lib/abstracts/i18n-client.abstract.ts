import { Observable } from 'rxjs';

/**
 * An abstract service used to fetch translations
 */
export abstract class NgxI18nAbstractClient {
	/**
	 * A method to return translations
	 *
	 * @param path - The path to the translation
	 * @param language - The selected language
	 * @param cacheBust - An optional cacheBust parameter
	 */
	public abstract getTranslations(
		path: string,
		language: string,
		cacheBust?: string
	): Observable<Record<string, unknown>>;
}
