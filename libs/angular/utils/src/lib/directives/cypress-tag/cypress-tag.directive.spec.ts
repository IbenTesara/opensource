import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCypressTagDirective } from './cypress-tag.directive';

@Component({
	template: ` <div [cypressTag]="tagValue">Content</div> `,
	imports: [NgxCypressTagDirective],
	changeDetection: ChangeDetectionStrategy.Eager,
})
class TestHostComponent {
	public tagValue = 'my-custom-tag';
}

describe('NgxCypressTagDirective', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let divEl: HTMLDivElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestHostComponent, NgxCypressTagDirective],
		});
		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();
		divEl = fixture.nativeElement.querySelector('div');
	});

	it('should set data-cy host attribute', () => {
		expect(divEl.getAttribute('data-cy')).toBeDefined();
	});
});
