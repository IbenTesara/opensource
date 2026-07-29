import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { scan, map, shareReplay } from 'rxjs/operators';

import { TranslationLoaderActionEntity } from './i18n-loading.types';

/**
 * A service that holds whether there currently are translation files being loaded into the application
 */
@Injectable({
	providedIn: 'root',
})
export class NgxI18nLoadingService {
	/**
	 * A subject to store all the translation loading actions
	 */
	protected readonly translationLoaderActionsSubject$ =
		new Subject<TranslationLoaderActionEntity>();

	/**
	 * A subject to store all the currently loaded translation files in, keyed by language
	 */
	protected readonly translationsSubject$ = new BehaviorSubject<
		Record<string, Record<string, unknown>>
	>({});

	/**
	 * A subject to store the failed state of translations
	 */
	protected readonly translationsFailedSubject$ = new BehaviorSubject<boolean>(false);

	/**
	 * A record of translation files currently loading, keyed by language
	 */
	protected translationsLoading: Record<string, Record<string, Observable<any>>> = {};

	// Iben: Check if all translations actions have completed
	public readonly translationsLoaded$ = this.translationLoaderActionsSubject$.pipe(
		// Iben: Hold a list of all actions and only add those that have a loading state
		// If the action is not loading, remove it from the actions array
		scan((actions: string[], action: TranslationLoaderActionEntity) => {
			return action.state === 'LOADING'
				? actions.concat(action.id)
				: actions.filter((actionFromResult) => actionFromResult !== action.id);
		}, []),
		// Iben: If no more actions are loading, we return true
		map((result) => result.length === 0)
	);

	public readonly translationsFailed$: Observable<boolean> =
		this.translationsFailedSubject$.asObservable();

	/**
	 * Dispatch the loading state of a set of translations
	 *
	 * @param action - The loading state of a set of translations
	 */
	public dispatchTranslationLoaderAction(action: TranslationLoaderActionEntity) {
		this.translationLoaderActionsSubject$.next(action);
	}

	/**
	 * Add loaded translations to the loaded translations record
	 *
	 * @param language - The language the translations belong to
	 * @param translations - The newly loaded translations
	 */
	public addLoadedTranslations(language: string, translations: Record<string, unknown>) {
		const current = this.translationsSubject$.getValue();

		this.translationsSubject$.next({
			...current,
			[language]: {
				...(current[language] || {}),
				...translations,
			},
		});
	}

	/**
	 * Fetches all the currently loaded translations for a given language
	 *
	 * @param language - The language to fetch translations for
	 */
	public getTranslations(language: string): Record<string, unknown> {
		return this.translationsSubject$.getValue()[language] || {};
	}

	/**
	 * Groups all the requests for a series of paths and ensures we only have a single observable to subscribe to
	 *
	 * @param language - The language we're loading translations for
	 * @param paths - The paths of we're loading translations for
	 * @param observable - The translations loading observable
	 */
	public loadTranslations(language: string, paths: string, observable: Observable<unknown>) {
		// Iben: If no translations have been loaded for this language yet, we create an empty record
		if (!this.translationsLoading[language]) {
			this.translationsLoading[language] = {};
		}

		// Iben: If loading of the translations has not been added to the array yet, we set it so we return a single observable
		if (!this.translationsLoading[language][paths]) {
			// Iben: Add shareReplay so the result is passed over each subscription
			this.translationsLoading[language][paths] = observable.pipe(shareReplay());
		}

		// Iben: Return the observable
		return this.translationsLoading[language][paths];
	}

	/**
	 * Mark the loading of the translations as failed
	 */
	public markTranslationsLoadedAsFailed() {
		console.error(
			'@ibenvandeveire/ngx-i18n - NgxI18nLoadingService: Something went wrong whilst fetching the translations.'
		);

		this.translationsFailedSubject$.next(false);
	}

	/**
	 * Clears all translations from the translation subject and resets the loading cache
	 */
	public clearTranslations() {
		this.translationsSubject$.next({});
		this.translationsLoading = {};
	}
}
