import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDateTableCellComponent } from './date-cell.component';

@Component({
	template: `
		<ngx-table-date-cell [format]="'yyyy-MM-dd'" [emptyLabel]="'No Date'">
			<ng-template #headerTmpl>Date</ng-template>
		</ngx-table-date-cell>
	`,
	imports: [NgxDateTableCellComponent],
})
class TestHostComponent {
	@ViewChild(NgxDateTableCellComponent) public cellComponent!: NgxDateTableCellComponent;
}

describe('NgxDateTableCellComponent', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let hostComponent: TestHostComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestHostComponent, NgxDateTableCellComponent],
		});
		fixture = TestBed.createComponent(TestHostComponent);
		hostComponent = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should bind format, emptyLabel signals and setup templates', () => {
		expect(hostComponent.cellComponent.format()).toBe('yyyy-MM-dd');
		expect(hostComponent.cellComponent.emptyLabel()).toBe('No Date');
		expect(hostComponent.cellComponent.cellClass).toBe('ngx-date-table-cell');
		expect(hostComponent.cellComponent.cellTemplate()).toBeDefined();
	});
});
