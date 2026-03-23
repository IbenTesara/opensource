import {
	AfterViewInit,
	ChangeDetectorRef,
	DestroyRef,
	Directive,
	ElementRef,
	inject,
	input,
	inputBinding,
	InputSignal,
	Renderer2,
	TemplateRef,
	Type,
	ViewContainerRef,
} from '@angular/core';
import { v4 as uuid } from 'uuid';

import { NgxErrorAbstractComponent } from '../../abstracts';
import { NgxError, NgxErrorBoundaryPriority } from '../../types';

@Directive({
	selector: '[ngxErrorBoundary]',
})
export class NgxErrorBoundaryDirective implements AfterViewInit {
	/**
	 *  An instance of the ViewContainerRef
	 */
	protected readonly viewContainer: ViewContainerRef = inject(ViewContainerRef);

	/**
	 *  An instance of the ElementRef
	 */
	protected readonly elementRef: ElementRef = inject(ElementRef);

	/**
	 *  An instance of Renderer2
	 */
	protected readonly renderer: Renderer2 = inject(Renderer2);

	/**
	 *  An instance of the TemplateRef
	 */
	protected readonly templateRef: TemplateRef<any> = inject(TemplateRef);

	/**
	 *  The actual template of the element
	 */
	protected template: TemplateRef<any>;

	/**
	 *  An instance of the ChangeDetectorRef
	 */
	protected readonly cdRef: ChangeDetectorRef = inject(ChangeDetectorRef);

	/**
	 *  An instance of the DestroyRef
	 */
	protected readonly destroyRef: DestroyRef = inject(DestroyRef);

	public readonly id: string = uuid();

	/**
	 * The priority of this boundary
	 */
	public readonly ngxErrorBoundary: InputSignal<NgxErrorBoundaryPriority> = input(undefined);

	/**
	 * An alternate template we wish to show if we do not wish to show the default error component
	 */
	public readonly ngxErrorBoundaryElse: InputSignal<TemplateRef<NgxError>> = input();

	constructor() {
		// Iben: Set the current template ref at constructor time so we actually have the provided template (as done in the *ngIf directive)
		this.template = this.templateRef;
	}

	/**
	 * Render the error fallback when an error has occurred
	 *
	 * @param error - The provided error
	 * @param [component] - An optional component we wish to render instead of the component
	 * @returns {*}
	 */
	public renderError(error: NgxError, component?: Type<NgxErrorAbstractComponent>): void {
		// Iben: If no component or fallback was provided, we early exit
		if (!component && !this.ngxErrorBoundaryElse()) {
			return;
		}

		// Iben: Clear the viewContainer
		this.viewContainer.clear();

		// Iben: If there's a fallback, render it
		if (this.ngxErrorBoundaryElse) {
			this.viewContainer.createEmbeddedView(this.ngxErrorBoundaryElse());

			return;
		}

		// Iben: If not, we render the component
		this.viewContainer.createComponent(component, {
			bindings: [
				inputBinding('error', () => error),
				inputBinding('retry', () => this.renderInitial.bind(this)),
			],
		});
	}

	/**
	 * Render the initial template
	 */
	public renderInitial(): void {
		this.viewContainer.clear();
		this.viewContainer.createEmbeddedView(this.template);
	}

	public ngAfterViewInit() {
		// Iben: Start by rendering the initial template
		this.renderInitial();

		//Iben: Set a base class to the element
		const element: HTMLElement =
			this.templateRef.elementRef.nativeElement.previousElementSibling;

		// Iben: Add the ngx-errors-boundary class so we can style them if wanted
		if (element) {
			this.renderer.addClass(element, 'ngx-errors-boundary');
		}
	}
}
