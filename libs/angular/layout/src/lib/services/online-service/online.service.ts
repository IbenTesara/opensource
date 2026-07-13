import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxWindowService } from '@ibenvandeveire/ngx-core';
import { Observable, Subject, fromEvent, tap } from 'rxjs';

/**
 * A service that provides the currently online status of the application
 */
@Injectable({ providedIn: 'root' })
export class NgxOnlineService {
	private readonly windowService = inject(NgxWindowService);

	/**
	 * A subject that emits whenever the application is on or offline
	 */
	private readonly onlineSubject: Subject<boolean> = new Subject<boolean>();

	/**
	 * An observable that emits whenever the application is on or offline
	 */
	public readonly online$: Observable<boolean> = this.onlineSubject.asObservable();

	constructor() {
		// Iben: When we're in the browser, listen to the online and offline status of the application
		if (this.windowService.isBrowser()) {
			// Iben: Handle the on and offline status of the application
			fromEvent(window, 'online')
				.pipe(
					tap(() => {
						this.onlineSubject.next(true);
					}),
					takeUntilDestroyed()
				)
				.subscribe();

			fromEvent(window, 'offline')
				.pipe(
					tap(() => {
						this.onlineSubject.next(false);
					}),
					takeUntilDestroyed()
				)
				.subscribe();
		}
	}
}
