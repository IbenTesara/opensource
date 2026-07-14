import { Component, effect, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { provideNgxSignalStore } from '@lib/ngx-store';

import { TestStore } from './store';
import { StoreService } from './store.service';

@Component({
	selector: 'store',
	template: `{{ store.state.hello.data() }}`,
	changeDetection: ChangeDetectionStrategy.Eager,
	providers: [StoreService, provideNgxSignalStore(TestStore)],
})
export class NgxSignalStoreComponent implements OnInit {
	public store = inject(StoreService);

	constructor() {
		effect(() => {
			console.log(this.store.state.hello.loading());
		});
	}

	ngOnInit() {
		this.store.sayHello().subscribe();
	}
}
