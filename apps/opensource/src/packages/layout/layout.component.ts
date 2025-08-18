import { Component, signal, WritableSignal } from '@angular/core';

import { NgxTourItemDirective } from '@lib/ngx-inform';
import {
	NgxDisplayContentDirective,
	NgxFeedComponent,
	provideNgxDisplayContentConfiguration,
} from '@lib/ngx-layout';

import { AccordionTestComponent } from './components/accordion/accordion.component';
import { DashboardTestComponent } from './components/dashboard/dashboard.component';
import {
	TestLoadingComponent,
	TestErrorComponent,
	TestOfflineComponent,
} from './components/display-content/display.content.component';
import { TableComponent } from './components/table/table.component';

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
	imports: [
		NgxDisplayContentDirective,
		TableComponent,
		AccordionTestComponent,
		DashboardTestComponent,
		NgxTourItemDirective,
		NgxFeedComponent,
	],
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.scss',
})
export class NgxLayoutPageComponent {
	// NgxDisplayContent
	public loading: WritableSignal<boolean> = signal(true);
	public error: WritableSignal<boolean> = signal(false);
	public errorData: WritableSignal<string> = signal('ERROR');
	public dataAdded: number = 0;

	public feedData: WritableSignal<string[]> = signal([
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
	]);

	public toggleLoading() {
		this.loading.update((loading) => !loading);
	}

	public toggleError() {
		this.error.update((error) => !error);
	}

	public endReached() {
		if (this.dataAdded === 3) {
			return;
		}

		this.feedData.update((data) => [...data, ...data]);
		this.dataAdded++;
	}
}
