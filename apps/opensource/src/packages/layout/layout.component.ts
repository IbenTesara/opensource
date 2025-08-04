import { Component, signal, WritableSignal } from '@angular/core';

import {
	NgxDisplayContentDirective,
	provideNgxDisplayContentConfiguration,
} from '@lib/ngx-layout';

import { AccordionTestComponent } from './components/accordion/accordion.component';
import { DashboardTestComponent } from "./components/dashboard/dashboard.component";
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
    } ),
	],
	imports: [NgxDisplayContentDirective, TableComponent, AccordionTestComponent, DashboardTestComponent],
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
}
