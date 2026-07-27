import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { NgxAuthenticationServiceToken } from '../../tokens';

import { NgxHasPermissionDirective } from './has-permission.directive';

@Component({
	template: `
		<div>
			<ng-container
				*ngxHasPermission="permission; shouldHavePermission: true; else: elseBlock"
			>
				<span id="content">Permission Content</span>
			</ng-container>
			<ng-template #elseBlock>
				<span id="fallback">Fallback Content</span>
			</ng-template>
		</div>
	`,
	imports: [NgxHasPermissionDirective],
	changeDetection: ChangeDetectionStrategy.Eager,
})
class TestHostComponent {
	public permission: string | string[] = 'ADMIN';
}

describe('NgxHasPermissionDirective', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let authServiceMock: { hasPermission: jest.Mock };

	beforeEach(() => {
		authServiceMock = {
			hasPermission: jest.fn().mockImplementation((perms) => {
				const hasAdmin = Array.isArray(perms) ? perms.includes('ADMIN') : perms === 'ADMIN';

				return of(hasAdmin);
			}),
		};

		TestBed.configureTestingModule({
			imports: [TestHostComponent, NgxHasPermissionDirective],
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

	it('should render content template when user has required permission', () => {
		fixture.componentInstance.permission = 'ADMIN';
		fixture.detectChanges();

		const content = fixture.nativeElement.querySelector('#content');
		expect(content).not.toBeNull();
		expect(content.textContent).toBe('Permission Content');
	});

	it('should render fallback template when user lacks required permission', () => {
		fixture.componentInstance.permission = 'USER';
		fixture.detectChanges();

		const fallback = fixture.nativeElement.querySelector('#fallback');
		expect(fallback).not.toBeNull();
		expect(fallback.textContent).toBe('Fallback Content');
	});
});
