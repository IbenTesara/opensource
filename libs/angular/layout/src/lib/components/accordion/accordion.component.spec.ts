import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAccordionComponent } from './accordion.component';
import { NgxAccordionItemComponent } from './item/accordion-item.component';

describe('NgxAccordionComponent', () => {
	let component: NgxAccordionComponent;
	let fixture: ComponentFixture<NgxAccordionComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [NgxAccordionComponent],
		});
		fixture = TestBed.createComponent(NgxAccordionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should register and remove accordion items', () => {
		// Iben: Create dummy accordion item mocks
		const item1 = {
			id: 'item-1',
			updateAccordionItemState: jest.fn(),
		} as unknown as NgxAccordionItemComponent;
		const item2 = {
			id: 'item-2',
			updateAccordionItemState: jest.fn(),
		} as unknown as NgxAccordionItemComponent;

		component.registerItem(item1);
		component.registerItem(item2);
		expect(component.items.length).toBe(2);

		component.removeItem(item1);
		expect(component.items.length).toBe(1);
		expect(component.items[0].id).toBe('item-2');
	});

	it('should handle focus movement correctly', () => {
		// Iben: Create dummy accordion item mocks with focus method
		const item1 = { id: 'item-1', focus: jest.fn() } as unknown as NgxAccordionItemComponent;
		const item2 = { id: 'item-2', focus: jest.fn() } as unknown as NgxAccordionItemComponent;
		const item3 = { id: 'item-3', focus: jest.fn() } as unknown as NgxAccordionItemComponent;

		component.registerItem(item1);
		component.registerItem(item2);
		component.registerItem(item3);

		// Iben: Move focus to first and last items
		component.moveFocus('item-2', 'first');
		expect(item1.focus).toHaveBeenCalled();

		component.moveFocus('item-2', 'last');
		expect(item3.focus).toHaveBeenCalled();

		// Iben: Move focus up and down relative to current item
		component.moveFocus('item-2', 'down');
		expect(item3.focus).toHaveBeenCalledTimes(2);

		component.moveFocus('item-2', 'up');
		expect(item1.focus).toHaveBeenCalledTimes(2);
	});

	it('should enforce single open item state when openStateBehavior is "one"', () => {
		// Iben: Set openStateBehavior to 'one'
		fixture.componentRef.setInput('openStateBehavior', 'one');
		fixture.detectChanges();

		const item1 = {
			id: 'item-1',
			updateAccordionItemState: jest.fn(),
		} as unknown as NgxAccordionItemComponent;
		const item2 = {
			id: 'item-2',
			updateAccordionItemState: jest.fn(),
		} as unknown as NgxAccordionItemComponent;

		component.registerItem(item1);
		component.registerItem(item2);

		// Iben: Opening item-1 should trigger updateAccordionItemState(false) on item-2
		component.handleOpenState('item-1');
		expect(item2.updateAccordionItemState).toHaveBeenCalledWith(false);
		expect(item1.updateAccordionItemState).not.toHaveBeenCalledWith(false);
	});

	it('should allow multiple open items when openStateBehavior is "all"', () => {
		// Iben: Set openStateBehavior to 'all' (default)
		fixture.componentRef.setInput('openStateBehavior', 'all');
		fixture.detectChanges();

		const item1 = {
			id: 'item-1',
			updateAccordionItemState: jest.fn(),
		} as unknown as NgxAccordionItemComponent;
		const item2 = {
			id: 'item-2',
			updateAccordionItemState: jest.fn(),
		} as unknown as NgxAccordionItemComponent;

		component.registerItem(item1);
		component.registerItem(item2);

		component.handleOpenState('item-1');
		expect(item2.updateAccordionItemState).not.toHaveBeenCalled();
	});
});
