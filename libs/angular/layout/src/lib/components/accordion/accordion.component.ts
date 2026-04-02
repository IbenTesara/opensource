import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	inject,
	input,
	InputSignal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, distinctUntilChanged, Observable, shareReplay, Subject, tap } from 'rxjs';

import { NgxAccordionOpenBehavior, NgxAccordionOpenStateBehavior } from '../../types';

import { NgxAccordionItemComponent } from './item/accordion-item.component';

/**
 * A WCAG/ARIA compliant implementation of the accordion pattern.
 *
 * https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
 */
@Component({
	selector: 'ngx-accordion',
	template: '<ng-content/>',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'ngx-accordion',
		role: 'region',
	},
})
export class NgxAccordionComponent {
	/**
	 * An instance of the DestroyRef
	 */
	protected readonly destroyRef: DestroyRef = inject(DestroyRef);
	/**
	 * A subject to hold a registered event
	 */
	protected readonly itemRegisteredSubject: Subject<void> = new Subject<void>();

	/**
	 * An observable based on the itemRegisteredSubject, sharing its replay
	 */
	protected readonly itemRegistered$: Observable<void> = this.itemRegisteredSubject
		.asObservable()
		.pipe(shareReplay(1));

	/**
	 * A list of all accordion items
	 */
	public items: NgxAccordionItemComponent[] = [];

	/**
	 * Open the specific items in the accordion
	 */
	public open: InputSignal<NgxAccordionOpenBehavior> = input();

	/**
	 * Whether all or just one item can be opened at the same time; by default this is `all`
	 */
	public openStateBehavior: InputSignal<NgxAccordionOpenStateBehavior> = input('all');

	constructor() {
		combineLatest([toObservable(this.open), this.itemRegistered$])
			.pipe(
				distinctUntilChanged(),
				tap(([open]) => {
					// Iben: Use a setTimeOut so we wait an extra tick
					setTimeout(() => {
						if (open === 'all') {
							this.items.forEach((item) => item.updateAccordionItemState(true));
						} else {
							// Iben: Open specific items
							const indexes =
								open === 'first' ? [0] : Array.isArray(open) ? open : [open];

							indexes.forEach((index) => {
								this.items[index]?.updateAccordionItemState(true);
							});
						}
					});
				}),
				takeUntilDestroyed(this.destroyRef)
			)
			.subscribe();
	}

	/**
	 * Register an accordion item to the container
	 *
	 * @param item - An accordion item
	 */
	public registerItem(item: NgxAccordionItemComponent): void {
		this.itemRegisteredSubject.next();
		this.items.push(item);
	}

	/**
	 * Removes an accordion item from the container
	 *
	 * @param item - An accordion item
	 */
	public removeItem(item: NgxAccordionItemComponent): void {
		// Iben: Get the index of the item
		const index = this.items.findIndex(({ id }) => id === item.id);

		// Iben: If no item was found, we early exit
		if (index === undefined) {
			return;
		}

		// Iben: Remove the item
		this.items = [...this.items.slice(0, index), ...this.items.slice(index + 1)];
	}

	/**
	 * Moves the focus to an accordion
	 *
	 * @param  id - The id of the current item
	 * @param  direction - The direction we move in
	 */
	public moveFocus(id: string, direction: 'up' | 'down' | 'first' | 'last') {
		// Iben: If we go to the first or last accordion, we don't need to find the index
		if (direction === 'first' || direction === 'last') {
			this.items[direction === 'first' ? 0 : this.items.length - 1].focus();

			return;
		}

		// Iben: Find the index and move to the next
		const index = this.items.findIndex((item) => id === item.id);

		this.items[direction === 'down' ? index + 1 : index - 1]?.focus();
	}

	/**
	 * Update the state of other accordion items based on the openStateBehavior
	 *
	 * @param id - The recently opened item
	 */
	public handleOpenState(id: string): void {
		// Iben: If we can open all items, we early exit
		if (this.openStateBehavior() !== 'one') {
			return;
		}

		// Iben: Close all other items in the accordion
		this.items.forEach((item) => {
			if (item.id !== id) {
				item.updateAccordionItemState(false);
			}
		});
	}
}
