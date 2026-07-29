import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { Observable, of } from 'rxjs';

import { NgxI18nLoadingService } from './i18n-loading.service';
import { TranslationLoaderActionEntity } from './i18n-loading.types';

describe('NgxI18nLoadingService', () => {
	describe('observables', () => {
		describe('translationsLoaded$', () => {
			it('should return false if no results have been found', () => {
				const service = new NgxI18nLoadingService();
				const spy = subscribeSpyTo(service.translationsLoaded$);

				service.dispatchTranslationLoaderAction({
					id: 'test-id',
					state: 'LOADING',
				});

				expect(spy.getLastValue()).toBeFalsy();
			});

			it('should return true if results have been found', () => {
				const service = new NgxI18nLoadingService();
				const spy = subscribeSpyTo(service.translationsLoaded$);

				service.dispatchTranslationLoaderAction({
					id: 'test-id',
					state: 'LOADING',
				});

				expect(spy.getLastValue()).toBeFalsy();

				service.dispatchTranslationLoaderAction({
					id: 'test-id',
					state: 'LOADED',
				});

				expect(spy.getLastValue()).toBeTruthy();
			});
		});
	});

	describe('dispatchTranslationLoaderAction', () => {
		it('should push a new action to the translationLoaderActionsSubject$', () => {
			const service = new NgxI18nLoadingService();
			const action: TranslationLoaderActionEntity = {
				id: 'test-id',
				state: 'LOADING',
			};
			const spy = subscribeSpyTo(service['translationLoaderActionsSubject$']);

			service.dispatchTranslationLoaderAction(action);

			expect(spy.getLastValue()).toEqual(action);
		});
	});

	describe('addLoadedTranslations', () => {
		it('should merge & push a new value to the translationsSubject$ for the given language', () => {
			const service = new NgxI18nLoadingService();
			const existingTranslations: Record<string, Record<string, unknown>> = {
				nl: { 'path/a': 'existing-translation' },
			};
			const newTranslations: Record<string, unknown> = {
				'path/b': 'new-translation',
			};

			service['translationsSubject$'].next(existingTranslations);

			const spy = subscribeSpyTo(service['translationsSubject$']);

			service.addLoadedTranslations('nl', newTranslations);

			expect(spy.getLastValue()).toEqual({
				nl: {
					'path/a': 'existing-translation',
					'path/b': 'new-translation',
				},
			});
		});
	});

	describe('getTranslations', () => {
		it('should return the current value of the translationsSubject$ for the given language', () => {
			const service = new NgxI18nLoadingService();
			const existingTranslations: Record<string, Record<string, unknown>> = {
				nl: { 'path/a': 'test-translation' },
			};

			service['translationsSubject$'].next(existingTranslations);

			expect(service.getTranslations('nl')).toEqual({ 'path/a': 'test-translation' });
			expect(service.getTranslations('fr')).toEqual({});
		});
	});

	describe('loadTranslations', () => {
		it('should create a new entry in the translationsLoading record if the language/path does not exist', () => {
			const service = new NgxI18nLoadingService();

			service['translationsLoading'] = {};

			expect(service['translationsLoading']['nl']).toBeUndefined();

			const spy = subscribeSpyTo(
				service.loadTranslations(
					'nl',
					'something',
					of({
						en: 'test-translation',
					})
				)
			);

			expect(spy.getLastValue()).toEqual({
				en: 'test-translation',
			});

			expect(service['translationsLoading']['nl']['something']).toBeInstanceOf(Observable);
		});

		it('should return the existing observable if it exists for the same language and path', () => {
			const service = new NgxI18nLoadingService();

			service['translationsLoading'] = {
				nl: {
					something: of({
						en: 'test-translation',
					}),
				},
			};

			expect(service['translationsLoading']['nl']['something']).toBeInstanceOf(Observable);

			const spy = subscribeSpyTo(
				service.loadTranslations(
					'nl',
					'something',
					of({
						nl: 'test-translation',
					})
				)
			);

			expect(spy.getLastValue()).toEqual({
				en: 'test-translation',
			});
		});

		it('should fetch new translations when the language changes even for the same paths', () => {
			const service = new NgxI18nLoadingService();

			service['translationsLoading'] = {
				nl: {
					something: of({
						nl: 'dutch-translation',
					}),
				},
			};

			const spy = subscribeSpyTo(
				service.loadTranslations(
					'fr',
					'something',
					of({
						fr: 'french-translation',
					})
				)
			);

			expect(spy.getLastValue()).toEqual({
				fr: 'french-translation',
			});
		});
	});

	describe('markTranslationsLoadedAsFailed', () => {
		it('should push a false value the translationsFailedSubject$', () => {
			const service = new NgxI18nLoadingService();
			const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

			const spy = subscribeSpyTo(service.translationsFailed$);

			service.markTranslationsLoadedAsFailed();

			expect(spy.getLastValue()).toBeFalsy();
			expect(consoleSpy).toHaveBeenCalledWith(
				'@ibenvandeveire/ngx-i18n - NgxI18nLoadingService: Something went wrong whilst fetching the translations.'
			);

			consoleSpy.mockRestore();
		});
	});
});
