import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of, Subscription } from 'rxjs';

import { NgxI18nRootService } from '../root-i18n/root-i18n.service';

import { NgxI18nService } from './i18n.service';

const translateService: any = {
	currentLang: 'nl',
	getLangs: jest.fn().mockReturnValue(['nl', 'en']),
	getFallbackLang: jest.fn().mockReturnValue('nl'),
	use: jest.fn(),
	reloadLang: jest.fn().mockReturnValue(of('nl')),
	get: jest.fn().mockReturnValue(of('something')),
	instant: jest.fn().mockReturnValue('something'),
};

const rootI18nService: any = {
	setCurrentLanguage: jest.fn(),
	currentLanguage: translateService.currentLang,
};

describe('NgxI18nService', () => {
	let service;

	const subscriptions: Subscription[] = [];

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				NgxI18nService,
				{
					provide: NgxI18nRootService,
					useValue: rootI18nService,
				},
				{
					provide: TranslateService,
					useValue: translateService,
				},
			],
		});

		service = TestBed.inject(NgxI18nService);
	});

	afterEach(() => {
		subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
	});

	describe('currentLanguage', () => {
		it('should return the currentLang from the translateService', () => {
			expect(service.currentLanguage).toBe(translateService.currentLang);
		});
	});

	describe('availableLanguages', () => {
		it('should return the available languages from the translateService', () => {
			expect(service.availableLanguages).toBe(translateService.getLangs());
		});
	});

	describe('defaultLanguage', () => {
		it('should return the default language from the translateService', () => {
			expect(service.defaultLanguage).toBe(translateService.getFallbackLang());
		});
	});

	describe('initI18n', () => {
		it('should set the language to use in the translateService & reload', (done) => {
			subscriptions.push(
				service.initI18n('nl').subscribe(() => {
					expect(translateService.use).toHaveBeenCalledWith('nl');
					expect(translateService.reloadLang).toHaveBeenCalledWith('nl');

					done();
				})
			);
		});
	});

	describe('setLanguage', () => {
		it('should set the language to use in the translateService', () => {
			service.setLanguage('nl');

			expect(translateService.use).toHaveBeenCalledWith('nl');
		});
	});

	describe('getTranslation', () => {
		it('should return the translation for a provided string by using the instant method of the translateService', () => {
			expect(
				service.getTranslation('SOME_KEY', {
					and: 'params',
				})
			).toBe('something');
			expect(translateService.instant).toHaveBeenCalledWith('SOME_KEY', {
				and: 'params',
			});
		});
	});

	describe('getTranslationObservable', () => {
		it('should return the translation for a provided string by using the get method of the translateService', (done) => {
			subscriptions.push(
				service
					.getTranslationObservable('SOME_KEY', {
						and: 'params',
					})
					.subscribe((result: string) => {
						expect(result).toBe('something');

						expect(translateService.get).toHaveBeenCalledWith('SOME_KEY', {
							and: 'params',
						});

						done();
					})
			);
		});
	});
});
