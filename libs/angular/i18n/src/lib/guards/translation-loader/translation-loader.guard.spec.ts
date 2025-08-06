import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { NgxI18nTranslationLoaderResolver } from '../../resolvers';
import { NgxI18nService } from '../../services';

import { NgxI18nTranslationLoaderGuard } from './translation-loader.guard';

describe('NgxI18nTranslationLoaderGuard', () => {
	describe('with resolver provided', () => {
		const router: any = {
			navigate: jest.fn(),
		};

		beforeEach(() => {
			TestBed.configureTestingModule({
				providers: [
					{
						provide: Router,
						useValue: router,
					},
					{
						provide: NgxI18nTranslationLoaderResolver,
						useValue: null,
					},
				],
			});
		});

		it('should return false when no resolver was provided', () => {
			TestBed.runInInjectionContext(() => {
				const route = {} as ActivatedRouteSnapshot;

				expect(NgxI18nTranslationLoaderGuard(route, null)).toBe(false);
			});
		});
	});

	describe('without resolver provided', () => {
		const router: any = {
			navigate: jest.fn(),
		};
		const i18nService: any = {
			currentLanguage: 'nl',
			availableLanguages: ['nl', 'en'],
			setLanguage: jest.fn(),
			initI18n: jest.fn().mockReturnValue(of(true)),
		};

		beforeEach(() => {
			TestBed.configureTestingModule({
				providers: [
					{
						provide: Router,
						useValue: router,
					},
					{
						provide: NgxI18nService,
						useValue: i18nService,
					},
					NgxI18nTranslationLoaderResolver,
				],
			});
		});

		it('should resolve the loader when a resolver is provided', () => {
			TestBed.runInInjectionContext(() => {
				const route = {} as ActivatedRouteSnapshot;

				expect(NgxI18nTranslationLoaderGuard(route, null)).toBeInstanceOf(Observable);
			});
		});
	});
});
