import { Component, input, ChangeDetectionStrategy } from '@angular/core';

import {
	NgxDisplayContentComponent,
	NgxDisplayContentConditions,
	NgxDisplayContentDirective,
} from '@lib/ngx-layout';
@Component({
	selector: 'test-loading',
	standalone: true,
	template: '<p class="loading">Loading</p>',
	changeDetection: ChangeDetectionStrategy.Eager,
	host: {
		class: 'loading-component',
	},
})
export class TestLoadingComponent extends NgxDisplayContentComponent {}
@Component({
	selector: 'test-error',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.Eager,
	template: '<p class="error">Error</p>',
})
export class TestErrorComponent extends NgxDisplayContentComponent {}

@Component({
	selector: 'test-offline',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.Eager,
	template: '<p class="offline">Offline</p>',
})
export class TestOfflineComponent extends NgxDisplayContentComponent {}

@Component({
	selector: 'test-data-error',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.Eager,
	template: '<p class="error">Error {{data()}}</p>',
})
export class TestErrorDataComponent extends NgxDisplayContentComponent {}

@Component({
	selector: 'test-data',
	template: '<p *displayContent="conditions()" class="content">Content</p>',
	changeDetection: ChangeDetectionStrategy.Eager,
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
	changeDetection: ChangeDetectionStrategy.Eager,
	imports: [NgxDisplayContentDirective],
})
export class TestOverrideDisplayContentComponent {
	readonly conditions = input<NgxDisplayContentConditions>();
	readonly errorData = input<any>();
}
