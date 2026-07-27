import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { NgxAccessibleDragAndDropAbstractService } from '../../abstracts';

import { NgxAccessibleDragAndDropContainerDirective } from './drag-and-drop-container.directive';
import { NgxAccessibleDragAndDropHostDirective } from './drag-and-drop-host.directive';

@Component({
	template: `
		<div
			ngxAccessibleDragAndDropHost
			ngxAccessibleDragAndDropHostDescription="Host Description"
		>
			<div
				ngxAccessibleDragAndDropContainer
				[ngxAccessibleDragAndDropContainerIndex]="0"
			></div>
			<div
				ngxAccessibleDragAndDropContainer
				[ngxAccessibleDragAndDropContainerIndex]="1"
			></div>
		</div>
	`,
	imports: [NgxAccessibleDragAndDropHostDirective, NgxAccessibleDragAndDropContainerDirective],
	changeDetection: ChangeDetectionStrategy.Eager,
})
class TestHostComponent {}

describe('NgxAccessibleDragAndDropHostDirective', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let hostDirective: NgxAccessibleDragAndDropHostDirective;
	let dragAndDropServiceMock: { setDragAndDropDescription: jest.Mock };

	beforeEach(() => {
		dragAndDropServiceMock = {
			setDragAndDropDescription: jest.fn().mockReturnValue(of(null)),
		};

		TestBed.configureTestingModule({
			imports: [TestHostComponent, NgxAccessibleDragAndDropHostDirective],
			providers: [
				{
					provide: NgxAccessibleDragAndDropAbstractService,
					useValue: dragAndDropServiceMock,
				},
			],
		});

		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();

		hostDirective = fixture.debugElement.children[0].injector.get(
			NgxAccessibleDragAndDropHostDirective
		);
	});

	it('should set drag and drop description via service on view init', () => {
		expect(dragAndDropServiceMock.setDragAndDropDescription).toHaveBeenCalledWith(
			expect.any(HTMLElement),
			'Host Description'
		);
	});

	it('should register items and query containers by index', () => {
		const mockItem: any = { itemId: () => 'item-1', markAsActive: jest.fn() };
		hostDirective.registerDragAndDropItem(mockItem);

		expect(hostDirective.items['item-1']).toBe(mockItem);

		hostDirective.markAsActive('item-1');
		expect(mockItem.markAsActive).toHaveBeenCalled();

		const container = hostDirective.getContainer(1);
		expect(container).toBeDefined();
		expect(container.index()).toBe(1);
	});
});
