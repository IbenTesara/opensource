import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

import { NgxDisplayContentComponent } from '../../../abstracts';
import { NgxDisplayContentConditions } from '../../../types';
import { NgxDisplayContentDirective } from '../display-content.directive';

@Component({
	selector: 'test-loading',
	standalone: true,
	template: '<p class="loading">Loading</p>',
})
export class TestLoadingComponent extends NgxDisplayContentComponent {}
@Component({
	selector: 'test-error',
	standalone: true,
	template: '<p class="error">Error</p>',
})
export class TestErrorComponent extends NgxDisplayContentComponent {}

@Component({
	selector: 'test-offline',
	standalone: true,
	template: '<p class="offline">Offline</p>',
})
export class TestOfflineComponent extends NgxDisplayContentComponent {}

@Component({
	selector: 'test-data-error',
	standalone: true,
	template: '<p class="error">Error {{data()}}</p>',
})
export class TestErrorDataComponent extends NgxDisplayContentComponent {}

@Component({
	selector: 'test-data',
	template: '<p *displayContent="conditions()" class="content">Content</p>',
	imports: [NgxDisplayContentDirective],
})
export class TestDisplayContentComponent {
	readonly conditions = input<NgxDisplayContentConditions>();
}

@Component({
	selector: 'test-override-data',
	template: `
		<p
			*displayContent="
				conditions();
				configuration: { error: { data: errorData() }, loading: { template: loadingTmpl } }
			"
			class="content"
		>
			Content
		</p>

		<ng-template #loadingTmpl><p class="custom-loading">Custom loading</p></ng-template>
	`,
	imports: [NgxDisplayContentDirective, CommonModule],
})
export class TestOverrideDisplayContentComponent {
	readonly conditions = input<NgxDisplayContentConditions>();
	readonly errorData = input<any>();
}
