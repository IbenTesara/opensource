import { HttpBackend } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { of } from 'rxjs';

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
});
