import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { NgxConfigurableLayout, provideNgxDragAndDropService } from '@lib/ngx-layout';

import { DragAndDropService } from '../../services';

@Component({
	selector: 'dashboard-test',
	templateUrl: './dashboard.component.html',
	imports: [NgxConfigurableLayout, ReactiveFormsModule],
	providers: [provideNgxDragAndDropService(DragAndDropService)],
})
export class DashboardTestComponent {
	public control = new FormControl([
		[
			{ key: 'start', isActive: 'true' },
			{ key: 'action', isActive: 'true' },
			{ key: 'label', isActive: 'true' },
		],
		[
			{
				key: 'action2',
				isActive: 'true',
			},
		],
	]);
}
