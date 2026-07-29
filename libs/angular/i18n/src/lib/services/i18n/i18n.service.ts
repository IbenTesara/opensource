import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService, TranslationObject } from '@ngx-translate/core';
import { Observable, skip } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { NgxI18nAbstractService } from '../../abstracts';
import { NgxI18nRootService } from '../root-i18n/root-i18n.service';

/**
 * A service that holds the translations for an individual feature. Multiple instances of this service will exist throughout your application.
 */
@Injectable()
export class NgxI18nService implements NgxI18nAbstractService {
	/**
	 * Instance of Angular's DestroyRef, used to clean up the language change subscription
	 */
	private readonly destroyRef: DestroyRef = inject(DestroyRef);

	/**
	 * Instance of the NgxI8nRootService
	 */
	protected readonly rootI18nService: NgxI18nRootService = inject(NgxI18nRootService);

	/**
	 * Instance of the ngx-translate TranslateService
	 */
	protected readonly translateService: TranslateService = inject(TranslateService);

	constructor() {
		//Iben: When a new language is set, reload all translations for this scope.
		this.rootI18nService.currentLanguage$
			.pipe(
				// Iben: Skip the initial BehaviorSubject emission (undefined / already-set language),
				// so we only react to *changes* triggered after this instance is created.
				skip(1),
				switchMap((language) => this.initI18n(language)),
				takeUntilDestroyed(this.destroyRef)
			)
			.subscribe();
	}

	/**
	 * Returns the current language of the application
	 */
	public get currentLanguage(): string {
		return this.rootI18nService.currentLanguage;
	}

	/**
	 * Returns the available languages of the application
	 */
	public get availableLanguages(): string[] {
		return this.translateService.getLangs() as string[];
	}

	/**
	 * Returns the default language of the application
	 */
	public get defaultLanguage(): string {
		return this.translateService.getFallbackLang();
	}

	/**
	 * Initializes the translations based on the provided language
	 *
	 * @param language - The provided language
	 */
	public initI18n(language: string): Observable<unknown> {
		const targetLanguage = language || this.rootI18nService.currentLanguage;

		this.translateService.use(targetLanguage);

		/**
		 * Denis (9/7/2026)
		 *
		 * `TranslateService.reloadLang` will delete translations immediately
		 * when attempting to fetch new ones. Because the currently rendered components all share the same store,
		 * this creates a short instant where it is left without translations.
		 *
		 * By only switching out the translations when they are loaded, we close that gap.
		 */
		return this.translateService.currentLoader
			.getTranslation(targetLanguage)
			.pipe(
				tap((translations: TranslationObject) =>
					this.translateService.setTranslation(targetLanguage, translations)
				)
			);
	}

	/**
	 * Set the current language of the application
	 *
	 * @param language - The provided language
	 */
	public setLanguage(language: string): Observable<unknown> {
		// Iben: Update the root service — this emits on currentLanguage$, which triggers
		// the reactive subscription in every active NgxI18nService instance.
		this.rootI18nService.setCurrentLanguage(language);

		// Iben: Return the local initI18n observable so callers can await completion.
		return this.initI18n(language);
	}

	/**
	 * Returns an instant translation based on a provided key and params.
	 *
	 * Note: `params` is typed as `any` to match `@ngx-translate/core` parameter interpolation signatures.
	 *
	 * @param key - The key of the translation
	 * @param params - An optional set of params
	 */
	public getTranslation(key: string, params?: any): string {
		return this.translateService.instant(key, params);
	}

	// Denis: Set the default to string but allow for others.
	/**
	 * Returns a observable based translation based on a provided key and params.
	 *
	 * Note: `params` is typed as `any` to match `@ngx-translate/core` parameter interpolation signatures.
	 *
	 * @param key - The key of the translation
	 * @param params - An optional set of params
	 */
	public getTranslationObservable<TranslationType = string>(
		key: string,
		params?: any
	): Observable<TranslationType> {
		return this.translateService.get(key, params);
	}
}
