import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCurrencyTableCellComponent } from './currency-cell.component';

@Component({
	template: `
		<ngx-table-currency-cell [currency]="'USD'">
			<ng-template #headerTmpl>Price</ng-template>
		</ngx-table-currency-cell>
	`,
	imports: [NgxCurrencyTableCellComponent],
})
class TestHostComponent {
	@ViewChild(NgxCurrencyTableCellComponent) public cellComponent!: NgxCurrencyTableCellComponent;
}

describe('NgxCurrencyTableCellComponent', () => {
	let fixture: ComponentFixture<TestHostComponent>;
	let hostComponent: TestHostComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [TestHostComponent, NgxCurrencyTableCellComponent],
		});
		fixture = TestBed.createComponent(TestHostComponent);
		hostComponent = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should set currency signal and cellClass properly', () => {
		expect(hostComponent.cellComponent.currency()).toBe('USD');
		expect(hostComponent.cellComponent.cellClass).toBe('ngx-currency-table-cell');
		expect(hostComponent.cellComponent.cellTemplate()).toBeDefined();
		expect(hostComponent.cellComponent.headerTemplate()).toBeDefined();
	});
});
