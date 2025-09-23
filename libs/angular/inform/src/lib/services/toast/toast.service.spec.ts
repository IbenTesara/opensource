import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { NgxToastBundlerComponent, NgxToastComponent } from '../../abstracts';
import { provideNgxToastConfiguration } from '../../providers';
import { NgxToastDefaultConfiguration } from '../../types';

import { NgxToastService } from './toast.service';

@Component({
	selector: 'test-toast',
	template: `{{ toast().text }}`,
})
class TestToastComponent extends NgxToastComponent {}

@Component({
	selector: 'test-toast',
	template: `{{ amount() }}`,
})
class TestToastBundlerComponent extends NgxToastBundlerComponent {}

describe('NgxToastService', () => {
	let service: NgxToastService;

	const configuration: NgxToastDefaultConfiguration = {
		component: TestToastComponent,
		position: 'top-right',
	};

	const text = 'Wa-ho!';

	describe('Minimal configuration', () => {
		beforeEach(() => {
			TestBed.configureTestingModule({
				providers: [provideNgxToastConfiguration(configuration), NgxToastService],
			});

			service = TestBed.inject(NgxToastService);
		});

		it('should create a simple toast', () => {
			const toast = service.showToast(text);

			expect(toast.text).toEqual(text);
			expect(toast.id).toBeDefined();
			expect(toast.toBeRemoved).toBeFalsy();

			expect(service.toasts()).toEqual([toast]);
		});

		it('should create a more complex toast', () => {
			const toast = service.showToast({
				text,
				data: 'success',
				configuration: { autoClose: false },
			});

			expect(toast.text).toEqual(text);
			expect(toast.data).toEqual('success');
			expect(toast.configuration.autoClose).toBeFalsy();
			expect(toast.id).toBeDefined();
			expect(toast.toBeRemoved).toBeFalsy();

			expect(service.toasts()).toEqual([toast]);
		});
	});

	describe('Max amount configuration - ignore', () => {
		beforeEach(() => {
			TestBed.configureTestingModule({
				providers: [
					provideNgxToastConfiguration({
						...configuration,
						maxAmount: { amount: 1, strategy: 'ignore' },
					}),
					NgxToastService,
				],
			});

			service = TestBed.inject(NgxToastService);
		});

		it('should create a simple toast', () => {
			const toast = service.showToast(text);

			expect(toast.text).toEqual(text);
			expect(toast.id).toBeDefined();
			expect(toast.toBeRemoved).toBeFalsy();

			expect(service.toasts()).toEqual([toast]);
		});

		it('should create a more complex toast', () => {
			const toast = service.showToast({
				text,
				data: 'success',
				configuration: { autoClose: false },
			});

			expect(toast.text).toEqual(text);
			expect(toast.data).toEqual('success');
			expect(toast.configuration.autoClose).toBeFalsy();
			expect(toast.id).toBeDefined();
			expect(toast.toBeRemoved).toBeFalsy();

			expect(service.toasts()).toEqual([toast]);
		});

		it('should correctly ignore new toasts based on whether the maximum amount is reached', () => {
			const firstToast = service.showToast('This is the first toast!');
			service.showToast('This is a second toast!');
			service.showToast('This is a third toast!');

			expect(service.toasts()).toEqual([firstToast]);

			service.removeToast(firstToast);
			setTimeout(() => {
				const fourthToast = service.showToast('This is the 4th toast!');
				expect(service.toasts()).toEqual([fourthToast]);
			});
		});
	});

	describe('Max amount configuration - wait', () => {
		beforeEach(() => {
			TestBed.configureTestingModule({
				providers: [
					provideNgxToastConfiguration({
						...configuration,
						maxAmount: { amount: 1, strategy: 'wait' },
					}),
					NgxToastService,
				],
			});

			service = TestBed.inject(NgxToastService);
		});

		it('should create a simple toast', () => {
			const toast = service.showToast(text);

			expect(toast.text).toEqual(text);
			expect(toast.id).toBeDefined();
			expect(toast.toBeRemoved).toBeFalsy();

			expect(service.toasts()).toEqual([toast]);
		});

		it('should create a more complex toast', () => {
			const toast = service.showToast({
				text,
				data: 'success',
				configuration: { autoClose: false },
			});

			expect(toast.text).toEqual(text);
			expect(toast.data).toEqual('success');
			expect(toast.configuration.autoClose).toBeFalsy();
			expect(toast.id).toBeDefined();
			expect(toast.toBeRemoved).toBeFalsy();

			expect(service.toasts()).toEqual([toast]);
		});

		it('should correctly wait for new toasts based on whether the maximum amount is reached', () => {
			const firstToast = service.showToast('This is the first toast!');
			const secondToast = service.showToast('This is a second toast!');
			const thirdToast = service.showToast('This is a third toast!');

			expect(service.toasts()).toEqual([firstToast]);

			service.removeToast(firstToast);
			setTimeout(() => {
				expect(service.toasts()).toEqual([secondToast]);
			});

			service.removeToast(secondToast);
			setTimeout(() => {
				expect(service.toasts()).toEqual([thirdToast]);
			});
		});
	});

	describe('Max amount configuration - bundle', () => {
		beforeEach(() => {
			TestBed.configureTestingModule({
				providers: [
					provideNgxToastConfiguration({
						...configuration,
						maxAmount: {
							amount: 1,
							strategy: 'bundle',
							component: TestToastBundlerComponent,
						},
					}),
					NgxToastService,
				],
			});

			service = TestBed.inject(NgxToastService);
		});

		it('should create a simple toast', () => {
			const toast = service.showToast(text);

			expect(toast.text).toEqual(text);
			expect(toast.id).toBeDefined();
			expect(toast.toBeRemoved).toBeFalsy();

			expect(service.toasts()).toEqual([toast]);
		});

		it('should create a more complex toast', () => {
			const toast = service.showToast({
				text,
				data: 'success',
				configuration: { autoClose: false },
			});

			expect(toast.text).toEqual(text);
			expect(toast.data).toEqual('success');
			expect(toast.configuration.autoClose).toBeFalsy();
			expect(toast.id).toBeDefined();
			expect(toast.toBeRemoved).toBeFalsy();

			expect(service.toasts()).toEqual([toast]);
		});

		it('should correctly bundle new toasts based on whether the maximum amount is reached', () => {
			const firstToast = service.showToast('This is the first toast!');
			const secondToast = service.showToast('This is a second toast!');
			const thirdToast = service.showToast('This is a third toast!');

			expect(service.toasts()).toEqual([firstToast]);
			expect(service.hasBundledToasts()).toEqual(2);

			service.removeToast(firstToast);
			setTimeout(() => {
				expect(service.toasts()).toEqual([secondToast]);
				expect(service.hasBundledToasts()).toEqual(1);
			});

			service.showBundled();
			setTimeout(() => {
				expect(service.toasts()).toEqual([secondToast, thirdToast]);
				expect(service.hasBundledToasts()).toEqual(0);
			});
		});
	});
});
