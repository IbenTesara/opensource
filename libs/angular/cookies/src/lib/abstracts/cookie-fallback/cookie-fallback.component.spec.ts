import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCookiesFallBackComponent } from './cookie-fallback.component';

@Component({
	template: `<p>Fallback</p>`,
})
class TestFallbackComponent extends NgxCookiesFallBackComponent {}

describe('NgxCookiesFallBackComponent', () => {
	let fixture: ComponentFixture<TestFallbackComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestFallbackComponent],
		});
		fixture = TestBed.createComponent(TestFallbackComponent);
		fixture.detectChanges();
	});

	it('should initialize cookies signal with empty array default', () => {
		expect(fixture.componentInstance.cookies()).toEqual([]);
	});
});
