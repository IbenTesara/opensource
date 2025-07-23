import { Component, signal, WritableSignal } from '@angular/core';

import {
	NgxDisplayContentDirective,
	NgxTable,
	provideNgxDisplayContentConfiguration,
} from '@lib/ngx-layout';

import {
	TestLoadingComponent,
	TestErrorComponent,
	TestOfflineComponent,
} from './components/display-content/display.content.component';

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
		name: 'Hyperdrive',
		firstName: 'Studio',
		active: true,
		id: 'SHD',
		hello: 'world',
		amount: 5000,
		date: '12/02/2023',
	},
	{
		name: 'Hyperdrive',
		firstName: 'Studio',
		active: true,
		id: 'SHD2',
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
	selector: 'ngx-layout-page',
	providers: [
		provideNgxDisplayContentConfiguration({
			components: {
				loading: TestLoadingComponent,
				error: TestErrorComponent,
				offline: TestOfflineComponent,
			},
		}),
	],
	imports: [NgxDisplayContentDirective, NgxTable],
	templateUrl: './layout.component.html',
})
export class NgxLayoutPageComponent {
	// NgxDisplayContent
	public loading: WritableSignal<boolean> = signal(true);
	public error: WritableSignal<boolean> = signal(false);
	public errorData: WritableSignal<string> = signal('ERROR');

	public toggleLoading() {
		this.loading.update((loading) => !loading);
	}

	public toggleError() {
		this.error.update((error) => !error);
	}

	// NgxTable

	public data: WritableSignal<any[]> = signal(dataSet1);
	private currentDataSet = 1;

	public toggleDataSet() {
		this.data.set(this.currentDataSet === 1 ? dataSet2 : dataSet1);
	}
}
