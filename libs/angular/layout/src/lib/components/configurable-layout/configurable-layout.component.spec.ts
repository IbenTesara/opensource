import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { NgxAccessibleDragAndDropAbstractService } from '../../abstracts';
import { NgxConfigurableLayoutItemComponent } from '../configurable-layout-item/configurable-layout-item.component';

import { NgxConfigurableLayoutComponent } from './configurable-layout.component';

@Component({
	template: `
		<ngx-configurable-layout [layoutType]="'static'" [keys]="[['item1', 'item2']]">
			<ngx-configurable-layout-item key="item1" label="Item One">
				<ng-template>Content 1</ng-template>
			</ngx-configurable-layout-item>
			<ngx-configurable-layout-item key="item2" label="Item Two">
				<ng-template>Content 2</ng-template>
			</ngx-configurable-layout-item>
		</ngx-configurable-layout>
	`,
	imports: [NgxConfigurableLayoutComponent, NgxConfigurableLayoutItemComponent],
})
class TestHostComponent {}

describe('NgxConfigurableLayoutComponent', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let layoutComponent: NgxConfigurableLayoutComponent;
	let dragAndDropServiceMock: { setDragAndDropDescription: jest.Mock; setMessage: jest.Mock };

	beforeEach(() => {
		dragAndDropServiceMock = {
			setDragAndDropDescription: jest.fn().mockReturnValue(of(null)),
			setMessage: jest.fn().mockReturnValue(of(null)),
		};

		TestBed.configureTestingModule({
			imports: [TestHostComponent, NgxConfigurableLayoutComponent],
			providers: [
				{
					provide: NgxAccessibleDragAndDropAbstractService,
					useValue: dragAndDropServiceMock,
				},
			],
		});
		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();

		layoutComponent = fixture.debugElement.children[0].injector.get(
			NgxConfigurableLayoutComponent
		);
	});

	it('should populate item template records based on key inputs', () => {
		expect(layoutComponent.itemTemplateRecord()['item1']).toBeDefined();
		expect(layoutComponent.itemTemplateRecord()['item2']).toBeDefined();
		expect(layoutComponent.itemLabelRecord()['item1']).toBe('Item One');
	});
});
