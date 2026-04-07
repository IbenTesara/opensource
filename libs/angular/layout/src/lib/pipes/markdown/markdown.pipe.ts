import {
	ChangeDetectorRef,
	inject,
	Pipe,
	PipeTransform,
	OnDestroy,
	ElementRef,
	Renderer2,
} from '@angular/core';
import { MarkedOptions } from 'marked';
import { Observable, Subject, takeUntil, tap } from 'rxjs';

import { NgxMarkdownService } from '../../services';

/**
 * A pipe that parses a markdown string to HTML using the Marked library
 * https://marked.js.org/
 */
@Pipe({
	name: 'ngxMarkdown',
	pure: false,
})
export class NgxMarkdownPipe implements PipeTransform, OnDestroy {
	/**
	 * An instance of the NgxMarkdownService
	 */
	private readonly markdownService: NgxMarkdownService = inject(NgxMarkdownService);

	/**
	 * An instance of the ChangeDetectorRef
	 */
	private readonly cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);

	/**
	 * An instance of the ElementRef
	 */
	private readonly elementRef: ElementRef = inject(ElementRef);

	/**
	 * An instance of the Renderer2
	 */
	private readonly renderer: Renderer2 = inject(Renderer2);

	/**
	 * Subject to hold the destroyed state of the current observable
	 */
	private destroyed$: Subject<void>;

	/**
	 * The latest value of the Observable, the parsed markdown
	 */
	private parsed: string;

	/**
	 * The previous value of the markdown string
	 */
	private previousValue: string;

	/**
	 * Instance of the change detector ref, implemented like this according to the async pipe implementation
	 * https://github.com/angular/angular/blob/main/packages/common/src/pipes/async_pipe.ts
	 */
	private changeDetectorRef: ChangeDetectorRef | null;

	constructor() {
		const cdRef = this.cdRef;

		// Iben: Use instance of cdRef like this to prevent memory leaks (see Angular async Pipe implementation)
		this.changeDetectorRef = cdRef;

		// Iben: Add a `ngx-markdown-element` class to the element
		if (this.elementRef?.nativeElement) {
			this.renderer.addClass(this.elementRef.nativeElement, 'ngx-markdown-element');
		}
	}

	/**
	 * Parse a markdown string to HTML
	 *
	 * @param value - The markdown string to parse
	 */
	public transform(value: string, options?: Omit<MarkedOptions, 'async'>): string {
		// Iben: If the value is the same as the previous value, return the parsed value
		if (value === this.previousValue) {
			return this.parsed;
		}

		// Iben: Set the previous value to the new value
		this.previousValue = value;

		// Iben: Parse the markdown string to HTML
		this.subscribe(this.markdownService.parse(value, options));

		// Iben: Return the parsed value
		return this.parsed;
	}

	/**
	 * Handles the changeDetection, latest value and dispose of the matchesQuery observable
	 *
	 * @param observable - The parsed markdown observable
	 */
	private subscribe(observable: Observable<string>): void {
		// Iben: Dispose the current subscription
		this.dispose();

		// Iben: Create a new destroyed subject to handle the destruction when needed
		this.destroyed$ = new Subject();

		observable
			.pipe(
				tap((value) => {
					// Iben: Update the latest value when it a new value is provided
					this.parsed = value;

					// Iben: Mark the component as ready for check
					this.changeDetectorRef.detectChanges();
				}),
				takeUntil(this.destroyed$)
			)
			.subscribe();
	}

	public ngOnDestroy(): void {
		// Iben: Call the dispose when the component is destroyed so we have no running subscriptions left
		this.dispose();

		// Iben: Clear instance of cdRef like this to prevent memory leaks (see Angular async Pipe implementation)
		this.changeDetectorRef = null;
	}

	/**
	 * Dispose of the matchesQuery observable when existing
	 */
	private dispose(): void {
		// Iben: In case there's a destroyed, we have an observable and we destroy the subscription and reset the observable
		if (this.destroyed$) {
			this.destroyed$.next();
			this.destroyed$.complete();
		}
	}
}
