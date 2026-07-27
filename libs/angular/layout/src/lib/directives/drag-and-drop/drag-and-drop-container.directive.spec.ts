import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAccessibleDragAndDropContainerDirective } from './drag-and-drop-container.directive';

@Component({
	template: `
		<div
			ngxAccessibleDragAndDropContainer
			[ngxAccessibleDragAndDropContainerIndex]="1"
			ngxAccessibleDragAndDropContainerLabel="Container 1"
		></div>
	`,
	imports: [NgxAccessibleDragAndDropContainerDirective],
	changeDetection: ChangeDetectionStrategy.Eager,
})
class TestHostComponent {}

describe('NgxAccessibleDragAndDropContainerDirective', () => {
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestHostComponent, NgxAccessibleDragAndDropContainerDirective],
		});
		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();
	});

	it('should bind container index and optional label inputs correctly', () => {
		const containerDirective = fixture.debugElement.children[0].injector.get(
			NgxAccessibleDragAndDropContainerDirective
		);

		expect(containerDirective.index()).toBe(1);
		expect(containerDirective.label()).toBe('Container 1');
	});
});
