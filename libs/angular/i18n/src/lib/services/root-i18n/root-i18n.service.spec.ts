import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { NgxWindowService } from '@ibenvandeveire/ngx-core';

import { NgxI18nConfigurationToken } from '../../tokens';

import { NgxI18nRootService } from './root-i18n.service';

describe('NgxI18nRootService', () => {
	let service: NgxI18nRootService;
	let windowServiceMock: { runInBrowser: jest.Mock };

	beforeEach(() => {
		windowServiceMock = {
			runInBrowser: jest.fn((cb) => cb({ browserDocument: document })),
		};

		TestBed.configureTestingModule({
			providers: [
				NgxI18nRootService,
				{ provide: NgxWindowService, useValue: windowServiceMock },
				{
					provide: NgxI18nConfigurationToken,
					useValue: {
						defaultLanguage: 'nl',
						availableLanguages: ['nl', 'en', 'fr'],
					},
				},
			],
		});

		service = TestBed.inject(NgxI18nRootService);
	});

	it('should set current language when supported and update html lang attribute', () => {
		service.setCurrentLanguage('en');
		expect(service.currentLanguage).toBe('en');
		expect(document.documentElement.getAttribute('lang')).toBe('en');

		const spy = subscribeSpyTo(service.currentLanguage$);
		expect(spy.getLastValue()).toBe('en');
	});

	it('should fallback to default language if unknown language is set initially', () => {
		const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

		service.setCurrentLanguage('de');
		expect(service.currentLanguage).toBe('nl');
		expect(consoleSpy).toHaveBeenCalledWith(
			expect.stringContaining('not part of the available')
		);

		consoleSpy.mockRestore();
	});
});
