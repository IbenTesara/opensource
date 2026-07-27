import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { NgxAuthenticationServiceToken } from '../../tokens';

import { NgxHasFeatureDirective } from './has-feature.directive';

@Component({
	template: `
		<div>
			<ng-container *ngxHasFeature="feature; shouldHaveFeature: true; else: elseBlock">
				<span id="content">Feature Content</span>
			</ng-container>
			<ng-template #elseBlock>
				<span id="fallback">Fallback Content</span>
			</ng-template>
		</div>
	`,
	imports: [NgxHasFeatureDirective],
	changeDetection: ChangeDetectionStrategy.Eager,
})
class TestHostComponent {
	public feature: string | string[] = 'DARK_MODE';
}

describe('NgxHasFeatureDirective', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let authServiceMock: { hasFeature: jest.Mock };

	beforeEach(() => {
		authServiceMock = {
			hasFeature: jest.fn().mockImplementation((feats) => {
				const hasDark = Array.isArray(feats)
					? feats.includes('DARK_MODE')
					: feats === 'DARK_MODE';
				return of(hasDark);
			}),
		};

		TestBed.configureTestingModule({
			imports: [TestHostComponent, NgxHasFeatureDirective],
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

	it('should render content template when feature is enabled', () => {
		fixture.componentInstance.feature = 'DARK_MODE';
		fixture.detectChanges();

		const content = fixture.nativeElement.querySelector('#content');
		expect(content).not.toBeNull();
		expect(content.textContent).toBe('Feature Content');
	});

	it('should render fallback template when feature is disabled', () => {
		fixture.componentInstance.feature = 'LIGHT_MODE';
		fixture.detectChanges();

		const fallback = fixture.nativeElement.querySelector('#fallback');
		expect(fallback).not.toBeNull();
		expect(fallback.textContent).toBe('Fallback Content');
	});
});
