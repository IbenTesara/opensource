import { CdkDropList } from '@angular/cdk/drag-drop';
import {
	Directive,
	ElementRef,
	HostBinding,
	HostListener,
	signal,
	WritableSignal,
	OnInit,
	inject,
	input,
	OutputEmitterRef,
	output,
	InputSignal,
	effect,
} from '@angular/core';

import {
	NgxAccessibleAbstractDragAndDropItemDirective,
	NgxAccessibleDragAndDropAbstractService,
} from '../../abstracts';
import { NgxAccessibleDragAndDropMoveEvent, NgxAccessibleDragAndDropMoveType } from '../../types';

import { NgxAccessibleDragAndDropContainerDirective } from './drag-and-drop-container.directive';
import { NgxAccessibleDragAndDropHostDirective } from './drag-and-drop-host.directive';

/**
 * A directive to handle accessible drag and drop flows. This directive is meant to be placed on the item(s) of the drag and drop container(s).
 */
@Directive({
	selector: '[ngxAccessibleDragAndDropItem]',
	exportAs: 'ngxAccessibleDragAndDropItem',
	standalone: true,
	host: {
		'[attr.tabIndex]': 'tabIndex()',
	},
})
export class NgxAccessibleDragAndDropItemDirective
	extends NgxAccessibleAbstractDragAndDropItemDirective
	implements OnInit
{
	private readonly dragAndDropService = inject(NgxAccessibleDragAndDropAbstractService);
	private readonly dropList = inject(CdkDropList);
	private readonly dropContainer = inject(NgxAccessibleDragAndDropContainerDirective);
	private readonly dropHost = inject(NgxAccessibleDragAndDropHostDirective);
	public override readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

	/**
	 * The tab index of the item
	 */
	public tabIndex: WritableSignal<number> = signal<number>(0);

	/**
	 * The selected state of the item
	 */
	@HostBinding('attr.aria-selected') public isSelected: boolean = false;

	/**
	 * Handle the selected state when pressing enter
	 */
	@HostListener('keydown.Enter') public onEnter(): void {
		this.handlePress();
	}

	/**
	 * Handle the selected state when pressing space
	 */
	@HostListener('keydown.Space') public onSpace(): void {
		this.handlePress();
	}

	/**
	 * Handle the ArrowUp Press
	 */
	@HostListener('keydown.ArrowUp', ['$event']) public onArrowUp(event: Event): void {
		this.moveItem('up', event as KeyboardEvent);
	}

	/**
	 * Handle the ArrowDown Press
	 */
	@HostListener('keydown.ArrowDown', ['$event']) public onArrowDown(event: Event): void {
		this.moveItem('down', event as KeyboardEvent);
	}

	/**
	 * Handle the ArrowLeft Press
	 */
	@HostListener('keydown.ArrowLeft', ['$event']) public onArrowLeft(event: Event): void {
		this.moveItem('left', event as KeyboardEvent);
	}

	/**
	 * Handle the ArrowRight Press
	 */
	@HostListener('keydown.ArrowRight', ['$event']) public onArrowRight(event: Event): void {
		this.moveItem('right', event as KeyboardEvent);
	}

	/**
	 * The index of the draggable item
	 */

	public readonly itemIndex = input.required<number>({
		alias: 'ngxAccessibleDragAndDropItemIndex',
	});

	/**
	 * An unique id of the draggable item
	 */

	public readonly itemId: InputSignal<string> = input.required<string>({
		alias: 'ngxAccessibleDragAndDropItemId',
	});

	/**
	 * An optional label for the draggable item
	 */

	public readonly label = input<string>(undefined, { alias: 'ngxAccessibleDragAndDropLabel' });

	/**
	 * Whether the draggable item  is disabled
	 */
	public disabled: InputSignal<boolean> = input(false, {
		alias: 'ngxAccessibleDragAndDropDisabled',
	});

	/**
	 * Emits when the item has been moved through keyboard input
	 */
	public ngxAccessibleDragAndDropItemMove: OutputEmitterRef<NgxAccessibleDragAndDropMoveEvent> =
		output<NgxAccessibleDragAndDropMoveEvent>();

	constructor() {
		super();

		effect(() => {
			this.tabIndex.set(this.disabled() ? -1 : 0);
		});
	}

	/**
	 *  Marks the item as focussed and selected
	 */
	public markAsActive(): void {
		this.focus();
		this.isSelected = true;
	}

	/**
	 * Deselects the current item if it's selected
	 *
	 */
	public override onBlur(): void {
		// Iben: Early exit if the item is not selected
		if (!this.isSelected) {
			return;
		}

		// Iben: Set the item as deselected
		this.isSelected = false;

		// Iben: Announce the item as deselected
		this.dragAndDropService
			.setMessage({
				type: 'deselected',
				data: { item: `${this.itemIndex()}`, itemLabel: this.label() || undefined },
			})
			.subscribe();
	}

	/**
	 * Registers the item with the drop host
	 */
	public ngOnInit(): void {
		this.dropHost.registerDragAndDropItem(this);
	}

	/**
	 * Handles the pressing of a button in the drag and drop host
	 */
	private handlePress(): void {
		this.handleWhenFocussed(() => {
			this.isSelected = !this.isSelected;
			this.dragAndDropService
				.setMessage({
					type: this.isSelected ? 'selected' : 'deselected',
					data: { item: `${this.itemIndex()}`, itemLabel: this.label() || undefined },
				})
				.subscribe();
		});
	}

	/**
	 * Moves the item in the correct direction
	 *
	 * @param key - The pressed key
	 * @param event - The keyboard event
	 */
	private moveItem(key: 'up' | 'down' | 'left' | 'right', event: KeyboardEvent): void {
		if (!this.disabled && this.hasFocus && this.isSelected) {
			// Iben: Prevent the default action
			event.preventDefault();
			event.stopPropagation();

			// Iben: Set up the needed items
			let newIndex: number;
			let newContainer: number;

			const currentContainer = this.dropContainer.index();
			const isHorizontal = this.dropList.orientation === 'horizontal';
			const isUpOrDown: boolean = key === 'up' || key === 'down';

			// Iben: In this case we're changing the current container
			if ((isUpOrDown && isHorizontal) || (!isUpOrDown && !isHorizontal)) {
				newIndex = this.itemIndex();
				newContainer =
					key === 'up' || key === 'left' ? currentContainer - 1 : currentContainer + 1;

				this.handleItemMove(newIndex, newContainer, 'moved');
			}

			// Iben: In this case, we're changing the order of the items
			if ((!isUpOrDown && isHorizontal) || (isUpOrDown && !isHorizontal)) {
				newIndex =
					key === 'up' || key === 'left' ? this.itemIndex() - 1 : this.itemIndex() + 1;
				newContainer = currentContainer;
				this.handleItemMove(newIndex, newContainer, 'reordered');
			}
		}
	}

	/**
	 * Moves an item based on the provided container and index, and sends a message to the live region
	 *
	 * @private
	 * @param newIndex - The new index of the item
	 * @param newContainer - The container we wish to move the item to
	 * @param  type - The type of movement we perform
	 */
	private handleItemMove(
		newIndex: number,
		newContainer: number,
		type: NgxAccessibleDragAndDropMoveType
	): void {
		// Iben: Check if the newContainer exits, if not early exit
		const targetContainer = this.dropHost.getContainer(newContainer);

		if (!targetContainer) {
			return;
		}

		// Iben: Emit the move event
		const index = this.dropContainer.index();
		const itemIndex = this.itemIndex();
		this.ngxAccessibleDragAndDropItemMove.emit({
			previousIndex: itemIndex,
			newIndex,
			previousContainer: index,
			newContainer,
		});

		// Iben: Set the message in the live region
		this.dragAndDropService
			.setMessage({
				type: type,
				data: {
					item: this.itemId(),
					itemLabel: this.label() || undefined,
					from: type === 'reordered' ? `${itemIndex + 1}` : `${index + 1}`,
					to: type === 'reordered' ? `${newIndex + 1}` : `${newContainer + 1}`,
					fromLabel: this.dropContainer.label() || undefined,
					toLabel: targetContainer.label() || undefined,
				},
			})
			.subscribe();

		// Iben: Set the focus and select the new item with the same id, using a setTimeOut so the correct item is rendered first
		setTimeout(() => {
			this.dropHost.markAsActive(this.itemId());
		});
	}
}
