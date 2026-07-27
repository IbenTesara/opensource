import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { of } from 'rxjs';

import { NgxI18nLoadingService, NgxI18nService } from '../../services';

import { NgxI18nTranslationLoaderResolver } from './i18n.resolver';

describe('NgxI18nTranslationLoaderResolver', () => {
	let resolver: NgxI18nTranslationLoaderResolver;
	let i18nServiceMock: { initI18n: jest.Mock; currentLanguage: string };
	let i18nLoadingServiceMock: { dispatchTranslationLoaderAction: jest.Mock };

	beforeEach(() => {
		i18nServiceMock = {
			initI18n: jest.fn().mockReturnValue(of({})),
			currentLanguage: 'en',
		};

		i18nLoadingServiceMock = {
			dispatchTranslationLoaderAction: jest.fn(),
		};

		TestBed.configureTestingModule({
			providers: [
				NgxI18nTranslationLoaderResolver,
				{ provide: NgxI18nService, useValue: i18nServiceMock },
				{ provide: NgxI18nLoadingService, useValue: i18nLoadingServiceMock },
			],
		});

		resolver = TestBed.inject(NgxI18nTranslationLoaderResolver);
	});

	it('should dispatch loading and loaded actions during resolution', () => {
		const spy = subscribeSpyTo(resolver.resolve());

		expect(spy.getValues()).toEqual([true]);
		expect(i18nLoadingServiceMock.dispatchTranslationLoaderAction).toHaveBeenCalledWith(
			expect.objectContaining({ state: 'LOADING' })
		);
		expect(i18nLoadingServiceMock.dispatchTranslationLoaderAction).toHaveBeenCalledWith(
			expect.objectContaining({ state: 'LOADED' })
		);
	});
});
