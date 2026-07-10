import { Directive, ElementRef, HostListener, AfterViewInit, inject, input } from '@angular/core';

import { NgxTreeGridCellTarget, NgxTreeGridRowTarget } from '../../types';
import { NgxHasFocusDirective } from '../has-focus-action';

import { NgxTreeGridRowDirective } from './tree-grid-row.directive';
import { NgxTreeGridDirective } from './tree-grid.directive';

/**
 * A cell directive to handle navigation according to the WCAG treegrid pattern
 *
 * See https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/
 */
@Directive({
	selector: '[ngxTreeGridCell]',
	standalone: true,
	host: {
		// Iben: Marks the cell as focusable, but only by setting its focus programmatically, not by the tab key
		'[attr.tabIndex]': '-1',
	},
})
export class NgxTreeGridCellDirective extends NgxHasFocusDirective implements AfterViewInit {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	private readonly parent: NgxTreeGridDirective = inject(NgxTreeGridDirective, {
		optional: true,
	})!;
	private readonly elementRef = inject(ElementRef);

	/**
	 * The parent row of the cell
	 */
	private row: NgxTreeGridRowDirective;

	/**
	 * Set focus on the previous cell to the left
	 */
	@HostListener('keydown.ArrowLeft', ['$event']) moveLeft(event: Event): void {
		this.handleWhenFocussed(() => {
			// Iben: Stop the event from bubbling so that the row does not open when navigating through the row (see arrowLeft in the NgxTreeGridRowDirective )
			const ngxTreeGridCell = this.ngxTreeGridCell();
   if (ngxTreeGridCell === 0) {
				event.stopPropagation();
				return;
			}

			this.moveToCell(ngxTreeGridCell - 1, 'current');
		});
	}

	/**
	 * Set focus on the next cell to the right
	 */
	@HostListener('keydown.ArrowRight') moveRight(): void {
		this.moveToCell(this.ngxTreeGridCell() + 1, 'current');
	}

	/**
	 * Set focus on the cell above
	 */
	@HostListener('keydown.ArrowUp') moveUp(): void {
		this.moveToCell(this.ngxTreeGridCell(), 'above');
	}

	/**
	 * Set focus on the cell below
	 */
	@HostListener('keydown.ArrowDown') moveDown(): void {
		this.moveToCell(this.ngxTreeGridCell(), 'below');
	}

	/**
	 * Set focus on the first cell of the grid
	 */
	@HostListener('keydown.PageUp') moveToFirstCellOfGrid(): void {
		this.moveToCell('first', 'first');
	}

	/**
	 * Set focus on the first cell of the row
	 */
	@HostListener('keydown.Home') moveToFirstOfRow(): void {
		this.moveToCell('first', 'current');
	}

	/**
	 * Set focus on the first cell of the same column of the grid
	 */
	@HostListener('keydown.control.Home') moveToFirstColumnOfGrid(): void {
		this.moveToCell(this.ngxTreeGridCell(), 'first');
	}

	/**
	 * Set focus on the last cell of the grid
	 */
	@HostListener('keydown.PageDown') moveToLastCellOfGrid(): void {
		this.moveToCell('last', 'last');
	}

	/**
	 * Set focus on the last cell of the row
	 */
	@HostListener('keydown.End') moveToBottomEnd(): void {
		this.moveToCell('last', 'current');
	}

	/**
	 * Set focus on the last cell of the same column of the grid
	 */
	@HostListener('keydown.control.End') moveToBottomControlEnd(): void {
		this.moveToCell(this.ngxTreeGridCell(), 'last');
	}

	@HostListener('focusin') onFocusIn() {
		this.hasFocus = true;
	}

	@HostListener('focusout') onFocusOut() {
		this.hasFocus = false;
	}

	/**
	 * The index of the cell in the row
	 */
	public readonly ngxTreeGridCell = input.required<number>();

	/**
	 * The index of the row
	 */
	public readonly ngxTreeGridCellRow = input.required<number>();

	/**
	 * Sets focus on the cell or on the first focusable item in the cell
	 */
	public focus(): void {
		// Iben: Check if any of the child elements are focusable
		const focusableElement = this.findFocusableElement();

		// Iben: If no element was focusable, focus on the current element
		if (!focusableElement) {
			this.elementRef.nativeElement.focus();
		} else {
			focusableElement.focus();
		}
	}

	/**
	 * Moves focus to a provided cell in a provided row
	 *
	 * @private
	 * @param cell - The cell we wish to put focus on
	 * @param row - The row in which the cell is
	 */
	private moveToCell(cell: NgxTreeGridCellTarget, row: NgxTreeGridRowTarget): void {
		this.handleWhenFocussed(() => {
			this.row.getCell(cell, row)?.focus();
		});
	}

	/**
	 * Searches for a focusable element in the cell
	 */
	private findFocusableElement(): HTMLElement | undefined {
		// Iben: Standard CSS selector to find naturally focusable elements (links, buttons, inputs, textareas, selects) 
		// that are not disabled, as well as any elements with a custom tab index other than -1.
		const selector = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
		
		// Iben: Retrieve all matching interactive elements in the cell's DOM subtree
		const elements = this.elementRef.nativeElement.querySelectorAll(selector);
		
		// Iben: Iterate over the found elements to locate the first visible and rendered one
		for (const el of Array.from(elements)) {
			const htmlEl = el as HTMLElement;
			
			// Iben: Check that the element has layout dimensions (is visible and rendered) before returning it as focusable
			if (htmlEl.offsetWidth > 0 || htmlEl.offsetHeight > 0 || htmlEl.getClientRects().length > 0) {
				return htmlEl;
			}
		}
		
		return undefined;
	}

	public ngAfterViewInit(): void {
		// Iben: We register the cell and the row through the parent, as the td elements are not rendered within the row initially.
		const ngxTreeGridCellRow = this.ngxTreeGridCellRow();
  this.parent?.registerCell(ngxTreeGridCellRow, this);
		this.row = this.parent.getRow(ngxTreeGridCellRow);
	}
}
