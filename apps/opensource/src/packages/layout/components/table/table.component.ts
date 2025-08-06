import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { NgxTable, provideNgxTableConfiguration } from '@lib/ngx-layout';

import { TestLoadingComponent } from '../display-content/display.content.component';
import { TableCheckboxComponent } from '../table-configuration/table-checkbox.component';

const dataSet1 = [
	{
		name: 'World',
		firstName: 'Hello',
		active: false,
		id: 'id1',
		hello: 'world',
		amount: 37,
		date: '12/02/2023',
	},
	{
		name: 'Van de Veire',
		firstName: 'Iben',
		active: true,
		id: 'IBEN',
		hello: 'world',
		amount: 5000,
		date: '12/02/2023',
	},
	{
		name: 'Van de Veire',
		firstName: 'Iben',
		active: true,
		id: 'IBEN2',
		hello: 'world',
		amount: 5000,
		date: '12/02/2023',
	},
];

const dataSet2 = [
	{
		name: 'Tools',
		firstName: 'Ngx',
		active: true,
		id: 'id3',
		hello: 'world',
		amount: 0.5,
		date: '12/02/2023',
	},
];

@Component({
	selector: 'table-test',
	templateUrl: './table.component.html',
	imports: [NgxTable, ReactiveFormsModule, JsonPipe],
	providers: [
		provideNgxTableConfiguration({
			components: {
				loading: TestLoadingComponent,
				// checkbox: TableCheckboxComponent,
			},
			showOpenRowState: true,
		}),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
	public control: FormControl<any[]> = new FormControl([]);
	public data: WritableSignal<any[]> = signal(dataSet1);
	public hasDetailRow: WritableSignal<boolean> = signal<boolean>(true);
	public loading: WritableSignal<boolean> = signal<boolean>(false);
	public hasLoadingTemplate: WritableSignal<boolean> = signal<boolean>(true);
	private currentDataSet = 1;

	public toggleDataSet() {
		this.data.set(this.currentDataSet === 1 ? dataSet2 : dataSet1);
		this.currentDataSet = this.currentDataSet === 1 ? 0 : 1;
	}

	public toggleDetailRow() {
		this.hasDetailRow.update((current) => !current);
	}

	public toggleLoading() {
		this.loading.update((current) => !current);
	}

	public toggleHasLoadingTemplate() {
		this.hasLoadingTemplate.update((current) => !current);
	}
}
