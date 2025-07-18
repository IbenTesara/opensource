import { ChangeDetectorRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';

import { NgxAuthenticationAbstractService } from '../../abstracts';
import { NgxAuthenticationResponseMock, NgxAuthenticationServiceMock } from '../../mocks';

import { NgxHasPermissionPipe } from './has-permission.pipe';

describe('NgxHasPermissionPipe', () => {
	let pipe: NgxHasPermissionPipe<'A' | 'B'>;
	const authenticationService: any = NgxAuthenticationServiceMock({
		signInSpy: jest.fn(),
		signOutSpy: jest.fn(),
		hasFeatureSpy: jest.fn(),
		hasPermissionSpy: jest.fn().mockReturnValue(of(true)),
		authenticationResponse: new BehaviorSubject(NgxAuthenticationResponseMock),
		hasAuthenticated: new BehaviorSubject('signed-in'),
	});
	const cdRef: any = {
		markForCheck: jest.fn(),
	};

	describe('transform', () => {
		beforeEach(() => {
			TestBed.configureTestingModule({
				providers: [
					NgxHasPermissionPipe,
					{
						provide: NgxAuthenticationAbstractService,
						useValue: NgxAuthenticationServiceMock,
					},
					{
						provide: ChangeDetectorRef,
						useValue: cdRef,
					},
				],
			});
			pipe = TestBed.inject(NgxHasPermissionPipe);
		});

		it('should transform a single permission to a boolean', () => {
			expect(pipe.transform('A')).toBe(true);
			expect(authenticationService.hasPermission).toHaveBeenCalledWith(['A']);
		});

		it('should transform a list of permissions to a boolean', () => {
			expect(pipe.transform(['A'])).toBe(true);
			expect(authenticationService.hasPermission).toHaveBeenCalledWith(['A']);
		});
	});
});
