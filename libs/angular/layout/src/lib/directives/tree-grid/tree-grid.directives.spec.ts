import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTreeGridRowDirective } from './tree-grid-row.directive';
import { NgxTreeGridCellDirective } from './tree-grid.cell.directive';
import { NgxTreeGridDirective } from './tree-grid.directive';

@Component({
	standalone: true,
	imports: [NgxTreeGridDirective, NgxTreeGridRowDirective, NgxTreeGridCellDirective],
	template: `
		<table [ngxTreeGrid]="isTreeGrid()" [ngxTreeGridExpandable]="isExpandable()">
			<tr
				ngxTreeGridRow
				[ngxTreeGridRow]="0"
				[ngxTreeGridRowExpanded]="row0Expanded()"
				[ngxTreeGridRowSelectable]="true"
				tabindex="0"
				(ngxTreeGridRowExpandRow)="onRowExpand(0, $event)"
				(ngxTreeGridRowSelectRow)="onRowSelect(0)"
			>
				<td ngxTreeGridCell [ngxTreeGridCell]="0" [ngxTreeGridCellRow]="0">Cell 0-0</td>
				<td ngxTreeGridCell [ngxTreeGridCell]="1" [ngxTreeGridCellRow]="0">Cell 0-1</td>
			</tr>
			<tr
				ngxTreeGridRow
				[ngxTreeGridRow]="1"
				[ngxTreeGridRowExpanded]="row1Expanded()"
				[ngxTreeGridRowSelectable]="true"
				tabindex="0"
				(ngxTreeGridRowExpandRow)="onRowExpand(1, $event)"
				(ngxTreeGridRowSelectRow)="onRowSelect(1)"
			>
				<td ngxTreeGridCell [ngxTreeGridCell]="0" [ngxTreeGridCellRow]="1">Cell 1-0</td>
				<td ngxTreeGridCell [ngxTreeGridCell]="1" [ngxTreeGridCellRow]="1">Cell 1-1</td>
			</tr>
		</table>
	`,
})
class TestTreeGridComponent {
	isTreeGrid = signal(true);
	isExpandable = signal(true);
	row0Expanded = signal(false);
	row1Expanded = signal(false);

	expandedEvents: { index: number; value: boolean }[] = [];
	selectEvents: number[] = [];

	onRowExpand(index: number, value: boolean) {
		this.expandedEvents.push({ index, value });
		if (index === 0) this.row0Expanded.set(value);
		if (index === 1) this.row1Expanded.set(value);
	}

	onRowSelect(index: number) {
		this.selectEvents.push(index);
	}

	clearEvents() {
		this.expandedEvents = [];
		this.selectEvents = [];
	}
}

