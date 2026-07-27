import { CdkDropList } from '@angular/cdk/drag-drop';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { NgxAccessibleDragAndDropAbstractService } from '../../abstracts';

import { NgxAccessibleDragAndDropContainerDirective } from './drag-and-drop-container.directive';
import { NgxAccessibleDragAndDropHostDirective } from './drag-and-drop-host.directive';
import { NgxAccessibleDragAndDropItemDirective } from './drag-and-drop-item.directive';

@Component({
	template: `
		<div ngxAccessibleDragAndDropHost>
			<div
				ngxAccessibleDragAndDropContainer
				[ngxAccessibleDragAndDropContainerIndex]="0"
				cdkDropList
			>
				<button
					ngxAccessibleDragAndDropItem
					[ngxAccessibleDragAndDropItemIndex]="0"
					ngxAccessibleDragAndDropItemId="item-1"
					ngxAccessibleDragAndDropLabel="Item 1"
				>
					Item 1
				</button>
			</div>
		</div>
	`,
	imports: [
		NgxAccessibleDragAndDropHostDirective,
		NgxAccessibleDragAndDropContainerDirective,
		NgxAccessibleDragAndDropItemDirective,
	],
	changeDetection: ChangeDetectionStrategy.Eager,
})
class TestHostComponent {}

describe('NgxAccessibleDragAndDropItemDirective', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let itemDirective: NgxAccessibleDragAndDropItemDirective;
	let buttonEl: HTMLButtonElement;
	let dragAndDropServiceMock: { setDragAndDropDescription: jest.Mock; setMessage: jest.Mock };

	beforeEach(() => {
		dragAndDropServiceMock = {
			setDragAndDropDescription: jest.fn().mockReturnValue(of(null)),
			setMessage: jest.fn().mockReturnValue(of(null)),
		};

		const cdkDropListMock = { orientation: 'vertical' };

		TestBed.configureTestingModule({
			imports: [TestHostComponent, NgxAccessibleDragAndDropItemDirective],
			providers: [
				{
					provide: NgxAccessibleDragAndDropAbstractService,
					useValue: dragAndDropServiceMock,
				},
				{
					provide: CdkDropList,
					useValue: cdkDropListMock,
				},
			],
		});

		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();

		const itemDebugEl = fixture.debugElement.children[0].children[0].children[0];
		itemDirective = itemDebugEl.injector.get(NgxAccessibleDragAndDropItemDirective);
		buttonEl = itemDebugEl.nativeElement;
	});

	it('should set tabindex to 0 when enabled', () => {
		expect(itemDirective.tabIndex()).toBe(0);
	});

	it('should toggle aria-selected state on Enter keypress when focused', () => {
		buttonEl.dispatchEvent(new Event('focus'));
		fixture.detectChanges();

		buttonEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
		fixture.detectChanges();

		expect(itemDirective.isSelected).toBe(true);
		expect(dragAndDropServiceMock.setMessage).toHaveBeenCalledWith(
			expect.objectContaining({ type: 'selected' })
		);
	});
});
