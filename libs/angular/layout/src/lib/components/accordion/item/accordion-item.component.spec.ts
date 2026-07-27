import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAccordionComponent } from '../accordion.component';

import { NgxAccordionItemComponent } from './accordion-item.component';

@Component({
	template: `
		<ngx-accordion>
			<ngx-accordion-item [disabled]="isDisabled">
				<ng-template #headerTmpl>Item 1 Header</ng-template>
				<ng-template #contentTmpl>Item 1 Content</ng-template>
			</ngx-accordion-item>
		</ngx-accordion>
	`,
	imports: [NgxAccordionComponent, NgxAccordionItemComponent],
	changeDetection: ChangeDetectionStrategy.Eager,
})
class TestHostComponent {
	public isDisabled = false;
}

describe('NgxAccordionItemComponent', () => {
	let fixture: ComponentFixture<TestHostComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestHostComponent, NgxAccordionComponent, NgxAccordionItemComponent],
		});
		fixture = TestBed.createComponent(TestHostComponent);
		fixture.detectChanges();
	});

	it('should register with parent accordion on init and unregister on destroy', () => {
		const accordionComponent = fixture.debugElement.children[0]
			.componentInstance as NgxAccordionComponent;
		const itemComponent = fixture.debugElement.children[0].children[0]
			.componentInstance as NgxAccordionItemComponent;

		expect(accordionComponent.items.length).toBe(1);
		expect(accordionComponent.items[0]).toBe(itemComponent);

		// Iben: Destroying the fixture should unregister the item
		fixture.destroy();
		expect(accordionComponent.items.length).toBe(0);
	});

	it('should update open state when updateAccordionItemState is called', () => {
		const itemComponent = fixture.debugElement.children[0].children[0]
			.componentInstance as NgxAccordionItemComponent;

		expect(itemComponent.isOpen()).toBe(false);

		itemComponent.updateAccordionItemState(true);
		expect(itemComponent.isOpen()).toBe(true);

		itemComponent.updateAccordionItemState(false);
		expect(itemComponent.isOpen()).toBe(false);
	});

	it('should handle focus state updates', () => {
		const itemComponent = fixture.debugElement.children[0].children[0]
			.componentInstance as NgxAccordionItemComponent;

		itemComponent.setFocus(true);
		// Iben: Verify focus state internally
		expect((itemComponent as any).hasFocus()).toBe(true);

		itemComponent.setFocus(false);
		expect((itemComponent as any).hasFocus()).toBe(false);
	});
});
