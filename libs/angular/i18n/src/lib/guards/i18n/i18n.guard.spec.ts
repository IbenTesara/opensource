import { TestBed } from '@angular/core/testing';
import {
	ActivatedRouteSnapshot,
	Router,
	RouterStateSnapshot,
	convertToParamMap,
} from '@angular/router';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { Observable, of } from 'rxjs';

import { NgxI18nRootService } from '../../services';

import { NgxI18nGuard } from './i18n.guard';

describe('NgxI18nGuard', () => {
	const router: any = {
		navigateByUrl: jest.fn(),
	};
	const i18nService: any = {
		currentLanguage: 'nl',
		availableLanguages: ['nl', 'en'],
		setCurrentLanguage: jest.fn(),
		initializeLanguage: jest.fn(),
		availableLanguages$: of(['nl', 'en']),
		defaultLanguage: 'nl',
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: NgxI18nRootService,
					useValue: i18nService,
				},
				{
					provide: Router,
					useValue: router,
				},
			],
		});
	});

	it('should return true if the route language matches the currentLanguage', () => {
		TestBed.runInInjectionContext(() => {
			let route = {
				paramMap: convertToParamMap({ language: 'nl' }),
			} as ActivatedRouteSnapshot;
			let state = { url: '/nl' } as RouterStateSnapshot;

			expect(
				subscribeSpyTo(NgxI18nGuard(route, state) as Observable<boolean>).getFirstValue()
			).toBe(true);

			route = {
				parent: {
					paramMap: convertToParamMap({ language: 'nl' }),
				},
				paramMap: convertToParamMap({}),
			} as ActivatedRouteSnapshot;
			state = { url: '/nl/some/page' } as RouterStateSnapshot;

			expect(
				subscribeSpyTo(NgxI18nGuard(route, state) as Observable<boolean>).getFirstValue()
			).toBe(true);
		});
	});

	it('should set the current language and preserve the rest of the url if a new supported language was provided', () => {
		TestBed.runInInjectionContext(() => {
			let route = {
				paramMap: convertToParamMap({ language: 'en' }),
			} as ActivatedRouteSnapshot;
			let state = { url: '/en/some/page' } as RouterStateSnapshot;

			expect(
				subscribeSpyTo(NgxI18nGuard(route, state) as Observable<boolean>).getFirstValue()
			).toBe(true);
			expect(i18nService.setCurrentLanguage).toHaveBeenCalledWith('en');
			expect(router.navigateByUrl).toHaveBeenCalledWith('/en/some/page');

			route = {
				parent: {
					paramMap: convertToParamMap({ language: 'en' }),
				},
				paramMap: convertToParamMap({}),
			} as ActivatedRouteSnapshot;
			state = { url: '/en/nested/page' } as RouterStateSnapshot;

			expect(
				subscribeSpyTo(NgxI18nGuard(route, state) as Observable<boolean>).getFirstValue()
			).toBe(true);
			expect(i18nService.setCurrentLanguage).toHaveBeenCalledWith('en');
			expect(router.navigateByUrl).toHaveBeenCalledWith('/en/nested/page');
		});
	});

	it('should redirect to the currently set language while preserving the rest of the url if the language is not supported', () => {
		TestBed.runInInjectionContext(() => {
			let route = {
				paramMap: convertToParamMap({ language: 'de' }),
			} as ActivatedRouteSnapshot;
			let state = { url: '/de/pagina/toegankelijkheid' } as RouterStateSnapshot;

			expect(
				subscribeSpyTo(NgxI18nGuard(route, state) as Observable<boolean>).getFirstValue()
			).toBe(false);
			expect(router.navigateByUrl).toHaveBeenCalledWith('/nl/pagina/toegankelijkheid');

			route = {
				parent: {
					paramMap: convertToParamMap({ language: 'de' }),
				},
				paramMap: convertToParamMap({}),
			} as ActivatedRouteSnapshot;
			state = { url: '/de/nested/page' } as RouterStateSnapshot;

			expect(
				subscribeSpyTo(NgxI18nGuard(route, state) as Observable<boolean>).getFirstValue()
			).toBe(false);
			expect(router.navigateByUrl).toHaveBeenCalledWith('/nl/nested/page');
		});
	});

	it('should redirect to the bare current language when the attempted url has no segments to preserve', () => {
		TestBed.runInInjectionContext(() => {
			const route = {
				paramMap: convertToParamMap({ language: 'de' }),
			} as ActivatedRouteSnapshot;
			const state = { url: '/de' } as RouterStateSnapshot;

			expect(
				subscribeSpyTo(NgxI18nGuard(route, state) as Observable<boolean>).getFirstValue()
			).toBe(false);
			expect(router.navigateByUrl).toHaveBeenCalledWith('/nl');
		});
	});

	it('should preserve query strings when redirecting an unsupported language', () => {
		TestBed.runInInjectionContext(() => {
			const route = {
				paramMap: convertToParamMap({ language: 'undefined' }),
			} as ActivatedRouteSnapshot;
			const state = {
				url: '/undefined/pagina/toegankelijkheid?foo=bar',
			} as RouterStateSnapshot;

			expect(
				subscribeSpyTo(NgxI18nGuard(route, state) as Observable<boolean>).getFirstValue()
			).toBe(false);
			expect(router.navigateByUrl).toHaveBeenCalledWith(
				'/nl/pagina/toegankelijkheid?foo=bar'
			);
		});
	});
});
