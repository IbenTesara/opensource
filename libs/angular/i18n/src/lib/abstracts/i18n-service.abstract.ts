/**
 * An abstract service used to fetch the current language
 */
export abstract class NgxI18nAbstractService<Language = string> {

	/**
   * A method to return the current language
   */
  public abstract get currentLanguage(): Language;
}
