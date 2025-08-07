/**
 * A translation loading action, in which we indicate whether a file has been loaded or not
 */
export interface TranslationLoaderActionEntity {
	id: string;
	state: keyof typeof TranslationLoaderActionStateEnum;
}

/**
 * The state of a translation loading action
 */
enum TranslationLoaderActionStateEnum {
	LOADING = 'LOADING',
	LOADED = 'LOADED',
}
