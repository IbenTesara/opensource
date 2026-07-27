import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NgxI18nRootService } from '../../services';

import { NgxI18nSetLanguageGuard } from './set-language.guard';

describe('NgxI18nSetLanguageGuard', () => {
	let routerMock: { navigate: jest.Mock };
	let rootServiceMock: { initializeLanguage: jest.Mock; currentLanguage: string };

	beforeEach(() => {
		routerMock = {
			navigate: jest.fn().mockResolvedValue(true),
		};

		rootServiceMock = {
			initializeLanguage: jest.fn(),
			currentLanguage: 'nl',
		};

		TestBed.configureTestingModule({
			providers: [
				{ provide: Router, useValue: routerMock },
				{ provide: NgxI18nRootService, useValue: rootServiceMock },
			],
		});
	});

	it('should initialize language and navigate to language route', async () => {
		const result = await TestBed.runInInjectionContext(() =>
			NgxI18nSetLanguageGuard({} as any, {} as any)
		);

		expect(rootServiceMock.initializeLanguage).toHaveBeenCalled();
		expect(routerMock.navigate).toHaveBeenCalledWith(['/', 'nl']);
		expect(result).toBe(true);
	});
});
