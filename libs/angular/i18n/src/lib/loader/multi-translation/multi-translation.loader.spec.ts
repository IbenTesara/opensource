import { HttpBackend } from '@angular/common/http';
import { Injector, runInInjectionContext } from '@angular/core';
import { of, throwError } from 'rxjs';

import { NgxI18nLoadingService } from '../../services';
import {
	NgxI18nClientToken,
	NgxI18nConfigurationToken,
	NgxI18nTranslationPathsToken,
} from '../../tokens';

import { NgxI18nMultiTranslationHttpLoader } from './multi-translation.loader';

describe('NgxI18nMultiTranslationHttpLoader', () => {
	const createLoader = (
		loadingService: NgxI18nLoadingService,
		client: { getTranslations: jest.Mock },
		paths: string[]
	): NgxI18nMultiTranslationHttpLoader => {
		const injector = Injector.create({
			providers: [
				{ provide: NgxI18nLoadingService, useValue: loadingService },
				{ provide: NgxI18nClientToken, useValue: client },
				{ provide: NgxI18nConfigurationToken, useValue: {} },
				{ provide: HttpBackend, useValue: {} },
				{ provide: NgxI18nTranslationPathsToken, useValue: paths },
			],
		});

		return runInInjectionContext(injector, () => new NgxI18nMultiTranslationHttpLoader());
	};

	describe('getTranslation', () => {
		it('should not persist a failed fetch to the translations store, so it can be retried when the next loader is called that has overlap for that path.', (done) => {
			const failingPath = './assets/i18n/failing-path/';
			const translations = { foo: 'bar' };

			/**
			 * Denis: NgxI18nLoadingService is providedIn: 'root'. So in an actual app, a single instance
			 * is shared between the root-scoped loader and every lazy route's own loader (created via
			 * provideWithTranslations), which is what makes this cross-loader issues possible.
			 */
			const loadingService = new NgxI18nLoadingService();

			const failingClient = {
				getTranslations: jest
					.fn()
					.mockReturnValue(throwError(() => new Error('network error'))),
			};
			const firstLoader = createLoader(loadingService, failingClient, [failingPath]);

			firstLoader.getTranslation('nl').subscribe(() => {
				// Denis: the failed path should not be cached as "loaded".
				expect(loadingService.getTranslations()[failingPath]).toBeUndefined();

				const recoveredClient = {
					getTranslations: jest.fn().mockReturnValue(of(translations)),
				};
				const secondLoader = createLoader(loadingService, recoveredClient, [
					failingPath,
					'./assets/i18n/other-path/',
				]);

				secondLoader.getTranslation('nl').subscribe((result) => {
					expect(recoveredClient.getTranslations).toHaveBeenCalledWith(
						failingPath,
						'nl',
						undefined
					);
					expect(result).toEqual(translations);

					done();
				});
			});
		});

		it('should persist a successful fetch to the translations store so it is reused by a later loader for an overlapping path.', (done) => {
			const path = './assets/i18n/working-path/';
			const translations = { foo: 'bar' };

			const loadingService = new NgxI18nLoadingService();

			const client = {
				getTranslations: jest.fn().mockReturnValue(of(translations)),
			};
			const firstLoader = createLoader(loadingService, client, [path]);

			firstLoader.getTranslation('nl').subscribe(() => {
				expect(loadingService.getTranslations()[path]).toEqual(translations);

				const secondClient = {
					getTranslations: jest.fn().mockReturnValue(of({})),
				};
				const secondLoader = createLoader(loadingService, secondClient, [
					path,
					'./assets/i18n/other-path/',
				]);

				secondLoader.getTranslation('nl').subscribe(() => {
					// Denis: the already-loaded path should come from the store, not a fresh fetch.
					expect(secondClient.getTranslations).not.toHaveBeenCalledWith(
						path,
						'nl',
						undefined
					);

					done();
				});
			});
		});
	});
});
