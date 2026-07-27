import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { NgxAuthenticationServiceToken } from '../../tokens';

import { NgxIsAuthenticatedDirective } from './is-authenticated.directive';

@Component({
	template: `
		<div>
			<ng-container *ngxIsAuthenticated="shouldBeAuth; else elseBlock">
				<span id="content">Auth Content</span>
			</ng-container>
			<ng-template #elseBlock>
				<span id="fallback">Unauth Content</span>
			</ng-template>
		</div>
	`,
	imports: [NgxIsAuthenticatedDirective],
	changeDetection: ChangeDetectionStrategy.Eager,
})
class TestHostComponent {
	public shouldBeAuth = true;
}

describe('NgxIsAuthenticatedDirective', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let isAuthenticated$: BehaviorSubject<boolean>;

	beforeEach(() => {
		isAuthenticated$ = new BehaviorSubject<boolean>(true);

		const authServiceMock = {
			isAuthenticated$: isAuthenticated$.asObservable(),
		};

		TestBed.configureTestingModule({
			imports: [TestHostComponent, NgxIsAuthenticatedDirective],
			providers: [
				{
					provide: NgxAuthenticationServiceToken,
					useValue: authServiceMock,
				},
			],
		});

		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();
	});

	it('should render content when user matches auth condition', () => {
		const content = fixture.nativeElement.querySelector('#content');
		expect(content).not.toBeNull();
		expect(content.textContent).toBe('Auth Content');
	});

	it('should render fallback when user state changes to unauthenticated', () => {
		isAuthenticated$.next(false);
		fixture.detectChanges();

		const fallback = fixture.nativeElement.querySelector('#fallback');
		expect(fallback).not.toBeNull();
		expect(fallback.textContent).toBe('Unauth Content');
	});
});
