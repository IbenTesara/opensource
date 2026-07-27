import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';

import { NgxCookiesFallBackComponent } from '../../abstracts';
import { NgxCookieService } from '../../services';
import { NgxCookiesFallbackComponentToken } from '../../tokens';
import { NgxHasCookieConfiguration } from '../../types';

import { NgxHasCookieDirective } from './has-cookie.directive';

@Component({
	selector: 'ngx-test-fallback',
	template: `<div id="fallback-component">Fallback Component Content</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestFallbackComponent extends NgxCookiesFallBackComponent {}

@Component({
	selector: 'ngx-test-has-cookie',
	template: `
		<div *hasCookie="cookieConfig; else elseBlock">
			<span id="content">Protected Content</span>
		</div>
		<ng-template #elseBlock>
			<span id="fallback-template">Custom Fallback Template</span>
		</ng-template>
	`,
	imports: [NgxHasCookieDirective],
	changeDetection: ChangeDetectionStrategy.Eager,
})
class TestHostComponent {
	public cookieConfig: NgxHasCookieConfiguration | NgxHasCookieConfiguration[] = {
		category: 'analytics',
	};
}

describe('NgxHasCookieDirective', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let cookieServiceMock: {
		hasAcceptedCategory: jest.Mock;
		hasAcceptedService: jest.Mock;
	};
	let acceptedCategorySubject: BehaviorSubject<boolean>;

	beforeEach(() => {
		acceptedCategorySubject = new BehaviorSubject<boolean>(true);

		cookieServiceMock = {
			hasAcceptedCategory: jest
				.fn()
				.mockImplementation(() => acceptedCategorySubject.asObservable()),
			hasAcceptedService: jest.fn().mockReturnValue(of(true)),
		};

		TestBed.configureTestingModule({
			imports: [TestHostComponent, NgxHasCookieDirective],
			providers: [
				{
					provide: NgxCookieService,
					useValue: cookieServiceMock,
				},
				{
					provide: NgxCookiesFallbackComponentToken,
					useValue: TestFallbackComponent,
				},
			],
		});

		fixture = TestBed.createComponent(TestHostComponent);
	});

	it('should render the content template when the cookie category is accepted', () => {
		acceptedCategorySubject.next(true);
		fixture.detectChanges();

		const content = fixture.nativeElement.querySelector('#content');
		const fallback = fixture.nativeElement.querySelector('#fallback-template');

		expect(content).not.toBeNull();
		expect(content.textContent).toBe('Protected Content');
		expect(fallback).toBeNull();
	});

	it('should render the else template when the cookie category is rejected', () => {
		acceptedCategorySubject.next(false);
		fixture.detectChanges();

		const content = fixture.nativeElement.querySelector('#content');
		const fallback = fixture.nativeElement.querySelector('#fallback-template');

		expect(content).toBeNull();
		expect(fallback).not.toBeNull();
		expect(fallback.textContent).toBe('Custom Fallback Template');
	});

	it('should check specific services when services are provided in configuration', () => {
		fixture.componentInstance.cookieConfig = {
			category: 'analytics',
			services: ['ga', 'mixpanel'],
		};
		cookieServiceMock.hasAcceptedService.mockReturnValue(of(true));

		fixture.detectChanges();

		expect(cookieServiceMock.hasAcceptedService).toHaveBeenCalledWith('analytics', 'ga');
		expect(cookieServiceMock.hasAcceptedService).toHaveBeenCalledWith('analytics', 'mixpanel');

		const content = fixture.nativeElement.querySelector('#content');
		expect(content).not.toBeNull();
	});

	it('should handle an array of cookie configurations', () => {
		fixture.componentInstance.cookieConfig = [
			{ category: 'analytics' },
			{ category: 'marketing' },
		];
		acceptedCategorySubject.next(true);

		fixture.detectChanges();

		expect(cookieServiceMock.hasAcceptedCategory).toHaveBeenCalledWith('analytics');
		expect(cookieServiceMock.hasAcceptedCategory).toHaveBeenCalledWith('marketing');

		const content = fixture.nativeElement.querySelector('#content');
		expect(content).not.toBeNull();
	});
});
