import { CdkVirtualForOf, ScrollingModule } from '@angular/cdk/scrolling';
import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	contentChild,
	DestroyRef,
	effect,
	inject,
	input,
	InputSignal,
	output,
	OutputEmitterRef,
	signal,
	Signal,
	TemplateRef,
	viewChild,
	WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

import { NgxFeedItemDirective } from '../../directives';

@Component({
	selector: 'ngx-feed',
	templateUrl: './feed.component.html',
	imports: [ScrollingModule, NgTemplateOutlet, NgxFeedItemDirective],
	styleUrl: './feed.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'attr.role': 'feed',
		'[attr.aria-busy]': 'updatingData()',
	},
})
export class NgxFeedComponent<DataType = unknown> {
  private readonly destroyRef: DestroyRef = inject( DestroyRef );
	/**
	 * Whether we started listening to the view's data changes
	 */
	private viewChangeSet: boolean = false;

	/**
	 * The virtual scroll item
	 */
	private readonly virtualScroll: Signal<CdkVirtualForOf<DataType>> = viewChild(CdkVirtualForOf);

	/**
	 * Whether the data is being updated
	 */
	public updatingData: WritableSignal<boolean> = signal(false);

	/**
	 * The template we wish to use to render items in the feed
	 */
	public readonly contentTemplate: Signal<
		TemplateRef<{ $implicit: DataType; labelId: string; describedById: string }>
	> = contentChild('contentTmpl');

	/**
	 * The data we wish to render
	 */
	public readonly data: InputSignal<DataType[]> = input.required();

	/**
	 * The minimum size of an item in the feed in pixels
	 */
	public readonly itemSize: InputSignal<number> = input.required();

	/**
	 * Whether items added to the virtual scroll should replace the current items or should be appended
   *
   * By default this is `replace` and should only be changed to `append` if the items are low in complexity.
	 */
	public readonly itemRenderingStrategy: InputSignal<'replace' | 'append'> = input('replace');

	/**
	 * The number of items we want to cache in the virtual scroll
	 */
	public readonly itemRenderingCaching: InputSignal<number> = input(5);

	/**
	 * Whether we reached the end of the data set
	 */
	public readonly endReached: OutputEmitterRef<void> = output<void>();

  constructor () {
    // Iben: Listen to the changes in the view to see if we reached the end of the data
		effect(() => {
			if (this.virtualScroll() && !this.viewChangeSet) {
				this.virtualScroll()
          .viewChange.pipe(
            // Iben: If we reached the end of the data, we emit
						tap(({ end }) => {
							if (end === this.data().length) {
								this.endReached.emit();
							}
            } ),
            takeUntilDestroyed(this.destroyRef)
					)
					.subscribe();

        // Iben: Set the viewChangeSet to true so we only subscribe once.
				this.viewChangeSet = true;
			}
		});
	}
}
