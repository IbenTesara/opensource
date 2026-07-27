import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxConfigurableLayoutItemComponent } from './configurable-layout-item.component';

@Component({
	template: `
		<ngx-configurable-layout-item key="test-key" label="Test Label">
			<ng-template #contentTmpl>Item Content</ng-template>
		</ngx-configurable-layout-item>
	`,
	imports: [NgxConfigurableLayoutItemComponent],
})
class TestHostComponent {}

describe('NgxConfigurableLayoutItemComponent', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let itemComponent: NgxConfigurableLayoutItemComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestHostComponent, NgxConfigurableLayoutItemComponent],
		});
		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();

		itemComponent = fixture.debugElement.children[0].injector.get(
			NgxConfigurableLayoutItemComponent
		);
	});

	it('should expose key and label signals', () => {
		expect(itemComponent.key()).toBe('test-key');
		expect(itemComponent.label()).toBe('Test Label');
		expect(itemComponent.template()).toBeDefined();
	});
});
