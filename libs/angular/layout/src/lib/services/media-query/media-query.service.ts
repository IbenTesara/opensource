import { Injectable, OnDestroy, inject } from '@angular/core';
import { NgxWindowService } from '@ibenvandeveire/ngx-core';
import { BehaviorSubject, distinctUntilChanged, filter, map, Observable, throwError } from 'rxjs';

import { NgxMediaQueriesToken } from '../../tokens';
import { NgxMediaQuery } from '../../types';

/**
 * A service that can be used to track media queries and their changes.
 */
@Injectable({ providedIn: 'root' })
export class NgxMediaQueryService implements OnDestroy {
	/**
	 * An instance of the NgxWindowService
	 */
	private readonly windowService: NgxWindowService = inject(NgxWindowService);

	/**
	 * An optional list of default mediaQueries we want to register at start time
	 */
	private readonly mediaQueries: NgxMediaQuery[] = inject(NgxMediaQueriesToken, {
		optional: true,
	});

	/**
	 * A record of all the registered listeners
	 */
	private listeners: Record<string, { mediaQueryList: MediaQueryList; listener: EventListener }> =
		{};

	/**
	 * The id of the current query match
	 */
	private readonly currentQueryMatch: BehaviorSubject<string> = new BehaviorSubject<string>(
		undefined
	);

	public readonly currentQueryMatch$: Observable<string> = this.currentQueryMatch.asObservable();

	constructor() {
		// Iben: Register the optionally provided standard queries
		this.registerQuery(this.mediaQueries || []);
	}

	ngOnDestroy(): void {
		// Iben: Remove all the listeners
		Object.values(this.listeners).forEach(({ listener, mediaQueryList }) => {
			mediaQueryList.removeEventListener('change', listener);
		});
	}

	/**
	 * Registers one or multiple queries to listen to
	 *
	 * @param value - One or multiple queries to register
	 */
	public registerQuery(value: NgxMediaQuery | NgxMediaQuery[]): void {
		// Iben: Only run when we're in the browser
		this.windowService.runInBrowser(({ browserWindow }) => {
			// Iben: Loop over all the queries
			(Array.isArray(value) ? value : [value]).forEach((item) => {
				const { id, query } = item;

				// Iben: Early exit if a query already exists
				if (this.listeners[id]) {
					console.warn(
						'@ibenvandeveire/ngx-layout: NgxMediaQueryService: A query with this id already exists.'
					);

					return;
				}

				// Iben: Match the query with the browser
				const mediaQueryList = browserWindow.matchMedia(query);

				// Iben: Perform an initial check to see if the query matches
				if (mediaQueryList.matches) {
					this.currentQueryMatch.next(id);
				}

				// Iben: Setup a listener to track the changes
				const listener = (queryChangedEvent: MediaQueryListEvent) => {
					if (queryChangedEvent.matches) {
						// Iben: Emit the id of the query that has changed
						this.currentQueryMatch.next(id);
					}
				};

				// Iben: Register the listener to the query
				mediaQueryList.addEventListener('change', listener);

				// Iben: Save the listener to remove it later
				this.listeners[id] = {
					listener,
					mediaQueryList,
				};
			});
		});
	}

	/**
	 * Check if the query matches with the current screen size
	 *
	 * @param id - The id of the query we wish to match
	 */
	public matchesQuery(id: string | string[]): Observable<boolean> {
		const ids = Array.isArray(id) ? id : [id];

		// Iben: If the listener does not exist yet, throw an error
		if (ids.every((item) => !this.listeners[item])) {
			return throwError(
				() =>
					new Error(
						'@ibenvandeveire/ngx-layout: NgxMediaQueryService: No provided query matched with the provided ids.'
					)
			);
		}

		// Iben: Create a matching set
		const matchingSet = new Set(ids);

		// Iben: Return whether the current screen size matches the query
		return this.currentQueryMatch.pipe(
			filter(Boolean),
			distinctUntilChanged(),
			map((query) => matchingSet.has(query))
		);
	}

	public get queries() {
		return Object.keys(this.listeners);
	}
}
