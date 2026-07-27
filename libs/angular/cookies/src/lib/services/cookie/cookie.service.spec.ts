import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { NgxWindowService } from '@ibenvandeveire/ngx-core';
import * as CookieConsent from 'vanilla-cookieconsent';

import { NgxCookieService } from './cookie.service';

jest.mock('vanilla-cookieconsent', () => ({
	run: jest.fn(),
	acceptedCategory: jest.fn().mockReturnValue(true),
	acceptCategory: jest.fn(),
	acceptedService: jest.fn().mockReturnValue(true),
	acceptService: jest.fn(),
	show: jest.fn(),
	getCookie: jest.fn().mockReturnValue({ testCookie: 'testValue' }),
	setCookieData: jest.fn().mockReturnValue(true),
}));

describe('NgxCookieService', () => {
	let service: NgxCookieService;
	let windowServiceMock: { isBrowser: jest.Mock };

	beforeEach(() => {
		windowServiceMock = {
			isBrowser: jest.fn().mockReturnValue(true),
		};

		TestBed.configureTestingModule({
			providers: [
				NgxCookieService,
				{
					provide: NgxWindowService,
					useValue: windowServiceMock,
				},
			],
		});

		service = TestBed.inject(NgxCookieService);
		jest.clearAllMocks();
	});

	describe('setupCookiesHandler', () => {
		it('should early exit if not running in a browser environment', () => {
			windowServiceMock.isBrowser.mockReturnValue(false);

			service.setupCookiesHandler(
				{ analytics: {} as any },
				{ default: 'en', translations: {} as any }
			);

			expect(CookieConsent.run).not.toHaveBeenCalled();
		});

		it('should log an error and exit if no categories are provided', () => {
			const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

			service.setupCookiesHandler(undefined as any, {
				default: 'en',
				translations: {} as any,
			});

			expect(consoleSpy).toHaveBeenCalledWith(
				'NgxCookies: No categories were provided for the cookie handler. At least one category is required.'
			);
			expect(CookieConsent.run).not.toHaveBeenCalled();

			consoleSpy.mockRestore();
		});

		it('should initialize CookieConsent.run with configuration options when valid', () => {
			const categories: any = { analytics: { enabled: true } };
			const language: any = { default: 'en', translations: {} };

			service.setupCookiesHandler(categories, language);

			expect(CookieConsent.run).toHaveBeenCalledWith(
				expect.objectContaining({
					categories,
					language,
				})
			);
		});
	});

	describe('category management', () => {
		it('should check if a category is accepted via hasAcceptedCategory', () => {
			(CookieConsent.acceptedCategory as jest.Mock).mockReturnValue(true);

			const spy = subscribeSpyTo(service.hasAcceptedCategory('analytics'));

			expect(spy.getLastValue()).toBe(true);
			expect(CookieConsent.acceptedCategory).toHaveBeenCalledWith('analytics');
		});

		it('should trigger acceptCategory on CookieConsent', () => {
			service.acceptCategory('analytics');

			expect(CookieConsent.acceptCategory).toHaveBeenCalledWith('analytics');
		});
	});

	describe('service management', () => {
		it('should check if a service is accepted via hasAcceptedService', () => {
			(CookieConsent.acceptedService as jest.Mock).mockReturnValue(true);

			const spy = subscribeSpyTo(service.hasAcceptedService('analytics', 'google'));

			expect(spy.getLastValue()).toBe(true);
			expect(CookieConsent.acceptedService).toHaveBeenCalledWith('google', 'analytics');
		});

		it('should trigger acceptService on CookieConsent', () => {
			service.acceptService('analytics', 'google');

			expect(CookieConsent.acceptService).toHaveBeenCalledWith('google', 'analytics');
		});
	});

	describe('modal and cookies management', () => {
		it('should display the consent modal via showModal', () => {
			service.showModal();

			expect(CookieConsent.show).toHaveBeenCalledWith(true);
		});

		it('should return a cookie value via getCookie', () => {
			(CookieConsent.getCookie as jest.Mock).mockReturnValue({ theme: 'dark' });

			const value = service.getCookie<string>('theme');

			expect(value).toBe('dark');
		});

		it('should return cookie values reactively via getCookieObservable', () => {
			(CookieConsent.getCookie as jest.Mock).mockReturnValue({ theme: 'dark' });

			const spy = subscribeSpyTo(service.getCookieObservable<string>('theme'));

			expect(spy.getLastValue()).toBe('dark');
		});

		it('should set a cookie and notify listeners via setCookie', () => {
			(CookieConsent.setCookieData as jest.Mock).mockReturnValue(true);
			(CookieConsent.getCookie as jest.Mock).mockReturnValue({ newCookie: 'val' });

			const changedSpy = subscribeSpyTo(service.cookiesChanged$);

			service.setCookie({ name: 'newCookie', value: 'val' });

			expect(CookieConsent.setCookieData).toHaveBeenCalledWith({
				value: { newCookie: 'val' },
				mode: 'update',
			});
			expect(changedSpy.getLastValue()).toEqual({ newCookie: 'val' });
		});

		it('should remove a cookie and notify listeners via removeCookie', () => {
			(CookieConsent.getCookie as jest.Mock).mockReturnValue({ cookieA: 'a', cookieB: 'b' });
			(CookieConsent.setCookieData as jest.Mock).mockReturnValue(true);

			const changedSpy = subscribeSpyTo(service.cookiesChanged$);

			service.removeCookie('cookieA');

			expect(CookieConsent.setCookieData).toHaveBeenCalledWith({
				value: { cookieB: 'b' },
				mode: 'overwrite',
			});
			expect(changedSpy.getLastValue()).toBeDefined();
		});
	});
});
