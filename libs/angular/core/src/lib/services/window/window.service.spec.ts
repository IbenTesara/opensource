import { DOCUMENT, PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NgxWindowService } from './window.service';
import { NgxWindowMock } from './window.service.mock';

describe('NgxWindowService', () => {
	describe('with no document', () => {
		let service: NgxWindowService;
		const document: any = {};
		const platform = 'server';

		beforeEach(() => {
			TestBed.configureTestingModule({
				providers: [
					NgxWindowService,
					{
						provide: DOCUMENT,
						useValue: document,
					},
					{
						provide: PLATFORM_ID,
						useValue: platform,
					},
				],
			});
			service = TestBed.inject(NgxWindowService);
		});

		describe('construct', () => {
			it(
                'should set the width$ BehaviorSubject to a default value of 1200 for SSR',
                () => {
                    expect((service as any).widthSubject$.getValue()).toBe(1200);
                }
            );
		});

		describe('isBrowser', () => {
			it('should return false', () => {
				expect(service.isBrowser()).toBe(false);
			});
		});
	});

	describe('with a document', () => {
		let service: NgxWindowService;
		const document: any = NgxWindowMock(jest.fn());
		const platform = 'browser';

		beforeEach(() => {
			TestBed.configureTestingModule({
				providers: [
					NgxWindowService,
					{
						provide: DOCUMENT,
						useValue: document,
					},
					{
						provide: PLATFORM_ID,
						useValue: platform,
					},
				],
			});
			service = TestBed.inject(NgxWindowService);
		});

		describe('construct', () => {
			it(
                'should set the width$ BehaviorSubject to the value of the window-width',
                () => {
                    expect((service as any).widthSubject$.getValue()).toBe(
                        NgxWindowMock(jest.fn()).defaultView.innerWidth
                    );
                }
            );
		});

		describe('scrollTo', () => {
			it(
                'should use the window.scrollTo to move to a position on the page',
                () => {
                    service.window.scrollTo = jest.fn();

                    service.scrollTo(200);

                    expect(service.window.scrollTo).toHaveBeenCalledWith(0 as any, 200 as any);
                }
            );
		});

		describe('hasDocument', () => {
			it('should return true', () => {
				expect(service.hasDocument()).toBe(true);
			});
		});

		describe('scrollListeners', () => {
			it('should have called addEventListeners', () => {
				expect(service.window.addEventListener).toHaveBeenCalled();
			});
		});

		describe('isBrowser', () => {
			it('should return true', () => {
				expect(service.isBrowser()).toBe(true);
			});
		});
	});
});
