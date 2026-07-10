import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTableSortDirection } from '../../enums/sort-direction.enum';
import { NgxTableAriaLabels } from '../../types';
import { NgxTableCellDirective } from '../cell/generic-cell.directive';

import { NgxTableComponent } from './ngx-table.component';

@Component({
	standalone: true,
	imports: [NgxTableComponent, NgxTableCellDirective],
	template: `
		<ngx-table
			[ariaLabel]="'Test Table'"
			[columns]="columns()"
			[data]="data()"
			[ariaLabels]="ariaLabels()"
			[currentSorting]="activeSort()"
			[selectable]="selectable()"
			[showOpenRowState]="showOpenRowState()"
		>
			<ngx-table-cell column="name" [sortable]="true" (sort)="onSort($event)">
				<ng-template #headerTmpl>Name Column</ng-template>
				<ng-template #cellTmpl let-row>{{ row.name }}</ng-template>
			</ngx-table-cell>
			<ngx-table-cell column="age" [sortable]="true" (sort)="onSort($event)">
				<ng-template #headerTmpl>Age Column</ng-template>
				<ng-template #cellTmpl let-row>{{ row.age }}</ng-template>
			</ngx-table-cell>

			<ng-template #detailRowTmpl let-row>Detail content</ng-template>
		</ngx-table>
	`,
})
class TestHostComponent {
	columns = signal(['name', 'age']);
	data = signal([
		{ name: 'John', age: 30 },
		{ name: 'Jane', age: 25 },
	]);
	ariaLabels = signal<NgxTableAriaLabels>({});
	activeSort = signal<any>(undefined);
	selectable = signal(false);
	showOpenRowState = signal(false);

	onSort(event: any) {
		this.activeSort.set(event);
	}
}

describe('NgxTableComponent WCAG Sort Buttons', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let hostComponent: TestHostComponent;
	let buttons: HTMLButtonElement[];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TestHostComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TestHostComponent);
		hostComponent = fixture.componentInstance;
		fixture.detectChanges();

		buttons = Array.from(fixture.nativeElement.querySelectorAll('.ngx-table-sorting-cell-button'));
	});

	it('should render sort buttons for sortable columns', () => {
		expect(buttons.length).toBe(2);
	});

	it('should apply the default English fallback labels initially', () => {
		expect(buttons[0].getAttribute('aria-label')).toBe('Sort by name');
		expect(buttons[1].getAttribute('aria-label')).toBe('Sort by age');
	});

	it('should dynamically update the label with a direction suffix when a column is sorted', () => {
		// Iben: Click the first sort button to sort the name column ascending
		buttons[0].click();
		fixture.detectChanges();

		expect(buttons[0].getAttribute('aria-label')).toBe('Sort by name, currently sorted ascending');
		expect(buttons[1].getAttribute('aria-label')).toBe('Sort by age'); // unchanged

		// Iben: Click again to toggle sorting to descending
		buttons[0].click();
		fixture.detectChanges();

		expect(buttons[0].getAttribute('aria-label')).toBe('Sort by name, currently sorted descending');
	});

	it('should allow custom static strings for the sort column label', () => {
		hostComponent.ariaLabels.set({
			sortColumn: 'Click to Sort Column',
		});
		fixture.detectChanges();

		expect(buttons[0].getAttribute('aria-label')).toBe('Click to Sort Column');
		expect(buttons[1].getAttribute('aria-label')).toBe('Click to Sort Column');
	});

	it('should support dynamic callback functions to resolve the sort column label', () => {
		hostComponent.ariaLabels.set({
			sortColumn: (column: string, direction: NgxTableSortDirection | null) => {
				const dirText = direction ? ` - ${direction.toLowerCase()}` : '';
				return `Order by ${column}${dirText}`;
			},
		});
		fixture.detectChanges();

		expect(buttons[0].getAttribute('aria-label')).toBe('Order by name');

		// Iben: Trigger sorting change
		buttons[0].click();
		fixture.detectChanges();

		expect(buttons[0].getAttribute('aria-label')).toBe('Order by name - ascending');
	});
});

describe('NgxTableComponent Column Header ARIA Labels', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let hostComponent: TestHostComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [TestHostComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TestHostComponent);
		hostComponent = fixture.componentInstance;
	});

	it('should fallback to default English labels for selection and expansion columns', () => {
		hostComponent.selectable.set(true);
		hostComponent.showOpenRowState.set(true);
		fixture.detectChanges();

		const headers = fixture.nativeElement.querySelectorAll('th');
		const selectHeader = Array.from(headers).find((th: any) => th.classList.contains('ngx-table-selectable-cell'));
		expect(selectHeader?.getAttribute('aria-label')).toBe('Selection column');

		const expandHeader = Array.from(headers).find((th: any) => !th.classList.contains('ngx-table-selectable-cell') && !th.textContent);
		expect(expandHeader?.getAttribute('aria-label')).toBe('Expansion column');
	});

	it('should support custom labels for selection and expansion columns via ariaLabels input', () => {
		hostComponent.selectable.set(true);
		hostComponent.showOpenRowState.set(true);
		hostComponent.ariaLabels.set({
			selectionColumn: 'Custom Select Header',
			expansionColumn: 'Custom Expand Header',
		});
		fixture.detectChanges();

		const headers = fixture.nativeElement.querySelectorAll('th');
		const selectHeader = Array.from(headers).find((th: any) => th.classList.contains('ngx-table-selectable-cell'));
		expect(selectHeader?.getAttribute('aria-label')).toBe('Custom Select Header');

		const expandHeader = Array.from(headers).find((th: any) => !th.classList.contains('ngx-table-selectable-cell') && !th.textContent);
		expect(expandHeader?.getAttribute('aria-label')).toBe('Custom Expand Header');
	});
});