describe('TreeGrid Directives WCAG Pattern', () => {
	let fixture: ComponentFixture<TestTreeGridComponent>;
	let component: TestTreeGridComponent;
	let tableEl: HTMLElement;
	let rowEls: HTMLElement[];
	let cellEls: HTMLElement[][];

	const triggerKey = (
		element: HTMLElement,
		key: string,
		modifiers: { shift?: boolean; ctrl?: boolean } = {}
	) => {
		const event = new KeyboardEvent('keydown', {
			key,
			shiftKey: modifiers.shift,
			ctrlKey: modifiers.ctrl,
			bubbles: true,
			cancelable: true,
		});
		element.dispatchEvent(event);
		fixture.detectChanges();
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TestTreeGridComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TestTreeGridComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		tableEl = fixture.nativeElement.querySelector('table');
		rowEls = Array.from(fixture.nativeElement.querySelectorAll('tr'));
		cellEls = [
			Array.from(rowEls[0].querySelectorAll('td')),
			Array.from(rowEls[1].querySelectorAll('td')),
		];
	});

	describe('Role Assignment (WAI-ARIA)', () => {
		it('should set role="treegrid" when isTreeGrid is true', () => {
			expect(tableEl.getAttribute('role')).toBe('treegrid');
		});

		it('should fallback to role="table" when isTreeGrid is false', () => {
			component.isTreeGrid.set(false);
			fixture.detectChanges();
			expect(tableEl.getAttribute('role')).toBe('table');
		});
	});

	describe('Row Navigation & Expansion (Arrow Keys)', () => {
		beforeEach(() => {
			// Initially focus the first row
			rowEls[0].focus();
			expect(document.activeElement).toBe(rowEls[0]);
		});

		it('should move focus down with ArrowDown and up with ArrowUp', () => {
			triggerKey(rowEls[0], 'ArrowDown');
			expect(document.activeElement).toBe(rowEls[1]);

			triggerKey(rowEls[1], 'ArrowUp');
			expect(document.activeElement).toBe(rowEls[0]);
		});

		it('should expand a closed row when pressing ArrowRight', () => {
			component.row0Expanded.set(false);
			fixture.detectChanges();
			component.clearEvents();

			triggerKey(rowEls[0], 'ArrowRight');
			expect(component.expandedEvents).toEqual([{ index: 0, value: true }]);
			expect(document.activeElement).toBe(rowEls[0]); // focus stays on row
		});

		it('should focus the first cell of the row when pressing ArrowRight on an open row', () => {
			component.row0Expanded.set(true);
			fixture.detectChanges();
			component.clearEvents();

			triggerKey(rowEls[0], 'ArrowRight');
			expect(component.expandedEvents.length).toBe(0); // no expansion event emitted
			expect(document.activeElement).toBe(cellEls[0][0]); // focus moved to first cell
		});

		it('should collapse an open row when pressing ArrowLeft', () => {
			component.row0Expanded.set(true);
			fixture.detectChanges();
			component.clearEvents();

			triggerKey(rowEls[0], 'ArrowLeft');
			expect(component.expandedEvents).toEqual([{ index: 0, value: false }]);
		});
	});

	describe('Row Selection and Shift Navigation', () => {
		beforeEach(() => {
			rowEls[0].focus();
		});

		it('should select row on Shift+Space and Ctrl+Space', () => {
			component.clearEvents();
			triggerKey(rowEls[0], ' ', { shift: true });
			expect(component.selectEvents).toEqual([0]);

			component.clearEvents();
			triggerKey(rowEls[0], ' ', { ctrl: true });
			expect(component.selectEvents).toEqual([0]);
		});

		it('should select and focus the next row on Shift+ArrowDown', () => {
			component.clearEvents();
			triggerKey(rowEls[0], 'ArrowDown', { shift: true });
			expect(component.selectEvents).toEqual([1]);
			expect(document.activeElement).toBe(rowEls[1]);
		});

		it('should select and focus the previous row on Shift+ArrowUp', () => {
			rowEls[1].focus();
			component.clearEvents();
			triggerKey(rowEls[1], 'ArrowUp', { shift: true });
			expect(component.selectEvents).toEqual([0]);
			expect(document.activeElement).toBe(rowEls[0]);
		});
	});

	describe('Boundary Row Navigation (Home / End / PageUp / PageDown)', () => {
		it('should focus the first row on Home or PageUp', () => {
			rowEls[1].focus();
			triggerKey(rowEls[1], 'Home');
			expect(document.activeElement).toBe(rowEls[0]);

			rowEls[1].focus();
			triggerKey(rowEls[1], 'PageUp');
			expect(document.activeElement).toBe(rowEls[0]);
		});

		it('should focus the last row on End or PageDown', () => {
			rowEls[0].focus();
			triggerKey(rowEls[0], 'End');
			expect(document.activeElement).toBe(rowEls[1]);

			rowEls[0].focus();
			triggerKey(rowEls[0], 'PageDown');
			expect(document.activeElement).toBe(rowEls[1]);
		});
	});

	describe('Cell Navigation (Arrow Keys)', () => {
		beforeEach(() => {
			cellEls[0][0].focus();
			expect(document.activeElement).toBe(cellEls[0][0]);
		});

		it('should move focus left/right within the row', () => {
			triggerKey(cellEls[0][0], 'ArrowRight');
			expect(document.activeElement).toBe(cellEls[0][1]);

			triggerKey(cellEls[0][1], 'ArrowLeft');
			expect(document.activeElement).toBe(cellEls[0][0]);
		});

		it('should stop focus moving left of index 0', () => {
			triggerKey(cellEls[0][0], 'ArrowLeft');
			expect(document.activeElement).toBe(cellEls[0][0]);
		});

		it('should move focus up/down in the same column', () => {
			triggerKey(cellEls[0][0], 'ArrowDown');
			expect(document.activeElement).toBe(cellEls[1][0]);

			triggerKey(cellEls[1][0], 'ArrowUp');
			expect(document.activeElement).toBe(cellEls[0][0]);
		});
	});

	describe('Boundary Cell Navigation', () => {
		it('should move focus to first/last cell in row on Home/End', () => {
			cellEls[0][1].focus();
			triggerKey(cellEls[0][1], 'Home');
			expect(document.activeElement).toBe(cellEls[0][0]);

			cellEls[0][0].focus();
			triggerKey(cellEls[0][0], 'End');
			expect(document.activeElement).toBe(cellEls[0][1]);
		});

		it('should move focus to same column in first/last row on Ctrl+Home / Ctrl+End', () => {
			cellEls[1][1].focus();
			triggerKey(cellEls[1][1], 'Home', { ctrl: true });
			expect(document.activeElement).toBe(cellEls[0][1]);

			cellEls[0][1].focus();
			triggerKey(cellEls[0][1], 'End', { ctrl: true });
			expect(document.activeElement).toBe(cellEls[1][1]);
		});

		it('should focus the first/last cells of the entire grid on PageUp / PageDown', () => {
			cellEls[1][1].focus();
			triggerKey(cellEls[1][1], 'PageUp');
			expect(document.activeElement).toBe(cellEls[0][0]);

			cellEls[0][0].focus();
			triggerKey(cellEls[0][0], 'PageDown');
			expect(document.activeElement).toBe(cellEls[1][1]);
		});
	});
});
