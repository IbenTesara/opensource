import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { NgxMobileLayoutService } from '../../services';

import { NgxMobileLayoutComponent } from './mobile-layout.component';

@Component({
	template: `<ngx-mobile-layout></ngx-mobile-layout>`,
	imports: [NgxMobileLayoutComponent],
})
class TestHostComponent {}

describe('NgxMobileLayoutComponent', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let mobileLayoutServiceMock: {
		layout$: BehaviorSubject<any>;
		flyoutShown: ReturnType<typeof signal<boolean>>;
		asideShown: ReturnType<typeof signal<boolean>>;
		asideParams: ReturnType<typeof signal<any>>;
		flyoutParams: ReturnType<typeof signal<any>>;
		setUpInitialLayout: jest.Mock;
	};

	beforeEach(() => {
		mobileLayoutServiceMock = {
			layout$: new BehaviorSubject(null),
			flyoutShown: signal(false),
			asideShown: signal(false),
			asideParams: signal(null),
			flyoutParams: signal(null),
			setUpInitialLayout: jest.fn(),
		};

		TestBed.configureTestingModule({
			imports: [TestHostComponent, NgxMobileLayoutComponent],
			providers: [
				provideRouter([]),
				{ provide: NgxMobileLayoutService, useValue: mobileLayoutServiceMock },
			],
		});

		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();
	});

	it('should set up initial layout on init', () => {
		expect(mobileLayoutServiceMock.setUpInitialLayout).toHaveBeenCalled();
	});
});
