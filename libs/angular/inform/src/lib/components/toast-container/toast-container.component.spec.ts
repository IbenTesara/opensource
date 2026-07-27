import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxToastService } from '../../services';
import { NgxToastConfigurationToken } from '../../tokens';

import { NgxToastContainerComponent } from './toast-container.component';

@Component({
	template: `<ngx-toast-container></ngx-toast-container>`,
	imports: [NgxToastContainerComponent],
})
class TestHostComponent {}

describe('NgxToastContainerComponent', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let toastServiceMock: {
		toasts: ReturnType<typeof signal<any[]>>;
		hasBundledToasts: ReturnType<typeof signal<number>>;
		bundledComponent: any;
		setFocus: jest.Mock;
		removeToast: jest.Mock;
	};

	beforeEach(() => {
		toastServiceMock = {
			toasts: signal([]),
			hasBundledToasts: signal(0),
			bundledComponent: null,
			setFocus: jest.fn(),
			removeToast: jest.fn(),
		};

		TestBed.configureTestingModule({
			imports: [TestHostComponent, NgxToastContainerComponent],
			providers: [
				{ provide: NgxToastService, useValue: toastServiceMock },
				{ provide: NgxToastConfigurationToken, useValue: {} },
			],
		});

		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();
	});

	it('should delegate setFocus and dismissToast calls to toast service', () => {
		const container = fixture.debugElement.children[0].injector.get(NgxToastContainerComponent);

		container.setFocus(true);
		expect(toastServiceMock.setFocus).toHaveBeenCalledWith(true);

		const dummyToast: any = { id: 't-1' };
		container.dismissToast(dummyToast);
		expect(toastServiceMock.removeToast).toHaveBeenCalledWith(dummyToast, true);
	});
});
