import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { BehaviorSubject, NEVER } from 'rxjs';

import { NgxModalAbstractComponent } from '../../abstracts';
import { NgxModalConfigurationToken } from '../../tokens';
import { NgxModalOptions } from '../../types';

import { NgxModalService } from './modal.service';

@Component({ template: '' })
class TestModalComponent extends NgxModalAbstractComponent<string> {}

describe('NgxModalService', () => {
	let service: NgxModalService;
	let mockDialog: { open: jest.Mock; closeAll: jest.Mock };
	let mockComponentInstance: Record<string, unknown>;

	beforeEach(() => {
		mockComponentInstance = {
			action: { subscribe: jest.fn() },
			close: { subscribe: jest.fn() },
		};

		mockDialog = {
			open: jest.fn().mockReturnValue({
				componentInstance: mockComponentInstance,
				componentRef: { setInput: jest.fn() },
			}),
			closeAll: jest.fn(),
		};

		TestBed.configureTestingModule({
			providers: [
				NgxModalService,
				{ provide: Dialog, useValue: mockDialog },
				{
					provide: NgxModalConfigurationToken,
					useValue: {
						modals: {
							invalid: {},
							alert: { role: 'alertdialog' },
						},
					},
				},
			],
		});

		service = TestBed.inject(NgxModalService);
	});

	it('should track active modal state via hasActiveModal$', () => {
		const spy = subscribeSpyTo(service.hasActiveModal$);
		expect(spy.getLastValue()).toBe(false);
	});

	it('should return NEVER and log error if no component is provided or found in config', () => {
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

		const options = { type: 'invalid', label: 'Test' } as unknown as NgxModalOptions<string>;
		const result$ = service.open(options);

		expect(result$).toBe(NEVER);
		expect(consoleSpy).toHaveBeenCalledWith(
			expect.stringContaining('No component was provided')
		);

		consoleSpy.mockRestore();
	});

	it('should return NEVER and log error if role is alertdialog but no describedById is passed', () => {
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

		const options = {
			component: TestModalComponent,
			role: 'alertdialog',
			label: 'Test Alert',
		} as unknown as NgxModalOptions<string>;

		const result$ = service.open(options);

		expect(result$).toBe(NEVER);
		expect(consoleSpy).toHaveBeenCalledWith(
			expect.stringContaining('role of the modal was set to "alertdialog"')
		);

		consoleSpy.mockRestore();
	});

	it('should return NEVER and log warning if a modal is already active', () => {
		const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

		// Iben: Manually set hasModalSubject to active
		(service as unknown as { hasModalSubject: BehaviorSubject<boolean> }).hasModalSubject.next(
			true
		);

		const result$ = service.open({
			component: TestModalComponent,
			role: 'dialog',
			label: 'Test Modal',
		});

		expect(result$).toBe(NEVER);
		expect(consoleSpy).toHaveBeenCalledWith(
			expect.stringContaining('An active modal is currently displayed')
		);

		consoleSpy.mockRestore();
	});

	it('should close active modal and invoke optional onClose callback', (done) => {
		jest.useFakeTimers();
		const onCloseSpy = jest.fn();

		service.close(onCloseSpy);

		jest.runAllTimers();

		expect(mockDialog.closeAll).toHaveBeenCalled();
		expect(onCloseSpy).toHaveBeenCalled();

		jest.useRealTimers();
		done();
	});
});
