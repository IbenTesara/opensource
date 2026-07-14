import { HttpBackend } from '@angular/common/http';
import { Injector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { of, throwError } from 'rxjs';

import { NgxI18nLoadingService } from '../../services';
import {
	NgxI18nClientToken,
	NgxI18nConfigurationToken,
	NgxI18nTranslationPathsToken,
} from '../../tokens';

import { NgxI18nMultiTranslationHttpLoader } from './multi-translation.loader';

describe('NgxI18nMultiTranslationHttpLoader', () => {
	let loader: NgxI18nMultiTranslationHttpLoader;
	let loadingServiceMock: {
		getTranslations: jest.Mock;
		loadTranslations: jest.Mock;
		addLoadedTranslations: jest.Mock;
		markTranslationsLoadedAsFailed: jest.Mock;
	};
	let customClientMock: { getTranslations: jest.Mock };

	beforeEach(() => {
		loadingServiceMock = {
			getTranslations: jest.fn().mockReturnValue({}),
			loadTranslations: jest.fn().mockImplementation((_, obs) => obs),
			addLoadedTranslations: jest.fn(),
			markTranslationsLoadedAsFailed: jest.fn(),
		};

		customClientMock = {
			getTranslations: jest.fn().mockImplementation((path: string) => {
				if (path === 'assets/i18n/common/') {
					return of({ COMMON: { HELLO: 'Hello' } });
				}
				return of({ FEATURE: { WORLD: 'World' } });
			}),
		};

		TestBed.configureTestingModule({
			providers: [
				NgxI18nMultiTranslationHttpLoader,
				{ provide: NgxI18nLoadingService, useValue: loadingServiceMock },
				{ provide: NgxI18nClientToken, useValue: customClientMock },
				{ provide: NgxI18nConfigurationToken, useValue: { cacheBust: '1.0' } },
				{ provide: HttpBackend, useValue: {} },
				{
					provide: NgxI18nTranslationPathsToken,
					useValue: ['assets/i18n/common/', 'assets/i18n/feature/'],
				},
			],
		});

		loader = TestBed.inject(NgxI18nMultiTranslationHttpLoader);
	});

	it('should fetch and deepmerge translations using custom client', () => {
		const spy = subscribeSpyTo(loader.getTranslation('en'));

		expect(customClientMock.getTranslations).toHaveBeenCalledWith(
			'assets/i18n/common/',
			'en',
			'1.0'
		);
		expect(customClientMock.getTranslations).toHaveBeenCalledWith(
			'assets/i18n/feature/',
			'en',
			'1.0'
		);

		expect(spy.getLastValue()).toEqual({
			COMMON: { HELLO: 'Hello' },
			FEATURE: { WORLD: 'World' },
		});
		expect(loadingServiceMock.addLoadedTranslations).toHaveBeenCalledWith({
			'assets/i18n/common/': { COMMON: { HELLO: 'Hello' } },
			'assets/i18n/feature/': { FEATURE: { WORLD: 'World' } },
		});
	});

	it('should serve cached translations from store when available', () => {
		loadingServiceMock.getTranslations.mockReturnValue({
			'assets/i18n/common/': { COMMON: { HELLO: 'Cached Hello' } },
		});

		const spy = subscribeSpyTo(loader.getTranslation('en'));

		// Iben: Only the non-cached path should be requested
		expect(customClientMock.getTranslations).toHaveBeenCalledTimes(1);
		expect(customClientMock.getTranslations).toHaveBeenCalledWith(
			'assets/i18n/feature/',
			'en',
			'1.0'
		);

		expect(spy.getLastValue()).toEqual({
			COMMON: { HELLO: 'Cached Hello' },
			FEATURE: { WORLD: 'World' },
		});
	});

  describe('new tests', () => {
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
      it('should not persist a failed fetch to the translations store, so it can be retried when the next loader is called that has overlap for that path.', () => {
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

        subscribeSpyTo(firstLoader.getTranslation('nl'));

        // Denis: the failed path should not be cached as "loaded".
        expect(loadingService.getTranslations()[failingPath]).toBeUndefined();

        const recoveredClient = {
          getTranslations: jest.fn().mockReturnValue(of(translations)),
        };
        const secondLoader = createLoader(loadingService, recoveredClient, [
          failingPath,
          './assets/i18n/other-path/',
        ]);

        const secondSpy = subscribeSpyTo(secondLoader.getTranslation('nl'));

        expect(recoveredClient.getTranslations).toHaveBeenCalledWith(
          failingPath,
          'nl',
          undefined
        );
        expect(secondSpy.getFirstValue()).toEqual(translations);
      });

      it('should persist a successful fetch to the translations store so it is reused by a later loader for an overlapping path.', () => {
        const path = './assets/i18n/working-path/';
        const translations = { foo: 'bar' };

        const loadingService = new NgxI18nLoadingService();

        const client = {
          getTranslations: jest.fn().mockReturnValue(of(translations)),
        };
        const firstLoader = createLoader(loadingService, client, [path]);

        subscribeSpyTo(firstLoader.getTranslation('nl'));

        expect(loadingService.getTranslations()[path]).toEqual(translations);

        const secondClient = {
          getTranslations: jest.fn().mockReturnValue(of({})),
        };
        const secondLoader = createLoader(loadingService, secondClient, [
          path,
          './assets/i18n/other-path/',
        ]);

        subscribeSpyTo(secondLoader.getTranslation('nl'));

        // Denis: the already-loaded path should come from the store, not a fresh fetch.
        expect(secondClient.getTranslations).not.toHaveBeenCalledWith(path, 'nl', undefined);
      });
    });
  })
});
